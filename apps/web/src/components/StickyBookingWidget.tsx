'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PriceCalculatorProps {
  tourData: any;
}

export default function StickyBookingWidget({ tourData }: PriceCalculatorProps) {
  const router = useRouter();
  
  const [date, setDate] = useState<string>('');
  const [pax, setPax] = useState<number>(2);
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);
  
  const [total, setTotal] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<any>({
    basePrice: 0,
    addonsTotal: 0,
    surchargeTotal: 0
  });

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0 
    }).format(val);
  };

  useEffect(() => {
    if (!tourData) return;

    let base = 0;
    
    // Base Price logic (assuming tourData.base_price is per pax for Private Trip with tiers)
    // If it's Private Trip, use tiers or base_price
    if (tourData.trip_type && tourData.trip_type.toUpperCase() === 'PRIVATE') {
      const tier = tourData.pricing_tiers?.find((t: any) => pax >= t.min_pax && pax <= t.max_pax);
      if (tier) {
        base = tier.price_per_pax * pax;
      } else {
        // Simple logic for simulation if no tiers: slightly cheaper for more pax
        let pricePerPax = tourData.base_price;
        if (pax >= 4) pricePerPax *= 0.8;
        else if (pax >= 3) pricePerPax *= 0.9;
        else if (pax === 1) pricePerPax *= 1.8;
        base = pricePerPax * pax;
      }
    } else {
      // Open Trip usually flat per pax
      base = tourData.base_price * pax;
    }

    // Addons
    let addonsTotal = 0;
    selectedAddons.forEach(addon => {
      const dbAddon = tourData.addons?.find((a: any) => a.id === addon.id);
      if (dbAddon) {
        addonsTotal += dbAddon.price * addon.quantity;
      }
    });

    // Surcharges
    let surchargeTotal = 0;
    if (date && tourData.surcharges?.length > 0) {
      const travelDate = new Date(date);
      tourData.surcharges.forEach((s: any) => {
         const start = new Date(s.start_date);
         const end = new Date(s.end_date);
         if (travelDate >= start && travelDate <= end) {
            if (s.surcharge_type === 'flat_fee') surchargeTotal += s.surcharge_amount;
            else if (s.surcharge_type === 'per_pax') surchargeTotal += s.surcharge_amount * pax;
         }
      });
    }

    setBreakdown({ basePrice: base, addonsTotal, surchargeTotal });
    setTotal(base + addonsTotal + surchargeTotal);
    
  }, [pax, selectedAddons, date, tourData]);

  const handleCheckout = () => {
    if (!date) {
      alert('Silakan pilih tanggal keberangkatan');
      return;
    }
    
    const checkoutPayload = {
      tour_id: tourData.id,
      tour_name: tourData.tour_name,
      travel_date: date,
      total_pax: pax,
      addons: selectedAddons,
      breakdown,
      grand_total: total
    };
    
    sessionStorage.setItem('checkoutPayload', JSON.stringify(checkoutPayload));
    router.push('/checkout');
  };

  if (!tourData) return null;

  return (
    <aside className="w-full lg:w-[360px] flex-shrink-0">
      <div className="sticky top-24 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl p-5 sm:p-6 overflow-hidden">
        
        {/* Header Pricing */}
        <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <span className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
              Hemat s/d 20%
            </span>
            <p className="text-slate-400 text-sm line-through font-medium">{formatPrice(tourData.base_price * 1.2)}</p>
          </div>
          <div className="flex items-end gap-1.5">
            <h2 className="text-3xl font-black text-brand-primary leading-none">
              {formatPrice(total / pax || tourData.base_price)}
            </h2>
            <span className="text-sm font-bold text-slate-500 mb-1">/ pax</span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 mt-2 flex items-center gap-1.5">
            <i className="fa-solid fa-circle-info text-blue-400"></i> Harga bervariasi sesuai jumlah peserta.
          </p>
        </div>

        {/* Form Container */}
        <div className="space-y-5">
          
          {/* Date Picker */}
          <div>
            <label className="block text-xs font-black text-slate-700 dark:text-slate-200 mb-2 uppercase tracking-wide">Tanggal Keberangkatan</label>
            <div className="relative group">
              <i className="fa-regular fa-calendar absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary text-sm transition-colors"></i>
              <input 
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-primary/20 rounded-2xl focus:ring-4 focus:ring-brand-primary/5 outline-none text-sm font-bold text-slate-800 dark:text-white cursor-pointer transition-all"
                required
              />
            </div>
          </div>

          {/* Pax Counter */}
          <div>
            <label className="block text-xs font-black text-slate-700 dark:text-slate-200 mb-2 uppercase tracking-wide">Jumlah Peserta</label>
            <div className="flex items-center justify-between p-1.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
              <button 
                onClick={() => setPax(p => Math.max(1, p - 1))}
                className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-white flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all active:scale-90"
              >
                <i className="fa-solid fa-minus text-xs"></i>
              </button>
              <div className="flex flex-col items-center">
                <span className="text-xl font-black text-slate-900 dark:text-white">{pax}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Peserta</span>
              </div>
              <button 
                onClick={() => setPax(p => p + 1)}
                className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-white flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all active:scale-90"
              >
                <i className="fa-solid fa-plus text-xs"></i>
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 border-dashed space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>Total Harga:</span>
              <span className="text-base font-black text-slate-900 dark:text-white">{formatPrice(total)}</span>
            </div>
            {breakdown.surchargeTotal > 0 && (
              <div className="flex justify-between text-[10px] font-bold text-brand-accent">
                <span>High Season Surcharge:</span>
                <span>+ {formatPrice(breakdown.surchargeTotal)}</span>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 pt-2">
            <button 
              onClick={handleCheckout}
              className="w-full py-4 bg-brand-primary hover:bg-brand-primary-dark text-white font-black text-sm rounded-2xl shadow-xl shadow-brand-primary/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
            >
              Pesan Sekarang <i className="fa-solid fa-arrow-right-long text-xs"></i>
            </button>
            
            <a 
              href="https://wa.me/628123456789" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-white dark:bg-slate-800 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-500 font-black text-sm rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i> Hubungi Admin
            </a>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2 pt-6 border-t border-slate-100 dark:border-slate-700 text-center">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <i className="fa-solid fa-shield-halved text-xs"></i>
              </div>
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Aman</p>
            </div>
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                <i className="fa-solid fa-headset text-xs"></i>
              </div>
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Support</p>
            </div>
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <i className="fa-solid fa-money-bill-transfer text-xs"></i>
              </div>
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Transparan</p>
            </div>
          </div>

        </div>
      </div>
    </aside>
  );
}
