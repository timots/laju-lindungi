import React from 'react';
import Header from '@/components/header/HeaderSearch';
import Footer from '@/components/footer/footer';
import CampaignListCard from '@/components/card/cardList2';

export default function InfoPage() {
  const handleTypesenseSearch = async (search) => {
    const searchParameters = {
      q: search,
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

      // setVariants(newData);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className='bg-gray-50'>
      <Header />
      <main className=' mt-16'>
        <CampaignListCard />
        <Footer />
      </main>
    </div>
  );
}
