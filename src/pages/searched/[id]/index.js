import Footer from '@/components/footer/footer';
import { useRouter } from 'next/router';
import { TypesenseRestApi } from '@/api/typesenseApi';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useUserStore from '@/hooks/zustand';
import { LoadingScreen } from '@/components/loading/loadingScreen';

export default function InfoPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [visibleCampaigns, setVisibleCampaigns] = useState(5);

  const handleTypesenseSearch = async () => {
    const searchParameters = {
      q: router?.query?.id,
      query_by: 'name',
      filter_by: `companyId:${'vrWcmcy7wEw1BUkQP3l9'} && projectId:${'HWMHbyA6S12FXzVwcru7'}`,
      sort_by: '_text_match:desc',
    };
    try {
      const response = await TypesenseRestApi({
        collection: 'crm_product',
        ...searchParameters,
      });

      const newData = response?.hits?.map((y) => {
        return { ...y.document };
      });

      let campaign = [];

      if (newData.length > 0) {
        // Process each item in newData
        for (const item of newData) {
          try {
            const response = await axios.post('/api/v1/article/read', { productId: item.id });
            // Store response.data.data in campaign array
            if (response.data.data) {
              campaign.push(response.data.data);
            }
          } catch (error) {
            console.error(error.message);
            setError('Gagal memuat data kampanye.');
          }
        }
      }

      setCampaigns(campaign);
      return campaign;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const loadMore = () => {
    setVisibleCampaigns((prev) => Math.min(prev + 5, campaigns.length));
  };

  useEffect(() => {
    if (router?.query?.id !== undefined) {
      handleTypesenseSearch();
    }
  }, [router.query?.id]);

  return (
    <div className='bg-gray-50'>
      <main className=' mt-16'>
        <div className='w-full max-w-2xl mx-auto px-4 py-6'>
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
        </div>
        <Footer />
      </main>
    </div>
  );
}
