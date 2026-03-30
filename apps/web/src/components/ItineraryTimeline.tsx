import React from 'react';

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
  if (!itineraries || itineraries.length === 0) return null;

  // Group by day_number
  const days = itineraries.reduce((acc, current) => {
    let dayGroup = acc.find((g: any) => g.day === current.day_number);
    if (!dayGroup) {
      dayGroup = { day: current.day_number, items: [] };
      acc.push(dayGroup);
    }
    dayGroup.items.push(current);
    return acc;
  }, [] as { day: number; items: ItineraryItem[] }[]);

  return (
    <div className="w-full">
      {days.map((dayGroup: any) => (
        <div key={dayGroup.day} className="mb-10 last:mb-0">
          
          <div className="inline-block px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white font-extrabold rounded-lg shadow-sm tracking-wide mb-8 uppercase text-sm">
            Day {dayGroup.day}
          </div>

          <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 lg:ml-6 space-y-8">
            {dayGroup.items.map((item: ItineraryItem) => (
              <div key={item.id} className="relative group w-full pl-6 md:pl-10">
                {/* Timeline node dot */}
                <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 group-hover:border-brand-primary group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-300"></div>
                
                {/* Card Container */}
                <div className="bg-white dark:bg-slate-800/50 p-5 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-700 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-brand-primary/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                    <span className="inline-flex max-w-min whitespace-nowrap bg-blue-50 dark:bg-blue-900/30 text-brand-primary dark:text-blue-300 px-3 py-1.5 rounded-lg text-xs font-bold font-mono tracking-tight items-center shadow-sm">
                      <svg className="w-4 h-4 mr-1.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {item.start_time} - {item.end_time}
                    </span>
                    <h4 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                      {item.activity_title}
                    </h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                    {item.activity_description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}
