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
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  onQuickView?: () => void; // <-- Sudah benar!
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
  originalPrice,
  rating = 4.9,
  reviewCount = 120,
  imageUrl = 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=400',
  onQuickView, // <-- JANGAN LUPA PANGGIL DI SINI
}: TourCardProps) {
  const formatPrice = (p: number) => {
    return (p / 1000).toFixed(0) + 'k';
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-brand-primary/30 group transition-all duration-500 flex flex-col relative transform hover:-translate-y-2">
      
      {/* Duration Badge Top Right */}
      <div className="absolute top-3 right-3 z-10 bg-brand-primary text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg flex items-center gap-1.5 backdrop-blur-md">
        <i className="fa-regular fa-clock"></i> {duration}
      </div>

      {/* Image Container */}
      <div className="relative h-40 sm:h-48 overflow-hidden group/image">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 font-medium" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          
          {/* TOMBOL QUICK VIEW MUNCUL SAAT HOVER GAMBAR */}
          {onQuickView && (
            <button 
              onClick={onQuickView}
              className="translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/20 hover:bg-white text-white hover:text-brand-primary backdrop-blur-sm border border-white/50 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg"
            >
              <i className="fa-regular fa-eye"></i> Quick View
            </button>
          )}

        </div>
        <span className={`absolute top-3 left-3 text-[10px] font-extrabold px-2 py-1 rounded-lg shadow-lg backdrop-blur-md ${
          tripType.toUpperCase() === 'PRIVATE' ? 'bg-white/90 text-brand-accent' : 'bg-white/90 text-brand-primary'
        }`}>
          {tripType.toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow group-hover:bg-brand-primary/5 transition-colors duration-500">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
          <i className="fa-solid fa-location-dot text-brand-primary"></i> 
          <span>Start {location}</span>
          <span className="mx-1">•</span>
          <span className="text-brand-primary">{category}</span>
        </div>
        
        <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-2 line-clamp-2 leading-tight group-hover:text-brand-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-1.5 mb-4">
          <i className="fa-solid fa-star text-[10px] sm:text-xs text-yellow-500"></i>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{rating}</span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">({reviewCount})</span>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-end">
          <div>
            {originalPrice && (
              <p className="text-[10px] text-slate-400 line-through mb-0.5">Rp {formatPrice(originalPrice)}</p>
            )}
            <p className="text-brand-accent font-extrabold text-sm sm:text-lg leading-none">
              Rp {formatPrice(price)}<span className="text-[10px] font-semibold text-slate-400 ml-1">/pax</span>
            </p>
          </div>
          
          <Link 
            href={`/tours/${id}`}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-sm transform hover:rotate-12"
          >
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}