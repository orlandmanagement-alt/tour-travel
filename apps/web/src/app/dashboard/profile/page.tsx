'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState('tab-personal');
  const [showPwdOld, setShowPwdOld] = useState(false);
  const [showPwdNew, setShowPwdNew] = useState(false);
  const [showPwdConfirm, setShowPwdConfirm] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
        setIsSaving(false);
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 3000);
    }, 1000);
  };

  return (
    <div className="text-slate-800 antialiased overflow-x-hidden bg-slate-50 min-h-screen relative">

      {/* Notifikasi Sukses Global */}
      <div className={`fixed bottom-5 right-5 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl z-[100] font-bold text-sm flex items-center gap-3 transition-all duration-300 ${successMsg ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <i className="fa-solid fa-circle-check text-emerald-400 text-lg"></i> 
          <span>Pengaturan berhasil disimpan!</span>
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
                        <p className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition-colors">Budi Santoso</p>
                        <p className="text-[10px] text-slate-500 font-medium">Member Silver <i className="fa-solid fa-medal text-slate-400 ml-0.5"></i></p>
                    </div>
                    <img src="https://ui-avatars.com/api/?name=Budi+Santoso&background=e0e7ff&color=4f46e5&rounded=true&bold=true" alt="Profile" className="w-9 h-9 rounded-full shadow-sm border border-slate-200 group-hover:border-brand-400 transition-colors" />
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
                <Link href="/dashboard/affiliate" className="whitespace-nowrap px-4 py-2 bg-white text-slate-600 hover:bg-slate-50 font-medium text-xs rounded-full border border-slate-200">Afiliasi Saya</Link>
                <Link href="/dashboard/wishlist" className="whitespace-nowrap px-4 py-2 bg-white text-slate-600 hover:bg-slate-50 font-medium text-xs rounded-full border border-slate-200">Wishlist</Link>
                <Link href="/dashboard/profile" className="whitespace-nowrap px-4 py-2 bg-brand-50 text-brand-600 font-bold text-xs rounded-full border border-brand-200">Profil</Link>
            </div>

            {/* Desktop Vertical Nav */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden sticky top-24">
                <div className="p-5 border-b border-slate-100 bg-brand-50/50 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-amber-600 text-xl shadow-sm">
                        <i className="fa-solid fa-coins"></i>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">NusaPoin</p>
                        <p className="font-extrabold text-brand-900 text-lg leading-none mt-0.5">12.500</p>
                    </div>
                </div>
                <nav className="flex flex-col py-3">
                    <Link href="/dashboard" className="px-5 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors font-medium flex items-center gap-3 border-l-4 border-transparent">
                        <i className="fa-solid fa-clipboard-list w-5 text-center text-slate-400"></i> Pesanan Saya
                    </Link>
                    <Link href="/dashboard/affiliate" className="px-5 py-3 text-sm text-slate-600 font-medium hover:bg-slate-50 transition-colors flex items-center gap-3 border-l-4 border-transparent">
                        <i className="fa-solid fa-handshake-angle w-5 text-center text-slate-400"></i> Afiliasi Saya
                    </Link>
                    <Link href="/dashboard/wishlist" className="px-5 py-3 text-sm text-slate-600 font-medium hover:bg-slate-50 transition-colors flex items-center gap-3 border-l-4 border-transparent">
                        <i className="fa-regular fa-heart w-5 text-center text-slate-400"></i> Wishlist Tersimpan
                    </Link>
                    <div className="border-t border-slate-100 my-2 mx-5"></div>
                    <Link href="/dashboard/profile" className="px-5 py-3 text-sm text-brand-600 font-bold bg-brand-50 flex items-center gap-3 border-l-4 border-brand-600">
                        <i className="fa-regular fa-user w-5 text-center text-brand-500"></i> Pengaturan Profil
                    </Link>
                    <Link href="/login" className="px-5 py-3 text-sm text-slate-600 font-medium flex items-center gap-3 text-red-500 hover:bg-red-50">
                        <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center"></i> Keluar
                    </Link>
                </nav>
            </div>
        </aside>

        {/* RIGHT CONTENT (Form Pengaturan Profil) */}
        <div className="flex-1 w-full min-w-0">
            
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Pengaturan Akun</h1>
            <p className="text-sm text-slate-500 mb-6">Kelola informasi pribadi, keamanan, dan preferensi akun Anda.</p>

            {/* TABS PENGATURAN */}
            <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-200 mb-6" style={{ scrollbarWidth: 'none' }}>
                <button className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-bottom border-b-2 ${activeTab === 'tab-personal' ? 'border-brand-600 text-brand-600 font-bold' : 'border-transparent text-slate-500'}`} onClick={() => setActiveTab('tab-personal')}>Data Pribadi</button>
                <button className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-bottom border-b-2 ${activeTab === 'tab-security' ? 'border-brand-600 text-brand-600 font-bold' : 'border-transparent text-slate-500'}`} onClick={() => setActiveTab('tab-security')}>Keamanan & Password</button>
                <button className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-bottom border-b-2 ${activeTab === 'tab-notification' ? 'border-brand-600 text-brand-600 font-bold' : 'border-transparent text-slate-500'}`} onClick={() => setActiveTab('tab-notification')}>Preferensi Notifikasi</button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                
                {/* TAB 1: DATA PRIBADI */}
                {activeTab === 'tab-personal' && (
                  <div className="block">
                      <form onSubmit={handleSave} className="p-5 sm:p-8">
                          
                          {/* Avatar Section */}
                          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-slate-100 group">
                              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer bg-slate-100 flex-shrink-0">
                                  <img src="https://ui-avatars.com/api/?name=Budi+Santoso&background=e0e7ff&color=4f46e5&rounded=true&bold=true&size=128" alt="Profile" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <i className="fa-solid fa-camera text-white text-xl"></i>
                                  </div>
                              </div>
                              <div className="text-center sm:text-left">
                                  <h3 className="font-bold text-slate-900 text-lg">Foto Profil</h3>
                                  <p className="text-xs text-slate-500 mt-1 mb-3">Format JPG, PNG atau GIF. Ukuran maksimal 2MB.</p>
                                  <div className="flex justify-center sm:justify-start gap-2">
                                      <button type="button" className="px-4 py-2 bg-brand-50 text-brand-600 font-bold text-xs rounded-lg hover:bg-brand-100 transition-colors">Ubah Foto</button>
                                      <button type="button" className="px-4 py-2 bg-white border border-slate-200 text-red-500 hover:bg-red-50 font-bold text-xs rounded-lg transition-colors">Hapus</button>
                                  </div>
                              </div>
                          </div>

                          {/* Form Fields */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                              <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Depan <span className="text-red-500">*</span></label>
                                  <input type="text" className="w-full bg-white border border-slate-300 text-sm rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" defaultValue="Budi" required />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Belakang</label>
                                  <input type="text" className="w-full bg-white border border-slate-300 text-sm rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" defaultValue="Santoso" />
                              </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                              <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Alamat Email <span className="text-red-500">*</span></label>
                                  <div className="relative">
                                      <input type="email" className="w-full bg-slate-50 border border-slate-200 text-sm rounded-lg px-4 py-2.5 text-slate-500 cursor-not-allowed" defaultValue="budi.santoso@email.com" readOnly />
                                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded"><i className="fa-solid fa-check mr-1"></i>Terverifikasi</span>
                                  </div>
                                  <p className="text-[10px] text-slate-400 mt-1">Email tidak dapat diubah. Hubungi CS untuk bantuan.</p>
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Nomor Handphone <span className="text-red-500">*</span></label>
                                  <div className="flex">
                                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm font-medium">+62</span>
                                      <input type="tel" className="flex-1 w-full bg-white border border-slate-300 text-sm rounded-r-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" defaultValue="81234567890" required />
                                  </div>
                              </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                              <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Tanggal Lahir</label>
                                  <input type="date" className="w-full bg-white border border-slate-300 text-sm rounded-lg px-4 py-2.5 text-slate-800 cursor-pointer focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" defaultValue="1990-05-15" />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Jenis Kelamin</label>
                                  <select className="w-full bg-white border border-slate-300 text-sm rounded-lg px-4 py-2.5 text-slate-800 appearance-none cursor-pointer focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" defaultValue="l">
                                      <option value="l">Laki-laki</option>
                                      <option value="p">Perempuan</option>
                                      <option value="o">Lainnya / Tidak ingin menyebutkan</option>
                                  </select>
                              </div>
                          </div>

                          <div className="flex justify-end pt-5 border-t border-slate-100">
                              <button type="submit" disabled={isSaving} className="px-8 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 min-w-[180px]">
                                  {isSaving ? <i className="fa-solid fa-circle-notch fa-spin"></i> : null}
                                  <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
                              </button>
                          </div>
                      </form>
                  </div>
                )}

                {/* TAB 2: KEAMANAN & PASSWORD */}
                {activeTab === 'tab-security' && (
                  <div className="block">
                      <form onSubmit={handleSave} className="p-5 sm:p-8">
                          <h3 className="font-bold text-slate-900 text-lg mb-2">Ubah Kata Sandi</h3>
                          <p className="text-xs text-slate-500 mb-6 pb-6 border-b border-slate-100">Pastikan akun Anda menggunakan kata sandi yang kuat (kombinasi huruf, angka, dan simbol).</p>
                          
                          <div className="max-w-md space-y-5 mb-8">
                              <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Password Saat Ini</label>
                                  <div className="relative">
                                      <input type={showPwdOld ? "text" : "password"} className="w-full bg-white border border-slate-300 text-sm rounded-lg px-4 py-2.5 text-slate-800 pr-10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" required />
                                      <button type="button" onClick={() => setShowPwdOld(!showPwdOld)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-brand-600 focus:outline-none">
                                          <i className={`fa-regular ${showPwdOld ? 'fa-eye' : 'fa-eye-slash'} text-sm`}></i>
                                      </button>
                                  </div>
                              </div>
                              
                              <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Password Baru</label>
                                  <div className="relative">
                                      <input type={showPwdNew ? "text" : "password"} className="w-full bg-white border border-slate-300 text-sm rounded-lg px-4 py-2.5 text-slate-800 pr-10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" required />
                                      <button type="button" onClick={() => setShowPwdNew(!showPwdNew)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-brand-600 focus:outline-none">
                                          <i className={`fa-regular ${showPwdNew ? 'fa-eye' : 'fa-eye-slash'} text-sm`}></i>
                                      </button>
                                  </div>
                                  <p className="text-[10px] text-slate-400 mt-1">Minimal 8 karakter.</p>
                              </div>

                              <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Konfirmasi Password Baru</label>
                                  <div className="relative">
                                      <input type={showPwdConfirm ? "text" : "password"} className="w-full bg-white border border-slate-300 text-sm rounded-lg px-4 py-2.5 text-slate-800 pr-10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" required />
                                      <button type="button" onClick={() => setShowPwdConfirm(!showPwdConfirm)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-brand-600 focus:outline-none">
                                          <i className={`fa-regular ${showPwdConfirm ? 'fa-eye' : 'fa-eye-slash'} text-sm`}></i>
                                      </button>
                                  </div>
                              </div>
                          </div>

                          <div className="flex justify-end pt-5 border-t border-slate-100">
                              <button type="submit" disabled={isSaving} className="px-8 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 min-w-[180px]">
                                  {isSaving ? <i className="fa-solid fa-circle-notch fa-spin"></i> : null}
                                  <span>{isSaving ? "Menyimpan..." : "Update Password"}</span>
                              </button>
                          </div>
                      </form>
                  </div>
                )}

                {/* TAB 3: PREFERENSI NOTIFIKASI */}
                {activeTab === 'tab-notification' && (
                  <div className="block">
                      <form onSubmit={handleSave} className="p-5 sm:p-8">
                          <h3 className="font-bold text-slate-900 text-lg mb-2">Pengaturan Notifikasi</h3>
                          <p className="text-xs text-slate-500 mb-6 pb-6 border-b border-slate-100">Pilih jenis informasi yang ingin Anda terima dari kami melalui Email atau WhatsApp.</p>
                          
                          <div className="space-y-6 mb-8">
                              
                              <div className="flex items-center justify-between">
                                  <div>
                                      <h4 className="font-bold text-slate-800 text-sm">Info Pesanan & Transaksi</h4>
                                      <p className="text-xs text-slate-500 mt-0.5">E-Ticket, invoice, dan status pembayaran (Wajib).</p>
                                  </div>
                                  <label className="relative inline-flex items-center">
                                      <input type="checkbox" className="sr-only peer" checked disabled readOnly />
                                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-400 opacity-70"></div>
                                  </label>
                              </div>

                              <div className="flex items-center justify-between">
                                  <div>
                                      <h4 className="font-bold text-slate-800 text-sm">Promo Spesial & Diskon</h4>
                                      <p className="text-xs text-slate-500 mt-0.5">Penawaran eksklusif, flash sale, dan kode voucher.</p>
                                  </div>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                      <input type="checkbox" className="sr-only peer" defaultChecked />
                                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                                  </label>
                              </div>

                              <div className="flex items-center justify-between">
                                  <div>
                                      <h4 className="font-bold text-slate-800 text-sm">NusaPoin & Membership</h4>
                                      <p className="text-xs text-slate-500 mt-0.5">Update poin yang hangus atau naik level membership.</p>
                                  </div>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                      <input type="checkbox" className="sr-only peer" defaultChecked />
                                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                                  </label>
                              </div>

                              <div className="flex items-center justify-between">
                                  <div>
                                      <h4 className="font-bold text-slate-800 text-sm">Artikel Travel & Rekomendasi</h4>
                                      <p className="text-xs text-slate-500 mt-0.5">Inspirasi liburan dan panduan wisata terbaru.</p>
                                  </div>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                      <input type="checkbox" className="sr-only peer" />
                                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                                  </label>
                              </div>

                          </div>

                          <div className="flex justify-end pt-5 border-t border-slate-100">
                              <button type="submit" disabled={isSaving} className="px-8 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 min-w-[180px]">
                                  {isSaving ? <i className="fa-solid fa-circle-notch fa-spin"></i> : null}
                                  <span>{isSaving ? "Menyimpan..." : "Simpan Preferensi"}</span>
                              </button>
                          </div>
                      </form>
                  </div>
                )}

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
