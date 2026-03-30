'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PlannerPage() {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({
    dest: '',
    duration: '',
    vibe: '',
    budget: '',
    guests: 2
  });
  const [submitted, setSubmitted] = useState(false);
  const totalSteps = 5;

  const handleSelect = (key: string, value: string) => {
    setSelection(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else setSubmitted(true);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col pt-24">
      
      {/* Progress Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-6 sticky top-24 z-30 transition-all">
        <div className="max-w-xl mx-auto px-6">
          <div className="flex justify-between text-[10px] font-black text-brand-primary uppercase tracking-widest mb-3">
            <span>Langkah {step} dari {totalSteps}</span>
            <span className="tabular-nums">{Math.round(progress)}% Selesai</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-primary transition-all duration-700 ease-out shadow-[0_0_15px_rgba(79,70,229,0.4)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <main className="flex-grow flex items-start justify-center p-4 sm:p-10">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col relative min-h-[550px]">
          
          <div className="p-8 sm:p-12 flex-grow">

            {/* Step 1: Destination */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-10">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Destinasi Impian</h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold italic">Ke mana Anda ingin melangkah kali ini?</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'Domestic', label: 'Domestik', icon: 'fa-solid fa-map-location-dot', desc: 'Jelajahi keindahan Nusantara dari Sabang sampai Merauke.' },
                    { id: 'International', label: 'Internasional', icon: 'fa-solid fa-earth-americas', desc: 'Keliling dunia, dari Asia Timur hingga benua Eropa.' }
                  ].map(opt => (
                    <button 
                      key={opt.id}
                      onClick={() => handleSelect('dest', opt.id)}
                      className={`p-8 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center text-center group ${selection.dest === opt.id ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700'}`}
                    >
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-xl transition-all duration-500 group-hover:scale-110 ${selection.dest === opt.id ? 'bg-brand-primary text-white' : 'bg-white dark:bg-slate-700 text-slate-400'}`}>
                        <i className={opt.icon}></i>
                      </div>
                      <h3 className={`font-black uppercase tracking-wider text-sm mb-2 ${selection.dest === opt.id ? 'text-brand-primary' : 'text-slate-800 dark:text-slate-200'}`}>{opt.label}</h3>
                      <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed italic">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Duration */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-10">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Durasi Liburan</h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold italic">Tentukan lama perjalanan yang Anda rencanakan.</p>
                </div>
                <div className="space-y-4">
                  {[
                    { id: '1-3 Hari', label: 'Trip Pendek (1-3 Hari)', icon: 'fa-regular fa-clock', desc: 'Cocok untuk weekend getaway atau transit.' },
                    { id: '4-7 Hari', label: 'Liburan Standar (4-7 Hari)', icon: 'fa-solid fa-calendar-day', desc: 'Ideal untuk eksplorasi kota secara mendalam.' },
                    { id: '> 7 Hari', label: 'Perjalanan Panjang (> 7 Hari)', icon: 'fa-solid fa-calendar-days', desc: 'Eksplorasi lintas wilayah atau benua.' }
                  ].map(opt => (
                    <button 
                      key={opt.id}
                      onClick={() => handleSelect('duration', opt.id)}
                      className={`w-full p-5 rounded-2xl border-2 transition-all duration-300 flex items-center gap-5 text-left group ${selection.duration === opt.id ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700'}`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg transition-all duration-500 group-hover:scale-110 ${selection.duration === opt.id ? 'bg-brand-primary text-white' : 'bg-white dark:bg-slate-700 text-slate-400'}`}>
                        <i className={opt.icon}></i>
                      </div>
                      <div>
                        <h3 className={`font-black uppercase tracking-widest text-xs mb-1 ${selection.duration === opt.id ? 'text-brand-primary' : 'text-slate-800 dark:text-slate-200'}`}>{opt.label}</h3>
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 italic">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Vibe */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-10">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Vibe Liburan</h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold italic">Apa fokus utama dari perjalanan Anda kali ini?</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'Nature', label: 'Alam & Outdoor', icon: 'fa-solid fa-mountain-sun' },
                    { id: 'Relax', label: 'Santai & Pantai', icon: 'fa-solid fa-umbrella-beach' },
                    { id: 'Culture', label: 'Budaya & Sejarah', icon: 'fa-solid fa-place-of-worship' },
                    { id: 'City', label: 'Perkotaan (MICE)', icon: 'fa-solid fa-city' }
                  ].map(opt => (
                    <button 
                      key={opt.id}
                      onClick={() => handleSelect('vibe', opt.id)}
                      className={`p-6 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center text-center group ${selection.vibe === opt.id ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700'}`}
                    >
                      <i className={`${opt.icon} text-3xl mb-4 transition-all duration-500 group-hover:scale-125 ${selection.vibe === opt.id ? 'text-brand-primary' : 'text-slate-300'}`}></i>
                      <h3 className={`font-black uppercase tracking-widest text-[10px] ${selection.vibe === opt.id ? 'text-brand-primary' : 'text-slate-800 dark:text-slate-200'}`}>{opt.label}</h3>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Budget */}
            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-10">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Budget & Peserta</h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold italic">Bantu kami menyesuaikan skala biaya perjalanan Anda.</p>
                </div>
                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Estimasi Budget / Orang</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Ekonomis', 'Menengah', 'Premium'].map(b => (
                        <button 
                          key={b}
                          onClick={() => handleSelect('budget', b)}
                          className={`py-4 rounded-xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${selection.budget === b ? 'border-brand-primary bg-brand-primary text-white shadow-lg' : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-500'}`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Jumlah Peserta (Pax)</label>
                    <div className="flex items-center gap-5 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 ring-offset-2 focus-within:ring-2 ring-brand-primary transition-all">
                      <i className="fa-solid fa-users text-brand-primary text-xl"></i>
                      <input 
                        type="number" 
                        value={selection.guests}
                        onChange={(e) => handleSelect('guests', e.target.value)}
                        className="w-full bg-transparent font-black text-lg focus:outline-none placeholder:text-slate-300" 
                        min="1" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Summary & Form */}
            {step === 5 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg">
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Rencana Hampir Siap!</h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold italic">Tinjau pilihan Anda dan dapatkan proposal khusus.</p>
                </div>

                <div className="bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/10 rounded-[2rem] p-6 mb-8 flex flex-wrap gap-x-6 gap-y-4">
                  {[
                    { icon: 'fa-solid fa-location-dot', label: 'Tujuan', val: selection.dest },
                    { icon: 'fa-regular fa-clock', label: 'Durasi', val: selection.duration },
                    { icon: 'fa-solid fa-bolt', label: 'Vibe', val: selection.vibe },
                    { icon: 'fa-solid fa-wallet', label: 'Budget', val: selection.budget }
                  ].map((sum, i) => (
                    <div key={i} className="flex items-center gap-2">
                       <i className={`${sum.icon} text-brand-primary text-[10px]`}></i>
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{sum.label}:</span>
                       <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase">{sum.val || '-'}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <input type="text" placeholder="Nama Lengkap Anda" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary transition-all shadow-sm" />
                  <input type="email" placeholder="Alamat Email (Proposal dikirim ke sini)" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary transition-all shadow-sm" />
                  <input type="tel" placeholder="No. WhatsApp Aktif" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-brand-primary transition-all shadow-sm" />
                </div>
              </div>
            )}

          </div>

          {/* Footer Navigation */}
          <div className="p-8 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
            <button 
              onClick={prevStep}
              className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${step > 1 ? 'text-slate-400 hover:text-brand-primary' : 'opacity-0 pointer-events-none'}`}
            >
              <i className="fa-solid fa-arrow-left"></i> Sebelumnya
            </button>

            <button 
              onClick={nextStep}
              className="px-10 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              {step === totalSteps ? 'Kirim Request' : 'Selanjutnya'} <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

        </div>
      </main>

      {/* Success Modal Overflow */}
      {submitted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 sm:p-16 max-w-sm w-full text-center shadow-2xl relative border border-white/10 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-8 shadow-xl shadow-emerald-500/30">
                <i className="fa-solid fa-check"></i>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Request Diterima!</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold italic leading-relaxed mb-10">Proposal perjalanan eksklusif Anda sedang dirancang dan akan dikirimkan ke email dalam waktu maksimal 2x24 Jam.</p>
              <Link href="/" className="block w-full py-5 bg-brand-primary text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 transition-all">
                Kembali ke Beranda
              </Link>
           </div>
        </div>
      )}
    </div>
  );
}
