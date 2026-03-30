'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookingSchema } from '@/lib/validations';
import CheckoutStepper from '@/components/CheckoutStepper';
import OrderSummaryWidget from '@/components/OrderSummaryWidget';
import Link from 'next/link';

// Extracted from validation to use only the customer_info part for Step 1
// This simplifies the multi-step form data management
export default function CheckoutPage({ params }: { params: { tourId: string } }) {
  const [step, setStep] = useState(1);
  const [pax, setPax] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);

  // Mock Tour Data fetched via tourId
  const tourMock = {
    id: params.tourId,
    name: "Midnight Bromo Sunrise Premium",
    basePrice: 350000,
    availableAddons: [
      { id: 'ADD-01', name: "GoPro Rental", price: 250000 },
      { id: 'ADD-02', name: "Drone Documentation", price: 1500000 },
    ]
  };

  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      tour_id: params.tourId,
      pax: 2,
      booking_date: '',
      customer_info: {
        full_name: '',
        email: '',
        whatsapp: '',
      },
      addons: []
    },
    mode: 'onChange' // Instant inline validation
  });

  const nextStep = async (currentStep: number) => {
    // Manually trigger validation for specific fields before proceeding
    let isStepValid = false;
    if (currentStep === 1) {
      isStepValid = await trigger('customer_info');
    } else if (currentStep === 2) {
      isStepValid = await trigger(['booking_date', 'pax']);
    }
    
    if (isStepValid || currentStep === 3) {
      setStep(s => Math.min(s + 1, 3));
    }
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const onSubmit = async (data: any) => {
    // Merge state into final payload
    const finalPayload = {
      ...data,
      pax,
      addons: selectedAddons.map(a => a.id),
      frontend_calculated_total: (tourMock.basePrice * pax) + selectedAddons.reduce((acc, a) => acc + a.price, 0)
    };
    
    console.log("Submitting to API...", finalPayload);
    alert('Checkout Processed! Sending to Payment Orchestrator...');
  };

  const handleAddonToggle = (addon: any) => {
    if (selectedAddons.find(a => a.id === addon.id)) {
      setSelectedAddons(prev => prev.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons(prev => [...prev, addon]);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <Link href="/tours" className="text-sm font-bold text-slate-500 hover:text-brand-primary flex items-center mb-6 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Tour Catalog
          </Link>
          <CheckoutStepper currentStep={step} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Main Form Left Column */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100">
               
               {/* STEP 1: Customer Info */}
               {step === 1 && (
                 <div className="animate-in fade-in slide-in-from-right-4">
                   <h2 className="text-2xl font-extrabold text-slate-900 mb-6 border-b border-slate-100 pb-4">Customer Details</h2>
                   <div className="space-y-6">
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Full Name (as per ID/Passport)</label>
                       <input 
                         {...register('customer_info.full_name')}
                         className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 transition-all ${errors.customer_info?.full_name ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-primary/30 focus:border-brand-primary'}`}
                         placeholder="John Doe"
                       />
                       {errors.customer_info?.full_name && <p className="text-red-500 text-xs mt-1.5 font-semibold font-mono flex items-center"><span className="w-3 h-3 bg-red-500 text-white rounded-full flex justify-center items-center text-[8px] mr-1">!</span> {errors.customer_info.full_name.message}</p>}
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                         <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                         <input 
                           {...register('customer_info.email')}
                           className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 transition-all ${errors.customer_info?.email ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-primary/30 focus:border-brand-primary'}`}
                           placeholder="john@example.com"
                         />
                         {errors.customer_info?.email && <p className="text-red-500 text-xs mt-1.5 font-semibold font-mono">{errors.customer_info.email.message}</p>}
                       </div>
                       <div>
                         <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp Number</label>
                         <input 
                           {...register('customer_info.whatsapp')}
                           className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 transition-all ${errors.customer_info?.whatsapp ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-primary/30 focus:border-brand-primary'}`}
                           placeholder="+62 812..."
                         />
                         {errors.customer_info?.whatsapp && <p className="text-red-500 text-xs mt-1.5 font-semibold font-mono">{errors.customer_info.whatsapp.message}</p>}
                       </div>
                     </div>
                   </div>
                 </div>
               )}

               {/* STEP 2: Tour Specifics */}
               {step === 2 && (
                 <div className="animate-in fade-in slide-in-from-right-4">
                   <h2 className="text-2xl font-extrabold text-slate-900 mb-6 border-b border-slate-100 pb-4">Trip Details</h2>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Booking Date</label>
                       <input 
                         type="date"
                         {...register('booking_date')}
                         className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 transition-all ${errors.booking_date ? 'border-red-400' : 'border-slate-200 focus:border-brand-primary'}`}
                       />
                       {errors.booking_date && <p className="text-red-500 text-xs mt-1.5 font-semibold font-mono">{errors.booking_date.message}</p>}
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Number of Participants (Pax)</label>
                       <div className="flex items-center">
                          <button type="button" onClick={() => setPax(Math.max(1, pax - 1))} className="w-12 h-12 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 font-bold transition-colors">-</button>
                          <span className="flex-1 text-center font-extrabold text-xl font-mono text-brand-primary">{pax}</span>
                          <button type="button" onClick={() => setPax(Math.min(50, pax + 1))} className="w-12 h-12 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 font-bold transition-colors">+</button>
                       </div>
                     </div>
                   </div>

                   <h3 className="font-bold text-slate-800 mb-4">Enhance your experience (Add-ons)</h3>
                   <div className="space-y-3">
                     {tourMock.availableAddons.map(addon => {
                       const isSelected = selectedAddons.find(a => a.id === addon.id);
                       return (
                         <div 
                           key={addon.id} 
                           onClick={() => handleAddonToggle(addon)}
                           className={`p-4 border-2 rounded-xl cursor-pointer flex justify-between items-center transition-all duration-300 ${isSelected ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                         >
                           <div className="flex items-center gap-4">
                             <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-brand-primary border-brand-primary text-white' : 'border-slate-300'}`}>
                                {isSelected && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                             </div>
                             <span className={`font-bold ${isSelected ? 'text-brand-primary' : 'text-slate-700'}`}>{addon.name}</span>
                           </div>
                           <span className="font-mono text-sm text-slate-500 font-bold tracking-tight">
                             + Rp {addon.price.toLocaleString('id-ID')}
                           </span>
                         </div>
                       );
                     })}
                   </div>
                 </div>
               )}

               {/* STEP 3: Payment Mock Selection */}
               {step === 3 && (
                 <div className="animate-in fade-in slide-in-from-right-4">
                   <h2 className="text-2xl font-extrabold text-slate-900 mb-6 border-b border-slate-100 pb-4">Secure Payment</h2>
                   <p className="text-slate-500 mb-6">Choose your preferred payment method. You will be redirected securely to the payment gateway.</p>
                   
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                     {['Virtual Account', 'Credit Card', 'QRIS', 'E-Wallet'].map((pm, idx) => (
                       <div key={idx} className={`p-4 border-2 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-3 transition-all ${idx === 0 ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-slate-300 grayscale opacity-50'}`}>
                         <div className="w-12 h-8 bg-slate-200 rounded bg-cover bg-center" style={{backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1200px-Bank_Central_Asia.svg.png)'}}></div>
                         <span className="text-xs font-bold text-center">{pm}</span>
                       </div>
                     ))}
                   </div>
                   
                   <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 text-sm text-blue-800">
                     <span className="font-bold shrink-0">ℹ️ Note:</span>
                     <p>This will test the <code className="bg-white px-1 py-0.5 rounded font-mono font-bold mx-1 text-brand-primary">Payment Orchestrator API</code> in the background.</p>
                   </div>
                 </div>
               )}

               {/* Navigation Controls */}
               <div className="mt-12 pt-6 border-t border-slate-100 flex justify-between items-center">
                 <button 
                   type="button" 
                   onClick={prevStep} 
                   className={`px-6 py-3 font-bold text-slate-500 transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'hover:text-slate-800'}`}
                 >
                   Back
                 </button>
                 
                 {step < 3 ? (
                   <button 
                     type="button" 
                     onClick={() => nextStep(step)} 
                     className="px-8 py-3.5 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold rounded-xl shadow-lg shadow-brand-primary/30 transition-all hover:-translate-y-0.5"
                   >
                     Continue to Step {step + 1}
                   </button>
                 ) : (
                   <button 
                     type="submit" 
                     className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl shadow-xl shadow-emerald-500/30 transition-all hover:-translate-y-1 flex items-center gap-2"
                   >
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" /></svg>
                     Confirm & Pay Securely
                   </button>
                 )}
               </div>
            </form>
          </div>

          {/* Right Column: Sticky Summary */}
          <div className="w-full lg:w-1/3">
             <OrderSummaryWidget 
               tourId={tourMock.id}
               tourName={tourMock.name}
               basePrice={tourMock.basePrice}
               pax={pax}
               addonsList={selectedAddons}
             />
          </div>

        </div>

      </div>
    </div>
  );
}
