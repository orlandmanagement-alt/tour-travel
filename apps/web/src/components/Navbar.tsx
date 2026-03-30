'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '/', icon: 'fa-house' },
    { name: 'Paket Tour', href: '/tours', icon: 'fa-map-location-dot' },
    { name: 'Destinasi', href: '/destinations', icon: 'fa-earth-asia' },
    { name: 'Rent Car', href: '/rental', icon: 'fa-car' },
    { name: 'Planner', href: '/planner', icon: 'fa-wand-magic-sparkles' },
    { name: 'Corporate', href: '/corporate', icon: 'fa-building-shield' },
    { name: 'Promo', href: '/promo', icon: 'fa-tags', badge: 'HOT' },
  ];

  return (
    <>
      {/* OVERLAY FOR MOBILE SIDEBAR */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-[60] backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* HEADER / NAVBAR */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur shadow-sm py-2' : 'bg-white/80 backdrop-blur-sm py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-12">
          
          {/* Mobile Toggle & Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsOpen(true)}
              className="md:hidden text-slate-600 text-xl hover:text-brand-primary transition-colors"
            >
              <i className="fa-solid fa-bars-staggered"></i>
            </button>
            <Link href="/" className="font-extrabold text-2xl tracking-tighter text-brand-900 flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-primary to-brand-accent text-white flex items-center justify-center shadow-md">
                <span className="text-sm"><i className="fa-solid fa-paper-plane"></i></span>
              </div>
              <span className="hidden xs:inline">NusaTrip</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`text-sm font-medium transition-all duration-300 relative group flex items-center gap-1.5 ${
                  pathname === link.href ? 'text-brand-primary font-bold' : 'text-slate-600 hover:text-brand-primary'
                }`}
              >
                <i className={`fa-solid ${link.icon} text-xs opacity-70`}></i>
                {link.name}
                {link.badge && (
                  <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full relative -top-2 -ml-1 animate-pulse">
                    {link.badge}
                  </span>
                )}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-primary transition-all duration-300 ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </nav>

          {/* Lang & Auth */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 border-r border-slate-200 pr-4">
              <button className="hover:scale-110 transition-transform"><img src="https://flagcdn.com/w20/id.png" alt="ID" className="w-4 shadow-sm" /></button>
              <button className="opacity-40 hover:opacity-100 transition-opacity"><img src="https://flagcdn.com/w20/gb.png" alt="EN" className="w-4 shadow-sm" /></button>
            </div>

            {/* Login Dropdown Wrapper */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-brand-primary hover:text-white text-slate-700 text-sm font-bold transition-all duration-300 shadow-sm">
                <i className="fa-regular fa-user"></i> 
                <span className="hidden xs:inline">Masuk</span>
              </button>
              
              {/* Form Dropdown */}
              <div className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-md rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:translate-y-0 translate-y-2 p-6 shadow-2xl border border-slate-100 z-50">
                <h3 className="text-brand-900 font-bold text-lg mb-4 text-center">Masuk ke Akun</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3 bg-slate-50 border border-slate-200 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10 rounded-xl px-4 py-2.5 flex items-center gap-3 transition-all">
                    <i className="fa-solid fa-envelope text-slate-400 text-sm"></i>
                    <input type="email" placeholder="Email / Username" className="bg-transparent w-full text-sm outline-none font-medium placeholder:text-slate-400" />
                  </div>
                  <div className="mb-2 bg-slate-50 border border-slate-200 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10 rounded-xl px-4 py-2.5 flex items-center gap-3 relative transition-all">
                    <i className="fa-solid fa-lock text-slate-400 text-sm"></i>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Password" 
                      className="bg-transparent w-full text-sm outline-none font-medium placeholder:text-slate-400 pr-8" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-slate-400 hover:text-brand-primary transition-colors"
                    >
                      <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} text-xs`}></i>
                    </button>
                  </div>
                  <div className="flex justify-end mb-4">
                    <Link href="/forgot-password" title="Lupa Password?" className="text-[11px] font-semibold text-brand-primary hover:underline">Lupa Password?</Link>
                  </div>
                  <button className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 rounded-xl shadow-lg shadow-brand-primary/20 transition-all text-sm mb-4 transform hover:-translate-y-0.5">
                    Login <i className="fa-solid fa-arrow-right-to-bracket ml-2"></i>
                  </button>
                  <p className="text-center text-xs text-slate-500">
                    Belum punya akun? <Link href="/register" className="text-brand-primary font-bold hover:underline">Daftar Sekarang</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <aside className={`fixed top-0 left-0 w-[280px] h-full bg-white z-[70] transform transition-transform duration-300 ease-in-out shadow-2xl overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center border-b border-slate-100 bg-brand-50/50">
          <div className="flex items-center gap-2 font-extrabold text-xl text-brand-900 uppercase tracking-tighter">
            <div className="w-8 h-8 rounded bg-brand-primary text-white flex items-center justify-center text-sm shadow-sm">
              <i className="fa-solid fa-n"></i>
            </div>
            NusaTrip
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <nav className="p-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className={`py-3 px-4 rounded-xl text-sm font-bold flex items-center gap-3 transition-all ${
                pathname === link.href 
                ? 'text-brand-primary bg-brand-50 shadow-sm border border-brand-100' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <i className={`fa-solid ${link.icon} w-5 text-center`}></i>
              {link.name}
              {link.badge && (
                <span className="bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded ml-auto">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
          
          <div className="my-4 border-t border-slate-100"></div>
          
          <Link 
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="py-3 px-4 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3"
          >
            <i className="fa-solid fa-user-gear w-5 text-center"></i>
            Dashboard User
          </Link>
          
          <Link 
            href="/faq"
            onClick={() => setIsOpen(false)}
            className="py-3 px-4 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3"
          >
            <i className="fa-solid fa-circle-question w-5 text-center"></i>
            Pusat Bantuan
          </Link>

          <Link 
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="py-3 px-4 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3"
          >
            <i className="fa-solid fa-newspaper w-5 text-center"></i>
            Travel Blog
          </Link>
        </nav>
        
        <div className="p-6 border-t border-slate-100 mt-auto">
          <Link 
            href="/login" 
            onClick={() => setIsOpen(false)}
            className="w-full py-3 bg-brand-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-right-to-bracket"></i>
            Login / Register
          </Link>
        </div>
      </aside>
    </>
  );
}
