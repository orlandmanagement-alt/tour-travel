import { Suspense } from 'react';
import FilterSidebar from '@/components/FilterSidebar';
import TourCatalog from '@/components/TourCatalog';

export const metadata = {
  title: 'Tour Packages | NusantaraTrip',
  description: 'Browse our extensive collection of tour packages.',
};

// 1. Force static rendering untuk mode export
export const dynamic = 'force-static';

const mockTours = [
  { id: '1', tour_code: 'T-BMO-MID', tour_name: 'Midnight Bromo Sunrise Tour', location_name: 'Bromo', category_name: 'Nature & Adventure', trip_type: 'Open Trip', duration_days: 1, duration_nights: 0, base_price: 350000 },
  { id: '2', tour_code: 'T-BWI-IJEN', tour_name: 'Ijen Blue Fire Trekking', location_name: 'Banyuwangi', category_name: 'Nature & Adventure', trip_type: 'Private Trip', duration_days: 2, duration_nights: 1, base_price: 750000 },
  { id: '3', tour_code: 'T-MLG-CITY', tour_name: 'Malang City Sightseeing', location_name: 'Malang', category_name: 'Culture & History', trip_type: 'Private Trip', duration_days: 1, duration_nights: 0, base_price: 400000 },
  { id: '4', tour_code: 'T-BMO-2D1N', tour_name: 'Bromo 2 Days 1 Night Explorer', location_name: 'Bromo', category_name: 'Nature & Adventure', trip_type: 'Open Trip', duration_days: 2, duration_nights: 1, base_price: 1200000 }
];

// 2. Buat komponen terpisah untuk menangani konten yang butuh searchParams
async function ToursContent({ searchParams }: { searchParams: any }) {
  const unresolvedSearchParams = await searchParams;
  const location = unresolvedSearchParams.location as string || '';
  const category = unresolvedSearchParams.category as string || '';
  const type = unresolvedSearchParams.type as string || '';
  const difficulty = unresolvedSearchParams.difficulty as string || '';

  let tours = [];
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://nusantaratrip-api.orlandmanagement.workers.dev';

  try {
    const query = new URLSearchParams();
    if (location) query.append('location', location);
    if (category) query.append('category', category);
    if (type) query.append('type', type);
    if (difficulty) query.append('difficulty', difficulty);

    const apiUrl = `${API_BASE}/api/tours?${query.toString()}`;
    const res = await fetch(apiUrl, { next: { revalidate: 60 } });
    
    if (res.ok) {
      const data = await res.json();
      tours = data.data;
    } else {
      throw new Error("Failed");
    }
  } catch (err) {
    // Filter mock data sebagai fallback
    tours = mockTours.filter(t => {
      let match = true;
      if (location && !t.location_name.includes(location)) match = false;
      if (category && t.category_name !== category) match = false;
      if (type && t.trip_type !== type) match = false;
      return match;
    });
  }

  return (
    <>
      <div className="bg-blue-600/10 dark:bg-blue-600/20 py-12 mb-12 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Tour Catalog</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">Ditemukan {tours.length} paket tour untuk petualangan Anda.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <FilterSidebar />
        </aside>
        <main className="w-full lg:w-3/4">
          <TourCatalog tours={tours} />
        </main>
      </div>
    </>
  );
}

// 3. Main Page yang aman untuk Build Statis
export default function ToursPage(props: { searchParams: Promise<any> }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Suspense adalah kunci agar mode export tidak error saat bertemu searchParams */}
        <Suspense fallback={
          <div className="text-center py-20">
            <div className="animate-spin text-4xl mb-4">🌀</div>
            <p>Memuat katalog tour...</p>
          </div>
        }>
          <ToursContent searchParams={props.searchParams} />
        </Suspense>
      </div>
    </div>
  );
}