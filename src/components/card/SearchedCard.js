import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { differenceInDays } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import useUserStore from '@/hooks/zustand';

function SearchedCard({ campaign }) {
  const router = useRouter();
  const [exchangeRates, setExchangeRates] = useState({});
  const globalState = useUserStore();

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get('/api/public/exchangeRate');
      setExchangeRates(response.data.rates || {});
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error.message);
    }
  };

  const handleCardClick = () => {
    const slug = campaign?.id;
    router.push(`/search/${slug}`);
  };

  const formatCurrency = (amount, location) => {
    const currencyMap = {
      Indonesia: 'IDR',
      Malaysia: 'MYR',
      Amerika: 'USD',
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
                    <AvatarFallback className='bg-orange-500 text-[10px] text-white'>{donor.contact_information?.name?.[0]?.toUpperCase()}</AvatarFallback>
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

export default SearchedCard;
