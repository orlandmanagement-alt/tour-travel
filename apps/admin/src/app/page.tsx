'use client';

import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total_bookings: 142,
    total_revenue: 125000000,
    new_custom_trips: 12,
    active_tours: 45
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch from /api/admin/dashboard
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  if (isLoading) return <div className="animate-pulse">Loading dashboard data...</div>;

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome to NusantaraTrip admin panel.</p>
        </div>
        <button className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-light shadow text-sm font-semibold transition-colors">
          Download Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-start">
             <div>
               <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Revenue</p>
               <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{formatPrice(stats.total_revenue)}</h3>
             </div>
             <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">💰</div>
          </div>
          <p className="text-xs font-medium text-emerald-500 mt-4 flex items-center">
             <span className="mr-1">↑</span> 12% from last month
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-start">
             <div>
               <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Bookings</p>
               <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{stats.total_bookings}</h3>
             </div>
             <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">📝</div>
          </div>
          <p className="text-xs font-medium text-emerald-500 mt-4 flex items-center">
             <span className="mr-1">↑</span> 8% from last month
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-start">
             <div>
               <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Active Tours</p>
               <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{stats.active_tours}</h3>
             </div>
             <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">🗺️</div>
          </div>
          <p className="text-xs font-medium text-slate-400 mt-4 flex items-center">
             <span className="mr-1">-</span> No change
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-start">
             <div>
               <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">New Custom Trips</p>
               <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{stats.new_custom_trips}</h3>
             </div>
             <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">✨</div>
          </div>
          <p className="text-xs font-medium text-red-500 mt-4 flex items-center">
             <span className="mr-1">3</span> pending action
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Simple CSS Bar Chart Mock */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Revenue This Week</h3>
          
          <div className="flex items-end justify-between h-48 mt-4">
             {[
               { day: 'Mon', val: 40 },
               { day: 'Tue', val: 65 },
               { day: 'Wed', val: 45 },
               { day: 'Thu', val: 80 },
               { day: 'Fri', val: 55 },
               { day: 'Sat', val: 100 },
               { day: 'Sun', val: 90 },
             ].map((d) => (
               <div key={d.day} className="flex flex-col items-center w-8 sm:w-12 group">
                  <div className="relative w-full flex justify-center">
                     <div 
                       className="w-full bg-brand-primary/20 dark:bg-brand-primary/40 rounded-t-sm group-hover:bg-brand-primary transition-colors cursor-pointer" 
                       style={{ height: `${d.val}%` }}
                     ></div>
                     <div className="absolute -top-8 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                       {d.val}k
                     </div>
                  </div>
                  <span className="text-xs text-slate-500 mt-2">{d.day}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Recent Bookings Widget */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Orders</h3>
             <a href="/bookings" className="text-sm text-brand-accent hover:underline">View All</a>
           </div>

           <div className="space-y-4">
              {[
                { id: 'NSTR-9428', name: 'Bima Santoso', tour: 'Bromo Sunrise', amount: 350000, status: 'paid' },
                { id: 'NSTR-1044', name: 'Sarah Miller', tour: 'Ijen Blue Fire', amount: 750000, status: 'pending' },
                { id: 'NSTR-8409', name: 'Andi Wijaya', tour: 'Malang City', amount: 400000, status: 'paid' },
              ].map((b) => (
                <div key={b.id} className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{b.name}</p>
                    <p className="text-xs text-slate-500">{b.tour}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-slate-800 dark:text-white">{formatPrice(b.amount)}</p>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${b.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
           </div>
        </div>

      </div>

    </div>
  );
}
