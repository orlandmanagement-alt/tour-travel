'use client';

import React, { useState, useEffect, useMemo } from 'react';

type MasterItem = { id: string | number; name: string; group: string; meta: string };

export default function MasterDataPage() {
  const [activeTab, setActiveTab] = useState('Locations');
  const [items, setItems] = useState<MasterItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MasterItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Database format states for editing
  const [dbRawItems, setDbRawItems] = useState<any[]>([]);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const endpoint = activeTab === 'Locations' ? '/api/master/locations' : '/api/master/addons';
      const res = await fetch(endpoint);
      const json = await res.json();
      
      if (json.data) {
        setDbRawItems(json.data);
        const mapped = json.data.map((row: any) => {
          if (activeTab === 'Locations') {
            return { id: row.id, name: `${row.city_name || ''} (${row.city_code || ''})`, group: row.province || '', meta: '' };
          } else {
            return { id: row.id, name: row.addon_name || '', group: row.charge_type || '', meta: `Rp ${row.default_price || 0}` };
          }
        });
        setItems(mapped);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
    setSelectedIds([]);
    setSearchQuery('');
  }, [activeTab]);

  const currentItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.group.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  const toggleSelect = (id: string | number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === currentItems.length && currentItems.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentItems.map(i => i.id));
    }
  };

  const handleEdit = (id: string | number) => {
    const rawData = dbRawItems.find(r => r.id === id);
    if (!rawData) return;
    
    // We pass the raw data as editingItem for the form to populate correct fields
    setEditingItem(rawData);
    setIsModalOpen(true);
  };

  const openNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData(e.currentTarget);
    const payload: any = {};
    formData.forEach((value, key) => { payload[key] = value });

    try {
      const baseEndpoint = activeTab === 'Locations' ? '/api/master/locations' : '/api/master/addons';
      const endpoint = editingItem ? `${baseEndpoint}/${editingItem.id}` : baseEndpoint;
      const method = editingItem ? 'PUT' : 'POST';

      await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      setIsModalOpen(false);
      fetchItems();
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan data');
    }
    setIsSaving(false);
  };

  const bulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Hapus permanen ${selectedIds.length} data master terpilih?`)) return;

    setIsLoading(true);
    const baseEndpoint = activeTab === 'Locations' ? '/api/master/locations' : '/api/master/addons';
    
    try {
      for (const id of selectedIds) {
         await fetch(`${baseEndpoint}/${id}`, { method: 'DELETE' });
      }
      setSelectedIds([]);
      fetchItems();
    } catch (e) {
      console.error(e);
      alert('Gagal menghapus beberapa data');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Tabel Referensi</h1>
          <p className="text-sm text-slate-500 font-medium">Kelola data lookup statis (Lokasi & Add-ons) untuk seluruh platform.</p>
        </div>
        <button 
          onClick={openNew}
          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Tambah Data
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-200 mb-6 gap-2">
        {['Locations', 'Add-ons'].map(tab => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`px-4 py-3 text-sm transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${activeTab === tab ? 'border-brand-600 text-brand-600 font-bold' : 'border-transparent text-slate-500 font-medium hover:text-slate-700'}`}
           >
             {tab}
           </button>
        ))}
      </div>

      {/* Search & Bulk Action Bar */}
      <div className="bg-white border border-slate-200 rounded-t-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="relative w-full md:w-96">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
            <input 
              type="text" 
              placeholder="Cari nama data master..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-sm rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-brand-500 transition-all font-medium text-slate-700" 
            />
         </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border-x border-b border-slate-200 rounded-b-2xl shadow-sm overflow-hidden relative">
        
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex items-center justify-center">
             <i className="fa-solid fa-circle-notch fa-spin text-brand-600 text-3xl"></i>
          </div>
        )}

        {selectedIds.length > 0 && (
          <div className="flex bg-brand-50 border-b border-brand-200 p-3 justify-between items-center transition-all">
             <span className="text-sm font-bold text-brand-700 ml-2">{selectedIds.length} Item Terpilih</span>
             <button onClick={bulkDelete} className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-lg shadow-sm">
                 <i className="fa-solid fa-trash mr-1"></i> Hapus Massal
             </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
             <thead>
                <tr className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-200">
                   <th className="p-4 w-12 text-center">
                     <input 
                       type="checkbox" 
                       checked={selectedIds.length === currentItems.length && currentItems.length > 0}
                       onChange={toggleSelectAll}
                       className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer" 
                     />
                   </th>
                   <th className="p-4 font-bold w-16 text-center">ID</th>
                   <th className="p-4 font-bold">Label / Name</th>
                   <th className="p-4 font-bold">Metadata / Values</th>
                   <th className="p-4 font-bold text-center">Aksi</th>
                </tr>
             </thead>
             <tbody className="text-sm">
                {currentItems.map(item => (
                  <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                     <td className="p-4 text-center">
                       <input 
                         type="checkbox" 
                         checked={selectedIds.includes(item.id)}
                         onChange={() => toggleSelect(item.id)}
                         className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer" 
                       />
                     </td>
                     <td className="p-4 text-center font-mono text-xs text-slate-400">#{item.id}</td>
                     <td className="p-4">
                        <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{item.group}</p>
                     </td>
                     <td className="p-4">
                        <span className="text-xs text-slate-600 font-mono bg-slate-100 px-2 py-1 rounded">{item.meta || '-'}</span>
                     </td>
                     <td className="p-4 text-center">
                        <button onClick={() => handleEdit(item.id)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors" title="Edit">
                           <i className="fa-solid fa-pen-to-square text-xs"></i>
                        </button>
                     </td>
                  </tr>
                ))}
                {currentItems.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400 text-sm">Tidak ada data ditemukan.</td>
                  </tr>
                )}
             </tbody>
          </table>
        </div>
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                 <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                     <i className="fa-solid fa-database text-brand-600"></i> {editingItem ? 'Edit Data Master' : 'Data Master Baru'}
                 </h2>
                 <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 focus:outline-none">
                    <i className="fa-solid fa-xmark text-xl"></i>
                 </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="p-6 space-y-5">
                   {activeTab === 'Locations' ? (
                     <>
                       <div>
                         <label className="block text-xs font-bold text-slate-700 mb-1.5">City Code <span className="text-red-500">*</span></label>
                         <input name="city_code" defaultValue={editingItem?.city_code || ''} className="w-full bg-white border border-slate-300 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-brand-500 text-slate-800" placeholder="E.g. MLG" required />
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-slate-700 mb-1.5">City Name <span className="text-red-500">*</span></label>
                         <input name="city_name" defaultValue={editingItem?.city_name || ''} className="w-full bg-white border border-slate-300 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-brand-500 text-slate-800" placeholder="E.g. Malang" required />
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-slate-700 mb-1.5">Province <span className="text-red-500">*</span></label>
                         <input name="province" defaultValue={editingItem?.province || ''} className="w-full bg-white border border-slate-300 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-brand-500 text-slate-800" placeholder="E.g. Jawa Timur" required />
                       </div>
                     </>
                   ) : (
                     <>
                       <div>
                         <label className="block text-xs font-bold text-slate-700 mb-1.5">Addon Name <span className="text-red-500">*</span></label>
                         <input name="addon_name" defaultValue={editingItem?.addon_name || ''} className="w-full bg-white border border-slate-300 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-brand-500 text-slate-800" placeholder="E.g. Sewa Kamera" required />
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-slate-700 mb-1.5">Location ID (opsional)</label>
                         <input name="location_id" type="number" defaultValue={editingItem?.location_id || ''} className="w-full bg-white border border-slate-300 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-brand-500 text-slate-800" />
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-slate-700 mb-1.5">Charge Type <span className="text-red-500">*</span></label>
                         <select name="charge_type" defaultValue={editingItem?.charge_type || 'per_pax'} className="w-full bg-white border border-slate-300 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-brand-500 text-slate-800">
                           <option value="per_pax">Per Pax</option>
                           <option value="per_group">Per Group</option>
                         </select>
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-slate-700 mb-1.5">Default Price <span className="text-red-500">*</span></label>
                         <input name="default_price" type="number" defaultValue={editingItem?.default_price || 0} className="w-full bg-white border border-slate-300 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-brand-500 text-slate-800" required />
                       </div>
                     </>
                   )}
                </div>
                <div className="p-5 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex justify-end gap-3">
                   <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-sm rounded-lg transition-colors">Batal</button>
                   <button type="submit" disabled={isSaving} className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-lg shadow-md transition-colors flex items-center gap-2">
                       {isSaving ? <i className="fa-solid fa-circle-notch fa-spin"></i> : null}
                       <span>Simpan Data</span>
                   </button>
                </div>
              </form>
           </div>
        </div>
      )}

    </div>
  );
}
