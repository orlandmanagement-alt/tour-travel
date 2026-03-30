'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Local state for optimistic UI updates
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    category: searchParams.get('category') || '',
    type: searchParams.get('type') || '',
    duration: searchParams.get('duration') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Auto-apply filters
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    router.push(`/tours?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      category: '',
      type: '',
      duration: '',
      minPrice: '',
      maxPrice: '',
    });
    router.push('/tours');
  };

  const categories = [
    { name: 'Pegunungan', icon: 'fa-mountain' },
    { name: 'Pantai & Pulau', icon: 'fa-umbrella-beach' },
    { name: 'City Tour', icon: 'fa-city' },
    { name: 'Honeymoon', icon: 'fa-heart' },
  ];

  return (
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

          {/* Duration */}
          <div>
            <label className="block text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Durasi Trip</label>
            <div className="space-y-2">
              {['1 Hari', '2D1N', '3D2N', '4D3N'].map((dur) => (
                <label key={dur} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer transition-all group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="duration" 
                      value={dur}
                      checked={filters.duration === dur}
                      onChange={() => handleFilterChange('duration', dur)}
                      className="peer h-5 w-5 opacity-0 cursor-pointer" 
                    />
                    <div className="absolute h-5 w-5 border-2 border-slate-300 dark:border-slate-600 rounded-lg group-hover:border-brand-primary transition-colors peer-checked:bg-brand-primary peer-checked:border-brand-primary"></div>
                    <i className="fa-solid fa-check absolute text-[10px] text-white opacity-0 peer-checked:opacity-100 font-black"></i>
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{dur}</span>
                </label>
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
  );
}
