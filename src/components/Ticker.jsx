import React, { useState, useEffect } from 'react';

export default function Ticker({ headlines }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!headlines || headlines.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [headlines]);

  if (!headlines || headlines.length === 0) return null;

  return (
    <div style={{ backgroundColor: '#FF6B35' }} className="w-full flex items-center px-4 py-2 text-black overflow-hidden border-t border-b border-[#E85D2A]">
      <div className="text-black font-black text-sm mr-4 whitespace-nowrap">
        BREAKING:
      </div>
      <div className="relative flex-1 h-6">
        {headlines.map((headline, index) => (
          <div
            key={index}
            className={`absolute w-full text-center font-semibold transition-opacity duration-500 left-0 top-0 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {headline}
          </div>
        ))}
      </div>
    </div>
  );
}
