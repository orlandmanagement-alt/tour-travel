'use client';

"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';

export default function SubmitReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ratingLabels: Record<number, string> = {
    1: "Sangat Buruk 😞",
    2: "Buruk 😕",
    3: "Cukup Baik 😐",
    4: "Sangat Baik! 🙂",
    5: "Luar Biasa Sempurna! 😍"
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return alert('Pilih rating terlebih dahulu');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const displayRating = hoveredRating || rating;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col pt-20">
      
      {/* Header Minimalist */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/5 py-4 sticky top-20 z-40">
         <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
            <Link href="/dashboard" className="text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest flex items-center gap-2 transition-all">
               <i className="fa-solid fa-arrow-left"></i> Batal
            </Link>
            <div className="font-black text-lg tracking-tighter text-slate-900 dark:text-white flex items-center gap-2 uppercase">
               <div className="w-8 h-8 rounded bg-indigo-600 text-white flex items-center justify-center shadow-lg"><i className="fa-solid fa-star text-xs"></i></div>
               NusaReview
            </div>
            <div className="w-12"></div>
         </div>
      </header>

      <main className="flex-1 flex items-start justify-center p-6 sm:p-12">
         <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-2xl border border-slate-200 dark:border-white/5 overflow-hidden relative animate-in zoom-in-95 duration-700">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="p-10 sm:p-16 relative z-10">
               
               <div className="text-center mb-12 space-y-2">
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Bagaimana Trip Anda?</h1>
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400 italic font-serif">Bantu pelancong lain dengan membagikan pengalaman seru Anda!</p>
               </div>

               {/* Trip Item Context */}
               <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 flex gap-6 items-center mb-12">
                  <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-white dark:border-slate-700 shadow-xl shrink-0">
                     <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400" className="w-full h-full object-cover" alt="Trip" />
                  </div>
                  <div className="space-y-1">
                     <span className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em]">Paket Tour Selesai</span>
                     <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight">Bali Explorer Family Fun Trip</h3>
                     <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Berangkat: 17 Agu 2025</p>
                  </div>
               </div>

               <form onSubmit={handleSubmit} className="space-y-12">
                  
                  {/* Star Rating */}
                  <div className="text-center space-y-6">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Penilaian Keseluruhan</label>
                     <div className="flex justify-center gap-2 sm:gap-4 flex-row-reverse group">
                        {[5, 4, 3, 2, 1].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onMouseEnter={() => setHoveredRating(val)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(val)}
                            className={`text-4xl sm:text-5xl transition-all duration-300 transform hover:scale-125 focus:outline-none ${displayRating >= val ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]' : 'text-slate-200 dark:text-slate-800'}`}
                          >
                             <i className="fa-solid fa-star"></i>
                          </button>
                        ))}
                     </div>
                     <p className="text-sm font-black text-indigo-600 uppercase tracking-widest h-6 transition-all">{ratingLabels[displayRating] || ""}</p>
                  </div>

                  {/* Review Text */}
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Ceritakan Pengalaman Anda</label>
                     <div className="bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-700/50 focus-within:ring-4 focus-within:ring-indigo-600/10 transition-all">
                        <textarea 
                          required
                          className="w-full h-40 bg-transparent border-none text-sm font-bold text-slate-800 dark:text-white focus:ring-0 outline-none resize-none placeholder:text-slate-300 dark:placeholder:text-slate-600"
                          placeholder="Apa yang paling Anda sukai? Pelayanan guide, hotel, atau spot wisatanya?"
                        ></textarea>
                     </div>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-right mr-4">Min. 50 Karakter</p>
                  </div>

                  {/* Upload Images */}
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Unggah Foto (Opsional)</label>
                     <div 
                       onClick={() => fileInputRef.current?.click()}
                       className="border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group"
                     >
                        <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center text-indigo-600 text-2xl shadow-xl group-hover:scale-110 transition-transform">
                           <i className="fa-solid fa-cloud-arrow-up"></i>
                        </div>
                        <div className="text-center">
                           <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Klik atau Seret Foto</p>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Maks. 5 Foto • JPG/PNG</p>
                        </div>
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*" 
                          className="hidden" 
                          ref={fileInputRef} 
                          onChange={handleImageUpload}
                        />
                     </div>

                     {/* Previews */}
                     {images.length > 0 && (
                        <div className="flex flex-wrap gap-4 pt-4 px-4">
                           {images.map((img, i) => (
                             <div key={i} className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-700 group">
                                <img src={img} className="w-full h-full object-cover" alt="Preview" />
                                <button 
                                  onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                                  className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                   <i className="fa-solid fa-trash-can"></i>
                                </button>
                             </div>
                           ))}
                        </div>
                     )}
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full py-6 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.3em] rounded-[2rem] shadow-2xl shadow-indigo-500/40 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                  >
                     {isSubmitting ? <span className="flex items-center gap-3"><i className="fa-solid fa-circle-notch fa-spin"></i> Mengirim...</span> : <span>Kirim Ulasan Sekarang <i className="fa-solid fa-paper-plane"></i></span>}
                  </button>

               </form>

            </div>
         </div>
      </main>

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-12 max-w-sm w-full text-center shadow-[0_0_100px_rgba(79,70,229,0.3)] border border-white/5 relative overflow-hidden animate-in zoom-in-95 duration-500">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 space-y-8">
                 <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center text-5xl mx-auto shadow-2xl shadow-yellow-500/20">
                    <i className="fa-solid fa-star"></i>
                 </div>
                 <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Terima Kasih!</h2>
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">Ulasan Anda sangat berarti. Kami telah menambahkan <span className="text-indigo-600 font-black">+100 NusaPoin</span> ke akun Anda!</p>
                 </div>
                 <Link href="/dashboard" className="block w-full py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] shadow-xl hover:bg-indigo-700 transition-all">
                    Selesai
                 </Link>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
