'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CorporatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const submitRFQ = (e: React.FormEvent) => {
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
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur shadow-sm border-b border-slate-200 py-3">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="font-extrabold text-xl tracking-tighter text-brand-900 flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-slate-800 to-brand-900 text-white flex items-center justify-center shadow">
              <span className="text-sm"><i className="fa-solid fa-building"></i></span>
            </div>
            NusaTrip <span className="text-brand-600 font-light hidden sm:inline">| Enterprise</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#layanan" className="text-sm font-medium text-slate-600 hover:text-brand-600">Layanan Kami</a>
            <a href="#keunggulan" className="text-sm font-medium text-slate-600 hover:text-brand-600">Mengapa Kami?</a>
            <a href="#klien" className="text-sm font-medium text-slate-600 hover:text-brand-600">Klien</a>
          </nav>

          <a href="#rfq-form" className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-2">
            Minta Penawaran <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1600" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" alt="Corporate Gathering" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded bg-white/10 border border-white/20 text-brand-200 text-[10px] font-bold uppercase tracking-widest mb-4">
              Solusi Perjalanan Bisnis
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Corporate Gathering & <span className="text-accent-400">Team Building</span> Impian.
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-medium mb-8 leading-relaxed max-w-xl">
              Tingkatkan produktivitas dan keakraban tim Anda melalui pengalaman perjalanan perusahaan yang dirancang khusus, aman, dan tanpa repot. Dari konsep hingga eksekusi, kami urus semuanya.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#rfq-form" className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-bold text-sm rounded-lg shadow-lg transition-all">
                Dapatkan Proposal Gratis
              </a>
              <a href="#" className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-lg backdrop-blur transition-all">
                <i className="fa-solid fa-play text-xs mr-2"></i> Lihat Portofolio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES / CLIENT LOGOS */}
      <section className="py-8 border-b border-slate-200 bg-slate-50" id="klien">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dipercaya oleh 500+ Perusahaan, BUMN, & Instansi</p>
        </div>
        	{/* Note: Simplified Marquee w/ text for React */}
        <div className="overflow-hidden whitespace-nowrap w-full relative">
          <div className="inline-block animate-[marquee_25s_linear_infinite] flex gap-12 items-center px-6">
            <div className="text-2xl font-black text-slate-300 flex items-center gap-2 grayscale"><i className="fa-brands fa-aws"></i> AWS</div>
            <div className="text-2xl font-black text-slate-300 flex items-center gap-2 grayscale"><i className="fa-brands fa-google"></i> Google</div>
            <div className="text-2xl font-black text-slate-300 flex items-center gap-2 grayscale"><i className="fa-brands fa-microsoft"></i> Microsoft</div>
            <div className="text-2xl font-black text-slate-300 flex items-center gap-2 grayscale"><i className="fa-brands fa-stripe"></i> Stripe</div>
            <div className="text-2xl font-black text-slate-300 flex items-center gap-2 grayscale"><i className="fa-brands fa-slack"></i> Slack</div>
            
            <div className="text-2xl font-black text-slate-300 flex items-center gap-2 grayscale"><i className="fa-brands fa-aws"></i> AWS</div>
            <div className="text-2xl font-black text-slate-300 flex items-center gap-2 grayscale"><i className="fa-brands fa-google"></i> Google</div>
            <div className="text-2xl font-black text-slate-300 flex items-center gap-2 grayscale"><i className="fa-brands fa-microsoft"></i> Microsoft</div>
            <div className="text-2xl font-black text-slate-300 flex items-center gap-2 grayscale"><i className="fa-brands fa-stripe"></i> Stripe</div>
            <div className="text-2xl font-black text-slate-300 flex items-center gap-2 grayscale"><i className="fa-brands fa-slack"></i> Slack</div>
          </div>
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section className="py-16 lg:py-24 bg-white" id="keunggulan">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">Standar Enterprise untuk Kepuasan Maksimal</h2>
            <p className="text-sm text-slate-500">Kami memahami bahwa mengurus perjalanan perusahaan memiliki tantangan tersendiri. Kami hadir untuk membuat semuanya efisien dan terukur.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-brand-200 transition-all group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-600 text-xl shadow-sm mb-5 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-user-tie"></i>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Dedicated Account Manager</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Satu kontak khusus untuk perusahaan Anda. Dari perencanaan, negosiasi harga, hingga eksekusi di lapangan 24/7.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-brand-200 transition-all group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-accent-500 text-xl shadow-sm mb-5 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-file-invoice-dollar"></i>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Invoicing & Faktur Pajak</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Sistem pembayaran fleksibel (Term of Payment) dan administrasi legal lengkap. PKP siap menerbitkan Faktur Pajak.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-brand-200 transition-all group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500 text-xl shadow-sm mb-5 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">100% Custom Itinerary</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Bebas tentukan durasi, kelas hotel, menu makanan, hingga sisipan agenda rapat atau gala dinner ke dalam jadwal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LAYANAN KAMI */}
      <section className="py-16 lg:py-20 bg-slate-50 border-y border-slate-200" id="layanan">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 text-center">Solusi Untuk Setiap Kebutuhan Bisnis</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group border border-slate-200">
              <div className="h-40 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Gathering" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-brand-900 mb-1">Company Gathering</h3>
                <p className="text-xs text-slate-500 mb-3">Liburan santai skala besar untuk merekatkan hubungan antar karyawan dari berbagai divisi.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group border border-slate-200">
              <div className="h-40 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Team Building" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-brand-900 mb-1">Team Building & Outbound</h3>
                <p className="text-xs text-slate-500 mb-3">Program terstruktur dengan fasilitator profesional untuk melatih leadership dan kerjasama tim.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group border border-slate-200">
              <div className="h-40 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="MICE" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-brand-900 mb-1">M.I.C.E & Meeting</h3>
                <p className="text-xs text-slate-500 mb-3">Penyelenggaraan Meeting, Incentive, Convention, & Exhibition lengkap dengan sewa venue.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group border border-slate-200">
              <div className="h-40 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Executive" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-brand-900 mb-1">Executive Retreat</h3>
                <p className="text-xs text-slate-500 mb-3">Perjalanan eksklusif VVIP (golf, private yacht) untuk jajaran direksi, dewan komisaris, atau VIP.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULIR RFQ */}
      <section className="py-16 lg:py-24 bg-white" id="rfq-form">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            
            <div className="w-full lg:w-5/12 p-8 lg:p-12 bg-brand-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500 rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-3xl font-extrabold mb-4">Mari Diskusikan Agenda Anda!</h2>
                <p className="text-sm text-brand-100 mb-8 leading-relaxed">
                  Isi formulir di samping dengan detail kebutuhan perusahaan Anda. Konsultan perjalanan kami (Travel Architect) akan merancang proposal khusus dan menghubungi Anda dalam kurun waktu 1x24 jam.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-200 uppercase tracking-widest font-bold">Telepon / WhatsApp B2B</p>
                      <p className="font-bold text-lg">+62 811-999-888</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-200 uppercase tracking-widest font-bold">Email Corporate</p>
                      <p className="font-bold text-lg">corporate@nusatrip.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-200 uppercase tracking-widest font-bold">Kantor Pusat</p>
                      <p className="font-medium text-sm text-brand-50">Menara BCA Lt. 32, Jl. M.H. Thamrin No. 1, Jakarta Pusat, Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-7/12 p-8 lg:p-12 bg-white">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Formulir Permintaan Proposal (RFQ)</h3>
              
              <form onSubmit={submitRFQ} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Perusahaan / Instansi <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm rounded-lg px-4 py-2.5 text-slate-800 transition-all" placeholder="PT Maju Bersama" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama PIC (Penanggung Jawab) <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm rounded-lg px-4 py-2.5 text-slate-800 transition-all" placeholder="Nama Anda" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Bisnis <span className="text-red-500">*</span></label>
                    <input type="email" className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm rounded-lg px-4 py-2.5 text-slate-800 transition-all" placeholder="email@perusahaan.com" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">No. WhatsApp Aktif <span className="text-red-500">*</span></label>
                    <input type="tel" className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm rounded-lg px-4 py-2.5 text-slate-800 transition-all" placeholder="0812xxxx" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-slate-100 pt-5 mt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Destinasi Tujuan</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm rounded-lg px-4 py-2.5 text-slate-800 transition-all" placeholder="Cth: Bali / Belum Pasti" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Rencana Tanggal</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm rounded-lg px-4 py-2.5 text-slate-800 transition-all" placeholder="Cth: Pertengahan Des" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Estimasi Peserta</label>
                    <input type="number" className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm rounded-lg px-4 py-2.5 text-slate-800 transition-all" placeholder="Cth: 50 Pax" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Detail Kebutuhan / Agenda Acara <span className="text-red-500">*</span></label>
                  <textarea className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm rounded-lg px-4 py-3 text-slate-800 h-28 resize-none transition-all" placeholder="Ceritakan konsep yang Anda inginkan. Contoh: Kami butuh hotel bintang 4, ada sesi meeting 1/2 hari, lalu diselingi team building di pantai." required></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? <i className="fa-solid fa-circle-notch fa-spin"></i> : null}
                  <span>{isSubmitting ? "Mengirim..." : "Kirim Permintaan Proposal"}</span>
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-2 font-medium"><i className="fa-solid fa-lock text-slate-300 mr-1"></i> Data Anda dijamin kerahasiaannya (NDA Ready).</p>
              </form>

              <div className={`mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm font-bold text-center ${successMsg ? 'block' : 'hidden'}`}>
                <i className="fa-solid fa-circle-check mr-1"></i> Terima kasih! Permintaan Anda telah diterima. Tim kami akan segera menghubungi.
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-extrabold text-lg text-brand-900">
            <div className="w-6 h-6 rounded bg-brand-600 text-white flex items-center justify-center text-[10px]"><i className="fa-solid fa-building"></i></div>
            NusaTrip Corporate
          </div>
          <p className="text-xs text-slate-500 font-medium">© 2026 PT Nusantara Trip System. B2B Division.</p>
        </div>
      </footer>
    </div>
  );
}
