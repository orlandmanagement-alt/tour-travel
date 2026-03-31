import { sendResponse, sendError } from '../utils/responseHelper';
import { Env } from '../index';

export class ReviewController {
  static async getReviews(env: Env, tourId: string) {
    try {
      const { results } = await env.DB.prepare(`
        SELECT * FROM tour_reviews WHERE tour_id = ? ORDER BY created_at DESC
      `).bind(tourId).all();
      
      return sendResponse(results);
    } catch (e: any) {
      return sendError(e.message);
    }
  }

  static async submitReview(request: Request, env: Env, tourId: string) {
    try {
      const data: any = await request.json();
      const { customer_name, rating, comment } = data;

      if (!customer_name || !rating) {
        return sendError('Name and Rating are required', 400);
      }

      if (rating < 1 || rating > 5) {
        return sendError('Rating must be between 1 and 5', 400);
      }

      // Insert Review
      await env.DB.prepare(`
        INSERT INTO tour_reviews (tour_id, customer_name, rating, comment)
        VALUES (?, ?, ?, ?)
      `).bind(tourId, customer_name, rating, comment || '').run();

      // Update Tour Stats (Atomic update in D1)
      await env.DB.prepare(`
        UPDATE tours 
        SET 
          average_rating = (SELECT AVG(rating) FROM tour_reviews WHERE tour_id = ?),
          review_count = (SELECT COUNT(*) FROM tour_reviews WHERE tour_id = ?)
        WHERE id = ?
      `).bind(tourId, tourId, tourId).run();

      return sendResponse({ message: 'Review submitted successfully' }, 201);
    } catch (e: any) {
      return sendError(e.message);
    }
  }
}
