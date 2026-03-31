'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function TourDetailPage({ params }: { params: { id: string } }) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);
  const [pax, setPax] = useState(2);
  const basePrice = 1250000;

  const getPricePerPax = (p: number) => {
    if (p >= 4) return 1000000;
    if (p >= 3) return 1100000;
    if (p === 1) return 2200000;
    return basePrice;
  };

  const currentPrice = getPricePerPax(pax);
  const total = currentPrice * pax;
  
  const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(total);
  const formattedUnitPrice = new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0 }).format(currentPrice).replace('Rp', '');

  const timelines = [
    { time: '00:00 - 03:00 WIB', title: 'Penjemputan & Perjalanan ke Bromo', desc: 'Tim kami akan menjemput Anda di lokasi yang telah disepakati di area Malang atau Surabaya. Perjalanan malam menuju area transit di Sukapura memakan waktu sekitar 2 jam.', color: 'text-brand-600', dot: 'bg-brand-500' },
    { time: '03:00 - 06:00 WIB', title: 'Menyaksikan Golden Sunrise Bromo', desc: 'Setibanya di sana, kita akan menanjak membelah lautan pasir dalam gelap menuju titik pandang Penanjakan 1 untuk menikmati matahari terbit.', color: 'text-brand-600', dot: 'bg-brand-500' },
    { time: '06:00 - 09:30 WIB', title: 'Eksplorasi Kawah Bromo & Area Taman Nasional', desc: 'Jeep membawa Anda turun ke Lautan Pasir, berjalan kaki menuju Kawah Bromo, dilanjutkan Pasir Berbisik dan Bukit Teletubbies.', color: 'text-brand-600', dot: 'bg-brand-500' },
    { time: '10:30 - 13:00 WIB', title: 'Trekking Air Terjun Madakaripura', desc: 'Mengunjungi Air Terjun Madakaripura dengan ojek lokal dan trekking pendek. Bawa jas hujan/baju ganti.', color: 'text-accent-600', dot: 'bg-accent-500' }
  ];

  return (
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 font-sans bg-[#f8fafc]">
        
        <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
                <span className="bg-accent-100 text-accent-600 border border-accent-200 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">PRIVATE TOUR</span>
                <span className="bg-brand-100 text-brand-600 border border-brand-200 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm"><i className="fa-solid fa-bolt mr-1"></i>INSTANT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
                Private Tour Bromo Midnight & Air Terjun Madakaripura
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-slate-600">
                <div className="flex items-center gap-1 text-slate-700">
                    <i className="fa-solid fa-star text-yellow-400"></i>
                    <span className="font-bold text-slate-900">4.9</span> (128 Ulasan)
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1.5"><i className="fa-solid fa-location-dot text-brand-500"></i> Start Malang/SBY</div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1.5"><i className="fa-regular fa-clock text-brand-500"></i> 1 Hari</div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 group cursor-pointer">
            <div className="md:col-span-3 h-full w-full relative">
                <img src="https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=1200" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Bromo" />
            </div>
            <div className="hidden md:flex flex-col gap-2 h-full w-full">
                <div className="h-1/2 w-full relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1518090597335-e6f7783ee855?w=600" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Jeep" />
                </div>
                <div className="h-1/2 w-full relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=600" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="MDK" />
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center hover:bg-slate-900/60 transition-colors"><span className="text-white font-bold text-sm">+12 Foto Lainnya</span></div>
                </div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative">
            <div className="flex-1 w-full min-w-0 pb-10">
                <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 mb-8">
                    <h3 className="font-bold text-brand-900 text-sm mb-3">Highlights Perjalanan:</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-slate-700 font-medium">
                        <li><i className="fa-solid fa-check text-brand-500 mb-1 w-5"></i> Golden Sunrise Penanjakan 1</li>
                        <li><i className="fa-solid fa-check text-brand-500 mb-1 w-5"></i> Jeep 4WD Hardtop Adventure</li>
                        <li><i className="fa-solid fa-check text-brand-500 mb-1 w-5"></i> Kawah Bromo & Sabana</li>
                        <li><i className="fa-solid fa-check text-brand-500 mb-1 w-5"></i> Trekking Madakaripura</li>
                    </ul>
                </div>

                <section className="mb-10">
                    <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-200">Deskripsi Tour</h2>
                    <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                        <p>Nikmati pengalaman tak terlupakan menjelajahi keajaiban alam Jawa Timur dengan <strong>Private Tour Bromo Midnight</strong>. Perjalanan akan dimulai pada tengah malam menuju titik tertinggi di Penanjakan untuk menyaksikan keindahan Golden Sunrise. Dilanjutkan menuju Air Terjun Madakaripura, air terjun tertinggi di Pulau Jawa.</p>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-200">Rencana Perjalanan (Itinerary)</h2>
                    <div className="space-y-3 relative before:absolute before:inset-y-0 before:left-[15px] before:w-0.5 before:bg-slate-200 pl-8 ml-2">
                        {timelines.map((it, i) => (
                          <div key={i} className="relative">
                              <div className={`absolute w-4 h-4 ${it.dot} rounded-full border-4 border-white -left-[39px] top-1.5 shadow`}></div>
                              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-brand-300">
                                  <button className="w-full text-left p-4 flex justify-between items-center" onClick={() => setOpenAccordion(openAccordion === i ? null : i)}>
                                      <div>
                                          <div className={`text-[10px] font-bold ${it.color} mb-0.5`}>{it.time}</div>
                                          <h4 className="font-bold text-slate-800 text-sm">{it.title}</h4>
                                      </div>
                                      <i className={`fa-solid fa-chevron-down text-sm transition-transform ${openAccordion === i ? 'rotate-180' : ''}`}></i>
                                  </button>
                                  {openAccordion === i && (
                                    <div className="bg-slate-50 border-t border-slate-100 p-4 text-xs text-slate-600 leading-relaxed animate-in fade-in zoom-in-95 duration-200">
                                        {it.desc}
                                    </div>
                                  )}
                              </div>
                          </div>
                        ))}
                    </div>
                </section>
            </div>

            <aside className="w-full lg:w-[360px] flex-shrink-0">
                <div className="sticky top-20 bg-white border border-slate-200 rounded-2xl shadow-xl p-5 sm:p-6 mb-8">
                    <div className="mb-5 pb-5 border-b border-slate-100">
                        <p className="text-slate-400 text-sm line-through">Rp 1.500.000</p>
                        <div className="flex items-end gap-1">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-600 leading-none">Rp {formattedUnitPrice}</h2>
                            <span className="text-xs font-medium text-slate-500 mb-1">/ pax</span>
                        </div>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Tanggal Trip</label>
                            <input type="date" className="w-full bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-brand-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Area Jemput</label>
                            <select className="w-full bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-brand-500">
                                <option>Malang / Batu</option>
                                <option>Surabaya (+300rb)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Jumlah Peserta</label>
                            <div className="flex items-center justify-between border border-slate-200 rounded-lg p-1 bg-slate-50">
                                <button type="button" onClick={() => setPax(Math.max(1, pax - 1))} className="w-10 h-10 rounded text-slate-500 hover:text-brand-600 font-bold bg-white shadow-sm border border-slate-200">-</button>
                                <div className="font-extrabold text-lg text-slate-800">{pax}</div>
                                <button type="button" onClick={() => setPax(Math.min(10, pax + 1))} className="w-10 h-10 rounded text-slate-500 hover:text-brand-600 font-bold bg-white shadow-sm border border-slate-200">+</button>
                            </div>
                        </div>

                        <div className="bg-slate-100 p-3 rounded-lg flex justify-between items-center mt-2">
                            <span className="text-xs font-bold text-slate-600">Total:</span>
                            <span className="text-lg font-extrabold text-slate-900">{formattedTotal}</span>
                        </div>

                        <Link href={`/checkout?tourId=${params.id}&pax=${pax}`} className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-xl flex justify-center items-center gap-2 shadow-lg shadow-brand-500/30">
                            Pesan Sekarang <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </form>
                </div>
            </aside>
        </div>
    </main>
  );
}