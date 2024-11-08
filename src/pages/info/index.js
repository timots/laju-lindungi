import React from 'react';
import Header from '@/components/header/HeaderSearch';
import CardSlider2 from '@/components/card/cardSlider2';
import Footer from '@/components/footer/footer';
import CardBig from '@/components/card/cardBig';

export default function InfoPage() {
  return (
    <div className='bg-gray-50'>
      <Header />

      <main className=' mt-16'>
        <CardBig />
        <CardSlider2 />

        <Footer />
      </main>
    </div>
  );
}
