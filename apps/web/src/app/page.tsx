'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    'url("https://images.unsplash.com/photo-1518090597335-e6f7783ee855?w=1600")',
    'url("https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600")',
    'url("https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=1600")'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const [activeTab, setActiveTab] = useState<'tour' | 'car'>('tour');
  const [showLokasiDrop, setShowLokasiDrop] = useState(false);
  const [showDestDrop, setShowDestDrop] = useState(false);
  const [lokasi, setLokasi] = useState('');
  const [destinasi, setDestinasi] = useState('');

  return (
    <>
      <section className="relative w-full h-[55vh] min-h-[400px] max-h-[500px] pt-14 flex flex-col justify-center overflow-hidden">
        {slides.map((bg, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: bg }}
          ></div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-brand-900/50 to-transparent z-10"></div>
        
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-[-30px]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-3 drop-shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-700">
                Jelajahi Dunia, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-yellow-300">Tanpa Batas.</span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 max-w-2xl mx-auto font-medium drop-shadow-md animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-100">
                Pesan tiket tour, open trip, dan rental mobil dengan platform enterprise terpercaya.
            </p>
        </div>
      </section>

      <section className="relative z-30 -mt-16 sm:-mt-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 sm:p-3">
            
            <div className="flex gap-4 px-2 pt-1 pb-3 mb-2 border-b border-slate-100">
                <button 
                  onClick={() => setActiveTab('tour')} 
                  className={`flex items-center gap-1.5 text-sm pb-1 transition-all ${activeTab === 'tour' ? 'text-brand-600 font-bold border-b-2 border-brand-600' : 'text-slate-500 font-medium hover:text-brand-600 border-b-2 border-transparent'}`}
                >
                  <i className="fa-solid fa-map-location-dot"></i> Paket Tour
                </button>
                <button 
                  onClick={() => setActiveTab('car')} 
                  className={`flex items-center gap-1.5 text-sm pb-1 transition-all ${activeTab === 'car' ? 'text-brand-600 font-bold border-b-2 border-brand-600' : 'text-slate-500 font-medium hover:text-brand-600 border-b-2 border-transparent'}`}
                >
                  <i className="fa-solid fa-car"></i> Rental Mobil
                </button>
            </div>
            
            {activeTab === 'tour' && (
              <form className="grid grid-cols-1 md:grid-cols-4 gap-2 animate-in fade-in duration-300">
                  <div className="relative p-2.5 bg-slate-50 rounded text-slate-700 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 border border-slate-200 group transition-all">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5 group-focus-within:text-brand-600">Keberangkatan</label>
                      <div className="flex items-center gap-2">
                          <i className="fa-solid fa-location-dot text-slate-400 group-focus-within:text-brand-600 text-sm transition-colors"></i>
                          <input 
                            type="text" 
                            placeholder="Pilih Kota" 
                            className="w-full bg-transparent text-slate-900 font-bold text-sm focus:outline-none" 
                            value={lokasi}
                            onChange={(e) => setLokasi(e.target.value)}
                            onFocus={() => setShowLokasiDrop(true)}
                            onBlur={() => setTimeout(() => setShowLokasiDrop(false), 200)}
                          />
                      </div>
                      {showLokasiDrop && (
                        <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-slate-200 rounded shadow-2xl z-50 max-h-40 overflow-y-auto text-sm animate-in zoom-in-95 duration-200">
                            {['Jakarta', 'Malang', 'Banyuwangi', 'Bali'].map(city => (
                              <li key={city} className="px-3 py-2 hover:bg-brand-50 cursor-pointer text-brand-900 font-medium border-b border-slate-50" onClick={() => setLokasi(city)}><i className="fa-solid fa-location-arrow mr-2 text-slate-300 text-xs"></i> {city}</li>
                            ))}
                        </ul>
                      )}
                  </div>

                  <div className="relative p-2.5 bg-slate-50 rounded text-slate-700 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 border border-slate-200 group transition-all">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5 group-focus-within:text-brand-600">Destinasi / Nama Paket</label>
                      <div className="flex items-center gap-2">
                          <i className="fa-solid fa-magnifying-glass text-slate-400 group-focus-within:text-brand-600 text-sm transition-colors"></i>
                          <input 
                            type="text" 
                            placeholder="Ketik Bromo, Ijen..." 
                            className="w-full bg-transparent text-slate-900 font-bold text-sm focus:outline-none" 
                            value={destinasi}
                            onChange={(e) => setDestinasi(e.target.value)}
                            onFocus={() => setShowDestDrop(true)}
                            onBlur={() => setTimeout(() => setShowDestDrop(false), 200)}
                          />
                      </div>
                      {showDestDrop && (
                        <ul className="absolute left-0 top-full mt-1 w-[150%] sm:w-full bg-white border border-slate-200 rounded shadow-2xl z-50 max-h-48 overflow-y-auto text-xs animate-in zoom-in-95 duration-200">
                            {[
                              { label: 'Open Trip Bromo Midnight', detail: 'Start Malang/Batu' },
                              { label: 'Private Kawah Ijen Blue Fire', detail: 'Start Banyuwangi' },
                              { label: 'Nusa Penida 1 Day Tour', detail: 'Internasional / Domestik' }
                            ].map(pkg => (
                              <li key={pkg.label} className="px-3 py-2 hover:bg-brand-50 cursor-pointer border-b border-slate-100" onClick={() => setDestinasi(pkg.label)}>
                                  <div className="font-bold text-brand-900">{pkg.label}</div>
                                  <div className="text-slate-500 text-[10px]">{pkg.detail}</div>
                              </li>
                            ))}
                        </ul>
                      )}
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded text-slate-700 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 border border-slate-200 group transition-all">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5 group-focus-within:text-brand-600">Tanggal Trip</label>
                      <div className="flex items-center gap-2">
                          <i className="fa-regular fa-calendar text-slate-400 group-focus-within:text-brand-600 text-sm transition-colors"></i>
                          <input type="date" className="w-full bg-transparent text-slate-900 font-bold text-sm focus:outline-none cursor-pointer" />
                      </div>
                  </div>

                  <div className="p-1">
                      <button type="button" className="w-full h-full min-h-[46px] bg-accent-500 hover:bg-accent-600 text-white font-bold text-sm rounded shadow-md flex items-center justify-center gap-2 transition-colors">
                          <i className="fa-solid fa-search"></i> Cari Tour
                      </button>
                  </div>
              </form>
            )}

            {activeTab === 'car' && (
              <form className="grid grid-cols-1 md:grid-cols-4 gap-2 animate-in fade-in duration-300">
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200 focus-within:border-brand-500 group">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Kota Ambil</label>
                      <div className="flex items-center gap-2">
                          <i className="fa-solid fa-building text-slate-400 text-sm"></i>
                          <select className="w-full bg-transparent text-slate-900 font-bold text-sm focus:outline-none cursor-pointer">
                              <option>Malang / Batu</option>
                              <option>Surabaya</option>
                              <option>Jakarta</option>
                          </select>
                      </div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200 focus-within:border-brand-500 group">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Tanggal Rental</label>
                      <div className="flex items-center gap-2">
                          <i className="fa-regular fa-calendar-check text-slate-400 text-sm"></i>
                          <input type="date" className="w-full bg-transparent text-slate-900 font-bold text-sm focus:outline-none cursor-pointer" />
                      </div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200 focus-within:border-brand-500 group">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Tipe Mobil</label>
                      <div className="flex items-center gap-2">
                          <i className="fa-solid fa-car-side text-slate-400 text-sm"></i>
                          <select className="w-full bg-transparent text-slate-900 font-bold text-sm focus:outline-none cursor-pointer">
                              <option>Semua Tipe</option>
                              <option>MPV (Avanza, Innova)</option>
                              <option>Minibus (Hiace, Elf)</option>
                              <option>Premium (Alphard)</option>
                          </select>
                      </div>
                  </div>
                  <div className="p-1">
                      <button type="button" className="w-full h-full min-h-[46px] bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded shadow-md flex items-center justify-center gap-2 transition-colors">
                          <i className="fa-solid fa-car"></i> Cari Mobil
                      </button>
                  </div>
              </form>
            )}

        </div>
      </section>

      <section className="py-6 sm:py-8 border-b border-slate-100 bg-white shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center md:justify-center gap-3 sm:gap-6 overflow-x-auto hide-scrollbar pb-2 snap-x">
                {[
                  { icon: 'fa-mountain', label: 'Pegunungan' },
                  { icon: 'fa-umbrella-beach', label: 'Pantai & Pulau' },
                  { icon: 'fa-city', label: 'City Tour' },
                  { icon: 'fa-heart', label: 'Honeymoon' },
                  { icon: 'fa-users', label: 'Open Trip' },
                  { icon: 'fa-camera', label: 'Fotografi' },
                  { icon: 'fa-campground', label: 'Camping' },
                  { icon: 'fa-globe', label: 'Luar Negeri' }
                ].map((cat, i) => (
                  <Link href={`/tours?cat=${cat.label}`} key={i} className="flex flex-col items-center gap-2 min-w-[72px] sm:min-w-[80px] snap-center group">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-600 text-lg sm:text-xl group-hover:bg-brand-600 group-hover:text-white group-hover:-translate-y-1 transition-all shadow-sm group-hover:shadow-[0_4px_15px_rgba(79,70,229,0.3)]">
                          <i className={`fa-solid ${cat.icon} group-hover:rotate-6 transition-transform`}></i>
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold text-slate-600 group-hover:text-brand-600 text-center leading-tight whitespace-pre-wrap">{cat.label.replace(' & ', ' &\n')}</span>
                  </Link>
                ))}
            </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-900 tracking-tight flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
                  <i className="fa-solid fa-fire text-sm hover:animate-pulse"></i>
                </div>
                Spesial Promo
            </h2>
            <Link href="/promos" className="text-xs font-bold text-brand-600 hover:text-accent-500 flex items-center gap-1 group">Lihat Semua <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i></Link>
        </div>
        
        <div className="grid grid-cols-1 md:flex md:overflow-x-auto md:hide-scrollbar gap-4 md:pb-4 snap-x">
            <div className="group relative rounded-xl overflow-hidden min-h-[140px] md:h-44 md:min-w-[340px] shadow border border-slate-100 flex-shrink-0 cursor-pointer snap-center">
                <img src="https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=800" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Promo 1" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-900/60 to-transparent"></div>
                <div className="absolute inset-0 bg-brand-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-[1px]">
                    <div className="w-10 h-10 rounded-full bg-white text-brand-600 flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"><i className="fa-solid fa-eye"></i></div>
                </div>
                <div className="relative z-10 p-5 flex flex-col justify-center h-full text-white w-2/3">
                    <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow mb-2 w-max"><i className="fa-solid fa-tag"></i> DISC 20%</span>
                    <h3 className="font-bold text-base sm:text-lg leading-tight mb-1">Promo Bromo Sunrise</h3>
                    <p className="text-[10px] text-slate-300">Berlaku s/d 30 Nov</p>
                </div>
            </div>
            
            <div className="group relative rounded-xl overflow-hidden min-h-[140px] md:h-44 md:min-w-[340px] shadow border border-slate-100 flex-shrink-0 cursor-pointer snap-center">
                <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Promo 2" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-600/90 via-accent-500/60 to-transparent"></div>
                 <div className="absolute inset-0 bg-accent-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-[1px]">
                    <div className="w-10 h-10 rounded-full bg-white text-accent-600 flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"><i className="fa-solid fa-eye"></i></div>
                </div>
                <div className="relative z-10 p-5 flex flex-col justify-center h-full text-white w-2/3">
                    <span className="bg-yellow-400 text-brand-900 text-[9px] font-bold px-2 py-0.5 rounded shadow mb-2 w-max"><i className="fa-solid fa-bolt"></i> CASHBACK 500K</span>
                    <h3 className="font-bold text-base sm:text-lg leading-tight mb-1">Malang City Explorer</h3>
                    <p className="text-[10px] text-white/80 font-mono bg-black/20 px-1 inline-block mt-1 rounded">KODE: MLGCERIA</p>
                </div>
            </div>

            <div className="group relative rounded-xl overflow-hidden min-h-[140px] md:h-44 md:min-w-[340px] shadow border border-slate-100 flex-shrink-0 cursor-pointer snap-center">
                <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Promo 3" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/60 to-transparent"></div>
                 <div className="absolute inset-0 bg-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-[1px]">
                    <div className="w-10 h-10 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"><i className="fa-solid fa-eye"></i></div>
                </div>
                <div className="relative z-10 p-5 flex flex-col justify-center h-full text-white w-2/3">
                    <span className="bg-brand-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow mb-2 w-max"><i className="fa-solid fa-user-group"></i> CORPORATE</span>
                    <h3 className="font-bold text-base sm:text-lg leading-tight mb-1">Bali Team Building</h3>
                    <p className="text-[10px] text-slate-300">Pesan 10 Gratis 1 Pax</p>
                </div>
            </div>
        </div>
      </section>

      <section className="py-10 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
                <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-brand-900 mb-1 tracking-tight">Best Seller Packages</h2>
                    <p className="text-slate-500 text-[11px] sm:text-sm">Paket liburan paling diminati oleh pelanggan kami.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { tagC: 'bg-accent-600', tagT: 'PRIVATE', img: 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa', title: 'Private Tour Bromo & Madakaripura', duration: '3D2N', loc: 'Malang/SBY', rate: '4.9', count: 128, priceAsli: 'Rp 1.500k', price: 'Rp 1.250k' },
                  { tagC: 'bg-brand-600', tagT: 'OPEN TRIP', img: 'https://images.unsplash.com/photo-1517441865-c32f8313bd8a', title: 'Open Trip Kawah Ijen Blue Fire', duration: '1 Hari', loc: 'Banyuwangi', rate: '4.8', count: 85, priceAsli: '-', price: 'Rp 350k' },
                  { tagC: 'bg-pink-500', tagT: 'HONEYMOON', img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5', title: 'Romantic Escape Malang & Batu Tour', duration: '3D2N', loc: 'Malang', rate: '5.0', count: 42, priceAsli: 'Rp 5.000k', price: 'Rp 4.500k' },
                  { tagC: 'bg-emerald-600', tagT: 'FAMILY', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4', title: 'Bali Explorer Family Fun Trip', duration: 'Custom', loc: 'Bali', rate: '4.9', count: 210, priceAsli: 'Mulai Dari', price: 'Rp 1.100k' }
                ].map((item, id) => (
                  <Link href={`/tours/${id+1}`} key={id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-brand-300 group transition-all duration-300 flex flex-col relative transform hover:-translate-y-1">
                      <div className="absolute top-2 right-2 z-10 bg-brand-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded shadow"><i className="fa-regular fa-clock"></i> {item.duration}</div>
                      <div className="relative h-28 sm:h-40 overflow-hidden bg-slate-100">
                          <img src={`${item.img}?w=400&q=70`} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                          <span className={`absolute top-2 left-2 ${item.tagC} text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow backdrop-blur`}>{item.tagT}</span>
                      </div>
                      <div className="p-3 sm:p-5 flex flex-col flex-grow group-hover:bg-brand-50/20 transition-colors">
                          <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-500 mb-1">
                              <i className="fa-solid fa-map-pin text-brand-600"></i> Start {item.loc}
                          </div>
                          <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1 line-clamp-2 leading-snug group-hover:text-brand-600">{item.title}</h3>
                          
                          <div className="flex items-center gap-1 mb-2 sm:mb-4">
                              <i className="fa-solid fa-star text-[8px] sm:text-[10px] text-yellow-400"></i>
                              <span className="text-[9px] sm:text-xs font-bold text-slate-700">{item.rate}</span>
                              <span className="text-[8px] sm:text-[10px] text-slate-400">({item.count})</span>
                          </div>

                          <div className="mt-auto pt-3 border-t border-slate-100 flex justify-between items-end">
                              <div>
                                  <p className="text-[8px] sm:text-[10px] text-slate-400 uppercase tracking-wider">{item.priceAsli !== '-' ? item.priceAsli : ' '}</p>
                                  <p className="text-accent-600 font-extrabold text-sm sm:text-lg leading-none">{item.price}<span className="text-[8px] font-medium text-slate-500">/{item.tagT==='HONEYMOON'?'cpl':'pax'}</span></p>
                              </div>
                              <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all shadow-sm">
                                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                              </button>
                          </div>
                      </div>
                  </Link>
                ))}
            </div>

            <div className="mt-8 sm:mt-10 text-center pb-8 border-b border-slate-200">
                <Link href="/tours" className="inline-block px-6 py-3 bg-white border border-slate-300 hover:border-brand-500 hover:bg-brand-50 text-slate-700 hover:text-brand-700 font-bold text-sm rounded-full transition-all duration-300 shadow-sm">
                    Lihat Semua Paket Tour <i className="fa-solid fa-arrow-right ml-1"></i>
                </Link>
            </div>
        </div>
      </section>
    </>
  );
}
