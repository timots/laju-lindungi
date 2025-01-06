'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Clock, CheckCircle2, Share, Home } from 'lucide-react';
import CampaignTabs from '@/components/tabs/campaignTabs';
import PrayerList from '@/components/menu/doa';
import axios from 'axios';
import { differenceInDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { LoadingScreen } from '@/components/loading/loadingScreen';
import useUserStore from '@/hooks/zustand';
import { trackPixelEvents } from '@/utils/pixelUtil';

export default function CampaignDetail() {
  const router = useRouter();
  const [activeCampaigns, setActiveCampaigns] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});
  const globalState = useUserStore();

  console.log(activeCampaigns, 'ini active campaigns');

  const getLocation = async () => {
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;

        // Mendapatkan negara berdasarkan koordinat
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await response.json();
        const country = data.address.country || 'Unknown';
        const CountryCode = data.address.country_code || 'Unknown';
        globalState?.setLocation(country);
        globalState?.setCountryCode(CountryCode);

        // Mendapatkan kode mata uang berdasarkan negara
        const currencyResponse = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        const currencyData = await currencyResponse.json();
        const currencyCode = currencyData[0]?.currencies ? Object.keys(currencyData[0].currencies)[0] : 'Unknown';
        globalState?.setCurrency(currencyCode);

        if (country === 'Indonesia') {
          i18n.changeLanguage('id');
          globalState?.setLanguageId('id');
        } else if (country === 'Malaysia') {
          i18n.changeLanguage('my');
          globalState?.setLanguageId('my');
        } else {
          i18n.changeLanguage('en');
          globalState?.setLanguageId('en');
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    } else {
      console.log('Geolocation tidak didukung di browser Anda.');
    }
  };

  useEffect(() => {
    if (!globalState?.location) {
      getLocation();
    }
  }, [globalState?.location]);

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get('/api/public/exchangeRate');
      setExchangeRates(response.data.rates || {});
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error.message);
    }
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

  const formatCurrency = (amount, location) => {
    const currencyMap = {
      Indonesia: 'IDR',
      Malaysia: 'MYR',
      Amerika: 'USD',
      Singapore: 'SGD',
      // Tambahkan negara lainnya jika diperlukan
    };

    const currencyCode = currencyMap[location] || 'IDR';
    const rate = exchangeRates[currencyCode] || 1;

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount * rate);
  };
  const handleDonateNow = () => {
    router.push({
      pathname: 'donasi-sekarang',
      query: {
        id: activeCampaigns?.id,
      },
    });
  };

  const getData = async () => {
    console.log('masuk get config');

    try {
      const res = await axios.post('/api/public/config/read', {
        projectId: 'HWMHbyA6S12FXzVwcru7',
      });

      if (res?.data?.data.length > 0) {
        globalState.setWebConfig(res?.data?.data[0]);

        // tambah facebook pixel kalo ada
        if (res?.data?.data[0]?.pixels?.facebook) {
          addFacebookPixel(res?.data?.data[0].pixels.facebook || '2340318182830705');
        }
        // tambah google tag manager kalo ada
        if (res?.data?.data[0]?.pixels?.['tag-manager']) {
          addGoogleTagManager(res?.data?.data[0].pixels?.['tag-manager'] || 'GTM-T386H9R');
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
    // }
  }, []);

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (router?.query?.slug) {
      loadCampaigns();
    }
  }, [router?.query?.slug]);

  useEffect(() => {
    if (activeCampaigns?.id) {
      trackPixelEvents({
        eventName: globalState?.webConfig?.aditionalDataPixels?.productViewPage || 'initiateCheckout',
        eventData: {
          content_name: activeCampaigns?.name,
          content_ids: [activeCampaigns?.id],
          currency: globalState?.currency || 'IDR',
        },
        dynamicTagPixels: globalState?.webConfig?.aditionalDataPixels?.productViewPage || 'initiateCheckout',
      });
    }
  }, [activeCampaigns?.id]);

  if (loading) return <LoadingScreen />;
  if (error) return <div className='text-center py-8 text-red-500'>Error: {error}</div>;

  return (
    <div className='w-full max-w-md mx-auto bg-white'>
      <div className='fixed top-0  z-10'>
        <div className='max-w-md mx-auto px-4 h-14 flex items-center'>
          <button
            onClick={() => router.back()}
            className='flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/80 text-white'>
            <Home className='w-6 h-6' />
            <span>Home</span>
          </button>
        </div>
      </div>
      <div className='relative group overflow-hidden rounded-lg shadow-lg'>
        <img
          src={activeCampaigns?.images?.[0] || '/placeholder.svg?height=200&width=400'}
          alt={activeCampaigns?.name || 'Data tidak tersedia'}
          width={400}
          height={200}
          className='w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/50 transition-colors duration-300'></div>
        <div className='absolute bottom-4 left-4 text-white'>
          <h2 className='text-2xl font-bold'>{activeCampaigns?.name || 'Data tidak tersedia'}</h2>
        </div>
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
            <span className='font-semibold text-orange-500'>
              {/* {formatRupiah(activeCampaigns?.amount_total || 0)} */}
              {formatCurrency(activeCampaigns?.amount_total, globalState?.location)}
            </span>
            <span className='text-gray-500'>
              {/* terkumpul dari {formatRupiah(activeCampaigns?.target_amount || 0)} */}
              {formatCurrency(activeCampaigns?.target_amount, globalState?.location)}
            </span>
          </div>
        </div>

        <button
          className='w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors'
          onClick={handleDonateNow}>
          Donasi Sekarang
        </button>

        <div className='mt-6 border-t pt-4'>
          <div className='flex items-center gap-3'>
            <img
              src='/payment logo/laju_peduli.png'
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
