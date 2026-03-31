'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WishlistPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [items, setItems] = useState([
    {
        id: 'item-1',
        category: 'tour',
        title: 'Private Tour Bromo Midnight & Madakaripura',
        image: 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=600',
        badge: 'Private Tour',
        location: 'Start Malang / Surabaya',
        priceLabel: 'Mulai Dari',
        price: 'Rp 1.250k',
        unit: '/pax',
        tagColor: 'text-accent-600',
        link: '/tours/private-bromo',
        buttonText: 'Cek Detail'
    },
    {
        id: 'item-2',
        category: 'car',
        title: 'Toyota Innova Zenix Hybrid (2024)',
        image: 'https://images.unsplash.com/photo-1620067677840-7ac53577d2ec?w=600',
        badge: 'Rental Mobil',
        location: '7 Kursi • AT',
        priceLabel: 'Per Hari',
        price: 'Rp 850k',
        unit: '/hari',
        tagColor: 'text-brand-600',
        link: '/cars/innova-zenix',
        buttonText: 'Pesan',
        isCar: true
    },
    {
        id: 'item-3',
        category: 'tour',
        title: 'Explore Japan Golden Route Autumn Season',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600',
        badge: 'Open Trip Intl',
        location: 'Tokyo - Kyoto - Osaka',
        priceLabel: 'Rp 21.500.000',
        price: 'Rp 18.500k',
        unit: '/pax',
        tagColor: 'text-blue-600',
        link: '/tours/japan-golden-route',
        buttonText: 'Cek Detail',
        isStrike: true
    }
  ]);

  const [removedItem, setRemovedItem] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const removeItem = (id: string) => {
    setRemovedItem(id);
    setTimeout(() => {
        setItems(prev => prev.filter(item => item.id !== id));
        setRemovedItem(null);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    }, 400); // match animation duration
  };

  const filteredItems = items.filter(item => activeTab === 'all' || item.category === activeTab);

  return (
    <div className="text-slate-800 antialiased overflow-x-hidden bg-slate-50 min-h-screen relative">
        
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
                <Link href="/dashboard/wishlist" className="whitespace-nowrap px-4 py-2 bg-brand-50 text-brand-600 font-bold text-xs rounded-full border border-brand-200">Wishlist</Link>
                <Link href="/dashboard/profile" className="whitespace-nowrap px-4 py-2 bg-white text-slate-600 hover:bg-slate-50 font-medium text-xs rounded-full border border-slate-200">Profil</Link>
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
                    <Link href="/dashboard" className="px-5 py-3 text-sm text-slate-600 font-medium hover:bg-slate-50 transition-colors flex items-center gap-3 border-l-4 border-transparent">
                        <i className="fa-solid fa-clipboard-list w-5 text-center text-slate-400"></i> Pesanan Saya
                    </Link>
                    <Link href="/dashboard/affiliate" className="px-5 py-3 text-sm text-slate-600 font-medium hover:bg-slate-50 transition-colors flex items-center gap-3 border-l-4 border-transparent">
                        <i className="fa-solid fa-handshake-angle w-5 text-center text-slate-400"></i> Afiliasi Saya
                    </Link>
                    <Link href="/dashboard/wishlist" className="px-5 py-3 text-sm text-brand-600 font-bold bg-brand-50 flex items-center gap-3 border-l-4 border-brand-600">
                        <i className="fa-solid fa-heart w-5 text-center text-brand-500"></i> Wishlist Tersimpan
                    </Link>
                    <div className="border-t border-slate-100 my-2 mx-5"></div>
                    <Link href="/dashboard/profile" className="px-5 py-3 text-sm text-slate-600 font-medium hover:bg-slate-50 transition-colors flex items-center gap-3 border-l-4 border-transparent">
                        <i className="fa-regular fa-user w-5 text-center text-slate-400"></i> Pengaturan Profil
                    </Link>
                    <Link href="/login" className="px-5 py-3 text-sm text-slate-600 font-medium flex items-center gap-3 text-red-500 hover:bg-red-50">
                        <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center"></i> Keluar
                    </Link>
                </nav>
            </div>
        </aside>

        {/* RIGHT CONTENT (Daftar Wishlist) */}
        <div className="flex-1 w-full min-w-0">
            
            <div className="flex justify-between items-end mb-2">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">Wishlist Tersimpan</h1>
                    <p className="text-sm text-slate-500 mt-1">Lanjutkan rencana liburan Anda dengan item yang sudah disimpan.</p>
                </div>
                <span className="bg-brand-100 text-brand-600 font-bold text-xs px-3 py-1.5 rounded-lg hidden sm:inline-block">
                    {items.length} Item Tersimpan
                </span>
            </div>

            {/* TABS KATEGORI WISHLIST */}
            <div className="flex overflow-x-auto border-b border-slate-200 mt-6 mb-6" style={{ scrollbarWidth: 'none' }}>
                <button className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-bottom border-b-2 ${activeTab === 'all' ? 'border-brand-600 text-brand-600 font-bold' : 'border-transparent text-slate-500'}`} onClick={() => setActiveTab('all')}>Semua Item</button>
                <button className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-bottom border-b-2 ${activeTab === 'tour' ? 'border-brand-600 text-brand-600 font-bold' : 'border-transparent text-slate-500'}`} onClick={() => setActiveTab('tour')}>Paket Tour</button>
                <button className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-bottom border-b-2 ${activeTab === 'car' ? 'border-brand-600 text-brand-600 font-bold' : 'border-transparent text-slate-500'}`} onClick={() => setActiveTab('car')}>Rental Mobil</button>
            </div>

            {/* GRID WISHLIST */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredItems.map(item => (
                      <div key={item.id} className={`bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col relative transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:border-brand-200 ${removedItem === item.id ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
                          
                          {/* Remove Button */}
                          <button onClick={() => removeItem(item.id)} className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full text-red-500 flex items-center justify-center shadow-md hover:bg-red-50 transition-colors" title="Hapus dari Wishlist">
                              <i className="fa-solid fa-heart"></i>
                          </button>
                          
                          <div className={`relative h-36 overflow-hidden flex items-center justify-center ${item.isCar ? 'bg-slate-100' : ''}`}>
                              <img src={item.image} className={`w-full h-full ${item.isCar ? 'object-contain mix-blend-multiply p-2' : 'object-cover group-hover:scale-110 transition-transform duration-700'}`} alt={item.title} />
                              <span className={`absolute top-3 left-3 bg-white/90 ${item.tagColor} text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm shadow-sm uppercase`}>{item.badge}</span>
                          </div>
                          
                          <div className="p-4 flex flex-col flex-grow">
                              {item.isCar && <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wide mb-1">Toyota</div>}
                              <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-2 leading-snug">{item.title}</h3>
                              <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                                  {item.isCar ? (
                                    <>
                                        <span><i className="fa-solid fa-users text-slate-400 mr-1"></i> {item.location.split('•')[0]}</span>
                                        <span className="mx-1">•</span>
                                        <span><i className="fa-solid fa-gears text-slate-400 mr-1"></i> {item.location.split('•')[1]}</span>
                                    </>
                                  ) : (
                                    <><i className={`fa-solid ${item.id === 'item-3' ? 'fa-globe' : 'fa-location-dot'} text-brand-500`}></i> {item.location}</>
                                  )}
                              </p>
                              
                              {/* Harga & Action */}
                              <div className="mt-auto pt-3 border-t border-slate-100 flex justify-between items-end">
                                  <div>
                                      {item.isStrike ? (
                                          <p className="text-[9px] text-slate-400 line-through mb-0.5">{item.priceLabel}</p>
                                      ) : (
                                          <p className="text-[9px] font-bold text-slate-400 uppercase">{item.priceLabel}</p>
                                      )}
                                      <p className={`${item.tagColor === 'text-accent-600' ? 'text-brand-600' : item.tagColor === 'text-blue-600' ? 'text-accent-600' : 'text-brand-600'} font-extrabold text-base leading-none`}>
                                          {item.price}<span className="text-[9px] font-medium text-slate-500">{item.unit}</span>
                                      </p>
                                  </div>
                                  <Link href={item.link} className="px-4 py-2 bg-brand-50 text-brand-600 font-bold text-xs rounded-lg hover:bg-brand-600 hover:text-white transition-colors shadow-sm">
                                      {item.buttonText}
                                  </Link>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 text-4xl mb-4">
                      <i className="fa-regular fa-heart"></i>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Wishlist Anda Kosong</h3>
                  <p className="text-sm text-slate-500 mb-6 max-w-md">Kumpulkan destinasi dan paket tour impian Anda dengan menekan ikon hati. Yuk mulai eksplorasi!</p>
                  <Link href="/tours" className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/30 transition-all">
                      Cari Paket Liburan
                  </Link>
              </div>
            )}

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

      {/* Notifikasi Toast Hapus */}
      <div className={`fixed bottom-5 right-5 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl z-[100] font-bold text-sm flex items-center gap-3 transition-all duration-300 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <i className="fa-solid fa-heart-crack text-red-400 text-lg"></i> 
          <span>Item dihapus dari Wishlist</span>
      </div>

    </div>
  );
}
