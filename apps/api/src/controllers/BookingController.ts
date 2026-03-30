import { sendResponse, sendError } from '../utils/responseHelper';
import { Env } from '../index';

export class BookingController {
  static async createBooking(request: Request, env: Env) {
    try {
      const data: any = await request.json();
      
      const {
        customer_name,
        customer_email,
        customer_phone,
        tour_id,
        travel_date,
        total_pax,
        addons, // array of { id: number, quantity: number }
      } = data;

      if (!customer_name || !customer_email || !tour_id || !travel_date || !total_pax) {
        return sendError('Missing required fields', 400);
      }

      // Generate Reference Code
      const timestamp = new Date().getTime();
      const bookingCode = `NSTR-${timestamp.toString().substring(5, 13)}-${Math.floor(Math.random() * 1000)}`;

      // 1. Fetch Tour Base Price
      const tourQuery = await env.DB.prepare(`SELECT * FROM tours WHERE id = ?`).bind(tour_id).first();
      if (!tourQuery) {
        return sendError('Tour not found', 404);
      }

      let basePriceCalculation = 0;

      // 2. Fetch Pricing Tiers and Calculate Base Price
      if (tourQuery.trip_type_id === 2) { // Private Trip
        const tierQuery = await env.DB.prepare(`
          SELECT price_per_pax FROM tour_pricing_tiers 
          WHERE tour_id = ? AND min_pax <= ? AND max_pax >= ?
        `).bind(tour_id, total_pax, total_pax).first();

        if (tierQuery) {
          basePriceCalculation = (tierQuery.price_per_pax as number) * total_pax;
        } else {
          // fallback to standard base price
          basePriceCalculation = (tourQuery.base_price as number) * total_pax;
        }
      } else {
        basePriceCalculation = (tourQuery.base_price as number) * total_pax;
      }

      // 3. Calculate Addons
      let addonsTotal = 0;
      let addonRecords: any[] = [];
      if (addons && Array.isArray(addons)) {
        for (const addonReq of addons) {
          const addonDb = await env.DB.prepare(`SELECT * FROM tour_addons WHERE id = ? AND tour_id = ?`)
            .bind(addonReq.id, tour_id)
            .first();

          if (addonDb) {
            let subtotal = 0;
            if (addonDb.charge_type === 'per_pax') {
              // usually quantity is equal to pax but can be less
              subtotal = (addonDb.price as number) * addonReq.quantity;
            } else { // per_group
              subtotal = (addonDb.price as number) * addonReq.quantity;
            }
            addonsTotal += subtotal;
            addonRecords.push({
              addon_id: addonDb.id,
              quantity: addonReq.quantity,
              subtotal: subtotal
            });
          }
        }
      }

      // 4. Calculate Surcharges based on Date
      let surchargeTotal = 0;
      const surchargesDb = await env.DB.prepare(`
        SELECT * FROM tour_surcharges 
        WHERE tour_id = ? AND start_date <= ? AND end_date >= ?
      `).bind(tour_id, travel_date, travel_date).all();

      if (surchargesDb.results) {
        for (const surcharge of surchargesDb.results) {
          if (surcharge.surcharge_type === 'flat_fee') {
            surchargeTotal += surcharge.surcharge_amount as number;
          } else if (surcharge.surcharge_type === 'per_pax') {
            surchargeTotal += (surcharge.surcharge_amount as number) * total_pax;
          } else if (surcharge.surcharge_type === 'percentage') {
            surchargeTotal += (basePriceCalculation * (surcharge.surcharge_amount as number)) / 100;
          }
        }
      }

      const grandTotal = basePriceCalculation + addonsTotal + surchargeTotal;

      // 5. Insert Booking
      const insertBooking = await env.DB.prepare(`
        INSERT INTO bookings (
          booking_reference, customer_name, customer_email, customer_phone, 
          tour_id, travel_date, total_pax, base_price_total, addons_total, 
          surcharge_total, grand_total, payment_status, payment_method
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'bank_transfer')
      `).bind(
        bookingCode, customer_name, customer_email, customer_phone,
        tour_id, travel_date, total_pax, basePriceCalculation, addonsTotal,
        surchargeTotal, grandTotal
      ).run();

      const newBookingIdStr = insertBooking.meta.last_row_id;

      // 6. Insert Booking Addons
      if (addonRecords.length > 0) {
        const statements = addonRecords.map(record => {
          return env.DB.prepare(`
            INSERT INTO booking_addons (booking_id, tour_addon_id, quantity, subtotal)
            VALUES (?, ?, ?, ?)
          `).bind(newBookingIdStr, record.addon_id, record.quantity, record.subtotal);
        });
        
        await env.DB.batch(statements);
      }

      // Return generated quote/booking
      return sendResponse({
        booking_reference: bookingCode,
        grand_total: grandTotal,
        status: 'pending'
      }, 201);

    } catch (e: any) {
      return sendError(e.message);
    }
  }

  static async getBookingStatus(env: Env, reference: string) {
    try {
      const booking = await env.DB.prepare(`
        SELECT b.*, t.tour_name
        FROM bookings b
        JOIN tours t ON b.tour_id = t.id
        WHERE b.booking_reference = ?
      `).bind(reference).first();

      if (!booking) {
        return sendError('Booking not found', 404);
      }

      // fetch addons
      const { results: addons } = await env.DB.prepare(`
        SELECT ba.*, ta.addon_name
        FROM booking_addons ba
        JOIN tour_addons ta ON ba.tour_addon_id = ta.id
        WHERE ba.booking_id = ?
      `).bind(booking.id).all();

      return sendResponse({ ...booking, mapped_addons: addons });
    } catch (e: any) {
      return sendError(e.message);
    }
  }

  static async updatePaymentStatus(request: Request, env: Env, reference: string) {
    try {
      const { status } = await request.json() as any;
      if (!['pending', 'paid', 'cancelled', 'refunded'].includes(status)) {
         return sendError('Invalid status', 400);
      }

      await env.DB.prepare(`
        UPDATE bookings SET payment_status = ? WHERE booking_reference = ?
      `).bind(status, reference).run();

      return sendResponse({ message: 'Status updated successfully' });
    } catch(e: any) {
      return sendError(e.message);
    }
  }
}
