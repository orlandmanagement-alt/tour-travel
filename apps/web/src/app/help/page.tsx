'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HelpCenterPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const faqs = [
    {
      id: 'faq-1',
      question: 'Bagaimana cara mendapatkan E-Ticket setelah melakukan pembayaran?',
      answer: `E-Ticket atau Voucher Perjalanan Anda akan otomatis diterbitkan segera setelah sistem kami memverifikasi pembayaran Anda (biasanya dalam 1-5 menit untuk Virtual Account dan E-Wallet).<br/><br/>
      Anda dapat menemukannya di:<br/>
      <ul class="list-disc pl-5 mt-1 space-y-1">
          <li>Menu <strong>"Pesanan Saya"</strong> pada Dashboard Akun Anda.</li>
          <li>Inbox Email yang Anda gunakan saat melakukan pemesanan. (Cek folder Spam/Junk jika tidak ada di Inbox utama).</li>
      </ul>`
    },
    {
      id: 'faq-2',
      question: 'Apakah saya bisa mengubah jadwal keberangkatan (Reschedule)?',
      answer: `Ya, Anda dapat mengajukan perubahan jadwal (*Reschedule*) dengan ketentuan sebagai berikut:<br/>
      <ul class="list-disc pl-5 mt-2 space-y-1">
          <li>Pengajuan maksimal <strong>H-3 sebelum tanggal keberangkatan</strong> untuk Paket Tour Domestik, dan <strong>H-7</strong> untuk Tour Internasional.</li>
          <li>Akan ada biaya penyesuaian (*reschedule fee*) yang besarnya bergantung pada ketersediaan dan kebijakan masing-masing vendor/maskapai.</li>
          <li>Ajukan melalui menu "Pesanan Saya" > Pilih Pesanan > Klik tombol "Ajukan Reschedule".</li>
      </ul>`
    },
    {
      id: 'faq-3',
      question: 'Berapa lama proses pengembalian dana (Refund)?',
      answer: `Proses pengembalian dana (Refund) yang disetujui akan memakan waktu antara <strong>7 hingga 14 hari kerja</strong> (tidak termasuk Sabtu, Minggu, dan Hari Libur Nasional). Dana akan dikembalikan ke metode pembayaran awal (ke Kartu Kredit, limit akan kembali; ke Rekening Bank/VA, akan ditransfer manual ke rekening yang Anda daftarkan di form refund).`
    },
    {
      id: 'faq-4',
      question: 'Apa perbedaan Private Tour dan Open Trip?',
      answer: `<ul class="list-none space-y-3">
          <li><span class="font-bold text-brand-600">Private Tour:</span> Paket perjalanan yang didedikasikan khusus untuk Anda dan rombongan Anda. Tidak digabung dengan peserta lain, jadwal lebih fleksibel, dan menggunakan armada eksklusif.</li>
          <li><span class="font-bold text-accent-600">Open Trip:</span> Paket perjalanan gabungan dimana Anda akan bergabung dengan traveler lain dalam satu rombongan besar. Jadwal dan itinerary sudah fix/tetap, namun harganya jauh lebih hemat. Cocok untuk solo traveler atau pasangan.</li>
      </ul>`
    },
    {
      id: 'faq-5',
      question: 'Saya salah mentransfer nominal pembayaran (kurang/lebih). Apa yang harus dilakukan?',
      answer: `Jangan panik. Simpan bukti transfer Anda dan segera hubungi Customer Service kami melalu Live Chat atau WhatsApp. Lampirkan Nomor Pesanan (Invoice) dan Foto Bukti Transfer. Tim kami akan melakukan pengecekan mutasi secara manual dalam 1x24 Jam.`
    }
  ];

  return (
    <div className="text-slate-800 antialiased overflow-x-hidden bg-slate-50 min-h-screen">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 py-3 sm:py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            
            <Link href="/" className="font-extrabold text-xl tracking-tighter text-brand-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-brand-600 text-white flex items-center justify-center shadow"><span className="text-sm"><i className="fa-solid fa-paper-plane"></i></span></div>
                NusaTrip <span className="text-slate-300 font-light hidden sm:inline">|</span> <span className="text-slate-500 font-medium text-sm hidden sm:inline">Pusat Bantuan</span>
            </Link>

            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-800 transition-colors">Pesanan Saya</Link>
                <Link href="/" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-2">
                    Beranda
                </Link>
            </div>
        </div>
      </header>

      {/* HERO SEARCH SECTION */}
      <section className="bg-brand-900 relative overflow-hidden pt-16 pb-28">
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500 rounded-full mix-blend-multiply blur-3xl"></div>
            <div className="absolute top-12 -left-24 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">Halo, ada yang bisa kami bantu?</h1>
            <p className="text-brand-200 text-sm mb-8 font-medium">Temukan solusi untuk kendala pemesanan, pembayaran, atau akun Anda.</p>
            
            <div className="relative max-w-2xl mx-auto group bg-white rounded-2xl shadow-xl flex items-center p-2 focus-within:ring-4 focus-within:ring-brand-500/20 focus-within:border-brand-500 border border-transparent transition-all">
                <i className="fa-solid fa-magnifying-glass text-slate-400 text-lg ml-4 mr-2 group-focus-within:text-brand-600 transition-colors"></i>
                <input type="text" placeholder="Ketik topik bantuan (Cth: Cara refund tiket, Ganti jadwal...)" className="w-full bg-transparent text-sm sm:text-base text-slate-800 font-medium py-3 px-2 focus:outline-none" />
                <button className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors hidden sm:block">
                    Cari
                </button>
            </div>
        </div>
      </section>

      {/* QUICK CATEGORIES */}
      <section className="relative z-20 -mt-16 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            <a href="#pesanan" className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-5 sm:p-6 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 hover:border-brand-300 transition-all group">
                <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-clipboard-list"></i>
                </div>
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-brand-600 transition-colors">Pesanan Saya</h3>
                <p className="text-[10px] text-slate-500 mt-1 hidden sm:block">E-tiket, Cara Pesan, Konfirmasi</p>
            </a>

            <a href="#pembayaran" className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-5 sm:p-6 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 hover:border-brand-300 transition-all group">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-wallet"></i>
                </div>
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-brand-600 transition-colors">Pembayaran</h3>
                <p className="text-[10px] text-slate-500 mt-1 hidden sm:block">Metode bayar, Gagal bayar, Invoice</p>
            </a>

            <a href="#refund" className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-5 sm:p-6 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 hover:border-brand-300 transition-all group">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-money-bill-transfer"></i>
                </div>
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-brand-600 transition-colors">Refund & Ubah</h3>
                <p className="text-[10px] text-slate-500 mt-1 hidden sm:block">Reschedule jadwal, Batal pesanan</p>
            </a>

            <a href="#akun" className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-5 sm:p-6 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 hover:border-brand-300 transition-all group">
                <div className="w-12 h-12 bg-accent-50 text-accent-600 rounded-full flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-user-shield"></i>
                </div>
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-brand-600 transition-colors">Akun & Keamanan</h3>
                <p className="text-[10px] text-slate-500 mt-1 hidden sm:block">Lupa password, NusaPoin, Profil</p>
            </a>
        </div>
      </section>

      {/* FAQ SECTION */}
      <main className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900">Pertanyaan Populer (FAQ)</h2>
            <p className="text-sm text-slate-500 mt-2">Jawaban cepat untuk kendala yang sering dialami pengguna.</p>
        </div>

        <div className="space-y-4">
            {faqs.map((faq) => (
               <div key={faq.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-brand-300 transition-colors">
                  <button className={`w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none ${openFaq === faq.id ? 'text-brand-600' : ''}`} onClick={() => toggleFaq(faq.id)}>
                      <span className="font-bold text-sm sm:text-base pr-4">{faq.question}</span>
                      <i className={`fa-solid fa-chevron-down text-sm flex-shrink-0 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180 text-brand-600' : 'text-slate-400'}`}></i>
                  </button>
                  <div className={`bg-slate-50 px-5 transition-all duration-300 overflow-hidden ${openFaq === faq.id ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                      <div className="text-sm text-slate-600 leading-relaxed border-t border-slate-200 pt-3" dangerouslySetInnerHTML={{ __html: faq.answer }}>
                      </div>
                  </div>
              </div>
            ))}
        </div>

        <div className="text-center mt-6">
            <button className="text-sm font-bold text-brand-600 hover:text-brand-800 transition-colors">
                Lihat 50+ Pertanyaan Lainnya <i className="fa-solid fa-arrow-right text-[10px] ml-1"></i>
            </button>
        </div>

      </main>

      {/* CONTACT SUPPORT CTA */}
      <section className="bg-brand-50 border-y border-brand-100 py-16">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-500 text-3xl mx-auto mb-4 shadow-sm">
                <i className="fa-solid fa-headset"></i>
            </div>
            <h2 className="text-2xl font-extrabold text-brand-900 mb-2">Masih Butuh Bantuan?</h2>
            <p className="text-sm text-slate-600 mb-8 max-w-md mx-auto">Tim Customer Success kami siap melayani Anda 24/7. Hubungi kami melalui saluran berikut untuk respon yang cepat.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-6 py-3 bg-white border border-slate-200 hover:border-green-500 hover:bg-green-50 text-slate-700 hover:text-green-600 font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 group">
                    <i className="fa-brands fa-whatsapp text-green-500 text-lg group-hover:scale-110 transition-transform"></i> Chat WhatsApp
                </button>
                <Link href="/contact" className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-md shadow-brand-500/30 transition-all flex items-center justify-center gap-2">
                    <i className="fa-regular fa-envelope"></i> Kirim Email
                </Link>
            </div>
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 font-extrabold text-lg text-brand-900">
                <div className="w-6 h-6 rounded bg-brand-600 text-white flex items-center justify-center text-[10px]"><i className="fa-solid fa-paper-plane"></i></div>
                NusaTrip
            </div>
            <div className="flex gap-4 text-xs font-bold text-slate-500">
                <span className="hover:text-brand-600 transition-colors cursor-pointer">Syarat & Ketentuan</span>
                <span className="hover:text-brand-600 transition-colors cursor-pointer">Kebijakan Privasi</span>
            </div>
        </div>
      </footer>
    </div>
  );
}
