'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function BlogDetailPage() {
  
  useEffect(() => {
    const handleScroll = () => {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById("progress-bar");
        if(progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="text-slate-800 antialiased overflow-x-hidden bg-slate-50 min-h-screen">
      
      {/* Reading Progress Bar */}
      <div id="progress-container" className="fixed top-0 left-0 w-full h-[4px] z-[100] bg-transparent">
        <div id="progress-bar" className="h-full bg-brand-600 transition-all duration-100 ease-out" style={{ width: '0%' }}></div>
      </div>

      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 py-3 sm:py-4 sticky top-[4px] z-40 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            
            <Link href="/" className="font-extrabold text-xl tracking-tighter text-brand-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-brand-600 text-white flex items-center justify-center shadow"><span className="text-sm"><i className="fa-solid fa-paper-plane"></i></span></div>
                NusaTrip <span className="text-slate-300 font-light hidden sm:inline">|</span> <span className="text-slate-500 font-medium text-sm hidden sm:inline">Travel Blog</span>
            </Link>

            <div className="flex items-center gap-4">
                <Link href="/blog" className="text-xs sm:text-sm font-bold text-slate-500 hover:text-brand-600 transition-colors hidden sm:block">Kembali ke Daftar Artikel</Link>
                <Link href="/" className="px-4 py-2 bg-brand-50 hover:bg-brand-600 text-brand-600 hover:text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 border border-brand-200 hover:border-transparent shadow-sm">
                    Pesan Tour
                </Link>
            </div>
        </div>
      </header>

      {/* ARTICLE HERO & META */}
      <section className="bg-white pt-8 pb-6 border-b border-slate-200">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <nav className="flex justify-center text-[10px] sm:text-xs text-slate-400 font-medium mb-6" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                    <li className="inline-flex items-center"><Link href="/blog" className="hover:text-brand-600 transition-colors">Blog</Link></li>
                    <li><div className="flex items-center"><i className="fa-solid fa-chevron-right text-[8px] mx-1"></i><span className="cursor-pointer hover:text-brand-600 transition-colors">Panduan Destinasi</span></div></li>
                    <li><div className="flex items-center"><i className="fa-solid fa-chevron-right text-[8px] mx-1"></i><span className="text-slate-600 font-bold">Bali</span></div></li>
                </ol>
            </nav>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
                Panduan Lengkap Liburan ke Bali 2026: Rekomendasi Rute, Biaya & Spot Tersembunyi
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2">
                    <img src="https://ui-avatars.com/api/?name=Editor+Nusa&background=e0e7ff&color=4f46e5" alt="Author" className="w-8 h-8 rounded-full border border-slate-200 shadow-sm" />
                    <span className="font-bold text-slate-800">Tim Editorial NusaTrip</span>
                </div>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="flex items-center gap-1.5"><i className="fa-regular fa-calendar"></i> 12 Nov 2026</span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="flex items-center gap-1.5"><i className="fa-regular fa-clock text-accent-500"></i> 8 Menit Baca</span>
            </div>
        </div>
      </section>

      {/* MAIN CONTENT + SIDEBAR */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col lg:flex-row gap-10 lg:gap-12">
        
        {/* KIRI: ARTICLE CONTENT (70%) */}
        <article className="flex-1 min-w-0 font-serif">
            
            <div className="w-full h-[300px] sm:h-[450px] rounded-2xl overflow-hidden mb-10 shadow-lg">
                <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200" alt="Bali Landscape" className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center gap-3 mb-8 border-y border-slate-100 py-4 font-sans">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Bagikan:</span>
                <button className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors" title="Facebook"><i className="fa-brands fa-facebook-f"></i></button>
                <button className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors" title="Twitter"><i className="fa-brands fa-twitter"></i></button>
                <button className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors" title="WhatsApp"><i className="fa-brands fa-whatsapp text-lg"></i></button>
                <button className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors ml-auto sm:ml-0" title="Copy Link"><i className="fa-solid fa-link"></i></button>
            </div>

            <div className="text-slate-700 text-lg leading-loose space-y-6">
                <p>Bali selalu memiliki daya tarik yang membuat siapa saja ingin kembali. Di tahun 2026 ini, Pulau Dewata tidak hanya menawarkan pesona pantai dan budaya klasiknya, tetapi juga banyak destinasi baru yang bermunculan. Jika Anda merencanakan liburan ke Bali tahun ini, panduan komprehensif ini akan membantu Anda memaksimalkan waktu dan anggaran Anda.</p>
                
                <h2 id="section-1" className="font-sans text-2xl font-extrabold text-slate-900 mt-10 mb-4">1. Mengapa Liburan ke Bali di Tahun 2026?</h2>
                <p>Setelah melewati berbagai fase pemulihan pariwisata, infrastruktur di Bali kini jauh lebih matang. Pembangunan jalan pintas di area Selatan, pelebaran area pejalan kaki di Sanur dan Canggu, serta menjamurnya konsep <em>eco-tourism</em> membuat Bali semakin nyaman dinikmati. Selain itu, banyak sekali <em>beach club</em> dan restoran dengan konsep *farm-to-table* yang baru saja buka.</p>

                <blockquote className="border-l-4 border-brand-500 bg-brand-50 p-6 rounded-r-xl my-8 italic text-brand-700 text-xl font-medium">
                    "Bali bukan sekadar tempat wisata; Bali adalah *state of mind*. Ketenangan yang ditawarkan Ubud hingga kemeriahan Canggu menjadikan pulau ini paket lengkap bagi setiap jenis pelancong."
                </blockquote>

                <h2 id="section-2" className="font-sans text-2xl font-extrabold text-slate-900 mt-10 mb-4">2. Rekomendasi Rute (Itinerary) 4 Hari 3 Malam</h2>
                <p>Jika Anda memiliki waktu terbatas, berikut adalah itinerary efektif yang menggabungkan alam, budaya, dan hiburan modern:</p>
                
                <h3 className="font-sans text-xl font-bold text-slate-800 mt-6 mb-3">Hari 1: Kedatangan & Menikmati Selatan Bali (Uluwatu)</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Tiba di Bandara Ngurah Rai, langsung sewa mobil atau gunakan layanan <Link href="/" className="text-brand-600 font-bold hover:underline">Private Tour Bali dari NusaTrip</Link>.</li>
                    <li>Menuju kawasan Uluwatu: Kunjungi Pantai Melasti atau Pantai Padang-Padang.</li>
                    <li>Sore hari: Menyaksikan pertunjukan Tari Kecak dengan latar belakang matahari terbenam di Pura Uluwatu.</li>
                    <li>Makan malam seafood di Pantai Jimbaran.</li>
                </ul>

                <h3 className="font-sans text-xl font-bold text-slate-800 mt-6 mb-3">Hari 2: Menjelajah Ubud (Budaya & Alam)</h3>
                <img src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800" alt="Ubud Rice Terrace" className="w-full rounded-2xl my-6 shadow-md" />
                <ul className="list-disc pl-6 space-y-2">
                    <li>Pagi hari: Trekking ringan di Tegalalang Rice Terrace.</li>
                    <li>Siang hari: Mengunjungi Monkey Forest dan makan siang bebek tepi sawah.</li>
                    <li>Sore hari: Mencari ketenangan di Campuhan Ridge Walk atau berbelanja di Pasar Seni Ubud.</li>
                </ul>

                <h2 id="section-3" className="font-sans text-2xl font-extrabold text-slate-900 mt-10 mb-4">3. Perkiraan Biaya (Budgeting)</h2>
                <p>Biaya liburan ke Bali sangat bervariasi. Untuk gaya liburan menengah (*mid-range*), Anda bisa menganggarkan sekitar <strong className="font-bold text-slate-900">Rp 3.500.000 - Rp 5.000.000 per orang</strong> (tidak termasuk tiket pesawat PP). Biaya ini mencakup penginapan di hotel bintang 3/4, sewa mobil harian, makan di kafe atau restoran menengah, dan tiket masuk wisata standar.</p>
                <p><strong className="font-bold text-slate-900">Tips Hemat:</strong> Gunakan promo paket bundling dari platform SaaS seperti NusantaraTrip. Biasanya, jika Anda memesan paket tour yang sudah termasuk hotel dan transportasi, harganya akan jauh lebih murah karena adanya <em>corporate rate</em>.</p>

                <h2 id="section-4" className="font-sans text-2xl font-extrabold text-slate-900 mt-10 mb-4">4. Hidden Gems di 2026 yang Wajib Dikunjungi</h2>
                <p>Lupakan sejenak Kuta atau Seminyak. Berikut adalah beberapa spot tersembunyi yang sedang naik daun:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="font-bold text-slate-900">Pantai Nyang Nyang:</strong> Membutuhkan sedikit usaha untuk turun tebing, namun Anda akan disuguhi pantai pasir putih sepi yang luar biasa indah.</li>
                    <li><strong className="font-bold text-slate-900">Air Terjun Gembleng (Sidemen, Karangasem):</strong> Menawarkan kolam alami di atas tebing dengan pemandangan hutan tropis. Surganya pecinta foto!</li>
                    <li><strong className="font-bold text-slate-900">Desa Penglipuran:</strong> Diakui sebagai salah satu desa terbersih di dunia, memberikan Anda pandangan autentik tentang tata kota tradisional Bali.</li>
                </ul>

                <p>Sudah siap merencanakan liburan Anda ke Bali? Jangan ragu untuk mengkonsultasikan jadwal Anda bersama tim spesialis kami. Selamat merencanakan liburan impian Anda!</p>
            </div>

            {/* Article Tags */}
            <div className="mt-10 flex flex-wrap items-center gap-2 pt-6 border-t border-slate-200 font-sans">
                <span className="text-xs font-bold text-slate-900 mr-2"><i className="fa-solid fa-tags text-slate-400 mr-1"></i> Tags:</span>
                {['Bali 2026', 'Itinerary', 'Tips Hemat', 'Hidden Gems'].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-600 text-xs font-medium rounded-md transition-colors cursor-pointer">{tag}</span>
                ))}
            </div>

            {/* Author Bio Box */}
            <div className="mt-10 bg-brand-50 border border-brand-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 font-sans">
                <img src="https://ui-avatars.com/api/?name=Editor+Nusa&background=fff&color=4f46e5" alt="Author" className="w-16 h-16 rounded-full border-2 border-white shadow-sm" />
                <div className="text-center sm:text-left">
                    <h4 className="font-extrabold text-brand-900 text-lg">Tim Editorial NusaTrip</h4>
                    <p className="text-sm text-slate-600 mt-1 mb-3">Kumpulan penulis dan traveler profesional yang mendedikasikan waktunya untuk mengeksplorasi dan membagikan panduan wisata terbaik di seluruh Indonesia dan Dunia.</p>
                    <span className="text-xs font-bold text-brand-600 hover:underline cursor-pointer">Lihat semua artikel dari penulis ini <i className="fa-solid fa-arrow-right text-[10px] ml-1"></i></span>
                </div>
            </div>

        </article>

        {/* KANAN: SIDEBAR WIDGETS (30%) STICKY */}
        <aside className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 font-sans">
            <div className="sticky top-24 space-y-8">
                
                {/* TOC */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
                        <i className="fa-solid fa-list-ul text-brand-500"></i> Daftar Isi
                    </h3>
                    <ul className="space-y-3 text-sm font-medium text-slate-500">
                        <li><a href="#section-1" className="hover:text-brand-600 transition-colors">1. Mengapa Liburan ke Bali di Tahun 2026?</a></li>
                        <li><a href="#section-2" className="hover:text-brand-600 transition-colors">2. Rekomendasi Rute (Itinerary) 4H3M</a></li>
                        <li><a href="#section-3" className="hover:text-brand-600 transition-colors">3. Perkiraan Biaya (Budgeting)</a></li>
                        <li><a href="#section-4" className="hover:text-brand-600 transition-colors">4. Hidden Gems yang Wajib Dikunjungi</a></li>
                    </ul>
                </div>

                {/* Promo Widget */}
                <Link href="/" className="block bg-brand-900 rounded-2xl p-6 shadow-lg group relative overflow-hidden text-white border border-brand-800">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-500 rounded-full mix-blend-multiply opacity-60 blur-xl"></div>
                    <div className="relative z-10">
                        <span className="bg-accent-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow mb-3 inline-block uppercase tracking-widest">Penawaran Spesial</span>
                        <h3 className="font-extrabold text-xl mb-2 leading-snug">Wujudkan Liburan Impian ke Bali!</h3>
                        <p className="text-xs text-brand-200 mb-5">Pesan Paket Tour Bali 4D3N sekarang dan dapatkan diskon otomatis 15% untuk pemesanan minggu ini.</p>
                        <div className="w-full py-3 bg-white text-brand-900 font-extrabold text-xs rounded-xl text-center group-hover:bg-accent-400 group-hover:text-white transition-all shadow-md">
                            Lihat Paket Promo <i className="fa-solid fa-arrow-right ml-1"></i>
                        </div>
                    </div>
                </Link>

                {/* Newsletter */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-500 text-xl mx-auto mb-3 shadow-sm border border-slate-100">
                        <i className="fa-regular fa-envelope-open"></i>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2">Jangan Ketinggalan Info!</h3>
                    <p className="text-[11px] text-slate-500 mb-4">Dapatkan artikel terbaru dan kode voucher rahasia.</p>
                    <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Alamat Email Anda" className="w-full bg-white border border-slate-200 text-xs rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-brand-500 transition-colors" required />
                        <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-colors">Subscribe</button>
                    </form>
                </div>

            </div>
        </aside>

      </main>

      {/* RELATED POSTS SECTION */}
      <section className="bg-white border-t border-slate-200 py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Artikel Terkait Lainnya</h2>
                    <p className="text-sm text-slate-500">Baca panduan menarik lainnya untuk melengkapi referensi Anda.</p>
                </div>
                <Link href="/blog" className="hidden sm:flex text-sm font-bold text-brand-600 hover:text-brand-800 transition-colors items-center gap-1">
                    Lihat Semua <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Link href="#" className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow flex flex-col">
                    <div className="h-40 overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600" alt="Nusa Penida" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-slate-900 text-sm mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">5 Resort dengan Pemandangan Laut Terbaik di Nusa Penida</h3>
                        <p className="text-xs text-slate-500 mb-4 line-clamp-2">Rekomendasi penginapan mewah untuk pengalaman bulan madu tak terlupakan dengan view langsung ke Samudra Hindia.</p>
                        <span className="text-[10px] text-slate-400 font-medium mt-auto border-t border-slate-100 pt-3 flex items-center justify-between">
                            05 Okt 2026 <span className="text-brand-600 font-bold uppercase">Akomodasi</span>
                        </span>
                    </div>
                </Link>
                <Link href="#" className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow flex flex-col">
                    <div className="h-40 overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600" alt="Rent Car" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-slate-900 text-sm mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">Sewa Mobil Lepas Kunci vs Pakai Supir: Mana yang Lebih Menguntungkan?</h3>
                        <p className="text-xs text-slate-500 mb-4 line-clamp-2">Menganalisis plus minus menggunakan supir lokal untuk liburan keluarga di Bali atau Jawa Timur.</p>
                        <span className="text-[10px] text-slate-400 font-medium mt-auto border-t border-slate-100 pt-3 flex items-center justify-between">
                            15 Okt 2026 <span className="text-brand-600 font-bold uppercase">Tips & Info</span>
                        </span>
                    </div>
                </Link>
                <Link href="#" className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow flex-col hidden sm:flex">
                    <div className="h-40 overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600" alt="Malang" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-slate-900 text-sm mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">7 Rekomendasi Kuliner Malam Kota Malang yang Wajib Anda Coba</h3>
                        <p className="text-xs text-slate-500 mb-4 line-clamp-2">Mulai dari Bakso President hingga ketan legendaris di Alun-Alun Batu. Hangatkan malam Anda dengan kuliner ini.</p>
                        <span className="text-[10px] text-slate-400 font-medium mt-auto border-t border-slate-100 pt-3 flex items-center justify-between">
                            20 Okt 2026 <span className="text-brand-600 font-bold uppercase">Kuliner</span>
                        </span>
                    </div>
                </Link>
            </div>
            
            <div className="mt-6 text-center sm:hidden">
                <Link href="/blog" className="inline-block w-full py-2.5 bg-slate-100 text-slate-700 font-bold text-sm rounded-xl">Lihat Semua Artikel</Link>
            </div>
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="bg-brand-950 border-t-4 border-accent-500">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 font-extrabold text-xl text-white mb-2">
                    <div className="w-8 h-8 rounded bg-brand-600 text-white flex items-center justify-center text-xs"><i className="fa-solid fa-paper-plane"></i></div>
                    NusaTrip
                </div>
                <p className="text-xs text-brand-200 font-medium">Enterprise Travel SaaS Platform Terpercaya.</p>
            </div>
            <div className="flex gap-4 text-xs font-bold text-brand-300 mt-4 sm:mt-0">
                <span className="hover:text-white transition-colors cursor-pointer">Tentang Kami</span>
                <span className="hover:text-white transition-colors cursor-pointer">Syarat & Ketentuan</span>
                <span className="hover:text-white transition-colors cursor-pointer">Kebijakan Privasi</span>
            </div>
        </div>
      </footer>
    </div>
  );
}
