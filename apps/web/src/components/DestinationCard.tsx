import Link from 'next/link';

interface DestinationCardProps {
  id: string | number;
  name: string;
  image: string;
  description: string;
  tourCount: number;
}

export default function DestinationCard({ id, name, image, description, tourCount }: DestinationCardProps) {
  return (
    <Link href={`/tours?location=${id}`} className="group block h-full">
      <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 ease-in-out h-full flex flex-col">
        <div className="relative h-48 sm:h-56 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 shadow-sm">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{tourCount} Tours</span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-primary transition-colors">{name}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4 flex-grow">
            {description}
          </p>
          <div className="flex items-center text-brand-primary font-semibold text-sm mt-auto">
            Explore Destination 
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
