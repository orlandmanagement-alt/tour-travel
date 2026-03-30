'use client';

import React, { ReactNode } from 'react';
// Ideally, get permissions from a global state/context hydrated by server
// For now, mock a hook:
const usePermissions = () => {
  // Mocking 'FINANCE' role for demonstration, normally this comes from Context
  const permissions = ['bookings.read', 'payments.approve']; 
  const role = 'FINANCE';
  return { permissions, role };
};

interface CanProps {
  I: string; // The permission required (e.g. 'tours.delete')
  children: ReactNode;
  fallback?: ReactNode;
}

export default function Can({ I, children, fallback }: CanProps) {
  const { permissions, role } = usePermissions();
  
  const hasAccess = permissions.includes('*') || permissions.includes(I);

  if (!hasAccess) {
    if (fallback) return <>{fallback}</>;
    
    // Default fallback: Render children as visual 'disabled' with a tooltip
    // We clone the element to inject disabled props
    if (React.isValidElement(children)) {
      return (
         <div className="relative group inline-block cursor-not-allowed">
            <div className="opacity-50 pointer-events-none grayscale">
               {children}
            </div>
            <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-xs rounded-lg shadow-xl text-center z-50 left-1/2 -translate-x-1/2 border border-slate-700">
               ⚠️ Access Restricted. You need <b>{I}</b> permission to perform this action.
            </div>
         </div>
      );
    }
    return null;
  }

  return <>{children}</>;
}
