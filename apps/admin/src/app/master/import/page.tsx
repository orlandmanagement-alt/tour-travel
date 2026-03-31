'use client';

import React, { useState, useCallback } from 'react';

export default function BulkImportPage() {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.name.endsWith('.csv')) {
      setUploadedFile(file);
    } else {
      alert('Mohon unggah file dengan format CSV.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Title Section */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Bulk Tour Import</h1>
        <p className="text-sm font-medium text-slate-500 mt-2">Unggah file CSV untuk membuat paket tour dalam jumlah besar sekaligus.</p>
      </div>

      {!uploadedFile ? (
        /* Drag & Drop Zone */
        <div 
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
          className={`relative group cursor-pointer py-20 px-8 flex flex-col items-center justify-center text-center rounded-[3rem] border-4 border-dashed transition-all duration-500 ${
            isDragActive 
              ? 'border-brand-600 bg-brand-50/50 scale-[1.02]' 
              : 'border-slate-200 bg-slate-50/50 hover:border-brand-300 hover:bg-slate-50'
          }`}
        >
          <div className={`w-20 h-20 rounded-3xl mb-8 flex items-center justify-center text-3xl transition-all duration-500 ${
            isDragActive ? 'bg-brand-600 text-white shadow-xl rotate-12' : 'bg-white text-slate-400 shadow-sm group-hover:scale-110'
          }`}>
            <i className="fa-solid fa-cloud-arrow-up"></i>
          </div>

          <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Tarik & Lepas CSV atau Klik untuk Cari</h3>
          
          <div className="space-y-4 max-w-md">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] leading-relaxed">
              Kolom wajib tersedia: <br />
              <code className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md mx-1 lowercase">name</code>
              <code className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md mx-1 lowercase">location</code>
              <code className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md mx-1 lowercase">base_price</code>
            </p>

            <button 
              onClick={(e) => { e.stopPropagation(); alert('Downloading template...'); }}
              className="inline-flex items-center gap-2 text-xs font-black text-brand-600 bg-brand-50 px-4 py-2 rounded-xl border border-brand-100 hover:bg-brand-600 hover:text-white transition-all group/dl"
            >
              <i className="fa-solid fa-download group-hover/dl:animate-bounce"></i> 
              DOWNLOAD TEMPLATE CSV
            </button>
          </div>

          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            accept=".csv" 
            onChange={(e) => e.target.files && handleFile(e.target.files[0])} 
          />
        </div>
      ) : (
        /* Success / Result State */
        <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 flex flex-col items-center gap-8 animate-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner">
             <i className="fa-solid fa-file-circle-check"></i>
           </div>
           
           <div className="text-center">
             <h3 className="text-2xl font-black text-slate-900 tracking-tight">{uploadedFile.name}</h3>
             <p className="text-sm font-bold text-emerald-600 mt-2 uppercase tracking-widest">File Terdeteksi & Siap Diproses</p>
             <p className="text-xs text-slate-400 mt-4 max-w-sm mx-auto font-medium leading-relaxed underline">
               Tips: Pastikan pemisah desimal menggunakan titik (.) sesuai standar internasional agar harga terbaca dengan benar.
             </p>
           </div>

           <div className="flex gap-4 w-full max-w-xs">
              <button 
                onClick={() => setUploadedFile(null)}
                className="flex-1 py-4 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all"
              >
                Ganti File
              </button>
              <button 
                className="flex-1 py-4 bg-brand-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-lg shadow-brand-500/30 hover:bg-brand-700 transition-all"
                onClick={() => alert('Processing import...')}
              >
                Konfirmasi & Impor
              </button>
           </div>
        </div>
      )}

      {/* Security Info Footer */}
      <div className="p-8 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-transparent opacity-50"></div>
         <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl text-accent-400">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
               <h4 className="text-sm font-black tracking-tight">Keamanan Data Terjamin</h4>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Parsed exclusively in your browser</p>
            </div>
         </div>
         <div className="relative z-10 px-6 py-2 border border-white/20 rounded-full text-[9px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
            Enterprise Grade Parsing v4.1
         </div>
      </div>

    </div>
  );
}
