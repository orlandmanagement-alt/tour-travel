import Link from 'next/link';

interface TourCardProps {
  id: string;
  tourCode: string;
  title: string;
  location: string;
  category: string;
  tripType: string;
  duration: string;
  price: number;
  imageUrl?: string;
  onQuickView?: () => void;
}

export default function TourCard({
  id,
  tourCode,
  title,
  location,
  category,
  tripType,
  duration,
  price,
  imageUrl = 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  onQuickView
}: TourCardProps) {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <div className="group flex flex-col bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:shadow-brand-primary/20 transition-all duration-500 border border-slate-100 dark:border-slate-700">
      
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-3 py-1 bg-gradient-to-r from-brand-primary to-brand-primary-dark text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
            {tripType}
          </span>
          <span className="px-3 py-1 bg-gradient-to-r from-brand-secondary to-brand-secondary-dark text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
            Hot Deal
          </span>
        </div>
        
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <div className="px-3 py-1 glass text-white text-xs font-medium rounded-full flex items-center shadow-lg">
             ⏱ {duration}
          </div>
        </div>
        
        {/* Hover Quick View Button */}
        {onQuickView && (
          <button 
            onClick={(e) => { e.preventDefault(); onQuickView(); }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 text-brand-primary font-bold py-3 px-6 rounded-full opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl hover:bg-brand-primary hover:text-white"
          >
            Quick View
          </button>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-5">
        <div className="flex items-center text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 space-x-2">
          <span className="flex items-center text-brand-secondary">📍 <span className="ml-1 text-slate-500 dark:text-slate-400">{location}</span></span>
          <span>•</span>
          <span className="text-brand-primary">{category}</span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-primary group-hover:to-brand-secondary transition-all">
          {title}
        </h3>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">
          Experience the best of {location} with our carefully curated {category.toLowerCase()} tour. Code: {tourCode}
        </p>

        {/* Footer info & Action */}
        <div className="mt-auto flex items-end justify-between border-t border-slate-100 dark:border-slate-700 pt-4">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider font-semibold">Start from</p>
            <p className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-secondary-dark">
              {formattedPrice}
            </p>
          </div>
          <Link 
            href={`/tours/${id}`}
            className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 group-hover:bg-gradient-to-r group-hover:from-brand-primary group-hover:to-brand-primary-dark group-hover:text-white text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            Details
          </Link>
        </div>
      </div>
      
    </div>
  );
}
