'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const DUMMY_QR_PAYLOAD = 'NSTR-84021|SARAH|CHEN|BROMO|20261215|PAID';

interface ETicketClientProps {
  bookingRef: string;
}

export default function ETicketClient({ bookingRef }: ETicketClientProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-12 px-4 print:bg-white print:p-0">
      <div className="max-w-3xl w-full flex flex-col items-center">

        <div className="w-full flex justify-between mb-8 print:hidden">
          <Link href="/dashboard" className="text-slate-500 hover:text-brand-primary flex items-center font-bold text-sm transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Dashboard
          </Link>
          <button onClick={() => window.print()} className="px-5 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl shadow hover:bg-slate-800 transition flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print Ticket
          </button>
        </div>

        {/* Boarding Pass Card */}
        <div className="w-full bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.1)] print:shadow-none print:border print:border-slate-300">

          {/* Left: Main Details */}
          <div className="flex-1 p-8 md:p-10 relative">
            <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
              <svg width="200" height="200" viewBox="0 0 100 100"><path d="M50 0L100 50L50 100L0 50Z" fill="currentColor" /></svg>
            </div>

            <div className="flex justify-between items-start mb-10 border-b border-slate-100 pb-6 relative z-10">
              <h1 className="text-3xl font-extrabold text-brand-primary tracking-tighter flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-brand-primary text-white flex items-center justify-center text-sm">N</span>
                NSTR <span className="text-slate-300 font-light mx-2">|</span> E-Ticket
              </h1>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 rounded text-sm uppercase tracking-wider">Confirmed</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              <div>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">Passenger</span>
                <h2 className="text-xl font-bold text-slate-900">Sarah Chen</h2>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">Booking Ref</span>
                <h2 className="text-xl font-mono font-bold text-slate-900">{bookingRef}</h2>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">Date & Time</span>
                <h2 className="text-xl font-bold text-slate-900">Dec 15, 2026</h2>
                <span className="text-sm font-bold text-red-500 mt-1 block">Meetup: 00:30 AM</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative z-10">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-2">Destination</span>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Midnight Bromo Sunrise Premium</h2>
              <p className="text-slate-600 font-medium">Pickup: Hotel Majapahit Surabaya • Guide: Budi (A012)</p>
              <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Pax</span>
                  <p className="font-mono font-bold text-lg text-slate-800">2 Guests</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Add-ons</span>
                  <p className="font-bold text-sm text-slate-800 mt-1">• GoPro Rental (1x)</p>
                </div>
              </div>
            </div>

            <p className="mt-8 text-xs text-slate-400">Present this E-Ticket (digital or printed) to your Tour Guide inside the Jeep. Bring warm clothing and gloves.</p>
          </div>

          {/* Ticket Divider — Punch Holes */}
          <div className="hidden md:flex flex-col items-center justify-between py-6 relative w-12 shrink-0">
            <div className="w-8 h-8 rounded-full bg-slate-100 absolute top-[-16px]"></div>
            <div className="w-0.5 h-full border-l-2 border-dashed border-slate-300 print:border-slate-400"></div>
            <div className="w-8 h-8 rounded-full bg-slate-100 absolute bottom-[-16px]"></div>
          </div>

          {/* Mobile Divider */}
          <div className="flex md:hidden items-center px-6 relative h-12">
            <div className="w-8 h-8 rounded-full bg-slate-100 absolute left-[-16px]"></div>
            <div className="w-full h-0.5 border-t-2 border-dashed border-slate-300"></div>
            <div className="w-8 h-8 rounded-full bg-slate-100 absolute right-[-16px]"></div>
          </div>

          {/* Right: Stub / QR */}
          <div className="w-full md:w-80 p-8 md:p-10 bg-brand-primary text-white flex flex-col items-center justify-center shrink-0 print:bg-white print:text-black print:border-l print:border-slate-300">
            <div className="text-center w-full mb-8">
              <h3 className="font-extrabold text-2xl tracking-tighter mb-2 print:text-slate-900">BOARDING</h3>
              <span className="block text-brand-primary-light font-mono text-sm print:text-slate-500">{bookingRef}</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-inner mb-6 w-48 h-48 flex items-center justify-center print:border-4 print:border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/240px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="QR Code" className="w-full h-full object-contain grayscale" />
            </div>
            <div className="text-center w-full">
              <p className="text-xs font-bold text-brand-primary-light uppercase tracking-widest mb-1 print:text-slate-400">Validation Hash</p>
              <p className="font-mono text-[10px] text-white/70 break-all print:text-slate-800">{DUMMY_QR_PAYLOAD}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
