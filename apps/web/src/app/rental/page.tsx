'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Mock Data for Rental Cars
const carData = [
  { id: 1, img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600", brand: "Toyota", name: "All New Avanza", transmission: "Automatic", seats: "7 Kursi", gas: "Bensin", year: "2023", driverType: "Lepas Kunci / Dengan Supir", rating: "4.9", reviews: "1.240", oldPrice: "350.000", newPrice: "300", badge: "TERLARIS", badgeColor: "bg-red-500" },
  { id: 2, img: "https://images.unsplash.com/photo-1620067677840-7ac53577d2ec?w=600", brand: "Toyota", name: "Innova Zenix Hybrid", transmission: "Automatic", seats: "7 Kursi", gas: "Hybrid", year: "2024", driverType: "Dengan Supir", rating: "5.0", reviews: "342", oldPrice: "", newPrice: "850", badge: "NYAMAN", badgeColor: "bg-brand-primary" },
  { id: 3, img: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=600", brand: "Honda", name: "Brio Satya E", transmission: "Manual", seats: "5 Kursi", gas: "Bensin", year: "2022", driverType: "Lepas Kunci", rating: "4.8", reviews: "850", oldPrice: "300.000", newPrice: "250", badge: "PROMO", badgeColor: "bg-amber-500" },
  { id: 4, img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600", brand: "Toyota", name: "Hiace Commuter", transmission: "Manual", seats: "15 Kursi", gas: "Diesel", year: "2022", driverType: "Termasuk Supir + BBM", rating: "4.9", reviews: "512", oldPrice: "", newPrice: "1.100", badge: "ROMBONGAN", badgeColor: "bg-emerald-500" },
  { id: 5, img: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=600", brand: "Toyota", name: "Alphard Transformer", transmission: "Automatic", seats: "6 Kursi", gas: "Bensin", year: "2022", driverType: "Dengan Supir", rating: "5.0", reviews: "215", oldPrice: "2.500.000", newPrice: "2.200", badge: "PREMIUM", badgeColor: "bg-slate-900" },
  { id: 6, img: "https://images.unsplash.com/photo-1606016159991-dde6541cc3ab?w=600", brand: "Mitsubishi", name: "Xpander Ultimate", transmission: "Automatic", seats: "7 Kursi", gas: "Bensin", year: "2023", driverType: "Lepas Kunci", rating: "4.9", reviews: "630", oldPrice: "", newPrice: "400", badge: "LEPAS KUNCI", badgeColor: "bg-blue-500" }
];

export default function RentalPage() {
  const [search, setSearch] = useState('');
  
  const filteredCars = carData.filter(car => 
    car.name.toLowerCase().includes(search.toLowerCase()) || 
    car.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-[320px] shrink-0">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm overflow-hidden sticky top-28">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-brand-primary/5 flex justify-between items-center">
                <h2 className="font-black text-brand-primary text-sm uppercase tracking-[0.2em]">
                  <i className="fa-solid fa-car mr-2"></i> Filter Mobil
                </h2>
                <button onClick={() => setSearch('')} className="text-[10px] font-black text-slate-400 hover:text-brand-primary uppercase tracking-widest transition-all">Reset</button>
              </div>

              <div className="p-6 space-y-8">
                {/* Search */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Nama Unit / Merek</label>
                  <div className="relative group">
                    <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors"></i>
                    <input 
                      type="text" 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Cari Avanza, Innova..." 
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Tipe Kendaraan</label>
                  <div className="space-y-2">
                    {['MPV (Keluarga)', 'SUV (Adventure)', 'Minibus (Group)', 'Premium'].map(cat => (
                      <button key={cat} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent transition-all group">
                         <span className="text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 group-hover:text-brand-primary">{cat}</span>
                         <i className="fa-solid fa-chevron-right text-[8px] text-slate-300 group-hover:text-brand-primary"></i>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Transmisi</label>
                  <div className="flex gap-2">
                    {['Manual', 'Automatic'].map(t => (
                      <button key={t} className="flex-1 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-all">
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 w-full">
            {/* Header */}
            <div className="mb-10">
              <nav className="flex text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                 <Link href="/" className="hover:text-brand-primary transition-colors">Beranda</Link>
                 <span className="mx-2 opacity-30">/</span>
                 <span className="text-slate-600 dark:text-slate-300">Rental Mobil</span>
              </nav>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">
                Sewa Mobil Terbaik
              </h1>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-bold italic">
                Tersedia <span className="text-brand-primary font-black not-italic">{filteredCars.length}</span> pilihan kendaraan untuk perjalananmu.
              </p>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button className="px-5 py-2.5 bg-brand-primary text-white text-[10px] font-black rounded-full shadow-lg shadow-brand-primary/20 transition-all uppercase tracking-widest flex items-center gap-2">
                 <i className="fa-solid fa-check"></i> Semua Mobil
              </button>
              {['Lepas Kunci', 'Dengan Supir', 'Hiace/Elf', 'Luxury'].map(tag => (
                <button key={tag} className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black rounded-full hover:border-brand-primary hover:text-brand-primary transition-all uppercase tracking-widest shadow-sm">
                  {tag}
                </button>
              ))}
            </div>

            {/* Car Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <div key={car.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-brand-primary/30 transition-all duration-500 group flex flex-col">
                  {/* Photo Section */}
                  <div className="relative h-48 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center p-6 overflow-hidden">
                    <img src={car.img} alt={car.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-700" />
                    <span className={`absolute top-4 left-4 ${car.badgeColor} text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-lg`}>
                      {car.badge}
                    </span>
                    <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-widest">
                       Tahun {car.year}
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{car.brand}</div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 group-hover:text-brand-primary transition-colors">
                      {car.name}
                    </h3>

                    {/* Specs Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {[
                        { icon: 'fa-solid fa-gears', value: car.transmission },
                        { icon: 'fa-solid fa-users', value: car.seats },
                        { icon: 'fa-solid fa-gas-pump', value: car.gas }
                      ].map((spec, i) => (
                        <div key={i} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-[0.1em] flex items-center gap-2">
                           <i className={`${spec.icon} text-slate-400`}></i> {spec.value}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-8">
                       <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                         <i className="fa-solid fa-user-check"></i> {car.driverType}
                       </span>
                       <div className="flex items-center gap-1.5">
                         <i className="fa-solid fa-star text-amber-400 text-xs shadow-sm"></i>
                         <span className="text-xs font-black text-slate-800 dark:text-slate-200">{car.rating}</span>
                         <span className="text-[9px] font-bold text-slate-400">({car.reviews})</span>
                       </div>
                    </div>

                    {/* Pricing */}
                    <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-end">
                       <div>
                         {car.oldPrice && <p className="text-[10px] text-slate-400 line-through font-bold mb-1">Rp {car.oldPrice}</p>}
                         <p className="text-2xl font-black text-slate-900 dark:text-white tracking-widest">
                           <span className="text-xs font-bold text-slate-400 mr-1 italic">Rp</span>{car.newPrice}<span className="text-[10px] font-bold text-slate-400 ml-1">k/hari</span>
                         </p>
                       </div>
                       <button className="px-6 py-3 bg-brand-primary text-white text-[10px] font-black rounded-2xl shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                         Pilih
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
