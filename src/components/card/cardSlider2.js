'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const ArticleCard = ({ article }) => (
  <div className='bg-white rounded-lg overflow-hidden shadow-sm h-full'>
    <Link
      href={article.link || '#'}
      passHref>
      <div className='block'>
        <div className='relative'>
          <img
            src={article.images[0]}
            alt={article.name}
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
    </Link>
    <div className='px-4 pb-4 text-sm text-gray-500 flex items-center justify-between'>
      <span>{article.date}</span>
      <span>{article.comments}</span>
    </div>
  </div>
);

export default function CardSlider2() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaignData = useCallback(async () => {
    try {
      const requestData = {
        companyId: 'vrWcmcy7wEw1BUkQP3l9',
        projectId: 'HWMHbyA6S12FXzVwcru7',
      };

      const response = await axios.post('/api/v1/article/read', requestData);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Gagal memuat data');
    }
  }, []);

  useEffect(() => {
    const loadCampaigns = async () => {
      setLoading(true);
      try {
        const data = await fetchCampaignData();
        // Memastikan bahwa data ada sebelum diset
        if (data?.data && Array.isArray(data.data)) {
          setCampaigns(data.data);
        } else {
          setCampaigns([]); // Jika tidak ada data atau bukan array
        }
      } catch (err) {
        setError(err.message);
        setCampaigns([]); // Pastikan kampanye tetap kosong jika terjadi error
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, [fetchCampaignData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalSlides = Math.ceil(campaigns.length / 2);

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
