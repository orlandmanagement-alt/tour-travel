import { sendResponse, sendError } from '../utils/responseHelper';
import { Env } from '../index';

export class MasterController {
  static async handle(request: Request, env: Env, path: string) {
    try {
      if (path === '/api/master/locations') {
        const { results } = await env.DB.prepare('SELECT * FROM master_locations').all();
        return sendResponse(results);
      }
      
      if (path === '/api/master/categories') {
        const { results } = await env.DB.prepare('SELECT * FROM master_categories').all();
        return sendResponse(results);
      }

      if (path === '/api/master/trip-types') {
        const { results } = await env.DB.prepare('SELECT * FROM master_trip_types').all();
        return sendResponse(results);
      }

      return sendError('Master endpoint not found', 404);
    } catch (e: any) {
      return sendError(e.message);
    }
  }
}
