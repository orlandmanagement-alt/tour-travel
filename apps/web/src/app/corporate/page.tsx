'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CorporatePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1600" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" alt="Corporate" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-4 rounded-full bg-white/10 border border-white/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              Enterprise Solutions
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-widest leading-[1.1] mb-6 uppercase">
              Corporate <span className="text-brand-accent">Outing</span> & MICE.
            </h1>
            <p className="text-lg text-slate-300 font-bold italic mb-10 leading-relaxed max-w-2xl">
              Tingkatkan produktivitas dan keakraban tim Anda melalui pengalaman perjalanan perusahaan yang dirancang khusus oleh travel architect profesional.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#rfq-form" className="px-10 py-5 bg-brand-primary hover:bg-brand-primary/90 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl shadow-2xl shadow-brand-primary/40 transition-all hover:scale-105 active:scale-95">
                Dapatkan Proposal Gratis
              </a>
              <button className="px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl backdrop-blur-md transition-all">
                Lihat Portofolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Clients */}
      <div className="py-10 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-6">
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Dipercaya oleh 500+ Perusahaan & Instansi</p>
        </div>
        <div className="flex gap-12 whitespace-nowrap animate-marquee px-4 group">
          {[1, 2].map((group) => (
            <div key={group} className="flex gap-16 items-center">
               {['GOOGLE', 'MICROSOFT', 'AWS', 'STRIPE', 'SPACE X', 'TOYOTA', 'NETFLIX'].map(client => (
                 <span key={client} className="text-2xl font-black text-slate-200 dark:text-slate-700 uppercase tracking-tighter hover:text-brand-primary transition-colors cursor-default">
                    {client}
                 </span>
               ))}
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Dedicated Manager', icon: 'fa-solid fa-user-tie', color: 'text-brand-primary', desc: 'Satu kontak khusus untuk perusahaan Anda, dari perencanaan hingga eksekusi lapangan 24/7.' },
              { title: 'Tax & Invoicing', icon: 'fa-solid fa-file-invoice-dollar', color: 'text-brand-accent', desc: 'Sistem pembayaran fleksibel dan administrasi legal lengkap. PKP siap menerbitkan Faktur Pajak.' },
              { title: 'Custom Itinerary', icon: 'fa-solid fa-wand-magic-sparkles', color: 'text-emerald-500', desc: '100% custom jadwal, kelas hotel, menu makanan, hingga agenda rapat atau gala dinner khusus.' }
            ].map((f, i) => (
              <div key={i} className="group p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 hover:border-brand-primary transition-all duration-500 hover:shadow-2xl">
                 <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-slate-700 flex items-center justify-center text-2xl shadow-xl mb-8 group-hover:scale-110 transition-transform ${f.color}`}>
                    <i className={f.icon}></i>
                 </div>
                 <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">{f.title}</h3>
                 <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold italic leading-relaxed uppercase tracking-tight">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RFQ Form Section */}
      <section id="rfq-form" className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-slate-900 dark:bg-black rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-white/5">
             <div className="lg:w-5/12 p-12 sm:p-16 bg-brand-primary text-white relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                   <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-6">Konsultasi Bisnis</h2>
                   <p className="text-sm font-bold italic text-white/80 mb-12 leading-relaxed">Isi formulir untuk mendapatkan proposal khusus. Travel architect kami akan menghubungi Anda dalam 1x24 jam.</p>
                   
                   <div className="space-y-8">
                      <div className="flex items-center gap-5">
                         <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl"><i className="fa-solid fa-phone-volume"></i></div>
                         <div>
                            <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">WhatsApp B2B</p>
                            <p className="font-black text-lg">+62 811-999-888</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-5">
                         <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl"><i className="fa-solid fa-envelope-open-text"></i></div>
                         <div>
                            <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">Email Corporate</p>
                            <p className="font-black text-lg">corporate@nusatrip.com</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="lg:w-7/12 p-10 sm:p-16 bg-white dark:bg-slate-900">
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-10">Formulir Permintaan Proposal</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Perusahaan*</label>
                         <input required type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary" placeholder="PT Maju Bersama" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama PIC*</label>
                         <input required type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary" placeholder="Nama Anda" />
                      </div>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Bisnis*</label>
                         <input required type="email" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary" placeholder="pic@company.com" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No. WhatsApp*</label>
                         <input required type="tel" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary" placeholder="0812xxxx" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Detail Kebutuhan*</label>
                      <textarea required className="w-full h-32 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-5 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary resize-none" placeholder="Ceritakan agenda outing perusahaan Anda..."></textarea>
                   </div>

                   <button type="submit" className="w-full py-5 bg-brand-primary text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">
                      Kirim Permintaan Proposal
                   </button>
                   
                   {submitted && (
                     <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 p-4 rounded-xl text-emerald-600 dark:text-emerald-400 text-[10px] font-black text-center uppercase tracking-widest">
                        Sukses! Permintaan Anda telah diterima.
                     </div>
                   )}
                </form>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
