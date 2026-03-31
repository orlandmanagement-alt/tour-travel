'use client';

import React, { useState, useMemo } from 'react';

type Car = {
  id: string;
  name: string;
  plat: string;
  brand: string;
  trans: 'AT' | 'MT';
  seats: number;
  fuel: string;
  price: number;
  status: 'Ready' | 'Rented' | 'Maintenance';
  image: string;
};

const MOCK_CARS: Car[] = [
  { id: '01', name: 'Toyota Innova Zenix Hybrid', plat: 'N 1234 ABC', brand: 'Toyota', trans: 'AT', seats: 7, fuel: 'Hybrid', price: 850000, status: 'Ready', image: 'https://images.unsplash.com/photo-1620067677840-7ac53577d2ec?w=100' },
  { id: '02', name: 'Toyota All New Avanza', plat: 'L 5678 XYZ', brand: 'Toyota', trans: 'AT', seats: 7, fuel: 'Bensin', price: 300000, status: 'Rented', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=100' },
  { id: '03', name: 'Toyota Hiace Commuter', plat: 'B 9999 KKL', brand: 'Toyota', trans: 'MT', seats: 15, fuel: 'Diesel', price: 1100000, status: 'Maintenance', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=100' },
  { id: '04', name: 'Mitsubishi Pajero Sport', plat: 'N 8888 OP', brand: 'Mitsubishi', trans: 'AT', seats: 7, fuel: 'Diesel', price: 1200000, status: 'Ready', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=100' },
];

export default function CarsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const filteredCars = useMemo(() => {
    return MOCK_CARS.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.plat.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredCars.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCars.map(c => c.id));
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
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
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Katalog Kendaraan</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Kelola data mobil, harga sewa, dan status ketersediaan armada.</p>
        </div>
        <button 
          onClick={() => { setEditingCar(null); setIsModalOpen(true); }}
          className="px-6 py-3 bg-brand-600 text-white font-black text-xs rounded-2xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Tambah Mobil
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
              placeholder="Cari Innova, Avanza, No. Plat..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-bold text-slate-700"
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
             {selectedIds.length > 0 ? (
               <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
                  <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{selectedIds.length} Mobil Terpilih</span>
                  <button className="px-4 py-2 bg-red-50 text-red-600 font-extrabold text-[10px] uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100">Hapus Data</button>
               </div>
             ) : (
               <div className="flex gap-2 w-full lg:w-auto">
                  <select className="flex-1 lg:w-40 appearance-none bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 shadow-sm cursor-pointer">
                    <option>Semua Kategori</option>
                    <option>MPV / City Car</option>
                    <option>SUV Premium</option>
                  </select>
                  <select className="flex-1 lg:w-40 appearance-none bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 shadow-sm cursor-pointer">
                    <option>Semua Status</option>
                    <option>Tersedia</option>
                    <option>Disewa</option>
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
                    checked={selectedIds.length === filteredCars.length && filteredCars.length > 0} 
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                  />
                </th>
                <th className="px-8 py-5">Info Mobil</th>
                <th className="px-8 py-5">Spesifikasi</th>
                <th className="px-8 py-5 text-right">Harga Sewa / Hari</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredCars.map((car) => (
                <tr key={car.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(car.id)}
                      onChange={() => toggleSelect(car.id)}
                      className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-xl overflow-hidden shadow-sm border border-slate-100 flex-shrink-0 group-hover:scale-105 transition-transform bg-slate-50 flex items-center justify-center p-1">
                        <img src={car.image} className="max-w-full max-h-full object-contain mix-blend-multiply" alt={car.name} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 group-hover:text-brand-600 transition-colors truncate max-w-[250px]">{car.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight flex items-center gap-1.5">
                          <i className="fa-regular fa-id-card text-brand-600"></i> {car.plat}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex gap-1.5 mb-1.5">
                       <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest rounded">{car.trans}</span>
                       <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest rounded">{car.seats} SEAT</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{car.fuel}</p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <p className="text-sm font-black text-slate-900">{formatPrice(car.price)}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Harga Dasar</p>
                  </td>
                  <td className="px-8 py-5 text-center">
                     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                       car.status === 'Ready' ? 'bg-emerald-50 text-emerald-600' : 
                       car.status === 'Rented' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                     }`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${
                         car.status === 'Ready' ? 'bg-emerald-500' : 
                         car.status === 'Rented' ? 'bg-amber-500' : 'bg-slate-400'
                       }`}></div>
                       {car.status === 'Ready' ? 'Tersedia' : car.status === 'Rented' ? 'Disewa' : 'Servis'}
                     </span>
                  </td>
                  <td className="px-8 py-5 font-medium">
                     <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleEdit(car)}
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
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Menampilkan 1-4 dari 45 armada</p>
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
                      <i className="fa-solid fa-car text-sm"></i>
                    </div>
                    {editingCar ? `Edit Armada #${editingCar.id}` : 'Tambah Armada Baru'}
                 </h2>
                 <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"><i className="fa-solid fa-xmark text-xl"></i></button>
              </div>
              
              <div className="p-8 overflow-y-auto space-y-6 custom-scrollbar">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Nama Kendaraan <span className="text-red-500">*</span></label>
                       <input 
                         type="text" 
                         defaultValue={editingCar?.name || ''}
                         className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-2xl px-5 py-4 text-slate-800 font-bold" 
                         placeholder="Contoh: Toyota Innova Zenix" 
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Transmisi</label>
                       <select className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-2xl px-5 py-4 text-slate-800 font-bold appearance-none">
                          <option>AT - Automatic</option>
                          <option>MT - Manual</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">No. Plat & Tahun</label>
                       <input 
                         type="text" 
                         defaultValue={editingCar?.plat || ''}
                         className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-2xl px-5 py-4 text-slate-800 font-bold" 
                         placeholder="Contoh: N 1234 ABC - 2024" 
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Harga Sewa / Hari (IDR)</label>
                       <input 
                         type="number" 
                         defaultValue={editingCar?.price || ''}
                         className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-2xl px-5 py-4 text-slate-800 font-bold font-mono" 
                         placeholder="1000000" 
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Kapasitas Kursi</label>
                       <input 
                         type="number" 
                         defaultValue={editingCar?.seats || ''}
                         className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 outline-none transition-all text-sm rounded-2xl px-5 py-4 text-slate-800 font-bold" 
                         placeholder="7" 
                       />
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Status Armada</label>
                    <div className="flex flex-wrap gap-6 mt-3">
                       <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="radio" name="status" defaultChecked={editingCar?.status === 'Ready'} className="w-5 h-5 text-brand-600 border-slate-300 focus:ring-brand-500" />
                          <span className="text-sm font-bold text-slate-700 group-hover:text-brand-600 transition-colors flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Tersedia
                          </span>
                       </label>
                       <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="radio" name="status" defaultChecked={editingCar?.status === 'Rented'} className="w-5 h-5 text-brand-600 border-slate-300 focus:ring-brand-500" />
                          <span className="text-sm font-bold text-slate-700 group-hover:text-brand-600 transition-colors flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div> Sedang Disewa
                          </span>
                       </label>
                       <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="radio" name="status" defaultChecked={editingCar?.status === 'Maintenance'} className="w-5 h-5 text-brand-600 border-slate-300 focus:ring-brand-500" />
                          <span className="text-sm font-bold text-slate-700 group-hover:text-brand-600 transition-colors flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-slate-400"></div> Servis / Maintenance
                          </span>
                       </label>
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                 <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Batal</button>
                 <button className="px-8 py-4 bg-brand-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20">
                   {editingCar ? 'Simpan Perubahan' : 'Tambah Armada'}
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
