import { sendResponse, sendError } from '../utils/responseHelper';
import { Env } from '../index';

export class AdminController {
  static async getDashboardMetrics(env: Env) {
    try {
      // Basic metrics
      const { results: revenueResults } = await env.DB.prepare(`
        SELECT SUM(grand_total) as total_revenue
        FROM bookings
        WHERE payment_status = 'paid'
      `).all();
      const totalRevenue = revenueResults[0]?.total_revenue || 0;

      const { results: pendingResults } = await env.DB.prepare(`
        SELECT COUNT(id) as pending_orders
        FROM bookings
        WHERE payment_status = 'pending'
      `).all();
      const pendingOrders = pendingResults[0]?.pending_orders || 0;

      const { results: customTripResults } = await env.DB.prepare(`
        SELECT COUNT(id) as new_custom_requests
        FROM custom_trip_requests
        WHERE status = 'new'
      `).all();
      const newCustomRequests = customTripResults[0]?.new_custom_requests || 0;

      return sendResponse({
        total_revenue: totalRevenue,
        pending_orders: pendingOrders,
        new_custom_requests: newCustomRequests
      });
    } catch (e: any) {
      return sendError(e.message);
    }
  }
}
