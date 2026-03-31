'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CarCatalogPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [totalResult, setTotalResult] = useState(84);

  const carData = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600",
      badge: "TERLARIS",
      badgeColor: "bg-red-500",
      brand: "Toyota",
      name: "All New Avanza",
      transmission: "Automatic",
      seats: "7 Kursi",
      gas: "Bensin",
      year: "2023",
      driverType: "Lepas Kunci / Dengan Supir",
      rating: "4.9",
      reviews: "1.240",
      oldPrice: "Rp 350.000",
      newPrice: "300",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1620067677840-7ac53577d2ec?w=600",
      badge: "NYAMAN",
      badgeColor: "bg-brand-500",
      brand: "Toyota",
      name: "Innova Zenix Hybrid",
      transmission: "Automatic",
      seats: "7 Kursi",
      gas: "Hybrid",
      year: "2024",
      driverType: "Dengan Supir",
      rating: "5.0",
      reviews: "342",
      oldPrice: "",
      newPrice: "850",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=600",
      badge: "PROMO",
      badgeColor: "bg-accent-500",
      brand: "Honda",
      name: "Brio Satya E",
      transmission: "Manual",
      seats: "5 Kursi",
      gas: "Bensin",
      year: "2022",
      driverType: "Lepas Kunci",
      rating: "4.8",
      reviews: "850",
      oldPrice: "Rp 300.000",
      newPrice: "250",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600",
      badge: "ROMBONGAN",
      badgeColor: "bg-emerald-500",
      brand: "Toyota",
      name: "Hiace Commuter",
      transmission: "Manual",
      seats: "15 Kursi",
      gas: "Diesel",
      year: "2022",
      driverType: "Termasuk Supir + BBM",
      rating: "4.9",
      reviews: "512",
      oldPrice: "",
      newPrice: "1.100",
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=600",
      badge: "PREMIUM",
      badgeColor: "bg-slate-800",
      brand: "Toyota",
      name: "Alphard Transformer",
      transmission: "Automatic",
      seats: "6 Kursi",
      gas: "Bensin",
      year: "2022",
      driverType: "Dengan Supir",
      rating: "5.0",
      reviews: "215",
      oldPrice: "Rp 2.500.000",
      newPrice: "2.200",
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1606016159991-dde6541cc3ab?w=600",
      badge: "LEPAS KUNCI",
      badgeColor: "bg-blue-500",
      brand: "Mitsubishi",
      name: "Xpander Ultimate",
      transmission: "Automatic",
      seats: "7 Kursi",
      gas: "Bensin",
      year: "2023",
      driverType: "Lepas Kunci / Dengan Supir",
      rating: "4.9",
      reviews: "630",
      oldPrice: "",
      newPrice: "400",
    }
  ];

  const handleFilter = () => {
    setIsFiltering(true);
    setTimeout(() => {
      setIsFiltering(false);
      setTotalResult(Math.floor(Math.random() * 40) + 12);
    }, 800);
  };

  const handleReset = () => {
    handleFilter();
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-6 pb-12">
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* SIDEBAR FILTER */}
        <aside className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden w-full bg-white border border-slate-200 text-brand-900 font-bold py-3 rounded-xl shadow-sm mb-4 flex justify-between items-center px-4"
          >
            <span><i className="fa-solid fa-sliders text-brand-600 mr-2"></i> Filter Kendaraan</span>
            <i className={`fa-solid fa-chevron-${isFilterOpen ? 'up' : 'down'}`}></i>
          </button>

          <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block sticky top-6 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-max max-h-[90vh] flex flex-col`}>
            <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center bg-brand-50/50">
              <h2 className="font-extrabold text-brand-900 text-base"><i className="fa-solid fa-filter text-brand-600 mr-1.5"></i> Filter Mobil</h2>
              <button onClick={handleReset} className="text-[11px] font-bold text-slate-400 hover:text-red-500 transition-colors"><i className="fa-solid fa-rotate-right mr-1"></i>Reset</button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto flex flex-col gap-6" style={{ scrollbarWidth: 'thin' }}>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Nama Mobil / Merek</label>
                <div className="relative group">
                  <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors text-sm"></i>
                  <input type="text" placeholder="Cari Avanza, Innova..." className="w-full bg-slate-50 border border-slate-200 text-sm rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium" />
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <label className="block text-xs font-bold text-slate-700 mb-3">Harga per Hari (Rp)</label>
                <div className="flex items-center gap-2">
                  <div className="relative w-full">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[10px] text-slate-400 font-bold">MIN</span>
                    <input type="number" placeholder="250.000" className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg pl-8 pr-2 py-2 focus:outline-none focus:border-brand-500 font-medium text-right" />
                  </div>
                  <span className="text-slate-300">-</span>
                  <div className="relative w-full">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[10px] text-slate-400 font-bold">MAX</span>
                    <input type="number" placeholder="2.500.000" className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg pl-8 pr-2 py-2 focus:outline-none focus:border-brand-500 font-medium text-right" />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <label className="block text-xs font-bold text-slate-700 mb-3">Layanan Pengemudi</label>
                <div className="space-y-2.5">
                  {['Lepas Kunci (Tanpa Supir)', 'Dengan Supir', 'Supir + BBM (All-in)'].map((l, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="appearance-none w-[18px] h-[18px] border-2 border-slate-300 rounded cursor-pointer checked:bg-brand-600 checked:border-brand-600 relative after:content-['✓'] after:absolute after:text-white after:text-[10px] after:left-0.5 after:hidden checked:after:block transition-all" defaultChecked={i < 2} />
                      <span className="text-sm font-medium text-slate-600 group-hover:text-brand-600">{l}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <label className="block text-xs font-bold text-slate-700 mb-3">Tipe Transmisi</label>
                <div className="space-y-2.5">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="appearance-none w-[18px] h-[18px] border-2 border-slate-300 rounded cursor-pointer checked:bg-brand-600 checked:border-brand-600 relative after:content-['✓'] after:absolute after:text-white after:text-[10px] after:left-0.5 after:hidden checked:after:block transition-all" />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-brand-600">Automatic (AT) <span className="text-[10px] text-slate-400 ml-1">(45)</span></span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="appearance-none w-[18px] h-[18px] border-2 border-slate-300 rounded cursor-pointer checked:bg-brand-600 checked:border-brand-600 relative after:content-['✓'] after:absolute after:text-white after:text-[10px] after:left-0.5 after:hidden checked:after:block transition-all" />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-brand-600">Manual (MT) <span className="text-[10px] text-slate-400 ml-1">(28)</span></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-white">
              <button 
                onClick={handleFilter} disabled={isFiltering}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {isFiltering ? <i className="fa-solid fa-circle-notch fa-spin"></i> : null}
                <span>{isFiltering ? "Mencari..." : "Cari Mobil"}</span>
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 w-full relative">
          <div className={`transition-opacity duration-300 ${isFiltering ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <div className="mb-5 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
              <div>
                <nav className="flex text-[10px] sm:text-xs text-slate-400 font-medium mb-2" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-2">
                    <li className="inline-flex items-center"><Link href="/" className="hover:text-brand-600 transition-colors">Beranda</Link></li>
                    <li><div className="flex items-center"><i className="fa-solid fa-chevron-right text-[8px] mx-1"></i><span className="text-slate-600 font-bold">Rental Mobil</span></div></li>
                  </ol>
                </nav>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight">Sewa Mobil Terbaik</h1>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">Menemukan <span className="text-brand-600 font-bold">{totalResult}</span> kendaraan tersedia untuk Anda.</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Urutkan:</span>
                <div className="relative group">
                  <select className="appearance-none bg-white border border-slate-200 text-brand-900 text-xs sm:text-sm font-bold rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-brand-500 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                    <option>Rekomendasi Utama</option>
                    <option>Harga: Terendah</option>
                    <option>Harga: Tertinggi</option>
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <button className="px-3 py-1.5 bg-brand-600 text-white text-[11px] font-bold rounded-full shadow-sm shadow-brand-500/30 transition-all"><i className="fa-solid fa-check mr-1"></i> Semua Mobil</button>
              <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:border-brand-600 hover:text-brand-600 text-[11px] font-bold rounded-full shadow-sm transition-all"><i className="fa-solid fa-key mr-1"></i> Lepas Kunci</button>
              <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:border-brand-600 hover:text-brand-600 text-[11px] font-bold rounded-full shadow-sm transition-all">Mobil Keluarga (MPV)</button>
              <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:border-brand-600 hover:text-brand-600 text-[11px] font-bold rounded-full shadow-sm transition-all"><i className="fa-solid fa-percent text-red-500 mr-1"></i> Diskon</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {carData.map((car, i) => (
                <Link href={`/cars/${car.id}`} key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-brand-300 group flex flex-col relative cursor-pointer transform transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-36 sm:h-44 overflow-hidden bg-slate-100 flex items-center justify-center">
                    <img src={car.img} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700" alt={car.name} />
                    <span className={`absolute top-2 left-2 text-white ${car.badgeColor} text-[9px] font-bold px-2 py-1 rounded shadow-sm`}>{car.badge}</span>
                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur rounded px-1.5 py-0.5 text-[9px] font-bold text-slate-600 border border-slate-200 shadow-sm">
                      Thn {car.year}
                    </div>
                  </div>
                  
                  <div className="p-3 sm:p-4 flex flex-col flex-grow group-hover:bg-brand-50/20 transition-colors border-t border-slate-100">
                    <div className="text-[10px] text-slate-500 font-medium mb-0.5 uppercase tracking-wide">{car.brand}</div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mb-2 line-clamp-1 group-hover:text-brand-600 transition-colors">{car.name}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-slate-100 text-slate-600 text-[9px] sm:text-[10px] font-medium px-2 py-1 rounded flex items-center gap-1">
                        <i className="fa-solid fa-gears text-slate-400"></i> {car.transmission}
                      </span>
                      <span className="bg-slate-100 text-slate-600 text-[9px] sm:text-[10px] font-medium px-2 py-1 rounded flex items-center gap-1">
                        <i className="fa-solid fa-users text-slate-400"></i> {car.seats}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-1 mb-4">
                      <span className="text-[9px] sm:text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                        <i className="fa-solid fa-user-check"></i> {car.driverType}
                      </span>
                      <div className="flex items-center gap-1">
                        <i className="fa-solid fa-star text-[10px] text-yellow-400"></i>
                        <span className="text-[10px] sm:text-xs font-bold text-slate-700">{car.rating}</span>
                        <span className="text-[9px] text-slate-400">({car.reviews})</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-3 border-t border-slate-100 flex justify-between items-end">
                      <div>
                        {car.oldPrice ? (
                          <>
                            <p className="text-[9px] sm:text-[10px] text-slate-400 line-through mb-0.5">{car.oldPrice}</p>
                            <p className="text-accent-600 font-extrabold text-sm sm:text-lg leading-none">Rp {car.newPrice}<span className="text-[8px] sm:text-[10px] font-medium text-slate-500">k/hari</span></p>
                          </>
                        ) : (
                          <>
                            <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase mb-0.5">Mulai Dari</p>
                            <p className="text-brand-600 font-extrabold text-sm sm:text-lg leading-none">Rp {car.newPrice}<span className="text-[8px] sm:text-[10px] font-medium text-slate-500">k/hari</span></p>
                          </>
                        )}
                      </div>
                      <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-50 text-brand-600 font-bold text-[10px] sm:text-xs rounded-lg group-hover:bg-brand-600 group-hover:text-white transition-all shadow-sm">
                        Pilih
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
