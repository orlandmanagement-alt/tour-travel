'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function TourWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  // Master Lists (Mocked from API)
  const masterDestinations = [
    { id: 1, name: 'Malang', code: 'MLG' },
    { id: 2, name: 'Banyuwangi', code: 'BWI' },
    { id: 3, name: 'Bromo', code: 'BMO' },
  ];

  const [formData, setFormData] = useState({
    tour_code: '',
    tour_name: '',
    base_price: '',
    trip_type: 'Open Trip',
    location_id: '',
    location_code: '',
  });

  const [itineraries, setItineraries] = useState<any[]>([{ id: 1, day: 1, start: '08:00', end: '10:00', title: 'Example', desc: 'Sample Activity' }]);
  const [showPasteZone, setShowPasteZone] = useState(false);
  const pasteRef = useRef<HTMLTextAreaElement>(null);

  // Auto-Code Generation
  const handleLocationChange = async (e: any) => {
    const locId = e.target.value;
    const dest = masterDestinations.find(d => d.id.toString() === locId);
    
    if (dest) {
      setFormData({ ...formData, location_id: locId, location_code: dest.code });
      
      try {
         // Simulate Auto-Code gen 
         // In production: await fetch(`/api/tours/generate-code?prefix=T-${dest.code}`);
         const simulatedCount = Math.floor(Math.random() * 10) + 1;
         const nextSequence = simulatedCount.toString().padStart(6, '0');
         setFormData(prev => ({ ...prev, tour_code: `T-${dest.code}-${nextSequence}` }));
      } catch (e) {}
    } else {
      setFormData({ ...formData, location_id: '', location_code: '', tour_code: '' });
    }
  };

  // TSV Parsing for Multi-Method Engine
  const handlePasteTSV = () => {
    if (!pasteRef.current) return;
    const val = pasteRef.current.value;
    if (!val.trim()) return;

    const rows = val.split('\n');
    const newItineraries: any[] = [];
    rows.forEach((row, idx) => {
      const cols = row.split('\t');
      if (cols.length >= 4) {
        newItineraries.push({
          id: Date.now() + idx,
          day: parseInt(cols[0]) || 1,
          start: cols[1] || '00:00',
          end: cols[2] || '01:00',
          title: cols[3],
          desc: cols[4] || ''
        });
      }
    });
    
    if (newItineraries.length > 0) {
      setItineraries([...itineraries, ...newItineraries]);
      setShowPasteZone(false);
      pasteRef.current.value = '';
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));
  
  const handleSave = () => {
    alert('Tour saved & published to D1 Database successfully!');
    router.push('/tours');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">Smart Tour Builder</h1>
        
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-10 relative px-6">
           <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-700 z-0"></div>
           <div 
             className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-brand-primary z-0 transition-all"
             style={{ width: `calc(${((step - 1) / 3) * 100}% - 24px)` }}
           ></div>
           
           {['Basic Info', 'Itinerary Engine', 'Pricing & Add-ons', 'Visual Preview'].map((label, idx) => (
             <div key={idx} className="relative z-10 flex flex-col items-center">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white dark:border-slate-800 ${step >= idx + 1 ? 'bg-brand-primary text-white scale-110 shadow-lg shadow-brand-primary/40' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'} transition-all duration-300`}>
                 {idx + 1}
               </div>
               <span className={`absolute top-12 text-xs font-semibold w-32 text-center transition-colors ${step >= idx + 1 ? 'text-brand-primary dark:text-brand-primary' : 'text-slate-400'}`}>{label}</span>
             </div>
           ))}
        </div>

        <div className="mt-20 min-h-[400px]">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                 <h3 className="text-lg font-bold">1. Metadata & Auto-Code Generator</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                   <div>
                     <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Destination Context</label>
                     <select 
                       value={formData.location_id}
                       onChange={handleLocationChange}
                       className="w-full px-4 py-3 border rounded-xl dark:bg-slate-900 dark:border-slate-700 outline-none focus:ring-2 focus:ring-brand-primary font-medium"
                     >
                       <option value="">-- Select Destination --</option>
                       {masterDestinations.map(d => (
                         <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                       ))}
                     </select>
                     <p className="text-xs text-slate-500 mt-2">Selecting a destination enables the Auto-Code Generator and filters relational Add-ons.</p>
                   </div>
                   <div>
                     <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Tour System Code</label>
                     <div className="relative">
                       <input 
                         type="text" 
                         value={formData.tour_code}
                         readOnly
                         className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 text-brand-primary border border-slate-200 dark:border-slate-700 rounded-xl outline-none font-mono font-bold" 
                         placeholder="Auto-generated based on destination" 
                       />
                       {formData.tour_code && <span className="absolute right-4 top-3.5 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">GENERATED from D1 Seq</span>}
                     </div>
                   </div>
                 </div>
                 <div className="space-y-6">
                   <div>
                     <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Tour Public Title</label>
                     <input 
                       type="text" 
                       value={formData.tour_name}
                       onChange={(e) => setFormData({...formData, tour_name: e.target.value})}
                       className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:bg-slate-900 outline-none focus:ring-2 focus:ring-brand-primary font-medium" 
                       placeholder="E.g. Bromo Midnight Premium" 
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Trip Operational Type</label>
                     <select 
                       value={formData.trip_type}
                       onChange={(e) => setFormData({...formData, trip_type: e.target.value})}
                       className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:bg-slate-900 outline-none focus:ring-2 focus:ring-brand-primary font-medium"
                     >
                       <option>Open Trip</option>
                       <option>Private Trip</option>
                       <option>Custom Trip</option>
                     </select>
                   </div>
                 </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                 <h3 className="text-lg font-bold">2. Multi-Method Itinerary Engine</h3>
                 <div className="space-x-3 text-sm">
                   <button onClick={() => setShowPasteZone(!showPasteZone)} className="px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 font-bold justify-center rounded-xl transition flex items-center gap-2">
                     {showPasteZone ? 'Hide Paste Zone' : '📋 Paste from Excel/TSV'}
                   </button>
                 </div>
              </div>

              {showPasteZone && (
                <div className="bg-emerald-50 dark:bg-slate-900 border-2 border-dashed border-emerald-300 dark:border-emerald-700 p-6 rounded-2xl mb-6">
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2">Spreadsheet Import</h4>
                  <p className="text-xs text-slate-500 mb-4">Paste rows from Excel/Google Sheets. Format expected: <br /> <code className="bg-white px-2 py-1 rounded shadow-sm">Day(Num) &lt;tab&gt; Start Time &lt;tab&gt; End Time &lt;tab&gt; Title &lt;tab&gt; Description</code></p>
                  <textarea 
                    ref={pasteRef}
                    className="w-full h-32 p-4 text-sm font-mono border rounded-xl dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 mb-4" 
                    placeholder={"1\t08:00\t10:00\tPickup\tPickup from hotel\n1\t10:00\t12:00\tArrive\tCheck-in"}
                  ></textarea>
                  <div className="flex justify-end gap-3">
                    <button onClick={() => setShowPasteZone(false)} className="px-4 py-2 font-semibold text-slate-600">Cancel</button>
                    <button onClick={handlePasteTSV} className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg shadow-sm">Parse Rows</button>
                  </div>
                </div>
              )}

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                 {itineraries.map((it, idx) => (
                   <div key={idx} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-5 rounded-xl flex gap-6 items-start shadow-sm group">
                     <div className="w-16">
                       <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Day</label>
                       <input type="number" value={it.day} readOnly className="w-full bg-white dark:bg-slate-800 text-center font-bold px-2 py-2 border border-slate-300 dark:border-slate-600 rounded-lg outline-none" />
                     </div>
                     <div className="w-24 space-y-3">
                       <div>
                         <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Start</label>
                         <input type="time" value={it.start} readOnly className="w-full font-mono text-sm px-2 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-800 outline-none" />
                       </div>
                       <div>
                         <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">End</label>
                         <input type="time" value={it.end} readOnly className="w-full font-mono text-sm px-2 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-800 outline-none" />
                       </div>
                     </div>
                     <div className="flex-1 space-y-3">
                       <div>
                         <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Activity Title</label>
                         <input type="text" value={it.title} readOnly className="w-full font-bold px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-800 outline-none" />
                       </div>
                       <div>
                         <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Description</label>
                         <textarea value={it.desc} readOnly className="w-full text-sm px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-800 outline-none h-20 resize-none"></textarea>
                       </div>
                     </div>
                     <button className="text-red-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition self-center opacity-0 group-hover:opacity-100">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                     </button>
                   </div>
                 ))}
                 <button className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500 font-bold hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 transition">
                   + Add Manual Row
                 </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                 <h3 className="text-lg font-bold">3. Pricing Engine & Relational Add-ons</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div>
                   <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4">Base Pricing Strategy</h4>
                   <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                     <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Default Price / Pax (IDR)</label>
                     <div className="relative">
                       <span className="absolute left-4 top-3 text-slate-500 font-bold">Rp</span>
                       <input 
                         type="number" 
                         value={formData.base_price}
                         onChange={e => setFormData({...formData, base_price: e.target.value})}
                         className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 text-xl font-bold border border-slate-300 dark:border-slate-600 rounded-xl outline-none focus:border-brand-primary" 
                         placeholder="1,500,000" 
                       />
                     </div>
                   </div>
                 </div>
                 
                 <div>
                   <div className="flex justify-between items-center mb-4">
                     <h4 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                       Contextual Add-ons
                       <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-bold uppercase">{formData.location_code || 'ALL'}</span>
                     </h4>
                     <button className="text-sm font-semibold text-brand-primary hover:underline">+ New Add-on</button>
                   </div>
                   <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
                     {/* Mock Relational Addons based on D1 Location */}
                     {[
                       { name: "Jeep Rental 4WD", price: 600000, type: "per_group" },
                       { name: "Horse Ride at Bromo", price: 150000, type: "per_pax" },
                       { name: "Documentation/Drone", price: 1500000, type: "per_group" }
                     ].map((addon, i) => (
                       <label key={i} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 hover:bg-slate-50 cursor-pointer">
                         <div className="flex items-center gap-4">
                           <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-brand-primary focus:ring-brand-primary accent-brand-primary" />
                           <div>
                             <p className="font-bold text-slate-900 dark:text-white">{addon.name}</p>
                             <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded font-medium text-slate-600 dark:text-slate-300">{addon.type}</span>
                           </div>
                         </div>
                         <div className="font-bold font-mono text-slate-700 dark:text-slate-200">
                           + Rp {addon.price.toLocaleString('id-ID')}
                         </div>
                       </label>
                     ))}
                   </div>
                 </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                 <h3 className="text-lg font-bold">4. Visual Publish Preview</h3>
                 <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div> Draft Mode</span>
              </div>
              
              <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 w-full h-8 bg-slate-200 dark:bg-slate-800 left-0 border-b border-slate-300 flex items-center px-4 gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-400"></div>
                   <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                   <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                   <div className="ml-4 bg-white dark:bg-slate-700 text-slate-400 text-xs px-4 py-0.5 rounded flex-1 max-w-sm font-mono truncate">
                     nusantaratrip.com/tours/{formData.tour_code || 'T-XXX-000000'}
                   </div>
                </div>

                <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 lg:p-10 border border-slate-100 w-full animate-fade-in pointer-events-none">
                   
                   <div className="mb-8">
                     <span className="text-xs font-bold text-brand-primary tracking-widest uppercase mb-2 block">{formData.trip_type} • {formData.location_code}</span>
                     <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
                       {formData.tour_name || 'Untitled Premium Tour'}
                     </h2>
                     <p className="text-slate-500 max-w-2xl leading-relaxed">
                       This is a high fidelity preview of how the customer will see your tour layout on the frontend website.
                     </p>
                   </div>

                   <hr className="my-8 border-slate-100 dark:border-slate-700" />

                   <div className="flex gap-8">
                      <div className="flex-1">
                        <h4 className="font-bold text-xl mb-6">Itinerary Timeline</h4>
                        <div className="border-l-2 border-slate-200 pl-6 space-y-6">
                           {itineraries.slice(0,2).map((it, i) => (
                             <div key={i} className="relative">
                               <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-white border-2 border-brand-primary"></div>
                               <h5 className="font-bold text-slate-800 dark:text-slate-200">{it.start} - {it.title || 'Activity'}</h5>
                               <p className="text-sm text-slate-500 mt-1">{it.desc || 'Activity description will appear here'}</p>
                             </div>
                           ))}
                           {itineraries.length > 2 && <div className="text-sm font-bold text-brand-primary">+ {itineraries.length - 2} more activities mapped</div>}
                        </div>
                      </div>
                      <div className="w-80">
                         <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                           <p className="text-xs text-slate-500 font-bold uppercase mb-1">Pricing Detail</p>
                           <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary mb-6">
                             Rp {Number(formData.base_price || 0).toLocaleString('id-ID')}
                           </p>
                           <div className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold text-center">Book This Tour</div>
                         </div>
                      </div>
                   </div>

                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-8 border-t border-slate-100 dark:border-slate-700 mt-12 bg-white dark:bg-slate-800 sticky bottom-0">
           <button 
             onClick={prevStep} 
             disabled={step === 1}
             className="px-6 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition"
           >
             Back
           </button>
           
           {step < 4 ? (
             <button 
               onClick={nextStep} 
               className="px-8 py-3 bg-slate-900 dark:bg-brand-primary text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
             >
               Continue to Next Step
             </button>
           ) : (
             <button 
               onClick={handleSave} 
               className="px-10 py-3 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-xl font-bold hover:shadow-xl hover:shadow-brand-primary/30 hover:-translate-y-1 transition-all duration-300"
             >
               Save & Publish to D1
             </button>
           )}
        </div>

      </div>
    </div>
  );
}
