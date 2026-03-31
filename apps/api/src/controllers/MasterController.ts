import { sendResponse, sendError } from '../utils/responseHelper';
import { Env } from '../index';

export class MasterController {
  static async handle(request: Request, env: Env, path: string) {
    try {
      const url = new URL(request.url);
      
      // GET requests
      if (request.method === 'GET') {
        if (path === '/api/master/locations') {
          const { results } = await env.DB.prepare('SELECT * FROM master_locations').all();
          return sendResponse(results);
        }
        if (path === '/api/master/categories') {
          const { results } = await env.DB.prepare('SELECT * FROM master_categories').all();
          return sendResponse(results);
        }
        if (path === '/api/master/addons') {
          const locationId = url.searchParams.get('location_id');
          let query = 'SELECT * FROM master_addons';
          let params: any[] = [];
          if (locationId) {
            query += ' WHERE location_id = ?';
            params.push(locationId);
          }
          const { results } = await env.DB.prepare(query).bind(...params).all();
          return sendResponse(results);
        }
      }
      
      // POST requests
      if (request.method === 'POST') {
         const body: any = await request.json();
         if (path === '/api/master/locations') {
            const { results } = await env.DB.prepare('INSERT INTO master_locations (city_code, city_name, province) VALUES (?, ?, ?) RETURNING *')
              .bind(body.city_code || 'NEW', body.city_name, body.province || 'Unknown').all();
            return sendResponse(results[0]);
         }
         if (path === '/api/master/addons') {
            const { results } = await env.DB.prepare('INSERT INTO master_addons (addon_name, location_id, charge_type, default_price) VALUES (?, ?, ?, ?) RETURNING *')
              .bind(body.addon_name, body.location_id, body.charge_type, body.default_price).all();
            return sendResponse(results[0]);
         }
      }

      // PUT requests
      if (request.method === 'PUT') {
         const body: any = await request.json();
         if (path.startsWith('/api/master/locations/')) {
            const id = path.split('/').pop();
            const { results } = await env.DB.prepare('UPDATE master_locations SET city_code = ?, city_name = ?, province = ? WHERE id = ? RETURNING *')
              .bind(body.city_code, body.city_name, body.province, id).all();
            return sendResponse(results[0]);
         }
         if (path.startsWith('/api/master/addons/')) {
            const id = path.split('/').pop();
            const { results } = await env.DB.prepare('UPDATE master_addons SET addon_name = ?, location_id = ?, charge_type = ?, default_price = ? WHERE id = ? RETURNING *')
              .bind(body.addon_name, body.location_id, body.charge_type, body.default_price, id).all();
            return sendResponse(results[0]);
         }
      }

      // DELETE requests
      if (request.method === 'DELETE') {
         if (path.startsWith('/api/master/locations/')) {
            const id = path.split('/').pop();
            await env.DB.prepare('DELETE FROM master_locations WHERE id = ?').bind(id).run();
            return sendResponse({ success: true });
         }
         if (path.startsWith('/api/master/addons/')) {
            const id = path.split('/').pop();
            await env.DB.prepare('DELETE FROM master_addons WHERE id = ?').bind(id).run();
            return sendResponse({ success: true });
         }
      }

      return sendError('Master endpoint not found', 404);
    } catch (e: any) {
      return sendError(e.message);
    }
  }
}
