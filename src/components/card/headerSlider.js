'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: 'Alirkan Pahala',
    subtitle: 'Dengan',
    highlight: '',
    tag: 'Di Pelosok Negeri',
    image: `https://i.pinimg.com/736x/19/da/10/19da108dba45f92e8eff6a04ad76239c.jpg`,
    buttonText: 'SEDEKAH SEKARANG!',
  },
  {
    title: 'Yuk Istiqomah',
    subtitle: 'Dalam',
    highlight: 'Berbagi Kebaikan',
    tag: 'Bersama Laju Peduli',
    image: '/placeholder.svg?height=300&width=600',
    buttonText: 'DONASI SEKARANG',
  },
  {
    title: 'Berbagi Berkah',
    subtitle: 'Untuk',
    highlight: 'Sesama',
    tag: 'Program Sosial',
    image: '/placeholder.svg?height=300&width=600',
    buttonText: 'MULAI BERBAGI',
  },
];

export default function HeaderSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className='w-full max-w-md mx-auto mb-3 '>
      <div className='relative overflow-hidden rounded-lg shadow-md'>
        <div
          className='flex transition-transform duration-300 ease-in-out'
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className='w-full flex-shrink-0'>
              <div className='relative'>
                <Image
                  src={slide.image}
                  alt={`Banner ${index + 1}`}
                  width={600}
                  height={300}
                  className='w-full h-[200px] object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-r from-white/90 to-transparent p-4'>
                  <div className='max-w-[70%]'>
                    <h2 className='text-lg font-bold text-orange-500 mb-1'>{slide.title}</h2>
                    <h3 className='text-base font-bold text-orange-500 mb-1'>{slide.subtitle}</h3>
                    <h3 className='text-base font-bold text-orange-500 mb-2'>{slide.highlight}</h3>
                    <div className='bg-blue-500 text-white text-xs px-2 py-1 rounded-md inline-block mb-2'>{slide.tag}</div>
                    <button className='bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded-md'>{slide.buttonText}</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className='absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/50 p-1 rounded-full'>
          <ChevronLeft className='w-4 h-4 text-gray-800' />
        </button>
        <button
          onClick={nextSlide}
          className='absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/50 p-1 rounded-full'>
          <ChevronRight className='w-4 h-4 text-gray-800' />
        </button>
      </div>
      <div className='flex justify-center gap-2 '>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
