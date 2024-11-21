'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, Loader } from 'lucide-react';
import { useRouter } from 'next/router';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { differenceInDays } from 'date-fns';

const CampaignCard = ({ campaign }) => {
  const router = useRouter();

  const handleCardClick = () => {
    const slug = campaign.id;
    router.push(`/campaign/${slug}`);
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
    <Card
      className='w-[280px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow transition-shadow cursor-pointer'
      onClick={handleCardClick}>
      <div className='h-[140px] overflow-hidden'>
        <img
          src={campaign?.images?.[0]}
          alt={campaign.name}
          className='w-full h-full object-cover'
        />
      </div>

      <div className='p-4 space-y-3'>
        <h2 className='font-medium text-[15px] leading-tight text-gray-900 line-clamp-2 min-h-[40px]'>{campaign.name}</h2>

        <div className='flex items-center gap-1.5'>
          <span className='text-gray-600 text-sm truncate max-w-[200px]'>{campaign?.vendor}</span>
          <CheckCircle2 className='w-4 h-4 text-blue-500 flex-shrink-0' />
        </div>

        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-orange-500 font-bold text-base'>{formatRupiah(campaign?.amount_total)}</span>
            <span className='text-gray-500 text-sm'>terkumpul</span>
          </div>

          <div className='w-full bg-gray-100 rounded-full h-1'>
            <div
              className='bg-orange-500 h-1 rounded-full transition-all duration-300'
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className='flex items-center justify-between pt-1'>
          <div className='flex -space-x-2'>
            {campaign?.orders?.slice(0, 4).map((donor, index) => (
              <Avatar
                key={index}
                className='w-6 h-6 border-2 border-white'>
                <AvatarFallback className='bg-orange-500 text-[10px] text-white'>{donor?.contact_information?.name?.[0]}</AvatarFallback>
              </Avatar>
            ))}
            {campaign?.orders?.length > 4 && (
              <Avatar className='w-6 h-6 border-2 border-white'>
                <AvatarFallback className='bg-orange-500 text-[10px] text-white'>+{campaign.orders.length - 4}</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
        <div className='flex items-center justify-between pt-1'>
          <div className='flex items-center gap-1 text-sm text-gray-500'>
            <Clock className='w-4 h-4' />
            <span>{campaign?.endAt?._seconds ? `${differenceInDays(new Date(campaign.endAt._seconds * 1000), new Date())} hari lagi` : '∞'}</span>
          </div>
        </div>
      </div>
    </Card>
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

  // if (loading) return <div className='text-center py-8'>Loading...</div>;
  if (loading) {
    return (
      <div className={`p-8 ${BgColour} flex items-center justify-center`}>
        <div className='text-white text-center'>
          <Loader className='w-12 h-12 animate-spin mx-auto mb-4' />
          <p className='text-lg'>Loading campaigns...</p>
        </div>
      </div>
    );
  }
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
      <div className='max-w-[600px] mx-auto'>
        <h2 className='text-2xl md:text-3xl font-bold text-white mb-6 text-center'>{Header}</h2>
        <div className='relative'>
          <div className='overflow-hidden'>
            <div
              className='flex transition-transform duration-300 ease-in-out'
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {Array.from({ length: totalSlides }).map((_, index) => (
                <div
                  key={index}
                  className='w-full flex-shrink-0 flex  gap-6'>
                  {campaigns.slice(index * 2, index * 2 + 2).map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      campaign={campaign}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors'
            aria-label='Previous slide'>
            <ChevronLeft className='w-6 h-6' />
          </button>

          <button
            onClick={nextSlide}
            className='absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors'
            aria-label='Next slide'>
            <ChevronRight className='w-6 h-6' />
          </button>
        </div>

        <div className='flex justify-center gap-2 mt-6'>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white' : 'bg-white opacity-50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
