import { sendResponse, sendError } from '../utils/responseHelper';
import { Env } from '../index';

export class TourController {
  static async getAllTours(env: Env, url: URL) {
    try {
      // Extract query parameters for filtering
      const location = url.searchParams.get('location');
      const category = url.searchParams.get('category');
      const type = url.searchParams.get('type');
      const difficulty = url.searchParams.get('difficulty');
      const minPrice = url.searchParams.get('minPrice');
      const maxPrice = url.searchParams.get('maxPrice');

      let query = `
        SELECT 
          t.*, 
          l.city_name as location_name,
          c.category_name,
          tr.type_name as trip_type
        FROM tours t
        LEFT JOIN master_locations l ON t.base_location_id = l.id
        LEFT JOIN master_categories c ON t.category_id = c.id
        LEFT JOIN master_trip_types tr ON t.trip_type_id = tr.id
        WHERE t.is_active = 1
      `;
      let params: any[] = [];

      if (location) {
        query += ` AND l.city_code = ?`;
        params.push(location);
      }
      if (category) {
        query += ` AND c.category_name = ?`;
        params.push(category);
      }
      if (type) {
        query += ` AND tr.type_name = ?`;
        params.push(type);
      }
      if (difficulty) {
        query += ` AND t.difficulty_level = ?`;
        params.push(difficulty);
      }
      if (minPrice) {
        query += ` AND t.base_price >= ?`;
        params.push(minPrice);
      }
      if (maxPrice) {
        query += ` AND t.base_price <= ?`;
        params.push(maxPrice);
      }

      query += ` ORDER BY t.created_at DESC`;

      const { results } = await env.DB.prepare(query).bind(...params).all();
      return sendResponse(results);
    } catch (e: any) {
      return sendError(e.message);
    }
  }

  static async getTourDetail(env: Env, tourCodeOrId: string) {
    try {
      // Main Tour data
      const tourQuery = await env.DB.prepare(`
        SELECT 
          t.*, 
          l.city_name as location_name,
          c.category_name,
          tr.type_name as trip_type
        FROM tours t
        LEFT JOIN master_locations l ON t.base_location_id = l.id
        LEFT JOIN master_categories c ON t.category_id = c.id
        LEFT JOIN master_trip_types tr ON t.trip_type_id = tr.id
        WHERE t.id = ? OR t.tour_code = ?
      `).bind(tourCodeOrId, tourCodeOrId).first();

      if (!tourQuery) {
        return sendError('Tour not found', 404);
      }

      const tourId = tourQuery.id;

      // Pricing Tiers
      const { results: pricingTiers } = await env.DB.prepare(`
        SELECT * FROM tour_pricing_tiers WHERE tour_id = ? ORDER BY min_pax ASC
      `).bind(tourId).all();

      // Itineraries
      const { results: itineraries } = await env.DB.prepare(`
        SELECT * FROM tour_itineraries WHERE tour_id = ? ORDER BY day_number ASC, start_time ASC
      `).bind(tourId).all();

      // Addons
      const { results: addons } = await env.DB.prepare(`
        SELECT * FROM tour_addons WHERE tour_id = ?
      `).bind(tourId).all();

      // Surcharges
      const { results: surcharges } = await env.DB.prepare(`
        SELECT * FROM tour_surcharges WHERE tour_id = ? AND end_date >= date('now')
      `).bind(tourId).all();

      const payload = {
        ...tourQuery,
        pricing_tiers: pricingTiers,
        itineraries: itineraries,
        addons: addons,
        surcharges: surcharges
      };

      return sendResponse(payload);
    } catch (e: any) {
      return sendError(e.message);
    }
  }

  static async generateAutoCode(env: Env, url: URL) {
    try {
      const prefix = url.searchParams.get('prefix');
      if (!prefix) return sendError("Prefix is required", 400);

      const query = await env.DB.prepare(`SELECT COUNT(*) as cnt FROM tours WHERE tour_code LIKE ?`).bind(`${prefix}-%`).first();
      // @ts-ignore
      const count = query ? query.cnt : 0;
      const nextNum = Number(count) + 1;
      const formattedNum = nextNum.toString().padStart(6, '0');
      
      return sendResponse({ tour_code: `${prefix}-${formattedNum}` });
    } catch (e: any) {
      return sendError(e.message);
    }
  }
}
