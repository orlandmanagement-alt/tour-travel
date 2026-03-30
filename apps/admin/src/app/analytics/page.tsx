'use client';

import { useState } from 'react';

// Mock Analytics Data (replaced by Cloudflare D1 queries in production)
const weeklyRevenue = [
  { label: 'Mon', revenue: 8500000, bookings: 12 },
  { label: 'Tue', revenue: 12200000, bookings: 18 },
  { label: 'Wed', revenue: 9800000, bookings: 14 },
  { label: 'Thu', revenue: 14500000, bookings: 22 },
  { label: 'Fri', revenue: 18900000, bookings: 28 },
  { label: 'Sat', revenue: 24200000, bookings: 37 },
  { label: 'Sun', revenue: 21400000, bookings: 31 },
];

const topTours = [
  { name: 'Midnight Bromo Sunrise', bookings: 128, revenue: 44800000, trend: '+12%' },
  { name: 'Komodo Dragon Expedition', bookings: 94, revenue: 117500000, trend: '+8%' },
  { name: 'Ubud Rice Terrace Hike', bookings: 76, revenue: 19000000, trend: '+5%' },
  { name: 'Raja Ampat Diving', bookings: 52, revenue: 104000000, trend: '-2%' },
];

const fmt = (val: number) => 
  val >= 1000000 
    ? `Rp ${(val / 1000000).toFixed(1)}M`
    : `Rp ${(val / 1000).toFixed(0)}K`;

const fmtFull = (val: number) => 
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

// Mini Sparkline Bar Chart Component
function SimpleBarChart({ data }: { data: typeof weeklyRevenue }) {
  const max = Math.max(...data.map(d => d.revenue));
  return (
    <div className="flex items-end gap-2 h-32 w-full">
      {data.map((d, i) => {
        const height = (d.revenue / max) * 100;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
              <div className="bg-slate-900 text-white text-xs font-bold px-2 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                <div>{fmt(d.revenue)}</div>
                <div className="text-slate-400">{d.bookings} bookings</div>
              </div>
              <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1"></div>
            </div>
            {/* Bar */}
            <div 
              className="w-full rounded-t-md bg-brand-primary/20 hover:bg-brand-primary transition-all duration-300 cursor-pointer"
              style={{ height: `${height}%` }}
            ></div>
            <span className="text-[10px] font-bold text-slate-400">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');

  const totalRevenue = weeklyRevenue.reduce((a, b) => a + b.revenue, 0);
  const totalBookings = weeklyRevenue.reduce((a, b) => a + b.bookings, 0);
  const avgOrderValue = totalRevenue / totalBookings;
  const conversionRate = 6.8; // Mock %

  const kpis = [
    { label: 'Total Revenue', value: fmtFull(totalRevenue), delta: '+18.2%', deltaType: 'up', icon: '💰' },
    { label: 'Total Bookings', value: totalBookings.toString(), delta: '+22 vs prev', deltaType: 'up', icon: '🎫' },
    { label: 'Avg Order Value', value: fmtFull(Math.round(avgOrderValue)), delta: '+3.4%', deltaType: 'up', icon: '📈' },
    { label: 'Checkout Conversion', value: `${conversionRate}%`, delta: '-0.3%', deltaType: 'down', icon: '🎯' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Analytics Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Revenue intelligence across all channels and tour products.</p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1">
          {(['week', 'month', 'year'] as const).map(p => (
            <button 
              key={p} 
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${period === p ? 'bg-white dark:bg-slate-700 text-brand-primary shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{kpi.icon}</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${kpi.deltaType === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                {kpi.deltaType === 'up' ? '↑' : '↓'} {kpi.delta}
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">{kpi.value}</div>
            <div className="text-sm text-slate-500 font-medium">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue Chart + Top Tours */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-bold text-slate-800 dark:text-white text-lg">Revenue Overview</h2>
              <p className="text-slate-500 text-sm">This week's daily breakdown</p>
            </div>
            <div className="text-3xl font-extrabold text-brand-primary tracking-tight">{fmt(totalRevenue)}</div>
          </div>
          <SimpleBarChart data={weeklyRevenue} />
        </div>

        {/* Top Performing Tours */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
          <h2 className="font-bold text-slate-800 dark:text-white text-lg mb-6">Top Tours</h2>
          <div className="space-y-5">
            {topTours.map((tour, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-extrabold text-slate-600 dark:text-slate-300 shrink-0">
                  #{i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 dark:text-white text-sm truncate">{tour.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{tour.bookings} trips • {fmt(tour.revenue)}</p>
                </div>
                <span className={`text-xs font-bold ${tour.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                  {tour.trend}
                </span>
              </div>
            ))}
          </div>

          {/* Channel Sources */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-4">Traffic Source</h3>
            <div className="space-y-3">
              {[
                { source: 'Direct', pct: 48 },
                { source: 'Organic Search', pct: 28 },
                { source: 'WhatsApp Referral', pct: 14 },
                { source: 'Social Media', pct: 10 },
              ].map(s => (
                <div key={s.source}>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>{s.source}</span>
                    <span>{s.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                    <div 
                      className="h-full bg-brand-primary rounded-full transition-all duration-1000"
                      style={{ width: `${s.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
