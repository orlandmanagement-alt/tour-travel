'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function TripPlannerPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [userData, setUserData] = useState({
    dest: '',
    duration: '',
    vibe: '',
    budget: '',
    guests: 2
  });

  const [contact, setContact] = useState({ name: '', email: '', phone: '' });

  const selectOption = (key: keyof typeof userData, value: any) => {
    setUserData(prev => ({ ...prev, [key]: value }));
  };

  const isStepValid = () => {
    switch(currentStep) {
      case 1: return !!userData.dest;
      case 2: return !!userData.duration;
      case 3: return !!userData.vibe;
      case 4: return !!userData.budget && userData.guests > 0;
      case 5: return !!contact.name && !!contact.email;
      default: return true;
    }
  };

  const changeStep = (n: number) => {
    if (n === 1 && !isStepValid()) {
      alert('Mohon lengkapi pilihan di langkah ini!');
      return;
    }
    
    if (currentStep === 5 && n === 1) {
      submitWizard();
      return;
    }

    setCurrentStep(prev => prev + n);
  };

  const submitWizard = async () => {
    setIsLoading(true);
    
    const payload = {
      customer_name: contact.name,
      customer_email: contact.email,
      customer_phone: contact.phone,
      base_location_id: 1, // Default ID or matching base on dest mapping
      travel_date: new Date().toISOString(),
      duration_days: userData.duration === '1-3 Hari' ? 3 : userData.duration === '4-7 Hari' ? 7 : 10,
      total_pax: userData.guests,
      requested_destinations: userData.dest,
      accommodation_preference: `${userData.vibe} (${userData.budget})`
    };

    try {
      const res = await fetch('/api/custom-trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setIsSuccess(true);
      } else {
        alert('Terjadi kesalahan, coba lagi.');
      }
    } catch (e) {
      console.error(e);
      alert('Terjadi kesalahan koneksi.');
    }
    setIsLoading(false);
  };

  const percent = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 py-4 shadow-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
              <Link href="/" className="font-extrabold text-xl tracking-tighter text-brand-900 flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-brand-600 text-white flex items-center justify-center shadow"><span className="text-sm"><i className="fa-solid fa-wand-magic-sparkles"></i></span></div>
                  TripPlanner
              </Link>
              <Link href="/" className="text-slate-400 hover:text-brand-600 font-bold text-xs flex items-center gap-1 transition-colors">
                  <i className="fa-solid fa-xmark"></i> Keluar
              </Link>
          </div>
      </header>

      <div className="bg-white border-b border-slate-100 py-4">
          <div className="max-w-xl mx-auto px-6">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  <span>Langkah {currentStep} dari {totalSteps}</span>
                  <span>{percent}% Selesai</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-600 shadow-[0_0_10px_rgba(79,70,229,0.4)] transition-all duration-500 ease-in-out" style={{ width: `${percent}%` }}></div>
              </div>
          </div>
      </div>

      <main className="flex-grow flex items-start justify-center p-4 sm:p-8 animate-in fade-in duration-500">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden min-h-[500px] flex flex-col relative">
              
              <div className="p-6 sm:p-10 flex-grow relative overflow-hidden">

                  {/* STEP 1 */}
                  <div className={`transition-all duration-500 absolute inset-0 p-6 sm:p-10 ${currentStep === 1 ? 'opacity-100 translate-x-0 z-10' : currentStep > 1 ? 'opacity-0 -translate-x-full z-0' : 'opacity-0 translate-x-full z-0'}`}>
                      <div className="text-center mb-8">
                          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Ke mana tujuan Anda?</h1>
                          <p className="text-sm text-slate-500 font-medium">Pilih wilayah yang ingin Anda jelajahi kali ini.</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div 
                            onClick={() => selectOption('dest', 'Domestic')}
                            className={`p-6 rounded-2xl border-2 flex flex-col items-center text-center group cursor-pointer transition-all ${userData.dest === 'Domestic' ? 'border-brand-600 bg-brand-50' : 'border-slate-100 bg-slate-50 hover:border-brand-200'}`}
                          >
                              <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm transition-transform ${userData.dest === 'Domestic' ? 'text-brand-600 scale-110' : 'text-slate-400 group-hover:scale-110'}`}>
                                  <i className="fa-solid fa-map-location-dot"></i>
                              </div>
                              <h3 className="font-bold text-slate-800">Domestik (Indonesia)</h3>
                              <p className="text-[11px] text-slate-500 mt-2">Jelajahi keindahan Nusantara dari Sabang sampai Merauke.</p>
                          </div>
                          <div 
                            onClick={() => selectOption('dest', 'International')}
                            className={`p-6 rounded-2xl border-2 flex flex-col items-center text-center group cursor-pointer transition-all ${userData.dest === 'International' ? 'border-brand-600 bg-brand-50' : 'border-slate-100 bg-slate-50 hover:border-brand-200'}`}
                          >
                              <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm transition-transform ${userData.dest === 'International' ? 'text-brand-600 scale-110' : 'text-slate-400 group-hover:scale-110'}`}>
                                  <i className="fa-solid fa-earth-americas"></i>
                              </div>
                              <h3 className="font-bold text-slate-800">Internasional</h3>
                              <p className="text-[11px] text-slate-500 mt-2">Keliling dunia, dari Asia Timur hingga benua Eropa.</p>
                          </div>
                      </div>
                  </div>

                  {/* STEP 2 */}
                  <div className={`transition-all duration-500 absolute inset-0 p-6 sm:p-10 ${currentStep === 2 ? 'opacity-100 translate-x-0 z-10' : currentStep > 2 ? 'opacity-0 -translate-x-full z-0 pointer-events-none' : 'opacity-0 translate-x-full z-0 pointer-events-none'}`}>
                      <div className="text-center mb-8">
                          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Berapa lama Anda berlibur?</h1>
                          <p className="text-sm text-slate-500 font-medium">Tentukan durasi perjalanan impian Anda.</p>
                      </div>
                      <div className="space-y-3">
                          {[
                            { value: '1-3 Hari', icon: 'fa-clock', title: 'Trip Pendek (1-3 Hari)', desc: 'Cocok untuk weekend getaway atau transit.' },
                            { value: '4-7 Hari', icon: 'fa-calendar-day', title: 'Liburan Standar (4-7 Hari)', desc: 'Ideal untuk eksplorasi kota secara mendalam.' },
                            { value: '> 7 Hari', icon: 'fa-calendar-days', title: 'Perjalanan Panjang (> 7 Hari)', desc: 'Eksplorasi lintas wilayah atau benua.' }
                          ].map((opt) => (
                            <div 
                                key={opt.value}
                                onClick={() => selectOption('duration', opt.value)}
                                className={`p-4 rounded-xl border-2 flex items-center gap-4 cursor-pointer transition-all ${userData.duration === opt.value ? 'border-brand-600 bg-brand-50' : 'border-slate-100 bg-slate-50 hover:border-brand-200'}`}
                            >
                                <div className={`w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm ${userData.duration === opt.value ? 'text-brand-600 scale-110' : 'text-slate-400'}`}>
                                  <i className={`fa-solid ${opt.icon}`}></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-sm">{opt.title}</h3>
                                    <p className="text-[10px] text-slate-500">{opt.desc}</p>
                                </div>
                            </div>
                          ))}
                      </div>
                  </div>

                  {/* STEP 3 */}
                  <div className={`transition-all duration-500 absolute inset-0 p-6 sm:p-10 ${currentStep === 3 ? 'opacity-100 translate-x-0 z-10' : currentStep > 3 ? 'opacity-0 -translate-x-full z-0 pointer-events-none' : 'opacity-0 translate-x-full z-0 pointer-events-none'}`}>
                      <div className="text-center mb-8">
                          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Pilih Vibe Liburanmu</h1>
                          <p className="text-sm text-slate-500 font-medium">Apa fokus utama dari perjalanan ini?</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          {[
                            { val: 'Nature', i: 'fa-mountain-sun', key: 'Alam & Outdoor' },
                            { val: 'Relax', i: 'fa-umbrella-beach', key: 'Santai & Pantai' },
                            { val: 'Culture', i: 'fa-temple', key: 'Budaya & Sejarah' },
                            { val: 'City', i: 'fa-city', key: 'Perkotaan (MICE)' }
                          ].map(v => (
                            <div 
                              key={v.val} 
                              onClick={() => selectOption('vibe', v.val)}
                              className={`p-4 rounded-xl border-2 flex flex-col items-center text-center cursor-pointer transition-all ${userData.vibe === v.val ? 'border-brand-600 bg-brand-50' : 'border-slate-100 bg-slate-50 hover:border-brand-200'}`}
                            >
                                <i className={`fa-solid ${v.i} text-2xl mb-2 ${userData.vibe === v.val ? 'text-brand-600 scale-110' : 'text-slate-400'}`}></i>
                                <h3 className="font-bold text-slate-800 text-xs">{v.key}</h3>
                            </div>
                          ))}
                      </div>
                  </div>

                  {/* STEP 4 */}
                  <div className={`transition-all duration-500 absolute inset-0 p-6 sm:p-10 ${currentStep === 4 ? 'opacity-100 translate-x-0 z-10' : currentStep > 4 ? 'opacity-0 -translate-x-full z-0 pointer-events-none' : 'opacity-0 translate-x-full z-0 pointer-events-none'}`}>
                      <div className="text-center mb-8">
                          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Budget & Kapasitas</h1>
                          <p className="text-sm text-slate-500 font-medium">Bantu kami menyesuaikan skala biaya.</p>
                      </div>
                      <div className="space-y-6">
                          <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Estimasi Budget per Orang</label>
                              <div className="grid grid-cols-3 gap-3">
                                  {['Ekonomis', 'Menengah', 'Premium'].map(b => (
                                    <button 
                                      key={b} 
                                      onClick={() => selectOption('budget', b)}
                                      className={`py-3 rounded-lg border-2 font-bold text-xs transition-colors ${userData.budget === b ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                                    >
                                      {b === 'Ekonomis' ? 'Rp' : b === 'Menengah' ? 'Rp Rp' : 'Rp Rp Rp'} <br/> {b}
                                    </button>
                                  ))}
                              </div>
                          </div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Jumlah Peserta</label>
                              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 focus-within:border-brand-500 transition-colors">
                                  <i className="fa-solid fa-users text-brand-600"></i>
                                  <input 
                                    type="number" 
                                    value={userData.guests} 
                                    onChange={(e) => selectOption('guests', parseInt(e.target.value) || 1)}
                                    className="w-full bg-transparent font-bold focus:outline-none text-lg text-slate-800" 
                                    min="1" 
                                  />
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* STEP 5 */}
                  <div className={`transition-all duration-500 absolute inset-0 p-6 sm:p-10 ${currentStep === 5 ? 'opacity-100 translate-x-0 z-10 overflow-y-auto custom-scrollbar' : 'opacity-0 translate-x-full z-0 pointer-events-none'}`}>
                      <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-3 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                              <i className="fa-solid fa-check-double"></i>
                          </div>
                          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Rencana Hampir Siap!</h1>
                          <p className="text-sm text-slate-500 font-medium">Tinjau pilihan Anda dan tinggalkan kontak untuk penawaran kustom.</p>
                      </div>

                      <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 mb-6 grid grid-cols-2 gap-y-3 gap-x-4">
                          <div className="flex flex-col text-xs">
                              <span className="text-slate-500"><i className="fa-solid fa-location-dot text-brand-600 mr-1"></i> Destinasi:</span>
                              <strong className="text-brand-900 text-sm mt-0.5">{userData.dest}</strong>
                          </div>
                          <div className="flex flex-col text-xs">
                              <span className="text-slate-500"><i className="fa-regular fa-clock text-brand-600 mr-1"></i> Durasi:</span>
                              <strong className="text-brand-900 text-sm mt-0.5">{userData.duration}</strong>
                          </div>
                          <div className="flex flex-col text-xs">
                              <span className="text-slate-500"><i className="fa-solid fa-bolt text-brand-600 mr-1"></i> Vibe/Tipe:</span>
                              <strong className="text-brand-900 text-sm mt-0.5">{userData.vibe}</strong>
                          </div>
                          <div className="flex flex-col text-xs">
                              <span className="text-slate-500"><i className="fa-solid fa-wallet text-brand-600 mr-1"></i> Budget:</span>
                              <strong className="text-brand-900 text-sm mt-0.5">{userData.budget} ({userData.guests} Pax)</strong>
                          </div>
                      </div>

                      <div className="space-y-4">
                          <input 
                            type="text" 
                            placeholder="Nama Lengkap Anda" 
                            value={contact.name} onChange={e => setContact(p => ({...p, name: e.target.value}))}
                            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 font-medium transition-all" 
                          />
                          <input 
                            type="email" 
                            placeholder="Alamat Email (Untuk proposal)" 
                            value={contact.email} onChange={e => setContact(p => ({...p, email: e.target.value}))}
                            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 font-medium transition-all" 
                          />
                          <input 
                            type="tel" 
                            placeholder="No. WhatsApp Aktif" 
                            value={contact.phone} onChange={e => setContact(p => ({...p, phone: e.target.value}))}
                            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 font-medium transition-all" 
                          />
                      </div>
                  </div>

              </div>

              {/* Navigation Footer */}
              <div className="mt-auto p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center relative z-20">
                  <button 
                    className={`px-4 sm:px-6 py-2.5 text-slate-500 hover:text-brand-600 font-bold text-sm transition-opacity ${currentStep > 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                    onClick={() => changeStep(-1)}
                  >
                      <i className="fa-solid fa-arrow-left mr-1"></i> Sebelumnya
                  </button>

                  <button 
                    className="px-6 sm:px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center gap-2" 
                    onClick={() => changeStep(1)}
                    disabled={isLoading}
                  >
                      {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <span>{currentStep === 5 ? 'Dapatkan Penawaran' : 'Lanjut'}</span>}
                      {!isLoading && <i className={`fa-solid ${currentStep === 5 ? 'fa-paper-plane' : 'fa-arrow-right'}`}></i>}
                  </button>
              </div>
          </div>
      </main>

      {/* Success Overlay */}
      {isSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] p-8 sm:p-12 max-w-md w-full text-center shadow-2xl animate-in zoom-in-95 duration-500 delay-100">
                <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-emerald-200">
                    <i className="fa-solid fa-check"></i>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Permintaan Diterima!</h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-8">Konsultan perjalanan kami akan merancang penawaran terbaik dan mengirimkannya ke email Anda dalam waktu maksimal 2x24 Jam.</p>
                <Link href="/" className="block w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-lg transition-all">
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
      )}
    </div>
  );
}
