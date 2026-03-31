import { sendResponse, sendError } from '../utils/responseHelper';
import { hashPassword, generateSalt, verifyPassword, signJWT, verifyJWT } from '../utils/authHelper';

const JWT_SECRET = 'nstr-secret-5uper-safe-key-2026'; // In production, move to env variables

export class AuthController {
  
  // POST /api/auth/register
  static async register(request: Request, env: any): Promise<Response> {
    try {
      const body = await request.json() as any;
      const { name, email, password, role } = body;

      if (!name || !email || !password) {
        return sendError('Name, email, and password are required', 400);
      }

      const safeRole = role === 'agent' || role === 'admin' ? role : 'user';

      // Check if user exists
      const existingUser = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
      if (existingUser) {
        return sendError('Email is already registered', 409);
      }

      // Generate Affiliate Code: First name lowercase + random 4 digits
      const firstName = name.split(' ')[0].replace(/[^a-zA-Z]/g, '').toLowerCase() || 'user';
      const affiliateCode = `${firstName}${Math.floor(1000 + Math.random() * 9000)}`;

      const salt = generateSalt();
      const hashed = await hashPassword(password, salt);

      const result = await env.DB.prepare(
        'INSERT INTO users (name, email, password_hash, salt, affiliate_code, role) VALUES (?, ?, ?, ?, ?, ?) RETURNING id'
      ).bind(name, email, hashed, salt, affiliateCode, safeRole).first();

      const payload = {
        sub: result.id,
        email: email,
        role: safeRole,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
      };
      const token = await signJWT(payload, JWT_SECRET);

      return sendResponse({ 
        message: 'Registration successful',
        token,
        user: { id: result.id, name, email, role: safeRole, affiliate_code: affiliateCode, nusaPoin: 0 }
      }, 201);
    } catch (error: any) {
      return sendError('Registration failed: ' + error.message, 500);
    }
  }

  // POST /api/auth/login
  static async login(request: Request, env: any): Promise<Response> {
    try {
      const body = await request.json() as any;
      const { email, password } = body;

      if (!email || !password) {
        return sendError('Email and password required', 400);
      }

      const user = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
      if (!user) {
        return sendError('Invalid credentials', 401);
      }

      const isValid = await verifyPassword(password, user.salt, user.password_hash);
      if (!isValid) {
        return sendError('Invalid credentials', 401);
      }

      // Payload: expires in 24 hours
      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
      };

      const token = await signJWT(payload, JWT_SECRET);

      return sendResponse({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          nusaPoin: user.nusa_poin,
          affiliate_code: user.affiliate_code
        }
      }, 200);
    } catch (error: any) {
      return sendError('Login failed: ' + error.message, 500);
    }
  }

  // GET /api/auth/me
  static async getMe(request: Request, env: any): Promise<Response> {
    try {
      const authHeader = request.headers.get('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return sendError('Unauthorized', 401);
      }

      const token = authHeader.split(' ')[1];
      const decoded = await verifyJWT(token, JWT_SECRET);

      if (!decoded || !decoded.sub) {
        return sendError('Invalid or expired token', 401);
      }

      const user = await env.DB.prepare('SELECT id, name, email, role, nusa_poin, affiliate_code FROM users WHERE id = ?').bind(decoded.sub).first();
      
      if (!user) {
        return sendError('User not found', 404);
      }

      return sendResponse({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          nusaPoin: user.nusa_poin,
          affiliate_code: user.affiliate_code,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name as string)}&background=e0e7ff&color=4f46e5&rounded=true&bold=true`
        }
      }, 200);

    } catch (error: any) {
      return sendError('Verification failed: ' + error.message, 500);
    }
  }
}
