'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BlogDetailClient({ params }: { params: { slug: string } }) {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollWidth(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans">
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-slate-100 dark:bg-slate-900">
         <div className="h-full bg-brand-primary shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-100" style={{ width: `${scrollWidth}%` }}></div>
      </div>

      {/* Hero Header */}
      <section className="pt-32 pb-16 border-b border-slate-50 dark:border-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <nav className="flex justify-center text-[10px] sm:text-xs text-slate-400 font-black uppercase tracking-widest mb-10" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-3">
                 <li><Link href="/blog" className="hover:text-brand-primary transition-colors">Blog</Link></li>
                 <li><i className="fa-solid fa-chevron-right text-[8px] opacity-30"></i></li>
                 <li><span className="text-slate-600 dark:text-slate-300">Panduan Destinasi</span></li>
                 <li><i className="fa-solid fa-chevron-right text-[8px] opacity-30"></i></li>
                 <li><span className="text-brand-primary">Bali</span></li>
              </ol>
           </nav>

           <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-10 leading-[1.1]">
              Panduan Lengkap Liburan ke Bali 2026: Rekomendasi Rute & Spot Tersembunyi
           </h1>

           <div className="flex flex-wrap items-center justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <div className="flex items-center gap-3">
                 <img src="https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff" className="w-10 h-10 rounded-xl" alt="Author" />
                 <span className="text-slate-900 dark:text-white">Tim Editorial NusaTrip</span>
              </div>
              <span className="flex items-center gap-2"><i className="fa-regular fa-calendar text-brand-primary italic"></i> 12 Nov 2026</span>
              <span className="flex items-center gap-2"><i className="fa-regular fa-clock text-brand-accent italic"></i> 8 Min Baca</span>
           </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-16">
        
        {/* Left: Article Body */}
        <article className="lg:w-8/12">
           <div className="w-full h-[400px] sm:h-[550px] rounded-[3.5rem] overflow-hidden mb-12 shadow-2xl border border-slate-100 dark:border-slate-800">
              <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600" className="w-full h-full object-cover" alt="Cover" />
           </div>

           <div className="flex items-center gap-4 mb-12 py-6 border-y border-slate-50 dark:border-slate-900">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mr-4">Bagikan:</span>
              <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:bg-brand-primary hover:text-white transition-all"><i className="fa-brands fa-facebook-f"></i></button>
              <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:bg-sky-500 hover:text-white transition-all"><i className="fa-brands fa-twitter"></i></button>
              <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:bg-emerald-500 hover:text-white transition-all"><i className="fa-brands fa-whatsapp text-lg"></i></button>
           </div>

           {/* Article Body with Serif Typography */}
           <div className="article-content font-serif text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-[1.8] space-y-8">
              <p className="first-letter:text-7xl first-letter:font-black first-letter:text-brand-primary first-letter:mr-3 first-letter:float-left first-letter:uppercase first-letter:font-sans">
                 Bali selalu memiliki daya tarik yang membuat siapa saja ingin kembali. Di tahun 2026 ini, Pulau Dewata tidak hanya menawarkan pesona pantai dan budaya klasiknya, tetapi juga banyak destinasi baru yang bermunculan. Jika Anda merencanakan liburan ke Bali tahun ini, panduan komprehensif ini akan membantu Anda memaksimalkan waktu dan anggaran Anda.
              </p>
              
              <h2 className="font-sans text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mt-16 mb-6">1. Mengapa Liburan ke Bali di Tahun 2026?</h2>
              <p>Setelah melewati berbagai fase pemulihan pariwisata, infrastruktur di Bali kini jauh lebih matang. Pembangunan jalan pintas di area Selatan, pelebaran area pejalan kaki di Sanur dan Canggu, serta menjamurnya konsep eco-tourism membuat Bali semakin nyaman dinikmati. Selain itu, banyak sekali beach club dan restoran dengan konsep farm-to-table yang baru saja buka.</p>

              <blockquote className="border-l-4 border-brand-primary bg-slate-50 dark:bg-slate-900/50 p-10 rounded-r-3xl italic text-2xl font-black text-brand-primary leading-relaxed my-12">
                "Bali bukan sekadar tempat wisata; Bali adalah state of mind. Ketenangan yang ditawarkan Ubud hingga kemeriahan Canggu menjadikan pulau ini paket lengkap bagi setiap pelancong."
              </blockquote>

              <h2 className="font-sans text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mt-16 mb-6">2. Rekomendasi Rute Itinerary</h2>
              <p>Jika Anda memiliki waktu terbatas, berikut adalah itinerary efektif yang menggabungkan alam, budaya, dan hiburan modern:</p>
              
              <div className="space-y-6">
                 <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm">
                    <h3 className="font-sans font-black text-brand-primary uppercase tracking-tight mb-4">Hari 1: Kedatangan & Menikmati Selatan</h3>
                    <p className="text-sm sm:text-base font-bold italic">Tiba di Ngurah Rai, langsung sewa mobil layanan Private Tour Bali dari NusaTrip. Kunjungi Pantai Melasti dan Pura Uluwatu untuk Tari Kecak.</p>
                 </div>
                 <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm">
                    <h3 className="font-sans font-black text-brand-accent uppercase tracking-tight mb-4">Hari 2: Menjelajah Ubud</h3>
                    <p className="text-sm sm:text-base font-bold italic">Pagi hari trekking di Tegalalang. Sore hari mencari ketenangan di Campuhan Ridge Walk atau berbelanja kerajinan di Pasar Seni Ubud.</p>
                 </div>
              </div>
           </div>

           <div className="mt-20 pt-10 border-t border-slate-50 dark:border-slate-900 flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-4">Tags:</span>
              {['Bali 2026', 'Itinerary', 'Tips Hemat', 'Hidden Gems'].map(tag => (
                <button key={tag} className="px-5 py-2 bg-slate-50 dark:bg-slate-900 text-slate-500 font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-brand-primary hover:text-white transition-all">{tag}</button>
              ))}
           </div>
        </article>

        {/* Right Sidebar */}
        <aside className="lg:w-4/12 space-y-12">
           <div className="sticky top-24 space-y-12">
              {/* Table of Contents */}
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
                 <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-8 border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-3">
                    <i className="fa-solid fa-list-ul text-brand-primary"></i> Daftar Isi
                 </h3>
                 <ul className="space-y-6 text-[11px] font-black uppercase tracking-widest text-slate-400">
                    <li className="flex items-center gap-3 text-brand-primary"><span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span> 1. Mengapa Bali 2026?</li>
                    <li className="flex items-center gap-3 hover:text-brand-primary transition-colors cursor-pointer"><span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span> 2. Rekomendasi Rute</li>
                    <li className="flex items-center gap-3 hover:text-brand-primary transition-colors cursor-pointer"><span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span> 3. Perkiraan Biaya</li>
                    <li className="flex items-center gap-3 hover:text-brand-primary transition-colors cursor-pointer"><span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span> 4. Hidden Gems</li>
                 </ul>
              </div>

              {/* Conversion Widget */}
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                 <div className="relative z-10">
                    <span className="px-3 py-1 bg-brand-accent text-white text-[9px] font-black uppercase tracking-widest rounded-lg mb-6 inline-block">Flash Deals</span>
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4 leading-tight">Wujudkan Liburan Impian Ke Bali!</h3>
                    <p className="text-[10px] font-bold italic text-white/50 mb-8 leading-relaxed uppercase">Pesan sekarang dan dapatkan diskon 15% untuk paket tour 4D3N.</p>
                    <button className="w-full py-5 bg-white text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-brand-accent hover:text-white transition-all shadow-xl">Lihat Paket Promo</button>
                 </div>
              </div>

              {/* Newsletter */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 text-center">
                 <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-brand-primary text-2xl mx-auto mb-6 shadow-xl shadow-brand-primary/10">
                    <i className="fa-regular fa-envelope-open"></i>
                 </div>
                 <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-3">Newsletter</h3>
                 <p className="text-[10px] font-bold italic text-slate-400 mb-8 uppercase tracking-tight">Dapatkan artikel terbaru langsung ke email Anda.</p>
                 <form className="space-y-3">
                    <input type="email" placeholder="Alamat Email" className="w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl py-4 px-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary shadow-inner" />
                    <button type="button" className="w-full py-4 bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-xl shadow-brand-primary/20 hover:scale-105 transition-all">Subscribe</button>
                 </form>
              </div>
           </div>
        </aside>
      </main>

      {/* Related Posts */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-24 px-6 border-t border-slate-100 dark:border-slate-900">
         <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
               <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Artikel Terkait</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-bold italic uppercase tracking-tight">Baca panduan menarik lainnya untuk referensi Anda.</p>
               </div>
               <Link href="/blog" className="hidden sm:block text-[11px] font-black text-brand-primary uppercase tracking-widest hover:underline">Lihat Semua <i className="fa-solid fa-arrow-right ml-2 text-[8px]"></i></Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { t: "5 Resort Pemandangan Laut Terbaik di Nusa Penida", i: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600", c: "Akomodasi" },
                 { t: "Sewa Mobil Lepas Kunci vs Supir: Mana Untung?", i: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600", c: "Tips & Info" },
                 { t: "7 Rekomendasi Kuliner Malam Kota Malang", i: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600", c: "Kuliner" }
               ].map((p, idx) => (
                 <Link key={idx} href="/blog" className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 hover:border-brand-primary transition-all duration-500 shadow-sm hover:shadow-2xl">
                    <div className="h-44 overflow-hidden">
                       <img src={p.i} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Related" />
                    </div>
                    <div className="p-8">
                       <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest mb-3 block">{p.c}</span>
                       <h4 className="text-[13px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight leading-tight group-hover:text-brand-primary transition-colors line-clamp-2">{p.t}</h4>
                    </div>
                 </Link>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
}
