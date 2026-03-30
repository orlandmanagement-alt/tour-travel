import { NextResponse } from 'next/server';
import { BookingSchema } from '@/lib/validations';

// Mock D1 Database fetch
const mockGetTourPricing = async (id: string | number) => {
  return {
    id,
    base_price: 350000,
    max_capacity: 10,
    current_booked: 8,
  };
};

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    
    // 1. Zod Validation (Throws error if fails, e.g., Date < 24h)
    const parsedData = BookingSchema.parse(rawBody);

    // 2. Fetch ground-truth pricing & capacity from D1 Database
    const tourDbRecord = await mockGetTourPricing(parsedData.tour_id);

    // 3. CAPACTIY CONSTRAINT (Overbooking Prevention)
    if (tourDbRecord.current_booked + parsedData.pax > tourDbRecord.max_capacity) {
      return NextResponse.json(
        { error: `Tour overbooked. Only ${tourDbRecord.max_capacity - tourDbRecord.current_booked} seats remaining.` },
        { status: 409 } // Conflict
      );
    }

    // 4. SERVER-SIDE PRICE RECALCULATION (Anti-Tampering)
    // We EXPLICITLY IGNORE `parsedData.frontend_calculated_total`
    const secureBasePrice = tourDbRecord.base_price;
    const finalCalculatedPrice = secureBasePrice * parsedData.pax;
    
    /* 
      Example handling Addons safely:
      let addonsTotal = 0;
      if (parsedData.addons) {
         // Query D1 to verify Addon real prices instead of trusting frontend
         addonsTotal = await calculateAddonsFromDB(parsedData.addons);
      }
      finalCalculatedPrice += addonsTotal;
    */

    return NextResponse.json({
      status: 'success',
      booking_ref: `NSTR-${Math.floor(Math.random() * 90000) + 10000}`,
      secured_total_price: finalCalculatedPrice,
      message: 'Checkout initialized safely via Server Recalculation.'
    });

  } catch (error: any) {
    // Catch Zod Error
    if (error.errors) {
      return NextResponse.json({ error: 'Validation Failed', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error', msg: error.message }, { status: 500 });
  }
}
