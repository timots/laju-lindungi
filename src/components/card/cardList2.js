'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { differenceInDays } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import useUserStore from '@/hooks/zustand';
import { LoadingScreen } from '../loading/loadingScreen';

function CampaignCard({ campaign }) {
  const router = useRouter();
  const [exchangeRates, setExchangeRates] = useState({});
  const globalState = useUserStore();

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get('/api/public/exchangeRate');
      console.log(response, 'ini response');
      setExchangeRates(response.data.rates || {});
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error.message);
    }
  };

  // const createSlug = (title) => {
  //   return title
  //     .toLowerCase()
  //     .replace(/ /g, '-')
  //     .replace(/[^\w-]+/g, '');
  // };

  const handleCardClick = () => {
    // const slug = createSlug(campaign.name);
    const slug = campaign?.id;
    router.push(`${router.asPath}/${slug}`);
  };

  const formatCurrency = (amount, location) => {
    const currencyMap = {
      Indonesia: 'IDR',
      Malaysia: 'MYR',
      Amerika: 'USD',
      // Tambahkan negara lainnya jika diperlukan
    };

    const currencyCode = currencyMap[location] || 'IDR';
    const rate = exchangeRates[currencyCode] || 1;

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount * rate);
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const progressPercentage = (campaign.amount_total / campaign.target_amount) * 100;

  return (
    <Card
      className='overflow-hidden hover:shadow-md transition-shadow cursor-pointer bg-white'
      onClick={handleCardClick}>
      <div className='flex gap-4 p-4'>
        <div className='w-[120px] h-[120px] flex-shrink-0'>
          <img
            src={campaign.images?.[0]}
            alt={campaign.name}
            className='w-full h-full object-cover rounded-lg'
          />
        </div>
        <div className='flex-1 min-w-0'>
          <h3 className='font-semibold text-base text-gray-900 mb-1 line-clamp-2'>{campaign.name || 'Item Name Not Seet'}</h3>
          <div className='flex items-center gap-1 mb-3'>
            <span className='text-gray-600 text-sm'>{campaign.vendor || ' vendor not set'}</span>
            <CheckCircle2 className='w-4 h-4 text-blue-500' />
          </div>
          <div className='space-y-2'>
            <div className='flex items-baseline justify-between'>
              <span className='font-bold text-orange-500 text-lg'>{formatCurrency(campaign.amount_total, globalState?.location)}</span>
              <span className='text-sm text-gray-500'>terkumpul</span>
            </div>
            <Progress
              value={progressPercentage}
              className='h-2 bg-gray-100'
              indicatorClassName='bg-orange-500'
            />
            <div className='flex items-center justify-between pt-1'>
              <div className='flex -space-x-2'>
                {campaign.orders?.slice(0, 4).map((donor, index) => (
                  <Avatar
                    key={index}
                    className='w-6 h-6 border-2 border-white'>
                    <AvatarFallback className='bg-orange-500 text-[10px] text-white'>{donor.contact_information?.name?.[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                ))}
                {campaign.orders?.length > 4 && (
                  <Avatar className='w-6 h-6 border-2 border-white'>
                    <AvatarFallback className='bg-orange-500 text-[10px] text-white'>+{campaign.orders.length - 4}</AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className='flex items-center gap-1 text-sm text-gray-500'>
                <Clock className='w-4 h-4' />
                <span>{campaign?.endAt?._seconds ? `${differenceInDays(new Date(campaign.endAt._seconds * 1000), new Date())} hari lagi` : '∞'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function CampaignListCard() {
  const [visibleCampaigns, setVisibleCampaigns] = useState(5);
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
        setCampaigns(data?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  // if (loading) return <div className='text-center py-8'>Loading...</div>;
  if (loading) return <LoadingScreen />;
  if (error) return <div className='text-center py-8 text-red-500'>Error: {error}</div>;

  const loadMore = () => {
    setVisibleCampaigns((prev) => Math.min(prev + 5, campaigns.length));
  };

  return (
    <div className='w-full max-w-2xl mx-auto px-4 py-6'>
      <div className='space-y-4'>
        {campaigns.slice(0, visibleCampaigns).map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
          />
        ))}
      </div>

      {visibleCampaigns < campaigns.length && (
        <div className='mt-6 text-center'>
          <button
            onClick={loadMore}
            className='bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors'>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default CampaignListCard;
