'use client';

import React, { useState, useMemo } from 'react';

type Promo = {
  id: string;
  name: string;
  code: string;
  description: string;
  type: 'percent' | 'nominal';
  value: number;
  expiry: string;
  status: 'Active' | 'Expired';
};

const MOCK_PROMOS: Promo[] = [
  { id: '01', name: 'Promo Bromo Sunrise 20%', code: 'BROMOHEMAT', description: 'Berlaku khusus untuk paket wisata Bromo', type: 'percent', value: 20, expiry: '2026-11-30', status: 'Active' },
  { id: '02', name: 'Cashback Sewa Mobil 150K', code: 'SEWASERU', description: 'Minimum transaksi Rp 500.000', type: 'nominal', value: 150000, expiry: '2026-12-15', status: 'Active' },
  { id: '03', name: 'Promo Bank Mandiri 500K', code: 'LIVINVIP', description: "Khusus nasabah Livin'", type: 'nominal', value: 500000, expiry: '2026-01-01', status: 'Expired' },
];

export default function PromosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promo | null>(null);

  const filteredPromos = useMemo(() => {
    return MOCK_PROMOS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredPromos.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredPromos.map(p => p.id));
    }
  };

  const handleEdit = (promo: Promo) => {
    setEditingPromo(promo);
    setIsModalOpen(true);
  };

  const formatValue = (p: Promo) => {
    if (p.type === 'percent') return `${p.value}%`;
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p.value);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Daftar Kode Promo</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Buat dan kelola kupon diskon untuk pelanggan NusantaraTrip.</p>
        </div>
        <button 
          onClick={() => { setEditingPromo(null); setIsModalOpen(true); }}
          className="px-6 py-3 bg-brand-600 text-white font-black text-xs rounded-2xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Buat Promo Baru
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="p-6 sm:p-8 flex flex-col lg:flex-row justify-between items-center gap-4 bg-slate-50/50 border-b border-slate-100">
          <div className="relative w-full lg:w-96 group">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs group-focus-within:text-brand-600 transition-colors"></i>
            <input 
              type="text" 
              placeholder="Cari nama promo, kode..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-bold text-slate-700"
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
             {selectedIds.length > 0 ? (
               <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
                  <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{selectedIds.length} Promo Terpilih</span>
                  <button className="px-4 py-2 bg-slate-100 text-slate-600 font-extrabold text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all border border-slate-200">Nonaktifkan</button>
                  <button className="px-4 py-2 bg-red-50 text-red-600 font-extrabold text-[10px] uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100">Hapus</button>
               </div>
             ) : (
               <div className="flex gap-2 w-full lg:w-auto">
                  <select className="flex-1 lg:w-40 appearance-none bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 shadow-sm cursor-pointer">
                    <option>Semua Tipe</option>
                    <option>Persentase</option>
                    <option>Nominal</option>
                  </select>
                  <select className="flex-1 lg:w-40 appearance-none bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 shadow-sm cursor-pointer">
                    <option>Semua Status</option>
                    <option>Aktif</option>
                    <option>Expired</option>
                  </select>
               </div>
             )}
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-8 py-5 w-16 text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === filteredPromos.length && filteredPromos.length > 0} 
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                  />
                </th>
                <th className="px-8 py-5">Info Promo</th>
                <th className="px-8 py-5 text-center">Kode Kupon</th>
                <th className="px-8 py-5 text-right">Nilai Diskon</th>
                <th className="px-8 py-5 text-center">Masa Berlaku</th>
                <th className="px-8 py-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPromos.map((promo) => (
                <tr key={promo.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(promo.id)}
                      onChange={() => toggleSelect(promo.id)}
                      className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-8 py-5">
                    <div className="min-w-0">
                      <p className="text-xs font-black text-slate-900 group-hover:text-brand-600 transition-colors truncate max-w-[300px]">{promo.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{promo.description}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="inline-block px-3 py-1.5 bg-slate-50 border-2 border-dashed border-slate-200 text-brand-600 font-mono text-xs font-black rounded-xl">
                      {promo.code}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right font-black">
                    <p className={`text-sm ${promo.status === 'Active' ? 'text-red-500' : 'text-slate-400'}`}>{formatValue(promo)}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{promo.type}</p>
                  </td>
                  <td className="px-8 py-5 text-center">
                     <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{new Date(promo.expiry).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                     <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest mt-1.5 ${
                       promo.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                     }`}>
                       <div className={`w-1 h-1 rounded-full ${promo.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                       {promo.status}
                     </span>
                  </td>
                  <td className="px-8 py-5 font-medium">
                     <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleEdit(promo)}
                          className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 hover:bg-brand-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                        >
                          <i className="fa-solid fa-pen-to-square text-xs"></i>
                        </button>
                        <button className="w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-sm">
                          <i className="fa-solid fa-trash text-xs"></i>
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 sm:p-8 bg-slate-50/30 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Menampilkan 1-3 dari 24 kode promo</p>
           <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm"><i className="fa-solid fa-chevron-left text-[10px]"></i></button>
              <button className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/20 text-[10px] font-black">1</button>
              <button className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm text-[10px] font-black">2</button>
              <button className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm"><i className="fa-solid fa-chevron-right text-[10px]"></i></button>
           </div>
        </div>
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
              <div className="p-8 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                 <h2 className="text-xl font-black tracking-tight flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/20">
                      <i className="fa-solid fa-tag text-sm"></i>
                    </div>
                    {editingPromo ? `Edit Promo #${editingPromo.id}` : 'Promo & Kupon Baru'}
                 </h2>
                 <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"><i className="fa-solid fa-xmark text-xl"></i></button>
              </div>
              
              <div className="p-8 overflow-y-auto space-y-6 custom-scrollbar">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Nama Promo <span className="text-red-500">*</span></label>
                       <input 
                         type="text" 
                         defaultValue={editingPromo?.name || ''}
                         className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-2xl px-5 py-4 text-slate-800 font-bold" 
                         placeholder="Contoh: Diskon Akhir Tahun 2026" 
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Kode Voucher <span className="text-red-500">*</span></label>
                       <input 
                         type="text" 
                         defaultValue={editingPromo?.code || ''}
                         className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-xs rounded-2xl px-5 py-4 text-brand-600 font-black uppercase tracking-widest" 
                         placeholder="YEAREND26" 
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Berlaku Sampai</label>
                       <input 
                         type="date" 
                         defaultValue={editingPromo?.expiry || ''}
                         className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-2xl px-5 py-4 text-slate-800 font-bold" 
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tipe Diskon</label>
                       <select className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-2xl px-5 py-4 text-slate-800 font-bold appearance-none">
                          <option value="percent">Persentase (%)</option>
                          <option value="nominal">Nominal (Rp)</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Nilai Diskon</label>
                       <input 
                         type="number" 
                         defaultValue={editingPromo?.value || ''}
                         className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-2xl px-5 py-4 text-slate-800 font-bold font-mono" 
                         placeholder="20" 
                       />
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Deskripsi Promo</label>
                    <textarea 
                      defaultValue={editingPromo?.description || ''}
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-2xl px-5 py-4 text-slate-800 font-bold resize-none"
                      placeholder="Syarat dan ketentuan ringkas..."
                    ></textarea>
                 </div>

                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Status Promo</label>
                    <div className="flex gap-6 mt-2">
                       <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="radio" name="status" defaultChecked={editingPromo?.status === 'Active'} className="w-5 h-5 text-brand-600 border-slate-300 focus:ring-brand-500" />
                          <span className="text-sm font-bold text-slate-700 group-hover:text-brand-600 transition-colors flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Aktif
                          </span>
                       </label>
                       <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="radio" name="status" defaultChecked={editingPromo?.status === 'Expired'} className="w-5 h-5 text-brand-600 border-slate-300 focus:ring-brand-500" />
                          <span className="text-sm font-bold text-slate-700 group-hover:text-brand-600 transition-colors flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div> Nonaktif / Hide
                          </span>
                       </label>
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                 <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Batal</button>
                 <button className="px-8 py-4 bg-brand-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20">
                   {editingPromo ? 'Simpan Perubahan' : 'Terbitkan Promo'}
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
