'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MapPin, Clock, CheckCircle2, Share, ChevronLeft, Home } from 'lucide-react';
import CampaignTabs from '@/components/tabs/campaignTabs';
import FundraiserList from '@/components/menu/fundaiserList';
import PrayerList from '@/components/menu/doa';
import axios from 'axios';
import { differenceInDays } from 'date-fns';
import { Button } from '@/components/ui/button';

export default function CampaignDetail() {
  const router = useRouter();
  const [activeCampaigns, setActiveCampaigns] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(router, 'ini rputer');

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  const progressPercentage = (activeCampaigns.amount_total / activeCampaigns.target_amount) * 100;

  const fetchCampaignData = async (slug) => {
    try {
      if (!slug) return;

      const requestData = {
        companyId: 'vrWcmcy7wEw1BUkQP3l9',
        projectId: 'HWMHbyA6S12FXzVwcru7',
        productId: slug,
      };

      const response = await axios.post('/api/v1/article/read', requestData);
      return response.data;
    } catch (error) {
      console.error(error.message);
      setError('Gagal memuat data kampanye.');
    }
  };

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const data = await fetchCampaignData(router?.query?.slug);
      setActiveCampaigns(data?.data || {});
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router?.query?.slug) {
      loadCampaigns();
    }
  }, [router?.query?.slug]);

  if (loading) return <div className='text-center py-8'>Loading...</div>;
  if (error) return <div className='text-center py-8 text-red-500'>Error: {error}</div>;

  console.log(activeCampaigns, 'ini campaign active');

  return (
    <div className='w-full max-w-md mx-auto bg-white'>
      <div className='fixed top-0  z-10'>
        <div className='max-w-md mx-auto px-4 h-14 flex items-center'>
          <button
            onClick={() => router.back()}
            className='p-2 -ml-2  bg-white'>
            <Home className='w-6 h-6 bg' />
          </button>
        </div>
      </div>
      <div className='relative'>
        <img
          src={activeCampaigns?.images?.[0] || '/placeholder.svg?height=200&width=400'}
          alt={activeCampaigns?.name || 'Data tidak tersedia'}
          width={400}
          height={200}
          className='w-full h-[200px] object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
        <h2 className='absolute bottom-4 left-4 text-2xl font-bold text-white'>{activeCampaigns?.name || 'Data tidak tersedia'}</h2>
      </div>

      <div className='p-4 space-y-4'>
        <div className='flex justify-between items-center text-sm text-gray-600'>
          <span>{activeCampaigns?.orders?.length || '0'} Donasi</span>
          <div className='flex items-center gap-1'>
            <Clock className='w-4 h-4' />
            <span>{activeCampaigns?.endAt?._seconds ? `${differenceInDays(new Date(activeCampaigns.endAt._seconds * 1000), new Date())} hari lagi` : '∞'}</span>
          </div>
        </div>

        <div className='space-y-2'>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div
              className='bg-orange-500 h-2 rounded-full'
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className='flex justify-between text-sm'>
            <span className='font-semibold text-orange-500'>{formatRupiah(activeCampaigns?.amount_total || 0)}</span>
            <span className='text-gray-500'>terkumpul dari {formatRupiah(activeCampaigns?.target_amount || 0)}</span>
          </div>
        </div>

        <button
          className='w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors'
          onClick={() => {
            router.push({
              pathname: 'donasi-sekarang',
              query: {
                id: activeCampaigns?.id,
              },
            });
          }}>
          Donasi Sekarang
        </button>

        <div className='mt-6 border-t pt-4'>
          <div className='flex items-center gap-3'>
            <img
              src='/placeholder.svg?height=50&width=50'
              alt='Yayasan Logo'
              width={50}
              height={50}
              className='rounded-full'
            />
            <div>
              <h3 className='font-medium'>{activeCampaigns?.vendor || 'No Vendor'}</h3>
              <div className='flex items-center gap-1 text-sm text-gray-600'>
                <span>Verified Organization</span>
                <CheckCircle2 className='w-4 h-4 text-blue-500' />
              </div>
            </div>
          </div>
        </div>

        <CampaignTabs
          updates={activeCampaigns?.history}
          data={activeCampaigns}
        />
        {/* <FundraiserList /> */}
        <PrayerList data={activeCampaigns} />
      </div>
      <div className='fixed bottom-0 left-0 right-0 z-50'>
        <div className='container flex gap-2 max-w-md mx-auto p-4 bg-white'>
          <Button
            variant='outline'
            className='flex-1 gap-2 h-12 text-sm font-medium'>
            <Share className='h-4 w-4' />
            Bagikan
          </Button>
          <Button
            className='flex-1 h-12 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90'
            onClick={() => {
              router.push({
                pathname: 'donasi-sekarang',
                query: {
                  id: activeCampaigns?.id,
                },
              });
            }}>
            Donasi Sekarang!
          </Button>
        </div>
      </div>
    </div>
  );
}
