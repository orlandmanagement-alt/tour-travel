'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TourWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    tour_code: '',
    tour_name: '',
    base_price: '',
    trip_type: 'Open Trip',
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));
  
  const handleSave = () => {
    alert('Tour saved successfully!');
    router.push('/tours');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">Create New Tour</h1>
        
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-10 relative">
           <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 z-0"></div>
           <div 
             className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-primary z-0 transition-all"
             style={{ width: `${((step - 1) / 3) * 100}%` }}
           ></div>
           
           {['Basic Info', 'Itinerary', 'Pricing/Addons', 'Publish'].map((label, idx) => (
             <div key={idx} className="relative z-10 flex flex-col items-center">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= idx + 1 ? 'bg-brand-primary text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                 {idx + 1}
               </div>
               <span className="absolute top-10 text-xs font-semibold text-slate-500 w-24 text-center">{label}</span>
             </div>
           ))}
        </div>

        <div className="mt-16 min-h-[300px]">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-lg font-bold">1. Basic Information</h3>
              <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium mb-2 dark:text-slate-300">Tour Name</label>
                   <input type="text" className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 outline-none focus:ring-2 focus:ring-brand-primary" placeholder="E.g. Bromo Sunrise" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium mb-2 dark:text-slate-300">Tour Code</label>
                   <input type="text" className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 outline-none focus:ring-2 focus:ring-brand-primary" placeholder="T-BMO-01" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium mb-2 dark:text-slate-300">Trip Type</label>
                   <select className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 outline-none focus:ring-2 focus:ring-brand-primary">
                     <option>Open Trip</option>
                     <option>Private Trip</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-medium mb-2 dark:text-slate-300">Destination Location</label>
                   <select className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 outline-none focus:ring-2 focus:ring-brand-primary">
                     <option>Mount Bromo (ID: 1)</option>
                     <option>Banyuwangi (ID: 2)</option>
                   </select>
                 </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-bold">2. Itinerary Details</h3>
                 <button className="text-sm font-semibold text-brand-primary">+ Add Activity</button>
              </div>
              <div className="p-4 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex gap-4 items-start">
                 <div className="w-24">
                   <input type="text" className="w-full text-xs px-2 py-1 border rounded dark:bg-slate-700 dark:border-slate-600" placeholder="00:00" />
                   <input type="text" className="w-full text-xs px-2 py-1 border rounded dark:bg-slate-700 dark:border-slate-600 mt-2" placeholder="03:00" />
                 </div>
                 <div className="flex-1">
                   <input type="text" className="w-full font-bold px-2 py-1 border rounded mb-2 dark:bg-slate-700 dark:border-slate-600" placeholder="Activity Title" />
                   <textarea className="w-full px-2 py-1 border rounded text-sm dark:bg-slate-700 dark:border-slate-600" placeholder="Description"></textarea>
                 </div>
                 <button className="text-red-500">✕</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-lg font-bold mb-4">3. Pricing & Addons</h3>
              <div className="grid grid-cols-2 gap-6 mb-8">
                 <div>
                   <label className="block text-sm font-medium mb-2 dark:text-slate-300">Base Price (IDR)</label>
                   <input type="number" className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 outline-none" placeholder="350000" />
                 </div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg mt-4">
                 <h4 className="font-semibold mb-2 text-sm text-slate-700 dark:text-slate-300">Add-ons</h4>
                 <div className="flex flex-col gap-2">
                   <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-600 text-sm">
                      <span>Rent Jeep Bromo</span>
                      <span className="font-mono">Rp 500,000</span>
                   </div>
                   <button className="text-xs font-semibold text-brand-primary text-left">+ Map Another Addon</button>
                 </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in text-center py-10">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold">Ready to Publish?</h3>
              <p className="text-slate-500">This tour will be immediately visible on the customer site.</p>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-8 border-t border-slate-100 dark:border-slate-700">
           <button 
             onClick={prevStep} 
             disabled={step === 1}
             className="px-6 py-2 border border-slate-300 rounded-lg font-bold text-slate-600 disabled:opacity-30 transition"
           >
             Back
           </button>
           
           {step < 4 ? (
             <button 
               onClick={nextStep} 
               className="px-6 py-2 bg-brand-primary text-white rounded-lg font-bold hover:bg-brand-primary-light transition"
             >
               Next Step
             </button>
           ) : (
             <button 
               onClick={handleSave} 
               className="px-8 py-2 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/30"
             >
               Publish Tour
             </button>
           )}
        </div>

      </div>
    </div>
  );
}
