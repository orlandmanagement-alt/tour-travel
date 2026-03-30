import { sendResponse, sendError } from './utils/responseHelper';
import { MasterController } from './controllers/MasterController';
import { TourController } from './controllers/TourController';
import { BookingController } from './controllers/BookingController';
import { CustomTripController } from './controllers/CustomTripController';
import { AdminController } from './controllers/AdminController';

export interface Env {
  DB: D1Database;
  MIDTRANS_SERVER_KEY: string;
  XENDIT_SECRET_KEY: string;
  DUITKU_API_KEY: string;
  DUITKU_MERCHANT_CODE: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS preflight
    if (method === 'OPTIONS') {
      return sendResponse({}, 200);
    }

    try {
      // ── Master Data ─────────────────────────────
      if (path.startsWith('/api/master')) {
        return await MasterController.handle(request, env, path);
      }

      // ── Tours ────────────────────────────────────
      if (path === '/api/tours' && method === 'GET') {
        return await TourController.getAllTours(env, url);
      }
      if (path === '/api/tours/generate-code' && method === 'GET') {
        return await TourController.generateAutoCode(env, url);
      }
      const tourIdMatch = path.match(/^\/api\/tours\/([a-zA-Z0-9_-]+)$/);
      if (tourIdMatch && method === 'GET') {
        return await TourController.getTourDetail(env, tourIdMatch[1]);
      }
      // Bulk CSV Import — accepts array of validated tour rows
      if (path === '/api/tours/bulk-import' && method === 'POST') {
        const rows = await request.json() as any[];
        const stmts = rows.map((row: any) => env.DB.prepare(
          `INSERT INTO tours (code, name, location_id, duration_days, base_price, max_capacity, status) VALUES (?, ?, 1, ?, ?, ?, ?)`
        ).bind(row.code, row.name, row.duration_days, row.base_price, row.max_capacity || 12, row.status || 'draft'));
        await env.DB.batch(stmts);
        return sendResponse({ imported: rows.length }, 200);
      }

      // ── Bookings ─────────────────────────────────
      if (path === '/api/bookings' && method === 'POST') {
        return await BookingController.createBooking(request, env);
      }
      const bookingRefMatch = path.match(/^\/api\/bookings\/([a-zA-Z0-9_-]+)$/);
      if (bookingRefMatch && method === 'GET') {
        return await BookingController.getBookingStatus(env, bookingRefMatch[1]);
      }
      const bookingStatusMatch = path.match(/^\/api\/bookings\/([a-zA-Z0-9_-]+)\/status$/);
      if (bookingStatusMatch && method === 'PUT') {
        return await BookingController.updatePaymentStatus(request, env, bookingStatusMatch[1]);
      }

      // ── Checkout (Anti-Tampering) ─────────────────
      if (path === '/api/checkout' && method === 'POST') {
        const body = await request.json() as any;
        const { tour_id, pax, customer_info, booking_date } = body;

        if (!tour_id || !pax || !customer_info?.email || !booking_date) {
          return sendError('Missing required checkout fields', 400);
        }

        // Server-side price recalculation — ignore any frontend total
        const tourRow = await env.DB.prepare('SELECT base_price, max_capacity FROM tours WHERE id = ?').bind(tour_id).first<{ base_price: number; max_capacity: number }>();
        if (!tourRow) return sendError('Tour not found', 404);

        const bookingRef = `NSTR-${Math.floor(10000 + Math.random() * 90000)}`;
        const securedTotal = tourRow.base_price * pax;

        return sendResponse({ status: 'success', booking_ref: bookingRef, secured_total_price: securedTotal }, 200);
      }

      // ── Payment Initiation (Orchestrator) ─────────
      if (path === '/api/payment/initiate' && method === 'POST') {
        const body = await request.json() as any;
        // In production: delegate to paymentOrchestrator logic using env.MIDTRANS_SERVER_KEY etc.
        // For now: return mock payment URL
        return sendResponse({
          status: 'payment_initiated',
          provider: 'midtrans',
          paymentUrl: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${body.order_id}`,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        }, 200);
      }

      // ── Payment Webhook ───────────────────────────
      if (path === '/api/webhooks/payment' && method === 'POST') {
        const body = await request.json() as any;
        const { order_id, transaction_status } = body;
        if (transaction_status === 'settlement' || transaction_status === 'capture') {
          await env.DB.prepare(`UPDATE bookings SET payment_status = 'PAID' WHERE booking_ref = ?`).bind(order_id).run();
        }
        return sendResponse({ received: true }, 200);
      }

      // ── Custom Trips ──────────────────────────────
      if (path === '/api/custom-trips' && method === 'POST') {
        return await CustomTripController.sumbitRequest(request, env);
      }
      if (path === '/api/custom-trips' && method === 'GET') {
        return await CustomTripController.listRequests(env);
      }
      const customTripQuoteMatch = path.match(/^\/api\/custom-trips\/([a-zA-Z0-9_-]+)\/quote$/);
      if (customTripQuoteMatch && method === 'PUT') {
        return await CustomTripController.sendQuote(request, env, customTripQuoteMatch[1]);
      }

      // ── Admin Analytics ───────────────────────────
      if (path === '/api/admin/metrics' && method === 'GET') {
        return await AdminController.getDashboardMetrics(env);
      }

      return sendError('Not Found', 404);
    } catch (e: any) {
      console.error(e);
      return sendError('Internal Server Error: ' + e.message, 500);
    }
  },
};
