'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [view, setView] = useState('login'); // login, register, forgot
  const [isLoading, setIsLoading] = useState(false);
  
  // State for login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8787/api/auth/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      
      login(data.token, data.user);
    } catch (err: any) {
      alert(err.message);
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8787/api/auth/register', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ name, email, password, role: 'user' })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Register failed');
      
      login(data.token, data.user);
    } catch (err: any) {
      alert(err.message);
      setIsLoading(false);
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        alert("Tautan reset terkirim!");
        setView('login');
    }, 1500);
  };

  return (
    <div className="bg-white text-slate-800 antialiased h-screen flex overflow-hidden font-sans">
        
        {/* LEFT PANEL */}
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-brand-900 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200" alt="Bali" className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/60 to-transparent"></div>
            </div>
            <div className="relative z-10 p-12 max-w-lg text-white">
                <Link href="/" className="font-extrabold text-2xl tracking-tighter flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity w-max">
                    <div className="w-10 h-10 rounded-xl bg-white text-brand-600 flex items-center justify-center shadow-lg"><span className="text-lg"><i className="fa-solid fa-paper-plane"></i></span></div>
                    NusaTrip
                </Link>
                <h1 className="text-4xl font-extrabold mb-6 leading-tight drop-shadow-lg">Gerbang Menuju <br/><span className="text-accent-400">Pengalaman Luar Biasa.</span></h1>
                <p className="text-brand-100 font-medium mb-10 text-sm leading-relaxed">Bergabunglah dengan lebih dari 500.000+ pelancong dan perusahaan yang mempercayakan perjalanan mereka kepada kami.</p>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl">
                    <div className="flex text-yellow-400 text-xs mb-2"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                    <p className="text-sm font-medium text-white mb-3 italic">"Sistem bookingnya sangat cepat, harga transparan, dan CS responsif 24 jam!"</p>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center font-bold text-[10px]">AW</div>
                        <div><p className="text-xs font-bold">Ardi Wijaya</p><p className="text-[10px] text-brand-200">HR Manager</p></div>
                    </div>
                </div>
            </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto relative bg-white">
            <Link href="/" className="absolute top-6 left-6 lg:hidden font-extrabold text-xl tracking-tighter text-brand-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center shadow"><span className="text-xs"><i className="fa-solid fa-paper-plane"></i></span></div>
                NusaTrip
            </Link>

            <div className="max-w-md w-full relative">
                
                {view === 'login' && (
                  <div className="w-full animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="text-center mb-8">
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Selamat Datang 👋</h2>
                          <p className="text-sm text-slate-500 font-medium">Masuk ke akun Anda untuk melanjutkan.</p>
                      </div>
                      <form onSubmit={handleLogin} className="space-y-5">
                          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Email</label>
                              <div className="flex items-center gap-2"><i className="fa-solid fa-envelope text-slate-400"></i><input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-transparent text-sm text-slate-800 font-semibold focus:outline-none" /></div>
                          </div>
                          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Password</label>
                              <div className="flex items-center gap-2"><i className="fa-solid fa-lock text-slate-400"></i><input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-transparent text-sm text-slate-800 font-semibold focus:outline-none" /></div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600"><input type="checkbox" className="rounded border-slate-300 text-brand-600" /> Ingat Saya</label>
                              <button type="button" onClick={() => setView('forgot')} className="text-xs font-bold text-brand-600">Lupa Password?</button>
                          </div>
                          <button disabled={isLoading} className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-xl shadow-lg flex justify-center items-center gap-2">
                              {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Masuk Sekarang'}
                          </button>
                      </form>
                      <div className="mt-8 flex items-center gap-3">
                          <div className="h-px bg-slate-200 flex-1"></div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Atau</span>
                          <div className="h-px bg-slate-200 flex-1"></div>
                      </div>
                      <button className="w-full mt-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-sm flex justify-center items-center gap-2">
                          Google
                      </button>
                      <p className="text-center text-sm text-slate-500 font-medium mt-8">Belum punya akun? <button onClick={() => setView('register')} className="text-brand-600 font-bold hover:underline">Daftar</button></p>
                  </div>
                )}

                {view === 'register' && (
                  <div className="w-full animate-in fade-in slide-in-from-left-4 duration-300">
                      <div className="text-center mb-8">
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Mulai Petualangan 🌍</h2>
                          <p className="text-sm text-slate-500 font-medium">Buat akun untuk harga khusus.</p>
                      </div>
                      <form onSubmit={handleRegister} className="space-y-4">
                          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Nama Lengkap</label>
                              <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-transparent text-sm text-slate-800 font-semibold focus:outline-none" />
                          </div>
                          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Email</label>
                              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-transparent text-sm text-slate-800 font-semibold focus:outline-none" />
                          </div>
                          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Buat Password</label>
                              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-transparent text-sm text-slate-800 font-semibold focus:outline-none" />
                          </div>
                          <button disabled={isLoading} className="w-full mt-4 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-xl shadow-lg flex justify-center items-center gap-2">
                              {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Daftar Sekarang'}
                          </button>
                      </form>
                      <p className="text-center text-sm text-slate-500 font-medium mt-6">Sudah punya akun? <button onClick={() => setView('login')} className="text-brand-600 font-bold hover:underline">Masuk</button></p>
                  </div>
                )}

                {view === 'forgot' && (
                  <div className="w-full animate-in fade-in zoom-in-95 duration-300">
                      <button onClick={() => setView('login')} className="text-slate-400 hover:text-brand-600 font-bold text-xs flex items-center gap-1 mb-6"><i className="fa-solid fa-arrow-left"></i> Kembali</button>
                      <div className="mb-8">
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Lupa Password? 🔒</h2>
                          <p className="text-sm text-slate-500 font-medium">Masukkan email Anda untuk instruksi reset.</p>
                      </div>
                      <form onSubmit={handleForgot} className="space-y-4">
                          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Email Terdaftar</label>
                              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-transparent text-sm text-slate-800 font-semibold focus:outline-none" />
                          </div>
                          <button disabled={isLoading} className="w-full mt-4 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-xl shadow-lg flex justify-center items-center gap-2">
                              {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Kirim Link Reset'}
                          </button>
                      </form>
                  </div>
                )}

            </div>
        </div>
    </div>
  );
}
