'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutStepper from '@/components/CheckoutStepper';

export default function CheckoutPage() {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  
  // Form States
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [paxDetails, setPaxDetails] = useState<any[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<Record<number, boolean>>({});
  const [paymentMethod, setPaymentMethod] = useState('va_bca');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('checkoutPayload');
    if (saved) {
      const data = JSON.parse(saved);
      setCheckoutData(data);
      // Initialize pax details based on total_pax
      const initialPax = Array.from({ length: data.total_pax }, (_, i) => ({
        id: i + 1,
        title: 'Mr',
        name: i === 0 ? '' : '' // Leave empty for user to fill
      }));
      setPaxDetails(initialPax);
    } else {
      router.push('/tours');
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handlePaxChange = (index: number, field: string, value: string) => {
    const newPax = [...paxDetails];
    newPax[index] = { ...newPax[index], [field]: value };
    setPaxDetails(newPax);
  };

  const toggleAddon = (id: number) => {
    setSelectedAddons(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const calculateGrandTotal = () => {
    if (!checkoutData) return 0;
    let total = checkoutData.grand_total;
    // Add logic for dynamic addons if needed, but for now we use what's in checkoutData
    return total;
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  const confirmBooking = async () => {
    setIsSubmitting(true);
    // Simulation of booking process
    setTimeout(() => {
      const mockResult = {
        booking_reference: `NSTR-${Math.floor(Math.random() * 90000) + 10000}`,
        grand_total: calculateGrandTotal(),
        status: 'pending',
        tour_name: checkoutData.tour_name
      };
      sessionStorage.setItem('bookingResult', JSON.stringify(mockResult));
      sessionStorage.removeItem('checkoutPayload');
      router.push('/checkout/success');
      setIsSubmitting(false);
    }, 1500);
  };

  if (!checkoutData) return null;

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-20 font-sans">
      
      {/* Specialized Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <button onClick={() => router.back()} className="text-slate-500 hover:text-brand-primary font-bold text-xs flex items-center gap-2 transition-colors uppercase tracking-widest">
            <i className="fa-solid fa-arrow-left"></i> Kembali
          </button>
          
          <div className="font-black text-xl tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <i className="fa-solid fa-paper-plane text-xs"></i>
            </div>
            NusantaraTrip
          </div>

          <CheckoutStepper currentStep={1} />
        </div>
      </header>

      {/* Urgency Timer */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800/50 py-2.5">
        <div className="max-w-5xl mx-auto px-4 text-center flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-widest">
          <i className="fa-regular fa-clock text-amber-600 animate-pulse"></i>
          Selesaikan pemesanan Anda dalam <strong className="text-red-500 font-mono text-sm ml-1">{formatTime(timeLeft)}</strong>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Forms */}
        <div className="flex-1 space-y-6">
          
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Selesaikan Pemesanan</h1>

          {/* 1. Customer Details */}
          <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-sm p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-primary"></div>
            <h2 className="text-base font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-3">
              <i className="fa-solid fa-address-card text-brand-primary"></i> Detail Pemesan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Nama Lengkap (Sesuai Identitas)</label>
                <input 
                  type="text" name="name" value={customerInfo.name} onChange={handleCustomerChange}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-bold text-slate-800 dark:text-white" 
                  placeholder="Contoh: Budi Santoso"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Alamat Email</label>
                <input 
                  type="email" name="email" value={customerInfo.email} onChange={handleCustomerChange}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:bg-white outline-none transition-all font-bold text-slate-800 dark:text-white" 
                  placeholder="email@contoh.com"
                />
                <p className="text-[9px] text-slate-400 mt-2 font-medium italic">E-voucher akan dikirim ke email ini.</p>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">WhatsApp Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-black">+62</span>
                  <input 
                    type="tel" name="phone" value={customerInfo.phone} onChange={handleCustomerChange}
                    className="flex-1 w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm rounded-r-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:bg-white outline-none transition-all font-bold text-slate-800 dark:text-white" 
                    placeholder="8123456789"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 2. Participant Details */}
          <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-sm p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-accent"></div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                <i className="fa-solid fa-users text-brand-accent"></i> Detail Peserta
              </h2>
              <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-black px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-600 uppercase tracking-widest whitespace-nowrap">
                {checkoutData.total_pax} Orang
              </span>
            </div>

            <div className="space-y-8">
              {paxDetails.map((pax, index) => (
                <div key={pax.id} className={`${index !== paxDetails.length - 1 ? 'pb-8 border-b border-slate-100 dark:border-slate-700/50' : ''}`}>
                  <h3 className="text-xs font-black text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center text-[10px]">{pax.id}</span>
                    PESERTA {pax.id} (DEWASA)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-[9px] font-black text-slate-400 mb-1.5 uppercase tracking-wider">Titel</label>
                      <select 
                        value={pax.title} onChange={(e) => handlePaxChange(index, 'title', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-primary outline-none transition-all font-bold text-slate-800 dark:text-white appearance-none"
                      >
                        <option>Mr</option>
                        <option>Mrs</option>
                        <option>Ms</option>
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-[9px] font-black text-slate-400 mb-1.5 uppercase tracking-wider">Nama Lengkap (Sesuai E-KTP/Paspor)</label>
                      <input 
                        type="text" value={pax.name} onChange={(e) => handlePaxChange(index, 'name', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-primary outline-none transition-all font-bold text-slate-800 dark:text-white" 
                        placeholder={`Nama Peserta ${pax.id}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Payment Methods */}
          <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-sm p-6 sm:p-8">
            <h2 className="text-base font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-3">
              <i className="fa-solid fa-wallet text-slate-400"></i> Metode Pembayaran
            </h2>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'va_bca', name: 'BCA Virtual Account', desc: 'Otomatis terkonfirmasi. Bebas biaya admin.', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg' },
                { id: 'va_mandiri', name: 'Mandiri Virtual Account', desc: 'Otomatis terkonfirmasi. Bebas biaya admin.', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg' },
                { id: 'cc', name: 'Kartu Kredit / Debit', desc: 'Visa, Mastercard, JCB. Biaya layanan 2.5%.', icon: 'fa-solid fa-credit-card' },
              ].map((method) => (
                <label 
                  key={method.id} 
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer group ${paymentMethod === method.id ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-100 dark:border-slate-700 hover:border-brand-primary/30'}`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === method.id ? 'border-brand-primary bg-brand-primary' : 'border-slate-300 dark:border-slate-600'}`}>
                    {paymentMethod === method.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <div className="w-12 h-8 bg-white dark:bg-white rounded border border-slate-100 flex items-center justify-center p-1.5 shadow-sm overflow-hidden flex-shrink-0">
                    {method.icon.startsWith('http') ? (
                      <img src={method.icon} alt={method.name} className="h-full object-contain" />
                    ) : (
                      <i className={`${method.icon} text-slate-900 text-lg`}></i>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-slate-800 dark:text-white text-sm transition-colors group-hover:text-brand-primary">{method.name}</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{method.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Order Summary */}
        <aside className="w-full lg:w-[350px] shrink-0">
          <div className="sticky top-24 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2rem] shadow-xl p-6 sm:p-7 overflow-hidden">
            <h2 className="font-black text-slate-900 dark:text-white text-base mb-6 border-b border-slate-50 dark:border-slate-700 pb-4 uppercase tracking-[0.1em]">Ringkasan Pesanan</h2>
            
            <div className="flex gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-100 dark:border-slate-700 shadow-sm">
                <img src="https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=400" className="w-full h-full object-cover" alt="Tour" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-[9px] font-black text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-lg w-max mb-1 uppercase tracking-widest border border-brand-accent/20">PRIVATE TRIP</span>
                <h3 className="font-black text-slate-800 dark:text-white text-[11px] leading-tight line-clamp-2 uppercase tracking-tight">{checkoutData.tour_name}</h3>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 mb-6 space-y-3 border border-slate-100 dark:border-slate-700/50">
              <div className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-400">
                <i className="fa-regular fa-calendar w-4 text-center text-brand-primary"></i>
                <span className="truncate">{checkoutData.travel_date}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-400">
                <i className="fa-solid fa-users w-4 text-center text-brand-primary"></i>
                <span>{checkoutData.total_pax} Dewasa</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-400">
                <i className="fa-solid fa-location-dot w-4 text-center text-brand-primary"></i>
                <span className="truncate">Pickup: {checkoutData.location_name || 'Meeting Point'}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
               <div className="flex justify-between items-center text-xs font-bold">
                 <span className="text-slate-500 uppercase tracking-widest">Harga Paket</span>
                 <span className="text-slate-900 dark:text-white">{formatPrice(checkoutData.breakdown.basePrice)}</span>
               </div>
               {checkoutData.breakdown.addonsTotal > 0 && (
                 <div className="flex justify-between items-center text-xs font-bold">
                   <span className="text-slate-500 uppercase tracking-widest">Fasilitas Ekstra</span>
                   <span className="text-brand-primary">{formatPrice(checkoutData.breakdown.addonsTotal)}</span>
                 </div>
               )}
               <div className="flex justify-between items-center text-xs font-bold">
                 <span className="text-slate-500 uppercase tracking-widest">Pajak & Layanan</span>
                 <span className="text-emerald-500 uppercase tracking-widest">Gratis</span>
               </div>
               <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-end">
                 <div>
                   <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Pembayaran</span>
                   <span className="text-2xl font-black text-brand-primary leading-none">{formatPrice(calculateGrandTotal())}</span>
                 </div>
               </div>
            </div>

            <button 
              disabled={isSubmitting}
              onClick={confirmBooking}
              className="w-full py-4 bg-brand-primary hover:bg-indigo-700 text-white font-black text-sm rounded-2xl shadow-xl shadow-brand-primary/20 transition-all transform active:scale-95 flex justify-center items-center gap-2 uppercase tracking-widest"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <> <i className="fa-solid fa-lock text-xs opacity-50"></i> Bayar Sekarang </>
              )}
            </button>
            <p className="text-center text-[9px] text-slate-400 mt-4 font-bold uppercase tracking-widest leading-loose">
              <i className="fa-solid fa-shield-halved text-emerald-500 mr-1.5"></i> Pembayaran Aman & Terenkripsi
            </p>
          </div>
        </aside>

      </main>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] p-5 z-50 flex justify-between items-center">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Harga</p>
          <p className="text-xl font-black text-brand-primary leading-none">{formatPrice(calculateGrandTotal())}</p>
        </div>
        <button 
          disabled={isSubmitting}
          onClick={confirmBooking}
          className="py-3 px-8 bg-brand-primary active:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-lg shadow-brand-primary/20 flex justify-center items-center gap-2 uppercase tracking-widest"
        >
          {isSubmitting ? '...' : 'Bayar'} <i className="fa-solid fa-arrow-right text-[10px]"></i>
        </button>
      </div>

    </div>
  );
}
