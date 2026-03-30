'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const faqData = [
  {
    id: 'pesanan',
    title: 'Pesanan Saya',
    icon: 'fa-solid fa-clipboard-list',
    color: 'bg-brand-primary/10 text-brand-primary',
    faqs: [
      { q: "Bagaimana cara mendapatkan E-Ticket setelah pembayaran?", a: "E-Ticket otomatis diterbitkan segera setelah sistem memverifikasi pembayaran Anda (1-5 menit). Anda dapat menemukannya di menu 'Pesanan Saya' pada Dashboard atau di inbox email Anda." },
      { q: "Apakah saya bisa memesan untuk orang lain?", a: "Ya, Anda bisa mengisi detail peserta dengan nama orang lain. Pastikan data KTP/Paspor yang dimasukkan akurat." },
      { q: "Dimana saya bisa melihat riwayat transaksi?", a: "Semua riwayat transaksi tersimpan rapi di Dashboard akun Anda pada tab 'Riwayat Pesanan'." }
    ]
  },
  {
    id: 'pembayaran',
    title: 'Pembayaran',
    icon: 'fa-solid fa-wallet',
    color: 'bg-emerald-100 text-emerald-600',
    faqs: [
      { q: "Metode pembayaran apa saja yang tersedia?", a: "Kami mendukung berbagai metode: Bank Transfer (BCA, Mandiri, BNI), Virtual Account, E-Wallet (OVO, Dana, GoPay), dan Kartu Kredit." },
      { q: "Saya salah mentransfer nominal, apa yang harus dilakukan?", a: "Segera hubungi CS via WhatsApp dengan melampirkan bukti transfer dan nomor invoice. Kami akan melakukan verifikasi manual dalam 1x24 jam." }
    ]
  },
  {
    id: 'refund',
    title: 'Refund & Ubah',
    icon: 'fa-solid fa-money-bill-transfer',
    color: 'bg-red-100 text-red-500',
    faqs: [
      { q: "Berapa lama proses pengembalian dana (Refund)?", a: "Proses refund biasanya memakan waktu 7-14 hari kerja tergantung kebijakan bank atau maskapai terkait." },
      { q: "Apakah bisa ganti jadwal (Reschedule)?", a: "Bisa, maksimal H-3 untuk domestik dan H-7 untuk internasional, subjek pada ketersediaan dan biaya penyesuaian vendor." }
    ]
  }
];

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* Hero Header */}
      <section className="bg-brand-primary pt-32 pb-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
           <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-6">Halo, Ada Yang Bisa <br/>Kami Bantu?</h1>
           <p className="text-white/70 font-bold italic mb-12">Temukan solusi cepat untuk kendala pemesanan, pembayaran, atau akun Anda.</p>
           
           {/* Big Search */}
           <div className="max-w-2xl mx-auto bg-white rounded-[2rem] p-2 flex items-center shadow-2xl relative group ring-offset-4 focus-within:ring-4 ring-white/20 transition-all">
              <i className="fa-solid fa-magnifying-glass text-slate-400 ml-6 mr-4 text-xl group-focus-within:text-brand-primary transition-colors"></i>
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ketik topik bantuan... (Cth: Cara refund, E-Tiket)" 
                className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 font-bold text-sm sm:text-base py-4"
              />
              <button className="bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest px-8 py-4 rounded-2xl hidden sm:block">Cari</button>
           </div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative z-20 -mt-20 max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {faqData.map(cat => (
          <a key={cat.id} href={`#${cat.id}`} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 text-center hover:-translate-y-2 hover:border-brand-primary transition-all duration-500 group">
             <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-current/10 group-hover:scale-110 transition-transform`}>
                <i className={cat.icon}></i>
             </div>
             <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">{cat.title}</h3>
          </a>
        ))}
        {/* Contact Support Tile */}
        <div className="bg-brand-accent rounded-[2.5rem] p-8 shadow-xl shadow-brand-accent/20 text-center flex flex-col items-center justify-center group cursor-pointer hover:-translate-y-2 transition-all duration-500">
           <i className="fa-solid fa-headset text-white text-3xl mb-3 group-hover:rotate-12 transition-transform"></i>
           <h3 className="text-sm font-black text-white uppercase tracking-tight">Hubungi Kami</h3>
        </div>
      </section>

      {/* FAQ Accordions */}
      <main className="max-w-4xl mx-auto px-6 pb-32">
        <div className="space-y-16">
          {faqData.map(section => (
            <div key={section.id} id={section.id} className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-2 h-8 rounded-full bg-brand-primary shadow-[0_0_15px_rgba(79,70,229,0.5)]`}></div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {section.faqs.map((faq, i) => {
                  const id = `${section.id}-${i}`;
                  const isOpen = openId === id;
                  return (
                    <div key={id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm transition-all hover:border-brand-primary/50">
                      <button 
                        onClick={() => toggle(id)}
                        className="w-full text-left p-6 sm:p-8 flex justify-between items-center group"
                      >
                         <span className={`text-sm sm:text-base font-black uppercase tracking-tight transition-colors ${isOpen ? 'text-brand-primary' : 'text-slate-700 dark:text-slate-300 group-hover:text-brand-primary'}`}>
                           {faq.q}
                         </span>
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isOpen ? 'bg-brand-primary text-white rotate-180' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
                           <i className="fa-solid fa-chevron-down text-xs"></i>
                         </div>
                      </button>
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-height-500' : 'max-h-0'}`}>
                        <div className="p-6 sm:p-8 pt-0 border-t border-slate-50 dark:border-slate-800">
                           <p className="text-sm text-slate-500 dark:text-slate-400 font-bold italic leading-relaxed pt-6">
                              {faq.a}
                           </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="mt-32 p-10 sm:p-16 bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-100 dark:border-slate-800 text-center shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl"></div>
           <div className="relative z-10">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Belum Menemukan Jawaban?</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold italic mb-10">Tim Customer Success kami siap melayani Anda 24/7 untuk respon tercepat.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <a href="#" className="px-10 py-5 bg-emerald-500 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2">
                    <i className="fa-brands fa-whatsapp text-lg"></i> WhatsApp
                 </a>
                 <a href="#" className="px-10 py-5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                    <i className="fa-regular fa-envelope text-lg"></i> Kirim Email
                 </a>
              </div>
           </div>
        </div>
      </main>
      
      <style jsx>{`
        .max-height-500 {
           max-height: 500px;
        }
      `}</style>
    </div>
  );
}
