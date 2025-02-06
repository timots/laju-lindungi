import React from 'react';

export const LoadingScreen = () => {
  return (
    <div className='fixed inset-0 bg-white flex flex-col items-center justify-center'>
      <div className='relative'>
        <img
          src='/payment logo/synergyhumanity.jpeg'
          alt='LajuPeduli Logo'
          width={120}
          height={40}
          className='mb-4 animate-bounce'
        />
        <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2'>
          <div className='flex space-x-2'>
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className='w-3 h-3 bg-orange-500 rounded-full animate-pulse'
                style={{ animationDelay: `${index * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
      <p className='mt-12 text-lg font-semibold text-gray-600 animate-pulse'>Memuat Halaman...</p>
    </div>
  );
};
