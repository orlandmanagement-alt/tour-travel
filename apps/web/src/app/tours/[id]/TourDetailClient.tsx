'use client';

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import StickyBookingWidget from '@/components/StickyBookingWidget';
import ItineraryTimeline from '@/components/ItineraryTimeline';
import ReviewSection from '@/components/ReviewSection';

// Mock Data Fallback
const mockTourDetail = {
  id: 1,
  tour_code: 'T-BMO-MID',
  tour_name: 'Private Tour Bromo Midnight & Air Terjun Madakaripura',
  location_name: 'Bromo',
  category_name: 'Nature & Adventure',
  trip_type: 'Private',
  duration_days: 1,
  duration_nights: 0,
  base_price: 1250000,
  difficulty_level: 'Moderate',
  pricing_tiers: [
    { id: 1, min_pax: 1, max_pax: 1, price_per_pax: 2200000 },
    { id: 2, min_pax: 2, max_pax: 2, price_per_pax: 1250000 },
    { id: 3, min_pax: 3, max_pax: 3, price_per_pax: 1100000 },
    { id: 4, min_pax: 4, max_pax: 10, price_per_pax: 1000000 },
  ],
  itineraries: [
    { id: 1, day_number: 1, start_time: '00:00', end_time: '03:00', activity_title: 'Penjemputan & Perjalanan ke Bromo', activity_description: 'Tim kami akan menjemput Anda di lokasi yang telah disepakati di area Malang atau Surabaya (Hotel/Stasiun/Bandara). Perjalanan malam menuju area transit di Sukapura/Wonokitri memakan waktu sekitar 2-3 jam. Setibanya di sana, Anda akan berganti kendaraan dari mobil MPV ke Jeep 4WD.' },
    { id: 2, day_number: 1, start_time: '03:00', end_time: '06:00', activity_title: 'Menyaksikan Golden Sunrise Bromo', activity_description: 'Menggunakan Jeep, kita akan menanjak membelah lautan pasir dalam gelap menuju titik pandang (Penanjakan 1 / Bukit Kingkong / Bukit Cinta). Setibanya di sana, Anda bisa bersantai sejenak sambil ngopi sebelum menikmati momen magis matahari terbit (Golden Sunrise).' },
    { id: 3, day_number: 1, start_time: '06:00', end_time: '09:30', activity_title: 'Eksplorasi Kawah Bromo & Area Taman Nasional', activity_description: 'Setelah puas menikmati sunrise, Jeep akan membawa Anda turun ke Lautan Pasir. Anda bisa berjalan kaki atau menyewa kuda menuju bibir Kawah Bromo. Selanjutnya perjalanan dilanjutkan ke spot foto ikonik: Pasir Berbisik dan Padang Savana (Bukit Teletubbies).' },
    { id: 4, day_number: 1, start_time: '10:30', end_time: '13:00', activity_title: 'Trekking Air Terjun Madakaripura', activity_description: 'Kita meninggalkan Bromo menuju Lumbang, Probolinggo untuk mengunjungi Air Terjun Madakaripura. Setiba di parkiran, dilanjutkan naik ojek lokal dan trekking menyusuri sungai berbatu sekitar 20 menit.' },
    { id: 5, day_number: 1, start_time: '13:00', end_time: '15:30', activity_title: 'Perjalanan Pulang (End of Tour)', activity_description: 'Meninggalkan Madakaripura, perjalanan kembali menuju Malang atau Surabaya. Kita bisa singgah sejenak untuk makan siang di restoran lokal (biaya pribadi). Tiba di titik drop-off, tour selesai dengan membawa kenangan indah.' },
  ],
  addons: [
    { id: 1, addon_name: 'Horse Ride at Bromo', charge_type: 'per_pax', price: 150000 },
    { id: 2, addon_name: 'GoPro Rental', charge_type: 'per_group', price: 200000 },
  ],
  highlights: [
    'Menikmati Golden Sunrise di Penanjakan 1',
    'Berpetualang dengan Jeep 4WD Hardtop',
    'Mengunjungi Kawah Bromo & Pura Luhur',
    'Trekking di Air Terjun Madakaripura'
  ],
  inclusions: [
    'Transportasi Private AC (Innova/Hiace) PP',
    'Sewa Jeep 4WD Bromo Khusus Rombongan',
    'Tiket Masuk Taman Nasional Bromo Tengger',
    'Tiket Masuk Air Terjun Madakaripura',
    'Driver merangkap Guide Ramah',
    'BBM, Toll, dan Biaya Parkir',
    'Air Mineral 600ml per peserta'
  ],
  exclusions: [
    'Tiket Pesawat / Kereta Api dari kota asal',
    'Biaya Makan (Sarapan/Siang)',
    'Sewa Kuda di area Kawah Bromo',
    'Sewa Ojek Payung di Madakaripura',
    'Tipping Guide/Driver (Sukarela)',
    'Pengeluaran Pribadi lainnya'
  ]
};

