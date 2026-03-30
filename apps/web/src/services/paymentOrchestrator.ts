/**
 * Payment Orchestrator Service
 * 
 * Vendor-agnostic payment layer for NusantaraTrip.
 * Supports: Midtrans, Xendit, Duitku (easily extendable).
 * 
 * Architecture:
 * - Reads active gateway config from D1 database (with PRIMARY flag)
 * - If primary fails (network error, 5xx), auto-retries on next active gateway
 * - Normalizes all gateway responses into a single PaymentResult type
 */

export type GatewayProvider = 'midtrans' | 'xendit' | 'duitku';

export interface PaymentRequest {
  orderId: string;
  amount: number; // Always in IDR, server-recalculated
  customerEmail: string;
  customerName: string;
  description: string;
}

export interface PaymentResult {
  success: boolean;
  provider: GatewayProvider;
  paymentUrl?: string;   // Redirect URL for hosted payment pages
  vaNumber?: string;    // For Virtual Account methods
  qrString?: string;    // For QRIS
  expiresAt?: string;
  errorCode?: string;
  errorMessage?: string;
}

// ─── Gateway Adapters ─────────────────────────────────────────────
// Each adapter normalizes provider-specific API calls into PaymentResult

async function chargeMidtrans(request: PaymentRequest, keys: { serverKey: string }): Promise<PaymentResult> {
  try {
    const encoded = Buffer.from(keys.serverKey + ':').toString('base64');
    
    const response = await fetch('https://api.sandbox.midtrans.com/v2/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encoded}`,
      },
      body: JSON.stringify({
        payment_type: 'bank_transfer',
        transaction_details: { order_id: request.orderId, gross_amount: request.amount },
        bank_transfer: { bank: 'bca' },
        customer_details: { first_name: request.customerName, email: request.customerEmail },
      }),
    });

    const data = await response.json() as any;
    
    if (!response.ok || data.status_code === '500') {
      throw new Error(data.status_message || 'Midtrans API error');
    }

    return {
      success: true,
      provider: 'midtrans',
      vaNumber: data.va_numbers?.[0]?.va_number,
      expiresAt: data.expiry_time,
    };
  } catch (err: any) {
    return { success: false, provider: 'midtrans', errorMessage: err.message };
  }
}

async function chargeXendit(request: PaymentRequest, keys: { secretKey: string }): Promise<PaymentResult> {
  try {
    const response = await fetch('https://api.xendit.co/v2/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(keys.secretKey + ':').toString('base64')}`,
      },
      body: JSON.stringify({
        external_id: request.orderId,
        amount: request.amount,
        payer_email: request.customerEmail,
        description: request.description,
        currency: 'IDR',
      }),
    });

    const data = await response.json() as any;

    if (!response.ok) throw new Error(data.message || 'Xendit API error');
    
    return {
      success: true,
      provider: 'xendit',
      paymentUrl: data.invoice_url,
      expiresAt: data.expiry_date,
    };
  } catch (err: any) {
    return { success: false, provider: 'xendit', errorMessage: err.message };
  }
}

async function chargeDuitku(request: PaymentRequest, keys: { merchantCode: string; apiKey: string }): Promise<PaymentResult> {
  try {
    const signature = `${keys.merchantCode}${request.amount}${request.orderId}${keys.apiKey}`;

    const response = await fetch('https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-duitku-signature': signature },
      body: JSON.stringify({
        merchantCode: keys.merchantCode,
        paymentAmount: request.amount,
        merchantOrderId: request.orderId,
        productDetails: request.description,
        email: request.customerEmail,
        paymentMethod: 'VA',
        returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/payment`,
      }),
    });

    const data = await response.json() as any;
    if (data.statusCode !== '00') throw new Error(data.statusMessage);

    return {
      success: true,
      provider: 'duitku',
      paymentUrl: data.paymentUrl,
      vaNumber: data.vaNumber,
    };
  } catch (err: any) {
    return { success: false, provider: 'duitku', errorMessage: err.message };
  }
}

// ─── Orchestrator Core ────────────────────────────────────────────

interface GatewayConfig {
  provider: GatewayProvider;
  isPrimary: boolean;
  isActive: boolean;
  keys: Record<string, string>;
}

/**
 * Main orchestrator entry point.
 * 
 * Fetches gateway configuration from D1 (mocked below),
 * tries the PRIMARY gateway first, then auto-falls-over
 * to the next active gateway if it fails.
 */
export async function processPayment(request: PaymentRequest): Promise<PaymentResult> {
  // In production: const configs = await db.prepare('SELECT * FROM payment_gateways WHERE is_active = 1 ORDER BY is_primary DESC').all();
  const mockConfigs: GatewayConfig[] = [
    {
      provider: 'midtrans',
      isPrimary: true,
      isActive: true,
      keys: { serverKey: process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-PLACEHOLDER' },
    },
    {
      provider: 'xendit',
      isPrimary: false,
      isActive: true,
      keys: { secretKey: process.env.XENDIT_SECRET_KEY || 'xnd_development_PLACEHOLDER' },
    },
    {
      provider: 'duitku',
      isPrimary: false,
      isActive: false,
      keys: { merchantCode: 'D0001', apiKey: process.env.DUITKU_API_KEY || 'PLACEHOLDER' },
    },
  ];

  // Sort: primary first, then active secondaries
  const orderedConfigs = [...mockConfigs]
    .filter(c => c.isActive)
    .sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0));

  let lastError = '';

  for (const config of orderedConfigs) {
    console.log(`[Orchestrator] Attempting payment via ${config.provider.toUpperCase()}${config.isPrimary ? ' (Primary)' : ' (Failover)'}`);
    
    let result: PaymentResult;
    
    switch (config.provider) {
      case 'midtrans':
        result = await chargeMidtrans(request, config.keys as any);
        break;
      case 'xendit':
        result = await chargeXendit(request, config.keys as any);
        break;
      case 'duitku':
        result = await chargeDuitku(request, config.keys as any);
        break;
      default:
        continue;
    }

    if (result.success) {
      console.log(`[Orchestrator] ✅ Payment SUCCESS via ${config.provider}`);
      // In production: log to audit_logs table here
      return result;
    }

    console.warn(`[Orchestrator] ❌ ${config.provider} failed: ${result.errorMessage}. Trying next...`);
    lastError = result.errorMessage || 'Unknown error';
  }

  // All gateways exhausted
  console.error(`[Orchestrator] 🚨 ALL GATEWAYS FAILED. Last error: ${lastError}`);
  return {
    success: false,
    provider: 'midtrans',
    errorCode: 'ALL_GATEWAYS_FAILED',
    errorMessage: `All payment gateways failed. Last error: ${lastError}. Please contact support.`,
  };
}
