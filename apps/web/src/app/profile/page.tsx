'use client';

import React, { useState } from 'react';
import UserSidebar from '@/components/UserSidebar';

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState('pribadi');
  const [showToast, setShowToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          <UserSidebar />

          <div className="flex-1 w-full min-w-0">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2 uppercase">Pengaturan Akun</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold italic">Kelola informasi pribadi, keamanan, dan preferensi akun Anda.</p>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              {[
                { id: 'pribadi', name: 'Data Pribadi', icon: 'fa-user' },
                { id: 'keamanan', name: 'Keamanan & Password', icon: 'fa-shield-halved' },
                { id: 'notifikasi', name: 'Notifikasi', icon: 'fa-bell' }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap text-[10px] font-black uppercase tracking-widest ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <i className={`fa-solid ${tab.icon} text-xs`}></i>
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {activeTab === 'pribadi' && (
                <form onSubmit={handleSave} className="p-8 sm:p-10 space-y-8">
                  {/* Photo Profile */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 pb-8 border-b border-slate-50 dark:border-slate-800">
                    <div className="relative group cursor-pointer shrink-0">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                         <img src="https://ui-avatars.com/api/?name=Budi+Santoso&background=eef2ff&color=4f46e5&rounded=true&bold=true&size=128" alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="absolute inset-0 bg-slate-900/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <i className="fa-solid fa-camera text-white text-xl"></i>
                      </div>
                    </div>
                    <div className="text-center sm:text-left space-y-2">
                       <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">Foto Profil</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">JPG, PNG atau GIF. Max 2MB.</p>
                       <div className="flex gap-2 pt-2">
                          <button type="button" className="px-5 py-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-all">Ganti Foto</button>
                          <button type="button" className="px-5 py-2 text-red-500 font-bold text-[10px] uppercase tracking-widest hover:bg-red-50 rounded-xl transition-all">Hapus</button>
                       </div>
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Nama Depan <span className="text-red-500">*</span></label>
                       <input type="text" defaultValue="Budi" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 dark:text-white focus:ring-4 focus:ring-indigo-600/10 transition-all outline-none" required />
                    </div>
                    <div className="space-y-2">
                       <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Nama Belakang</label>
                       <input type="text" defaultValue="Santoso" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 dark:text-white focus:ring-4 focus:ring-indigo-600/10 transition-all outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Alamat Email</label>
                       <div className="relative">
                          <input type="email" value="budi.santoso@email.com" readOnly className="w-full bg-slate-100 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-400 dark:text-slate-600 outline-none cursor-not-allowed" />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase rounded-lg"><i className="fa-solid fa-check"></i> Verified</span>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">No. Handphone <span className="text-red-500">*</span></label>
                       <div className="flex gap-2">
                          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl px-5 py-4 text-sm font-black text-slate-400">+62</div>
                          <input type="tel" defaultValue="81234567890" className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 dark:text-white focus:ring-4 focus:ring-indigo-600/10 transition-all outline-none" required />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tanggal Lahir</label>
                       <input type="date" defaultValue="1990-05-15" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 dark:text-white focus:ring-4 focus:ring-indigo-600/10 transition-all outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Jenis Kelamin</label>
                       <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 dark:text-white focus:ring-4 focus:ring-indigo-600/10 transition-all outline-none appearance-none">
                         <option value="L">Laki-laki</option>
                         <option value="P">Perempuan</option>
                       </select>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end border-t border-slate-50 dark:border-slate-800">
                    <button type="submit" className="px-10 py-4 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all">Simpan Perubahan</button>
                  </div>
                </form>
              )}

              {activeTab === 'keamanan' && (
                <form onSubmit={handleSave} className="p-8 sm:p-10 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">Ganti Password</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pastikan gunakan kombinasi yang sulit ditebak.</p>
                  </div>

                  <div className="max-w-md space-y-6">
                    <div className="space-y-2">
                       <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Password Saat Ini</label>
                       <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-600/10 transition-all outline-none" required />
                    </div>
                    <div className="space-y-2">
                       <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Password Baru</label>
                       <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-600/10 transition-all outline-none" required />
                    </div>
                    <div className="space-y-2">
                       <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Konfirmasi Password Baru</label>
                       <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-600/10 transition-all outline-none" required />
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end border-t border-slate-50 dark:border-slate-800">
                    <button type="submit" className="px-10 py-4 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all">Update Password</button>
                  </div>
                </form>
              )}

              {activeTab === 'notifikasi' && (
                <div className="p-8 sm:p-10 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">Preferensi Notifikasi</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kelola bagaimana kami menghubungi Anda.</p>
                  </div>

                  <div className="space-y-1">
                    {[
                      { title: 'Promo & Flash Sale', desc: 'Dapatkan info diskon eksklusif dan voucher harian.', active: true },
                      { title: 'Pusat Bantuan', desc: 'Update tentang tiket komplain atau pertanyaan Anda.', active: true },
                      { title: 'NusaPoin & Rewards', desc: 'Info poin hangus dan kenaikan level membership.', active: true },
                      { title: 'News & Article', desc: 'Inspirasi liburan dan panduan wisata terbaru.', active: false },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-5 border-b border-slate-50 dark:border-slate-800 last:border-none">
                        <div>
                           <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tight">{item.title}</h4>
                           <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-widest">{item.desc}</p>
                        </div>
                        <button className={`w-12 h-6 rounded-full transition-all flex items-center p-1 ${item.active ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`}>
                           <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${item.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 flex justify-end border-t border-slate-50 dark:border-slate-800">
                    <button onClick={() => setShowToast(true)} className="px-10 py-4 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all">Simpan Preferensi</button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 right-10 z-[100] animate-in slide-in-from-right-10 fade-in duration-500">
           <div className="bg-slate-900 text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                 <i className="fa-solid fa-check"></i>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest">Berhasil!</p>
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Profil Anda telah diperbarui.</p>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
