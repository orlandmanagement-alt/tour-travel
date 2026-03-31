'use client';

"use client";

import { useState } from 'react';

export default function OrderTrackerPage() {
  const [referenceCode, setReferenceCode] = useState('');
  const [statusResult, setStatusResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceCode) return;
    
    setIsSearching(true);
    setErrorMsg('');
    setStatusResult(null);

    try {
      const res = await fetch(`http://127.0.0.1:8787/api/bookings/${referenceCode}`);
      if (!res.ok) {
         if (res.status === 404) throw new Error('Booking not found');
         throw new Error('Something went wrong');
      }
      
      const data = await res.json();
      setStatusResult(data.data);
    } catch (e: any) {
      if (referenceCode.startsWith('NSTR')) {
        // Fallback for demo
        setStatusResult({
          booking_reference: referenceCode,
          customer_name: 'John Doe (Mock)',
          tour_name: 'Midnight Bromo Sunrise Tour',
          travel_date: '2024-12-25',
          grand_total: 1550000,
          payment_status: 'paid',
        });
      } else {
        setErrorMsg(e.message);
      }
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
       case 'paid': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30';
       case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30';
       case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30';
       default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
           <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Track Your Booking</h1>
           <p className="text-slate-600 dark:text-slate-400">Enter your booking reference code to view the status of your reservation and payment details.</p>
        </div>

        {/* Search Box */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl mb-8 border border-slate-100 dark:border-slate-700">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              placeholder="e.g. NSTR-123456" 
              value={referenceCode}
              onChange={(e) => setReferenceCode(e.target.value.toUpperCase())}
              className="flex-1 px-6 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 focus:border-brand-primary dark:focus:border-brand-primary bg-transparent text-lg font-mono outline-none dark:text-white transition"
            />
            <button 
              type="submit" 
              disabled={isSearching}
              className="px-8 py-4 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold rounded-xl shadow-lg transition disabled:opacity-70 disabled:cursor-not-allowed min-w-[160px]"
            >
              {isSearching ? 'Searching...' : 'Track'}
            </button>
          </form>

          {errorMsg && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Status Result */}
        {statusResult && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-8 duration-500">
             
             <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center sm:items-start flex-col sm:flex-row gap-4">
               <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Booking Reference</p>
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white font-mono">{statusResult.booking_reference}</h2>
               </div>
               <div className={`px-4 py-2 rounded-full border text-sm font-bold uppercase tracking-wider ${getStatusColor(statusResult.payment_status)}`}>
                  {statusResult.payment_status}
               </div>
             </div>

             <div className="p-8 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Customer Name</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{statusResult.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Travel Date</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{new Date(statusResult.travel_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-slate-500 mb-1">Tour Package</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-lg">{statusResult.tour_name}</p>
                  </div>
                </div>

                <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center mt-6">
                   <div>
                     <p className="text-sm font-medium text-slate-500 mb-1">Total Amount Due</p>
                     <p className="text-2xl font-black text-brand-secondary-dark dark:text-brand-secondary">
                        Rp {statusResult.grand_total.toLocaleString('id-ID')}
                     </p>
                   </div>
                   
                   {statusResult.payment_status === 'pending' && (
                     <div className="text-right pl-4 border-l border-slate-200 dark:border-slate-700">
                       <p className="text-xs text-slate-500 mb-1">Transfer to (BCA)</p>
                       <p className="font-mono font-bold dark:text-slate-200">123 456 7890</p>
                       <p className="text-xs font-medium text-slate-500">A/N NusantaraTrip</p>
                     </div>
                   )}
                </div>

             </div>
          </div>
        )}

      </div>
    </div>
  );
}
