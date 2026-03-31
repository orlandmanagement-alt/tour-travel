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
    
    // Auto-login for development if no token
    if (!sessionStorage.getItem('adminToken')) {
      sessionStorage.setItem('adminToken', 'mock_token');
      sessionStorage.setItem('adminRole', 'SUPER_ADMIN');
    }
    
    setIsAuthenticated(true);
  }, [pathname, router]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    router.push('/login');
  };

  if (pathname === '/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Authenticating...</p>
        </div>
      </div>
    );
  }

  const userRole = typeof window !== 'undefined' ? sessionStorage.getItem('adminRole') || 'SUPER_ADMIN' : 'SUPER_ADMIN';

  type MenuItem = { name: string; path: string; icon: string; roles: string[]; section?: string; count?: number };
  const menuItems: MenuItem[] = [
    // Main Menu
    { name: 'Dashboard', path: '/', icon: 'fa-chart-pie', roles: ['SUPER_ADMIN', 'FINANCE'], section: 'Main Menu' },
    { name: 'Semua Pesanan', path: '/bookings', icon: 'fa-cart-shopping', roles: ['SUPER_ADMIN', 'FINANCE'], section: 'Main Menu', count: 12 },
    
    // Manajemen Produk
    { name: 'Kelola Tour', path: '/tours', icon: 'fa-map-location-dot', roles: ['SUPER_ADMIN', 'CONTENT_EDITOR'], section: 'Manajemen Produk' },
    { name: 'Kelola Kendaraan', path: '/cars', icon: 'fa-car', roles: ['SUPER_ADMIN'], section: 'Manajemen Produk' },
    { name: 'Promo & Kupon', path: '/promos', icon: 'fa-tags', roles: ['SUPER_ADMIN'], section: 'Manajemen Produk' },
    { name: 'Blog CMS', path: '/blog', icon: 'fa-newspaper', roles: ['SUPER_ADMIN', 'CONTENT_EDITOR'], section: 'Manajemen Produk' },
    
    // Laporan & Sistem
    { name: 'Data Pelanggan', path: '/users', icon: 'fa-users', roles: ['SUPER_ADMIN'], section: 'Laporan & Sistem' },
    { name: 'Keuangan', path: '/analytics', icon: 'fa-file-invoice-dollar', roles: ['SUPER_ADMIN', 'FINANCE'], section: 'Laporan & Sistem' },
    { name: 'Audit Logs', path: '/audit-logs', icon: 'fa-history', roles: ['SUPER_ADMIN'], section: 'Laporan & Sistem' },
    { name: 'Pengaturan Web', path: '/settings', icon: 'fa-gear', roles: ['SUPER_ADMIN'], section: 'Laporan & Sistem' },
  ].filter(item => item.roles.includes(userRole));

  // Group by section
  const sections = menuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
    const s = item.section || 'Other';
    if (!acc[s]) acc[s] = [];
    acc[s].push(item);
    return acc;
  }, {});

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50 font-sans">
      
      {/* Sidebar */}
      <aside className={`bg-brand-900 text-brand-200 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0 md:w-20'} flex flex-col h-full shadow-xl z-50 flex-shrink-0 relative overflow-hidden backdrop-blur-md`}>
        
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-white/10 bg-brand-950 flex-shrink-0">
          <Link href="/" className="font-extrabold text-xl tracking-tighter text-white flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded bg-accent-500 text-white flex items-center justify-center flex-shrink-0 shadow">
              <i className="fa-solid fa-paper-plane text-xs"></i>
            </div>
            {isSidebarOpen && (
              <span className="whitespace-nowrap">NusaTrip <span className="text-[10px] font-normal text-brand-300 ml-1 uppercase tracking-widest bg-white/10 px-1.5 py-0.5 rounded">Admin</span></span>
            )}
          </Link>
        </div>
        
        {/* Nav Content */}
        <div className="flex-1 overflow-y-auto py-6 custom-scrollbar scroll-smooth">
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} className="mb-8">
              {isSidebarOpen && (
                <p className="px-6 text-[10px] font-black text-brand-400 uppercase tracking-[0.2em] mb-4 select-none opacity-50">
                  {section}
                </p>
              )}
              <nav className="flex flex-col gap-1">
                {items.map((item) => {
                  const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`group relative flex items-center px-6 py-3.5 text-sm font-bold transition-all duration-300 border-l-[3px] ${
                        isActive
                          ? 'bg-white/10 text-white border-accent-500'
                          : 'text-brand-300 border-transparent hover:bg-white/5 hover:text-white hover:border-accent-500/50'
                      }`}
                      title={item.name}
                    >
                      <i className={`fa-solid ${item.icon} w-5 text-center flex-shrink-0 group-hover:scale-110 transition-transform ${isActive ? 'text-accent-400' : ''}`}></i>
                      {isSidebarOpen && (
                        <span className="ml-3 truncate whitespace-nowrap">{item.name}</span>
                      )}
                      {isSidebarOpen && item.count && (
                        <span className={`ml-auto text-[9px] font-black px-2 py-0.5 rounded-full ${isActive ? 'bg-accent-500 text-white' : 'bg-brand-700 text-brand-300 group-hover:bg-accent-500 group-hover:text-white'} transition-colors`}>
                          {item.count}
                        </span>
                      )}
                      {!isSidebarOpen && isActive && (
                        <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-accent-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-white/10 bg-brand-950 flex-shrink-0">
          <div className="flex items-center gap-3">
            <img 
              src="https://ui-avatars.com/api/?name=Admin+Nusa&background=f97316&color=fff" 
              alt="Admin" 
              className="w-10 h-10 rounded-xl border border-white/20 shadow-lg object-cover flex-shrink-0"
            />
            {isSidebarOpen && (
              <div className="flex-1 min-w-0 pr-2">
                <p className="text-xs font-black text-white truncate uppercase tracking-tight">Super Admin</p>
                <p className="text-[9px] font-bold text-brand-400 truncate tracking-tight">admin@nusatrip.com</p>
              </div>
            )}
            <button 
              onClick={handleLogout}
              className="text-brand-400 hover:text-white transition-all hover:scale-110 active:scale-95" 
              title="Logout"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Global Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 z-40 shadow-sm flex-shrink-0 sticky top-0">
          <div className="flex items-center gap-6">
            {/* Sidebar Toggle */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 hover:bg-brand-50 hover:text-brand-600 transition-all flex items-center justify-center border border-slate-100"
            >
              <i className={`fa-solid ${isSidebarOpen ? 'fa-indent rotate-180' : 'fa-indent'}`}></i>
            </button>

            {/* Global Search Bar */}
            <div className="hidden lg:flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 w-[400px] focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10 transition-all duration-300">
              <i className="fa-solid fa-magnifying-glass text-slate-400 text-sm"></i>
              <input 
                type="text" 
                placeholder="Cari No. Invoice, Nama Pelanggan..." 
                className="bg-transparent border-none outline-none text-xs ml-3 w-full text-slate-700 font-bold placeholder:text-slate-400 placeholder:font-medium"
              />
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-black text-slate-400 bg-white border border-slate-200 rounded shadow-sm opacity-50 uppercase tracking-widest">⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Center */}
            <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-brand-50 hover:text-brand-600 transition-all relative border border-slate-100 group">
              <i className="fa-regular fa-bell group-hover:animate-swing"></i>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
            
            {/* Direct Link to Store */}
            <a 
              href="/" 
              target="_blank" 
              className="hidden sm:flex items-center gap-2 text-[10px] font-black text-brand-600 bg-brand-50/50 hover:bg-brand-50 px-4 py-2.5 rounded-xl border border-brand-100 transition-all group"
            >
              LIHAT WEBSITE 
              <i className="fa-solid fa-arrow-up-right-from-square text-[9px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
            </a>
          </div>
        </header>

        {/* Page Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full custom-scrollbar bg-slate-50/50">
          <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-10 relative">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}
