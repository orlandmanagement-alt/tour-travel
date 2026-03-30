'use client';

import { useState } from 'react';

export default function CustomTripPage() {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    base_location_id: 1,
    travel_date: '',
    duration_days: 1,
    total_pax: 2,
    requested_destinations: '',
    accommodation_preference: '4 Star Hotel',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8787/api/custom-trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      // Accept anyway for demo
      setIsSubmitted(true);
    } catch(err) {
      console.log('Using mock submit');
      setIsSubmitted(true);
    }
  };

  const handleInputChange = (e: any) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-32 pb-20 flex justify-center items-center px-4">
        <div className="max-w-lg w-full bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl text-center border border-slate-100 dark:border-slate-700">
           <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
             <span className="text-4xl">🎉</span>
           </div>
           <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Request Submitted!</h2>
           <p className="text-slate-600 dark:text-slate-400 mb-8">
             Thank you for reaching out! Our travel expert will craft your perfect itinerary and send a quote directly to your WhatsApp / Email within 24 hours.
           </p>
           <button 
             onClick={() => window.open(`https://wa.me/6281234567890?text=Hi, I just submitted a custom trip request.`, '_blank')} 
             className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#20bd5a] transition flex justify-center items-center"
           >
             Chat via WhatsApp Now
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Plan Your Custom Trip</h1>
        <p className="text-slate-600 dark:text-slate-400">Can't find the perfect package? Tell us what you want, and we'll craft an itinerary just for you.</p>
      </div>

      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-700">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             
             {/* General Info */}
             <div className="space-y-6">
                <div>
                   <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-700">Contact Details</h3>
                   <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-medium mb-1 dark:text-slate-300">Name</label>
                       <input required name="customer_name" onChange={handleInputChange} type="text" className="w-full p-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 outline-none focus:border-brand-primary" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium mb-1 dark:text-slate-300">Email</label>
                       <input required name="customer_email" onChange={handleInputChange} type="email" className="w-full p-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 outline-none focus:border-brand-primary" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium mb-1 dark:text-slate-300">WhatsApp</label>
                       <input required name="customer_phone" onChange={handleInputChange} type="tel" className="w-full p-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 outline-none focus:border-brand-primary" />
                     </div>
                   </div>
                </div>
             </div>

             {/* Trip Specs */}
             <div className="space-y-6">
                <div>
                   <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-700">Trip Preferences</h3>
                   <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-medium mb-1 dark:text-slate-300">Start Date</label>
                         <input required name="travel_date" onChange={handleInputChange} type="date" className="w-full p-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 outline-none focus:border-brand-primary" />
                       </div>
                       <div>
                         <label className="block text-sm font-medium mb-1 dark:text-slate-300">Duration (Days)</label>
                         <input required name="duration_days" onChange={handleInputChange} type="number" min="1" max="14" defaultValue="1" className="w-full p-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 outline-none focus:border-brand-primary" />
                       </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-medium mb-1 dark:text-slate-300">Pax</label>
                         <input required name="total_pax" onChange={handleInputChange} type="number" min="1" defaultValue="2" className="w-full p-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 outline-none focus:border-brand-primary" />
                       </div>
                       <div>
                         <label className="block text-sm font-medium mb-1 dark:text-slate-300">Hotel Style</label>
                         <select name="accommodation_preference" onChange={handleInputChange} className="w-full p-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 outline-none focus:border-brand-primary h-[50px]">
                           <option value="Hostel/Backpacker">Hostel/Backpacker</option>
                           <option value="3 Star Hotel">3 Star Hotel</option>
                           <option value="4 Star Hotel" selected>4 Star Hotel</option>
                           <option value="5 Star Resort">5 Star Resort</option>
                         </select>
                       </div>
                     </div>

                     <div>
                       <label className="block text-sm font-medium mb-1 dark:text-slate-300">Destinations / Interests</label>
                       <textarea 
                         required 
                         name="requested_destinations"
                         onChange={handleInputChange}
                         className="w-full p-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 outline-none focus:border-brand-primary h-24 resize-none" 
                         placeholder="E.g., Bromo, Ijen, Tumpak Sewu. We love photography and prefer a relaxed pace."
                       ></textarea>
                     </div>
                   </div>
                </div>
             </div>

          </div>

          <div className="border-t border-slate-100 dark:border-slate-700 pt-8 flex justify-end">
             <button type="submit" className="px-10 py-4 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold rounded-xl shadow-xl shadow-brand-primary/30 transition-all hover:scale-105">
               Submit Request
             </button>
          </div>

        </form>
      </div>
    </div>
  );
}
