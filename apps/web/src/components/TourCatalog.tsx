'use client';

import React, { useState } from 'react';
import TourCard from './TourCard';
import TourModal from './TourModal';

type TourCatalogProps = {
  tours: any[];
};

export default function TourCatalog({ tours }: TourCatalogProps) {
  const [selectedTour, setSelectedTour] = useState<any | null>(null);

  if (!tours || tours.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 p-12 rounded-2xl border border-slate-200 dark:border-slate-700 text-center flex flex-col items-center justify-center">
         <span className="text-6xl mb-4">🏜️</span>
         <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">No Tours Found</h3>
         <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters to find existing tour packages.</p>
       </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {tours.map((tour: any) => {
          const formattedTour = {
            id: tour.id,
            tourCode: tour.tour_code,
            title: tour.tour_name,
            location: tour.location_name,
            category: tour.category_name,
            tripType: tour.trip_type,
            duration: `${tour.duration_days}D${tour.duration_nights > 0 ? `${tour.duration_nights}N` : ''}`,
            price: tour.base_price,
            imageUrl: tour.location_name === 'Bromo' ? 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=500&q=80' :
                      tour.location_name === 'Banyuwangi' ? 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=500&q=80' :
                      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&q=80'
          };
          
          return (
            <TourCard
              key={formattedTour.id}
              {...formattedTour}
              onQuickView={() => setSelectedTour(formattedTour)}
            />
          );
        })}
      </div>

      <TourModal 
        isOpen={!!selectedTour} 
        onClose={() => setSelectedTour(null)} 
        tour={selectedTour} 
      />
    </>
  );
}
