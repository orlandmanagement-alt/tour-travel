'use client';

import React, { useState, useEffect } from 'react';
import UserSidebar from '@/components/UserSidebar';

export default function NusaPoinPage() {
  const [activeTab, setActiveTab] = useState('katalog');
  const [showModal, setShowModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(62.5), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleRedeem = (reward: string) => {
    setSelectedReward(reward);
    setShowModal(true);
  };

  const rewards = [
    { title: 'Diskon Rp 100.000', cat: 'Potongan Tour', desc: 'Berlaku untuk semua pemesanan Paket Tour Domestik & Internasional.', points: '10.000', icon: 'fa-plane-departure', gradient: 'from-indigo-600 to-indigo-500' },
    { title: 'Gratis Antar Jemput', cat: 'Rental Mobil', desc: 'Voucher gratis layanan supir untuk penjemputan dari Bandara ke Hotel.', points: '7.500', icon: 'fa-car', gradient: 'from-orange-500 to-orange-400' },
    { title: 'Voucher Hotel Rp 250k', cat: 'Voucher Hotel', desc: 'Potongan harga untuk pemesanan hotel di seluruh Indonesia.', points: '25.000', icon: 'fa-bed', gradient: 'from-emerald-500 to-emerald-400', locked: true }
  ];

  const history = [
    { date: '24 Okt 2026', title: 'Pembelian Paket Tour Bromo', ref: 'INV-20261024-001', pts: '+ 2.500', type: 'in' },
    { date: '20 Okt 2026', title: 'Menulis Ulasan Bali Explorer', ref: 'Review Bonus', pts: '+ 50', type: 'in' },
    { date: '15 Sep 2026', title: 'Penukaran Voucher Diskon', ref: 'Redeem #882', pts: '- 5.000', type: 'out' },
    { date: '01 Jan 2026', title: 'Pendaftaran Akun Baru', ref: 'Welcome Bonus', pts: '+ 15.000', type: 'in' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          <UserSidebar />

          <div className="flex-1 w-full min-w-0">
            {/* Membership Header Card */}
            <div className="bg-slate-900 rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden mb-10 border border-white/5">
               <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 -mr-40 -mt-40"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-screen filter blur-[80px] opacity-10 -ml-20 -mb-20"></div>

               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="text-center md:text-left space-y-4">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Total NusaPoin Anda</p>
                     <div className="flex items-center justify-center md:justify-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl shadow-[0_0_30px_rgba(249,115,22,0.4)] border-4 border-white/10">
                           <i className="fa-solid fa-coins"></i>
                        </div>
                        <div>
                           <h2 className="text-5xl font-black text-white tracking-tighter">12.500</h2>
                           <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mt-1">± Rp 125.000 VALUE</p>
                        </div>
                     </div>
                  </div>

                  <div className="w-full md:max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 lg:p-8">
                     <div className="flex justify-between items-end mb-4">
                        <div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Level</p>
                           <h3 className="text-lg font-black text-white flex items-center gap-2 tracking-tight uppercase"><i className="fa-solid fa-medal text-slate-400"></i> Silver</h3>
                        </div>
                        <div className="text-right">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Next Goal</p>
                           <h3 className="text-lg font-black text-orange-400 flex items-center gap-2 tracking-tight uppercase">Gold <i className="fa-solid fa-crown"></i></h3>
                        </div>
                     </div>
                     <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-4 shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(249,115,22,0.5)]" 
                          style={{ width: `${progress}%` }}
                        ></div>
                     </div>
                     <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest">
                       Butuh <span className="text-white">7.500 PTS</span> lagi untuk naik level!
                     </p>
                  </div>
               </div>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              {[
                { id: 'katalog', name: 'Katalog Reward', icon: 'fa-gift' },
                { id: 'riwayat', name: 'Riwayat Poin', icon: 'fa-clock-rotate-left' },
                { id: 'cara', name: 'Cara Dapat Poin', icon: 'fa-circle-question' }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-8 py-3.5 rounded-xl transition-all duration-300 whitespace-nowrap text-[10px] font-black uppercase tracking-widest ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <i className={`fa-solid ${tab.icon} text-xs`}></i>
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               {activeTab === 'katalog' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {rewards.map((reward, i) => (
                        <div key={i} className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative ${reward.locked ? 'opacity-60' : ''}`}>
                           <div className={`h-28 bg-gradient-to-br ${reward.gradient} p-6 text-white relative overflow-hidden`}>
                              <div className="absolute right-[-20px] top-[-20px] text-7xl opacity-10 rotate-12">
                                <i className={`fa-solid ${reward.icon}`}></i>
                              </div>
                              <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">{reward.cat}</p>
                              <h3 className="text-base font-black uppercase tracking-tight leading-tight">{reward.title}</h3>
                           </div>
                           <div className="p-6 space-y-6">
                              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed line-clamp-2">
                                 {reward.desc}
                              </p>
                              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                                 <div className="flex items-center gap-1.5 text-orange-500 font-black">
                                    <i className="fa-solid fa-coins"></i>
                                    <span className="text-sm tracking-tight">{reward.points} <span className="text-[9px] opacity-60">PTS</span></span>
                                 </div>
                                 <button 
                                   disabled={reward.locked}
                                   onClick={() => handleRedeem(reward.title)}
                                   className={`px-5 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${reward.locked ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 active:scale-95'}`}
                                 >
                                    Tukar Poin
                                 </button>
                              </div>
                           </div>
                           {reward.locked && (
                             <div className="absolute inset-0 bg-white/20 dark:bg-slate-900/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                                <span className="px-4 py-1.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-2xl">Poin Kurang</span>
                             </div>
                           )}
                        </div>
                     ))}
                  </div>
               )}

               {activeTab === 'riwayat' && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm overflow-hidden">
                     <div className="divide-y divide-slate-50 dark:divide-slate-800">
                        {history.map((item, i) => (
                           <div key={i} className="p-6 sm:p-8 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                              <div className="flex items-center gap-5">
                                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${item.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                                    <i className={`fa-solid ${item.type === 'in' ? 'fa-arrow-down-long' : 'fa-ticket'}`}></i>
                                 </div>
                                 <div>
                                    <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{item.title}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.date} • {item.ref}</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className={`text-sm font-black tracking-tight ${item.type === 'in' ? 'text-emerald-600' : 'text-red-500'}`}>{item.pts} <span className="text-[10px] opacity-60">PTS</span></p>
                                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Selesai</p>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="p-6 text-center border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                        <button className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] hover:tracking-[0.3em] transition-all">Muat Riwayat Lebih Banyak <i className="fa-solid fa-arrow-right ml-2"></i></button>
                     </div>
                  </div>
               )}

               {activeTab === 'cara' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                     {[
                       { icon: 'fa-cart-shopping', title: 'Belanja & Menabung', desc: 'Dapatkan 1 Poin untuk setiap pembelanjaan kelipatan Rp 1.000.', rate: '1 PTS / Rp 1rb', color: 'bg-blue-50 text-blue-600' },
                       { icon: 'fa-pen-to-square', title: 'Tulis Ulasan', desc: 'Bantu traveler lain dengan membagikan pengalaman & foto.', rate: '+ 50 PTS / Review', color: 'bg-emerald-50 text-emerald-600' },
                       { icon: 'fa-user-group', title: 'Ajak Teman', desc: 'Gunakan link referral untuk mendapatkan bonus poin bersama.', rate: '+ 5.000 PTS / Teman', color: 'bg-purple-50 text-purple-600' }
                     ].map((item, i) => (
                       <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 text-center shadow-sm hover:shadow-xl transition-all duration-500 group">
                          <div className={`w-20 h-20 ${item.color} rounded-[2rem] flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}>
                             <i className={`fa-solid ${item.icon}`}></i>
                          </div>
                          <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">{item.title}</h3>
                          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] leading-relaxed mb-6">
                             {item.desc}
                          </p>
                          <span className={`inline-block px-5 py-2 ${item.color} font-black text-[10px] uppercase tracking-widest rounded-xl transition-all`}>{item.rate}</span>
                       </div>
                     ))}
                  </div>
               )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Success */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden border border-white/10">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600"></div>
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center text-3xl mx-auto mb-6 shadow-xl shadow-emerald-500/10">
                 <i className="fa-solid fa-check"></i>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3 uppercase">Redeem Berhasil!</h2>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 italic uppercase tracking-widest leading-relaxed mb-8">
                Anda berhasil menukar poin dengan <span className="text-slate-800 dark:text-white">{selectedReward}</span>. Kode voucher akan dikirimkan ke email Anda.
              </p>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full py-4 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95"
              >
                Lihat Voucher Saya
              </button>
           </div>
        </div>
      )}

    </div>
  );
}
