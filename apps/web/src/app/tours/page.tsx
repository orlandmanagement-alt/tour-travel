'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function TourCatalogPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  
  const tourData = [
    { id: 1, img: "https://images.unsplash.com/photo-1542898939-5e5f385c5dfa", type: "PRIVATE", tagColor: "text-accent-600 bg-white/95", duration: "3D2N", location: "Start Malang / SBY", title: "Private Tour Bromo Midnight & Madakaripura", rating: "4.9", reviews: "128", oldPrice: "Rp 1.500.000", newPrice: "1.250", unit: "k/pax", hotel: "Hotel Bintang 3" },
    { id: 2, img: "https://images.unsplash.com/photo-1517441865-c32f8313bd8a", type: "OPEN TRIP", tagColor: "text-brand-600 bg-white/95", duration: "1 Hari", location: "Start Banyuwangi", title: "Open Trip Kawah Ijen Blue Fire Experience", rating: "4.8", reviews: "85", oldPrice: "", newPrice: "350", unit: "k/pax", hotel: "Tanpa Penginapan" },
    { id: 3, img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5", type: "HONEYMOON", tagColor: "text-pink-500 bg-white/95", duration: "3D2N", location: "Start Malang", title: "Romantic Escape Malang & Batu City Tour", rating: "5.0", reviews: "42", oldPrice: "Rp 5.000.000", newPrice: "4.500", unit: "k/cpl", hotel: "Hotel Bintang 4" },
    { id: 4, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4", type: "FAMILY", tagColor: "text-emerald-600 bg-white/95", duration: "4D3N", location: "Start Bali", title: "Bali Explorer Family Fun Trip Custom", rating: "4.9", reviews: "210", oldPrice: "", newPrice: "1.100", unit: "k/pax", hotel: "Hotel Bintang 3" },
    { id: 5, img: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272", type: "OPEN TRIP", tagColor: "text-brand-600 bg-white/95", duration: "3D2N", location: "Start Lombok", title: "Explore Gili Trawangan & Lombok Selatan", rating: "4.7", reviews: "95", oldPrice: "Rp 2.100.000", newPrice: "1.850", unit: "k/pax", hotel: "Hotel Bintang 3" },
    { id: 6, img: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b", type: "ADVENTURE", tagColor: "text-yellow-600 bg-white/95", duration: "4D3N", location: "Start Sembalun", title: "Pendakian Gunung Rinjani & Danau Segara Anak", rating: "4.9", reviews: "305", oldPrice: "", newPrice: "2.400", unit: "k/pax", hotel: "Tenda Camping" }
  ];

  const simulateFilter = () => {
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 800);
  };

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex flex-col lg:flex-row gap-6 lg:gap-8 pb-12 font-sans">
        {/* SIDEBAR FILTER */}
        <aside className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0">
            <button className="lg:hidden w-full bg-white border border-slate-200 text-brand-900 font-bold py-3 rounded-xl shadow-sm mb-4 flex justify-between items-center px-4" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <span><i className="fa-solid fa-sliders text-brand-600 mr-2"></i> Filter Pencarian</span>
                <i className={`fa-solid fa-chevron-${isFilterOpen ? 'up' : 'down'}`}></i>
            </button>

            <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block sticky top-24 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-max flex flex-col`}>
                <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center bg-brand-50/50">
                    <h2 className="font-extrabold text-brand-900 text-base"><i className="fa-solid fa-filter text-brand-600 mr-1.5"></i> Filter Paket</h2>
                    <button onClick={simulateFilter} className="text-[11px] font-bold text-slate-400 hover:text-red-500 transition-colors"><i className="fa-solid fa-rotate-right mr-1"></i>Reset</button>
                </div>

                <div className="p-4 sm:p-5 overflow-y-auto max-h-[70vh] custom-scrollbar flex flex-col gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Nama Destinasi / Paket</label>
                        <div className="relative group">
                            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors text-sm"></i>
                            <input type="text" placeholder="Cari Bromo, Bali..." className="w-full bg-slate-50 border border-slate-200 text-sm rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium" />
                        </div>
                    </div>

                    <div className="border-t border-slate-100 pt-5">
                        <label className="block text-xs font-bold text-slate-700 mb-3">Rentang Harga (Rp)</label>
                        <div className="flex items-center gap-2">
                            <div className="relative w-full">
                                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[10px] text-slate-400 font-bold">MIN</span>
                                <input type="number" placeholder="0" className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg pl-8 pr-2 py-2 focus:outline-none focus:border-brand-500 font-medium text-right" />
                            </div>
                            <span className="text-slate-300">-</span>
                            <div className="relative w-full">
                                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[10px] text-slate-400 font-bold">MAX</span>
                                <input type="number" placeholder="2.000.000" className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg pl-8 pr-2 py-2 focus:outline-none focus:border-brand-500 font-medium text-right" />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 pt-5">
                        <label className="block text-xs font-bold text-slate-700 mb-3">Tipe Paket Tour</label>
                        <div className="space-y-2.5">
                            {['Private Tour (45)', 'Open Trip (12)', 'Honeymoon (8)', 'Corporate (24)'].map((l, i) => (
                              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 transition-all" defaultChecked={i<2} />
                                  <span className="text-sm font-medium text-slate-600 group-hover:text-brand-600">{l.split(' (')[0]} <span className="text-[10px] text-slate-400 ml-1">({l.split(' (')[1]}</span></span>
                              </label>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="p-4 border-t border-slate-100 bg-white">
                    <button onClick={simulateFilter} className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-lg shadow-md transition-colors flex items-center justify-center gap-2">
                        {isFiltering ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <span>Terapkan Filter</span>}
                    </button>
                </div>
            </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 w-full relative">
            <div className="mb-5 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight">Eksplorasi Nusantara</h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">Menampilkan <span className="text-brand-600 font-bold">120</span> paket tour terbaik.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Urutkan:</span>
                    <select className="bg-white border border-slate-200 text-brand-900 text-xs font-bold rounded-lg pl-3 pr-8 py-2 focus:ring-brand-500 outline-none">
                        <option>Rekomendasi (Terbaik)</option>
                        <option>Harga: Terendah ke Tertinggi</option>
                        <option>Rating Tertinggi</option>
                    </select>
                </div>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 transition-opacity duration-300 ${isFiltering ? 'opacity-50' : 'opacity-100'}`}>
                {tourData.map(tour => (
                    <Link href={`/tours/${tour.id}`} key={tour.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-brand-300 group tour-card flex flex-col relative transform hover:-translate-y-1 transition-all">
                        <div className="absolute top-2 right-2 z-10 bg-slate-900/80 backdrop-blur text-white text-[9px] font-bold px-1.5 py-1 rounded shadow-sm flex items-center gap-1">
                            <i className="fa-regular fa-clock"></i> {tour.duration}
                        </div>
                        <div className="relative h-32 sm:h-40 overflow-hidden">
                            <img src={`${tour.img}?w=600&q=70`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={tour.title} />
                            <span className={`absolute top-2 left-2 ${tour.tagColor} text-[9px] font-bold px-2 py-1 rounded shadow-sm backdrop-blur`}>{tour.type}</span>
                            <div className="absolute inset-0 bg-brand-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                                <div className="w-8 h-8 rounded-full bg-white text-brand-600 flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"><i className="fa-solid fa-arrow-right -rotate-45"></i></div>
                            </div>
                        </div>
                        <div className="p-3 sm:p-4 flex flex-col flex-grow group-hover:bg-brand-50/20 transition-colors">
                            <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-500 mb-1 font-medium">
                                <i className="fa-solid fa-map-pin text-brand-500"></i> {tour.location}
                            </div>
                            <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 line-clamp-2 leading-snug group-hover:text-brand-600 transition-colors">{tour.title}</h3>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center gap-1">
                                    <i className="fa-solid fa-star text-[10px] text-yellow-400"></i>
                                    <span className="text-[10px] sm:text-xs font-bold text-slate-700">{tour.rating}</span>
                                    <span className="text-[9px] text-slate-400">({tour.reviews})</span>
                                </div>
                                <span className="text-slate-300 text-xs">•</span>
                                <span className="text-[9px] text-slate-500 truncate"><i className="fa-solid fa-bed text-slate-400 mr-1"></i>{tour.hotel}</span>
                            </div>
                            <div className="mt-auto pt-3 border-t border-slate-100 flex justify-between items-end">
                                <div>
                                    {tour.oldPrice ? (
                                      <>
                                        <p className="text-[9px] sm:text-[10px] text-slate-400 line-through">{tour.oldPrice}</p>
                                        <p className="text-accent-600 font-extrabold text-sm sm:text-base leading-none">Rp {tour.newPrice}<span className="text-[8px] sm:text-[10px] font-medium text-slate-500">{tour.unit}</span></p>
                                      </>
                                    ) : (
                                      <>
                                        <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">Mulai Dari</p>
                                        <p className="text-brand-600 font-extrabold text-sm sm:text-base leading-none">Rp {tour.newPrice}<span className="text-[8px] sm:text-[10px] font-medium text-slate-500">{tour.unit}</span></p>
                                      </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    </main>
  );
}