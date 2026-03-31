'use client';

import React, { useState, useMemo } from 'react';

type Tour = {
  id: string;
  name: string;
  location: string;
  type: 'PRIVATE' | 'OPEN TRIP' | 'CORPORATE';
  duration: string;
  price: number;
  status: 'Published' | 'Draft';
  image: string;
};

const MOCK_TOURS: Tour[] = [
  { id: '01', name: 'Private Tour Bromo Midnight & Madakaripura', location: 'Start Malang / SBY', type: 'PRIVATE', duration: '3 Hari 2 Malam', price: 1250000, status: 'Published', image: 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=100' },
  { id: '02', name: 'Open Trip Kawah Ijen Blue Fire Experience', location: 'Start Banyuwangi', type: 'OPEN TRIP', duration: '1 Hari (12 Jam)', price: 350000, status: 'Published', image: 'https://images.unsplash.com/photo-1517441865-c32f8313bd8a?w=100' },
  { id: '03', name: 'Explore Japan Golden Route Autumn', location: 'Jepang (Intl)', type: 'OPEN TRIP', duration: '7 Hari 6 Malam', price: 18500000, status: 'Draft', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=100' },
  { id: '04', name: 'Bali South Beach & Uluwatu Sunset', location: 'Bali', type: 'PRIVATE', duration: '1 Hari', price: 550000, status: 'Published', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=100' },
];

export default function ToursPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);

  const filteredTours = useMemo(() => {
    return MOCK_TOURS.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredTours.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTours.map(t => t.id));
    }
  };

  const handleEdit = (tour: Tour) => {
    setEditingTour(tour);
    setIsModalOpen(true);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Daftar Paket Tour</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Kelola paket, atur harga, dan perbarui status ketersediaan.</p>
        </div>
        <button 
          onClick={() => { setEditingTour(null); setIsModalOpen(true); }}
          className="px-6 py-3 bg-brand-600 text-white font-black text-xs rounded-2xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Tambah Paket Baru
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
              placeholder="Cari nama paket, lokasi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-bold text-slate-700"
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
             {selectedIds.length > 0 ? (
               <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
                  <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{selectedIds.length} Item Terpilih</span>
                  <button className="px-4 py-2 bg-red-50 text-red-600 font-extrabold text-[10px] uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100">Hapus Massal</button>
               </div>
             ) : (
               <div className="flex gap-2 w-full lg:w-auto">
                  <select className="flex-1 lg:w-40 appearance-none bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 shadow-sm cursor-pointer">
                    <option>Semua Tipe</option>
                    <option>Private</option>
                    <option>Open Trip</option>
                  </select>
                  <select className="flex-1 lg:w-40 appearance-none bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 shadow-sm cursor-pointer">
                    <option>Semua Status</option>
                    <option>Published</option>
                    <option>Draft</option>
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
                    checked={selectedIds.length === filteredTours.length && filteredTours.length > 0} 
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                  />
                </th>
                <th className="px-8 py-5">Info Paket</th>
                <th className="px-8 py-5">Tipe & Durasi</th>
                <th className="px-8 py-5 text-right">Harga Dasar</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTours.map((tour) => (
                <tr key={tour.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(tour.id)}
                      onChange={() => toggleSelect(tour.id)}
                      className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex-shrink-0 group-hover:scale-105 transition-transform">
                        <img src={tour.image} className="w-full h-full object-cover" alt={tour.name} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 group-hover:text-brand-600 transition-colors truncate max-w-[250px]">{tour.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight flex items-center gap-1.5">
                          <i className="fa-solid fa-location-dot text-brand-600"></i> {tour.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest mb-1.5 ${tour.type === 'PRIVATE' ? 'bg-brand-50 text-brand-600' : 'bg-accent-50 text-accent-600'}`}>{tour.type}</span>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{tour.duration}</p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <p className="text-sm font-black text-slate-900">{formatPrice(tour.price)}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">per pax</p>
                  </td>
                  <td className="px-8 py-5 text-center">
                     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                       tour.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                     }`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${tour.status === 'Published' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                       {tour.status}
                     </span>
                  </td>
                  <td className="px-8 py-5 font-medium">
                     <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleEdit(tour)}
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
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Menampilkan 1-4 dari 124 paket tour</p>
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
                      <i className="fa-solid fa-map-location-dot text-sm"></i>
                    </div>
                    {editingTour ? `Edit Paket #${editingTour.id}` : 'Paket Tour Baru'}
                 </h2>
                 <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"><i className="fa-solid fa-xmark text-xl"></i></button>
              </div>
              
              <div className="p-8 overflow-y-auto space-y-6 custom-scrollbar">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Nama Paket <span className="text-red-500">*</span></label>
                       <input 
                         type="text" 
                         defaultValue={editingTour?.name || ''}
                         className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-2xl px-5 py-4 text-slate-800 font-bold" 
                         placeholder="Contoh: Private Tour Bromo Midnight" 
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tipe Tour</label>
                       <select className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-2xl px-5 py-4 text-slate-800 font-bold appearance-none">
                          <option>PRIVATE</option>
                          <option>OPEN TRIP</option>
                          <option>CORPORATE</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Lokasi / Destinasi</label>
                       <input 
                         type="text" 
                         defaultValue={editingTour?.location || ''}
                         className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-2xl px-5 py-4 text-slate-800 font-bold" 
                         placeholder="Contoh: Malang / Surabaya" 
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Harga Dasar (IDR)</label>
                       <input 
                         type="number" 
                         defaultValue={editingTour?.price || ''}
                         className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-2xl px-5 py-4 text-slate-800 font-bold font-mono" 
                         placeholder="1000000" 
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Durasi</label>
                       <input 
                         type="text" 
                         defaultValue={editingTour?.duration || ''}
                         className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-2xl px-5 py-4 text-slate-800 font-bold" 
                         placeholder="Contoh: 3D2N" 
                       />
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Status Penayangan</label>
                    <div className="flex gap-6 mt-2">
                       <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="radio" name="status" defaultChecked={editingTour?.status === 'Published'} className="w-5 h-5 text-brand-600 border-slate-300 focus:ring-brand-500" />
                          <span className="text-sm font-bold text-slate-700 group-hover:text-brand-600 transition-colors flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Aktif (Published)
                          </span>
                       </label>
                       <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="radio" name="status" defaultChecked={editingTour?.status === 'Draft'} className="w-5 h-5 text-brand-600 border-slate-300 focus:ring-brand-500" />
                          <span className="text-sm font-bold text-slate-700 group-hover:text-brand-600 transition-colors flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-slate-400"></div> Draft / Hidden
                          </span>
                       </label>
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                 <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Batal</button>
                 <button className="px-8 py-4 bg-brand-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20">
                   {editingTour ? 'Simpan Perubahan' : 'Terbitkan Paket'}
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
