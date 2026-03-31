'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function BlogListPage() {
  const [activeTab, setActiveTab] = useState('Semua Topik');

  const categories = ['Semua Topik', 'Tips & Info', 'Kuliner', 'Akomodasi', 'Inspirasi Liburan'];

  const blogs = [
    {
      img: 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=600',
      category: 'Tips & Info',
      badgeColor: 'text-brand-600',
      title: 'Cara Mencegah Kedinginan Ekstrem Saat Menunggu Sunrise di Bromo',
      desc: 'Suhu Bromo bisa mencapai 5 derajat Celcius. Jangan biarkan liburan rusak karena salah kostum, ikuti panduan layer pakaian ini.',
      date: '05 Nov 2026',
      readTime: '4 Min Baca',
      href: '/blog/bromo-sunrise-tips'
    },
    {
      img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600',
      category: 'Inspirasi L.',
      badgeColor: 'text-accent-600',
      title: 'Waktu Terbaik Mengunjungi Jepang: Bunga Sakura vs Daun Musim Gugur',
      desc: 'Bingung memilih antara Spring atau Autumn? Berikut perbandingan biaya, suasana, dan ketersediaan tiket untuk liburan ke Jepang.',
      date: '28 Okt 2026',
      readTime: '6 Min Baca',
      href: '/blog/japan-seasons'
    },
    {
      img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600',
      category: 'Kuliner',
      badgeColor: 'text-emerald-600',
      title: '7 Rekomendasi Kuliner Malam Kota Malang yang Wajib Anda Coba',
      desc: 'Mulai dari Bakso President hingga ketan legendaris di Alun-Alun Batu. Hangatkan malam Anda dengan pilihan kuliner lokal ini.',
      date: '20 Okt 2026',
      readTime: '5 Min Baca',
      href: '/blog/malang-culinary'
    },
    {
      img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600',
      category: 'Tips & Info',
      badgeColor: 'text-brand-600',
      title: 'Sewa Mobil Lepas Kunci vs Pakai Supir: Mana yang Lebih Menguntungkan?',
      desc: 'Menganalisis plus minus menggunakan supir lokal untuk liburan keluarga. Pertimbangkan faktor kelelahan, rute, dan fleksibilitas.',
      date: '15 Okt 2026',
      readTime: '7 Min Baca',
      href: '/blog/car-rental-tips'
    },
    {
      img: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600',
      category: 'Inspirasi L.',
      badgeColor: 'text-accent-600',
      title: 'Panduan Naik Balon Udara di Cappadocia: Harga dan Waktu Terbaik',
      desc: 'Semua yang perlu Anda ketahui sebelum merencanakan liburan impian ke Turki dan menaiki balon udara yang ikonik.',
      date: '10 Okt 2026',
      readTime: '5 Min Baca',
      href: '/blog/cappadocia-guide'
    },
    {
      img: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600',
      category: 'Akomodasi',
      badgeColor: 'text-pink-600',
      title: '5 Resort dengan Pemandangan Laut Terbaik di Nusa Penida untuk Honeymoon',
      desc: 'Rekomendasi penginapan mewah untuk pengalaman bulan madu tak terlupakan dengan view langsung ke Samudra Hindia.',
      date: '05 Okt 2026',
      readTime: '6 Min Baca',
      href: '/blog/nusa-penida-resorts'
    }
  ];

  return (
    <div className="text-slate-800 antialiased overflow-x-hidden bg-slate-50 min-h-screen">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 py-3 sm:py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            
            <Link href="/" className="font-extrabold text-xl tracking-tighter text-brand-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-brand-600 text-white flex items-center justify-center shadow"><span className="text-sm"><i className="fa-solid fa-paper-plane"></i></span></div>
                NusaTrip <span className="text-slate-300 font-light hidden sm:inline">|</span> <span className="text-slate-500 font-medium text-sm hidden sm:inline">Travel Blog</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
                <Link href="/blog" className="text-sm font-bold text-brand-600 border-b-2 border-brand-600 pb-1">Artikel Terbaru</Link>
                <Link href="#" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Tips & Info</Link>
                <Link href="#" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Destinasi</Link>
            </nav>

            <div className="flex items-center gap-4">
                <Link href="/" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-2">
                    Pesan Tour
                </Link>
            </div>
        </div>
      </header>

      {/* HERO FEATURED POST */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Link href="/blog/panduan-lengkap-liburan-ke-bali" className="block relative rounded-2xl sm:rounded-3xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow h-[350px] sm:h-[450px]">
            <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200" alt="Featured Post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full max-w-3xl">
                <div className="flex items-center gap-3 mb-3">
                    <span className="bg-brand-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">Panduan Destinasi</span>
                    <span className="text-slate-300 text-xs font-medium flex items-center gap-1.5"><i className="fa-regular fa-clock"></i> 8 Menit Baca</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight group-hover:text-brand-100 transition-colors">Panduan Lengkap Liburan ke Bali 2026: Rekomendasi Rute, Biaya & Spot Tersembunyi</h1>
                <p className="text-sm text-slate-300 line-clamp-2 mb-4 hidden sm:block">Bali selalu punya cerita baru. Temukan rekomendasi beach club terbaru, itinerary 4 hari 3 malam yang efektif, hingga perkiraan budget liburan tanpa menguras kantong.</p>
                <div className="flex items-center gap-3">
                    <img src="https://ui-avatars.com/api/?name=Editor+Nusa&background=fff&color=4f46e5" alt="Author" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                    <span className="text-white text-xs font-bold">Tim Editorial NusaTrip <span className="text-slate-400 font-medium ml-2">• 12 Nov 2026</span></span>
                </div>
            </div>
        </Link>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex flex-col lg:flex-row gap-8 lg:gap-10">
        
        {/* KIRI: DAFTAR ARTIKEL (70%) */}
        <div className="flex-1 min-w-0">
            
            {/* Category Quick Tags */}
            <div className="flex items-center gap-3 overflow-x-auto mb-8 pb-2 border-b border-slate-200" style={{ scrollbarWidth: 'none' }}>
                {categories.map((cat, i) => (
                  <button key={i} onClick={() => setActiveTab(cat)} className={`px-4 py-2 font-bold text-xs rounded-full border whitespace-nowrap transition-colors ${activeTab === cat ? 'bg-brand-50 text-brand-600 border-brand-200' : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'}`}>
                    {cat}
                  </button>
                ))}
            </div>

            {/* Grid Artikel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {blogs.map((b, i) => (
                  <Link href={b.href} key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-200">
                    <div className="h-48 overflow-hidden relative">
                        <img src={b.img} alt={b.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <span className={`absolute top-3 left-3 bg-white/90 backdrop-blur ${b.badgeColor} text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider`}>{b.category}</span>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                        <h3 className="font-bold text-slate-900 text-base mb-2 line-clamp-2 leading-snug group-hover:text-brand-600 transition-colors">{b.title}</h3>
                        <p className="text-xs text-slate-500 mb-4 line-clamp-2">{b.desc}</p>
                        <div className="mt-auto flex justify-between items-center text-[10px] text-slate-400 font-medium pt-3 border-t border-slate-100">
                            <span>{b.date}</span>
                            <span className="flex items-center gap-1"><i className="fa-regular fa-clock"></i> {b.readTime}</span>
                        </div>
                    </div>
                  </Link>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center">
                <nav className="inline-flex shadow-sm rounded-lg" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-slate-200 bg-white text-sm font-medium text-slate-400 cursor-not-allowed">
                        <i className="fa-solid fa-chevron-left text-[10px]"></i>
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-slate-200 bg-brand-600 text-sm font-extrabold text-white">1</button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-slate-200 bg-white text-sm font-bold text-slate-600 hover:bg-slate-50">2</button>
                    <button className="hidden sm:inline-flex relative items-center px-4 py-2 border border-slate-200 bg-white text-sm font-bold text-slate-600 hover:bg-slate-50">3</button>
                    <span className="relative inline-flex items-center px-3 py-2 border border-slate-200 bg-white text-sm font-medium text-slate-400">...</span>
                    <button className="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-slate-200 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-brand-600">
                        <i className="fa-solid fa-chevron-right text-[10px]"></i>
                    </button>
                </nav>
            </div>

        </div>

        {/* KANAN: SIDEBAR WIDGETS (30%) */}
        <aside className="w-full lg:w-[340px] xl:w-[360px] flex-shrink-0 space-y-8">
            
            {/* Widget: Search */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-3 text-sm">Cari Artikel</h3>
                <div className="relative input-saas bg-slate-50 border border-slate-200 rounded-xl flex items-center p-1 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
                    <input type="text" placeholder="Ketik kata kunci..." className="w-full bg-transparent text-sm text-slate-800 py-2 px-3 focus:outline-none" />
                    <button className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 transition-colors">
                        <i className="fa-solid fa-magnifying-glass text-xs"></i>
                    </button>
                </div>
            </div>

            {/* Widget: Popular Posts */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 text-sm border-b border-slate-100 pb-2">Terpopuler Minggu Ini</h3>
                <div className="space-y-4">
                    <Link href="#" className="flex gap-3 group">
                        <img src="https://images.unsplash.com/photo-1518090597335-e6f7783ee855?w=200" alt="Bromo" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-slate-100" />
                        <div>
                            <h4 className="font-bold text-slate-800 text-xs line-clamp-2 mb-1 group-hover:text-brand-600 transition-colors">5 Spot Foto Rahasia di Bromo Selain Penanjakan</h4>
                            <p className="text-[9px] text-slate-400 font-medium">1.2k Views</p>
                        </div>
                    </Link>
                    <Link href="#" className="flex gap-3 group">
                        <img src="https://images.unsplash.com/photo-1520109971360-63ce771415eb?w=200" alt="Singapore" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-slate-100" />
                        <div>
                            <h4 className="font-bold text-slate-800 text-xs line-clamp-2 mb-1 group-hover:text-brand-600 transition-colors">Itinerary 3 Hari 2 Malam Singapore Khusus Pemula</h4>
                            <p className="text-[9px] text-slate-400 font-medium">850 Views</p>
                        </div>
                    </Link>
                    <Link href="#" className="flex gap-3 group">
                        <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200" alt="Team Building" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-slate-100" />
                        <div>
                            <h4 className="font-bold text-slate-800 text-xs line-clamp-2 mb-1 group-hover:text-brand-600 transition-colors">Ide Games Team Building Seru untuk Corporate Outing</h4>
                            <p className="text-[9px] text-slate-400 font-medium">720 Views</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Widget: Newsletter */}
            <div className="bg-brand-900 rounded-2xl p-6 shadow-md relative overflow-hidden text-center text-white">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-500 rounded-full mix-blend-multiply opacity-50 blur-xl"></div>
                <i className="fa-regular fa-envelope-open text-3xl text-brand-300 mb-3 relative z-10"></i>
                <h3 className="font-extrabold text-lg mb-2 relative z-10">Travel Newsletter</h3>
                <p className="text-xs text-brand-200 mb-4 leading-relaxed relative z-10">Dapatkan info destinasi terbaru dan kode promo eksklusif langsung ke inbox Anda.</p>
                <form className="flex flex-col gap-2 relative z-10" onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="Alamat Email" className="w-full bg-white/10 border border-white/20 text-sm rounded-lg px-4 py-2.5 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 transition-colors" required />
                    <button type="submit" className="w-full bg-accent-500 hover:bg-accent-600 font-bold text-sm px-4 py-2.5 rounded-lg shadow-md transition-colors">Berlangganan</button>
                </form>
            </div>

            {/* Widget: Cross-Selling Banner */}
            <Link href="/" className="block bg-white border border-slate-200 rounded-2xl p-4 shadow-sm group hover:border-brand-300 transition-colors">
                <div className="bg-slate-100 rounded-xl h-32 mb-3 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1517441865-c32f8313bd8a?w=400" alt="Ijen" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">PROMO 20%</span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">Open Trip Kawah Ijen</h3>
                <p className="text-xs text-slate-500 mb-3">Mulai dari <span className="font-extrabold text-brand-600 text-sm">Rp 350.000</span></p>
                <div className="w-full py-2 bg-brand-50 text-brand-600 font-bold text-xs rounded-lg text-center group-hover:bg-brand-600 group-hover:text-white transition-colors">Pesan Sekarang</div>
            </Link>

        </aside>

      </main>

      {/* FOOTER SIMPLE */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 font-extrabold text-lg text-brand-900">
                <div className="w-6 h-6 rounded bg-brand-600 text-white flex items-center justify-center text-[10px]"><i className="fa-solid fa-paper-plane"></i></div>
                NusaTrip Blog
            </div>
            <p className="text-xs text-slate-500 font-medium">© 2026 PT Nusantara Trip System.</p>
        </div>
      </footer>
    </div>
  );
}
