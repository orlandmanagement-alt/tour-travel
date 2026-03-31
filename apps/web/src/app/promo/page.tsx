'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PromoPage() {
  const [toastVisible, setToastVisible] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [totalResult, setTotalResult] = useState(24);

  const promoData = [
    {
      img: "https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=600",
      badge: "DISKON 20%",
      badgeColor: "bg-red-500",
      category: "Paket Tour Bromo",
      title: "Promo Bromo Sunrise Diskon 20% Tanpa Minimal Transaksi",
      desc: "Nikmati keindahan Bromo lebih hemat. Berlaku untuk pemesanan Private Tour dan Open Trip.",
      code: "BROMOHEMAT",
      expDate: "Berakhir 30 Nov 2026",
      expWarning: true
    },
    {
      img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600",
      badge: "CASHBACK 150K",
      badgeColor: "bg-accent-500",
      category: "Rental Mobil",
      title: "Cashback Hingga 150Ribu Sewa Mobil Lepas Kunci",
      desc: "Sewa mobil 2 hari atau lebih dan dapatkan langsung cashback ke e-wallet kamu.",
      code: "SEWASERU",
      expDate: "Berakhir 15 Des 2026",
      expWarning: false
    },
    {
      img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600",
      badge: "DISKON RP 500K",
      badgeColor: "bg-brand-600",
      category: "Promo Bank BCA",
      title: "Liburan Hemat Malang City Tour Khusus Kartu Kredit BCA",
      desc: "Gunakan Kartu Kredit BCA untuk transaksi minimal Rp 3.000.000 dan dapatkan potongan langsung.",
      code: "BCAMALANG",
      expDate: "Berakhir 31 Des 2026",
      expWarning: false
    },
    {
      img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
      badge: "BELI 10 GRATIS 1",
      badgeColor: "bg-emerald-500",
      category: "Corporate / Family",
      title: "Promo Rombongan Bali Explorer Tour",
      desc: "Cocok untuk gathering! Pesan untuk 10 pax dan dapatkan 1 pax gratis tanpa syarat tambahan.",
      code: "BALIGROUP",
      expDate: "Berakhir 20 Des 2026",
      expWarning: true
    },
    {
      img: "https://images.unsplash.com/photo-1517441865-c32f8313bd8a?w=600",
      badge: "DISKON 15%",
      badgeColor: "bg-purple-600",
      category: "Paket Tour Ijen",
      title: "Eksplorasi Blue Fire Kawah Ijen Potongan 15%",
      desc: "Penawaran spesial untuk pemesanan Open Trip Kawah Ijen keberangkatan weekend.",
      code: "IJENBLUE",
      expDate: "Berakhir 05 Des 2026",
      expWarning: true
    },
    {
      img: "https://images.unsplash.com/photo-1620067677840-7ac53577d2ec?w=600",
      badge: "DISKON RP 200K",
      badgeColor: "bg-blue-500",
      category: "Promo Bank Mandiri",
      title: "Potongan Harga Sewa Mobil Premium & Innova Zenix",
      desc: "Khusus nasabah Livin' Mandiri. Nikmati perjalanan VIP dengan harga yang lebih terjangkau.",
      code: "LIVINVIP",
      expDate: "Berakhir 31 Des 2026",
      expWarning: false
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  };

  const handleFilter = () => {
    setIsFiltering(true);
    setTimeout(() => {
      setIsFiltering(false);
      setTotalResult(Math.floor(Math.random() * 15) + 5);
    }, 800);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-6 pb-12 relative overflow-hidden">
      
      {/* Toast Notification */}
      <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-2xl z-[100] font-bold text-sm flex items-center gap-2 transition-all duration-300 pointer-events-none ${toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[20px]'}`}>
        <i className="fa-solid fa-circle-check text-green-400"></i> Kode Promo Berhasil Disalin!
      </div>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* SIDEBAR FILTER */}
        <aside className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0">
          <div className="sticky top-6 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-max max-h-[90vh] flex flex-col hidden lg:flex">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center bg-brand-50/50">
              <h2 className="font-extrabold text-brand-900 text-base"><i className="fa-solid fa-filter text-brand-600 mr-1.5"></i> Filter Penawaran</h2>
              <button onClick={handleFilter} className="text-[11px] font-bold text-slate-400 hover:text-red-500 transition-colors"><i className="fa-solid fa-rotate-right mr-1"></i>Reset</button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto flex flex-col gap-6" style={{ scrollbarWidth: 'thin' }}>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Cari Promo / Kode</label>
                <div className="relative group">
                  <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors text-sm"></i>
                  <input type="text" placeholder="Cari BCA, Diskon 50%..." className="w-full bg-slate-50 border border-slate-200 text-sm rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium" />
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <label className="block text-xs font-bold text-slate-700 mb-3">Kategori Layanan</label>
                <div className="space-y-2.5">
                  {['Semua Promo', 'Paket Tour & Trip', 'Rental Mobil', 'Corporate / Grup'].map((l, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="appearance-none w-[18px] h-[18px] border-2 border-slate-300 rounded cursor-pointer checked:bg-brand-600 checked:border-brand-600 relative after:content-['✓'] after:absolute after:text-white after:text-[10px] after:left-0.5 after:hidden checked:after:block transition-all" defaultChecked={i === 0} />
                      <span className="text-sm font-medium text-slate-600 group-hover:text-brand-600">{l}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-white">
              <button onClick={handleFilter} className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-lg shadow-md transition-colors flex items-center justify-center gap-2">
                {isFiltering ? <i className="fa-solid fa-circle-notch fa-spin"></i> : null}
                <span>{isFiltering ? "Memproses..." : "Terapkan Filter Promo"}</span>
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 w-full">
          <div className={`transition-opacity duration-300 ${isFiltering ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <div className="mb-5 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
              <div>
                <nav className="flex text-[10px] sm:text-xs text-slate-400 font-medium mb-2" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-2">
                    <li className="inline-flex items-center"><Link href="/" className="hover:text-brand-600 transition-colors">Beranda</Link></li>
                    <li><div className="flex items-center"><i className="fa-solid fa-chevron-right text-[8px] mx-1"></i><span className="text-slate-600 font-bold">Promo Spesial</span></div></li>
                  </ol>
                </nav>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight">Klaim Promo & Hemat Liburanmu!</h1>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">Tersedia <span className="text-brand-600 font-bold">{totalResult}</span> promo aktif yang bisa kamu gunakan hari ini.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <button className="px-3 py-1.5 bg-brand-600 text-white text-[11px] font-bold rounded-full shadow-sm"><i className="fa-solid fa-check mr-1"></i> Semua Promo</button>
              <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:border-brand-600 hover:text-brand-600 text-[11px] font-bold rounded-full shadow-sm">Promo Tour</button>
              <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:border-brand-600 hover:text-brand-600 text-[11px] font-bold rounded-full shadow-sm">Promo Bank</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {promoData.map((promo, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-brand-300 group flex flex-col relative transform transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-36 sm:h-40 overflow-hidden bg-slate-100 flex items-center justify-center">
                    <img src={promo.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={promo.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    <span className={`absolute top-3 left-3 text-white ${promo.badgeColor} text-[10px] font-bold px-2.5 py-1 rounded shadow-md uppercase tracking-wider`}>{promo.badge}</span>
                  </div>
                  
                  <div className="p-4 sm:p-5 flex flex-col flex-grow relative">
                    <div className="text-[10px] font-bold text-brand-600 mb-1.5 uppercase tracking-wide">
                      {promo.category}
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mb-2 line-clamp-2 leading-snug group-hover:text-brand-600 transition-colors">{promo.title}</h3>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2 flex-grow">{promo.desc}</p>

                    <div className="mt-auto mb-4 p-3 bg-slate-50 rounded-lg flex items-center justify-between border-2 border-dashed border-slate-300">
                      <div>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">Kode Promo</p>
                        <p className="font-bold text-slate-800 tracking-wider font-mono text-sm">{promo.code}</p>
                      </div>
                      <button onClick={() => handleCopyCode(promo.code)} className="w-8 h-8 rounded-md bg-white border border-slate-200 text-brand-600 flex items-center justify-center hover:bg-brand-600 hover:text-white hover:border-transparent shadow-sm transition-all focus:outline-none">
                        <i className="fa-regular fa-copy"></i>
                      </button>
                    </div>

                    <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                      <span className={`text-[10px] sm:text-xs font-bold flex items-center gap-1.5 ${promo.expWarning ? 'text-red-500' : 'text-slate-500'}`}>
                        <i className="fa-regular fa-clock"></i> {promo.expDate}
                      </span>
                      <a href="#" className="text-[10px] sm:text-xs font-bold text-brand-600 hover:underline">S&K Khusus</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
