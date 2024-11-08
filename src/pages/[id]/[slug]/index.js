'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MapPin, Clock, CheckCircle2 } from 'lucide-react';
import CampaignTabs from '@/components/tabs/campaignTabs';
import FundraiserList from '@/components/menu/fundaiserList';
import PrayerList from '@/components/menu/doa';

const allCampaigns = [
  {
    id: 1,
    title: 'Hebatkan Aksi Nyata dengan Infaq Gandum Palestina',
    image: '/placeholder.svg?height=200&width=400',
    organization: 'Yayasan Langkah Maju Peduli',
    collected: 'Rp 158.362.594',
    progress: 75,
    donors: ['R', 'R', 'Z', 'K'],
    donorCount: '2K+',
  },
  {
    id: 2,
    title: 'Sedekah Air Untuk Saudara Palestina',
    image: '/placeholder.svg?height=200&width=400',
    organization: 'Yayasan Langkah Maju Peduli',
    collected: 'Rp 26.249.350',
    progress: 45,
    donors: ['M', 'E', 'D'],
    donorCount: '244',
  },
  {
    id: 3,
    title: 'Bantu Hunian Darurat Palestina',
    image: '/placeholder.svg?height=200&width=400',
    organization: 'Yayasan Langkah Maju Peduli',
    collected: 'Rp 160.000',
    progress: 15,
    donors: ['H', 'R', 'J'],
    donorCount: '16+',
  },
  {
    id: 4,
    title: 'Bangun MCK Untuk Pelosok Negeri',
    image: '/placeholder.svg?height=200&width=400',
    organization: 'Yayasan Langkah Maju Peduli',
    collected: 'Rp 120.000',
    progress: 25,
    donors: ['D', 'G', 'I'],
    donorCount: '',
  },
  {
    id: 5,
    title: 'Bersama Bantu Penuhi Kebutuhan Beras Santri',
    image: '/placeholder.svg?height=200&width=400',
    organization: 'Yayasan Langkah Maju Peduli',
    collected: 'Rp 135.043',
    progress: 30,
    donors: ['S', 'H', 'Z'],
    donorCount: '8+',
  },
];

// Dummy data for updates and donors
const updates = [
  {
    date: 'September, 17 2024',
    title: 'Alhamdulillah 5 Ton Bantuan Pangan Berupa Gandum Telah Sukses Di Salurkan!',
  },
  {
    date: 'August, 16 2024',
    title: 'Alhamdulillah 17 TON Gandum Palestina Sukses Di Salurkan',
  },
  {
    date: 'July, 16 2024',
    title: 'PENDISTRIBUSIAN 10 TON GANDUM PALESTINA',
  },
  {
    date: 'July, 24 2024',
    title: 'Pendistribusian 5 Ton Gandum',
  },
  {
    date: 'June, 6 2024',
    title: 'Campaign is published',
  },
];

const donors = [
  { name: 'Rosmawati', amount: 'Rp 75.000', timeAgo: '1 jam yang lalu' },
  { name: 'Chitoj', amount: 'Rp 35.000', timeAgo: '2 jam yang lalu' },
  { name: 'Hamba Allah', amount: 'Rp 75.000', timeAgo: '3 jam yang lalu' },
  { name: 'Hamba Allah', amount: 'Rp 210.000', timeAgo: '3 jam yang lalu' },
  { name: 'Digna balida', amount: 'Rp 35.000', timeAgo: '4 jam yang lalu' },
];

export default function CampaignDetail() {
  const router = useRouter();

  const dataActive = router?.query?.slug;
  const formattedDataActive = dataActive
    ?.split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const campaign = useMemo(() => {
    return allCampaigns.find((c) => c.title === formattedDataActive) || allCampaigns[0];
  }, [formattedDataActive]);

  return (
    <div className='w-full max-w-md mx-auto bg-white'>
      <div className='relative'>
        <Image
          src='/placeholder.svg?height=300&width=600'
          alt={campaign.title}
          width={600}
          height={300}
          className='w-full h-[200px] object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex flex-col justify-end p-4'>
          <h1 className='text-white text-2xl font-bold mb-2'>{campaign.title}</h1>
          <h2 className='text-white text-xl font-bold mb-2'>{campaign.organization}</h2>
          <p className='text-white text-sm'>{campaign.title}</p>
        </div>
      </div>

      <div className='p-4'>
        <div className='flex items-center gap-2 text-gray-600 mb-4'>
          <MapPin className='w-4 h-4' />
          <span className='text-sm'>Gaza, Palestina</span>
        </div>

        <div className='space-y-3 mb-6'>
          <div className='flex justify-between items-end'>
            <span className='text-2xl font-bold'>{campaign.collected}</span>
            <span className='text-sm text-gray-500'>terkumpul dari Rp 100.000.000</span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div
              className='bg-orange-500 h-2 rounded-full'
              style={{ width: `${campaign.progress}%` }}
            />
          </div>
          <div className='flex justify-between text-sm text-gray-600'>
            <span>1233 Donasi</span>
            <div className='flex items-center gap-1'>
              <Clock className='w-4 h-4' />
              <span>∞ hari lagi</span>
            </div>
          </div>
        </div>

        <button
          className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors'
          onClick={() => {
            router.push({
              pathname: `/${router.asPath}/donasi-sekarang`,
              query: {
                id: campaign.id,
                title: campaign.title,
              },
            });
          }}>
          Infaq Sekarang!
        </button>

        <div className='mt-6 border-t pt-4'>
          <div className='flex items-center gap-3'>
            <Image
              src='/placeholder.svg?height=50&width=50'
              alt='Yayasan Logo'
              width={50}
              height={50}
              className='rounded-full'
            />
            <div>
              <h3 className='font-medium'>Yayasan Langkah Maju Peduli</h3>
              <div className='flex items-center gap-1 text-sm text-gray-600'>
                <span>.org</span>
                <span>Verified Organization</span>
                <CheckCircle2 className='w-4 h-4 text-blue-500' />
              </div>
            </div>
          </div>
        </div>

        <CampaignTabs
          updates={updates}
          donors={donors}
        />
        <FundraiserList />
        <PrayerList />
      </div>
    </div>
  );
}
