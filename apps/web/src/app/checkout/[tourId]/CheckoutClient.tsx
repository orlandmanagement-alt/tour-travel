'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CheckoutStepper from '@/components/CheckoutStepper';
import OrderSummaryWidget from '@/components/OrderSummaryWidget';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

// Inline schema (safe on client — no server-only imports)
const BookingFormSchema = z.object({
  tour_id: z.string(),
  pax: z.number().int().min(1).max(50),
  booking_date: z.string().min(1, 'Please select a date'),
  customer_info: z.object({
    full_name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email format'),
    whatsapp: z.string().min(9, 'Invalid phone number'),
  }),
});

interface CheckoutClientProps {
  tourId: string;
}

export default function CheckoutClient({ tourId }: CheckoutClientProps) {
  const [step, setStep] = useState(1);
  const [pax, setPax] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState<{ id: string; name: string; price: number, charge_type?: string }[]>([]);
  const [tourData, setTourData] = useState<any>(null);
  const [isLoadingTour, setIsLoadingTour] = useState(true);

  const router = useRouter();
  const { user } = useAuth();

  const { register, handleSubmit, trigger, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      tour_id: tourId,
      pax: 2,
      booking_date: '',
      customer_info: { full_name: user?.name || '', email: user?.email || '', whatsapp: '' },
    },
    mode: 'onChange',
  });

  // Auto-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setValue('customer_info.full_name', user.name);
      setValue('customer_info.email', user.email);
    }
  }, [user, setValue]);

  // Fetch true tour data
  useEffect(() => {
    fetch(`http://localhost:8787/api/tours/${tourId}`)
      .then(res => res.json())
      .then(data => {
        setTourData(data);
        setIsLoadingTour(false);
      })
      .catch(err => {
        console.error("Failed fetching tour", err);
        setIsLoadingTour(false);
      });
  }, [tourId]);

  const nextStep = async (currentStep: number) => {
    let valid = false;
    if (currentStep === 1) valid = await trigger('customer_info');
    else if (currentStep === 2) valid = await trigger(['booking_date', 'pax']);
    else valid = true;
    if (valid) setStep(s => Math.min(s + 1, 3));
  };

  const onSubmit = async (data: any) => {
    const payload = { 
      customer_name: data.customer_info.full_name,
      customer_email: data.customer_info.email,
      customer_phone: data.customer_info.whatsapp,
      tour_id: Number(data.tour_id),
      travel_date: data.booking_date,
      total_pax: pax,
      addons: selectedAddons.map((a: any) => ({ 
          id: Number(a.id), 
          quantity: a.charge_type === 'per_group' ? 1 : pax 
      }))
    };

    try {
      const res = await fetch(`http://localhost:8787/api/bookings`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Booking failed');
      
      if (result?.booking_reference) {
          router.push(`/checkout/success?ref=${result.booking_reference}`);
      }
    } catch (e: any) {
      alert(e.message);
      console.error('Checkout API error:', e);
    }
  };

  const handleAddonToggle = (addon: { id: string; name: string; price: number, charge_type?: string }) => {
    setSelectedAddons((prev: any[]) =>
      prev.find(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
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

          {/* Form */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100">

              {/* STEP 1 */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4">
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-6 border-b border-slate-100 pb-4">Customer Details</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                      <input {...register('customer_info.full_name')}
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 transition-all ${errors.customer_info?.full_name ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-primary/30 focus:border-brand-primary'}`}
                        placeholder="John Doe" />
                      {errors.customer_info?.full_name && <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.customer_info.full_name.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                        <input {...register('customer_info.email')} type="email"
                          className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 transition-all ${errors.customer_info?.email ? 'border-red-400' : 'border-slate-200 focus:border-brand-primary'}`}
                          placeholder="john@example.com" />
                        {errors.customer_info?.email && <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.customer_info.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp</label>
                        <input {...register('customer_info.whatsapp')} type="tel"
                          className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 transition-all ${errors.customer_info?.whatsapp ? 'border-red-400' : 'border-slate-200 focus:border-brand-primary'}`}
                          placeholder="+62 812..." />
                        {errors.customer_info?.whatsapp && <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.customer_info.whatsapp.message}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4">
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-6 border-b border-slate-100 pb-4">Trip Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Booking Date</label>
                      <input type="date" {...register('booking_date')}
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 transition-all ${errors.booking_date ? 'border-red-400' : 'border-slate-200 focus:border-brand-primary'}`} />
                      {errors.booking_date && <p className="text-red-500 text-xs mt-1.5 font-semibold">{errors.booking_date.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Participants (Pax)</label>
                      <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                        <button type="button" onClick={() => setPax(Math.max(1, pax - 1))} className="w-14 h-12 bg-slate-50 hover:bg-slate-100 font-bold text-xl transition-colors">-</button>
                        <span className="flex-1 text-center font-extrabold text-xl font-mono text-brand-primary">{pax}</span>
                        <button type="button" onClick={() => setPax(Math.min(50, pax + 1))} className="w-14 h-12 bg-slate-50 hover:bg-slate-100 font-bold text-xl transition-colors">+</button>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-800 mb-4">Add-ons</h3>
                  {tourData?.addons && tourData.addons.length > 0 ? (
                    <div className="space-y-3">
                      {tourData.addons.map((addon: any) => {
                        const selected = !!selectedAddons.find(a => a.id === addon.id);
                        return (
                          <div key={addon.id} onClick={() => handleAddonToggle({id: addon.id, name: addon.addon_name, price: addon.charge_type === 'per_pax' ? (addon.price * pax) : addon.price, charge_type: addon.charge_type})}
                            className={`p-4 border-2 rounded-xl cursor-pointer flex justify-between items-center transition-all ${selected ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-200 hover:border-slate-300'}`}>
                            <div className="flex items-center gap-4">
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selected ? 'bg-brand-primary border-brand-primary text-white' : 'border-slate-300'}`}>
                                {selected && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                              </div>
                              <span className={`font-bold ${selected ? 'text-brand-primary' : 'text-slate-700'}`}>{addon.addon_name} <span className="text-xs font-medium text-slate-400">({addon.charge_type === 'per_pax' ? 'Per Pax' : 'Per Group'})</span></span>
                            </div>
                            <span className="font-mono text-sm text-slate-500">+ Rp {addon.price.toLocaleString('id-ID')}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">No add-ons available for this trip.</p>
                  )}
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-4">
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-6 border-b border-slate-100 pb-4">Secure Payment</h2>
                  <p className="text-slate-500 mb-6">Payment will be processed securely via the NusantaraTrip Payment Orchestrator (Midtrans / Xendit).</p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {['Virtual Account', 'Credit Card', 'QRIS', 'E-Wallet'].map((pm, idx) => (
                      <div key={idx} className={`p-4 border-2 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-2 transition-all ${idx === 0 ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 opacity-50'}`}>
                        <span className="text-xs font-bold text-center">{pm}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-blue-800">
                    <b>Note:</b> Payment will be routed through the <code className="bg-white px-1 rounded font-mono text-brand-primary mx-1">Payment Orchestrator API</code> with automatic gateway failover.
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-12 pt-6 border-t border-slate-100 flex justify-between items-center">
                <button type="button" onClick={() => setStep(s => Math.max(s - 1, 1))}
                  className={`px-6 py-3 font-bold text-slate-500 transition-colors hover:text-slate-800 ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}>
                  Back
                </button>
                {step < 3 ? (
                  <button type="button" onClick={() => nextStep(step)}
                    className="px-8 py-3.5 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold rounded-xl shadow-lg shadow-brand-primary/30 transition-all hover:-translate-y-0.5">
                    Continue to Step {step + 1}
                  </button>
                ) : (
                  <button type="submit"
                    className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2">
                    🔒 Confirm & Pay Securely
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Sticky Summary */}
          <div className="w-full lg:w-1/3">
            {isLoadingTour ? (
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-center items-center h-[300px]">
                 <p className="text-slate-400 font-bold">Kalkulasi biaya...</p>
              </div>
            ) : (
              <OrderSummaryWidget 
                tourId={tourId} 
                tourName={tourData?.name || 'Menunggu data...'} 
                basePrice={tourData?.base_price || 0} 
                pax={pax} 
                addonsList={selectedAddons} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
