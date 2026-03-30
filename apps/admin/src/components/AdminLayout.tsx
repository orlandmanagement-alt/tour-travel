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

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Master Data', path: '/master', icon: '🗃️' },
    { name: 'Tours', path: '/tours', icon: '🗺️' },
    { name: 'Bookings', path: '/bookings', icon: '📝' },
    { name: 'Custom Trips', path: '/custom-trips', icon: '✨' },
  ];

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
        
        <nav className="flex-1 py-4 space-y-2 px-3 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center px-3 py-3 rounded-lg transition-colors ${isActive ? 'bg-brand-accent text-white font-bold shadow-md' : 'text-slate-300 hover:bg-brand-primary-light hover:text-white'}`}
                title={item.name}
              >
                <span className={`text-xl ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`}>{item.icon}</span>
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
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
