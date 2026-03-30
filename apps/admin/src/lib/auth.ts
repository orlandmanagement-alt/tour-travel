import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

// Server-side permission check utility for API Routes
// Calling this throws an error or returns a Forbidden response
export async function requirePermission(permission: string) {
  const reqHeaders = await headers();
  const rawPermissions = reqHeaders.get('x-user-permissions');
  
  if (!rawPermissions) {
    throw new Error('UNAUTHORIZED: No permissions found in headers.');
  }

  const permissions: string[] = JSON.parse(rawPermissions);

  if (!permissions.includes('*') && !permissions.includes(permission)) {
    throw new Error(`FORBIDDEN: User lacks the required '${permission}' action rights.`);
  }

  return true;
}

// API Route wrapper helper
export const withPermission = (permission: string, handler: Function) => {
  return async (req: Request, ...args: any[]) => {
    try {
      await requirePermission(permission);
      return handler(req, ...args);
    } catch (e: any) {
      if (e.message.includes('FORBIDDEN')) {
        return NextResponse.json({ error: e.message }, { status: 403 });
      }
      return NextResponse.json({ error: e.message }, { status: 401 });
    }
  };
};
