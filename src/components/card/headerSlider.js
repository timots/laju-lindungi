'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';

export default function HeaderSlider(campaignsSelected) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [campaigns, setCampaigns] = useState(campaignsSelected?.campaignsSelected || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (campaignsSelected?.campaigns) {
      setCampaigns(campaignsSelected.campaigns);
    }
  }, [campaignsSelected]);

  useEffect(() => {
    if (campaigns.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % campaigns.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [campaigns.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % campaigns.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + campaigns.length) % campaigns.length);
  };

  if (loading) {
    return (
      <div className='p-8 flex items-center justify-center'>
        <div className='text-white text-center'>
          <Loader className='w-12 h-12 animate-spin mx-auto mb-4' />
          <p className='text-lg'>Loading campaigns...</p>
        </div>
      </div>
    );
  }

  if (error) return <div className='text-center py-8 text-red-500'>Error: {error}</div>;

  if (campaigns.length === 0) return null;

  return (
    <div className='w-full relative max-w-4xl mx-auto mb-3 mt-3 z-0'>
      <div className='relative overflow-hidden rounded-lg shadow-md'>
        <div
          className='flex transition-transform duration-300 ease-in-out'
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {campaigns.map((slide, index) => (
            <div
              key={index}
              className='w-full flex-shrink-0'>
              <div className='relative h-[300px]'>
                <img
                  src={slide?.images?.[0]}
                  alt={slide.name}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition duration-300  border-none focus:outline-none'>
          <ChevronLeft className='w-6 h-6 text-orange-500' />
        </button>
        <button
          onClick={nextSlide}
          className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition duration-300  border-none focus:outline-none'>
          <ChevronRight className='w-6 h-6 text-orange-500' />
        </button>
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 transition duration-300'>
          {campaigns.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-orange-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
