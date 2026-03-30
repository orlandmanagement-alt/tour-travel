import FilterSidebar from '@/components/FilterSidebar';
import TourCatalog from '@/components/TourCatalog';

export const metadata = {
  title: 'Tour Packages | NusantaraTrip',
  description: 'Browse our extensive collection of tour packages.',
};

// Fallback mock data in case API is down during development
const mockTours = [
  {
    id: '1',
    tour_code: 'T-BMO-MID',
    tour_name: 'Midnight Bromo Sunrise Tour',
    location_name: 'Bromo',
    category_name: 'Nature & Adventure',
    trip_type: 'Open Trip',
    duration_days: 1,
    duration_nights: 0,
    base_price: 350000,
  },
  {
    id: '2',
    tour_code: 'T-BWI-IJEN',
    tour_name: 'Ijen Blue Fire Trekking',
    location_name: 'Banyuwangi',
    category_name: 'Nature & Adventure',
    trip_type: 'Private Trip',
    duration_days: 2,
    duration_nights: 1,
    base_price: 750000,
  },
  {
    id: '3',
    tour_code: 'T-MLG-CITY',
    tour_name: 'Malang City Sightseeing',
    location_name: 'Malang',
    category_name: 'Culture & History',
    trip_type: 'Private Trip',
    duration_days: 1,
    duration_nights: 0,
    base_price: 400000,
  },
  {
    id: '4',
    tour_code: 'T-BMO-2D1N',
    tour_name: 'Bromo 2 Days 1 Night Explorer',
    location_name: 'Bromo',
    category_name: 'Nature & Adventure',
    trip_type: 'Open Trip',
    duration_days: 2,
    duration_nights: 1,
    base_price: 1200000,
  }
];

// In Next.js App Router, page props can include searchParams
export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const unresolvedSearchParams = await searchParams;
  const location = unresolvedSearchParams.location as string || '';
  const category = unresolvedSearchParams.category as string || '';
  const type = unresolvedSearchParams.type as string || '';
  const difficulty = unresolvedSearchParams.difficulty as string || '';

  // Attempt to fetch from API, fallback to mock data
  let tours = [];
  try {
    const query = new URLSearchParams();
    if (location) query.append('location', location);
    if (category) query.append('category', category);
    if (type) query.append('type', type);
    if (difficulty) query.append('difficulty', difficulty);

    // Note: Use absolute URL for server-side fetch. 
    // Assuming Cloudflare worker runs on 8787 in local dev.
    const apiUrl = `http://127.0.0.1:8787/api/tours?${query.toString()}`;
    const res = await fetch(apiUrl, { cache: 'no-store' });
    
    if (res.ok) {
      const data = await res.json();
      tours = data.data;
    } else {
      throw new Error("API not accessible, using mock");
    }
  } catch (err) {
    // console.log("Using mock data due to API error:", err);
    // Client-side simple filter for mock data to make demo interactive
    tours = mockTours.filter(t => {
      let match = true;
      if (location && t.location_name !== (location === 'BMO' ? 'Bromo' : location === 'BWI' ? 'Banyuwangi' : 'Malang')) match = false;
      if (category && t.category_name !== category) match = false;
      if (type && t.trip_type !== type) match = false;
      return match;
    });
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-20">
      
      {/* Header */}
      <div className="bg-brand-primary/10 dark:bg-brand-primary/20 py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Tour Catalog</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">Browse {tours.length} available packages for your next adventure.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        
        {/* Filter Sidebar (25%) */}
        <aside className="w-full lg:w-1/4">
          <FilterSidebar />
        </aside>

        {/* Catalog Grid (75%) */}
        <main className="w-full lg:w-3/4">
          <TourCatalog tours={tours} />
        </main>
        
      </div>
    </div>
  );
}
