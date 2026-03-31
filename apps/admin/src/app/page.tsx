"use client";

import React, { useEffect, useState } from 'react';
import StatCard from '@/components/StatCard';
import { adminApi } from '@/lib/api';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getMetrics()
      .then(data => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch metrics:', err);
        setLoading(false);
      });
  }, []);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Ringkasan Dasbor</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Selamat datang kembali! Berikut adalah performa bisnis Anda hari ini.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <i className="fa-solid fa-calendar-range opacity-50"></i>
            7 Hari Terakhir
          </button>
          <button className="px-5 py-2.5 bg-brand-600 text-white font-bold text-xs rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2">
            <i className="fa-solid fa-download"></i>
            Unduh Laporan
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Pendapatan" 
          value={loading ? "..." : formatPrice(metrics?.total_revenue || 0)} 
          trend="+12.5%" 
          trendUp={true} 
          icon="fa-money-bill-trend-up" 
          color="emerald" 
        />
        <StatCard 
          title="Pesanan Pending" 
          value={loading ? "..." : (metrics?.pending_orders || 0).toString()} 
          trend="+5.2%" 
          trendUp={true} 
          icon="fa-cart-flatbed-suitcase" 
          color="brand" 
        />
        <StatCard 
          title="Custom Trip Baru" 
          value={loading ? "..." : (metrics?.new_custom_requests || 0).toString()} 
          trend="-2.1%" 
          trendUp={false} 
          icon="fa-users" 
          color="accent" 
        />
        <StatCard 
          title="Status Sistem" 
          value={loading ? "..." : "Online"} 
          trend="+0.8%" 
          trendUp={true} 
          icon="fa-chart-line" 
          color="blue" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Revenue Chart Widget */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Statistik Penjualan</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Perbandingan Mingguan</p>
              </div>
              <div className="flex items-center gap-1.5 p-1 bg-slate-50 border border-slate-100 rounded-lg">
                <button className="px-3 py-1 bg-white shadow-sm border border-slate-100 rounded-md text-[10px] font-black text-brand-600 uppercase tracking-wider">Revenue</button>
                <button className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-600 transition-colors">Orders</button>
              </div>
            </div>

            {/* Mock Chart Visualization */}
            <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 relative">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5 px-1">
                <div className="w-full h-px bg-slate-900"></div>
                <div className="w-full h-px bg-slate-900"></div>
                <div className="w-full h-px bg-slate-900"></div>
                <div className="w-full h-px bg-slate-900"></div>
              </div>
              
              {[
                { day: 'Sen', val: 30 },
                { day: 'Sel', val: 55 },
                { day: 'Rab', val: 45 },
                { day: 'Kam', val: 85 },
                { day: 'Jum', val: 65 },
                { day: 'Sab', val: 95 },
                { day: 'Min', val: 75 },
              ].map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center group/bar relative z-10">
                   <div 
                     className="w-full max-w-[40px] bg-brand-50 border-t-2 border-brand-200 rounded-t-xl group-hover/bar:bg-brand-600 group-hover/bar:border-brand-500 transition-all duration-500 cursor-pointer relative" 
                     style={{ height: `${d.val}%` }}
                   >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20">
                        {formatPrice(d.val * 1000000)}
                      </div>
                   </div>
                   <span className="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-widest">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Pesanan Terbaru</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Transaski Real-time</p>
              </div>
              <a href="/bookings" className="px-4 py-2 bg-white border border-slate-200 text-brand-600 font-black text-[10px] rounded-xl hover:bg-brand-50 transition-all">LIHAT SEMUA</a>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <th className="px-8 py-4">Invoice</th>
                    <th className="px-8 py-4">Pelanggan</th>
                    <th className="px-8 py-4">Produk</th>
                    <th className="px-8 py-4">Total</th>
                    <th className="px-8 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { id: 'NSTR-9428', user: 'Bima Santoso', type: 'Tour', product: 'Sunrise Bromo Madakaripura', amount: 1550000, status: 'Berhasil' },
                    { id: 'NSTR-9429', user: 'Sarah Miller', type: 'Car', product: 'Innova Reborn (24 Jam)', amount: 850000, status: 'Pending' },
                    { id: 'NSTR-9430', user: 'Andi Wijaya', type: 'Tour', product: 'Ijen Blue Fire Expedition', amount: 1250000, status: 'Berhasil' },
                  ].map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-5 text-xs font-black text-brand-600 group-hover:underline cursor-pointer">{order.id}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-100 flex-shrink-0">
                            <img src={`https://ui-avatars.com/api/?name=${order.user}&background=random`} alt={order.user} />
                          </div>
                          <span className="text-xs font-bold text-slate-700">{order.user}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="block text-xs font-bold text-slate-700 truncate max-w-[150px]">{order.product}</span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{order.type}</span>
                      </td>
                      <td className="px-8 py-5 text-xs font-black text-slate-900">{formatPrice(order.amount)}</td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          order.status === 'Berhasil' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Berhasil' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Sidebar Widgets Column */}
        <div className="space-y-8">
          
          {/* Quick Actions Grid */}
          <div className="bg-brand-900 rounded-[2rem] p-8 shadow-xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-brand-950 opacity-100 pointer-events-none"></div>
             <div className="relative z-10 text-white flex flex-col h-full">
               <h3 className="text-lg font-black tracking-tight mb-6">Akses Cepat</h3>
               <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center justify-center gap-3 p-4 bg-white/10 hover:bg-white/20 border border-white/5 rounded-2xl transition-all group/btn">
                    <div className="w-10 h-10 rounded-xl bg-accent-500/20 text-accent-400 flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                      <i className="fa-solid fa-plus"></i>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Tambah Tour</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-3 p-4 bg-white/10 hover:bg-white/20 border border-white/5 rounded-2xl transition-all group/btn">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                      <i className="fa-solid fa-file-csv"></i>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Export CSV</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-3 p-4 bg-white/10 hover:bg-white/20 border border-white/5 rounded-2xl transition-all group/btn">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                      <i className="fa-solid fa-bullhorn"></i>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Flash Sale</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-3 p-4 bg-white/10 hover:bg-white/20 border border-white/5 rounded-2xl transition-all group/btn">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                      <i className="fa-solid fa-headset"></i>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Help Center</span>
                  </button>
               </div>
               
               <div className="mt-8 pt-8 border-t border-white/10">
                 <p className="text-[9px] font-black text-brand-300 uppercase tracking-[0.2em] mb-4">Pesan Masuk (CRM)</p>
                 <div className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="flex gap-3 group cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">Pertanyaan Refund #9421</p>
                          <p className="text-[9px] text-brand-300 truncate font-medium">Bima: Mohon info status refund saya...</p>
                        </div>
                        <div className="text-[8px] font-black text-accent-400 uppercase">2m ago</div>
                      </div>
                    ))}
                 </div>
               </div>
             </div>
          </div>

          {/* System Performance Status */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">Status Sistem</h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">API Speed</span>
                <span className="text-xs font-black text-emerald-500">120ms <i className="fa-solid fa-bolt ml-1"></i></span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-emerald-500 rounded-full"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">D1 Database Load</span>
                <span className="text-xs font-black text-brand-600">42%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[42%] h-full bg-brand-600 rounded-full"></div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Server</p>
                  <p className="text-xs font-black text-slate-700">SG-01</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Cache</p>
                  <p className="text-xs font-black text-emerald-500 uppercase tracking-widest">Active</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
