'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import TourCard from './TourCard';
import TourModal from './TourModal';

type TourCatalogClientProps = {
  initialTours: any[];
};

export default function TourCatalogClient({ initialTours }: TourCatalogClientProps) {
  const searchParams = useSearchParams();
  const [selectedTour, setSelectedTour] = useState<any | null>(null);
  
  // Filter States (Synced with URL if needed, but primarily client-side for speed)
  const [filters, setFilters] = useState({
    searchTerm: '',
    location: searchParams.get('location') || '',
    category: searchParams.get('category') || '',
    type: searchParams.get('type') || '',
    duration: searchParams.get('duration') || '',
    minPrice: '',
    maxPrice: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      location: '',
      category: '',
      type: '',
      duration: '',
      minPrice: '',
      maxPrice: '',
    });
  };

  // Zero-Server-Load Filtering via useMemo
  const filteredTours = useMemo(() => {
    return initialTours.filter((tour) => {
      // 1. Search Logic
      if (filters.searchTerm && !tour.tour_name.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
      
      // 2. Location Logic
      if (filters.location && tour.location_name !== filters.location) return false;
      
      // 3. Category Logic
      if (filters.category && tour.category_name !== filters.category) return false;
      
      // 4. Trip Type Logic
      if (filters.type && tour.trip_type !== filters.type) return false;

      // 5. Price Logic
      if (filters.minPrice && tour.base_price < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && tour.base_price > parseInt(filters.maxPrice)) return false;
      
      return true;
    });
  }, [initialTours, filters]);

  const categories = [
    { name: 'Pegunungan', icon: 'fa-mountain' },
    { name: 'Pantai & Pulau', icon: 'fa-umbrella-beach' },
    { name: 'City Tour', icon: 'fa-city' },
    { name: 'Honeymoon', icon: 'fa-heart' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      
      {/* Left Sidebar (Filters) */}
      <aside className="lg:w-72 flex-shrink-0">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 h-fit sticky top-24">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
            <h3 className="text-xl font-extrabold dark:text-white text-slate-900 tracking-tight flex items-center gap-2">
              <i className="fa-solid fa-sliders text-brand-primary text-sm"></i> Filters
            </h3>
            <button 
              onClick={clearFilters}
              className="text-xs font-bold text-brand-primary hover:text-brand-accent transition-colors"
            >
              Reset All
            </button>
          </div>

          <div className="space-y-8">
            {/* Location Filter */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Keberangkatan</label>
              <div className="relative group">
                <i className="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors text-sm"></i>
                <select 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-primary/20 rounded-2xl focus:ring-2 focus:ring-brand-primary/10 outline-none text-sm font-bold text-slate-700 dark:text-slate-200 cursor-pointer transition-all appearance-none"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                >
                  <option value="">Semua Lokasi</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Malang">Malang</option>
                  <option value="Surabaya">Surabaya</option>
                  <option value="Banyuwangi">Banyuwangi</option>
                  <option value="Bali">Bali</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[10px]"></i>
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Kategori Trip</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => handleFilterChange('category', filters.category === cat.name ? '' : cat.name)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300 gap-2 ${
                      filters.category === cat.name
                      ? 'bg-brand-primary/10 border-brand-primary text-brand-primary shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 border-transparent text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700'
                    }`}
                  >
                    <i className={`fa-solid ${cat.icon} text-lg`}></i>
                    <span className="text-[10px] font-bold text-center leading-tight">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trip Type */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Tipe Perjalanan</label>
              <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
                {['All', 'Private', 'Open Trip'].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleFilterChange('type', type === 'All' ? '' : type)}
                    className={`flex-1 py-2 text-[11px] font-bold rounded-lg transition-all ${
                      (type === 'All' && !filters.type) || filters.type === type
                      ? 'bg-white dark:bg-slate-800 text-brand-primary shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Estimasi Harga (IDR)</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs font-bold focus:ring-2 focus:ring-brand-primary outline-none"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
                <span className="text-slate-400 font-bold">-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs font-bold focus:ring-2 focus:ring-brand-primary outline-none"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Content */}
      <main className="flex-grow">
        {/* Top Search & Results Bar */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:max-w-md group">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors text-sm"></i>
            <input
              type="text"
              placeholder="Cari tour, destinasi, atau kode trip..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-primary/20 rounded-2xl focus:ring-4 focus:ring-brand-primary/5 outline-none text-sm font-medium text-slate-700 dark:text-slate-200 transition-all"
            />
          </div>
          <div className="text-xs font-bold text-slate-500 bg-slate-50 dark:bg-slate-900 px-5 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 backdrop-blur-sm shadow-inner">
            Menampilkan <span className="text-brand-primary px-1.5 py-0.5 bg-brand-primary/10 rounded-md">{filteredTours.length}</span> Paket Tersedia
          </div>
        </div>

        {/* Grid Display */}
        {filteredTours.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 p-20 rounded-[3rem] border border-slate-100 dark:border-slate-700 text-center flex flex-col items-center justify-center animate-fade-in shadow-xl">
            <div className="w-24 h-24 rounded-3xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-5xl mb-8 shadow-inner border border-slate-100 dark:border-slate-800">
              🏝️
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">Tidak Ada Tour Ditemukan</h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-10 max-w-sm font-medium">Cobalah untuk mengubah filter atau kata kunci pencarian Anda untuk menemukan paket lainnya.</p>
            <button 
              onClick={clearFilters} 
              className="px-10 py-4 bg-brand-primary hover:bg-brand-primary-dark text-white font-black rounded-2xl shadow-xl shadow-brand-primary/20 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Reset Filter & Cari Lagi
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 animate-fade-in-up">
            {filteredTours.map((tour: any) => {
              const formattedTour = {
                id: tour.id,
                tourCode: tour.tour_code,
                title: tour.tour_name,
                location: tour.location_name,
                category: tour.category_name,
                tripType: tour.trip_type,
                duration: `${tour.duration_days}D${tour.duration_nights > 0 ? `${tour.duration_nights}N` : tour.duration_days === 1 ? '' : '...'}`,
                price: tour.base_price,
                imageUrl: tour.location_name === 'Bromo' ? 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=800&q=80' :
                          tour.location_name === 'Banyuwangi' ? 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=800&q=80' :
                          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80'
              };
              
              return (
                <div key={formattedTour.id} className="transition-all duration-500 ease-in-out">
                  <TourCard {...formattedTour} />
                </div>
              );
            })}
          </div>
        )}

        <TourModal 
          isOpen={!!selectedTour} 
          onClose={() => setSelectedTour(null)} 
          tour={selectedTour} 
        />
      </main>
    </div>
  );
}
