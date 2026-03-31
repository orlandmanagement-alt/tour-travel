'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

export default function RentalDetailPage({ params }: { params: { id: string } }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [serviceType, setServiceType] = useState('driver');
  const [activeAcc, setActiveAcc] = useState<string | null>('tc-1');

  const basePrice = 850000;
  const serviceFees: Record<string, number> = {
    driver: 150000,
    self: 0,
    allin: 350000
  };

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const diffDays = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff <= 0 ? 1 : diff;
  }, [startDate, endDate]);

  const totalPrice = useMemo(() => {
    const fee = serviceFees[serviceType] || 0;
    return (basePrice + fee) * diffDays;
  }, [serviceType, diffDays]);

  const toggleAccordion = (id: string) => {
    setActiveAcc(activeAcc === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs & Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
           <nav className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
              <ol className="flex items-center gap-2">
                 <li><Link href="/" className="hover:text-indigo-600 transition-colors">Beranda</Link></li>
                 <li><i className="fa-solid fa-chevron-right text-[8px] opacity-40"></i></li>
                 <li><Link href="/rental" className="hover:text-indigo-600 transition-colors">Rental Mobil</Link></li>
                 <li><i className="fa-solid fa-chevron-right text-[8px] opacity-40"></i></li>
                 <li className="text-slate-900 dark:text-white">Toyota Innova Zenix</li>
              </ol>
           </nav>
           <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-indigo-600 px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
                 <i className="fa-solid fa-share-nodes"></i> Bagikan
              </button>
              <button className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-red-500 px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
                 <i className="fa-regular fa-heart"></i> Simpan
              </button>
           </div>
        </div>

        {/* Title & Badges */}
        <div className="mb-10 space-y-4">
           <div className="flex flex-wrap gap-2">
              <span className="bg-indigo-600 text-white text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-lg shadow-indigo-500/20">Nyaman & Irit</span>
              <span className="bg-orange-500 text-white text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-lg shadow-orange-500/20">Bisa Lepas Kunci</span>
              <span className="bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-lg shadow-emerald-500/20">Instant Confirm</span>
           </div>
           <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight uppercase max-w-4xl">
              Toyota Innova Zenix Hybrid <span className="text-indigo-600">(2024)</span>
           </h1>
           <div className="flex flex-wrap items-center gap-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                 <i className="fa-solid fa-star text-yellow-400"></i>
                 <span>5.0</span>
                 <span className="opacity-40 italic underline font-bold cursor-pointer hover:text-indigo-600">(342 Sewa)</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <div className="flex items-center gap-2">
                 <i className="fa-solid fa-location-dot text-indigo-600"></i> Pool Malang / Surabaya
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <div className="flex items-center gap-2">
                 <i className="fa-solid fa-car text-indigo-600"></i> SUV/MPV PREMIUM
              </div>
           </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[400px] sm:h-[500px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl relative group bg-white dark:bg-slate-900 p-2 sm:p-4">
           <div className="lg:col-span-3 h-full rounded-[2.5rem] overflow-hidden relative border border-slate-100 dark:border-slate-800">
              <img src="https://images.unsplash.com/photo-1620067677840-7ac53577d2ec?w=1200" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000 mix-blend-multiply dark:mix-blend-normal" alt="Main" />
           </div>
           <div className="hidden lg:flex flex-col gap-4 h-full">
              <div className="h-1/2 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800">
                 <img src="https://images.unsplash.com/photo-1549317336-206569e8475c?w=600" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Int" />
              </div>
              <div className="h-1/2 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 relative">
                 <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Back" />
                 <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white text-xs font-black uppercase tracking-widest pointer-events-none">
                    +5 Foto
                 </div>
              </div>
           </div>
        </div>

        {/* Main Content & Booking Sidebar */}
        <div className="flex flex-col lg:flex-row gap-12 relative">
           
           <div className="flex-1 w-full min-w-0 space-y-12">
              {/* Specs Grid */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 sm:p-10 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8">
                 {[
                   { icon: 'fa-users', label: 'Kapasitas', val: '7 Pax' },
                   { icon: 'fa-gears', label: 'Transmisi', val: 'Automatic' },
                   { icon: 'fa-gas-pump', label: 'Fuel', val: 'Hybrid' },
                   { icon: 'fa-suitcase', label: 'Bagasi', val: '3 Koper' }
                 ].map((spec, i) => (
                   <div key={i} className="text-center space-y-2">
                      <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-2xl flex items-center justify-center text-xl mx-auto mb-2 shadow-sm">
                         <i className={`fa-solid ${spec.icon}`}></i>
                      </div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{spec.label}</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight uppercase">{spec.val}</p>
                   </div>
                 ))}
              </div>

              {/* Description */}
              <section className="space-y-6">
                 <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight border-l-4 border-indigo-600 pl-4">Tentang Mobil Ini</h2>
                 <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] leading-[1.8] space-y-6">
                    <p>Nikmati perjalanan premium dan efisien dengan <strong className="text-slate-900 dark:text-white">Toyota Innova Zenix Hybrid 2024</strong>. Generasi terbaru dari legenda mobil keluarga Indonesia ini kini hadir dengan mesin hybrid yang sangat irit bahan bakar, kabin yang jauh lebih senyap, dan kenyamanan ekstra berkat sasis monokok baru.</p>
                    <p>Mobil ini sangat ideal untuk perjalanan bisnis, liburan keluarga jarak jauh, atau VIP transfer. Dilengkapi dengan <em className="text-indigo-600">Captain Seat</em>, panoramic sunroof, dan sistem keamanan Toyota Safety Sense (TSS) untuk menjamin perjalanan Anda aman dan nyaman.</p>
                 </div>
              </section>

              {/* Ketentuan Layanan */}
              <section className="space-y-8">
                 <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight border-l-4 border-indigo-600 pl-4">Opsi Layanan Sewa</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* With Driver */}
                    <div className="bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-500/20 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-5 text-4xl text-indigo-600"><i className="fa-solid fa-user-tie"></i></div>
                       <h3 className="text-base font-black text-indigo-600 uppercase tracking-tight mb-6">Dengan Supir</h3>
                       <ul className="space-y-4">
                          {[
                            'Durasi sewa 12 Jam atau Full Day.',
                            'Harga belum termasuk BBM, Tol, dan Parkir.',
                            'Makan supir fleksibel (atau +Rp 50k).',
                            'Rute maksimal batas provinsi (Jawa Timur).'
                          ].map((text, i) => (
                            <li key={i} className="flex gap-4 text-[11px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                               <i className="fa-solid fa-check text-emerald-500 mt-0.5"></i> {text}
                            </li>
                          ))}
                       </ul>
                    </div>
                    {/* Self Drive */}
                    <div className="bg-white dark:bg-slate-900 border border-orange-100 dark:border-orange-500/20 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-5 text-4xl text-orange-500"><i className="fa-solid fa-key"></i></div>
                       <h3 className="text-base font-black text-orange-600 uppercase tracking-tight mb-6">Lepas Kunci</h3>
                       <ul className="space-y-4">
                          {[
                            'Durasi sewa per 24 Jam.',
                            'Wajib KTP asli dan Jaminan Kendaraan.',
                            'Verifikasi dokumen dilakukan H-1.',
                            'Overtime 10% per jam dari harga sewa.'
                          ].map((text, i) => (
                            <li key={i} className="flex gap-4 text-[11px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                               <i className="fa-solid fa-lock text-orange-500 mt-0.5"></i> {text}
                            </li>
                          ))}
                       </ul>
                    </div>
                 </div>
              </section>

              {/* T&C Accordion */}
              <section className="space-y-6 pb-20">
                 <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight border-l-4 border-indigo-600 pl-4">Syarat & Ketentuan</h2>
                 <div className="space-y-4">
                    {[
                      { id: 'tc-1', title: 'Persyaratan Dokumen Lepas Kunci', content: 'Memiliki SIM A aktif, e-KTP asli (dijaminkan), Kartu Keluarga asli, dan Tiket pesawat/kereta return (bagi wisatawan). Bersedia difoto bersama kendaraan saat serah terima.' },
                      { id: 'tc-2', title: 'Ketentuan Penggunaan & Kerusakan', content: 'Dilarang menggunakan kendaraan untuk tindak kejahatan atau off-road ekstrim. Kerusakan akibat kelalaian (ban bocor, lecet, dll) sepenuhnya menjadi tanggung jawab penyewa.' }
                    ].map((item) => (
                      <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                         <button 
                           onClick={() => toggleAccordion(item.id)}
                           className="w-full text-left p-6 sm:p-8 flex justify-between items-center group cursor-pointer"
                         >
                            <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest group-hover:text-indigo-600 transition-all">{item.title}</h4>
                            <i className={`fa-solid fa-chevron-down text-xs text-slate-400 transition-transform duration-300 ${activeAcc === item.id ? 'rotate-180' : ''}`}></i>
                         </button>
                         <div className={`transition-all duration-500 ease-in-out px-8 pb-8 ${activeAcc === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] leading-relaxed border-t border-slate-50 dark:border-slate-800 pt-6">
                               {item.content}
                            </p>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>
           </div>

           {/* Sticky Booking Sidebar */}
           <aside className="w-full lg:w-[420px] flex-shrink-0">
              <div className="sticky top-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3.5rem] shadow-2xl p-8 sm:p-10 space-y-8 animate-in slide-in-from-right-8 duration-700">
                 <div className="pb-8 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-end mb-2">
                       <p className="text-slate-400 text-sm font-bold line-through uppercase italic">Rp 950.000</p>
                       <span className="bg-red-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-red-500/20">Hemat 15%</span>
                    </div>
                    <div className="flex items-end gap-2">
                       <h2 className="text-4xl font-black text-indigo-600 tracking-tighter">Rp {(basePrice/1000).toLocaleString('id-ID')}K</h2>
                       <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 whitespace-nowrap">/ Hari</span>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Tgl Ambil</label>
                          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-xs font-black text-slate-800 dark:text-white focus:ring-4 focus:ring-indigo-600/10 transition-all outline-none" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Tgl Balik</label>
                          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-xs font-black text-slate-800 dark:text-white focus:ring-4 focus:ring-indigo-600/10 transition-all outline-none" />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Layanan</label>
                       <div className="relative">
                          <select 
                            value={serviceType} 
                            onChange={(e) => setServiceType(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-12 py-4 text-xs font-black text-slate-800 dark:text-white focus:ring-4 focus:ring-indigo-600/10 transition-all outline-none appearance-none"
                          >
                             <option value="driver">Dengan Supir (+Rp 150k)</option>
                             <option value="self">Lepas Kunci (Rp 0)</option>
                             <option value="allin">Supir + BBM All-in (+Rp 350k)</option>
                          </select>
                          <i className="fa-solid fa-user-tie absolute left-5 top-1/2 -translate-y-1/2 text-indigo-600"></i>
                          <i className="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 text-[10px]"></i>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Lokasi Jemput</label>
                       <div className="relative">
                          <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-12 py-4 text-xs font-black text-slate-800 dark:text-white focus:ring-4 focus:ring-indigo-600/10 transition-all outline-none appearance-none">
                             <option>Pool NusaTrip Malang (Gratis)</option>
                             <option>Hotel Area Malang/Batu (Gratis)</option>
                             <option>Bandara Malang (+Rp 50k)</option>
                             <option>Bandara Juanda (+Rp 300k)</option>
                          </select>
                          <i className="fa-solid fa-map-pin absolute left-5 top-1/2 -translate-y-1/2 text-indigo-600"></i>
                          <i className="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 text-[10px]"></i>
                       </div>
                    </div>
                 </div>

                 <div className="p-6 bg-indigo-50 dark:bg-indigo-500/10 rounded-3xl border border-indigo-100 dark:border-indigo-500/20 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Estimasi ({diffDays} Hari):</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">Rp {(totalPrice/1000).toLocaleString('id-ID')}K</span>
                 </div>

                 <div className="space-y-4 pt-4">
                    <Link href="/checkout" className="block w-full py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl shadow-indigo-500/30 text-center hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95">
                       Lanjut Booking <i className="fa-solid fa-arrow-right ml-2"></i>
                    </Link>
                    <button className="w-full py-4 bg-white dark:bg-slate-800 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] flex items-center justify-center gap-3 transition-all hover:bg-emerald-50 dark:hover:bg-emerald-500/10">
                       <i className="fa-brands fa-whatsapp text-lg"></i> Cek Stok
                    </button>
                 </div>
              </div>
           </aside>
        </div>

      </div>
    </div>
  );
}