interface TourDetailClientProps {
  id: string;
}

export default function TourDetailClient({ id }: TourDetailClientProps) {
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTour() {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://nusantaratrip-api.orlandmanagement.workers.dev';
      try {
        const res = await fetch(`${API_BASE}/api/tours/${id}`);
        if (res.ok) {
          const data = await res.json();
          setTour(data.data);
        } else {
          throw new Error("API response not ok");
        }
      } catch (e) {
        console.warn("Using fallback mock for tour ID:", id);
        setTour(mockTourDetail);
      } finally {
        setLoading(false);
      }
    }
    fetchTour();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-40 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!tour) return notFound();

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-28 pb-20 font-sans">
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": tour.tour_name,
            "image": [
              "https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=1200&q=80"
            ],
            "description": `Nikmati pengalaman tak terlupakan menjelajahi keajaiban alam dengan ${tour.tour_name}.`,
            "sku": tour.tour_code,
            "brand": {
              "@type": "Brand",
              "name": "NusantaraTrip"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": tour.average_rating || 4.9,
              "reviewCount": tour.review_count || 128
            },
            "offers": {
              "@type": "Offer",
              "url": `https://nusantaratrip.com/tours/${tour.id}`,
              "priceCurrency": "IDR",
              "price": tour.base_price,
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs & Header Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <nav className="flex text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center"><a href="/" className="hover:text-brand-primary transition-colors">Beranda</a></li>
              <li><div className="flex items-center"><i className="fa-solid fa-chevron-right text-[8px] mx-1 opacity-50"></i><a href="/tours" className="hover:text-brand-primary transition-colors">Paket Tour</a></div></li>
              <li><div className="flex items-center"><i className="fa-solid fa-chevron-right text-[8px] mx-1 opacity-50"></i><span className="text-slate-900 dark:text-white">{tour.location_name}</span></div></li>
            </ol>
          </nav>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-xs font-black text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-all px-4 py-2 rounded-xl hover:bg-white dark:hover:bg-slate-800 shadow-sm border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
              <i className="fa-solid fa-arrow-up-from-bracket"></i> BAGIKAN
            </button>
            <button className="flex items-center gap-2 text-xs font-black text-slate-600 dark:text-slate-400 hover:text-red-500 transition-all px-4 py-2 rounded-xl hover:bg-white dark:hover:bg-slate-800 shadow-sm border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
              <i className="fa-regular fa-heart"></i> SIMPAN
            </button>
          </div>
        </div>

        {/* Tour Title Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-brand-accent/10 text-brand-accent border border-brand-accent/20 text-[10px] font-black px-3 py-1 rounded-lg shadow-sm tracking-wider uppercase">
              {tour.trip_type} TRIP
            </span>
            <span className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-[10px] font-black px-3 py-1 rounded-lg shadow-sm tracking-wider uppercase">
              <i className="fa-solid fa-bolt mr-1.5"></i>INSTANT CONFIRMATION
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 max-w-4xl">
            {tour.tour_name}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
              <i className="fa-solid fa-star text-yellow-400"></i>
              <span className="font-black">4.9</span>
              <span className="text-slate-400 font-bold ml-1 hover:text-brand-primary cursor-pointer transition-colors">(128 Ulasan)</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-brand-primary"></i> Start {tour.location_name}
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-clock text-brand-primary"></i> {tour.duration_days} Hari {tour.duration_nights > 0 ? `${tour.duration_nights} Malam` : ''}
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-mountain text-brand-primary"></i> {tour.difficulty_level || 'Moderate'}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[350px] md:h-[500px] rounded-[2.5rem] overflow-hidden mb-12 relative group cursor-pointer shadow-2xl border-4 border-white dark:border-slate-800">
          <div className="md:col-span-3 h-full w-full relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=1200&q=80" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
              alt={tour.tour_name} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="hidden md:flex flex-col gap-3 h-full w-full">
            <div className="h-1/2 w-full relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1518090597335-e6f7783ee855?w=600&q=80" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Gallery 2" />
            </div>
            <div className="h-1/2 w-full relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=600&q=80" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Gallery 3" />
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center transition-all hover:bg-slate-900/40">
                <i className="fa-regular fa-images text-white text-2xl mb-2"></i>
                <span className="text-white font-black text-xs tracking-widest uppercase">+12 Foto</span>
              </div>
            </div>
          </div>
          <button className="absolute bottom-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white text-[10px] font-black px-6 py-3 rounded-2xl shadow-2xl border border-white/20 hover:bg-white transition-all transform hover:-translate-y-1 md:hidden uppercase tracking-widest">
            Lihat Galeri
          </button>
        </div>

        {/* Content & Booking Layout */}
        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Main Content Area (Left) */}
          <div className="flex-1 w-full min-w-0 space-y-16 pb-20">
            
            {/* Highlights Section */}
            <div className="bg-brand-primary/5 dark:bg-slate-800/50 border border-brand-primary/10 dark:border-slate-700 rounded-[2rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl"></div>
              <h3 className="font-black text-brand-primary dark:text-blue-400 text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-brand-primary/30"></span> Highlights Perjalanan
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm md:text-base text-slate-700 dark:text-slate-300 font-bold">
                {(tour.highlights || mockTourDetail.highlights).map((hl: string, i: number) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-lg bg-brand-primary text-white flex items-center justify-center flex-shrink-0 text-[10px] shadow-lg shadow-brand-primary/20">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <span className="leading-tight">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description Section */}
            <section id="deskripsi">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight flex items-center gap-4">
                Deskripsi Paket
                <div className="h-px flex-grow bg-slate-100 dark:bg-slate-800"></div>
              </h2>
              <div className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-[1.8] space-y-6 font-medium">
                <p>Nikmati pengalaman tak terlupakan menjelajahi keajaiban alam Jawa Timur dengan <strong>{tour.tour_name}</strong>. Paket ini dirancang khusus untuk Anda yang ingin menikmati privasi dan kenyamanan maksimal tanpa harus bergabung dengan peserta lain.</p>
                <p>Perjalanan akan dimulai pada tengah malam langsung menuju area transit Bromo. Menggunakan armada Jeep 4WD klasik, kita akan membelah lautan pasir menuju titik tertinggi di Penanjakan untuk menyaksikan keindahan <em>Golden Sunrise</em> dengan latar belakang Gunung Bromo, Batok, dan Semeru yang megah.</p>
              </div>
            </section>

            {/* Facilities Section */}
            <section id="fasilitas">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-8 tracking-tight flex items-center gap-4">
                Fasilitas
                <div className="h-px flex-grow bg-slate-100 dark:bg-slate-800"></div>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500">
                  <h3 className="font-black text-emerald-600 dark:text-emerald-400 text-xs tracking-widest uppercase mb-6 flex items-center gap-3">
                    <i className="fa-solid fa-circle-check text-base"></i> Termasuk (Include)
                  </h3>
                  <ul className="space-y-4 text-xs md:text-sm text-slate-600 dark:text-slate-400 font-bold">
                    {(tour.inclusions || mockTourDetail.inclusions).map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-4">
                        <i className="fa-solid fa-check text-emerald-500 mt-0.5 flex-shrink-0"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500">
                  <h3 className="font-black text-red-600 dark:text-red-400 text-xs tracking-widest uppercase mb-6 flex items-center gap-3">
                    <i className="fa-solid fa-circle-xmark text-base"></i> Tidak Termasuk
                  </h3>
                  <ul className="space-y-4 text-xs md:text-sm text-slate-600 dark:text-slate-400 font-bold">
                    {(tour.exclusions || mockTourDetail.exclusions).map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-4">
                        <i className="fa-solid fa-xmark text-red-400 mt-0.5 flex-shrink-0"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Itinerary Section */}
            <section id="itinerary">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
                  Rencana Perjalanan
                </h2>
                <span className="text-[10px] font-black text-brand-primary bg-brand-primary/10 px-4 py-2 rounded-xl uppercase tracking-widest border border-brand-primary/20">
                  {tour.duration_days} Hari Berakhir
                </span>
              </div>
              <ItineraryTimeline itineraries={tour.itineraries || mockTourDetail.itineraries} />
            </section>

            {/* Reviews Section */}
            <ReviewSection 
              tourId={tour.id} 
              averageRating={tour.average_rating || 4.9} 
              reviewCount={tour.review_count || 128} 
            />

          </div>

          {/* Sticky Booking Column (Right) */}
          <StickyBookingWidget tourData={tour} />

        </div>
      </main>
    </div>
  );
}
