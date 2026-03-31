'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function AffiliateDashboardPage() {
  const [copyStatus, setCopyStatus] = useState(false);
  const { user } = useAuth();
  
  const affiliateLink = `https://nusatrip.com/ref/${user?.affiliate_code || 'demoxyz'}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopyStatus(true);
    setTimeout(() => {
        setCopyStatus(false);
    }, 2500);
  };

  return (
    <div className="text-slate-800 antialiased overflow-x-hidden bg-slate-50 min-h-screen relative">
      
      {/* Notifikasi Toast Copy */}
      <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl z-[100] font-bold text-sm flex items-center gap-3 transition-all duration-300 ${copyStatus ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px] pointer-events-none'}`}>
          <i className="fa-solid fa-circle-check text-emerald-400 text-lg"></i> 
          <span>Link Referral Berhasil Disalin!</span>
      </div>

      {/* HEADER (Dashboard Header) */}
      <header className="bg-white border-b border-slate-200 py-3 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link href="/" className="font-extrabold text-xl tracking-tighter text-brand-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-600 to-accent-500 text-white flex items-center justify-center shadow"><span className="text-sm"><i className="fa-solid fa-paper-plane"></i></span></div>
                <span className="hidden sm:block">NusaTrip</span>
            </Link>
            <div className="flex items-center gap-4 sm:gap-6">
                <button className="text-slate-400 hover:text-brand-600 transition-colors relative">
                    <i className="fa-regular fa-bell text-xl"></i>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center gap-3 border-l border-slate-200 pl-4 sm:pl-6 cursor-pointer group">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition-colors">{user?.name || 'Budi Santoso'}</p>
                        <p className="text-[10px] text-amber-500 font-bold">Mitra {user?.role === 'agent' ? 'VIP' : 'Silver'} <i className="fa-solid fa-crown ml-0.5"></i></p>
                    </div>
                    <img src={user?.avatar || "https://ui-avatars.com/api/?name=Budi+Santoso&background=e0e7ff&color=4f46e5&rounded=true&bold=true"} alt="Profile" className="w-9 h-9 rounded-full shadow-sm border border-slate-200 group-hover:border-brand-400 transition-colors" />
                    <i className="fa-solid fa-chevron-down text-[10px] text-slate-400 hidden sm:block"></i>
                </div>
            </div>
        </div>
      </header>

      {/* MAIN DASHBOARD CONTAINER */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col md:flex-row gap-6 lg:gap-8 min-h-[80vh]">
        
        {/* LEFT SIDEBAR (Navigasi Menu) */}
        <aside className="w-full md:w-[240px] flex-shrink-0">
            {/* Mobile Horizontal Nav */}
            <div className="md:hidden flex overflow-x-auto gap-2 mb-4 pb-2 border-b border-slate-200" style={{ scrollbarWidth: 'none' }}>
                <Link href="/dashboard" className="whitespace-nowrap px-4 py-2 bg-white text-slate-600 hover:bg-slate-50 font-medium text-xs rounded-full border border-slate-200">Pesanan Saya</Link>
                <Link href="/dashboard/affiliate" className="whitespace-nowrap px-4 py-2 bg-brand-50 text-brand-600 font-bold text-xs rounded-full border border-brand-200">Afiliasi Saya</Link>
                <Link href="/dashboard/wishlist" className="whitespace-nowrap px-4 py-2 bg-white text-slate-600 hover:bg-slate-50 font-medium text-xs rounded-full border border-slate-200">Wishlist</Link>
                <Link href="/dashboard/profile" className="whitespace-nowrap px-4 py-2 bg-white text-slate-600 hover:bg-slate-50 font-medium text-xs rounded-full border border-slate-200">Profil</Link>
            </div>

            {/* Desktop Vertical Nav */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden sticky top-24">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                    <img src={user?.avatar || "https://ui-avatars.com/api/?name=Budi+Santoso&background=e0e7ff&color=4f46e5&rounded=true&bold=true"} className="w-10 h-10 rounded-full shadow-sm" alt="avatar" />
                    <div>
                        <p className="font-extrabold text-brand-900 text-sm leading-none mt-0.5">{user?.name || 'Budi Santoso'}</p>
                        <p className="text-[10px] font-bold text-slate-500 mt-1">{user?.role === 'agent' ? 'Mitra Afiliasi' : 'Customer'}</p>
                    </div>
                </div>
                <nav className="flex flex-col py-3">
                    <Link href="/dashboard" className="px-5 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors font-medium flex items-center gap-3 border-l-4 border-transparent">
                        <i className="fa-solid fa-clipboard-list w-5 text-center text-slate-400"></i> Pesanan Saya
                    </Link>
                    <Link href="/dashboard/affiliate" className="px-5 py-3 text-sm text-brand-600 font-bold bg-brand-50 flex items-center gap-3 border-l-4 border-brand-600">
                        <i className="fa-solid fa-handshake-angle w-5 text-center text-brand-500"></i> Afiliasi Saya
                    </Link>
                    <Link href="/dashboard/wishlist" className="px-5 py-3 text-sm text-slate-600 font-medium hover:bg-slate-50 transition-colors flex items-center gap-3 border-l-4 border-transparent">
                        <i className="fa-regular fa-heart w-5 text-center text-slate-400"></i> Wishlist Tersimpan
                    </Link>
                    <div className="border-t border-slate-100 my-2 mx-5"></div>
                    <Link href="/dashboard/profile" className="px-5 py-3 text-sm text-slate-600 font-medium hover:bg-slate-50 transition-colors flex items-center gap-3 border-l-4 border-transparent">
                        <i className="fa-regular fa-user w-5 text-center text-slate-400"></i> Pengaturan Profil
                    </Link>
                    <Link href="/login" className="px-5 py-3 text-sm text-slate-600 font-medium flex items-center gap-3 text-red-500 hover:bg-red-50">
                        <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center"></i> Keluar
                    </Link>
                </nav>
            </div>
        </aside>

        {/* RIGHT CONTENT (Affiliate Dashboard) */}
        <div className="flex-1 w-full min-w-0">
            
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Program Afiliasi</h1>
            <p className="text-sm text-slate-500 mb-6">Sebarkan link referral Anda. Setiap transaksi sukses akan otomatis dikonversi menjadi NusaPoin.</p>

            {/* KPI STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {/* Komisi Card */}
                <div className="bg-gradient-to-br from-brand-600 to-brand-500 rounded-2xl p-5 shadow-lg shadow-brand-500/30 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full mix-blend-overlay opacity-10 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                    <p className="text-[10px] font-bold text-brand-100 uppercase tracking-widest mb-1">Estimasi Komisi (Poin)</p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold leading-none mb-1 flex items-center gap-2">
                        <i className="fa-solid fa-coins text-yellow-300 text-xl"></i> 85.000
                    </h3>
                    <p className="text-[10px] text-brand-200">Setara dengan <strong className="text-white">Rp 850.000</strong></p>
                </div>

                {/* Klik Link */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Klik Link</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-none">1.240</h3>
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center"><i className="fa-solid fa-mouse-pointer"></i></div>
                    </div>
                </div>

                {/* Transaksi Sukses */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pendaftaran / Transaksi</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-none">12</h3>
                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"><i className="fa-solid fa-check-double"></i></div>
                    </div>
                </div>
            </div>

            {/* LINK GENERATOR & SHARE */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-8">
                <h2 className="font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-link text-brand-500"></i> Link Referral Anda
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {/* Box Link */}
                    <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-3 flex items-center justify-between flex-1 w-full relative">
                        <input type="text" value={affiliateLink} className="bg-transparent border-none text-slate-800 font-bold font-mono text-sm w-full outline-none focus:ring-0" readOnly />
                        <button onClick={copyReferralLink} className={`ml-2 w-10 h-10 rounded-lg flex items-center justify-center transition-colors shadow-sm flex-shrink-0 border ${copyStatus ? 'bg-emerald-500 text-white border-transparent' : 'bg-white border-slate-200 text-brand-600 hover:bg-brand-600 hover:text-white'}`} title="Salin Link">
                            <i className={copyStatus ? "fa-solid fa-check" : "fa-regular fa-copy"}></i>
                        </button>
                    </div>
                    
                    {/* Share Buttons */}
                    <div className="flex gap-2 w-full sm:w-auto">
                        <a href={`https://wa.me/?text=Pesan liburan di NusaTrip pakai link ini dapat diskon! ${affiliateLink}`} target="_blank" className="flex-1 sm:flex-none px-4 py-2.5 bg-[#25D366] hover:bg-[#1ebc59] text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2">
                            <i className="fa-brands fa-whatsapp text-lg"></i> <span className="sm:hidden">Share</span>
                        </a>
                        <a href="#" className="flex-1 sm:flex-none w-11 h-11 bg-[#1877F2] hover:bg-[#1566cf] text-white rounded-xl shadow-md flex items-center justify-center text-lg transition-colors">
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="#" className="flex-1 sm:flex-none w-11 h-11 bg-slate-900 hover:bg-black text-white rounded-xl shadow-md flex items-center justify-center text-lg transition-colors">
                            <i className="fa-brands fa-x-twitter"></i>
                        </a>
                    </div>
                </div>
                <p className="text-[10px] text-slate-500 mt-3"><i className="fa-solid fa-circle-info text-blue-400 mr-1"></i> Bagikan link di atas. Cookie akan tersimpan 30 hari. Jika user mendaftar dan memesan, komisi otomatis masuk ke NusaPoin Anda.</p>
            </div>

            {/* TABEL RIWAYAT PENGHASILAN (KOMISI) */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                
                {/* Filter Bar Table */}
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
                    <h2 className="font-extrabold text-slate-900 text-sm">Riwayat Komisi Afiliasi</h2>
                    
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-none">
                            <select className="w-full appearance-none bg-white border border-slate-300 text-slate-600 text-xs font-bold rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-brand-500 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                                <option>Semua Status</option>
                                <option>Masuk Poin (Cair)</option>
                                <option>Pending</option>
                                <option>Batal/Refund</option>
                            </select>
                            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
                        </div>
                        <div className="relative flex-1 sm:flex-none">
                            <select className="w-full appearance-none bg-white border border-slate-300 text-slate-600 text-xs font-bold rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-brand-500 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                                <option>Bulan Ini</option>
                                <option>Bulan Lalu</option>
                                <option>Semua Waktu</option>
                            </select>
                            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
                        </div>
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto relative min-h-[200px]">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-200">
                                <th className="p-4 font-bold">Tanggal</th>
                                <th className="p-4 font-bold">Nama Paket / Layanan</th>
                                <th className="p-4 font-bold">User / Klien</th>
                                <th className="p-4 font-bold text-right">Komisi (Rp / Pts)</th>
                                <th className="p-4 font-bold text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            
                            <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                <td className="p-4 text-xs font-medium text-slate-600">20 Okt 2026</td>
                                <td className="p-4">
                                    <p className="font-bold text-slate-900 line-clamp-1 max-w-[200px]">Explore Japan Autumn</p>
                                    <span className="bg-brand-50 text-brand-600 text-[9px] font-bold px-1.5 py-0.5 rounded inline-block mt-0.5">TOUR</span>
                                </td>
                                <td className="p-4">
                                    <p className="font-bold text-slate-700 text-xs">A*** W***</p>
                                    <p className="text-[10px] text-slate-400">a***@gmail.com</p>
                                </td>
                                <td className="p-4 text-right">
                                    <p className="font-extrabold text-slate-900">Rp 450.000</p>
                                    <p className="text-[10px] font-bold text-amber-500"><i className="fa-solid fa-coins"></i> 45.000 Pts</p>
                                </td>
                                <td className="p-4 text-center">
                                    <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider"><i className="fa-solid fa-check mr-1"></i> Cair ke Poin</span>
                                </td>
                            </tr>

                            <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                <td className="p-4 text-xs font-medium text-slate-600">18 Okt 2026</td>
                                <td className="p-4">
                                    <p className="font-bold text-slate-900 line-clamp-1 max-w-[200px]">Private Tour Bromo</p>
                                    <span className="bg-brand-50 text-brand-600 text-[9px] font-bold px-1.5 py-0.5 rounded inline-block mt-0.5">TOUR</span>
                                </td>
                                <td className="p-4">
                                    <p className="font-bold text-slate-700 text-xs">S*** P***</p>
                                    <p className="text-[10px] text-slate-400">s***@yahoo.com</p>
                                </td>
                                <td className="p-4 text-right">
                                    <p className="font-extrabold text-slate-900">Rp 125.000</p>
                                    <p className="text-[10px] font-bold text-amber-500"><i className="fa-solid fa-coins"></i> 12.500 Pts</p>
                                </td>
                                <td className="p-4 text-center">
                                    <span className="bg-amber-100 text-amber-700 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider"><i className="fa-solid fa-clock mr-1"></i> Pending Trip</span>
                                </td>
                            </tr>

                            <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                <td className="p-4 text-xs font-medium text-slate-600">15 Okt 2026</td>
                                <td className="p-4">
                                    <p className="font-bold text-slate-900 line-clamp-1 max-w-[200px]">Innova Zenix Hybrid</p>
                                    <span className="bg-accent-50 text-accent-600 text-[9px] font-bold px-1.5 py-0.5 rounded inline-block mt-0.5">RENTAL MOBIL</span>
                                </td>
                                <td className="p-4">
                                    <p className="font-bold text-slate-700 text-xs">D*** M***</p>
                                    <p className="text-[10px] text-slate-400">d***@email.com</p>
                                </td>
                                <td className="p-4 text-right">
                                    <p className="font-extrabold text-slate-900">Rp 85.000</p>
                                    <p className="text-[10px] font-bold text-amber-500"><i className="fa-solid fa-coins"></i> 8.500 Pts</p>
                                </td>
                                <td className="p-4 text-center">
                                    <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider"><i className="fa-solid fa-check mr-1"></i> Cair ke Poin</span>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                {/* PAGING (PAGINATION) */}
                <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
                    <p className="text-[10px] sm:text-xs font-medium text-slate-500">Menampilkan 1-3 dari 12 konversi</p>
                    
                    <nav className="inline-flex shadow-sm rounded-lg" aria-label="Pagination">
                        <button className="relative inline-flex items-center px-2.5 py-1.5 rounded-l-lg border border-slate-200 bg-slate-50 text-sm font-medium text-slate-400 cursor-not-allowed">
                            <i className="fa-solid fa-chevron-left text-[10px]"></i>
                        </button>
                        <button className="relative inline-flex items-center px-3 py-1.5 border border-slate-200 bg-brand-600 text-xs font-extrabold text-white">1</button>
                        <button className="relative inline-flex items-center px-3 py-1.5 border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50">2</button>
                        <button className="relative inline-flex items-center px-3 py-1.5 border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50">3</button>
                        <button className="relative inline-flex items-center px-2.5 py-1.5 rounded-r-lg border border-slate-200 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-brand-600 transition-colors">
                            <i className="fa-solid fa-chevron-right text-[10px]"></i>
                        </button>
                    </nav>
                </div>

            </div>

        </div>

      </main>

      {/* FOOTER SIMPLE */}
      <footer className="border-t border-slate-200 bg-white mt-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 font-extrabold text-lg text-brand-900">
                <div className="w-6 h-6 rounded bg-brand-600 text-white flex items-center justify-center text-[10px]"><i className="fa-solid fa-n"></i></div>
                NusaTrip
            </div>
            <p className="text-xs text-slate-500 font-medium">© 2026 PT Nusantara Trip System. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
