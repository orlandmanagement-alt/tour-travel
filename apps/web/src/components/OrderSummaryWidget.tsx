import React, { useEffect, useState } from 'react';

interface OrderSummaryWidgetProps {
  tourId: string | number;
  tourName: string;
  pax: number;
  basePrice: number;
  addonsList: any[];
}

export default function OrderSummaryWidget({ tourId, tourName, pax, basePrice, addonsList }: OrderSummaryWidgetProps) {
  // Urgency Timer
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  
  useEffect(() => {
    if (timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const baseTotal = basePrice * pax;
  const addonsTotal = addonsList.reduce((acc, curr) => acc + curr.price, 0);
  const subtotal = baseTotal + addonsTotal;
  const tax = subtotal * 0.11; // 11% PB1/VAT
  const grandTotal = subtotal + tax;

  const fmt = (val: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden sticky top-24 transition-all duration-300">
      
      {/* Urgency Header */}
      <div className="bg-rose-50 border-b border-rose-100 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
          <span className="text-sm font-bold text-rose-700">High Demand</span>
        </div>
        <div className="text-sm font-mono font-bold text-rose-600 bg-white px-3 py-1 rounded shadow-sm border border-rose-100">
          Hold Timer: {String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}
        </div>
      </div>

      <div className="p-6 md:p-8">
        <h3 className="font-extrabold text-slate-900 text-xl mb-6 tracking-tight">Booking Summary</h3>
        
        <div className="flex pb-6 border-b border-dashed border-slate-200 mb-6">
          <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden mr-4 shrink-0 shadow-sm border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=400&q=80" alt="Tour" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-1">Open Trip</span>
            <h4 className="font-bold text-slate-800 leading-tight line-clamp-2">{tourName}</h4>
            <span className="text-sm text-slate-500 font-medium mt-1">Date TBD</span>
          </div>
        </div>

        {/* Calculation List */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 font-medium">{pax}x Base Ticket</span>
            <span className="font-bold text-slate-800">{fmt(baseTotal)}</span>
          </div>
          
          {addonsList.map((addon, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <span className="text-emerald-600 font-medium flex items-center"><svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>{addon.name}</span>
              <span className="font-bold text-slate-800">{fmt(addon.price)}</span>
            </div>
          ))}

          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Subtotal</span>
            <span className="font-bold text-slate-600">{fmt(subtotal)}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Taxes & Fees (11%)</span>
            <span className="font-bold text-slate-600">{fmt(tax)}</span>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 mb-8">
          <div className="flex justify-between items-end">
            <span className="text-slate-500 font-bold tracking-tight">Grand Total</span>
            <span className="text-3xl font-extrabold text-slate-900 tracking-tighter">{fmt(grandTotal)}</span>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3 border border-slate-100">
           <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
             <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.965 11.965 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
           </div>
           <div>
             <h5 className="text-xs font-bold text-slate-800">Secure 256-bit Encryption</h5>
             <p className="text-[10px] text-slate-500">Your connection is verified by stringent security standards.</p>
           </div>
        </div>

      </div>
    </div>
  );
}
