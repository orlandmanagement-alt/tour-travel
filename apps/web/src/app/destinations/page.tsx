'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Mock Data
const destData = [
  { id: 1, img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800", name: "Tokyo", country: "Jepang", flag: "jp", tourCount: 45, vibe: "City Vibe", budget: "$$$" },
  { id: 2, img: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800", name: "Cappadocia", country: "Turki", flag: "tr", tourCount: 28, vibe: "Budaya & Sejarah", budget: "$$" },
  { id: 3, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800", name: "Bali", country: "Indonesia", flag: "id", tourCount: 124, vibe: "Pantai & Budaya", budget: "$$" },
  { id: 4, img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800", name: "Zermatt", country: "Swiss", flag: "ch", tourCount: 15, vibe: "Pegunungan Salju", budget: "$$$" },
  { id: 5, img: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800", name: "Seoul", country: "Korea Selatan", flag: "kr", tourCount: 38, vibe: "City & Budaya", budget: "$$" },
  { id: 6, img: "https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=800", name: "Gunung Bromo", country: "Indonesia", flag: "id", tourCount: 85, vibe: "Alam & Petualangan", budget: "$" },
  { id: 7, img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800", name: "Paris", country: "Prancis", flag: "fr", tourCount: 22, vibe: "Romantis & Kota", budget: "$$$" },
  { id: 8, img: "https://images.unsplash.com/photo-1505993597083-3bd19fa85e74?w=800", name: "Labuan Bajo", country: "Indonesia", flag: "id", tourCount: 42, vibe: "Pantai & Eksotis", budget: "$$" },
  { id: 9, img: "https://images.unsplash.com/photo-1520109971360-63ce771415eb?w=800", name: "Singapura", country: "Singapura", flag: "sg", tourCount: 56, vibe: "City Vibe", budget: "$$" },
  { id: 10, img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800", name: "Dubai", country: "UEA", flag: "ae", tourCount: 30, vibe: "Mewah & Gurun", budget: "$$$" },
  { id: 11, img: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800", name: "Nusa Penida", country: "Indonesia", flag: "id", tourCount: 65, vibe: "Pantai & Eksotis", budget: "$" },
  { id: 12, img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800", name: "Kyoto", country: "Jepang", flag: "jp", tourCount: 20, vibe: "Budaya Tradisional", budget: "$$$" }
];

export default function DestinationsPage() {
  const [search, setSearch] = useState('');
  const [activeVibes, setActiveVibes] = useState<string[]>([]);
  
  const filteredDestinations = destData.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(search.toLowerCase()) || 
                         dest.country.toLowerCase().includes(search.toLowerCase());
    const matchesVibe = activeVibes.length === 0 || activeVibes.includes(dest.vibe);
    return matchesSearch && matchesVibe;
  });

  const toggleVibe = (vibe: string) => {
    setActiveVibes(prev => 
      prev.includes(vibe) ? prev.filter(v => v !== vibe) : [...prev, vibe]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-[320px] shrink-0">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm overflow-hidden sticky top-28">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-brand-primary/5 flex justify-between items-center">
                <h2 className="font-black text-brand-primary text-sm uppercase tracking-[0.2em]">
                  <i className="fa-solid fa-filter mr-2"></i> Filter
                </h2>
                <button 
                  onClick={() => { setSearch(''); setActiveVibes([]); }}
                  className="text-[10px] font-black text-slate-400 hover:text-brand-primary uppercase tracking-widest transition-all"
                >
                  Reset
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Search */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Cari Kota / Negara</label>
                  <div className="relative group">
                    <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors"></i>
                    <input 
                      type="text" 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Cari Tokyo, Bali..." 
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                {/* Vibe Filter */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Tema Liburan</label>
                  <div className="space-y-2">
                    {[
                      { name: 'Pantai & Pulau', icon: 'fa-solid fa-umbrella-beach', color: 'text-blue-400' },
                      { name: 'Pegunungan & Alam', icon: 'fa-solid fa-mountain', color: 'text-emerald-500' },
                      { name: 'City Vibe', icon: 'fa-solid fa-city', color: 'text-slate-500' },
                      { name: 'Budaya & Sejarah', icon: 'fa-brands fa-fort-awesome', color: 'text-amber-600' }
                    ].map((vibe) => (
                      <button 
                        key={vibe.name}
                        onClick={() => toggleVibe(vibe.name)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${activeVibes.includes(vibe.name) ? 'bg-brand-primary/10 border-brand-primary/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800 border-transparent'} border`}
                      >
                        <div className="flex items-center gap-3">
                          <i className={`${vibe.icon} ${vibe.color} w-5 text-center text-sm`}></i>
                          <span className={`text-[11px] font-black uppercase tracking-wider ${activeVibes.includes(vibe.name) ? 'text-brand-primary' : 'text-slate-600 dark:text-slate-400'}`}>
                            {vibe.name}
                          </span>
                        </div>
                        {activeVibes.includes(vibe.name) && <i className="fa-solid fa-check text-[10px] text-brand-primary"></i>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Region Tag Filter - Visual Only for now */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Wilayah</label>
                  <div className="flex flex-wrap gap-2">
                    {['Domestik', 'Asia Timur', 'Asia Tenggara', 'Eropa', 'Timur Tengah'].map(region => (
                      <button key={region} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-brand-primary hover:text-brand-primary transition-all">
                        {region}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 w-full">
            {/* Header & Stats */}
            <div className="mb-10">
              <nav className="flex text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                 <Link href="/" className="hover:text-brand-primary transition-colors">Beranda</Link>
                 <span className="mx-2 opacity-30">/</span>
                 <span className="text-slate-600 dark:text-slate-300">Destinasi</span>
              </nav>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">
                Eksplorasi Destinasi
              </h1>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-bold italic">
                Temukan kota atau negara impianmu. Menampilkan <span className="text-brand-primary font-black not-italic">{filteredDestinations.length}</span> destinasi populer.
              </p>
            </div>

            {/* Quick Filter Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button className="px-5 py-2.5 bg-brand-primary text-white text-[10px] font-black rounded-full shadow-lg shadow-brand-primary/20 transition-all uppercase tracking-widest flex items-center gap-2">
                 <i className="fa-solid fa-fire text-amber-300"></i> Trending
              </button>
              {['Jepang', 'Turki', 'Bali', 'Labuan Bajo', 'Swiss'].map(city => (
                <button key={city} className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black rounded-full hover:border-brand-primary hover:text-brand-primary transition-all uppercase tracking-widest shadow-sm">
                  {city}
                </button>
              ))}
            </div>

            {/* Destination Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDestinations.map((dest) => (
                <Link 
                  href={`/tours?dest=${dest.name}`} 
                  key={dest.id}
                  className="group relative h-[380px] rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img src={dest.img} alt={dest.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  </div>

                  {/* Top Content */}
                  <div className="relative z-10 p-6 flex justify-between items-start">
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black px-3 py-1.5 rounded-xl shadow-lg uppercase tracking-[0.2em]">
                       {dest.vibe}
                    </span>
                    <div className="bg-brand-primary/90 backdrop-blur-sm text-white font-black text-[9px] px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-lg">
                       Budget: {dest.budget}
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    <div className="flex items-center gap-3 mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                      <img src={`https://flagcdn.com/w40/${dest.flag}.png`} alt={dest.country} className="w-5 rounded shadow-lg" />
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">{dest.country}</span>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-brand-accent transition-colors duration-500">
                      {dest.name}
                    </h3>
                    
                    <p className="text-[11px] text-slate-400 font-bold italic mb-6 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                      Tersedia <span className="text-white not-italic font-black">{dest.tourCount}</span> pilihan paket tour premium.
                    </p>

                    <div className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-[0.2em]">
                       Eksplor Sekarang <i className="fa-solid fa-arrow-right-long group-hover:translate-x-3 transition-transform duration-500"></i>
                    </div>
                  </div>

                  {/* Hover Overlay Line */}
                  <div className="absolute bottom-0 left-0 h-1.5 bg-brand-primary w-0 group-hover:w-full transition-all duration-700"></div>
                </Link>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-16 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-slate-100 dark:border-slate-800 pt-10">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Menampilkan {filteredDestinations.length} destinasi</p>
               <div className="flex gap-2">
                 <button className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-brand-primary transition-all">
                    <i className="fa-solid fa-chevron-left text-xs"></i>
                 </button>
                 <button className="w-10 h-10 flex items-center justify-center bg-brand-primary text-white rounded-xl font-black text-xs shadow-lg shadow-brand-primary/20">1</button>
                 <button className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 hover:text-brand-primary font-black text-xs">2</button>
                 <button className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-brand-primary transition-all">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                 </button>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
