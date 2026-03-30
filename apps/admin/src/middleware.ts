import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mock edge JWT verification (replace with actual 'jose' jwtVerify in production)
const decryptMockJWT = (token: string) => {
  if (token === 'admin-token') {
    return { role: 'SUPER_ADMIN', permissions: ['*'] };
  } else if (token === 'guide-token') {
    return { role: 'GUIDE', permissions: ['tours.read', 'tickets.scan'] };
  } else if (token === 'finance-token') {
    return { role: 'FINANCE', permissions: ['bookings.read', 'payments.approve'] };
  }
  return null;
};

export async function middleware(request: NextRequest) {
  // Protect all /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('session_token')?.value || 'admin-token'; // Fallback to admin for dev
    
    // Decode user without hitting D1 database (Zero Latency)
    const userRoleData = decryptMockJWT(authCookie);
    
    if (!userRoleData) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Role-Based Interception Example:
    // If a GUIDE tries to access finance or settings, blocks them at Edge Level
    if (userRoleData.role === 'GUIDE' && (
      request.nextUrl.pathname.includes('/settings') || 
      request.nextUrl.pathname.includes('/master') ||
      request.nextUrl.pathname.includes('/finance')
    )) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Pass the user role to headers so Server Components can read it
    const response = NextResponse.next();
    response.headers.set('x-user-role', userRoleData.role);
    response.headers.set('x-user-permissions', JSON.stringify(userRoleData.permissions));
    
    return response;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // matcher logic for edge
};
