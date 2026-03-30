import { NextResponse } from 'next/server';
import { processPayment } from '@/services/paymentOrchestrator';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const { order_id, secured_total_price, customer_info } = body;
    
    if (!order_id || !secured_total_price || !customer_info?.email) {
      return NextResponse.json({ error: 'Missing required payment fields.' }, { status: 400 });
    }

    const result = await processPayment({
      orderId: order_id,
      amount: secured_total_price,
      customerEmail: customer_info.email,
      customerName: customer_info.full_name,
      description: `NusantaraTrip Order ${order_id}`,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.errorMessage }, { status: 502 });
    }

    return NextResponse.json({ status: 'payment_initiated', ...result });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
