'use client';

export default function CustomTripsManagementPage() {
  
  const mockRequests = [
    { id: 'REQ-001', customer: 'Diana Kusuma', date: 'Oct 15, 2024', status: 'New', pax: 4, dest: 'Bromo, Madakaripura', duration: 3, budget: 'Standard' },
    { id: 'REQ-002', customer: 'David Smith', date: 'Oct 12, 2024', status: 'Quoted', pax: 2, dest: 'Ijen, Baluran', duration: 4, budget: 'High-end' },
    { id: 'REQ-003', customer: 'Siti Aminah', date: 'Oct 10, 2024', status: 'Converted', pax: 6, dest: 'Malang Custom', duration: 2, budget: 'Budget' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Custom Trip Requests</h1>
          <p className="text-slate-500 text-sm mt-1">Review user-submitted itineraries and send quotes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Request List */}
        <div className="lg:col-span-1 border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-2xl h-[calc(100vh-200px)] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
             <input type="text" placeholder="Search customer..." className="w-full px-4 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg dark:bg-slate-700 outline-none" />
          </div>
          <div className="flex-1 overflow-y-auto">
             {mockRequests.map(r => (
               <div key={r.id} className="p-4 border-b border-slate-100 dark:border-slate-700 hover:bg-brand-primary/5 cursor-pointer transition">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{r.customer}</h4>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${r.status === 'New' ? 'bg-blue-100 text-blue-700' : r.status === 'Quoted' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{r.dest} • {r.duration} Days • {r.pax} Pax</p>
                  <p className="text-xs text-slate-400">{r.id} • {r.date}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Right Col: Details & Quote Generator */}
        <div className="lg:col-span-2 border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center text-slate-400">
             <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">👈</span>
             </div>
             <p>Select a request from the panel to view details and generate a quote.</p>
        </div>

      </div>
    </div>
  );
}
