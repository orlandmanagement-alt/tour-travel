'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function AboutUsPage() {
  
  // Number Counter Animation
  useEffect(() => {
    const counters = document.querySelectorAll('.counter') as NodeListOf<HTMLElement>;
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +(counter.getAttribute('data-target') || 0);
                const count = +counter.innerText;
                
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc).toString();
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target.toString();
                }
            };

            updateCount();
        });
    }

    animateCounters();
  }, []);

  return (
    <div className="text-slate-800 antialiased overflow-x-hidden bg-slate-50 min-h-screen">
      
      {/* HEADER */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 sm:py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            
            <Link href="/" className="font-extrabold text-xl tracking-tighter text-brand-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-brand-600 text-white flex items-center justify-center shadow"><span className="text-sm"><i className="fa-solid fa-paper-plane"></i></span></div>
                NusaTrip
            </Link>

            <nav className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Beranda</Link>
                <Link href="/about" className="text-sm font-bold text-brand-600 border-b-2 border-brand-600 pb-1">Tentang Kami</Link>
                <Link href="/corporate" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Corporate / B2B</Link>
                <Link href="/help" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Pusat Bantuan</Link>
            </nav>

            <div className="flex items-center gap-3">
                <Link href="/corporate" className="px-4 py-2 bg-brand-50 hover:bg-brand-100 text-brand-600 font-bold text-xs rounded-lg transition-colors border border-brand-200">
                    Hubungi Sales
                </Link>
            </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-brand-900 pt-20 pb-32 lg:pt-28 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1518090597335-e6f7783ee855?w=1600" className="w-full h-full object-cover opacity-30 mix-blend-overlay" alt="Bromo Landscape" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-brand-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-200 text-[10px] font-bold uppercase tracking-widest mb-6">
                Kisah Kami
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Membawa Nusantara ke <br/><span className="text-accent-400">Mata Dunia.</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                Platform SaaS Travel terdepan yang mendigitalisasi pengalaman liburan dan perjalanan bisnis Anda dengan standar keamanan dan kenyamanan level enterprise.
            </p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative z-20 -mt-16 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-slate-100">
                <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl sm:text-4xl font-extrabold text-brand-600 flex items-center"><span className="counter" data-target="10">0</span>+</span>
                    <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">Tahun Pengalaman</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl sm:text-4xl font-extrabold text-brand-600 flex items-center"><span className="counter" data-target="500">0</span>K+</span>
                    <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">Pelanggan Puas</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl sm:text-4xl font-extrabold text-brand-600 flex items-center"><span className="counter" data-target="250">0</span>+</span>
                    <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">Klien Enterprise</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl sm:text-4xl font-extrabold text-brand-600 flex items-center"><span className="counter" data-target="50">0</span>+</span>
                    <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">Penghargaan</p>
                </div>
            </div>
        </div>
      </section>

      {/* STORY & VISION SECTION */}
      <section className="py-12 sm:py-16 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            <div className="w-full lg:w-1/2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">Merajut Memori Sejak 2016</h2>
                <div className="w-16 h-1 bg-accent-500 rounded-full mb-6"></div>
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed font-medium">
                    <p>NusantaraTrip lahir dari sebuah idealisme sederhana: <strong>Perjalanan yang hebat haruslah bebas dari kerumitan.</strong> Berawal dari sebuah biro perjalanan lokal di Jawa Timur, kami menyadari bahwa korporasi dan wisatawan modern membutuhkan transparansi, kemudahan, dan keamanan bertransaksi.</p>
                    <p>Itulah mengapa kami berevolusi menjadi platform <em>SaaS (Software as a Service) Marketplace Travel</em>. Kami menggabungkan sentuhan personal (human touch) dari konsultan wisata berpengalaman dengan kecanggihan teknologi reservasi seketika (instant confirmation).</p>
                    <div className="bg-brand-50 border-l-4 border-brand-500 p-4 rounded-r-xl mt-4">
                        <p className="text-brand-900 font-bold italic">"Visi kami adalah menjadi ekosistem digital pariwisata nomor satu di Indonesia yang mendigitalkan seluruh rantai pasok B2B dan B2C."</p>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 collage-container group">
                <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden h-40 sm:h-52 shadow-md">
                        <img src="https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=600" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Tour Bromo" />
                    </div>
                    <div className="rounded-2xl overflow-hidden h-32 sm:h-40 shadow-md">
                        <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Corporate Meeting" />
                    </div>
                </div>
                <div className="space-y-4 pt-8">
                    <div className="rounded-2xl overflow-hidden h-32 sm:h-40 shadow-md">
                        <img src="https://images.unsplash.com/photo-1517441865-c32f8313bd8a?w=600" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Ijen Trip" />
                    </div>
                    <div className="rounded-2xl overflow-hidden h-40 sm:h-52 shadow-md">
                        <img src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Team Building" />
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">Nilai Inti Kami</h2>
                <p className="text-sm text-slate-500">Kompas yang menavigasi setiap keputusan dan layanan kami kepada Anda.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm text-center border-2 border-transparent hover:border-brand-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
                    <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <i className="fa-solid fa-shield-halved"></i>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-base">Integritas & Aman</h3>
                    <p className="text-xs text-slate-500">Transparansi harga tanpa biaya tersembunyi dan enkripsi data level enterprise.</p>
                </div>
                
                <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm text-center border-2 border-transparent hover:border-brand-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
                    <div className="w-16 h-16 bg-accent-50 text-accent-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-base">Kualitas Premium</h3>
                    <p className="text-xs text-slate-500">Standar seleksi vendor dan armada yang sangat ketat untuk kenyamanan Anda.</p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm text-center border-2 border-transparent hover:border-brand-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <i className="fa-solid fa-lightbulb"></i>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-base">Inovasi Digital</h3>
                    <p className="text-xs text-slate-500">Proses booking dan konfirmasi instan melalui platform berbasis SaaS kami.</p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm text-center border-2 border-transparent hover:border-brand-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
                    <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <i className="fa-solid fa-heart"></i>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-base">Berpusat Pada Anda</h3>
                    <p className="text-xs text-slate-500">Dukungan pelanggan 24/7 yang selalu siap mendengar dan melayani sepenuh hati.</p>
                </div>
            </div>
        </div>
      </section>

      {/* LEGALITY & TRUST BADGES */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-lg font-extrabold text-slate-900 mb-8 uppercase tracking-widest text-slate-400">Legalitas & Keanggotaan Resmi</h2>
            
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                    <i className="fa-solid fa-plane-departure text-4xl text-blue-600 mb-2"></i>
                    <span className="text-xs font-bold text-slate-700">ASITA Member</span>
                </div>
                <div className="flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                    <i className="fa-solid fa-earth-asia text-4xl text-green-600 mb-2"></i>
                    <span className="text-xs font-bold text-slate-700">Kemenparekraf</span>
                </div>
                <div className="flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                    <i className="fa-brands fa-aws text-4xl text-orange-500 mb-2"></i>
                    <span className="text-xs font-bold text-slate-700">AWS Cloud Secure</span>
                </div>
                <div className="flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                    <i className="fa-solid fa-certificate text-4xl text-amber-500 mb-2"></i>
                    <span className="text-xs font-bold text-slate-700">ISO 27001</span>
                </div>
            </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-12 px-4 sm:px-6 relative">
        <div className="max-w-[1000px] mx-auto bg-brand-900 rounded-[2rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-500 rounded-full mix-blend-multiply blur-3xl opacity-50"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent-500 rounded-full mix-blend-multiply blur-3xl opacity-50"></div>
            
            <div className="relative z-10 max-w-lg">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Siap Merencanakan Perjalanan Anda?</h2>
                <p className="text-sm text-brand-100 font-medium">Baik itu liburan keluarga atau agenda korporat sekala besar, tim kami siap membantu Anda.</p>
            </div>
            
            <div className="relative z-10 flex flex-col gap-3 w-full sm:w-auto">
                <Link href="/" className="px-8 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-accent-500/30 transition-all text-center whitespace-nowrap">
                    Pesan Paket Tour
                </Link>
                <Link href="/corporate" className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-xl backdrop-blur transition-all text-center whitespace-nowrap">
                    Layanan B2B
                </Link>
            </div>
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="bg-white border-t border-slate-200 mt-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 font-extrabold text-xl text-brand-900">
                <div className="w-8 h-8 rounded bg-brand-600 text-white flex items-center justify-center text-xs"><i className="fa-solid fa-paper-plane"></i></div>
                NusaTrip
            </div>
            <p className="text-xs text-slate-500 font-medium text-center md:text-left">
                PT Nusantara Trip System<br/>
                Menara BCA Lt. 32, Jl. M.H. Thamrin No. 1, Jakarta Pusat
            </p>
            <div className="flex gap-4 text-xs font-bold text-slate-500">
                <span className="hover:text-brand-600 transition-colors cursor-pointer">Syarat & Ketentuan</span>
                <span className="hover:text-brand-600 transition-colors cursor-pointer">Kebijakan Privasi</span>
            </div>
        </div>
      </footer>
    </div>
  );
}
