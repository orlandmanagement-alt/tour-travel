'use client';

import React, { useState, useMemo } from 'react';
import TourCard from './TourCard';
import TourModal from './TourModal';

type TourCatalogClientProps = {
  initialTours: any[];
};

export default function TourCatalogClient({ initialTours }: TourCatalogClientProps) {
  const [selectedTour, setSelectedTour] = useState<any | null>(null);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [tripType, setTripType] = useState<string>('');

  // Zero-Server-Load Filtering via useMemo
  const filteredTours = useMemo(() => {
    return initialTours.filter((tour) => {
      // 1. Search Logic
      if (searchTerm && !tour.tour_name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      
      // 2. Location Logic (OR within locations)
      if (selectedLocations.length > 0 && !selectedLocations.includes(tour.location_name)) return false;
      
      // 3. Category Logic
      if (selectedCategories.length > 0 && !selectedCategories.includes(tour.category_name)) return false;
      
      // 4. Trip Type Logic
      if (tripType && tour.trip_type !== tripType) return false;
      
      return true;
    });
  }, [initialTours, searchTerm, selectedLocations, selectedCategories, tripType]);

  const handleLocationToggle = (loc: string) => {
    setSelectedLocations(prev => 
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocations([]);
    setSelectedCategories([]);
    setTripType('');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Sidebar (Filters) */}
      <aside className="w-full lg:w-1/4 h-min bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Filters</h2>
          <button onClick={clearFilters} className="text-sm text-brand-primary hover:text-brand-primary-dark font-semibold transition-colors">
            Reset
          </button>
        </div>

        {/* Trip Type */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-sm">Trip Type</h3>
          <select 
            value={tripType} 
            onChange={(e) => setTripType(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
          >
            <option value="">All Types</option>
            <option value="Open Trip">Open Trip</option>
            <option value="Private Trip">Private Trip</option>
          </select>
        </div>

        {/* Locations */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-sm">Destinations</h3>
          <div className="space-y-3">
            {['Bromo', 'Banyuwangi', 'Malang', 'Bali'].map(loc => (
              <label key={loc} className="flex items-center group cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedLocations.includes(loc)}
                  onChange={() => handleLocationToggle(loc)}
                  className="w-5 h-5 rounded border-slate-300 text-brand-primary focus:ring-brand-primary accent-brand-primary bg-slate-50 dark:bg-slate-900 cursor-pointer transition-all"
                />
                <span className="ml-3 text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {loc}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-sm">Categories</h3>
          <div className="space-y-3">
            {['Nature & Adventure', 'Culture & History', 'Food & Culinary', 'Family Fun'].map(cat => (
              <label key={cat} className="flex items-center group cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                  className="w-5 h-5 rounded border-slate-300 text-brand-primary focus:ring-brand-primary accent-brand-primary bg-slate-50 dark:bg-slate-900 cursor-pointer transition-all"
                />
                <span className="ml-3 text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Right Content */}
      <main className="w-full lg:w-3/4">
        {/* Top Search & Meta Bar */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search tours, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-slate-900 dark:text-white transition-all"
            />
          </div>
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-800">
            Showing <span className="text-brand-primary font-bold">{filteredTours.length}</span> results
          </div>
        </div>

        {/* Grid Display */}
        {filteredTours.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 p-16 rounded-3xl border border-slate-200 dark:border-slate-700 text-center flex flex-col items-center justify-center animate-fade-in shadow-sm">
            <span className="text-7xl mb-6">🏝️</span>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">No Tours Found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 max-w-md">We couldn't find any packages matching your current filters. Try resetting them.</p>
            <button onClick={clearFilters} className="px-8 py-3 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredTours.map((tour: any) => {
              const formattedTour = {
                id: tour.id,
                tourCode: tour.tour_code,
                title: tour.tour_name,
                location: tour.location_name,
                category: tour.category_name,
                tripType: tour.trip_type,
                duration: `${tour.duration_days}D${tour.duration_nights > 0 ? `${tour.duration_nights}N` : ''}`,
                price: tour.base_price,
                imageUrl: tour.location_name === 'Bromo' ? 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=800&q=80' :
                          tour.location_name === 'Banyuwangi' ? 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=800&q=80' :
                          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80'
              };
              
              return (
                <div key={formattedTour.id} className="transition-all duration-500 ease-in-out">
                  <TourCard
                    {...formattedTour}
                    onQuickView={() => setSelectedTour(formattedTour)}
                  />
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
