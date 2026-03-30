'use client';
import { useState } from 'react';

export default function SearchFilter() {
  const [activeTab, setActiveTab] = useState<'tour' | 'car'>('tour');
  const [showLocationDrop, setShowLocationDrop] = useState(false);
  const [showDestinationDrop, setShowDestinationDrop] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');

  return (
    <section className="relative z-30 -mt-16 sm:-mt-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-2 sm:p-4 backdrop-blur-xl bg-white/95 transition-all duration-300">
        
        {/* Tabs */}
        <div className="flex gap-6 px-4 pt-1 pb-4 mb-3 border-b border-slate-100 dark:border-slate-700">
          <button 
            onClick={() => setActiveTab('tour')}
            className={`flex items-center gap-2 font-extrabold text-sm transition-all pb-2 relative group ${
              activeTab === 'tour' ? 'text-brand-primary' : 'text-slate-400 hover:text-brand-primary'
            }`}
          >
            <i className={`fa-solid fa-map-location-dot ${activeTab === 'tour' ? 'animate-bounce' : ''}`}></i>
            Paket Tour
            {activeTab === 'tour' && <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-primary rounded-full transition-all"></span>}
          </button>
          <button 
            onClick={() => setActiveTab('car')}
            className={`flex items-center gap-2 font-extrabold text-sm transition-all pb-2 relative group ${
              activeTab === 'car' ? 'text-brand-primary' : 'text-slate-400 hover:text-brand-primary'
            }`}
          >
            <i className={`fa-solid fa-car-side ${activeTab === 'car' ? 'animate-bounce' : ''}`}></i>
            Rental Mobil
            {activeTab === 'car' && <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-primary rounded-full transition-all"></span>}
          </button>
        </div>
        
        {/* TOUR FORM */}
        <form className={`${activeTab === 'tour' ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-4 gap-3`}>
          {/* Keberangkatan */}
          <div className="relative p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:border-brand-primary/50 focus-within:shadow-lg transition-all group">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Keberangkatan</label>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-plane-departure text-slate-400 group-hover:text-brand-primary text-sm transition-colors"></i>
              <input 
                type="text" 
                placeholder="Pilih Kota" 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                onFocus={() => setShowLocationDrop(true)}
                onBlur={() => setTimeout(() => setShowLocationDrop(false), 200)}
                className="w-full bg-transparent text-slate-900 dark:text-white font-bold text-sm focus:outline-none placeholder-slate-400" 
              />
            </div>
            {showLocationDrop && (
              <ul className="absolute left-0 top-full mt-2 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl z-[60] overflow-hidden">
                {['Jakarta', 'Malang', 'Banyuwangi', 'Bali'].map((city) => (
                  <li 
                    key={city}
                    onMouseDown={() => setSelectedLocation(city)}
                    className="px-4 py-3 hover:bg-brand-50 dark:hover:bg-brand-primary/10 cursor-pointer text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-2"
                  >
                    <i className="fa-solid fa-city opacity-40"></i> {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Destinasi */}
          <div className="relative p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:border-brand-primary/50 focus-within:shadow-lg transition-all group">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Destinasi</label>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-magnifying-glass text-slate-400 group-hover:text-brand-primary text-sm transition-colors"></i>
              <input 
                type="text" 
                placeholder="Ketik Bromo, Ijen..." 
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                onFocus={() => setShowDestinationDrop(true)}
                onBlur={() => setTimeout(() => setShowDestinationDrop(false), 200)}
                className="w-full bg-transparent text-slate-900 dark:text-white font-bold text-sm focus:outline-none placeholder-slate-400" 
              />
            </div>
            {showDestinationDrop && (
              <ul className="absolute left-[0] top-full mt-2 w-[140%] sm:w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl z-[60] overflow-hidden">
                {[
                  { name: 'Open Trip Bromo', loc: 'Malang/Surabaya' },
                  { name: 'Kawah Ijen Blue Fire', loc: 'Banyuwangi' },
                  { name: 'Nusa Penida 1 Day', loc: 'Bali' }
                ].map((dest) => (
                  <li 
                    key={dest.name}
                    onMouseDown={() => setSelectedDestination(dest.name)}
                    className="px-4 py-3 hover:bg-brand-50 dark:hover:bg-brand-primary/10 cursor-pointer border-b border-slate-100 dark:border-slate-700 last:border-0"
                  >
                    <div className="font-extrabold text-brand-900 dark:text-white text-xs">{dest.name}</div>
                    <div className="text-slate-400 text-[10px] font-medium">{dest.loc}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Date */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:border-brand-primary/50 focus-within:shadow-lg transition-all group">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tanggal Trip</label>
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-calendar text-slate-400 group-hover:text-brand-primary text-sm transition-colors"></i>
              <input type="date" className="w-full bg-transparent text-slate-900 dark:text-white font-bold text-sm focus:outline-none cursor-pointer" />
            </div>
          </div>

          {/* Search Button */}
          <div className="p-1">
            <button type="button" className="w-full h-full min-h-[48px] bg-brand-accent hover:bg-brand-accent-dark text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95">
              <i className="fa-solid fa-magnifying-glass text-xs"></i>
              Cari Tour
            </button>
          </div>
        </form>

        {/* CAR FORM */}
        <form className={`${activeTab === 'car' ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-4 gap-3 group`}>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 group-focus-within:border-brand-primary transition-all">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Kota Ambil</label>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-building text-slate-400 text-sm"></i>
              <select className="w-full bg-transparent text-slate-900 dark:text-white font-bold text-sm focus:outline-none cursor-pointer appearance-none">
                <option>Malang / Batu</option>
                <option>Surabaya</option>
                <option>Jakarta</option>
              </select>
            </div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 group-focus-within:border-brand-primary transition-all">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tanggal Rental</label>
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-calendar-check text-slate-400 text-sm"></i>
              <input type="date" className="w-full bg-transparent text-slate-900 dark:text-white font-bold text-sm focus:outline-none cursor-pointer" />
            </div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 group-focus-within:border-brand-primary transition-all">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tipe Mobil</label>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-car-side text-slate-400 text-sm"></i>
              <select className="w-full bg-transparent text-slate-900 dark:text-white font-bold text-sm focus:outline-none cursor-pointer appearance-none">
                <option>Semua Tipe</option>
                <option>MPV (Avanza, Innova)</option>
                <option>Minibus (Hiace, Elf)</option>
                <option>Premium (Alphard)</option>
              </select>
            </div>
          </div>
          <div className="p-1">
            <button type="button" className="w-full h-full min-h-[48px] bg-brand-primary hover:bg-brand-primary-dark text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95">
              <i className="fa-solid fa-car text-xs"></i>
              Cari Mobil
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}
