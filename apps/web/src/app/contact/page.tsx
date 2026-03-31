'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg(false);

    setTimeout(() => {
        setIsSubmitting(false);
        setSuccessMsg(true);
        (e.target as HTMLFormElement).reset();

        setTimeout(() => { 
            setSuccessMsg(false); 
        }, 5000);
    }, 1500);
  };

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
                <Link href="/" className="text-sm font-medium text-slate-600 hover:text-brand-600">Beranda</Link>
                <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-brand-600">Tentang Kami</Link>
                <Link href="/help" className="text-sm font-medium text-slate-600 hover:text-brand-600">Pusat Bantuan</Link>
                <Link href="/contact" className="text-sm font-bold text-brand-600 border-b-2 border-brand-600 pb-1">Hubungi Kami</Link>
            </nav>
            <div className="flex items-center gap-3">
                <Link href="/" className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-lg shadow-md transition-all transform hover:-translate-y-0.5">
                    Pesan Tour
                </Link>
            </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-brand-900 py-16 sm:py-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute -top-24 left-10 w-96 h-96 bg-brand-500 rounded-full mix-blend-multiply blur-3xl"></div>
            <div className="absolute top-10 right-10 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Kami Siap Mendengar Anda</h1>
            <p className="text-brand-200 text-sm sm:text-base font-medium max-w-2xl mx-auto">Punya pertanyaan seputar paket liburan, kendala teknis, atau penawaran kerja sama? Jangan ragu untuk menyapa kami melalui saluran di bawah ini.</p>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
            
            {/* Kiri: Info Kontak & Maps */}
            <div className="w-full lg:w-5/12 bg-slate-50 p-8 sm:p-12 border-r border-slate-100 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Informasi Kontak</h2>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl flex-shrink-0 shadow-sm transition-transform group-hover:scale-110"><i className="fa-brands fa-whatsapp"></i></div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Layanan Pelanggan (24/7)</p>
                                <p className="font-bold text-slate-900 text-lg group-hover:text-green-600 transition-colors">+62 811-999-888</p>
                                <p className="text-xs text-slate-500 mt-1">Hanya melayani pesan teks WhatsApp.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xl flex-shrink-0 shadow-sm transition-transform group-hover:scale-110"><i className="fa-regular fa-envelope"></i></div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Email Dukungan</p>
                                <p className="font-bold text-slate-900 text-lg group-hover:text-brand-600 transition-colors">support@nusatrip.com</p>
                                <p className="text-xs text-slate-500 mt-1">Kami membalas dalam waktu 1x24 jam kerja.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center text-xl flex-shrink-0 shadow-sm"><i className="fa-solid fa-map-location-dot"></i></div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Kantor Pusat</p>
                                <p className="font-bold text-slate-900 text-sm">Menara BCA Lt. 32</p>
                                <p className="text-xs text-slate-600 mt-1 leading-relaxed">Jl. M.H. Thamrin No. 1, Menteng<br/>Jakarta Pusat, 10310, Indonesia</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Peta Embed (Dummy Google Maps) */}
                <div className="mt-10 rounded-xl overflow-hidden h-48 sm:h-64 shadow-md border border-slate-200">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.467472097433!2d106.82079147573516!3d-6.195248560682855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f41f71dfb9eb%3A0xc485741f231f4221!2sMenara%20BCA!5e0!3m2!1sen!2sid!4v1689255678123!5m2!1sen!2sid" width="100%" height="100%" style={{border: 0}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>

            {/* Kanan: Form Kontak */}
            <div className="w-full lg:w-7/12 bg-white p-8 sm:p-12 relative">
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Kirimkan Pesan</h3>
                <p className="text-xs text-slate-500 mb-8">Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda kembali.</p>

                <form onSubmit={submitContact} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Nama Lengkap <span className="text-red-500">*</span></label>
                            <input type="text" className="w-full bg-slate-50 text-sm rounded-lg px-4 py-3 border border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-800 font-medium transition-all" placeholder="Budi Santoso" required />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Alamat Email <span className="text-red-500">*</span></label>
                            <input type="email" className="w-full bg-slate-50 text-sm rounded-lg px-4 py-3 border border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-800 font-medium transition-all" placeholder="email@contoh.com" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Topik Pesan <span className="text-red-500">*</span></label>
                        <select className="w-full bg-slate-50 text-sm rounded-lg px-4 py-3 border border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-800 font-medium appearance-none cursor-pointer transition-all" required defaultValue="">
                            <option value="" disabled>Pilih Topik...</option>
                            <option value="tanya_paket">Pertanyaan Paket Tour / Rental</option>
                            <option value="kendala_pesanan">Kendala Pesanan & Pembayaran</option>
                            <option value="kerjasama">Penawaran Kerja Sama / Media</option>
                            <option value="lainnya">Lainnya</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Isi Pesan <span className="text-red-500">*</span></label>
                        <textarea className="w-full bg-slate-50 text-sm rounded-lg px-4 py-3 border border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-800 font-medium h-32 resize-none transition-all" placeholder="Tuliskan pesan Anda secara detail..." required></textarea>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
                        {isSubmitting ? <i className="fa-solid fa-circle-notch fa-spin"></i> : null}
                        <span>{isSubmitting ? "Mengirim..." : "Kirim Pesan Sekarang"}</span>
                    </button>
                </form>

                {/* Sukses Message */}
                <div className={`mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-bold text-center ${successMsg ? 'block' : 'hidden'}`}>
                    <i className="fa-solid fa-paper-plane text-xl mb-1"></i><br/>
                    Pesan Anda berhasil dikirim! Kami akan merespon ke email Anda secepatnya.
                </div>
            </div>
            
        </div>
      </main>

      {/* FOOTER SIMPLE */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 font-extrabold text-lg text-brand-900">
                <div className="w-8 h-8 rounded bg-brand-600 text-white flex items-center justify-center text-xs"><i className="fa-solid fa-paper-plane"></i></div>
                NusaTrip
            </div>
            <p className="text-xs text-slate-500 font-medium">© 2026 PT Nusantara Trip System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
