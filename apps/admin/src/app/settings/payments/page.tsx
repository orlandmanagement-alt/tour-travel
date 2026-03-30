'use client';

import { useState } from 'react';
import Can from '@/components/Can';

const gateways = [
  { id: 'midtrans', name: 'Midtrans', status: 'active', isPrimary: true, logo: 'https://midtrans.com/assets/img/midtrans-logo.svg', fee: 'IDR 4,000 / tx' },
  { id: 'xendit', name: 'Xendit', status: 'inactive', isPrimary: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Xendit_logo.svg/1200px-Xendit_logo.svg.png', fee: 'IDR 4,500 / tx' },
  { id: 'duitku', name: 'Duitku', status: 'active', isPrimary: false, logo: 'https://duitku.com/wp-content/uploads/2021/08/logo-duitku-1.png', fee: 'IDR 3,000 / tx' },
  { id: 'ipaymu', name: 'iPaymu', status: 'inactive', isPrimary: false, logo: 'https://ipaymu.com/wp-content/uploads/2020/07/logo-ipaymu.png', fee: 'IDR 3,500 / tx' },
  { id: 'doku', name: 'Doku', status: 'inactive', isPrimary: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/DOKU_Logo.png/1200px-DOKU_Logo.png', fee: 'IDR 4,500 / tx' },
];

export default function PaymentSettings() {
  const [data, setData] = useState(gateways);
  const [editingId, setEditingId] = useState<string | null>(null);

  const toggleStatus = (id: string) => {
    setData(prev => prev.map(g => g.id === id ? { ...g, status: g.status === 'active' ? 'inactive' : 'active' } : g));
  };

  const setPrimary = (id: string) => {
    setData(prev => prev.map(g => {
      // Must be active to be primary
      if (g.id === id) return { ...g, isPrimary: true, status: 'active' };
      return { ...g, isPrimary: false };
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Payment Orchestrator Routing</h1>
          <p className="text-slate-500 text-sm mt-1 leading-relaxed max-w-2xl">
            Configure multiple payment gateways below. The system is designed to be Vendor Agnostic. 
            Select one <b className="text-brand-primary">Primary</b> gateway for default transactions. Active secondary gateways will act as automatic failovers if the primary is down.
          </p>
        </div>
        
        <Can I="settings.edit">
          <button className="px-6 py-2 bg-slate-900 dark:bg-brand-primary text-white rounded-xl hover:shadow-lg transition font-bold shadow-sm">
            Save Routing Rules
          </button>
        </Can>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map(gateway => (
          <div key={gateway.id} className={`bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 transition-all ${gateway.isPrimary ? 'border-emerald-500 shadow-xl shadow-emerald-500/10' : gateway.status === 'active' ? 'border-brand-primary/40 shadow-sm hover:border-brand-primary' : 'border-slate-100 dark:border-slate-700 grayscale opacity-70'}`}>
             
             {/* Card Header */}
             <div className="flex justify-between items-start mb-6">
               <div className="h-10 flex items-center bg-white p-2 rounded-lg border border-slate-100">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={gateway.logo} alt={gateway.name} className="h-full object-contain max-w-[100px]" onError={(e) => { e.currentTarget.style.display='none' }}/>
                 <span className="font-extrabold text-slate-800 tracking-tight ml-2">{gateway.name}</span>
               </div>
               
               <div className="flex flex-col items-end gap-2">
                 {gateway.isPrimary && <span className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Primary</span>}
                 <label className="flex items-center cursor-pointer relative">
                    <input type="checkbox" className="sr-only" checked={gateway.status === 'active'} onChange={() => toggleStatus(gateway.id)} />
                    <div className={`w-10 h-6 border-2 rounded-full transition-colors flex items-center px-0.5 ${gateway.status === 'active' ? 'bg-brand-primary border-brand-primary' : 'bg-slate-200 border-slate-300'}`}>
                       <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${gateway.status === 'active' ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                 </label>
               </div>
             </div>

             {/* Status Info */}
             <div className="mb-6 space-y-2 text-sm font-medium">
                <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                  <span>Connection</span>
                  {gateway.status === 'active' ? (
                     <span className="flex items-center text-emerald-500 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span> OK</span>
                  ) : (
                     <span className="text-slate-400">Offline</span>
                  )}
                </div>
                <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                  <span>Base Fee (MDR)</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">{gateway.fee}</span>
                </div>
             </div>

             {/* Actions */}
             <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button 
                  onClick={() => setPrimary(gateway.id)}
                  disabled={gateway.isPrimary}
                  className={`py-2 text-xs font-bold rounded-lg transition-colors border ${gateway.isPrimary ? 'bg-emerald-50 border-emerald-200 text-emerald-600 cursor-not-allowed opacity-50' : 'bg-white dark:bg-slate-800 border-slate-200 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                  Set Primary
                </button>
                <button 
                  onClick={() => setEditingId(gateway.id)}
                  className="py-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-brand-primary hover:text-brand-primary transition-colors bg-white dark:bg-slate-800"
                >
                  Edit Keys
                </button>
             </div>

          </div>
        ))}
      </div>

      {/* Secret Keys Modal */}
      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm pointer-events-none"></div>
           <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-md shadow-2xl relative z-10 p-8 border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" /></svg>
                  API Configuration
                </h3>
                <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-slate-800">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Server Key (Secret)</label>
                  <input type="password" placeholder="••••••••••••••••••••••••" className="w-full font-mono text-sm px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-primary outline-none text-slate-900 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Client Key (Public)</label>
                  <input type="text" placeholder="SB-Mid-client-xx-xxxx" className="w-full font-mono text-sm px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-primary outline-none text-slate-900 transition-colors" />
                </div>
                
                <div className="bg-amber-50 p-4 border border-amber-200 rounded-xl text-xs font-medium text-amber-800 flex gap-2">
                   <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                   <span>Keys are securely encrypted in D1 database and injected dynamically into the <b>Payment Orchestrator API</b>. Never share your Server Key.</span>
                </div>
              </div>

              <button onClick={() => setEditingId(null)} className="w-full py-3.5 bg-brand-primary text-white font-bold rounded-xl shadow-lg shadow-brand-primary/20 hover:bg-brand-primary-dark transition-all">
                Save Secure Keys
              </button>
           </div>
        </div>
      )}

    </div>
  );
}
