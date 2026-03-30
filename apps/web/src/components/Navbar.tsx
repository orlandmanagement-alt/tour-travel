'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-extrabold text-2xl tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center">N</span>
              NusantaraTrip
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary transition-all duration-300 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/tours" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary transition-all duration-300 relative group">
              Explore Tours
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/custom-trip" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary transition-all duration-300 relative group">
              Custom Trip
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/track" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary transition-all duration-300 relative group">
              Track Booking
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <Link href="/tours" className="px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-semibold shadow-lg shadow-brand-primary/30 transform hover:-translate-y-0.5 transition-all duration-300">
              Book Now
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ${isOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col gap-2">
          <Link href="/" className="px-3 py-2 rounded-md font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/tours" className="px-3 py-2 rounded-md font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsOpen(false)}>Explore Tours</Link>
          <Link href="/custom-trip" className="px-3 py-2 rounded-md font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsOpen(false)}>Custom Trip</Link>
          <Link href="/track" className="px-3 py-2 rounded-md font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsOpen(false)}>Track Booking</Link>
          <Link href="/tours" className="mt-4 text-center px-4 py-3 rounded-xl bg-brand-primary text-white font-bold block" onClick={() => setIsOpen(false)}>Book Now</Link>
        </div>
      </div>
    </nav>
  );
}
