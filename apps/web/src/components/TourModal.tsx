import React from 'react';

type TourModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tour: any;
};

export default function TourModal({ isOpen, onClose, tour }: TourModalProps) {
  if (!isOpen || !tour) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden transform transition-all scale-100 opacity-100">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="relative h-64 sm:h-80 w-full">
          <img 
            src={tour.imageUrl || 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=800&q=80'}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
          <div className="absolute bottom-0 left-0 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-brand-primary text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                {tour.category}
              </span>
              <span className="px-3 py-1 glass text-white text-xs font-semibold rounded-full">
                {tour.duration}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
              {tour.title}
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 justify-between items-start">
          <div className="flex-1">
             <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
               Quick Information
             </h3>
             <ul className="space-y-3">
               <li className="flex items-center text-slate-600 dark:text-slate-400">
                 <span className="text-brand-secondary text-xl mr-3">📍</span>
                 <span className="font-medium">Location:</span> 
                 <span className="ml-2">{tour.location}</span>
               </li>
               <li className="flex items-center text-slate-600 dark:text-slate-400">
                 <span className="text-brand-secondary text-xl mr-3">🏷️</span>
                 <span className="font-medium">Type:</span> 
                 <span className="ml-2">{tour.tripType}</span>
               </li>
               <li className="flex items-center text-slate-600 dark:text-slate-400">
                 <span className="text-brand-secondary text-xl mr-3">🔢</span>
                 <span className="font-medium">Code:</span> 
                 <span className="ml-2">{tour.tourCode}</span>
               </li>
             </ul>
          </div>
          
          <div className="w-full sm:w-auto p-5 glass rounded-2xl flex flex-col items-center sm:items-end justify-center text-center sm:text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold mb-1">
              Starting from
            </p>
            <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary mb-4">
              Rp {tour.price.toLocaleString('id-ID')}
            </p>
            <a 
              href={`/tours/${tour.id}`}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-primary-dark hover:from-brand-secondary hover:to-brand-secondary-dark text-white rounded-full font-bold shadow-lg shadow-brand-primary/30 transition-all hover:scale-105"
            >
              View Full Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
