'use client';

import React from 'react';
import Link from 'next/link';

// Mock Fetching Data
const mockActiveBookings = [
  { ref: 'NSTR-84021', tourTitle: 'Midnight Bromo Sunrise Premium', date: 'Dec 15, 2026', pax: 2, status: 'CONFIRMED', total: 777000, img: 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=400&q=80' }
];

const mockPastBookings = [
   { ref: 'NSTR-10294', tourTitle: 'Komodo Dragon Expedition', date: 'Jul 10, 2025', pax: 4, status: 'COMPLETED', total: 12500000, img: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=400&q=80' }
];

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="bg-brand-primary p-8 rounded-3xl shadow-lg shadow-brand-primary/20 flex flex-col md:flex-row items-center justify-between mb-10 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
           <div className="relative z-10 text-center md:text-left mb-6 md:mb-0 text-white">
             <h1 className="text-3xl font-extrabold tracking-tight mb-2">Welcome Back, Sarah!</h1>
             <p className="text-brand-primary-light font-medium">Manage your bookings, access E-Tickets, and plan your next adventure.</p>
           </div>
           
           <div className="flex gap-4 relative z-10">
              <Link href="/tours" className="px-6 py-3 bg-white text-brand-primary font-bold rounded-xl shadow-md hover:-translate-y-1 transition-transform">
                Book a New Trip
              </Link>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Left Column: Bookings */}
           <div className="lg:col-span-2 space-y-8">
              
              <section>
                 <div className="flex justify-between items-end mb-4">
                   <h2 className="text-xl font-bold text-slate-800">Active Trips</h2>
                 </div>
                 
                 {mockActiveBookings.map((b) => (
                    <div key={b.ref} className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row gap-6 shadow-sm border border-slate-200 hover:border-brand-primary transition-colors cursor-pointer group mb-4 relative overflow-hidden">
                       
                       {/* Left Color Indicator based on status */}
                       <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500"></div>

                       <div className="w-full sm:w-40 h-32 rounded-xl bg-slate-100 overflow-hidden shrink-0 ml-1.5">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img src={b.img} alt={b.tourTitle} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       </div>
                       
                       <div className="flex-1 py-1">
                          <div className="flex justify-between items-start mb-2">
                             <span className="text-xs font-bold font-mono text-slate-400">REF: {b.ref}</span>
                             <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 flex items-center">
                               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                               {b.status}
                             </span>
                          </div>
                          <h3 className="font-extrabold text-slate-900 text-lg leading-tight mb-1">{b.tourTitle}</h3>
                          <p className="text-sm font-bold text-brand-primary mb-4">{b.date} • {b.pax} Guests</p>
                          
                          <div className="flex justify-between items-center mt-auto border-t border-slate-100 pt-4">
                             <div className="text-sm">
                               <span className="text-slate-500 block text-xs">Total Paid</span>
                               <span className="font-bold text-slate-800">Rp {b.total.toLocaleString()}</span>
                             </div>
                             
                             {/* Call to E-Ticket Route */}
                             <Link href={`/ticket/${b.ref}`} className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg shadow hover:bg-slate-800 transition mr-1">
                               View E-Ticket
                             </Link>
                          </div>
                       </div>
                    </div>
                 ))}
                 
                 {mockActiveBookings.length === 0 && (
                   <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center">
                     <p className="text-slate-500 font-medium">No active trips ahead. Time to explore!</p>
                   </div>
                 )}
              </section>

              <section>
                 <h2 className="text-xl font-bold text-slate-800 mb-4">Past Adventures</h2>
                 {mockPastBookings.map((b) => (
                    <div key={b.ref} className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-slate-100 opacity-70 mb-3">
                       <div className="w-20 h-20 rounded-lg bg-slate-100 overflow-hidden shrink-0 grayscale hover:grayscale-0 transition-all">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img src={b.img} alt={b.tourTitle} className="w-full h-full object-cover" />
                       </div>
                       <div>
                          <span className="text-xs font-bold font-mono text-slate-400">REF: {b.ref} • {b.date}</span>
                          <h3 className="font-bold text-slate-700 mt-1">{b.tourTitle}</h3>
                          <p className="text-xs text-brand-primary font-bold hover:underline cursor-pointer mt-2">Write a Review</p>
                       </div>
                    </div>
                 ))}
              </section>

           </div>

           {/* Right Column: Profile & Loyalty */}
           <div className="space-y-6">
              
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col items-center text-center">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src="https://ui-avatars.com/api/?name=Sarah+Chen&background=020617&color=fff&size=200" className="w-24 h-24 rounded-full border-4 border-slate-50 shadow-md mb-4" alt="Avatar"/>
                 <h3 className="text-lg font-bold text-slate-900">Sarah Chen</h3>
                 <p className="text-sm text-slate-500 mb-4">sarah@corp.com</p>
                 <button className="w-full py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition">Edit Profile</button>
              </div>

              {/* Loyalty Widget */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                 <div className="absolute right-[-20px] top-[-20px] text-8xl opacity-10">✨</div>
                 <h4 className="font-bold tracking-widest text-[10px] uppercase text-indigo-200 mb-1">Nusantara Elite Member</h4>
                 <div className="text-3xl font-extrabold mb-4 font-mono text-amber-300">2,450 pts</div>
                 <div className="w-full h-1.5 bg-indigo-950 rounded-full mb-2 overflow-hidden">
                    <div className="w-[60%] h-full bg-amber-400"></div>
                 </div>
                 <p className="text-xs text-indigo-200 font-medium">550 pts away from Platinum Tier</p>
              </div>

              {/* Support Widget */}
              <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex items-start gap-4">
                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-blue-500 text-xl">📞</span>
                 </div>
                 <div>
                    <h4 className="font-bold text-blue-900 text-sm">Need Assistance?</h4>
                    <p className="text-xs text-blue-700 mt-1 mb-3">Our dedicated enterprise concierges are online 24/7.</p>
                    <button className="text-xs font-bold text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm transition">
                      Chat via WhatsApp
                    </button>
                 </div>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
