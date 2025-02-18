import Footer from '@/components/footer/footer';
import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useUserStore from '@/hooks/zustand';
import SearchedCard from '@/components/card/SearchedCard';
import { LoadingScreen } from '@/components/loading/loadingScreen';

export default function InfoPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [visibleCampaigns, setVisibleCampaigns] = useState(5);
  const [loadingSelectedCampaign, setLoadingSelectedCampaign] = useState(true);
  const [error, setError] = useState('');

  const fetchCampaigns = async () => {
    setLoadingSelectedCampaign(true);

    try {
      // Convert tags string "tag1,tag2,tag3" to array ["tag1", "tag2", "tag3"]
      const tagsArray = router?.query?.tags ? router.query.tags.split(',').map((tag) => tag.trim()) : [];


      const response = await axios.post('/api/v1/article/read', {
        companyId: 'vrWcmcy7wEw1BUkQP3l9',
        projectId: 'HWMHbyA6S12FXzVwcru7',
        tags: tagsArray,
      });

      if (response.data.data) {
        setCampaigns(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
      setError('Gagal memuat data Campaign.');
    } finally {
      setLoadingSelectedCampaign(false);
    }
  };

  const loadMore = () => {
    setVisibleCampaigns((prev) => Math.min(prev + 5, campaigns.length));
  };

  useEffect(() => {
    if (router?.query?.tags !== undefined) {
      fetchCampaigns();
    }
  }, [router.query?.tags]);

  if (loadingSelectedCampaign) return <LoadingScreen />;

  return (
    <div className='bg-gray-50'>
      <main className='mt-16'>
        <div className='w-full max-w-2xl mx-auto px-4 py-6'>
          {error ? (
            <div className='text-blue-500 text-center py-4'>No Program Related</div>
          ) : (
            <>
              <div className='space-y-4'>
                {campaigns.slice(0, visibleCampaigns).map((campaign) => (
                  <SearchedCard
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
            </>
          )}
        </div>
        <Footer />
      </main>
    </div>
  );
}
