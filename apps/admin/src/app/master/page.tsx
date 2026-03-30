'use client';

import { useState } from 'react';

const masterTables = [
  { id: 'locations', name: 'Locations', count: 4, cols: ['Location Name', 'Description'] },
  { id: 'categories', name: 'Categories', count: 5, cols: ['Category Name', 'Description'] },
  { id: 'trip_types', name: 'Trip Types', count: 2, cols: ['Type Name', 'Description'] },
  { id: 'transport', name: 'Transport Modes', count: 6, cols: ['Mode Name', 'Description'] },
  { id: 'destinations', name: 'Destinations', count: 18, cols: ['Destination Name', 'Location', 'Entry Fee'] },
  { id: 'accommodations', name: 'Accommodations', count: 12, cols: ['Name', 'Location', 'Type', 'Star Rating'] },
];

export default function MasterDataPage() {
  const [activeTab, setActiveTab] = useState('locations');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const activeTable = masterTables.find(t => t.id === activeTab);

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Master Data Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all lookup tables and static data referenced across the platform.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Tabs */}
        <div className="w-full md:w-1/4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
             {masterTables.map((table) => {
               const isActive = activeTab === table.id;
               return (
                 <button
                   key={table.id}
                   onClick={() => setActiveTab(table.id)}
                   className={`w-full text-left px-6 py-4 border-b border-slate-100 dark:border-slate-700/50 last:border-0 transition-colors flex justify-between items-center ${isActive ? 'bg-brand-primary/5 dark:bg-brand-primary/20 border-l-4 border-l-brand-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-800/80 border-l-4 border-l-transparent'}`}
                 >
                   <span className={`font-semibold ${isActive ? 'text-brand-primary dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                     {table.name}
                   </span>
                   <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full text-slate-500 dark:text-slate-300">
                     {table.count}
                   </span>
                 </button>
               );
             })}
          </div>
        </div>

        {/* Content Table */}
        <div className="w-full md:w-3/4">
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
              
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100 dark:border-slate-700/50">
                 <h2 className="text-xl font-bold text-slate-800 dark:text-white">{activeTable?.name}</h2>
                 <button 
                   onClick={() => setIsAddModalOpen(true)}
                   className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-light shadow-sm text-sm font-semibold transition"
                 >
                   + Add New
                 </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-y border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300">ID</th>
                      {activeTable?.cols.map(col => (
                        <th key={col} className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300">{col}</th>
                      ))}
                      <th className="px-6 py-3 text-right font-semibold text-slate-700 dark:text-slate-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Mock Data Row 1 */}
                    <tr className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-6 py-4">1</td>
                      {activeTable?.cols.map((col, idx) => (
                        <td key={idx} className="px-6 py-4">Sample {col} A</td>
                      ))}
                      <td className="px-6 py-4 text-right">
                         <button className="text-brand-accent hover:underline mr-4">Edit</button>
                         <button className="text-red-500 hover:underline">Delete</button>
                      </td>
                    </tr>
                    {/* Mock Data Row 2 */}
                    <tr className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-6 py-4">2</td>
                      {activeTable?.cols.map((col, idx) => (
                        <td key={idx} className="px-6 py-4">Sample {col} B</td>
                      ))}
                      <td className="px-6 py-4 text-right">
                         <button className="text-brand-accent hover:underline mr-4">Edit</button>
                         <button className="text-red-500 hover:underline">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
           </div>
        </div>

      </div>

      {/* Basic Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in flex-col">
           <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                 <h3 className="font-bold text-lg text-slate-900 dark:text-white">Add New {activeTable?.name.replace(/s$/, '')}</h3>
                 <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>
              <div className="p-6 space-y-4">
                 {activeTable?.cols.map(col => (
                    <div key={col}>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{col}</label>
                      <input type="text" className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg dark:bg-slate-700 outline-none focus:border-brand-primary" />
                    </div>
                 ))}
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-700">
                 <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-200">Cancel</button>
                 <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-brand-primary text-white rounded-lg font-medium hover:bg-brand-primary-light">Save</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
