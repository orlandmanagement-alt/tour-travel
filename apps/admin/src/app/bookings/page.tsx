'use client';

import React, { useState, useEffect } from 'react';

type BookingItem = {
  id: string | number;
  booking_reference: string;
  customer_name: string;
  customer_email: string;
  tour_name?: string;
  grand_total: number;
  payment_status: string;
  created_at: string;
};

export default function BookingsManagementPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [toastMsg, setToastMsg] = useState({ text: '', show: false, color: 'text-emerald-400', icon: 'fa-circle-check' });

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bookings');
      const json = await res.json();
      if (json.data) {
        setBookings(json.data);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const showToast = (text: string, icon = 'fa-circle-check', color = 'text-emerald-400') => {
    setToastMsg({ text, show: true, icon, color });
    setTimeout(() => setToastMsg(prev => ({ ...prev, show: false })), 3500);
  };

  const filteredBookings = bookings.filter(b => {
    const matchSearch = String(b.booking_reference).toLowerCase().includes(searchQuery.toLowerCase()) ||
                        String(b.customer_name).toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'Semua Status' || String(b.payment_status).toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const toggleSelect = (id: string | number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredBookings.length && filteredBookings.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredBookings.map(b => b.id));
    }
  };

  const autoCleanCancelled = async () => {
    if(confirm("Apakah Anda ingin menghapus SEMUA pesanan berstatus 'Dibatalkan' yang berusia lebih dari 3 hari secara otomatis?")) {
      setIsLoading(true);
      try {
        const res = await fetch('/api/bookings/clean', { method: 'DELETE' });
        const data = await res.json();
        showToast(`Sistem berhasil membersihkan ${data.data?.deleted || 0} pesanan lama.`, "fa-broom");
        fetchBookings();
        setSelectedIds([]);
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    }
  };

  const deleteSingleOrder = async (id: string | number, status: string) => {
    if (status.toLowerCase() !== 'cancelled') {
        showToast("Data ini tidak dapat dihapus demi integritas keuangan.", "fa-triangle-exclamation", "text-red-400");
        return;
    }
    if (confirm(`Yakin ingin menghapus pesanan #${id}?`)) {
        setIsLoading(true);
        try {
            await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
            showToast("Pesanan berhasil dihapus.", "fa-trash-can");
            fetchBookings();
            setSelectedIds(prev => prev.filter(i => i !== id));
        } catch(e) {
            console.error(e);
        }
        setIsLoading(false);
    }
  };

  const bulkDeleteOrders = async () => {
    const toDelete = bookings.filter(b => selectedIds.includes(b.id) && String(b.payment_status).toLowerCase() === 'cancelled');
    if (toDelete.length === 0) {
      showToast("Hanya pesanan berstatus 'Cancelled' yang dapat dihapus", "fa-triangle-exclamation", "text-red-400");
      return;
    }

    if (confirm(`Yakin hapus ${toDelete.length} pesanan yang dibatalkan?`)) {
      setIsLoading(true);
      try {
        for (const order of toDelete) {
          await fetch(`/api/bookings/${order.id}`, { method: 'DELETE' });
        }
        showToast(`${toDelete.length} pesanan berhasil dibersihkan.`, "fa-check-double");
        fetchBookings();
        setSelectedIds([]);
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    }
  };

  // KPIs
  const paidCount = bookings.filter(b => String(b.payment_status).toLowerCase() === 'paid').length;
  const pendingCount = bookings.filter(b => String(b.payment_status).toLowerCase() === 'pending').length;
  const cancelledCount = bookings.filter(b => String(b.payment_status).toLowerCase() === 'cancelled').length;
  const refundedCount = bookings.filter(b => String(b.payment_status).toLowerCase() === 'refunded').length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Toast */}
      <div className={`fixed bottom-5 right-5 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl z-[100] font-bold text-sm flex items-center gap-3 transition-all duration-300 ${toastMsg.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <i className={`fa-solid ${toastMsg.icon} ${toastMsg.color} text-lg`}></i> 
          <span>{toastMsg.text}</span>
      </div>

      {/* KPI STATS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sukses / Lunas</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm"><i className="fa-solid fa-check-double"></i></div>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">{paidCount}</h3>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Menunggu Bayar</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm"><i className="fa-solid fa-clock"></i></div>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">{pendingCount}</h3>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dibatalkan / Exp</span>
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center text-sm"><i className="fa-solid fa-ban"></i></div>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">{cancelledCount}</h3>
              <p className="text-[10px] text-red-400 font-bold mt-1"><i className="fa-solid fa-triangle-exclamation"></i> Perlu pembersihan data</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Refund Terproses</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm"><i className="fa-solid fa-money-bill-transfer"></i></div>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">{refundedCount}</h3>
          </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
              <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Daftar Transaksi</h1>
              <p className="text-sm text-slate-500 font-medium">Hanya data dengan status 'Cancelled' yang dapat dihapus secara manual.</p>
          </div>
          <button onClick={autoCleanCancelled} className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2">
              <i className="fa-solid fa-broom"></i> Bersihkan Data (>3 Hari)
          </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white border border-slate-200 rounded-t-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
              <input 
                type="text" 
                placeholder="Cari No. Invoice atau Pelanggan..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-brand-500 transition-all font-medium text-slate-700" 
              />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
              <select 
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-white border border-slate-300 text-slate-600 text-xs font-bold rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-500 shadow-sm cursor-pointer"
              >
                  <option>Semua Status</option>
                  <option value="paid">Sukses</option>
                  <option value="pending">Menunggu Pembayaran</option>
                  <option value="cancelled">Dibatalkan</option>
                  <option value="refunded">Refund</option>
              </select>
          </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white border-x border-b border-slate-200 rounded-b-2xl shadow-sm overflow-hidden relative">
          
          {isLoading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <i className="fa-solid fa-circle-notch fa-spin text-brand-600 text-3xl"></i>
            </div>
          )}

          {selectedIds.length > 0 && (
            <div className="flex bg-brand-50 border-b border-brand-200 p-3 justify-between items-center transition-all">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-brand-700 ml-2"><span>{selectedIds.length}</span> Transaksi Terpilih</span>
                    <p className="text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100 font-bold"><i className="fa-solid fa-circle-info"></i> Hanya status 'Cancelled' yang akan diproses hapus.</p>
                </div>
                <button onClick={bulkDeleteOrders} className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-lg shadow-sm transition-colors">
                    <i className="fa-solid fa-trash-can mr-1"></i> Hapus Massal
                </button>
            </div>
          )}

          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                      <tr className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-200">
                          <th className="p-4 w-12 text-center">
                              <input 
                                type="checkbox" 
                                checked={selectedIds.length === filteredBookings.length && filteredBookings.length > 0} 
                                onChange={toggleSelectAll}
                                className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                              />
                          </th>
                          <th className="p-4 font-bold">No. Invoice / Tgl</th>
                          <th className="p-4 font-bold">Pelanggan</th>
                          <th className="p-4 font-bold">Layanan</th>
                          <th className="p-4 font-bold text-right">Total Tagihan</th>
                          <th className="p-4 font-bold text-center">Status</th>
                          <th className="p-4 font-bold text-center">Aksi</th>
                      </tr>
                  </thead>
                  <tbody className="text-sm">
                      {filteredBookings.map(b => (
                        <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="p-4 text-center">
                                <input 
                                  type="checkbox" 
                                  checked={selectedIds.includes(b.id)} 
                                  onChange={() => toggleSelect(b.id)}
                                  className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer" 
                                />
                            </td>
                            <td className="p-4">
                                <p className="font-mono font-bold text-slate-900 text-xs">{b.booking_reference}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">{new Date(b.created_at).toLocaleString('id-ID')}</p>
                            </td>
                            <td className="p-4">
                                <p className="font-bold text-slate-800">{b.customer_name}</p>
                                <p className="text-[10px] text-slate-500">{b.customer_email}</p>
                            </td>
                            <td className="p-4">
                                <span className="bg-brand-50 text-brand-600 text-[9px] font-bold px-1.5 py-0.5 rounded inline-block mb-0.5 uppercase tracking-tighter">Tour</span>
                                <p className="text-xs text-slate-600 line-clamp-1">{b.tour_name || 'Custom Trip'}</p>
                            </td>
                            <td className="p-4 text-right">
                                <p className="font-extrabold text-slate-900">Rp {Number(b.grand_total).toLocaleString('id-ID')}</p>
                            </td>
                            <td className="p-4 text-center">
                                {String(b.payment_status).toLowerCase() === 'paid' && <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap"><i className="fa-solid fa-check"></i> Sukses</span>}
                                {String(b.payment_status).toLowerCase() === 'pending' && <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap"><i className="fa-regular fa-clock"></i> Pending</span>}
                                {String(b.payment_status).toLowerCase() === 'cancelled' && <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap"><i className="fa-solid fa-ban"></i> Dibatalkan</span>}
                                {String(b.payment_status).toLowerCase() === 'refunded' && <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap"><i className="fa-solid fa-money-bill-transfer"></i> Refunded</span>}
                            </td>
                            <td className="p-4 text-center">
                                <div className="flex justify-center gap-2">
                                    <button className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-600 transition-colors" title="Lihat"><i className="fa-solid fa-eye text-xs"></i></button>
                                    {String(b.payment_status).toLowerCase() === 'cancelled' ? (
                                      <button onClick={() => deleteSingleOrder(b.id, String(b.payment_status))} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-600 hover:text-white transition-colors" title="Hapus"><i className="fa-solid fa-trash-can text-xs"></i></button>
                                    ) : (
                                      <button className="w-8 h-8 rounded-lg cursor-not-allowed opacity-30 grayscale" title="Data Sukses Dikunci"><i className="fa-solid fa-lock text-xs"></i></button>
                                    )}
                                </div>
                            </td>
                        </tr>
                      ))}
                      {filteredBookings.length === 0 && !isLoading && (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-400 text-sm">Tidak ada transaksi ditemukan.</td>
                        </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
}
