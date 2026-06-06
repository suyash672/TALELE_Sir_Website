import React, { useEffect, useRef, useState } from 'react';

const PhotoSlideshow = ({ images = [], interval = 4000 }) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!images || images.length === 0) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearTimeout(timeoutRef.current);
  }, [index, images, interval]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-xl">
        <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-teal-100 bg-white">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${i + 1}`}
              className={`w-full h-80 sm:h-[28rem] md:h-[32rem] object-cover transition-opacity duration-700 ${
                i === index ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${i === index ? 'bg-primary' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoSlideshow;
