import { notFound } from 'next/navigation';
import ImageCarousel from '@/components/ImageCarousel';
import PriceCalculator from '@/components/PriceCalculator';

// Fallback mock
const mockTourDetail = {
  id: 1,
  tour_code: 'T-BMO-MID',
  tour_name: 'Midnight Bromo Sunrise Tour',
  location_name: 'Bromo',
  category_name: 'Nature & Adventure',
  trip_type: 'Open Trip',
  duration_days: 1,
  duration_nights: 0,
  base_price: 350000,
  difficulty_level: 'Moderate',
  pricing_tiers: [
    { id: 1, min_pax: 1, max_pax: 10, price_per_pax: 350000 }
  ],
  itineraries: [
    { id: 1, day_number: 1, start_time: '00:00', end_time: '03:00', activity_title: 'Pickup & Travel', activity_description: 'Travel from Malang to Bromo area' },
    { id: 2, day_number: 1, start_time: '03:00', end_time: '06:00', activity_title: 'Penanjakan Sunrise', activity_description: 'Watch the incredible sunrise from Penanjakan Viewpoint' },
    { id: 3, day_number: 1, start_time: '06:00', end_time: '09:00', activity_title: 'Bromo Crater & Sea of Sand', activity_description: 'Trek to the smoking Bromo Crater' },
  ],
  addons: [
    { id: 1, addon_name: 'Horse Ride at Bromo', charge_type: 'per_pax', price: 150000 },
    { id: 2, addon_name: 'GoPro Rental', charge_type: 'per_group', price: 200000 },
  ],
  surcharges: [
    { id: 1, surcharge_name: 'Holiday Season', surcharge_type: 'flat_fee', surcharge_amount: 50000, start_date: '2025-12-20', end_date: '2026-01-05' }
  ]
};

export default async function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const tourId = resolvedParams.id;
  
  let tour: any = null;
  try {
    const res = await fetch(`http://127.0.0.1:8787/api/tours/${tourId}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      tour = data.data;
    } else {
      throw new Error("Failed");
    }
  } catch(e) {
    if (tourId === '1' || tourId === 'T-BMO-MID') {
       tour = mockTourDetail;
    } else {
       // Mock for others too
       tour = { ...mockTourDetail, tour_name: 'Awesome Tour ' + tourId, id: Number(tourId) || 99 };
    }
  }

  if (!tour) return notFound();

  const galleryImages = [
    'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=1200&q=80',
    'https://images.unsplash.com/photo-1517441865-c32f8313bd8a?w=1200&q=80',
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=80'
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-20">
      
      {/* Title & Meta Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <div className="flex items-center space-x-2 text-sm text-slate-500 mb-2">
               <span className="bg-brand-primary/10 text-brand-primary px-2 py-1 rounded font-medium">{tour.trip_type}</span>
               <span>•</span>
               <span>{tour.location_name}</span>
               <span>•</span>
               <span>{tour.category_name}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {tour.tour_name}
            </h1>
          </div>
          <div className="flex items-center space-x-4 text-sm font-medium text-slate-700 dark:text-slate-300">
             <div className="flex items-center bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow-sm">
               <span className="mr-2">⏱</span>
               {tour.duration_days} Days {tour.duration_nights > 0 ? `${tour.duration_nights} Nights` : ''}
             </div>
             <div className="flex items-center bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow-sm">
               <span className="mr-2">🏔️</span>
               {tour.difficulty_level || 'Moderate'}
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery */}
        <div className="mb-12 shadow-xl shadow-slate-200 dark:shadow-none rounded-2xl">
           <ImageCarousel images={galleryImages} altPrefix={tour.tour_name} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Form LEFT */}
          <div className="w-full lg:w-2/3 space-y-12">
            
             {/* Overview Section */}
             <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
               <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Overview</h2>
               <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                 Embark on an unforgettable journey with our {tour.tour_name} package. Designed for the adventurous spirit, this meticulously crafted {tour.trip_type.toLowerCase()} allows you to witness the breathtaking beauty of {tour.location_name} with the guidance of our expert local teams.
               </p>
             </section>

             {/* Itinerary Section */}
             <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
               <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Itinerary</h2>
               <div className="space-y-6 relative before:absolute before:bg-slate-200 dark:before:bg-slate-700 before:w-1 before:h-full before:left-3.5 before:top-0">
                  {tour.itineraries?.map((item: any, idx: number) => (
                    <div key={item.id} className="relative flex items-start pl-12 group">
                      <div className="absolute left-1.5 top-1.5 w-5 h-5 bg-brand-primary rounded-full border-4 border-white dark:border-slate-800 group-hover:scale-125 transition-transform"></div>
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl w-full border border-slate-100 dark:border-slate-700">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                           <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">{item.activity_title}</h4>
                           <span className="text-sm font-semibold text-brand-primary mt-1 sm:mt-0 bg-brand-primary/10 px-3 py-1 rounded-full">
                             {item.start_time} - {item.end_time}
                           </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">{item.activity_description}</p>
                      </div>
                    </div>
                  ))}
               </div>
             </section>

             {/* Terms */}
             <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
               <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Terms & Conditions</h2>
               <ul className="list-disc pl-5 space-y-3 text-slate-600 dark:text-slate-300">
                 <li>Pricing is valid for the selected date only. High season surcharges may apply.</li>
                 <li>Cancellations 7 days before departure receive a 50% refund.</li>
                 <li>The itinerary may be adjusted due to weather or natural circumstances for safety.</li>
                 <li>All participants must be in reasonable health condition.</li>
               </ul>
             </section>
          </div>

          {/* Sticky Sidebar Right */}
          <div className="w-full lg:w-1/3">
             <PriceCalculator tourData={tour} />
          </div>

        </div>
      </div>
    </div>
  );
}
