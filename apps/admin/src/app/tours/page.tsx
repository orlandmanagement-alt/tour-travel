'use client';

import Link from 'next/link';

export default function ToursManagementPage() {
  
  const mockTours = [
    { id: '1', code: 'T-BMO-MID', name: 'Midnight Bromo', location: 'Bromo', category: 'Nature', price: 350000, status: 'Active' },
    { id: '2', code: 'T-BWI-IJEN', name: 'Ijen Blue Fire', location: 'Banyuwangi', category: 'Nature', price: 750000, status: 'Active' },
    { id: '3', code: 'T-MLG-CITY', name: 'Malang City', location: 'Malang', category: 'Culture', price: 400000, status: 'Inactive' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Tours Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage tour packages, itineraries, and pricing tiers.</p>
        </div>
        <Link 
          href="/tours/new"
          className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-light text-white rounded-xl font-bold shadow-lg shadow-brand-primary/30 transition text-center"
        >
          + Create New Tour
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
             <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
               <tr>
                 <th className="px-6 py-4 font-semibold">Code</th>
                 <th className="px-6 py-4 font-semibold">Tour Name</th>
                 <th className="px-6 py-4 font-semibold">Location</th>
                 <th className="px-6 py-4 font-semibold">Base Price</th>
                 <th className="px-6 py-4 font-semibold text-center">Status</th>
                 <th className="px-6 py-4 font-semibold text-right">Actions</th>
               </tr>
             </thead>
             <tbody>
               {mockTours.map((t) => (
                 <tr key={t.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                   <td className="px-6 py-4 font-mono font-bold text-slate-800 dark:text-slate-200">{t.code}</td>
                   <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-200">{t.name}</td>
                   <td className="px-6 py-4">
                     {t.location}
                     <span className="block text-xs text-slate-400">{t.category}</span>
                   </td>
                   <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                     Rp {t.price.toLocaleString('id-ID')}
                   </td>
                   <td className="px-6 py-4 text-center">
                     <span className={`px-2.5 py-1 text-xs font-bold uppercase rounded-full tracking-wide ${
                       t.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                     }`}>
                       {t.status}
                     </span>
                   </td>
                   <td className="px-6 py-4 text-right space-x-3">
                     <button className="text-brand-accent hover:underline font-medium">Edit</button>
                     <button className="text-red-500 hover:underline font-medium">Delete</button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
}
