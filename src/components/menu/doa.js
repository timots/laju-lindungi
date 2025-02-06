'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

const prayers = [
  {
    id: 1,
    name: 'Ainul Mardiah',
    timeAgo: '29 menit yang lalu',
    message: 'Semoga saudaraku Palestina selalu Allah berikan ketabahan dan kekuatan..',
  },
  {
    id: 2,
    name: 'Chitoj',
    timeAgo: '3 jam yang lalu',
    message: 'Bismillah Palestina we with u',
  },
  {
    id: 3,
    name: 'Hamba Allah',
    timeAgo: '3 jam yang lalu',
    message: 'Semoga bisa meringankan beban saudara muslim kami di Palestina Amiin 🤲',
  },
  {
    id: 4,
    name: 'Hamba Allah',
    timeAgo: '4 jam yang lalu',
    message: 'Semoga Allah melindungi saudara-saudaraku di Palestina, Aamiin',
  },
  {
    id: 5,
    name: 'Digna balida',
    timeAgo: '4 jam yang lalu',
    message: 'Sehat selalu ❤️',
  },
];

export default function PrayerList(data) {
  const [visiblePrayers, setVisiblePrayers] = useState(5);
  const orders = data?.data?.orders;

  function formatDateToIndonesian(createdAt) {
    const date = new Date(createdAt._seconds * 1000); // Konversi detik ke milidetik
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  const loadMore = () => {
    setVisiblePrayers((prev) => Math.min(prev + 5, orders.length));
  };

  return (
    <div className='w-full bg-gray-50 p-4 rounded-lg'>
      <h2 className='text-xl font-bold text-gray-800 mb-4'>Doa-doa orang baik ({orders?.length || '0'})</h2>

      <div className='space-y-4'>
        {orders.slice(0, visiblePrayers).map((prayer, index) => (
          <div
            key={index}
            className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='flex justify-between items-start mb-2'>
              <span className='font-medium text-gray-800'>{prayer?.contact_information?.name}</span>
              <span className='text-sm text-gray-500'> {formatDateToIndonesian(prayer.createdAt)}</span>
            </div>
            <p className='text-gray-600 mb-3'>{prayer?.additional_data?.msg}</p>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-red-500 flex items-center justify-center'>
                <Heart className='w-4 h-4 text-white' />
              </div>
              <button className='text-sm text-red-500 hover:text-red-600 font-medium'>Aaminn-kan doa ini</button>
            </div>
          </div>
        ))}
      </div>

      {visiblePrayers < prayers.length && (
        <div className='mt-4 flex justify-center'>
          <button
            onClick={loadMore}
            className='px-6 py-2 bg-gray-800 text-white rounded-full text-sm font-medium hover:bg-gray-700 transition-colors'>
            Loadmore
          </button>
        </div>
      )}
    </div>
  );
}
