'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';

const ArticleCard = ({ article }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/campaign/${article?.id}`);
  };

  return (
    <div
      className='bg-white rounded-lg overflow-hidden shadow-sm h-full cursor-pointer'
      onClick={handleCardClick}>
      <div className='block'>
        <div className='relative'>
          <img
            src={article?.thumbnail_image}
            alt={article.title}
            width={400}
            height={200}
            className='w-full h-48 object-cover'
          />
          <span className={`absolute top-4 left-4 ${article.categoryColor} text-white text-xs px-4 py-1 rounded-full`}>{article.slug}</span>
        </div>
        <div className='p-4 flex flex-col h-full'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4 line-clamp-2 flex-grow'>{article.name}</h3>
          <div className='flex items-center justify-between'>
            <span className='text-emerald-500 text-sm font-medium hover:text-emerald-600'>READ MORE »</span>
          </div>
        </div>
      </div>
      <div className='px-4 pb-4 text-sm text-gray-500 flex items-center justify-between'>
        <span>{article.date}</span>
        <span>{article.comments}</span>
      </div>
    </div>
  );
};

export default function CardSlider2(Header, articleCard) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [campaigns, setCampaigns] = useState([]);
  console.log(Header, 'ini campaign selected');

  useEffect(() => {
    if (Header?.articleCard) {
      setCampaigns(Header?.articleCard); // Pastikan data diteruskan dari props ke state
    }
  }, [Header?.articleCard]);

  const totalSlides = Math.ceil(campaigns.length / 2);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className='w-full max-w-md mx-auto px-4'>
      <h2 className='text-xl font-bold text-gray-800 mb-6'>{Header?.Header}</h2>
      <div className='relative'>
        <div className='overflow-hidden'>
          <div
            className='flex transition-transform duration-300 ease-in-out'
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {totalSlides > 0 ? (
              Array.from({ length: totalSlides }).map((_, index) => (
                <div
                  key={index}
                  className='w-full flex-shrink-0 grid grid-cols-2 gap-4'>
                  {campaigns.slice(index * 2, index * 2 + 2).map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                    />
                  ))}
                </div>
              ))
            ) : (
              <div className='w-full text-center py-4 text-gray-500'>No articles available</div>
            )}
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
        {totalSlides > 0 &&
          Array.from({ length: totalSlides }).map((_, index) => (
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
