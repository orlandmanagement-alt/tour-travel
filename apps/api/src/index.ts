import { sendResponse, sendError } from './utils/responseHelper';
import { MasterController } from './controllers/MasterController';
import { TourController } from './controllers/TourController';
import { BookingController } from './controllers/BookingController';
import { CustomTripController } from './controllers/CustomTripController';
import { AdminController } from './controllers/AdminController';

export interface Env {
  DB: D1Database;
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
      // API Router
      if (path.startsWith('/api/master')) {
        return await MasterController.handle(request, env, path);
      }
      
      if (path === '/api/tours' && method === 'GET') {
        return await TourController.getAllTours(env, url);
      }

      const tourIdMatch = path.match(/^\/api\/tours\/([a-zA-Z0-9_-]+)$/);
      if (tourIdMatch && method === 'GET') {
        return await TourController.getTourDetail(env, tourIdMatch[1]);
      }

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
