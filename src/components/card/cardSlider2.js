'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Makna Lailatul Qadar dalam Sejarah Islam',
    image: '/placeholder.svg?height=200&width=400',
    category: 'ARTIKEL',
    categoryColor: 'bg-emerald-500',
    date: 'November 7, 2024',
    comments: 'Tidak ada komentar',
    link: '#',
  },
  {
    id: 2,
    title: '5 Langkah Refleksi dan Evaluasi Diri di Akhir Ramadhan',
    image: '/placeholder.svg?height=200&width=400',
    category: 'AGAMA',
    categoryColor: 'bg-emerald-500',
    date: 'November 6, 2024',
    comments: 'Tidak ada komentar',
    link: '#',
  },
  {
    id: 3,
    title: 'Keutamaan Bersedekah di Bulan Ramadhan',
    image: '/placeholder.svg?height=200&width=400',
    category: 'ARTIKEL',
    categoryColor: 'bg-emerald-500',
    date: 'November 5, 2024',
    comments: 'Tidak ada komentar',
    link: '#',
  },
  {
    id: 4,
    title: 'Panduan Lengkap Zakat Fitrah',
    image: '/placeholder.svg?height=200&width=400',
    category: 'AGAMA',
    categoryColor: 'bg-emerald-500',
    date: 'November 4, 2024',
    comments: 'Tidak ada komentar',
    link: '#',
  },
];

const ArticleCard = ({ article }) => (
  <div className='bg-white rounded-lg overflow-hidden shadow-sm'>
    <Link
      href={article.link}
      className='block'>
      <div className='relative'>
        <Image
          src={article.image}
          alt={article.title}
          width={400}
          height={200}
          className='w-full h-48 object-cover'
        />
        <span className={`absolute top-4 left-4 ${article.categoryColor} text-white text-xs px-4 py-1 rounded-full`}>{article.category}</span>
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4 line-clamp-2'>{article.title}</h3>
        <div className='flex items-center justify-between'>
          <Link
            href={article.link}
            className='text-emerald-500 text-sm font-medium hover:text-emerald-600'>
            READ MORE »
          </Link>
        </div>
      </div>
    </Link>
    <div className='px-4 pb-4 text-sm text-gray-500 flex items-center justify-between'>
      <span>{article.date}</span>
      <span>{article.comments}</span>
    </div>
  </div>
);

export default function CardSlider2() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(articles.length / 2);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className='w-full max-w-md mx-auto px-4'>
      <h2 className='text-xl font-bold text-gray-800 mb-6'>Kebaikanmu Terus Mengalir Hingga Penjuru Negeri!</h2>
      <div className='relative'>
        <div className='overflow-hidden'>
          <div
            className='flex transition-transform duration-300 ease-in-out'
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {Array.from({ length: totalSlides }).map((_, index) => (
              <div
                key={index}
                className='w-full flex-shrink-0 grid grid-cols-2 gap-4'>
                {articles.slice(index * 2, index * 2 + 2).map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {currentSlide > 0 && (
          <button
            onClick={prevSlide}
            className='absolute -left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md'>
            <ChevronLeft className='w-4 h-4' />
          </button>
        )}
        {currentSlide < totalSlides - 1 && (
          <button
            onClick={nextSlide}
            className='absolute -right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md'>
            <ChevronRight className='w-4 h-4' />
          </button>
        )}
      </div>
      <div className='flex justify-center gap-2 mt-6'>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${currentSlide === index ? 'bg-emerald-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
