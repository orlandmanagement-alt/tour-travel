'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type TabType = 'tab-terms' | 'tab-privacy' | 'tab-refund' | 'tab-cookie';

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<TabType>('tab-terms');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'tab-terms', label: 'Syarat & Ketentuan' },
    { id: 'tab-privacy', label: 'Kebijakan Privasi' },
    { id: 'tab-refund', label: 'Kebijakan Refund' },
    { id: 'tab-cookie', label: 'Kebijakan Cookie' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      
      {/* Hero Section */}
      <section className="bg-[#0F172A] py-16 sm:py-24 relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-500 rounded-full blur-[80px]"></div>
         </div>
         <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 space-y-6">
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-none">Pusat Kebijakan <br /><span className="text-indigo-500">& Legalitas</span></h1>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest max-w-2xl leading-relaxed">Informasi penting mengenai hak dan kewajiban Anda saat menggunakan platform NusantaraTrip.</p>
         </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-12 items-start">
         
         {/* Sidebar Navigation */}
         <aside className="w-full md:w-80 flex-shrink-0 sticky top-32 space-y-8">
            
            {/* Mobile Dropdown */}
            <div className="md:hidden">
               <select 
                 value={activeTab} 
                 onChange={(e) => setActiveTab(e.target.value as TabType)}
                 className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-white/5 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-indigo-600/10"
               >
                  {tabs.map(tab => <option key={tab.id} value={tab.id}>{tab.label}</option>)}
               </select>
            </div>

            {/* Desktop List */}
            <div className="hidden md:block bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-4 shadow-sm overflow-hidden">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-6 pt-6 pb-4">Dokumen Legal</p>
               <nav className="space-y-1 pb-4">
                  {tabs.map(tab => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                       {tab.label}
                    </button>
                  ))}
               </nav>
            </div>

            {/* Help Box */}
            <div className="hidden md:block bg-slate-900 rounded-[2.5rem] p-8 text-center space-y-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700"></div>
               <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center text-xl mx-auto shadow-lg"><i className="fa-solid fa-scale-balanced"></i></div>
               <div className="space-y-2">
                  <h3 className="text-sm font-black text-white uppercase tracking-tight">Butuh Bantuan Hukum?</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">Tim kepatuhan kami siap menjawab pertanyaan Anda terkait dokumen ini.</p>
               </div>
               <a href="mailto:legal@nusatrip.com" className="block w-full py-4 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">Hubungi Tim Legal</a>
            </div>
         </aside>

         {/* Content Display */}
         <div className="flex-1 w-full min-w-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 sm:p-16 shadow-sm legal-content">
            
            {activeTab === 'tab-terms' && (
              <div className="animate-in fade-in duration-500">
                 <div className="border-b border-slate-100 dark:border-slate-800 pb-10 mb-10">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-4">Syarat & Ketentuan Penggunaan</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Terakhir diperbarui: <span className="text-indigo-600">12 Oktober 2026</span></p>
                 </div>
                 <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em] leading-relaxed">
                    <p>Selamat datang di NusantaraTrip. Syarat dan Ketentuan ini (&quot;Ketentuan&quot;) mengatur akses dan penggunaan Anda atas situs web, aplikasi mobile, dan layanan yang disediakan oleh <strong className="text-slate-900 dark:text-white">PT Nusantara Trip System</strong>.</p>
                    <p>Dengan mengakses atau menggunakan platform kami, Anda setuju untuk terikat oleh Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari ketentuan, maka Anda tidak diizinkan untuk mengakses layanan kami.</p>

                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mt-12 mb-4 border-l-4 border-indigo-600 pl-4">1. Definisi Layanan</h3>
                    <p>NusantaraTrip bertindak sebagai platform <em className="text-indigo-600">Software as a Service (SaaS)</em> dan Agen Perjalanan Online (OTA) yang memfasilitasi pemesanan paket wisata, penyewaan kendaraan, dan layanan korporat.</p>

                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mt-12 mb-4 border-l-4 border-indigo-600 pl-4">2. Akun Pengguna</h3>
                    <ul className="list-disc pl-6 space-y-4">
                       <li>Anda harus berusia minimal 18 tahun untuk melakukan transaksi.</li>
                       <li>Anda bertanggung jawab penuh menjaga kerahasiaan kata sandi akun Anda.</li>
                       <li>NusantaraTrip tidak bertanggung jawab atas kerugian akibat kelalaian keamanan pengguna.</li>
                    </ul>

                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mt-12 mb-4 border-l-4 border-indigo-600 pl-4">3. Hak Intelektual</h3>
                    <p>Seluruh desain antarmuka, logo, teks, dan kode perangkat lunak adalah hak cipta milik PT Nusantara Trip System. Dilarang keras menyalin atau melakukan <em className="text-indigo-600">scraping</em> data tanpa izin tertulis.</p>
                 </div>
              </div>
            )}

            {activeTab === 'tab-privacy' && (
              <div className="animate-in fade-in duration-500">
                 <div className="border-b border-slate-100 dark:border-slate-800 pb-10 mb-10">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-4">Kebijakan Privasi</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Terakhir diperbarui: <span className="text-indigo-600">12 Oktober 2026</span></p>
                 </div>
                 <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em] leading-relaxed">
                    <p>Privasi Anda sangat penting bagi kami. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, melindungi, dan membagikan data pribadi Anda.</p>
                    
                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mt-12 mb-4 border-l-4 border-indigo-600 pl-4">1. Data yang Dikumpulkan</h3>
                    <ul className="list-disc pl-6 space-y-4">
                       <li><strong className="text-slate-900 dark:text-white">Data Pribadi:</strong> Nama, email, nomor HP, dan KTP.</li>
                       <li><strong className="text-slate-900 dark:text-white">Data Transaksi:</strong> Riwayat sewa dan metode bayar (terenkripsi).</li>
                       <li><strong className="text-slate-900 dark:text-white">Data Perangkat:</strong> Alamat IP, jenis browser, dan log aktivitas.</li>
                    </ul>

                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mt-12 mb-4 border-l-4 border-indigo-600 pl-4">2. Keamanan Data</h3>
                    <p>Kami menggunakan enkripsi SSL/TLS 256-bit dan infrastruktur AWS yang mematuhi standar ISO 27001 untuk menjaga data Anda.</p>
                 </div>
              </div>
            )}

            {activeTab === 'tab-refund' && (
              <div className="animate-in fade-in duration-500">
                 <div className="border-b border-slate-100 dark:border-slate-800 pb-10 mb-10">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-4">Kebijakan Refund</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Terakhir diperbarui: <span className="text-indigo-600">01 Agustus 2026</span></p>
                 </div>
                 <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em] leading-relaxed">
                    <p>Kami memiliki kebijakan pembatalan yang transparan dan adil bagi pelanggan dan jaringan mitra operasional kami.</p>

                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mt-12 mb-4 border-l-4 border-indigo-600 pl-4">1. Paket Tour</h3>
                    <ul className="list-disc pl-6 space-y-4">
                       <li><strong className="text-indigo-600">H {'>'} 14 Hari:</strong> Refund 100% utuh.</li>
                       <li><strong className="text-indigo-600">H 7 - 14 Hari:</strong> Refund 50% dari total tagihan.</li>
                       <li><strong className="text-indigo-600">H {'<'} 7 Hari:</strong> NO REFUND (Hangus).</li>
                    </ul>

                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mt-12 mb-4 border-l-4 border-indigo-600 pl-4">2. Sewa Mobil</h3>
                    <p>Pembatalan maksimal H-2 keberangkatan untuk mendapatkan pengembalian dana penuh. Pembatalan hari H dikenakan denda sewa 1 hari.</p>
                 </div>
              </div>
            )}

            {activeTab === 'tab-cookie' && (
              <div className="animate-in fade-in duration-500">
                 <div className="border-b border-slate-100 dark:border-slate-800 pb-10 mb-10">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-4">Kebijakan Cookie</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Terakhir diperbarui: <span className="text-indigo-600">05 Februari 2026</span></p>
                 </div>
                 <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em] leading-relaxed">
                    <p>Cookie membantu kami memberikan pengalaman yang lebih personal saat Anda menggunakan ekosistem digital NusantaraTrip.</p>

                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mt-12 mb-4 border-l-4 border-indigo-600 pl-4">1. Jenis Cookie</h3>
                    <ul className="list-disc pl-6 space-y-4">
                       <li><strong className="text-slate-900 dark:text-white">Esensial:</strong> Wajib ada untuk fungsi login dan cart.</li>
                       <li><strong className="text-slate-900 dark:text-white">Analitik:</strong> Memahami performa situs (Google Analytics).</li>
                       <li><strong className="text-slate-900 dark:text-white">Marketing:</strong> Menyajikan iklan yang relevan (Retargeting).</li>
                    </ul>
                 </div>
              </div>
            )}

         </div>
      </main>

    </div>
  );
}
