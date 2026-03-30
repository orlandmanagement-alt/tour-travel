import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import SearchFilter from '@/components/SearchFilter';
import TourCard from '@/components/TourCard';

const CATEGORIES = [
  { name: 'Pegunungan', icon: 'fa-mountain' },
  { name: 'Pantai & Pulau', icon: 'fa-umbrella-beach' },
  { name: 'City Tour', icon: 'fa-city' },
  { name: 'Honeymoon', icon: 'fa-heart' },
  { name: 'Open Trip', icon: 'fa-users' },
  { name: 'Fotografi', icon: 'fa-camera' },
  { name: 'Camping', icon: 'fa-campground' },
  { name: 'Luar Negeri', icon: 'fa-globe' },
];

const SPECIAL_PROMOS = [
  {
    title: 'Promo Bromo Sunrise',
    image: 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=800',
    discount: 'DISC 20%',
    validUntil: '30 Nov',
    color: 'from-brand-950/90 via-brand-900/70'
  },
  {
    title: 'Malang City Explorer',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
    discount: 'CASHBACK 500K',
    code: 'MLGCERIA',
    color: 'from-brand-accent/90 via-brand-accent/70'
  },
  {
    title: 'Bali Team Building',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    discount: 'CORPORATE',
    validUntil: 'Pesan 10 Gratis 1',
    color: 'from-emerald-900/90 via-emerald-800/70'
  }
];

const BEST_SELLERS = [
  {
    id: '1',
    tourCode: 'BMO-01',
    title: 'Private Tour Bromo & Madakaripura',
    location: 'Malang/SBY',
    category: 'Pegunungan',
    tripType: 'PRIVATE',
    duration: '3D2N',
    price: 1250000,
    originalPrice: 1500000,
    imageUrl: 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=400'
  },
  {
    id: '2',
    tourCode: 'IJN-01',
    title: 'Open Trip Kawah Ijen Blue Fire',
    location: 'Banyuwangi',
    category: 'Pegunungan',
    tripType: 'OPEN TRIP',
    duration: '1 Hari',
    price: 350000,
    imageUrl: 'https://images.unsplash.com/photo-1517441865-c32f8313bd8a?w=400'
  },
  {
    id: '3',
    tourCode: 'MLG-01',
    title: 'Romantic Escape Malang & Batu Tour',
    location: 'Malang',
    category: 'Honeymoon',
    tripType: 'PRIVATE',
    duration: '3D2N',
    price: 4500000,
    originalPrice: 5000000,
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400'
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Floating Search Filter */}
      <SearchFilter />

      {/* Categories Section */}
      <section className="py-12 border-b border-white dark:border-slate-800 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center md:justify-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar pb-2 snap-x">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat.name}
                href={`/tours?category=${cat.name}`} 
                className="flex flex-col items-center gap-3 min-w-[80px] snap-center group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:shadow-xl group-hover:shadow-brand-primary/20 flex items-center justify-center text-brand-primary group-hover:text-white text-xl sm:text-2xl transition-all duration-300 transform group-hover:-translate-y-1">
                  <i className={`fa-solid ${cat.icon} group-hover:rotate-12 transition-transform`}></i>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-brand-primary text-center leading-tight whitespace-nowrap transition-colors whitespace-pre-line">
                  {cat.name.replace(' & ', ' &\n')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 dark:text-white tracking-tight flex items-center gap-3">
              <i className="fa-solid fa-fire text-brand-accent animate-pulse"></i> 
              Spesial Promo
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Jangan lewatkan penawaran terbatas minggu ini.</p>
          </div>
          <Link href="/promo" className="group text-sm font-bold text-brand-primary hover:text-brand-accent flex items-center gap-1 transition-colors">
            Lihat Semua <i className="fa-solid fa-arrow-right-long text-[10px] group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>
        
        <div className="flex overflow-x-auto no-scrollbar gap-5 pb-6 snap-x">
          {SPECIAL_PROMOS.map((promo) => (
            <Link 
              key={promo.title}
              href="/promo" 
              className="group relative rounded-2xl overflow-hidden h-44 sm:h-56 min-w-[300px] sm:min-w-[400px] shadow-lg border border-slate-100 dark:border-slate-800 flex-shrink-0 snap-center transition-all duration-500 hover:shadow-2xl"
            >
              <img 
                src={promo.image} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                alt={promo.title}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${promo.color} to-transparent opacity-90`}></div>
              
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]"></div>

              <div className="relative z-10 p-6 flex flex-col justify-center h-full text-white w-2/3">
                <span className="bg-brand-accent text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-lg shadow-lg mb-3 w-max flex items-center gap-1.5 backdrop-blur-md">
                  <i className="fa-solid fa-tag"></i> {promo.discount}
                </span>
                <h3 className="font-extrabold text-lg sm:text-2xl leading-tight mb-2 drop-shadow-md">{promo.title}</h3>
                {promo.validUntil ? (
                  <p className="text-xs text-white/70 font-medium flex items-center gap-1.5 uppercase tracking-wider">
                    <i className="fa-regular fa-clock"></i> Berlaku s/d {promo.validUntil}
                  </p>
                ) : (
                  <p className="text-xs text-brand-950 font-bold bg-white/90 px-3 py-1 rounded-lg w-max shadow-sm">
                    KODE: {promo.code}
                  </p>
                )}
              </div>
              
              <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white text-brand-primary flex items-center justify-center shadow-lg opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Seller Section */}
      <section className="py-16 sm:py-20 bg-white dark:bg-brand-950/20 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-900 dark:text-white mb-2 tracking-tight">Best Seller Packages</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Paket liburan paling diminati oleh pelanggan kami di seluruh Indonesia.</p>
            </div>
            <Link href="/tours" className="hidden md:flex items-center gap-2 px-6 py-3 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-brand-primary transition-all duration-300 group">
              Lihat Semua Paket 
              <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {BEST_SELLERS.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
            
            {/* CTA Card for Custom Trip */}
            <div className="bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl p-6 flex flex-col justify-between text-white shadow-xl shadow-brand-primary/20 group transform transition-all duration-500 hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-sm border border-white/10">
                  <i className="fa-solid fa-wand-magic-sparkles text-xl"></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold leading-tight mb-3">Punya Rencana Sendiri?</h3>
                <p className="text-white/80 text-sm font-medium">Buat itinerary custom sesuai keinginanmu hanya dalam hitungan menit.</p>
              </div>
              <Link 
                href="/planner" 
                className="mt-8 py-3 bg-white text-brand-primary font-bold text-sm rounded-xl text-center shadow-lg transform group-hover:scale-105 transition-all"
              >
                Mulai Rancang Trip
              </Link>
            </div>
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link href="/tours" className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl shadow-lg transition-all w-full">
              Jelajahi Semua Paket
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
