'use client';

import React from 'react';
import Link from 'next/link';

const blogs = [
  {
    id: 1,
    title: "Cara Mencegah Kedinginan Ekstrem Saat Menunggu Sunrise di Bromo",
    excerpt: "Suhu Bromo bisa mencapai 5 derajat Celcius. Jangan biarkan liburan rusak karena salah kostum, ikuti panduan layer pakaian ini.",
    category: "Tips & Info",
    author: "Tim Editorial NusaTrip",
    date: "05 Nov 2026",
    readTime: "4 Min",
    image: "https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=600",
    color: "text-brand-primary"
  },
  {
    id: 2,
    title: "Waktu Terbaik Mengunjungi Jepang: Bunga Sakura vs Daun Musim Gugur",
    excerpt: "Bingung memilih antara Spring atau Autumn? Berikut perbandingan biaya, suasana, dan ketersediaan tiket untuk liburan ke Jepang.",
    category: "Inspirasi",
    author: "Tim Editorial NusaTrip",
    date: "28 Okt 2026",
    readTime: "6 Min",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600",
    color: "text-brand-accent"
  },
  {
    id: 3,
    title: "7 Rekomendasi Kuliner Malam Kota Malang yang Wajib Anda Coba",
    excerpt: "Mulai dari Bakso President hingga ketan legendaris di Alun-Alun Batu. Hangatkan malam Anda dengan pilihan kuliner lokal ini.",
    category: "Kuliner",
    author: "Tim Editorial NusaTrip",
    date: "20 Okt 2026",
    readTime: "5 Min",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600",
    color: "text-emerald-500"
  }
];

export default function BlogListPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* Featured Post Hero */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <Link href="/blog/panduan-lengkap-bali-2026" className="group relative block w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
           <img 
             src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600" 
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
             alt="Featured"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
           <div className="absolute bottom-0 left-0 p-10 sm:p-16 max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                 <span className="px-4 py-1.5 bg-brand-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl">Featured Post</span>
                 <span className="text-white/70 text-[10px] font-black uppercase tracking-widest"><i className="fa-regular fa-clock mr-2"></i> 8 Min Baca</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6 leading-tight">Panduan Lengkap Liburan ke Bali 2026: Rekomendasi Rute & Spot Tersembunyi</h1>
              <p className="text-slate-300 font-bold italic mb-8 hidden md:block leading-relaxed">Bali selalu punya cerita baru. Temukan rekomendasi beach club terbaru, itinerary 4 hari yang efektif, hingga perkiraan budget liburan tanpa menguras kantong.</p>
              <div className="flex items-center gap-4">
                 <img src="https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff" className="w-10 h-10 rounded-xl border-2 border-white/20" alt="Author" />
                 <p className="text-white font-black uppercase text-[10px] tracking-widest">Tim Editorial NusaTrip <span className="mx-2 opacity-30">|</span> 12 Nov 2026</p>
              </div>
           </div>
        </Link>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-6 pb-32 flex flex-col lg:flex-row gap-12">
        
        {/* Left: Article List */}
        <div className="flex-1 space-y-12">
           {/* Filters */}
           <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-slate-100 dark:border-slate-800">
              <button className="px-6 py-3 bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest rounded-2xl">Semua Topik</button>
              {['Tips & Info', 'Kuliner', 'Akomodasi', 'Inspirasi', 'Destinasi'].map(tag => (
                <button key={tag} className="px-6 py-3 bg-slate-50 dark:bg-slate-900 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">{tag}</button>
              ))}
           </div>

           {/* Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map(blog => (
                <Link key={blog.id} href={`/blog/${blog.id}`} className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 hover:border-brand-primary transition-all duration-500 flex flex-col shadow-sm hover:shadow-2xl">
                   <div className="h-56 overflow-hidden relative">
                      <img src={blog.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={blog.title} />
                      <span className={`absolute top-4 left-4 bg-white/95 ${blog.color} text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-sm`}>{blog.category}</span>
                   </div>
                   <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 group-hover:text-brand-primary transition-colors leading-tight line-clamp-2">{blog.title}</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold italic leading-relaxed mb-6 line-clamp-2 uppercase tracking-tight">{blog.excerpt}</p>
                      <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
                         <span>{blog.date}</span>
                         <span className="flex items-center gap-2"><i className="fa-regular fa-clock"></i> {blog.readTime}</span>
                      </div>
                   </div>
                </Link>
              ))}
           </div>

           {/* Pagination */}
           <div className="flex justify-center pt-12">
              <div className="flex gap-2">
                 {[1, 2, 3].map(i => (
                   <button key={i} className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs ${i === 1 ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20' : 'bg-slate-100 dark:bg-slate-900 text-slate-400 hover:bg-slate-200'} transition-all`}>{i}</button>
                 ))}
                 <button className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-400 hover:bg-slate-200 flex items-center justify-center transition-all"><i className="fa-solid fa-chevron-right text-xs"></i></button>
              </div>
           </div>
        </div>

        {/* Right: Sidebar */}
        <aside className="w-full lg:w-[360px] space-y-12">
           {/* Search Widget */}
           <div className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">Cari Artikel</h3>
              <div className="relative group">
                 <input type="text" className="w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary transition-all shadow-inner" placeholder="Tulis sesuatu..." />
                 <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors"></i>
              </div>
           </div>

           {/* Popular Widget */}
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">Terpopuler</h3>
              <div className="space-y-8">
                 {[
                   { t: "5 Spot Foto Rahasia di Bromo Selain Penanjakan", v: "1.2k Views", i: "https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=200" },
                   { t: "Itinerary 3 Hari 2 Malam Singapore Khusus Pemula", v: "850 Views", i: "https://images.unsplash.com/photo-1520109971360-63ce771415eb?w=200" }
                 ].map((p, idx) => (
                   <Link key={idx} href="#" className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                         <img src={p.i} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Post" />
                      </div>
                      <div className="flex flex-col justify-center">
                         <h4 className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight leading-tight mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">{p.t}</h4>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{p.v}</p>
                      </div>
                   </Link>
                 ))}
              </div>
           </div>

           {/* Newsletter Widget */}
           <div className="bg-brand-primary rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-brand-primary/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 text-center">
                 <i className="fa-regular fa-envelope-open text-4xl mb-6"></i>
                 <h3 className="text-xl font-black uppercase tracking-tight mb-3 leading-tight">Travel Tips & Promo Exclusive!</h3>
                 <p className="text-[10px] font-bold italic text-white/70 mb-8 leading-relaxed uppercase">Dapatkan info destinasi terbaru langsung ke inbox Anda setiap minggu.</p>
                 <form className="space-y-3">
                    <input type="email" placeholder="Alamat Email" className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-xs font-black uppercase tracking-widest text-white placeholder-white/40 focus:outline-none focus:bg-white/20 transition-all" />
                    <button className="w-full py-4 bg-brand-accent text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-xl shadow-black/10">Daftar Newsletter</button>
                 </form>
              </div>
           </div>
        </aside>

      </main>
    </div>
  );
}
