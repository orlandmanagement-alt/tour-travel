'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (pathname === '/login') return;
    
    const token = sessionStorage.getItem('adminToken');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    router.push('/login');
  };

  if (pathname === '/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">Loading...</div>;
  }

  const userRole = typeof window !== 'undefined' ? sessionStorage.getItem('adminRole') || 'SUPER_ADMIN' : 'SUPER_ADMIN';

  type MenuItem = { name: string; path: string; icon: string; roles: string[]; section?: string };
  const menuItems: MenuItem[] = [
    // Core Operations
    { name: 'Dashboard', path: '/', icon: '📊', roles: ['SUPER_ADMIN', 'FINANCE', 'CONTENT_EDITOR'], section: 'Operations' },
    { name: 'Bookings', path: '/bookings', icon: '📝', roles: ['SUPER_ADMIN', 'FINANCE'], section: 'Operations' },
    { name: 'Assigned Trips', path: '/trips', icon: '🧭', roles: ['SUPER_ADMIN', 'GUIDE'], section: 'Operations' },
    // Content
    { name: 'Tours', path: '/tours', icon: '🗺️', roles: ['SUPER_ADMIN', 'CONTENT_EDITOR'], section: 'Content' },
    { name: 'Bulk Import', path: '/tours/bulk-import', icon: '📤', roles: ['SUPER_ADMIN', 'CONTENT_EDITOR'], section: 'Content' },
    { name: 'Master Data', path: '/master', icon: '🗃️', roles: ['SUPER_ADMIN', 'CONTENT_EDITOR'], section: 'Content' },
    // Intelligence
    { name: 'Analytics', path: '/analytics', icon: '📈', roles: ['SUPER_ADMIN', 'FINANCE'], section: 'Intelligence' },
    { name: 'Audit Logs', path: '/audit-logs', icon: '🔍', roles: ['SUPER_ADMIN'], section: 'Intelligence' },
    // Admin
    { name: 'Staff & Roles', path: '/users', icon: '👥', roles: ['SUPER_ADMIN'], section: 'Admin' },
    { name: 'Payment Config', path: '/settings/payments', icon: '💳', roles: ['SUPER_ADMIN'], section: 'Admin' },
  ].filter(item => item.roles.includes(userRole));

  // Group by section for sidebar rendering
  const sections = menuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
    const s = item.section || 'Other';
    if (!acc[s]) acc[s] = [];
    acc[s].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      
      {/* Sidebar */}
      <aside className={`bg-brand-primary text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col fixed inset-y-0 left-0 z-50`}>
        <div className="h-16 flex items-center justify-center border-b border-brand-primary-light">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold tracking-wider">NSTR Admin</h1>
          ) : (
            <h1 className="text-xl font-bold">N</h1>
          )}
        </div>
        
        <nav className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} className="mb-2">
              {isSidebarOpen && (
                <p className="text-[10px] font-extrabold tracking-[0.15em] uppercase text-white/30 px-3 pt-3 pb-1.5 select-none">
                  {section}
                </p>
              )}
              {items.map((item) => {
                const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-white/15 text-white font-bold shadow-inner backdrop-blur-sm'
                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                    title={item.name}
                  >
                    <span className={`text-base ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`}>{item.icon}</span>
                    {isSidebarOpen && (
                      <span className="text-sm font-semibold truncate">{item.name}</span>
                    )}
                    {isSidebarOpen && isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-brand-primary-light">
          <button 
            onClick={handleLogout}
            className={`flex items-center px-3 py-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors w-full ${!isSidebarOpen && 'justify-center'}`}
            title="Logout"
          >
            <span className={`text-xl ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`}>🚪</span>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 sticky top-0 z-40">
           <button 
             onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
             className="text-slate-500 hover:text-brand-primary outline-none"
           >
             <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/>
             </svg>
           </button>
           
           <div className="flex items-center space-x-4">
             <div className="text-sm text-slate-500 dark:text-slate-400">
               Hello, <span className="font-bold text-slate-800 dark:text-white">Admin Viewer</span>
             </div>
             <div className="w-8 h-8 bg-brand-accent rounded-full border-2 border-white dark:border-slate-700 shadow-sm"></div>
           </div>
        </header>

        {/* Page Content */}
        <div className="p-6 md:p-8 flex-1 overflow-x-hidden">
          {children}
        </div>
        
      </main>

    </div>
  );
}
