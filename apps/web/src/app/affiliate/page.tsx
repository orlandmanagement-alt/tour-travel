'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function AffiliateLandingPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', role_type: 'agent' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:8787/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'agent'
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal mendaftar afiliasi');
      
      setSuccessMsg(true);
      setTimeout(() => {
        login(data.token, data.user);
      }, 1500);
    } catch (err: any) {
      alert(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-slate-800 antialiased overflow-x-hidden bg-white">
      
      {/* HEADER */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 sm:py-4 sticky top-0 z-50 shadow-sm">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <Link href="/" className="font-extrabold text-xl tracking-tighter text-brand-900 flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-600 to-accent-500 text-white flex items-center justify-center shadow"><span className="text-sm"><i className="fa-solid fa-paper-plane"></i></span></div>
                  NusaTrip <span className="text-brand-600 font-light hidden sm:inline">| Partner</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                  <a href="#keuntungan" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Keuntungan</a>
                  <a href="#cara-kerja" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Cara Kerja</a>
                  <a href="#komisi" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Skema Komisi</a>
              </nav>
              <div className="flex items-center gap-3">
                  <a href="#daftar" className="px-5 py-2 sm:py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm rounded-lg shadow-md shadow-brand-500/30 transition-all transform hover:-translate-y-0.5">
                      Daftar Sekarang
                  </a>
              </div>
          </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-slate-900 pt-20 pb-32 lg:pt-24 lg:pb-36 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          
          <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
              
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                      Program Afiliasi & Keagenan
                  </span>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                      Ubah Jaringan Anda Menjadi <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-yellow-400">Pemasukan Nyata.</span>
                  </h1>
                  <p className="text-sm md:text-base text-slate-300 font-medium mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                      Bergabunglah dengan program kemitraan NusantaraTrip. Promosikan ribuan paket tour & rental mobil kami, dan dapatkan komisi instan hingga 10% untuk setiap transaksi berhasil.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                      <a href="#daftar" className="w-full sm:w-auto px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-brand-500/50 transition-all flex items-center justify-center gap-2">
                          Mulai Hasilkan Uang
                      </a>
                      <a href="#cara-kerja" className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-xl backdrop-blur transition-all text-center">
                          Pelajari Lebih Lanjut
                      </a>
                  </div>
              </div>

              {/* Hero Image / Dashboard Mockup */}
              <div className="w-full lg:w-1/2 relative">
                  <div className="bg-white rounded-2xl shadow-2xl p-2 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                      <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
                          <div className="flex justify-between items-center mb-4">
                              <h3 className="font-bold text-slate-800 text-sm">Dashboard Pendapatan</h3>
                              <span className="bg-emerald-100 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded">Bulan Ini</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                  <p className="text-[10px] text-slate-500 font-medium">Total Komisi</p>
                                  <p className="text-lg font-extrabold text-brand-600">Rp 4.520.000</p>
                              </div>
                              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                  <p className="text-[10px] text-slate-500 font-medium">Konversi Penjualan</p>
                                  <p className="text-lg font-extrabold text-slate-800">12 Transaksi</p>
                              </div>
                          </div>
                          {/* Mini chart simulation */}
                          <div className="h-20 flex items-end gap-2 pt-4">
                              <div className="w-1/6 bg-brand-200 rounded-t-sm h-1/3"></div>
                              <div className="w-1/6 bg-brand-300 rounded-t-sm h-1/2"></div>
                              <div className="w-1/6 bg-brand-400 rounded-t-sm h-2/3"></div>
                              <div className="w-1/6 bg-brand-500 rounded-t-sm h-full"></div>
                              <div className="w-1/6 bg-brand-600 rounded-t-sm h-3/4"></div>
                              <div className="w-1/6 bg-brand-400 rounded-t-sm h-1/2"></div>
                          </div>
                      </div>
                  </div>
                  
                  {/* Floating Element */}
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-lg">
                          <i className="fa-solid fa-check-double"></i>
                      </div>
                      <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">Pencairan Berhasil</p>
                          <p className="text-sm font-extrabold text-slate-900">Rp 1.200.000 ke BCA</p>
                      </div>
                  </div>
              </div>

          </div>
      </section>

      {/* CARA KERJA (How it Works) */}
      <section className="relative z-20 -mt-16 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mb-20" id="cara-kerja">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-12">
              <div className="text-center mb-10">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">3 Langkah Mudah Hasilkan Cuan</h2>
                  <p className="text-sm text-slate-500 font-medium">Tanpa modal, tanpa ribet urus operasional tour.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                  {/* Connector Line */}
                  <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-slate-100 -z-10 transform -translate-y-1/2 w-2/3 mx-auto"></div>

                  <div className="text-center relative bg-white">
                      <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border-4 border-white shadow-sm">1</div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">Daftar & Dapatkan Link</h3>
                      <p className="text-xs text-slate-500 leading-relaxed px-4">Buat akun mitra Anda secara gratis dan dapatkan Link Referral unik serta kode promo atas nama Anda.</p>
                  </div>
                  <div className="text-center relative bg-white">
                      <div className="w-16 h-16 bg-accent-50 text-accent-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border-4 border-white shadow-sm">2</div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">Sebarkan & Promosikan</h3>
                      <p className="text-xs text-slate-500 leading-relaxed px-4">Bagikan link tersebut di media sosial, blog, grup WhatsApp, atau tawarkan langsung ke klien korporat Anda.</p>
                  </div>
                  <div className="text-center relative bg-white">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border-4 border-white shadow-sm">3</div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">Terima Komisi</h3>
                      <p className="text-xs text-slate-500 leading-relaxed px-4">Setiap transaksi sukses melalui link Anda, komisi otomatis masuk ke dashboard dan siap ditarik (withdraw).</p>
                  </div>
              </div>
          </div>
      </section>

      {/* KEUNTUNGAN (Benefits) */}
      <section className="py-16 bg-slate-50 border-y border-slate-200" id="keuntungan">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">Mengapa Bermitra Bersama Kami?</h2>
                  <p className="text-sm text-slate-500">Sistem SaaS kami memastikan transparansi dan mempermudah kerja Anda sebagai agen penjualan.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center text-xl mb-5"><i className="fa-solid fa-sack-dollar"></i></div>
                      <h3 className="font-bold text-slate-900 mb-2 text-base">Komisi Kompetitif</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">Nikmati bagi hasil (commission rate) mulai dari 5% hingga 10% untuk setiap transaksi yang berhasil diselesaikan.</p>
                  </div>
                  
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                      <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-xl mb-5"><i className="fa-solid fa-chart-pie"></i></div>
                      <h3 className="font-bold text-slate-900 mb-2 text-base">Dashboard Real-Time</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">Pantau klik link, jumlah transaksi *pending* atau sukses, dan komisi masuk secara *real-time* di panel agen Anda.</p>
                  </div>

                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                      <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center text-xl mb-5"><i className="fa-solid fa-boxes-packing"></i></div>
                      <h3 className="font-bold text-slate-900 mb-2 text-base">Produk Beragam</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">Ribuan pilihan produk mulai dari Open Trip harian, Private Tour mewah, hingga layanan sewa mobil di seluruh Indonesia.</p>
                  </div>

                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                      <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center text-xl mb-5"><i className="fa-solid fa-headset"></i></div>
                      <h3 className="font-bold text-slate-900 mb-2 text-base">Terima Beres</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">Anda cukup mencari pelanggan. Urusan operasional di lapangan, asuransi, dan komplain diurus 100% oleh tim NusaTrip.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* SKEMA KOMISI & FORM PENDAFTARAN */}
      <section className="py-16 lg:py-24 bg-white" id="daftar">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-brand-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row relative">
                  
                  {/* Background Decor */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>

                  {/* Kiri: Info Komisi */}
                  <div className="w-full lg:w-5/12 p-8 lg:p-12 text-white relative z-10 flex flex-col justify-center">
                      <h2 className="text-3xl font-extrabold mb-4">Skema Komisi Transparan.</h2>
                      <p className="text-sm text-brand-100 mb-8 leading-relaxed">
                          Kami menghargai setiap usaha Anda. Semakin banyak transaksi yang Anda hasilkan, semakin tinggi persentase komisi yang Anda peroleh setiap bulannya.
                      </p>

                      <div className="space-y-4">
                          <div className="bg-white/10 border border-white/20 rounded-xl p-4 flex items-center justify-between backdrop-blur-sm">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center text-slate-700 font-bold"><i className="fa-solid fa-medal"></i></div>
                                  <div>
                                      <h4 className="font-bold text-sm">Mitra Silver</h4>
                                      <p className="text-[10px] text-brand-200">0 - 10 Transaksi / Bulan</p>
                                  </div>
                              </div>
                              <div className="text-right">
                                  <span className="font-extrabold text-xl">5%</span>
                              </div>
                          </div>

                          <div className="bg-white/10 border border-amber-400/40 rounded-xl p-4 flex items-center justify-between backdrop-blur-sm">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-white font-bold"><i className="fa-solid fa-crown"></i></div>
                                  <div>
                                      <h4 className="font-bold text-sm text-amber-300">Mitra Gold</h4>
                                      <p className="text-[10px] text-brand-200">11 - 50 Transaksi / Bulan</p>
                                  </div>
                              </div>
                              <div className="text-right">
                                  <span className="font-extrabold text-xl text-amber-300">7.5%</span>
                              </div>
                          </div>

                          <div className="bg-white/10 border border-white/20 rounded-xl p-4 flex items-center justify-between backdrop-blur-sm">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-r from-slate-200 to-slate-400 rounded-full flex items-center justify-center text-slate-800 font-bold"><i className="fa-regular fa-gem"></i></div>
                                  <div>
                                      <h4 className="font-bold text-sm text-slate-200">Mitra Platinum</h4>
                                      <p className="text-[10px] text-brand-200">&gt; 50 Transaksi / Bulan</p>
                                  </div>
                              </div>
                              <div className="text-right">
                                  <span className="font-extrabold text-xl text-slate-200">10%</span>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Kanan: Form Pendaftaran */}
                  <div className="w-full lg:w-7/12 bg-white p-8 lg:p-12 relative z-10">
                      <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Formulir Pendaftaran Mitra</h3>
                      <p className="text-xs text-slate-500 mb-6">Isi data diri Anda. Proses persetujuan akun memakan waktu maksimal 1x24 jam kerja.</p>

                      <form onSubmit={handleSubmit} className="space-y-5">
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div>
                                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Nama Lengkap / Instansi <span className="text-red-500">*</span></label>
                                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-medium transition-all shadow-sm border border-slate-200" placeholder="Sesuai KTP/Legalitas" required />
                              </div>
                              <div>
                                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Tipe Kemitraan <span className="text-red-500">*</span></label>
                                  <select value={formData.role_type} onChange={e => setFormData({...formData, role_type: e.target.value})} className="w-full bg-slate-50 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-medium appearance-none cursor-pointer transition-all shadow-sm border border-slate-200" required>
                                      <option value="" disabled>Pilih Kategori</option>
                                      <option value="individu">Individu / Freelance</option>
                                      <option value="influencer">Blogger / Influencer (KOL)</option>
                                      <option value="agent">Agen Travel Kecil</option>
                                      <option value="corporate">Perusahaan (HR / GA)</option>
                                  </select>
                              </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div>
                                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Email Aktif <span className="text-red-500">*</span></label>
                                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-medium transition-all shadow-sm border border-slate-200" placeholder="email@contoh.com" required />
                              </div>
                              <div>
                                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">No. WhatsApp <span className="text-red-500">*</span></label>
                                  <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-50 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-medium transition-all shadow-sm border border-slate-200" placeholder="0812xxxx" required />
                              </div>
                          </div>

                          <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Buat Password Akun <span className="text-red-500">*</span></label>
                              <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-slate-50 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-medium transition-all shadow-sm border border-slate-200" placeholder="Minimal 6 karakter" required minLength={6} />
                          </div>

                          <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Link Media Sosial / Website Anda</label>
                              <input type="url" className="w-full bg-slate-50 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-medium transition-all shadow-sm border border-slate-200" placeholder="https://instagram.com/akun_anda" />
                              <p className="text-[10px] text-slate-400 mt-1">Sangat disarankan untuk diisi jika Anda seorang Influencer/Blogger.</p>
                          </div>

                          <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Metode Pemasaran (Opsional)</label>
                              <textarea className="w-full bg-slate-50 text-sm rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-medium h-24 resize-none transition-all shadow-sm border border-slate-200" placeholder="Ceritakan sedikit bagaimana Anda akan memasarkan paket NusaTrip (contoh: melalui Iklan FB, share grup WA, atau tawarkan ke tamu korporat)"></textarea>
                          </div>

                          {/* Checkbox */}
                          <label className="flex items-start gap-2 cursor-pointer mt-4 group">
                              <input type="checkbox" className="mt-1 flex-shrink-0" required />
                              <span className="text-[10px] sm:text-xs text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                                  Saya setuju dengan <Link href="/help" className="text-brand-600 font-bold hover:underline">Syarat & Ketentuan Kemitraan</Link> serta memahami bahwa pencairan komisi minimum adalah Rp 200.000.
                              </span>
                          </label>

                          <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-75 disabled:cursor-not-allowed">
                              {isSubmitting ? <i className="fa-solid fa-circle-notch fa-spin"></i> : null}
                              <span>{isSubmitting ? "Memproses Data..." : "Kirim Permintaan Bergabung"}</span>
                          </button>

                      </form>

                      {/* Sukses Message */}
                      {successMsg && (
                          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-bold text-center animate-in fade-in zoom-in duration-300">
                              <i className="fa-solid fa-circle-check text-xl mb-1"></i><br />
                              Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi dan panduan login ke Dashboard Mitra.
                          </div>
                      )}

                  </div>
              </div>
          </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
              <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 font-extrabold text-lg text-brand-900">
                      <div className="w-6 h-6 rounded bg-brand-600 text-white flex items-center justify-center text-[10px]"><i className="fa-solid fa-paper-plane"></i></div>
                      NusaTrip Affiliate
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium mt-1">Divisi Kemitraan B2B PT Nusantara Trip System</p>
              </div>
              <div className="flex gap-4 text-xs font-bold text-slate-500">
                  <Link href="/login" className="hover:text-brand-600 transition-colors">Login Mitra</Link>
                  <Link href="/help" className="hover:text-brand-600 transition-colors">Bantuan</Link>
              </div>
          </div>
      </footer>

    </div>
  );
}
