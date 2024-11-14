'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';

const CampaignCard = ({ campaign }) => {
  const router = useRouter();

  const handleCardClick = () => {
    const slug = campaign.id;
    router.push(`${router.asPath}/campaign/${slug}`);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  const progressPercentage = (campaign.amount_total / campaign.target_amount) * 100;

  return (
    <div
      className='w-full max-w-sm h-[380px] cursor-pointer bg-white rounded-lg overflow-hidden shadow-md flex flex-col'
      onClick={handleCardClick}>
      <div className='relative h-[180px]'>
        <img
          src={campaign?.images?.[0]}
          alt={campaign.name}
          className='w-full h-full object-cover'
        />
        <div className='absolute bottom-0 left-0 right-0 bg-gray-500 bg-opacity-90 p-3'>
          <h2 className='text-white font-medium text-lg leading-tight truncate'>{campaign.name}</h2>
        </div>
      </div>

      <div className='p-4 flex flex-col justify-between flex-1'>
        <div className='flex items-center space-x-2 h-6'>
          <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
          <p className='text-gray-600 text-sm truncate'>{campaign?.vendor}</p>
        </div>

        <div className='flex justify-between items-center h-6'>
          <span className='font-semibold text-orange-500'>{formatRupiah(campaign?.amount_total)}</span>
          <span className='text-sm text-gray-500'>terkumpul</span>
        </div>

        <div className='w-full bg-gray-100 rounded-full h-1.5 mb-2'>
          <div
            className='bg-orange-500 h-1.5 rounded-full'
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className='flex -space-x-2 h-6'>
          {campaign?.orders?.map((order, index) => (
            <div
              key={index}
              className='w-6 h-6 rounded-full border-2 border-white flex items-center justify-center bg-gray-300 text-white text-xs font-bold'>
              {order.contact_information?.name?.[0].toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CardSlider = ({ Header, BgColour }) => {
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
        setCampaigns(data?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  if (loading) return <div className='text-center py-8'>Loading...</div>;
  if (error) return <div className='text-center py-8 text-red-500'>Error: {error}</div>;

  const totalSlides = Math.ceil(campaigns.length / 2);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className={`p-8 ${BgColour}`}>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl md:text-3xl font-bold text-white mb-6 text-center'>{Header}</h2>
        <div className='relative'>
          <div className='overflow-hidden'>
            <div
              className='flex transition-transform duration-300 ease-in-out'
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {Array.from({ length: totalSlides }).map((_, index) => (
                <div
                  key={index}
                  className='w-full flex-shrink-0 flex gap-6'>
                  {campaigns.slice(index * 2, index * 2 + 2).map((campaign) => (
                    <div
                      key={campaign.id}
                      className='w-1/2'>
                      <CampaignCard campaign={campaign} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md'
            aria-label='Previous slide'>
            <ChevronLeft className='w-6 h-6' />
          </button>
          <button
            onClick={nextSlide}
            className='absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md'
            aria-label='Next slide'>
            <ChevronRight className='w-6 h-6' />
          </button>
        </div>
        <div className='flex justify-center gap-2 mt-6'>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white opacity-50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
