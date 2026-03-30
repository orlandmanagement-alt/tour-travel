'use client';
import { useState, useEffect } from 'react';

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1518090597335-e6f7783ee855?w=1600',
    title: 'Jelajahi Dunia,',
    highlight: 'Tanpa Batas.',
    subtitle: 'Pesan tiket tour, open trip, dan rental mobil dengan platform enterprise terpercaya.'
  },
  {
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600',
    title: 'Petualangan Baru,',
    highlight: 'Kenangan Abadi.',
    subtitle: 'Destinasi eksklusif yang dikurasi khusus untuk pengalaman tak terlupakan.'
  },
  {
    image: 'https://images.unsplash.com/photo-1542898939-5e5f385c5dfa?w=1600',
    title: 'Liburan Mewah,',
    highlight: 'Harga Hemat.',
    subtitle: 'Dapatkan penawaran terbaik untuk paket tour domestik dan internasional.'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[55vh] min-h-[450px] max-h-[600px] pt-14 flex flex-col justify-center overflow-hidden">
      {SLIDES.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${slide.image}')` }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-brand-900/40 to-transparent z-10"></div>
        </div>
      ))}
      
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-[-30px]">
        <div className="animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-4 drop-shadow-xl">
            {SLIDES[currentSlide].title} <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-yellow-400">
              {SLIDES[currentSlide].highlight}
            </span>
          </h1>
          <p className="text-sm md:text-lg text-slate-200 max-w-2xl mx-auto font-medium drop-shadow-lg leading-relaxed">
            {SLIDES[currentSlide].subtitle}
          </p>
          
          <div className="mt-8 flex justify-center gap-2">
            {SLIDES.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-brand-accent w-8' : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
