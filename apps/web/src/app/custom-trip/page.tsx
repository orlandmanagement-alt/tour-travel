'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Using simple CSS transitions instead of Framer Motion to prevent strict dependency requirements
export default function CustomTripWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    duration: 3,
    style: '',
    pax: 2,
    accommodation: '4-Star',
    name: '',
    whatsapp: '',
    email: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => setStep(s => Math.min(s + 1, 5));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));
  
  const handleSelect = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full text-center flex flex-col items-center animate-in zoom-in duration-500 relative overflow-hidden">
           {/* Confetti Mock */}
           <div className="absolute top-0 w-full h-full pointer-events-none opacity-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
           
           <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center mb-8 shadow-inner shadow-brand-primary/50 relative z-10">
             <span className="text-4xl text-white">🎉</span>
           </div>
           
           <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4 relative z-10">Trip Request Received!</h2>
           <p className="text-slate-600 mb-8 leading-relaxed relative z-10">
             Thank you, <b>{formData.name}</b>. A Dedicated Travel Consultant is reviewing your {formData.duration}-Day {formData.style} trip to {formData.destination}. We will contact you via WhatsApp within 24 hours.
           </p>
           
           <div className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl mb-8 text-left text-sm relative z-10">
              <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">Request Reference</span>
              <p className="font-mono text-lg font-bold text-slate-800">CUST-NSTR-802</p>
           </div>
           
           <Link href="/" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:-translate-y-1 transition-transform relative z-10 shadow-lg shadow-slate-900/20">
             Return to Homepage
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Progress Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Design Your Dream Trip</h1>
            <span className="text-sm font-bold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">Step {step} of 4</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
             <div 
               className="h-full bg-brand-primary transition-all duration-700 ease-in-out" 
               style={{ width: `${(step / 4) * 100}%` }}
             ></div>
          </div>
        </div>

        {/* Wizard Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-10 min-h-[500px] flex flex-col relative overflow-hidden transition-all duration-500">
           
           {/* STEP 1 */}
           <div className={`transition-all duration-500 absolute w-full left-0 top-0 p-6 md:p-10 ${step === 1 ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none -translate-x-full'}`}>
             <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Where do you want to go?</h2>
             
             <div className="grid grid-cols-2 gap-4 mb-8">
               {['East Java Volcanoes', 'Bali Island', 'Lombok & Gili', 'Komodo National Park'].map((dest) => (
                 <div 
                   key={dest}
                   onClick={() => handleSelect('destination', dest)}
                   className={`h-32 rounded-2xl cursor-pointer flex items-center justify-center p-4 text-center border-2 transition-all ${formData.destination === dest ? 'border-brand-primary bg-brand-primary/5 text-brand-primary font-bold shadow-md transform scale-105 z-10 relative' : 'border-slate-200 hover:border-slate-300 font-semibold text-slate-600'}`}
                 >
                   {dest}
                 </div>
               ))}
             </div>

             <div className="mt-8">
                <label className="block text-center font-bold text-slate-700 mb-6">Duration: <span className="text-brand-primary text-2xl">{formData.duration} Days</span></label>
                <input 
                  type="range" 
                  min="1" max="14" 
                  value={formData.duration} 
                  onChange={(e) => handleSelect('duration', parseInt(e.target.value))} 
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                />
             </div>
           </div>

           {/* STEP 2 */}
           <div className={`transition-all duration-500 absolute w-full left-0 top-0 p-6 md:p-10 ${step === 2 ? 'opacity-100 pointer-events-auto translate-x-0' : step < 2 ? 'opacity-0 pointer-events-none translate-x-full' : 'opacity-0 pointer-events-none -translate-x-full'}`}>
             <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">What is your preferred travel style?</h2>
             
             <div className="flex flex-col gap-4">
               {[
                 { title: 'Relaxed & Luxury', desc: 'Focus on 5-star comfort, spa, and private leisure.', icon: '🥂' },
                 { title: 'Adventure & Trekking', desc: 'Active exploration, hiking, and outdoor nature.', icon: '🏔️' },
                 { title: 'Cultural Immersion', desc: 'Local villages, temples, and historical education.', icon: '🏯' },
               ].map((style) => (
                 <div 
                   key={style.title}
                   onClick={() => handleSelect('style', style.title)}
                   className={`p-6 rounded-2xl cursor-pointer flex items-center gap-6 border-2 transition-all ${formData.style === style.title ? 'border-brand-primary bg-brand-primary/5 shadow-md transform scale-[1.02] z-10 relative' : 'border-slate-200 hover:border-slate-300'}`}
                 >
                   <span className="text-4xl">{style.icon}</span>
                   <div>
                     <h3 className={`font-bold text-lg ${formData.style === style.title ? 'text-brand-primary' : 'text-slate-800'}`}>{style.title}</h3>
                     <p className="text-slate-500 text-sm mt-1">{style.desc}</p>
                   </div>
                   {formData.style === style.title && <div className="ml-auto w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-white"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>}
                 </div>
               ))}
             </div>
           </div>

           {/* STEP 3 */}
           <div className={`transition-all duration-500 absolute w-full left-0 top-0 p-6 md:p-10 ${step === 3 ? 'opacity-100 pointer-events-auto translate-x-0' : step < 3 ? 'opacity-0 pointer-events-none translate-x-full' : 'opacity-0 pointer-events-none -translate-x-full'}`}>
             <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Group Size & Comfort</h2>
             
             <div className="mb-10 text-center">
                <label className="block text-center font-bold text-slate-700 mb-4">Number of Participants</label>
                <div className="flex items-center justify-center max-w-xs mx-auto border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                   <button onClick={() => handleSelect('pax', Math.max(1, formData.pax - 1))} className="w-16 h-16 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-2xl transition-colors">-</button>
                   <span className="flex-1 text-center font-extrabold text-3xl font-mono text-brand-primary">{formData.pax}</span>
                   <button onClick={() => handleSelect('pax', Math.min(50, formData.pax + 1))} className="w-16 h-16 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-2xl transition-colors">+</button>
                </div>
             </div>

             <div className="text-center">
                <label className="block text-center font-bold text-slate-700 mb-4">Accommodation Standard</label>
                <div className="flex justify-center gap-4">
                  {['Budget / Guesthouse', '4-Star', '5-Star Luxury'].map((acc) => (
                    <div 
                      key={acc}
                      onClick={() => handleSelect('accommodation', acc)}
                      className={`px-4 py-3 rounded-xl cursor-pointer text-sm font-bold border-2 transition-all ${formData.accommodation === acc ? 'border-brand-primary bg-brand-primary text-white shadow-md' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                    >
                      {acc}
                    </div>
                  ))}
                </div>
             </div>
           </div>

           {/* STEP 4 */}
           <div className={`transition-all duration-500 absolute w-full left-0 top-0 p-6 md:p-10 overflow-y-auto h-full ${step === 4 ? 'opacity-100 pointer-events-auto translate-x-0' : step < 4 ? 'opacity-0 pointer-events-none translate-x-full' : 'opacity-0 pointer-events-none -translate-x-full'}`}>
             <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Finalizing Details</h2>
             
             <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 mb-8 shadow-sm text-center">
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  You are planning a <b className="text-brand-primary">{formData.duration}-Day</b> <b className="text-brand-primary">{formData.style}</b> trip to <b className="text-brand-primary">{formData.destination}</b> for <b className="text-brand-primary">{formData.pax} people</b> staying in <b className="text-brand-primary">{formData.accommodation}</b> accommodations.
                </p>
             </div>

             <form id="customTripForm" onSubmit={handleSubmit} className="space-y-4">
               <div>
                 <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Full Name</label>
                 <input type="text" value={formData.name} onChange={e => handleSelect('name', e.target.value)} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all font-medium" placeholder="E.g. Sarah Connor" />
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">WhatsApp Number</label>
                   <input type="tel" value={formData.whatsapp} onChange={e => handleSelect('whatsapp', e.target.value)} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all font-medium" placeholder="+62 812..." />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Email Address</label>
                   <input type="email" value={formData.email} onChange={e => handleSelect('email', e.target.value)} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all font-medium" placeholder="sarah@corp.com" />
                 </div>
               </div>
             </form>
           </div>

           {/* Controls */}
           <div className={`mt-auto pt-8 flex items-center bg-white z-20 transition-all ${step > 1 ? 'justify-between' : 'justify-end'}`}>
             {step > 1 && (
               <button 
                 onClick={handlePrev} 
                 className="px-6 py-3 font-bold text-slate-500 hover:text-slate-800 transition-colors"
               >
                 Go Back
               </button>
             )}
             
             {step < 4 ? (
               <button 
                 onClick={handleNext}
                 disabled={(step===1 && !formData.destination) || (step===2 && !formData.style)}
                 className="px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
               >
                 Next Step
               </button>
             ) : (
               <button 
                 form="customTripForm"
                 type="submit"
                 disabled={isSubmitting}
                 className="px-10 py-4 bg-brand-primary text-white font-extrabold rounded-xl shadow-xl shadow-brand-primary/30 hover:shadow-2xl transition-all hover:-translate-y-1 ml-auto flex items-center"
               >
                 {isSubmitting ? (
                   <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                 ) : 'Request Custom Itinerary'}
               </button>
             )}
           </div>

        </div>
      </div>
    </div>
  );
}
