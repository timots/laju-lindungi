'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

export default function HeaderSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaignData = async () => {
    try {
      const requestData = {
        companyId: 'vrWcmcy7wEw1BUkQP3l9',
        // tags: 'sedekah',
        projectId: 'HWMHbyA6S12FXzVwcru7',
      };

      const response = await axios.post('/api/v1/article/read', requestData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Gagal memuat data');
    }
  };

  useEffect(() => {
    const loadCampaigns = async () => {
      setLoading(true);
      try {
        const data = await fetchCampaignData();
        if (data?.data?.length > 0) {
          setCampaigns(data.data);
        } else {
          setCampaigns([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % campaigns.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [campaigns.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % campaigns.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + campaigns.length) % campaigns.length);
  };

  if (loading) return <div className='text-center py-8'>Loading...</div>;
  if (error) return <div className='text-center py-8 text-red-500'>Error: {error}</div>;
  if (campaigns.length === 0) return <div className='text-center py-8'>Data tidak tersedia</div>;

  return (
    <div className='w-full relative max-w-4xl mx-auto mb-3 mt-3 z-0'>
      <div className='relative overflow-hidden rounded-lg shadow-md'>
        <div
          className='flex transition-transform duration-300 ease-in-out'
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {campaigns?.map((slide, index) => (
            <div
              key={index}
              className='w-full flex-shrink-0'>
              <div className='relative h-[300px]'>
                <img
                  src={slide?.images?.[0]}
                  alt={`Banner ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition duration-300'>
          <ChevronLeft className='w-6 h-6 text-orange-500' />
        </button>
        <button
          onClick={nextSlide}
          className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition duration-300'>
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
