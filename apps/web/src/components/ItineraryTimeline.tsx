'use client';

import React, { useState } from 'react';

interface ItineraryItem {
  id: string | number;
  day_number: number;
  start_time: string;
  end_time: string;
  activity_title: string;
  activity_description: string;
}

interface ItineraryTimelineProps {
  itineraries: ItineraryItem[];
}

export default function ItineraryTimeline({ itineraries }: ItineraryTimelineProps) {
  const [openItems, setOpenItems] = useState<Record<string | number, boolean>>({
    [itineraries[0]?.id]: true // Open first item by default
  });

  const toggleItem = (id: string | number) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!itineraries || itineraries.length === 0) return null;

  return (
    <div className="w-full">
      <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[15px] before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700 pl-8 ml-2">
        {itineraries.map((item, index) => {
          const isOpen = openItems[item.id];
          const isAccent = index === 3; // Example: highlight some items with accent color like in HTML reference

          return (
            <div key={item.id} className="relative">
              {/* Timeline Bullet */}
              <div className={`absolute w-4 h-4 ${isAccent ? 'bg-brand-accent' : 'bg-brand-primary'} rounded-full border-4 border-white dark:border-slate-900 -left-[39px] top-1.5 shadow-sm group-hover:scale-125 transition-transform`}></div>
              
              <div className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm hover:border-brand-primary/30 transition-all duration-300 group`}>
                <button 
                  className="w-full text-left p-4 sm:p-5 flex justify-between items-center focus:outline-none group"
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="flex-1">
                    <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isAccent ? 'text-brand-accent' : 'text-brand-primary'}`}>
                      {item.start_time} - {item.end_time} WIB
                    </div>
                    <h4 className="font-extrabold text-slate-800 dark:text-white text-sm sm:text-base tracking-tight leading-tight group-hover:text-brand-primary transition-colors">
                      {item.activity_title}
                    </h4>
                  </div>
                  <i className={`fa-solid fa-chevron-down text-slate-400 text-xs transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-primary' : ''}`}></i>
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100 py-4 px-5 border-t border-slate-50 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {item.activity_description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
