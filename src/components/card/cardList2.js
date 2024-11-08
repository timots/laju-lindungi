'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/router';

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
].concat(
  Array.from({ length: 15 }, (_, i) => ({
    id: i + 6,
    title: `Campaign ${i + 6}`,
    image: '/placeholder.svg?height=200&width=400',
    organization: 'Yayasan Langkah Maju Peduli',
    collected: `Rp ${Math.floor(Math.random() * 1000000)}`,
    progress: Math.floor(Math.random() * 100),
    donors: ['A', 'B', 'C'],
    donorCount: `${Math.floor(Math.random() * 100)}+`,
  }))
);

function CampaignCard({ campaign }) {
  const router = useRouter();

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };
  console.log(router, 'ini router');

  const handleCardClick = () => {
    const slug = createSlug(campaign.title);
    router.push(`${router.asPath}/${slug}`);
  };

  return (
    <div
      className='bg-white rounded-lg shadow-sm overflow-hidden p-4 cursor-pointer'
      onClick={handleCardClick}>
      <div className='flex gap-4'>
        <div className='w-1/3 flex-shrink-0'>
          <Image
            src={campaign.image}
            alt={campaign.title}
            width={400}
            height={200}
            className='w-full h-auto rounded-lg'
          />
        </div>
        <div className='w-2/3 flex flex-col'>
          <h3 className='font-bold text-gray-800 mb-1'>{campaign.title}</h3>
          <div className='flex items-center gap-1 mb-2'>
            <span className='text-gray-600 text-sm'>{campaign.organization}</span>
            <CheckCircle2 className='w-4 h-4 text-blue-500' />
          </div>
          <div className='mt-auto'>
            <div className='flex justify-between items-center mb-1'>
              <span className='font-bold text-orange-500'>{campaign.collected}</span>
              <span className='text-sm text-gray-500'>terkumpul</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-1.5 mb-3'>
              <div
                className='bg-orange-500 h-1.5 rounded-full'
                style={{ width: `${campaign.progress}%` }}
              />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex -space-x-2'>
                {campaign.donors.map((donor, index) => (
                  <div
                    key={index}
                    className='w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-medium ring-2 ring-white'>
                    {donor}
                  </div>
                ))}
                {campaign.donorCount && <div className='w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-medium ring-2 ring-white'>{campaign.donorCount}</div>}
              </div>
              <button className='text-gray-400'>∞</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CampaignListCard() {
  const [visibleCampaigns, setVisibleCampaigns] = useState(5);

  const loadMore = () => {
    setVisibleCampaigns((prev) => Math.min(prev + 5, allCampaigns.length));
  };

  return (
    <div className='w-full max-w-md mx-auto px-4 py-6'>
      <div className='space-y-4'>
        {allCampaigns.slice(0, visibleCampaigns).map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
          />
        ))}
      </div>

      {visibleCampaigns < allCampaigns.length && (
        <div className='mt-6 text-center'>
          <button
            onClick={loadMore}
            className='bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors'>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
