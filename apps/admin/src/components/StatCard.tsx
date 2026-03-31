import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: string;
  color: 'emerald' | 'brand' | 'blue' | 'accent' | 'amber' | 'red';
}

const colorMap = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-500', trend: 'text-emerald-500' },
  brand: { bg: 'bg-brand-50', text: 'text-brand-600', trend: 'text-emerald-500' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-500', trend: 'text-red-500' },
  accent: { bg: 'bg-accent-50', text: 'text-accent-500', trend: 'text-emerald-500' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-500', trend: 'text-amber-500' },
  red: { bg: 'bg-red-50', text: 'text-red-500', trend: 'text-red-500' },
};

export default function StatCard({ title, value, trend, trendUp, icon, color }: StatCardProps) {
  const styles = colorMap[color];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow group">
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 opacity-70 group-hover:opacity-100 transition-opacity">
          {title}
        </p>
        <h3 className="text-2xl font-black text-slate-900 leading-none mb-1 tracking-tight">
          {value}
        </h3>
        {trend && (
          <p className={`text-[10px] font-black flex items-center gap-1 ${trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
            <i className={`fa-solid ${trendUp ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}`}></i>
            {trend}
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-xl ${styles.bg} ${styles.text} flex items-center justify-center text-xl transition-transform group-hover:scale-110 duration-300`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
    </div>
  );
}
