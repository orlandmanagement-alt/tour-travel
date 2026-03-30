'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Mock Data
const mockOrders = [
  { 
    id: 1, 
    ref: 'INV-20261024-001', 
    tourTitle: 'Private Tour Bromo Midnight & Madakaripura', 
    date: '24 Okt 2026', 
    pax: 2, 
    status: 'pending', 
    total: 2500000, 
    img: 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=400&q=80',
    type: 'Tour' 
  },
  { 
    id: 2, 
    ref: 'INV-20261105-089', 
    tourTitle: 'Toyota Innova Zenix Hybrid (With Driver)', 
    date: '05 Nov 2026', 
    pax: 2, 
    status: 'aktif', 
    total: 1700000, 
    img: 'https://images.unsplash.com/photo-1620067677840-7ac53577d2ec?w=400&q=80',
    type: 'Rental' 
  },
  { 
    id: 3, 
    ref: 'INV-20250817-102', 
    tourTitle: 'Bali Explorer Family Fun Trip', 
    date: '17 Agu 2025', 
    pax: 5, 
    status: 'selesai', 
    total: 8500000, 
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80',
    type: 'Tour' 
  }
];

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('semua');

  const filteredOrders = activeTab === 'semua' 
    ? mockOrders 
    : mockOrders.filter(o => o.status === activeTab);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="bg-amber-100 text-amber-700 border border-amber-200 text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1.5 uppercase tracking-wider"><i className="fa-solid fa-clock"></i> Menunggu Pembayaran</span>;
      case 'aktif':
        return <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1.5 uppercase tracking-wider"><i className="fa-solid fa-circle-check"></i> E-Ticket Terbit</span>;
      case 'selesai':
        return <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1.5 uppercase tracking-wider">Perjalanan Selesai</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Nav */}
          <aside className="w-full lg:w-[280px] shrink-0">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm overflow-hidden sticky top-28">
              {/* User Loyalty Info */}
              <div className="p-6 bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white relative overflow-hidden">
                <div className="absolute right-[-20px] top-[-20px] text-6xl opacity-10 rotate-12">❤️</div>
                <div className="flex items-center gap-4 mb-4">
                  <img src="https://ui-avatars.com/api/?name=Budi+Santoso&background=fff&color=4f46e5&rounded=true&bold=true" alt="Profile" className="w-12 h-12 rounded-full border-2 border-white/30" />
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-tight">Budi Santoso</h3>
                    <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Silver Member</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                  <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] mb-1">NusaPoin Saya</p>
                  <p className="text-xl font-black tabular-nums">12.500 <span className="text-[10px] font-bold ml-1 text-white/50">PTS</span></p>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="p-3">
                {[
                  { name: 'Pesanan Saya', icon: 'fa-solid fa-clipboard-list', active: true },
                  { name: 'Promo & Kupon', icon: 'fa-solid fa-ticket', label: '2' },
                  { name: 'Wishlist', icon: 'fa-regular fa-heart' },
                  { name: 'Ulasan Saya', icon: 'fa-regular fa-star' },
                  { name: 'Detail Profil', icon: 'fa-regular fa-user', separator: true },
                  { name: 'Keluar', icon: 'fa-solid fa-arrow-right-from-bracket', color: 'text-red-500' }
                ].map((item, i) => (
                  <React.Fragment key={i}>
                    {item.separator && <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-4"></div>}
                    <button className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 group ${item.active ? 'bg-brand-primary/5 text-brand-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                      <div className="flex items-center gap-3.5">
                        <i className={`${item.icon} w-5 text-center text-sm ${item.active ? 'text-brand-primary' : 'text-slate-400 group-hover:text-brand-primary'}`}></i>
                        <span className={`text-xs font-black uppercase tracking-widest ${item.color || ''}`}>{item.name}</span>
                      </div>
                      {item.label && <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">{item.label}</span>}
                    </button>
                  </React.Fragment>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 w-full min-w-0">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2 uppercase">Daftar Pesanan</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold italic">Kelola dan pantau semua transaksi perjalanan Anda di sini.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              {[
                { id: 'semua', name: 'Semua Pesanan' },
                { id: 'pending', name: 'Menunggu Bayar', badge: true },
                { id: 'aktif', name: 'E-Ticket Aktif' },
                { id: 'selesai', name: 'Selesai' }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap text-[10px] font-black uppercase tracking-widest ${activeTab === tab.id ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  {tab.name}
                  {tab.badge && activeTab !== tab.id && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>}
                </button>
              ))}
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-500 group">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 pb-5 border-b border-slate-50 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg ${order.type === 'Tour' ? 'bg-brand-primary/10 text-brand-primary' : 'bg-brand-accent/10 text-brand-accent'}`}>
                        <i className={order.type === 'Tour' ? 'fa-solid fa-map-location-dot' : 'fa-solid fa-car'}></i>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">{order.type} Trip</p>
                        <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest">{order.ref}</p>
                      </div>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex gap-5 flex-1">
                      <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm flex-shrink-0 group-hover:shadow-lg transition-all duration-500">
                        <img src={order.img} alt={order.tourTitle} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base mb-2 uppercase tracking-tight line-clamp-2 leading-tight">
                          {order.tourTitle}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                          <span className="flex items-center gap-2"><i className="fa-regular fa-calendar text-brand-primary"></i> {order.date}</span>
                          <span className="flex items-center gap-2"><i className="fa-solid fa-users text-brand-primary"></i> {order.pax} Peserta</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center items-end border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-5 md:pt-0 md:pl-8 shrink-0">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{order.status === 'pending' ? 'Total Harga' : 'Sudah Dibayar'}</p>
                      <p className={`text-2xl font-black tracking-tight mb-5 ${order.status === 'pending' ? 'text-brand-primary' : 'text-slate-900 dark:text-white'}`}>
                        Rp {order.total.toLocaleString('id-ID')}
                      </p>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none px-6 py-2.5 border-2 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all">Detail</button>
                        {order.status === 'pending' && (
                          <button className="flex-1 sm:flex-none px-6 py-2.5 bg-brand-primary hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-2">
                             Bayar <span className="bg-white/20 px-1.5 py-0.5 rounded-lg text-[9px]">14:59</span>
                          </button>
                        )}
                        {order.status === 'aktif' && (
                          <Link href="/ticket" className="flex-1 sm:flex-none px-6 py-2.5 bg-brand-primary hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-2">
                             <i className="fa-solid fa-qrcode"></i> Lihat Tiket
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredOrders.length === 0 && (
                <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800">
                  <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fa-solid fa-box-open text-slate-300 dark:text-slate-600 text-3xl"></i>
                  </div>
                  <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight mb-2">Belum ada pesanan</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold italic mb-8">Wah, daftar pesananmu masih kosong nih.</p>
                  <Link href="/tours" className="inline-flex items-center gap-2 bg-brand-primary text-white font-black text-xs px-8 py-3.5 rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 transition-all uppercase tracking-widest">
                    Cari Paket Tour <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
