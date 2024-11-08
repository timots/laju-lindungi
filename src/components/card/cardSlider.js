import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const campaigns = [
  {
    id: 1,
    title: 'Sedekah Subuh, Awali Hari Dengan Amalan Baik',
    image: 'https://via.placeholder.com/400x200',
    organization: 'Yayasan Langkah Maju Peduli',
    raised: 'Rp 2.150.000',
    target: 'Rp 5.000.000',
    progress: 43,
    verified: true,
  },
  {
    id: 2,
    title: 'Bantu Bu Munawaroh Dapatkan Kaki Palsu',
    image: '/placeholder.svg?height=200&width=400',
    organization: 'Yayasan Langkah Maju Peduli',
    raised: 'Rp 225.000',
    target: 'Rp 1.000.000',
    progress: 22,
    verified: true,
  },
  {
    id: 3,
    title: 'Bantu Pembangunan Masjid Al-Ikhlas',
    image: '/placeholder.svg?height=200&width=400',
    organization: 'Yayasan Langkah Maju Peduli',
    raised: 'Rp 1.750.000',
    target: 'Rp 3.000.000',
    progress: 58,
    verified: true,
  },
  {
    id: 4,
    title: 'Bantu Anak Yatim Mendapatkan Pendidikan',
    image: '/placeholder.svg?height=200&width=400',
    organization: 'Yayasan Langkah Maju Peduli',
    raised: 'Rp 3.500.000',
    target: 'Rp 10.000.000',
    progress: 35,
    verified: true,
  },
];

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

const CampaignCard = ({ campaign }) => {
  const router = useRouter();

  const handleCardClick = () => {
    const slug = createSlug(campaign.title);
    router.push(`${router.asPath}/campaign/${slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className='block cursor-pointer'>
      <div className='bg-white rounded-xl overflow-hidden shadow-lg'>
        <div className='relative'>
          <Image
            src={campaign.image}
            alt={campaign.title}
            width={400}
            height={200}
            className='w-full h-48 object-cover'
          />
          {campaign.verified && <div className='absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded'>Verified</div>}
        </div>
        <div className='p-4'>
          <h3 className='font-semibold text-gray-800 mb-2 line-clamp-2'>{campaign.title}</h3>
          <p className='text-sm text-gray-600 mb-3'>{campaign.organization}</p>
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span className='font-semibold text-orange-500'>{campaign.raised}</span>
              <span className='text-gray-500'>terkumpul</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-orange-500 h-2 rounded-full'
                style={{ width: `${campaign.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardSlider = ({ Header, BgColour }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(campaigns.length / 2);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className={`p-8 ${BgColour}`}>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl md:text-3xl font-bold text-white mb-6 text-center'>{Header}</h2>
        <div className='relative'>
          <div className='overflow-hidden'>
            <div
              className='flex transition-transform duration-300 ease-in-out'
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {Array.from({ length: totalSlides }).map((_, index) => (
                <div
                  key={index}
                  className='w-full flex-shrink-0 flex gap-6'>
                  {campaigns.slice(index * 2, index * 2 + 2).map((campaign) => (
                    <div
                      key={campaign.id}
                      className='w-1/2'>
                      <CampaignCard campaign={campaign} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className='absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </div>
        <div className='flex justify-center gap-2 mt-6'>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white opacity-50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
