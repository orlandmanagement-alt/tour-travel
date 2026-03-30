import { Suspense } from 'react';
import TourCatalogClient from '@/components/TourCatalogClient';

export const metadata = {
  title: 'Tour Packages | NusantaraTrip',
  description: 'Browse our extensive collection of tour packages.',
};

export const dynamic = 'force-static';

const mockTours = [
  { id: '1', tour_code: 'T-BMO-MID', tour_name: 'Midnight Bromo Sunrise Tour', location_name: 'Bromo', category_name: 'Nature & Adventure', trip_type: 'Open Trip', duration_days: 1, duration_nights: 0, base_price: 350000 },
  { id: '2', tour_code: 'T-BWI-IJEN', tour_name: 'Ijen Blue Fire Trekking', location_name: 'Banyuwangi', category_name: 'Nature & Adventure', trip_type: 'Private Trip', duration_days: 2, duration_nights: 1, base_price: 750000 },
  { id: '3', tour_code: 'T-MLG-CITY', tour_name: 'Malang City Sightseeing', location_name: 'Malang', category_name: 'Culture & History', trip_type: 'Private Trip', duration_days: 1, duration_nights: 0, base_price: 400000 },
  { id: '4', tour_code: 'T-BMO-2D1N', tour_name: 'Bromo 2 Days 1 Night Explorer', location_name: 'Bromo', category_name: 'Nature & Adventure', trip_type: 'Open Trip', duration_days: 2, duration_nights: 1, base_price: 1200000 }
];

async function ToursContent() {
  let tours = [];
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://nusantaratrip-api.orlandmanagement.workers.dev';

  try {
    // 1. Ambil 100% data TEPAT SEKALI dari server (Zero Server Load ke depannya)
    const res = await fetch(`${API_BASE}/api/tours`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      tours = data.data;
    } else {
      throw new Error("Failed");
    }
  } catch (err) {
    tours = mockTours; // fallback
  }

  return (
    <>
      <div className="bg-gradient-to-r from-slate-900 to-brand-primary-dark text-white py-16 mb-12 rounded-[2rem] shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=1600&q=80')] opacity-20 mix-blend-overlay bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-sm font-bold mb-6 tracking-wide">
            EXPLORE THE ARCHIPELAGO
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-md">Tour Catalog</h1>
          <p className="text-lg md:text-xl text-blue-100/90 font-medium max-w-2xl mx-auto">Found {tours.length} premium tour packages for your next extraordinary adventure.</p>
        </div>
      </div>

      <TourCatalogClient initialTours={tours} />
    </>
  );
}

export default function ToursPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="text-center py-32 flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-brand-primary rounded-full animate-spin mb-6"></div>
            <p className="text-slate-500 font-medium text-lg animate-pulse">Fetching catalogs...</p>
          </div>
        }>
          <ToursContent />
        </Suspense>
      </div>
    </div>
  );
}