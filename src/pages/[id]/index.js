import React from 'react';
import Header from '@/components/header/HeaderSearch';
import Footer from '@/components/footer/footer';
import CampaignListCard from '@/components/card/cardList2';
import CardList from '@/components/card/cardList';
import CardSlider2 from '@/components/card/cardSlider2';

export default function InfoPage() {
  return (
    <div className='bg-gray-50'>
      <Header />

      <main className=' mt-16'>
        <CampaignListCard />
        <CardSlider2 />

        <Footer />
      </main>
    </div>
  );
}
