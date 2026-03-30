import { NextResponse } from 'next/server';

// Mock Email Service Trigger
const triggerEmailService = async (bookingRef: string, status: string) => {
  console.log(`[Email Service Triggered] Sending ${status} ticket to ${bookingRef}...`);
  // In production, this calls Resend/SendGrid and injects the HTML Template
  return true;
};

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    
    // Example Midtrans/Xendit Payload
    const { order_id, transaction_status, signature_key, gross_amount, status_code } = rawBody;

    /* 
      1. SECURITY: Signature Verification Layer 
      Ensure the webhook came from the Payment Orchestrator using SHA512
      const mySignature = crypto.createHash('sha512').update(order_id + status_code + gross_amount + process.env.SERVER_KEY).digest('hex');
      if (mySignature !== signature_key) throw new Error('Invalid Signature. Possible Tampering Attack.');
    */

    console.log(`[Webhook Received] Order: ${order_id} | Status: ${transaction_status}`);

    // 2. Database Action & Automation
    if (transaction_status === 'settlement' || transaction_status === 'capture') {
       // Update D1 Database -> SET status='PAID' WHERE ref=order_id
       
       // Trigger Automations (Email confirmation, QR Ticket Generation, Admin Push Notif)
       await triggerEmailService(order_id, 'PAID');
       
       return NextResponse.json({ status: 'success', message: 'Payment Confirmed & Automations Triggered' });
    }
    
    // Handle Pending, Expired, Denied
    if (transaction_status === 'expire' || transaction_status === 'deny') {
       // Update D1 Database -> SET status='CANCELLED' OR 'FAILED'
       return NextResponse.json({ status: 'success', message: 'Booking Cancelled due to timeout or deny.' });
    }

    // Acknowledge receipt without state change for pending statuses
    return NextResponse.json({ status: 'pending' });

  } catch (error: any) {
    console.error(`[Webhook Error]`, error.message);
    return NextResponse.json({ error: 'Webhook Processing Failed', msg: error.message }, { status: 500 });
  }
}
