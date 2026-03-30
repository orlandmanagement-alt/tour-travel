'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pwdStrength, setPwdStrength] = useState(0);

  const calculateStrength = (pwd: string) => {
    let s = 0;
    if (pwd.length > 5) s += 1;
    if (pwd.length > 8) s += 1;
    if (/[A-Z]/.test(pwd)) s += 1;
    if (/[0-9]/.test(pwd)) s += 1;
    setPwdStrength(s);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API registration delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  // Mock Success State
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-2xl max-w-lg w-full text-center flex flex-col items-center animate-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
             <svg className="w-12 h-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
           </div>
           <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-4">Registration Complete</h2>
           <p className="text-slate-500 mb-8 leading-relaxed">
             We've sent a secure activation link to <b>{formData.email}</b>. Please check your inbox to complete your account setup.
           </p>
           <Link href="/" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:-translate-y-1 transition-transform shadow-lg shadow-slate-900/20">
             Return to Homepage
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Box: Testimonial & Branding (Hidden on small mobile) */}
      <div className="w-full md:w-5/12 lg:w-1/2 bg-slate-900 flex flex-col justify-between relative overflow-hidden hidden md:flex">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=1200&q=80" alt="Landscape" className="w-full h-full object-cover opacity-60" />
        </div>
        
        <div className="relative z-20 p-12 lg:p-16 flex-1 flex flex-col">
          <Link href="/" className="text-white font-extrabold text-2xl tracking-tighter flex items-center gap-2 mb-auto">
            <span className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center">N</span>
            NusantaraTrip
          </Link>
          
          <div className="mt-auto">
             <div className="flex gap-1 mb-4">
               {[1,2,3,4,5].map(i => <svg key={i} className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
             </div>
             <p className="text-2xl lg:text-3xl font-medium text-white leading-tight mb-6 relative">
               "The enterprise booking system made managing our corporate retreat completely frictionless. Unmatched quality."
             </p>
             <div className="flex items-center gap-4">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src="https://ui-avatars.com/api/?name=Sarah+Chen&background=4f46e5&color=fff" className="w-12 h-12 rounded-full border-2 border-slate-700" alt="Avatar"/>
               <div>
                 <p className="text-white font-bold">Sarah Chen</p>
                 <p className="text-slate-400 text-sm">VP of Operations, TechFlow Inc.</p>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Right Box: CRO Form */}
      <div className="w-full md:w-7/12 lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-slate-50 md:bg-white flex-1">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Create an Account</h1>
            <p className="text-slate-500 font-medium">Join thousands of travelers experiencing Indonesia without the hassle.</p>
          </div>

          <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-bold py-3.5 px-4 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm mb-8">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
            Sign up with Google
          </button>

          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-semibold uppercase tracking-widest">Or register with email</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all" placeholder="John Doe" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all" placeholder="name@company.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">WhatsApp Number</label>
                <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all" placeholder="+62 812..." />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Secure Password</label>
              <input 
                type="password" 
                value={formData.password} 
                onChange={e => { setFormData({...formData, password: e.target.value}); calculateStrength(e.target.value); }} 
                required 
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all" 
                placeholder="••••••••" 
              />
              
              {/* Password Strength Meter */}
              {formData.password && (
                 <div className="mt-3 flex gap-1">
                   {[1,2,3,4].map(level => (
                     <div key={level} className={`h-1.5 w-full rounded-full transition-colors duration-500 ${pwdStrength >= level ? (pwdStrength > 2 ? 'bg-emerald-500' : 'bg-amber-400') : 'bg-slate-200'}`}></div>
                   ))}
                 </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex justify-center items-center h-14 bg-brand-primary text-white font-bold rounded-xl mt-8 hover:bg-brand-primary-dark transition-all disabled:opacity-70 disabled:cursor-wait shadow-lg shadow-brand-primary/30"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : 'Complete Registration'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-8 font-medium">
            Already have an account? <Link href="/login" className="text-brand-primary font-bold hover:underline">Sign in instead</Link>
          </p>

        </div>
      </div>
    </div>
  );
}
