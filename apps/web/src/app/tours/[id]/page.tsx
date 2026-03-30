import { notFound } from 'next/navigation';
import ImageCarousel from '@/components/ImageCarousel';
import PriceCalculator from '@/components/PriceCalculator';

// 1. Tambahkan ini agar build sukses di mode static export
// Kita return array kosong karena data akan diambil di sisi client jika tidak ada params saat build
export async function generateStaticParams() {
  return [];
}

// Memaksa halaman tetap dinamis di sisi client (hybrid)
export const dynamicParams = false;

// Fallback mock jika API tidak terjangkau
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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TourDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tourId = resolvedParams.id;
  
  let tour: any = null;
  
  // 2. Gunakan URL API Worker asli kamu untuk produksi
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://nusantaratrip-api.orlandmanagement.workers.dev';

  try {
    const res = await fetch(`${API_BASE}/api/tours/${tourId}`, { 
      next: { revalidate: 60 } // Cache selama 60 detik
    });
    
    if (res.ok) {
      const data = await res.json();
      tour = data.data;
    } else {
      throw new Error("Failed to fetch from API");
    }
  } catch(e) {
    console.error("Fetch error, using fallback mock:", e);
    // Fallback strategy: Jika tourId adalah Bromo, pakai mock
    if (tourId === '1' || tourId?.includes('BMO')) {
       tour = mockTourDetail;
    } else {
       // Mock dinamis sederhana jika ID lain
       tour = { ...mockTourDetail, tour_name: 'Paket Tour ' + tourId, id: tourId };
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
               <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">{tour.trip_type}</span>
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
             <div className="flex items-center bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
               <span className="mr-2">⏱</span>
               {tour.duration_days} Hari {tour.duration_nights > 0 ? `${tour.duration_nights} Malam` : ''}
             </div>
             <div className="flex items-center bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
               <span className="mr-2">🏔️</span>
               {tour.difficulty_level || 'Moderate'}
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery */}
        <div className="mb-12 shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-slate-800">
           <ImageCarousel images={galleryImages} altPrefix={tour.tour_name} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Form LEFT */}
          <div className="w-full lg:w-2/3 space-y-12">
            
             {/* Overview Section */}
             <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
               <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Informasi Tour</h2>
               <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                 Nikmati pengalaman tak terlupakan dengan paket {tour.tour_name}. Paket ini dirancang khusus untuk Anda yang ingin mengeksplorasi keindahan {tour.location_name} secara mendalam dengan fasilitas terbaik dari NusantaraTrip.
               </p>
             </section>

             {/* Itinerary Section */}
             <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
               <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Rencana Perjalanan</h2>
               <div className="space-y-6 relative before:absolute before:bg-slate-200 dark:before:bg-slate-700 before:w-1 before:h-full before:left-3.5 before:top-0">
                  {tour.itineraries?.map((item: any) => (
                    <div key={item.id} className="relative flex items-start pl-12 group">
                      <div className="absolute left-1.5 top-1.5 w-5 h-5 bg-blue-600 rounded-full border-4 border-white dark:border-slate-800 group-hover:scale-125 transition-transform"></div>
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl w-full border border-slate-100 dark:border-slate-700">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                           <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">{item.activity_title}</h4>
                           <span className="text-sm font-semibold text-blue-600 mt-1 sm:mt-0 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
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
               <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Syarat & Ketentuan</h2>
               <ul className="list-disc pl-5 space-y-3 text-slate-600 dark:text-slate-300">
                 <li>Harga berlaku sesuai dengan tanggal yang dipilih.</li>
                 <li>Pembatalan kurang dari 7 hari sebelum keberangkatan dikenakan biaya 50%.</li>
                 <li>Jadwal perjalanan dapat berubah sewaktu-waktu tergantung kondisi cuaca dan lapangan.</li>
                 <li>Peserta diharapkan dalam kondisi fisik yang sehat dan prima.</li>
               </ul>
             </section>
          </div>

          {/* Sticky Sidebar Right */}
          <div className="w-full lg:w-1/3">
             <div className="sticky top-24">
                <PriceCalculator tourData={tour} />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}