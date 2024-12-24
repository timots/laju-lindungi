'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Clock, CheckCircle2, Share, Home } from 'lucide-react';
import CampaignTabs from '@/components/tabs/campaignTabs';
import PrayerList from '@/components/menu/doa';
import axios from 'axios';
import { differenceInDays, format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { LoadingScreen } from '@/components/loading/loadingScreen';
import useUserStore from '@/hooks/zustand';
import { trackPixelEvents } from '@/utils/pixelUtil';
import Header from '@/components/header/HeaderSearch';

export default function ArticlePage() {
  const router = useRouter();
  const [activeCampaigns, setActiveCampaigns] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const globalState = useUserStore();

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

        // Menentukan bahasa berdasarkan negara
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

  const fetchCampaignData = async (slug) => {
    try {
      if (!slug) return;

      const requestData = {
        id: router?.query?.id,
      };

      const response = await axios.post('/api/v1/blogArticle/read', requestData);
      return response.data;
    } catch (error) {
      console.error(error.message);
      setError('Gagal memuat data kampanye.');
    }
  };

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const data = await fetchCampaignData(router?.query?.id);
      setActiveCampaigns(data?.data || {});
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router?.query?.id) {
      loadCampaigns();
    }
  }, [router?.query?.id]);

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
    <div>
      <Header />
      <main className='mt-16'>
        <div className='w-full max-w-md mx-auto bg-white'>
          <h1 className='text-3xl font-bold'>{activeCampaigns?.title}</h1>

          <div className='flex items-center text-sm text-gray-500 space-x-4'>
            <span>{format(new Date(activeCampaigns?.createdAt._seconds * 1000), 'MMMM d, yyyy')}</span>
            <span>•</span>
            <span>{activeCampaigns?.lastUpdatedBy?.email}</span>
          </div>

          <div
            className='prose max-w-none'
            dangerouslySetInnerHTML={{ __html: activeCampaigns?.html }}
          />

          <div className='flex justify-between items-center pt-6 border-t'>
            <span className='text-sm text-gray-500'>Tags: {activeCampaigns?.tags.join(', ') || 'No tags'}</span>
            <Button
              variant='outline'
              className='flex items-center gap-2'>
              <Share className='w-5 h-5' />
              Share
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
