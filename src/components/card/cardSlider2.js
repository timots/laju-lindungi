'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';

const ArticleCard = ({ article }) => {
  const router = useRouter();


  const handleCardClick = () => {
    router.push(`/article/${article?.id}`);
  };

  return (
    <div
      className='bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full cursor-pointer border border-gray-100 transform hover:-translate-y-1 hover:scale-102'
      onClick={handleCardClick}>
      <div className='block'>
        <div className='relative group'>
          <img
            src={article.thumbnail_image || 'https://picsum.photos/600/400'}
            alt={article.title}
            width={400}
            height={200}
            className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
          />
          <div className='absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        </div>
        <div className='p-4 flex flex-col h-full '>
          <h3 className='text-lg font-semibold mb-2 line-clamp-2 bg-gradient-to-r from-orange-500 to-green-300 bg-clip-text text-transparent hover:from-orange-600 hover:to-orange-400 transition-all duration-200'>{article?.title}</h3>
          <div className='flex items-center space-x-4 mt-4 text-sm text-gray-500 mb-4'>
            <div className='flex items-center bg-green-50 px-2 py-1 rounded-full'>
              <Clock className='w-4 h-4 mr-3 text-green-500' />
              <span className='text-green-600'>{format(new Date(article?.createdAt?._seconds * 1000), 'MMMM d, yyyy')}</span>
            </div>
          </div>
          <div className='mt-4'>
            <button className='group flex items-center text-green-500 text-sm font-medium hover:text-orange-600 transition-colors duration-200'>
              READ MORE
              <ArrowRight className='w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CardSlider2(Header, articleCard) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (Header?.articleCard) {
      setCampaigns(Header?.articleCard);
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
    <div className='w-full max-w-md mx-auto px-4 mt-4 rounded-xl shadow-lg'>
      <h2 className='text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-6'>{Header?.Header}</h2>
      <div className='relative'>
        <div className='overflow-hidden '>
          <div
            className='flex transition-transform duration-300 ease-in-out'
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {totalSlides > 0 ? (
              Array.from({ length: totalSlides }).map((_, index) => (
                <div
                  key={index}
                  className='w-full flex-shrink-0 grid grid-cols-2 gap-4 p-4 '>
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
            className='absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200 hover:bg-orange-50 border border-orange-100'>
            <ChevronLeft className='w-5 h-5 text-orange-500' />
          </button>
        )}
        {currentSlide < totalSlides - 1 && (
          <button
            onClick={nextSlide}
            className='absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200 hover:bg-orange-50 border border-orange-100'>
            <ChevronRight className='w-5 h-5 text-orange-500' />
          </button>
        )}
      </div>
      <div className='flex justify-center gap-2 mt-6'>
        {totalSlides > 0 &&
          Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${currentSlide === index ? 'bg-orange-500 scale-125' : 'bg-gray-300 hover:bg-orange-300'}`}
            />
          ))}
      </div>
    </div>
  );
}
