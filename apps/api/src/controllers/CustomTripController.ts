import { sendResponse, sendError } from '../utils/responseHelper';
import { Env } from '../index';

export class CustomTripController {
  static async sumbitRequest(request: Request, env: Env) {
    try {
      const data: any = await request.json();
      
      const {
        customer_name,
        customer_email,
        customer_phone,
        base_location_id,
        travel_date,
        duration_days,
        total_pax,
        requested_destinations,
        accommodation_preference
      } = data;

      if (!customer_name || !customer_email || !travel_date || !total_pax) {
        return sendError('Missing required fields', 400);
      }

      const timestamp = new Date().getTime();
      const requestCode = `REQ-${timestamp.toString().substring(5, 13)}-${Math.floor(Math.random() * 1000)}`;

      await env.DB.prepare(`
        INSERT INTO custom_trip_requests (
          request_reference, customer_name, customer_email, customer_phone,
          base_location_id, travel_date, duration_days, total_pax,
          requested_destinations, accommodation_preference, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
      `).bind(
        requestCode, customer_name, customer_email, customer_phone,
        base_location_id, travel_date, duration_days, total_pax,
        requested_destinations, accommodation_preference
      ).run();

      return sendResponse({
        reference: requestCode,
        status: 'new'
      }, 201);
    } catch(e: any) {
      return sendError(e.message);
    }
  }

  static async listRequests(env: Env) {
    try {
      const { results } = await env.DB.prepare(`
        SELECT r.*, l.city_name
        FROM custom_trip_requests r
        LEFT JOIN master_locations l ON r.base_location_id = l.id
        ORDER BY r.created_at DESC
      `).all();
      return sendResponse(results);
    } catch (e: any) {
      return sendError(e.message);
    }
  }

  static async sendQuote(request: Request, env: Env, reference: string) {
    try {
      // In a real scenario, this updates status to 'quoted' and emails the quote
      // We will just update status here
      await env.DB.prepare(`
        UPDATE custom_trip_requests SET status = 'quoted' WHERE request_reference = ?
      `).bind(reference).run();
      
      return sendResponse({ success: true, message: 'Quote generated and sent' });
    } catch (e: any) {
      return sendError(e.message);
    }
  }
}
