'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('semua');

  const orders = [
    {
      id: 'INV-20261024-001',
      status: 'pending',
      type: 'Tour',
      icon: 'fa-map-location-dot',
      color: 'brand',
      title: 'Private Tour Bromo Midnight & Madakaripura',
      date: '24 Okt 2026',
      pax: '2 Dewasa',
      price: 'Rp 2.500.000',
      img: 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa'
    },
    {
      id: 'INV-20261105-089',
      status: 'aktif',
      type: 'Rental',
      icon: 'fa-car',
      color: 'accent',
      title: 'Toyota Innova Zenix Hybrid',
      date: '05 Nov 2026 (2 Hari)',
      pax: 'Dengan Supir',
      price: 'Rp 1.700.000',
      img: 'https://images.unsplash.com/photo-1620067677840-7ac53577d2ec'
    },
    {
      id: 'INV-20250817-102',
      status: 'selesai',
      type: 'Tour',
      icon: 'fa-map-location-dot',
      color: 'emerald',
      title: 'Bali Explorer Family Fun Trip',
      date: '17 Agu 2025',
      pax: '4 Dewasa, 1 Anak',
      price: 'Rp 4.400.000',
      img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4'
    }
  ];

  const filteredOrders = activeTab === 'semua' ? orders : orders.filter(o => o.status === activeTab);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <header className="bg-white border-b border-slate-200 py-3 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
              <Link href="/" className="font-extrabold text-xl tracking-tighter text-brand-900 flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-600 to-accent-500 text-white flex items-center justify-center shadow"><span className="text-sm"><i className="fa-solid fa-paper-plane"></i></span></div>
                  <span className="hidden sm:block">NusaTrip</span>
              </Link>
              <div className="flex items-center gap-4 sm:gap-6">
                  <button className="text-slate-400 hover:text-brand-600 relative">
                      <i className="fa-regular fa-bell text-xl"></i>
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>
                  <div className="flex items-center gap-3 border-l border-slate-200 pl-4 cursor-pointer group">
                      <div className="text-right hidden sm:block">
                          <p className="text-xs font-bold text-slate-800 group-hover:text-brand-600">Budi Santoso</p>
                          <p className="text-[10px] text-slate-500 font-medium">Member Silver</p>
                      </div>
                      <img src="https://ui-avatars.com/api/?name=Budi+Santoso&background=e0e7ff&color=4f46e5" alt="Profile" className="w-9 h-9 rounded-full shadow-sm" />
                  </div>
              </div>
          </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-60 flex-shrink-0">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden sticky top-24 hidden md:block">
                  <div className="p-5 border-b border-slate-100 bg-brand-50/50 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-amber-600 text-xl shadow-sm">
                          <i className="fa-solid fa-coins"></i>
                      </div>
                      <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">NusaPoin</p>
                          <p className="font-extrabold text-brand-900 text-lg leading-none mt-0.5">12.500</p>
                      </div>
                  </div>
                  <nav className="flex flex-col py-3">
                      <a href="#" className="px-5 py-3 text-sm flex items-center gap-3 border-l-4 border-brand-600 bg-brand-50 text-brand-600 font-bold"><i className="fa-solid fa-clipboard-list w-5 text-center"></i> Pesanan Saya</a>
                      <a href="#" className="px-5 py-3 text-sm text-slate-600 flex items-center gap-3 hover:bg-slate-50 font-medium"><i className="fa-solid fa-ticket w-5 text-center text-slate-400"></i> Promo & Kupon <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full ml-auto font-bold">2</span></a>
                      <a href="#" className="px-5 py-3 text-sm text-slate-600 flex items-center gap-3 hover:bg-slate-50 font-medium"><i className="fa-regular fa-heart w-5 text-center text-slate-400"></i> Wishlist</a>
                      <a href="/login" className="px-5 py-3 text-sm text-red-500 flex items-center gap-3 hover:bg-red-50 font-medium"><i className="fa-solid fa-arrow-right-from-bracket w-5 text-center"></i> Keluar</a>
                  </nav>
              </div>
          </aside>

          <div className="flex-1">
              <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Daftar Pesanan</h1>
              <p className="text-sm text-slate-500 mb-6">Pantau transaksi perjalanan Anda di sini.</p>

              <div className="flex border-b border-slate-200 mb-6 gap-6">
                  {['semua', 'pending', 'aktif', 'selesai'].map(tab => (
                    <button 
                      key={tab} 
                      onClick={() => setActiveTab(tab)} 
                      className={`pb-3 text-sm font-medium border-b-2 capitalize transition-colors ${activeTab === tab ? 'text-brand-600 border-brand-600 font-bold' : 'text-slate-500 border-transparent hover:text-slate-700'}`}
                    >
                      {tab} {tab === 'pending' && <span className="inline-block w-2 h-2 ml-1 bg-red-500 rounded-full align-top"></span>}
                    </button>
                  ))}
              </div>

              <div className="space-y-4">
                  {filteredOrders.map(order => (
                    <div key={order.id} className={`bg-white border rounded-2xl p-5 shadow-sm transition-shadow hover:shadow-md ${order.status === 'selesai' ? 'opacity-80' : 'border-slate-200'}`}>
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-3">
                            <div className="flex items-center gap-3">
                                <i className={`fa-solid ${order.icon} text-${order.color}-500 bg-${order.color}-50 w-8 h-8 rounded-full flex items-center justify-center`}></i>
                                <div><p className="text-[10px] font-bold text-slate-400">Pesanan {order.type}</p><p className="text-xs font-bold text-slate-700">{order.id}</p></div>
                            </div>
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${order.status === 'pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' : order.status === 'aktif' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                                {order.status === 'pending' ? '⏳ Menunggu Pembayaran' : order.status === 'aktif' ? '✅ E-Ticket Terbit' : 'Perjalanan Selesai'}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <div className="flex gap-4 flex-1">
                                <img src={`${order.img}?w=200`} className={`w-20 h-20 rounded-lg object-cover border border-slate-100 flex-shrink-0 ${order.status === 'selesai' ? 'grayscale-[30%]' : ''}`} />
                                <div>
                                    <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">{order.title}</h3>
                                    <div className="text-xs text-slate-500 space-y-0.5">
                                        <p><i className="fa-regular fa-calendar w-4"></i> {order.date}</p>
                                        <p><i className={`fa-solid ${order.type === 'Rental' ? 'fa-car' : 'fa-users'} w-4`}></i> {order.pax}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-end items-end sm:border-l border-slate-100 sm:pl-5">
                                <p className="text-[10px] font-bold text-slate-400 mb-0.5">Total Harga</p>
                                <p className="text-lg font-extrabold text-brand-600 mb-3 leading-none">{order.price}</p>
                                <div className="flex gap-2 w-full sm:w-auto mt-auto">
                                    <button className="px-4 py-2 border border-slate-300 text-slate-600 hover:bg-slate-50 font-bold text-xs rounded-lg">Detail</button>
                                    {order.status === 'pending' && <Link href="/checkout" className="px-5 py-2 bg-brand-600 text-white font-bold text-xs rounded-lg shadow-md flex items-center">Bayar 14:59</Link>}
                                    {order.status === 'aktif' && <button className="px-5 py-2 bg-emerald-50 text-emerald-600 border-emerald-200 border hover:bg-emerald-600 hover:text-white font-bold text-xs rounded-lg flex items-center"><i className="fa-solid fa-qrcode mr-1"></i> E-Ticket</button>}
                                    {order.status === 'selesai' && <button className="px-4 py-2 bg-yellow-50 text-yellow-600 hover:bg-yellow-400 hover:text-white font-bold text-xs rounded-lg"><i className="fa-regular fa-star mr-1"></i> Ulasan</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                  ))}
              </div>
          </div>
      </main>
    </div>
  );
}
