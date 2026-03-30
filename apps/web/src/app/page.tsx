import DestinationCard from '@/components/DestinationCard';
import Link from 'next/link';

// Mock destinations data
const TRENDING_DESTINATIONS = [
  {
    id: 'BMO',
    name: 'Mount Bromo',
    image: 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=800&q=80',
    description: 'Experience the magic of an active volcano at sunrise. Surrounded by an ancient sea of sand and stunning viewpoints.',
    tourCount: 5,
  },
  {
    id: 'BWI',
    name: 'Ijen Crater',
    image: 'https://images.unsplash.com/photo-1517441865-c32f8313bd8a?w=800&q=80',
    description: 'Witness the rare blue fire phenomenon and the largest highly acidic crater lake in the world.',
    tourCount: 3,
  },
  {
    id: 'MLG',
    name: 'Malang City',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
    description: 'Explore historical sites, colorful villages, and enjoy the cool weather of East Java\'s most relaxing city.',
    tourCount: 8,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900/60 z-10"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1518090597335-e6f7783ee855?w=1600&q=80" 
            alt="Cinematic Mount Bromo landscape" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto -mt-20">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold mb-6 animate-fade-in">
            Premium Tour Experiences in Indonesia
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            Find Your Next <br /> <span className="text-brand-accent">Adventure</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm">
            Discover breathtaking landscapes and exclusive private tours curated for the ultimate enterprise-class experience.
          </p>
        </div>

        {/* Floating Quick Search Bar (overlaps bottom of hero) */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-30 px-4">
          <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-2 sm:p-4">
            <form action="/tours" method="GET" className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="p-3 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Location</label>
                <input type="text" name="location" placeholder="Where to?" className="w-full bg-transparent text-slate-900 dark:text-white font-medium focus:outline-none placeholder-slate-400" />
              </div>
              <div className="p-3 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Type</label>
                <select name="type" className="w-full bg-transparent text-slate-900 dark:text-white font-medium focus:outline-none appearance-none cursor-pointer">
                  <option value="">All Types</option>
                  <option value="Open Trip">Open Trip</option>
                  <option value="Private Trip">Private Trip</option>
                </select>
              </div>
              <div className="p-3 border-b md:border-b-0 md:border-r md:border-transparent">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Date</label>
                <input type="date" name="date" className="w-full bg-transparent text-slate-900 dark:text-white font-medium focus:outline-none" />
              </div>
              <div className="p-2 h-full">
                <button type="submit" className="w-full h-full min-h-[48px] bg-brand-primary hover:bg-brand-primary-dark text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Spacer for floating bar */}
      <div className="h-40 sm:h-24"></div>

      {/* Trending Destinations Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Trending Destinations</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
                Explore our most sought-after locations curated for uncompromised adventure and comfort.
              </p>
            </div>
            <Link href="/tours" className="hidden md:flex mt-6 md:mt-0 items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-brand-primary transition-all duration-300 group">
              View All Tours 
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TRENDING_DESTINATIONS.map((dest) => (
              <DestinationCard 
                key={dest.id}
                id={dest.id}
                name={dest.name}
                image={dest.image}
                description={dest.description}
                tourCount={dest.tourCount}
              />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/tours" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 w-full sm:w-auto text-lg">
              Explore All Tours
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
