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
    difficulty: searchParams.get('difficulty') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    router.push(`/tours?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      category: '',
      type: '',
      difficulty: '',
      minPrice: '',
      maxPrice: '',
    });
    router.push('/tours');
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 h-fit sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold dark:text-slate-100 text-slate-800">Filters</h3>
        <button 
          onClick={clearFilters}
          className="text-sm font-medium text-brand-primary"
        >
          Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Destination</label>
          <select 
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-brand-primary dark:bg-slate-700 outline-none"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="">All Destinations</option>
            <option value="MLG">Malang</option>
            <option value="BWI">Banyuwangi</option>
            <option value="BMO">Bromo</option>
          </select>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
          <select 
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-brand-primary dark:bg-slate-700 outline-none"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Nature & Adventure">Nature & Adventure</option>
            <option value="Culture & History">Culture & History</option>
            <option value="Food & Culinary">Food & Culinary</option>
            <option value="Family Fun">Family Fun</option>
          </select>
        </div>

        {/* Trip Type */}
        <div>
           <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Trip Type</label>
           <div className="space-y-2">
             {['Open Trip', 'Private Trip'].map(type => (
               <label key={type} className="flex items-center space-x-3 cursor-pointer">
                 <input 
                   type="radio" 
                   name="tripType" 
                   value={type}
                   checked={filters.type === type}
                   onChange={() => handleFilterChange('type', type)}
                   className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-slate-300" 
                  />
                 <span className="text-sm text-slate-600 dark:text-slate-400">{type}</span>
               </label>
             ))}
           </div>
        </div>

         {/* Difficulty */}
         <div>
           <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Difficulty</label>
           <div className="space-y-2">
             {['Easy', 'Moderate', 'Hard'].map(level => (
               <label key={level} className="flex items-center space-x-3 cursor-pointer">
                 <input 
                   type="radio" 
                   name="difficulty" 
                   value={level}
                   checked={filters.difficulty === level}
                   onChange={() => handleFilterChange('difficulty', level)}
                   className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-slate-300" 
                  />
                 <span className="text-sm text-slate-600 dark:text-slate-400">{level}</span>
               </label>
             ))}
           </div>
        </div>

        {/* Apply Button */}
        <button 
          onClick={applyFilters}
          className="w-full py-3 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl font-semibold transition-all hover:shadow-lg"
        >
          Apply Filters
        </button>
      </div>

    </div>
  );
}
