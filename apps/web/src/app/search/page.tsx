'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import TourCard from '@/components/TourCard';

export default function GlobalSearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || 'Bali';
  const [activeTab, setActiveTab] = useState('all');

  const mockTours = [
    { id: 1, title: 'Bali Explorer Family Fun Trip Custom (Termasuk Hotel)', price: 1100000, rating: 4.9, reviews: 210, duration: '4D3N', location: 'Start Bali (DPS)', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600', category: 'FAMILY' },
    { id: 2, title: 'Private One Day Tour Nusa Penida Barat', price: 650000, oldPrice: 850000, rating: 4.8, reviews: 542, duration: '1 Hari', location: 'Start Sanur', image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600', category: 'PRIVATE' },
    { id: 3, title: 'Company Gathering & Team Building Pantai Kuta', price: 2100000, rating: 5.0, reviews: 45, duration: '3D2N', location: 'Start Bandara (DPS)', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600', category: 'CORPORATE' },
    { id: 4, title: 'Romantic Escape Ubud Villa & Seminyak Beach Club', price: 7500000, rating: 4.9, reviews: 88, duration: '4D3N', location: 'Ubud & Seminyak', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600', category: 'HONEYMOON' }
  ];

  const mockCars = [
    { id: 1, name: 'Brio Satya E (2022)', brand: 'Honda', price: 250000, oldPrice: 300000, type: 'AT', seats: 5, category: 'LEPAS KUNCI', image: 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=600' },
    { id: 2, name: 'Innova Zenix Hybrid', brand: 'Toyota', price: 850000, type: 'AT', seats: 7, category: 'PREMIUM', image: 'https://images.unsplash.com/photo-1620067677840-7ac53577d2ec?w=600' },
    { id: 3, name: 'Hiace Commuter (2022)', brand: 'Toyota', price: 1100000, type: 'MT', seats: 15, category: 'ROMBONGAN', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600' }
  ];

  const mockBlogs = [
    { id: 1, title: 'Panduan Lengkap Liburan ke Bali 2026: Rekomendasi Rute & Biaya', excerpt: 'Bali selalu punya cerita baru. Temukan beach club terbaru dan itinerary 4H3M.', date: '12 Nov 2026', readTime: '8 Min', category: 'Panduan Wisata', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600' },
    { id: 2, title: '5 Resort dengan Pemandangan Laut Terbaik di Nusa Penida', excerpt: 'Rekomendasi penginapan mewah untuk pengalaman bulan madu tak terlupakan.', date: '05 Okt 2026', readTime: '6 Min', category: 'Akomodasi', image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
      {/* Search Result Summary Header */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-8 pb-0 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Hasil pencarian untuk kata kunci:</p>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                &quot;{query}&quot; <span className="text-indigo-600 text-lg font-bold ml-2">(124 Hasil)</span>
              </h1>
           </div>

           <div className="flex overflow-x-auto hide-scrollbar gap-2">
              {[
                { id: 'all', name: 'Semua Kategori', count: 124 },
                { id: 'tour', name: 'Paket Tour', count: 85 },
                { id: 'car', name: 'Rental Mobil', count: 24 },
                { id: 'blog', name: 'Artikel & Panduan', count: 15 }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-6 py-4 transition-all duration-300 whitespace-nowrap text-[10px] font-black uppercase tracking-widest ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  {tab.name}
                  <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-black ${activeTab === tab.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{tab.count}</span>
                  {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full"></div>}
                </button>
              ))}
           </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
         
         {/* Destination Hit */}
         {(activeTab === 'all' || activeTab === 'dest') && (
           <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div> Destinasi Terkait
              </h2>
              <Link href={`/destinations/${query.toLowerCase()}`} className="group block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-5 -mr-32 -mt-32"></div>
                 <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-64 h-44 rounded-3xl overflow-hidden shadow-lg flex-shrink-0">
                       <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Bali" />
                    </div>
                    <div className="flex-1 text-center md:text-left space-y-4">
                       <div className="flex items-center justify-center md:justify-start gap-2">
                          <img src="https://flagcdn.com/w20/id.png" alt="ID" className="w-4 rounded-sm shadow-sm" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Indonesia</span>
                       </div>
                       <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase group-hover:text-indigo-600 transition-colors">Bali (Pulau Dewata)</h3>
                       <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-widest line-clamp-2 md:max-w-2xl">
                          Pulau surgawi dengan perpaduan budaya Hindu yang kental, pantai pasir putih yang indah, serta beach club berstandar internasional. Cocok untuk semua jenis wisatawan.
                       </p>
                       <div className="inline-flex items-center gap-3 text-indigo-600 text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                          Jelajahi Destinasi {query} <i className="fa-solid fa-arrow-right"></i>
                       </div>
                    </div>
                 </div>
              </Link>
           </section>
         )}

         {/* Tours Section */}
         {(activeTab === 'all' || activeTab === 'tour') && (
           <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <div className="flex justify-between items-end mb-8">
                 <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Paket Tour
                 </h2>
                 <Link href="/tours" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Lihat Semua (85)</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {mockTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                 ))}
              </div>
           </section>
         )}

         {/* Cars Section */}
         {(activeTab === 'all' || activeTab === 'car') && (
           <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <div className="flex justify-between items-end mb-8">
                 <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Rental Mobil
                 </h2>
                 <Link href="/rental" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Lihat Semua (24)</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                 {mockCars.map((car) => (
                    <div key={car.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group">
                       <div className="h-44 bg-slate-50 dark:bg-slate-800 relative flex items-center justify-center p-6">
                          <img src={car.image} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-700" alt={car.name} />
                          <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur text-indigo-600 text-[8px] font-black uppercase rounded-lg shadow-sm border border-slate-100">{car.category}</span>
                       </div>
                       <div className="p-6 space-y-4">
                          <div>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{car.brand}</p>
                             <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1">{car.name}</h3>
                          </div>
                          <div className="flex gap-2">
                             <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-[9px] font-black text-slate-500 uppercase flex items-center gap-1.5"><i className="fa-solid fa-gears text-indigo-600"></i> {car.type}</div>
                             <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-[9px] font-black text-slate-500 uppercase flex items-center gap-1.5"><i className="fa-solid fa-users text-indigo-600"></i> {car.seats} Seats</div>
                          </div>
                          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                             <div>
                                {car.oldPrice && <p className="text-[9px] text-slate-400 line-through">Rp {car.oldPrice.toLocaleString('id-ID')}</p>}
                                <p className="text-base font-black text-indigo-600 tracking-tight">Rp {(car.price/1000).toLocaleString('id-ID')}K <span className="text-[9px] text-slate-400">/hari</span></p>
                             </div>
                             <button className="px-5 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-all">Pilih</button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </section>
         )}

         {/* Blog Section */}
         {(activeTab === 'all' || activeTab === 'blog') && (
           <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 pb-10">
              <div className="flex justify-between items-end mb-8">
                 <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Artikel & Panduan
                 </h2>
                 <Link href="/blog" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Lihat Semua (15)</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {mockBlogs.map((blog) => (
                    <Link href={`/blog/${blog.id}`} key={blog.id} className="group flex gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-5 hover:shadow-2xl transition-all duration-500">
                       <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden shadow-md shrink-0">
                          <img src={blog.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={blog.title} />
                       </div>
                       <div className="flex flex-col justify-center space-y-3 min-w-0">
                          <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{blog.category}</span>
                          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">{blog.title}</h3>
                          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-widest line-clamp-2">{blog.excerpt}</p>
                          <div className="pt-2 flex items-center gap-4 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                             <span className="flex items-center gap-1.5"><i className="fa-regular fa-calendar"></i> {blog.date}</span>
                             <span className="flex items-center gap-1.5"><i className="fa-regular fa-clock"></i> {blog.readTime}</span>
                          </div>
                       </div>
                    </Link>
                 ))}
              </div>
           </section>
         )}

      </main>
    </div>
  );
}
