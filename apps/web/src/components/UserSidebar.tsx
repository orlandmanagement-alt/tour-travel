'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UserSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Pesanan Saya', href: '/dashboard', icon: 'fa-solid fa-clipboard-list' },
    { name: 'Promo & Kupon', href: '/promo/my', icon: 'fa-solid fa-ticket', label: '2' },
    { name: 'Wishlist', href: '/wishlist', icon: 'fa-regular fa-heart' },
    { name: 'Ulasan Saya', href: '/reviews', icon: 'fa-regular fa-star' },
    { name: 'Detail Profil', href: '/profile', icon: 'fa-regular fa-user', separator: true },
    { name: 'Keluar', href: '/logout', icon: 'fa-solid fa-arrow-right-from-bracket', color: 'text-red-500' }
  ];

  return (
    <aside className="w-full lg:w-[280px] shrink-0">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm overflow-hidden sticky top-28">
        {/* User Loyalty Info */}
        <div className="p-6 bg-gradient-to-br from-indigo-600 to-indigo-500 text-white relative overflow-hidden">
          <div className="absolute right-[-20px] top-[-20px] text-6xl opacity-10 rotate-12">❤️</div>
          <div className="flex items-center gap-4 mb-4">
            <img src="https://ui-avatars.com/api/?name=Budi+Santoso&background=fff&color=4f46e5&rounded=true&bold=true" alt="Profile" className="w-12 h-12 rounded-full border-2 border-white/30" />
            <div>
              <h3 className="font-black text-sm uppercase tracking-tight">Budi Santoso</h3>
              <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Silver Member</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] mb-1 text-center">NusaPoin Saya</p>
            <p className="text-xl font-black tabular-nums text-center">12.500 <span className="text-[10px] font-bold ml-1 text-white/50">PTS</span></p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3">
          {menuItems.map((item, i) => (
            <React.Fragment key={i}>
              {item.separator && <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-4"></div>}
              <Link 
                href={item.href}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 group ${pathname === item.href ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                <div className="flex items-center gap-3.5">
                  <i className={`${item.icon} w-5 text-center text-sm ${pathname === item.href ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-600'}`}></i>
                  <span className={`text-[10px] sm:text-xs font-black uppercase tracking-widest ${item.color || ''}`}>{item.name}</span>
                </div>
                {item.label && <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">{item.label}</span>}
              </Link>
            </React.Fragment>
          ))}
        </nav>
      </div>
    </aside>
  );
}
