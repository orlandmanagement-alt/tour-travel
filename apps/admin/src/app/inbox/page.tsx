'use client';

import React, { useState } from 'react';

export default function InboxPage() {
  const [activeTicket, setActiveTicket] = useState('TK-8891');

  const tickets = [
    { id: 'TK-8891', name: 'Budi Santoso', title: 'Cara reschedule paket Bromo?', lastMsg: 'Halo admin, saya ingin mengubah...', time: '10:45 AM', unread: true, status: 'Open', type: 'Reguler' },
    { id: 'TK-8892', name: 'PT Maju Bersama', title: 'Request Penawaran Bali Group', lastMsg: 'Kami menunggu revisi proposal...', time: 'Kemarin', unread: false, status: 'Open', type: 'Corporate' },
    { id: 'TK-8885', name: 'Siska (Afiliasi)', title: 'Kapan komisi cair?', lastMsg: 'Tolong cek penarikan dana saya...', time: 'Kemarin', unread: false, status: 'Pending', type: 'Affiliate' },
  ];

  return (
    <div className="h-[calc(100vh-160px)] flex bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-500">
      
      {/* Left Pane: Ticket List */}
      <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-slate-100 flex-shrink-0 bg-slate-50/30">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900 tracking-tight mb-4">CS Inbox</h2>
          <div className="relative mb-4">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input 
              type="text" 
              placeholder="Cari tiket..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-medium"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-brand-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-brand-500/20 transition-all">Open (3)</button>
            <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all">Cleared</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {tickets.map((t) => (
            <div 
              key={t.id}
              onClick={() => setActiveTicket(t.id)}
              className={`p-5 border-b border-slate-50 cursor-pointer transition-all relative ${activeTicket === t.id ? 'bg-white shadow-sm z-10' : 'hover:bg-slate-50/50'}`}
            >
              {activeTicket === t.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-600"></div>}
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={`https://ui-avatars.com/api/?name=${t.name}&background=random`} className="w-9 h-9 rounded-xl border border-slate-100 shadow-sm" alt={t.name} />
                    {t.unread && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 leading-none mb-1">{t.name}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t.id}</p>
                  </div>
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.time}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-800 truncate mb-1">{t.title}</h4>
              <p className="text-[10px] text-slate-500 line-clamp-1 font-medium">{t.lastMsg}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Pane: Chat Thread */}
      <div className="flex-1 flex flex-col bg-white relative">
        {/* Thread Header */}
        <div className="h-20 border-b border-slate-100 px-8 flex justify-between items-center flex-shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <img src="https://ui-avatars.com/api/?name=Budi+Santoso&background=f1f5f9" className="w-10 h-10 rounded-xl shadow-sm" alt="Budi" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-slate-900 text-sm">Budi Santoso</h3>
                <span className="px-2 py-0.5 bg-brand-50 text-brand-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-brand-100">Reguler</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">Tiket: #TK-8891 • INV-20261024-001</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="p-2 text-slate-400 hover:text-brand-600 transition-colors"><i className="fa-solid fa-phone"></i></button>
             <button className="p-2 text-slate-400 hover:text-brand-600 transition-colors"><i className="fa-solid fa-video"></i></button>
             <button className="px-4 py-2 bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-emerald-100 transition-all border border-emerald-100">Selesaikan Tiket</button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-slate-50/20">
          <div className="text-center">
            <span className="px-4 py-1.5 bg-white border border-slate-100 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] shadow-sm">Hari Ini, 10:45 AM</span>
          </div>

          {/* User Message */}
          <div className="flex gap-4 max-w-2xl group">
             <img src="https://ui-avatars.com/api/?name=Budi+Santoso&background=f1f5f9" className="w-9 h-9 rounded-xl shadow-sm mt-1" alt="Budi" />
             <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900">Budi Santoso</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">10:45 AM</span>
                </div>
                <div className="bg-white border border-slate-100 p-5 rounded-[2rem] rounded-tl-none shadow-sm text-sm text-slate-600 leading-relaxed font-medium transition-all group-hover:shadow-md">
                   Halo admin, saya ingin mengubah jadwal keberangkatan untuk pesanan saya (Private Tour Bromo). Seharusnya tanggal 24 Oktober, apakah bisa diundur ke tanggal 26 Oktober?
                </div>
             </div>
          </div>

          {/* Admin Reply */}
          <div className="flex flex-row-reverse gap-4 max-w-2xl ml-auto group">
             <img src="https://ui-avatars.com/api/?name=CS+Agent&background=4f46e5&color=fff" className="w-9 h-9 rounded-xl shadow-sm mt-1" alt="Admin" />
             <div className="space-y-1 text-right">
                <div className="flex flex-row-reverse items-center gap-2">
                  <span className="text-xs font-black text-slate-900">Anda (CS Manager)</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">10:50 AM</span>
                </div>
                <div className="bg-brand-600 p-5 rounded-[2rem] rounded-tr-none shadow-lg shadow-brand-500/20 text-sm text-white leading-relaxed font-medium transition-all group-hover:scale-[1.02] inline-block text-left">
                   Halo Kak Budi, terima kasih telah menghubungi NusaTrip. <br /><br />
                   Untuk perubahan jadwal ke tanggal 26 Oktober masih memungkinkan. Akan ada biaya administrasi Rp 150.000 karena perubahan H-3. <br />
                   Apakah setuju kami kirimkan invoice tambahannya?
                </div>
             </div>
          </div>

          {/* Internal Note */}
          <div className="flex justify-center">
             <div className="max-w-md w-full bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 shadow-sm border-l-4 border-l-amber-500">
                <i className="fa-solid fa-note-sticky text-amber-500 mt-1"></i>
                <div className="flex-1">
                   <p className="text-[9px] font-black text-amber-700 uppercase tracking-[0.2em] mb-1">Internal Note (Private)</p>
                   <p className="text-[10px] font-bold text-amber-800">Sudah stok Jeep ke vendor Agus Bromo. Slot tersedia di tgl 26.</p>
                </div>
             </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-slate-100 flex-shrink-0 z-10">
          <div className="flex items-center gap-2 mb-3">
             <button className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-brand-50 hover:text-brand-600 transition-all"><i className="fa-solid fa-bolt mr-1"></i> Quick Reply</button>
             <button className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-all"><i className="fa-solid fa-sticky-note mr-1"></i> Add Note</button>
          </div>
          <div className="flex items-end gap-3 bg-slate-50 border border-slate-200 rounded-3xl p-2 focus-within:ring-4 focus-within:ring-brand-500/10 focus-within:border-brand-500 transition-all duration-300">
             <button className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-white hover:text-brand-600 transition-all"><i className="fa-solid fa-paperclip"></i></button>
             <textarea 
               className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium py-3 px-2 resize-none max-h-32 min-h-[48px]" 
               placeholder="Ketik pesan Anda di sini..."
             ></textarea>
             <button className="w-12 h-12 bg-brand-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/30 hover:scale-105 active:scale-95 transition-all">
                <i className="fa-solid fa-paper-plane"></i>
             </button>
          </div>
        </div>

      </div>

    </div>
  );
}
