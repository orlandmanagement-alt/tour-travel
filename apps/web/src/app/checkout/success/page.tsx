'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('bookingResult');
    if (data) {
      setResult(JSON.parse(data));
    }
  }, []);

  if (!result) return <div className="min-h-screen py-32 text-center text-slate-500">Loading your confirmation...</div>;

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(`Hello NusantaraTrip, I have just completed a booking.\n\nTour: ${result.tour_name}\nReference Code: *${result.booking_reference}*\nAmount: Rp ${result.grand_total.toLocaleString('id-ID')}\n\nPlease check!`);
  const whatsappUrl = `https://wa.me/6281234567890?text=${whatsappMessage}`;

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-20 flex justify-center items-center">
      <div className="max-w-2xl w-full px-4 text-center">
        
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden print-area">
           {/* Success Banner */}
           <div className="bg-emerald-500 p-8 text-white">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                 <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                 </svg>
              </div>
              <h1 className="text-3xl font-bold mb-2">Booking Reserved!</h1>
              <p className="text-emerald-100">Please complete your payment within 24 hours.</p>
           </div>

           <div className="p-8 pb-12">
             <div className="mb-8">
               <p className="text-sm text-slate-500 uppercase font-semibold tracking-wider mb-2">Reference Code</p>
               <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-widest bg-slate-100 dark:bg-slate-700/50 py-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 inline-block px-8">{result.booking_reference}</h2>
             </div>

             <div className="space-y-4 mb-8 text-left max-w-sm mx-auto">
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                  <span className="text-slate-500">Tour Package</span>
                  <span className="font-semibold text-right dark:text-white">{result.tour_name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                  <span className="text-slate-500">Payment Due</span>
                  <span className="font-semibold text-brand-secondary-dark dark:text-brand-secondary text-right">Rp {result.grand_total.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-slate-500">Bank Transfer</span>
                  <span className="font-mono font-semibold dark:text-white bg-slate-100 dark:bg-slate-800 px-2 rounded">BCA 1234567890</span>
                </div>
             </div>

             <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
               <a 
                 href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                 className="flex-1 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold transition flex justify-center items-center shadow-lg shadow-emerald-500/20"
               >
                 Confirm via WhatsApp
               </a>
               <button 
                 onClick={handlePrint}
                 className="flex-1 px-6 py-3 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-bold transition flex justify-center items-center"
               >
                 Download Invoice
               </button>
             </div>
             
             <div className="mt-8 no-print">
               <Link href="/track" className="text-brand-primary font-medium text-sm hover:underline">Go to Order Tracker →</Link>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
