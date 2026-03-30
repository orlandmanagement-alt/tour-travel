import Link from 'next/link';

export const metadata = {
  title: 'Destinations | NusantaraTrip',
  description: 'Explore breathtaking destinations in Indonesia.',
};

const destinations = [
  {
    id: 'BMO',
    name: 'Mount Bromo',
    description: 'An active volcano known for its gorgeous sunrise views and vast sea of sand. Experience the thrill of riding a 4WD jeep across the caldera.',
    image: 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=800&q=80',
    toursCount: 12,
  },
  {
    id: 'BWI',
    name: 'Banyuwangi & Kawah Ijen',
    description: 'Home to the magnificent Ijen Crater with its rare blue fire phenomenon and turquoise sulfur lake. A truly majestic adventure.',
    image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=800&q=80',
    toursCount: 8,
  },
  {
    id: 'MLG',
    name: 'Malang City & Batu',
    description: 'A charming highland city featuring apple orchards, colorful villages, family theme parks, and cool refreshing air.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
    toursCount: 15,
  }
];

export default function DestinationsPage() {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">Explore Destinations</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          From the fiery craters of active volcanoes to lush green highlands, find the perfect backdrop for your next unforgettable journey.
        </p>
      </div>

      <div className="space-y-16">
        {destinations.map((dest, index) => (
          <div key={dest.id} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            {/* Image */}
            <div className="w-full md:w-1/2">
               <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl group">
                 <img 
                   src={dest.image} 
                   alt={dest.name} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                 />
                 <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                   <span className="font-bold text-brand-primary">{dest.toursCount} Tours</span>
                 </div>
               </div>
            </div>

            {/* Content */}
            <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'md:pr-12 lg:pr-24' : 'md:pl-12 lg:pl-24'}`}>
               <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{dest.name}</h2>
               <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
                 {dest.description}
               </p>
               <Link 
                 href={`/tours?location=${dest.id}`}
                 className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:bg-brand-primary dark:hover:bg-brand-primary hover:text-white transition-colors"
               >
                 View All Tours in {dest.name}
                 <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                 </svg>
               </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
