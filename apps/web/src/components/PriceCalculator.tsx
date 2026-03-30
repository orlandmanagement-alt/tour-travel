'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PriceCalculatorProps {
  tourData: any;
}

export default function PriceCalculator({ tourData }: PriceCalculatorProps) {
  const router = useRouter();
  
  const [date, setDate] = useState<string>('');
  const [pax, setPax] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);
  
  const [total, setTotal] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<any>({
    basePrice: 0,
    addonsTotal: 0,
    surchargeTotal: 0
  });

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  useEffect(() => {
    if (!tourData) return;

    let base = 0;
    
    // Base Price logic
    if (tourData.trip_type_id === 2 && tourData.pricing_tiers?.length > 0) { // Private Trip
      const tier = tourData.pricing_tiers.find((t: any) => pax >= t.min_pax && pax <= t.max_pax);
      if (tier) {
        base = tier.price_per_pax * pax;
      } else {
        base = tourData.base_price * pax;
      }
    } else {
      base = tourData.base_price * pax;
    }

    // Addons
    let addonsTotal = 0;
    selectedAddons.forEach(addon => {
      const dbAddon = tourData.addons.find((a: any) => a.id === addon.id);
      if (dbAddon) {
        if (dbAddon.charge_type === 'per_pax') {
           addonsTotal += dbAddon.price * addon.quantity;
        } else {
           addonsTotal += dbAddon.price * addon.quantity;
        }
      }
    });

    // Surcharges (simplified for client-side demo)
    let surchargeTotal = 0;
    if (date && tourData.surcharges?.length > 0) {
      const travelDate = new Date(date);
      tourData.surcharges.forEach((s: any) => {
         const start = new Date(s.start_date);
         const end = new Date(s.end_date);
         if (travelDate >= start && travelDate <= end) {
            if (s.surcharge_type === 'flat_fee') surchargeTotal += s.surcharge_amount;
            else if (s.surcharge_type === 'per_pax') surchargeTotal += s.surcharge_amount * pax;
            else if (s.surcharge_type === 'percentage') surchargeTotal += (base * s.surcharge_amount) / 100;
         }
      });
    }

    setBreakdown({ basePrice: base, addonsTotal, surchargeTotal });
    setTotal(base + addonsTotal + surchargeTotal);
    
  }, [pax, selectedAddons, date, tourData]);

  const toggleAddon = (addonId: number, name: string) => {
    const existing = selectedAddons.find(a => a.id === addonId);
    if (existing) {
      setSelectedAddons(prev => prev.filter(a => a.id !== addonId));
    } else {
      // Default quantity to total pax if per_pax, otherwise 1
      const dbAddon = tourData.addons.find((a: any) => a.id === addonId);
      const qty = dbAddon?.charge_type === 'per_pax' ? pax : 1;
      setSelectedAddons(prev => [...prev, { id: addonId, name, quantity: qty }]);
    }
  };

  const updateAddonQty = (addonId: number, delta: number) => {
    setSelectedAddons(prev => prev.map(a => {
      if (a.id === addonId) {
        const newQty = Math.max(1, a.quantity + delta);
        return { ...a, quantity: newQty };
      }
      return a;
    }));
  };

  const handleCheckout = () => {
    if (!date) {
      alert('Please select a travel date');
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
    
    // Save to localStorage or session for the checkout page
    sessionStorage.setItem('checkoutPayload', JSON.stringify(checkoutPayload));
    router.push('/checkout');
  };

  if (!tourData) return null;

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 sticky top-24">
      <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100">Price Calculator</h3>
      
      <div className="space-y-6">
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Travel Date</label>
          <input 
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-brand-primary dark:bg-slate-700 outline-none"
          />
        </div>

        {/* Pax Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Number of Participants</label>
          <div className="flex items-center space-x-4">
            <button 
              type="button"
              onClick={() => setPax(p => Math.max(1, p - 1))}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex justify-center items-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 font-bold"
            >
              -
            </button>
            <span className="text-lg font-bold w-12 text-center text-slate-800 dark:text-white">{pax}</span>
            <button 
              type="button"
              onClick={() => setPax(p => p + 1)}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex justify-center items-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 font-bold"
            >
              +
            </button>
          </div>
          {tourData.trip_type_id === 2 && (
            <p className="text-xs text-brand-primary mt-2 flex items-center">
               <svg className="w-4 h-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               Private Trip: Price per pax reduces as group size increases
            </p>
          )}
        </div>

        {/* Addons Selection */}
        {tourData.addons?.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Add-ons</label>
            <div className="space-y-3">
              {tourData.addons.map((addon: any) => {
                const isSelected = selectedAddons.some(a => a.id === addon.id);
                const selectedAddon = selectedAddons.find(a => a.id === addon.id);

                return (
                  <div key={addon.id} className={`p-3 rounded-xl border transition-colors ${isSelected ? 'border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10' : 'border-slate-200 dark:border-slate-700'}`}>
                    <label className="flex items-start cursor-pointer">
                      <div className="flex items-center h-5 mt-1 pointer-events-none">
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => toggleAddon(addon.id, addon.addon_name)}
                          className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-slate-300 rounded" 
                        />
                      </div>
                      <div className="ml-3 flex-1 flex flex-col pointer-events-none">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{addon.addon_name}</span>
                        <span className="text-xs text-slate-500">{formatPrice(addon.price)} · {addon.charge_type === 'per_pax' ? 'Per Person' : 'Per Group'}</span>
                      </div>
                    </label>

                    {/* Addon Qty selector if selected */}
                    {isSelected && (
                       <div className="ml-7 mt-2 flex items-center space-x-3">
                         <span className="text-xs text-slate-500">Qty:</span>
                         <button onClick={() => updateAddonQty(addon.id, -1)} className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-600 flex justify-center items-center text-xs">-</button>
                         <span className="text-xs font-bold w-4 text-center">{selectedAddon?.quantity}</span>
                         <button onClick={() => updateAddonQty(addon.id, 1)} className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-600 flex justify-center items-center text-xs">+</button>
                       </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary Breakdown */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>Base Price ({pax} Pax)</span>
            <span>{formatPrice(breakdown.basePrice)}</span>
          </div>
          {breakdown.addonsTotal > 0 && (
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>Add-ons</span>
              <span>+ {formatPrice(breakdown.addonsTotal)}</span>
            </div>
          )}
          {breakdown.surchargeTotal > 0 && (
            <div className="flex justify-between text-sm text-amber-600 dark:text-amber-500">
              <span>High Season Surcharge</span>
              <span>+ {formatPrice(breakdown.surchargeTotal)}</span>
            </div>
          )}
        </div>
        
        {/* Grand Total */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-end">
           <div>
             <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Total Price</p>
             <p className="text-xs text-slate-500">Taxes & fees included</p>
           </div>
           <p className="text-2xl font-bold text-brand-secondary-dark dark:text-brand-secondary">
             {formatPrice(total)}
           </p>
        </div>

        {/* CTA */}
        <button 
          onClick={handleCheckout}
          className="w-full py-4 mt-4 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl font-bold text-lg shadow-lg shadow-brand-primary/30 transition-all hover:-translate-y-1"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
