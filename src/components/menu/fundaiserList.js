'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';

const fundraisers = [
  {
    id: 1,
    name: 'Netizen Budiman',
    donorCount: 625,
    amount: 'Rp 79.327.500',
  },
  {
    id: 2,
    name: 'Tim Darat',
    donorCount: 104,
    amount: 'Rp 11.220.000',
  },
  {
    id: 3,
    name: 'Tim Langit 2',
    donorCount: 52,
    amount: 'Rp 5.980.000',
  },
  {
    id: 4,
    name: 'Manchester United F.C.',
    donorCount: 19,
    amount: 'Rp 2.315.000',
  },
  {
    id: 5,
    name: 'Fundraiser 1',
    donorCount: 2,
    amount: 'Rp 1.540.000',
  },
  {
    id: 6,
    name: 'Komunitas Peduli',
    donorCount: 87,
    amount: 'Rp 9.875.000',
  },
  {
    id: 7,
    name: 'Relawan Sejati',
    donorCount: 35,
    amount: 'Rp 4.250.000',
  },
  {
    id: 8,
    name: 'Tim Langit 1',
    donorCount: 63,
    amount: 'Rp 7.150.000',
  },
  {
    id: 9,
    name: 'Sahabat Palestina',
    donorCount: 142,
    amount: 'Rp 15.680.000',
  },
  {
    id: 10,
    name: 'Gerakan Peduli Sesama',
    donorCount: 95,
    amount: 'Rp 10.525.000',
  },
];

export default function FundraiserList() {
  const [visibleFundraisers, setVisibleFundraisers] = useState(5);

  const loadMore = () => {
    setVisibleFundraisers((prev) => Math.min(prev + 5, fundraisers.length));
  };

  return (
    <div className='w-full mt-10'>
      <h2 className='text-xl font-bold text-gray-800 mb-4'>Fundraiser ({fundraisers.length})</h2>

      <div className='space-y-4'>
        {fundraisers.slice(0, visibleFundraisers).map((fundraiser) => (
          <div
            key={fundraiser.id}
            className='bg-gray-50 rounded-lg p-4 border border-gray-100'>
            <a
              href='#'
              className='text-blue-600 hover:text-blue-700 font-medium'>
              {fundraiser.name}
            </a>
            <div className='text-gray-600 mt-1'>Berhasil mengajak {fundraiser.donorCount} orang untuk berdonasi.</div>
            <div className='text-lg font-semibold text-gray-800 mt-1'>{fundraiser.amount}</div>
          </div>
        ))}
      </div>

      {visibleFundraisers < fundraisers.length && (
        <div className='mt-4 flex justify-center'>
          <button
            onClick={loadMore}
            className='px-6 py-2 bg-gray-800 text-white rounded-full text-sm font-medium hover:bg-gray-700 transition-colors'>
            Loadmore
          </button>
        </div>
      )}

      <div className='mt-8 text-center'>
        <p className='text-gray-600 mb-4'>Mari jadi Fundraiser dan berikan manfaat bagi program ini.</p>
        <button className='w-full flex items-center justify-center gap-2 px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors'>
          <Users className='w-5 h-5' />
          <span>Jadi Fundraiser</span>
        </button>
      </div>
    </div>
  );
}
