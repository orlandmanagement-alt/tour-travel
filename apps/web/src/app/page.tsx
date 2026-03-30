import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-50 dark:to-slate-900"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pb-24">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            Find Your Next <span className="text-brand-primary drop-shadow-md">Adventure</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-12 max-w-2xl mx-auto drop-shadow-md">
            Discover the hidden gems of Indonesia with curated open trips and personalized private tours.
          </p>

          {/* Smart Search Bar */}
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl md:rounded-full shadow-2xl max-w-4xl mx-auto">
            <form action="/tours" className="flex flex-col md:flex-row items-center gap-4">
              
              <div className="flex-1 w-full flex items-center bg-white dark:bg-slate-900 rounded-full md:rounded-none md:border-r border-slate-200 dark:border-slate-700 px-4 py-3">
                <span className="text-2xl mr-3">📍</span>
                <div className="flex-1 text-left">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Where</label>
                  <select name="location" className="w-full bg-transparent text-slate-800 dark:text-slate-100 font-medium outline-none cursor-pointer">
                    <option value="">Anywhere in East Java</option>
                    <option value="BMO">Mount Bromo</option>
                    <option value="BWI">Banyuwangi & Ijen</option>
                    <option value="MLG">Malang City</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 w-full flex items-center bg-white dark:bg-slate-900 rounded-full md:rounded-none md:border-r border-slate-200 dark:border-slate-700 px-4 py-3">
                <span className="text-2xl mr-3">🏷️</span>
                <div className="flex-1 text-left">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</label>
                  <select name="type" className="w-full bg-transparent text-slate-800 dark:text-slate-100 font-medium outline-none cursor-pointer">
                    <option value="">All Types</option>
                    <option value="Open Trip">Open Trip</option>
                    <option value="Private Trip">Private Trip</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 w-full flex items-center bg-white dark:bg-slate-900 rounded-full md:rounded-none px-4 py-3">
                <span className="text-2xl mr-3">📅</span>
                <div className="flex-1 text-left">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">When</label>
                  <input type="date" name="date" className="w-full bg-transparent text-slate-800 dark:text-slate-100 font-medium outline-none cursor-text" />
                </div>
              </div>

              <button type="submit" className="w-full md:w-auto h-full px-8 py-4 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-full font-bold transition-transform hover:scale-105 shadow-xl shadow-brand-primary/40">
                Explore
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 2. TRENDING DESTINATIONS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Trending Destinations</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Explore our most popular locations handpicked for the perfect getaway.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Card 1 */}
           <Link href="/tours?location=BMO" className="group relative h-96 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
             <img src="https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=800&q=80" alt="Mount Bromo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold text-white mb-2">Mount Bromo</h3>
                <p className="text-white/80 flex items-center">
                  <span className="bg-brand-primary/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mr-3">12 Tours</span>
                  Discover the majestic sunrise
                </p>
             </div>
           </Link>

           {/* Card 2 */}
           <Link href="/tours?location=BWI" className="group relative h-96 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 md:-translate-y-8">
             <img src="https://images.unsplash.com/photo-1534008897995-27a23e859048?w=800&q=80" alt="Kawah Ijen" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold text-white mb-2">Kawah Ijen</h3>
                <p className="text-white/80 flex items-center">
                  <span className="bg-brand-primary/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mr-3">8 Tours</span>
                  Witness the rare blue fire
                </p>
             </div>
           </Link>

           {/* Card 3 */}
           <Link href="/tours?location=MLG" className="group relative h-96 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
             <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80" alt="Malang" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold text-white mb-2">Malang City</h3>
                <p className="text-white/80 flex items-center">
                  <span className="bg-brand-primary/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mr-3">15 Tours</span>
                  Cool breeze and amusement parks
                </p>
             </div>
           </Link>
        </div>
      </section>

      {/* 2.5 INFINITE SCROLL PARTNERS */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <p className="text-sm font-bold tracking-widest text-slate-400 uppercase">Trusted by Explorers Worldwide</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-infinite-scroll flex items-center space-x-16 whitespace-nowrap pl-16">
             {[1,2,3,4,5,6,7].map((i) => (
               <div key={i} className="flex items-center space-x-3 opacity-50 hover:opacity-100 hover:text-brand-primary transition-all cursor-pointer">
                 <span className="text-4xl">🌋</span>
                 <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">Partner {i}</span>
               </div>
             ))}
          </div>
          <div className="absolute top-0 animate-infinite-scroll flex items-center space-x-16 whitespace-nowrap pl-16" aria-hidden="true">
             {[1,2,3,4,5,6,7].map((i) => (
               <div key={`dup-${i}`} className="flex items-center space-x-3 opacity-50 hover:opacity-100 hover:text-brand-primary transition-all cursor-pointer">
                 <span className="text-4xl">🌋</span>
                 <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">Partner {i}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="bg-slate-100 dark:bg-slate-800/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Book With Us?</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {[{
               icon: '🏆', title: 'Expert Guides', desc: 'Certified local professionals taking care of your journey.'
             },{
               icon: '🛡️', title: 'Safe & Secure', desc: 'Secure online payments and well-maintained transportation vehicles.'
             },{
               icon: '💸', title: 'Best Prices', desc: 'Transparent pricing with no hidden fees and exclusive hot deals.'
             },{
               icon: '⭐', title: '5-Star Support', desc: '24/7 dedicated customer service to assist before and during your trip.'
             }].map((feature, i) => (
               <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm text-center hover:-translate-y-2 transition-transform duration-300">
                 <div className="text-5xl mb-6">{feature.icon}</div>
                 <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h4>
                 <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary dark:bg-brand-primary-dark"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Want a Tailor-Made Experience?</h2>
           <p className="text-xl text-blue-100 mb-10">We can craft a custom itinerary perfectly suited to your schedule, preferences, and budget.</p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link href="/custom-trip" className="px-8 py-4 bg-white text-brand-primary hover:bg-slate-50 rounded-full font-bold text-lg shadow-xl hover:-translate-y-1 transition-all w-full sm:w-auto">
                Request Custom Trip
             </Link>
             <a href="https://wa.me/6281234567890" target="_blank" className="px-8 py-4 bg-[#25D366] text-white hover:bg-[#20bd5a] rounded-full font-bold text-lg shadow-xl hover:-translate-y-1 transition-all w-full sm:w-auto flex items-center justify-center">
                <span>💬 WhatsApp Us</span>
             </a>
           </div>
        </div>
      </section>

    </div>
  );
}
