'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Mock Data
const promoData = [
  { id: 1, img: "https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=600", badge: "DISKON 20%", category: "Paket Tour Bromo", title: "Promo Bromo Sunrise Diskon 20% Tanpa Minimal Transaksi", desc: "Nikmati keindahan Bromo lebih hemat. Berlaku untuk pemesanan Private Tour.", code: "BROMOHEMAT", expDate: "Berakhir 30 Nov 2026", expWarning: true },
  { id: 2, img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600", badge: "CASHBACK 150K", category: "Rental Mobil", title: "Cashback Hingga 150Ribu Sewa Mobil Lepas Kunci", desc: "Sewa mobil 2 hari atau lebih dan dapatkan langsung cashback ke e-wallet.", code: "SEWASERU", expDate: "Berakhir 15 Des 2026", expWarning: false },
  { id: 3, img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600", badge: "DISKON RP 500K", category: "Promo Bank BCA", title: "Liburan Hemat Malang City Tour Khusus Kartu Kredit BCA", desc: "Gunakan Kartu Kredit BCA untuk transaksi minimal Rp 3.000.000.", code: "BCAMALANG", expDate: "Berakhir 31 Des 2026", expWarning: false },
  { id: 4, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600", badge: "BELI 10 GRATIS 1", category: "Corporate / Family", title: "Promo Rombongan Bali Explorer Tour", desc: "Cocok untuk gathering! Pesan untuk 10 pax dan dapatkan 1 pax gratis.", code: "BALIGROUP", expDate: "Berakhir 20 Des 2026", expWarning: true },
  { id: 5, img: "https://images.unsplash.com/photo-1517441865-c32f8313bd8a?w=600", badge: "DISKON 15%", category: "Paket Tour Ijen", title: "Eksplorasi Blue Fire Kawah Ijen Potongan 15%", desc: "Penawaran spesial untuk pemesanan Open Trip Kawah Ijen.", code: "IJENBLUE", expDate: "Berakhir 05 Des 2026", expWarning: true },
  { id: 6, img: "https://images.unsplash.com/photo-1620067677840-7ac53577d2ec?w=600", badge: "DISKON RP 200K", category: "Promo Bank Mandiri", title: "Potongan Harga Sewa Mobil Premium & Innova Zenix", desc: "Khusus nasabah Livin' Mandiri. Nikmati perjalanan VIP lebih terjangkau.", code: "LIVINVIP", expDate: "Berakhir 31 Des 2026", expWarning: false }
];

export default function PromoPage() {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredPromos = promoData.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.code.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-[320px] shrink-0">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm overflow-hidden sticky top-28">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-brand-primary/5">
                <h2 className="font-black text-brand-primary text-sm uppercase tracking-[0.2em] flex items-center justify-between">
                  <span><i className="fa-solid fa-tags mr-2"></i> Filter Promo</span>
                  <button onClick={() => setSearch('')} className="text-[10px] text-slate-400 hover:text-brand-primary uppercase tracking-widest transition-all">Reset</button>
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Cari Promo / Kode</label>
                  <div className="relative group">
                    <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors"></i>
                    <input 
                      type="text" 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Cari BCA, Diskon 50%..." 
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Kategori</label>
                  {['Paket Tour', 'Rental Mobil', 'Promo Bank', 'Special Offer'].map(cat => (
                    <button key={cat} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
                       <div className="w-5 h-5 flex items-center justify-center text-slate-400 group-hover:text-brand-primary"><i className="fa-solid fa-chevron-right text-[8px]"></i></div>
                       <span className="text-[11px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">{cat}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 w-full">
            <div className="mb-10">
              <nav className="flex text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                 <Link href="/" className="hover:text-brand-primary transition-colors">Beranda</Link>
                 <span className="mx-2 opacity-30">/</span>
                 <span className="text-slate-600 dark:text-slate-300">Promo</span>
              </nav>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">
                Klaim Promo Spesial
              </h1>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-bold italic">
                Hemat liburanmu dengan <span className="text-brand-primary font-black not-italic">{filteredPromos.length}</span> penawaran aktif hari ini.
              </p>
            </div>

            {/* Promo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPromos.map((promo) => (
                <div key={promo.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-brand-primary/30 transition-all duration-500 flex flex-col group">
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img src={promo.img} alt={promo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                    <span className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-sm text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-lg">
                      {promo.badge}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-2">{promo.category}</div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white uppercase tracking-tight mb-3 line-clamp-2 leading-tight group-hover:text-brand-primary transition-colors">
                      {promo.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold italic mb-6 line-clamp-2">
                       {promo.desc}
                    </p>

                    {/* Promo Code Box */}
                    <div className="mt-auto mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-between group/code transition-colors hover:border-brand-primary/50">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Kode Promo</p>
                        <p className="font-black text-slate-800 dark:text-white tabular-nums tracking-widest text-sm">{promo.code}</p>
                      </div>
                      <button 
                        onClick={() => handleCopy(promo.code, promo.id)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${copiedId === promo.id ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-slate-700 text-brand-primary hover:bg-brand-primary hover:text-white shadow-sm'}`}
                      >
                        {copiedId === promo.id ? <i className="fa-solid fa-check"></i> : <i className="fa-regular fa-copy"></i>}
                      </button>
                    </div>

                    {/* Expiry */}
                    <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                       <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${promo.expWarning ? 'text-red-500' : 'text-slate-400'}`}>
                         <i className="fa-regular fa-clock"></i> {promo.expDate}
                       </span>
                       <button className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline">S&K</button>
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
