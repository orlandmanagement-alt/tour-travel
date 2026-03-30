'use client';

import { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
  altPrefix?: string;
}

export default function ImageCarousel({ images, altPrefix = 'Image' }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden group">
      
      {/* Main Image */}
      <div 
        className="w-full h-full bg-cover bg-center transition-all duration-500 ease-in-out"
        style={{ backgroundImage: `url('${images[currentIndex]}')` }}
        role="img"
        aria-label={`${altPrefix} ${currentIndex + 1}`}
      ></div>

      {/* Navigation Overlays */}
      {images.length > 1 && (
        <>
          {/* Left Arrow */}
          <button 
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all focus:outline-none"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all focus:outline-none"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none ${
                  index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
