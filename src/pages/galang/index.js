import React from 'react';
import Header from '@/components/header/HeaderSearch';
import CardSlider2 from '@/components/card/cardSlider2';
import Footer from '@/components/footer/footer';
import GalangHeader from '@/components/header/GalangHeader';

export default function GalangPage() {
  return (
    <div className='bg-gray-50'>
      <Header />

      <main className=' mt-16'>
        <GalangHeader />
        <CardSlider2 />

        <Footer />
      </main>
    </div>
  );
}
