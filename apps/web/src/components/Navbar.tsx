'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hideNavPaths = ['/custom-trip', '/checkout', '/checkout/success', '/login', '/register', '/affiliate', '/corporate', '/help', '/about', '/contact'];
  if (hideNavPaths.includes(pathname) || pathname.startsWith('/blog') || pathname.startsWith('/dashboard')) return null;

  return (
    <>
      {/* OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-[60] backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* MOBILE SIDEBAR */}
      <aside className={`fixed top-0 left-0 w-[280px] h-full bg-white z-[70] transform transition-transform duration-300 shadow-2xl overflow-y-auto flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex justify-between items-center border-b border-slate-100 bg-brand-50">
            <div className="flex items-center gap-2 font-extrabold text-xl text-brand-900">
                <div className="w-8 h-8 rounded bg-brand-600 text-white flex items-center justify-center text-sm"><i className="fa-solid fa-paper-plane"></i></div>
                NusaTrip
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="text-slate-500 hover:text-red-500 text-xl"><i className="fa-solid fa-xmark"></i></button>
        </div>
        
        <div className="flex justify-center gap-4 py-3 border-b border-slate-100 bg-slate-50">
            <button className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-white px-2 py-1 rounded shadow-sm border border-slate-200"><img src="https://flagcdn.com/w20/id.png" alt="ID" className="w-4" /> IND</button>
            <button className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700"><img src="https://flagcdn.com/w20/gb.png" alt="EN" className="w-4 opacity-50" /> ENG</button>
        </div>

        <nav className="p-4 flex flex-col gap-1">
            <Link href="/" onClick={() => setIsSidebarOpen(false)} className="py-2 px-3 text-sm font-bold text-brand-600 bg-brand-50 rounded"><i className="fa-solid fa-house w-6 text-brand-600"></i> Beranda</Link>
            <Link href="/custom-trip" onClick={() => setIsSidebarOpen(false)} className="py-2 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded flex items-center gap-2"><div className="w-6 text-center text-slate-400"><i className="fa-solid fa-wand-magic-sparkles"></i></div> Trip Planner <span className="text-[9px] bg-brand-100 text-brand-600 font-bold px-1.5 py-0.5 rounded ml-auto">BARU</span></Link>
            <Link href="/tours" onClick={() => setIsSidebarOpen(false)} className="py-2 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded"><i className="fa-solid fa-map-location-dot w-6 text-slate-400"></i> Paket Tour</Link>
            <Link href="/cars" onClick={() => setIsSidebarOpen(false)} className="py-2 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded"><i className="fa-solid fa-car w-6 text-slate-400"></i> Rental Mobil</Link>
        </nav>
        
        <div className="p-4 border-t border-slate-100 mt-auto">
            <Link href="/login" className="w-full flex items-center justify-center py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold rounded shadow mb-2 transition-colors"><i className="fa-solid fa-right-to-bracket mr-2"></i> Login / Register</Link>
        </div>
      </aside>

      {/* HEADER DESKTOP */}
      <header className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/95 backdrop-blur shadow-sm border-slate-200 py-2' : 'bg-white border-transparent py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-12">
            
            <div className="flex items-center gap-3">
                <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-slate-600 text-xl"><i className="fa-solid fa-bars-staggered"></i></button>
                <Link href="/" className="font-extrabold text-2xl tracking-tighter text-brand-900 flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-600 to-accent-500 text-white flex items-center justify-center shadow"><span className="text-sm"><i className="fa-solid fa-paper-plane"></i></span></div>
                    NusaTrip
                </Link>
            </div>

            <nav className="hidden md:flex items-center gap-6">
                <Link href="/" className={`text-sm font-bold ${pathname === '/' ? 'text-brand-600 border-b-2 border-brand-600 pb-1' : 'text-slate-600 hover:text-brand-600 font-medium'}`}><i className="fa-solid fa-house mr-1"></i> Home</Link>
                <Link href="/custom-trip" className="text-sm font-medium text-slate-600 hover:text-brand-600 flex items-center gap-1.5"><i className="fa-solid fa-wand-magic-sparkles text-brand-500"></i> Trip Planner <span className="bg-brand-100 text-brand-600 text-[9px] px-1 py-0.5 rounded-full font-bold relative bottom-1 shadow-sm">BARU</span></Link>
                <Link href="/tours" className="text-sm font-medium text-slate-600 hover:text-brand-600"><i className="fa-solid fa-map-location-dot mr-1 text-slate-400"></i> Paket Tour</Link>
                <Link href="/cars" className="text-sm font-medium text-slate-600 hover:text-brand-600"><i className="fa-solid fa-car mr-1 text-slate-400"></i> Rent Car</Link>
            </nav>

            <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-1 border-r border-slate-200 pr-4">
                    <img src="https://flagcdn.com/w20/id.png" alt="ID" className="w-4 cursor-pointer hover:scale-110 transition-transform" />
                    <img src="https://flagcdn.com/w20/gb.png" alt="EN" className="w-4 opacity-40 cursor-pointer hover:opacity-100 transition-opacity" />
                </div>

                <div 
                  className="relative group"
                  onMouseEnter={() => setIsLoginOpen(true)}
                  onMouseLeave={() => setIsLoginOpen(false)}
                >
                    <button className="flex items-center gap-2 px-4 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-colors">
                        <i className="fa-regular fa-user"></i> Login
                    </button>
                    
                    {isLoginOpen && (
                      <div className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur shadow-2xl border border-slate-200 rounded-xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                          <h3 className="text-brand-900 font-bold text-lg mb-4 text-center">Masuk ke Akun</h3>
                          <form onSubmit={(e) => e.preventDefault()}>
                              <div className="mb-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 bg-slate-50 border border-slate-200 rounded px-3 py-2 flex items-center gap-2 transition-all">
                                  <i className="fa-solid fa-envelope text-slate-400 text-sm"></i>
                                  <input type="email" placeholder="Email / Username" className="bg-transparent w-full text-sm outline-none font-medium text-slate-800" />
                              </div>
                              <div className="mb-2 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 bg-slate-50 border border-slate-200 rounded px-3 py-2 flex items-center gap-2 relative transition-all">
                                  <i className="fa-solid fa-lock text-slate-400 text-sm"></i>
                                  <input type={showPass ? 'text' : 'password'} placeholder="Password" className="bg-transparent w-full text-sm outline-none font-medium text-slate-800 pr-6" />
                                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 text-slate-400 hover:text-brand-600">
                                      <i className={`fa-solid ${showPass ? 'fa-eye' : 'fa-eye-slash'} text-xs`}></i>
                                  </button>
                              </div>
                              <div className="flex justify-end mb-4">
                                  <Link href="/lupa-password" className="text-[11px] font-medium text-brand-600 hover:underline">Lupa Password?</Link>
                              </div>
                              <Link href="/login" className="w-full flex justify-center items-center bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 rounded shadow-md shadow-brand-500/30 transition-colors text-sm mb-3">
                                  Login <i className="fa-solid fa-arrow-right ml-1"></i>
                              </Link>
                              <p className="text-center text-xs text-slate-500">Belum punya akun? <Link href="/register" className="text-brand-600 font-bold hover:underline">Daftar</Link></p>
                          </form>
                      </div>
                    )}
                </div>
            </div>
        </div>
      </header>
    </>
  );
}
