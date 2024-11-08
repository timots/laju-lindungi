import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import CardSlider from '@/components/card/cardSlider';
import HeaderSlider from '@/components/card/headerSlider';
import CardList from '@/components/card/cardList';
import Header from '@/components/header/HeaderSearch';
import CardSlider2 from '@/components/card/cardSlider2';
import Footer from '@/components/footer/footer';
import ProgramNavigation from '@/components/menu/donasiMenu';

export default function CharityHome() {
  return (
    <div>
      <Header />

      <main className=' mt-16'>
        <HeaderSlider />
        <ProgramNavigation />

        <CardSlider
          Header='Alirkan Pahalamu Dengan Berbagi'
          BgColour='bg-gradient-to-br from-blue-500 to-blue-600'
        />
        <HeaderSlider />

        <CardSlider
          Header='Kuatkan Palestine'
          BgColour='bg-gradient-to-br from-orange-200 to-orange-600'
        />
        <CardList />

        <CardSlider2 />

        <Footer />
      </main>
    </div>
  );
}
