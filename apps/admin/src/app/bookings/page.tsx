'use client';

export default function BookingsManagementPage() {
  
  const mockBookings = [
    { id: '1', ref: 'NSTR-9428', customer: 'Bima Santoso', tour: 'Midnight Bromo Sunrise', date: 'Dec 25, 2024', pax: 4, status: 'Paid', amount: 3500000 },
    { id: '2', ref: 'NSTR-1044', customer: 'Sarah Miller', tour: 'Ijen Blue Fire Trekking', date: 'Dec 28, 2024', pax: 2, status: 'Pending', amount: 1500000 },
    { id: '3', ref: 'NSTR-8409', customer: 'Andi Wijaya', tour: 'Malang City Tour', date: 'Jan 05, 2025', pax: 10, status: 'Cancelled', amount: 4000000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Bookings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all customer reservations and payments.</p>
        </div>
        <div className="flex gap-3">
           <input 
             type="text" 
             placeholder="Search NSTR-..." 
             className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg dark:bg-slate-700 outline-none text-sm"
           />
           <button className="px-4 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-lg hover:bg-slate-700 text-sm font-semibold transition">
             Export CSV
           </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
             <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
               <tr>
                 <th className="px-6 py-4 font-semibold">Ref Code</th>
                 <th className="px-6 py-4 font-semibold">Customer</th>
                 <th className="px-6 py-4 font-semibold">Tour & Date</th>
                 <th className="px-6 py-4 font-semibold text-center">Pax</th>
                 <th className="px-6 py-4 font-semibold text-right">Amount</th>
                 <th className="px-6 py-4 font-semibold text-center">Status</th>
                 <th className="px-6 py-4 font-semibold text-right">Actions</th>
               </tr>
             </thead>
             <tbody>
               {mockBookings.map((b) => (
                 <tr key={b.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                   <td className="px-6 py-4 font-mono font-bold text-slate-800 dark:text-slate-200">{b.ref}</td>
                   <td className="px-6 py-4">
                     <p className="font-semibold text-slate-800 dark:text-slate-200">{b.customer}</p>
                     <p className="text-xs text-slate-400">WA: +62812...</p>
                   </td>
                   <td className="px-6 py-4">
                     <p className="font-semibold text-slate-700 dark:text-slate-300">{b.tour}</p>
                     <p className="text-xs text-slate-500">{b.date}</p>
                   </td>
                   <td className="px-6 py-4 text-center font-semibold">{b.pax}</td>
                   <td className="px-6 py-4 text-right font-bold text-slate-800 dark:text-slate-200">
                     Rp {b.amount.toLocaleString('id-ID')}
                   </td>
                   <td className="px-6 py-4 text-center">
                     <span className={`px-2.5 py-1 text-xs font-bold uppercase rounded-full tracking-wide ${
                       b.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                       b.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                       'bg-red-100 text-red-700'
                     }`}>
                       {b.status}
                     </span>
                   </td>
                   <td className="px-6 py-4 text-right space-x-3">
                     <button className="text-brand-accent hover:underline font-medium">View</button>
                     <button className="text-emerald-500 hover:underline font-medium">Verify Pay</button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
         <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/30 text-sm text-slate-500">
            <span>Showing 1 to 3 of 142 entries</span>
            <div className="flex space-x-2">
              <button disabled className="px-3 py-1 border border-slate-200 rounded text-slate-400 bg-white">Prev</button>
              <button className="px-3 py-1 border border-slate-200 rounded text-slate-600 bg-white hover:bg-slate-50">Next</button>
            </div>
         </div>
      </div>
    </div>
  );
}
