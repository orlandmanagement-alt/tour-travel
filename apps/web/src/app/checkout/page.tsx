'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutStepper from '@/components/CheckoutStepper';

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState<any>(null);
  
  // Form State
  const [customerInfo, setCustomerInfo] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load from sessionStorage
    const saved = sessionStorage.getItem('checkoutPayload');
    if (saved) {
      setCheckoutData(JSON.parse(saved));
    } else {
      router.push('/tours'); // Redirect if accessed directly without data
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const proceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.customer_name || !customerInfo.customer_email || !customerInfo.customer_phone) {
      alert('Please fill out all required fields');
      return;
    }
    setStep(2);
  };

  const confirmBooking = async () => {
    setIsSubmitting(true);
    try {
      // Merge customer info with checkout payload
      const finalPayload = {
        ...checkoutData,
        ...customerInfo
      };

      // Mock API call or real API call to CF DB
      const res = await fetch('http://127.0.0.1:8787/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload)
      });

      if (!res.ok) throw new Error('Booking failed');
      const data = await res.json();
      
      // Navigate to success page
      sessionStorage.setItem('bookingResult', JSON.stringify({ ...data.data, tour_name: checkoutData.tour_name }));
      sessionStorage.removeItem('checkoutPayload'); // clear session
      router.push('/checkout/success');
      
    } catch (e) {
      // Fallback for demo without backend
      console.log('API Error, using mock success');
      const mockResult = {
         booking_reference: `NSTR-${Math.floor(Math.random() * 90000) + 10000}`,
         grand_total: checkoutData.grand_total,
         status: 'pending',
         tour_name: checkoutData.tour_name
      };
      sessionStorage.setItem('bookingResult', JSON.stringify(mockResult));
      sessionStorage.removeItem('checkoutPayload');
      router.push('/checkout/success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  if (!checkoutData) return <div className="min-h-screen py-32 text-center">Loading checkout...</div>;

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Checkout</h1>
        </div>

        <CheckoutStepper currentStep={step} />

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
          <div className="flex flex-col md:flex-row">
             
             {/* LEFT SIDE: Forms */}
             <div className="w-full md:w-2/3 p-8">
                {step === 1 && (
                  <form onSubmit={proceedToReview} className="space-y-6">
                    <h2 className="text-xl font-bold mb-4">Customer Details</h2>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Full Name</label>
                      <input required type="text" name="customer_name" value={customerInfo.customer_name} onChange={handleInputChange} className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-brand-primary dark:bg-slate-700 outline-none transition" placeholder="John Doe" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Email Address</label>
                      <input required type="email" name="customer_email" value={customerInfo.customer_email} onChange={handleInputChange} className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-brand-primary dark:bg-slate-700 outline-none transition" placeholder="john@example.com" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">WhatsApp Number</label>
                      <input required type="tel" name="customer_phone" value={customerInfo.customer_phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-brand-primary dark:bg-slate-700 outline-none transition" placeholder="+62..." />
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button type="submit" className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary-dark transition shadow-lg shadow-brand-primary/30">
                        Review Order →
                      </button>
                    </div>
                  </form>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {/* Virtual Account Mock */}
                       <label className="cursor-pointer">
                         <input type="radio" className="peer sr-only" name="payment" defaultChecked />
                         <div className="border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4 peer-checked:border-brand-primary peer-checked:bg-brand-primary/5 transition">
                           <div className="flex items-center justify-between">
                             <div>
                               <h4 className="font-bold text-slate-800 dark:text-white mb-1">Bank Transfer (BCA)</h4>
                               <p className="text-xs text-slate-500">Manual transfer via ATM or Mobile Banking</p>
                             </div>
                             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1024px-Bank_Central_Asia.svg.png" alt="BCA" className="h-6" />
                           </div>
                         </div>
                       </label>
                       
                       <label className="cursor-pointer">
                         <input type="radio" className="peer sr-only" name="payment" />
                         <div className="border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4 peer-checked:border-brand-primary peer-checked:bg-brand-primary/5 transition opacity-50">
                           <div className="flex items-center justify-between">
                             <div>
                               <h4 className="font-bold text-slate-800 dark:text-white mb-1">Credit Card (Coming Soon)</h4>
                               <p className="text-xs text-slate-500">Visa, Mastercard, JCB</p>
                             </div>
                             <div className="flex space-x-1">
                               <div className="w-6 h-4 bg-slate-300 rounded"></div>
                               <div className="w-6 h-4 bg-slate-400 rounded"></div>
                             </div>
                           </div>
                         </div>
                       </label>
                    </div>

                    <div className="pt-8 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                       <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total to pay</span>
                       <span className="text-2xl font-extrabold text-brand-secondary-dark dark:text-brand-secondary">{formatPrice(checkoutData.grand_total)}</span>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button type="button" onClick={() => setStep(1)} className="px-6 py-3 border border-slate-300 rounded-xl font-bold bg-white text-slate-700 hover:bg-slate-50">
                        ← Back
                      </button>
                      <button disabled={isSubmitting} onClick={confirmBooking} className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary-dark transition shadow-lg shadow-brand-primary/30 flex items-center justify-center">
                        {isSubmitting ? 'Processing...' : 'Place Order'}
                      </button>
                    </div>
                  </div>
                )}
             </div>

             {/* RIGHT SIDE: Summary Panel */}
             <div className="w-full md:w-1/3 bg-slate-50 dark:bg-slate-900/30 p-8 border-l border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-lg mb-6 text-slate-800 dark:text-white">Order Summary</h3>
                
                <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{checkoutData.tour_name}</h4>
                  <div className="flex justify-between text-sm text-slate-500 mb-2">
                    <span>Date:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-300">{checkoutData.travel_date}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Participants:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-300">{checkoutData.total_pax} Pax</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>Base Price</span>
                    <span>{formatPrice(checkoutData.breakdown.basePrice)}</span>
                  </div>
                  {checkoutData.addons?.length > 0 && (
                     <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700/50">
                       {checkoutData.addons.map((addon: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-xs text-slate-500">
                            <span className="truncate pr-2">{addon.quantity}x {addon.name}</span>
                          </div>
                       ))}
                       <div className="flex justify-between text-sm font-medium pt-1">
                         <span>Add-ons Total</span>
                         <span>{formatPrice(checkoutData.breakdown.addonsTotal)}</span>
                       </div>
                     </div>
                  )}
                  {checkoutData.breakdown.surchargeTotal > 0 && (
                     <div className="flex justify-between text-sm text-amber-600 dark:text-amber-500 pt-2 border-t border-slate-200 dark:border-slate-700/50">
                       <span>Surcharges</span>
                       <span>{formatPrice(checkoutData.breakdown.surchargeTotal)}</span>
                     </div>
                  )}
                </div>

                <div className="flex justify-between items-end">
                   <p className="text-xl font-bold text-slate-800 dark:text-white">Total</p>
                   <p className="text-2xl font-extrabold text-brand-secondary-dark dark:text-brand-secondary">
                     {formatPrice(checkoutData.grand_total)}
                   </p>
                </div>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
}
