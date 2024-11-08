'use client';

import { useState } from 'react';

export default function CampaignTabs({ donors, updates }) {
  const [activeTab, setActiveTab] = useState('keterangan');
  const [visibleDonors, setVisibleDonors] = useState(3);

  const loadMoreDonors = () => {
    setVisibleDonors((prev) => prev + 5);
  };

  return (
    <div className='mt-6 min-h-96'>
      <div className='flex border-b'>
        <button
          onClick={() => setActiveTab('keterangan')}
          className={`px-4 py-2 -mb-px ${activeTab === 'keterangan' ? 'text-blue-500 border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}>
          Keterangan
        </button>
        <button
          onClick={() => setActiveTab('kabar')}
          className={`px-4 py-2 -mb-px ${activeTab === 'kabar' ? 'text-blue-500 border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}>
          Kabar Terbaru (4)
        </button>
        <button
          onClick={() => setActiveTab('donatur')}
          className={`px-4 py-2 -mb-px ${activeTab === 'donatur' ? 'text-blue-500 border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}>
          Donatur (1234)
        </button>
      </div>

      <div className='mt-4'>
        {activeTab === 'kabar' && (
          <div className='space-y-6'>
            {updates.map((update, index) => (
              <div
                key={index}
                className='relative pl-6'>
                <div className='absolute left-0 top-2 w-3 h-3 bg-blue-500 rounded-full' />
                <div className='text-sm text-gray-500 mb-1'>{update.date}</div>
                <div className='flex items-center justify-between'>
                  <div className='font-medium pr-4'>{update.title}</div>
                  {update.hasDetail && <ChevronRight className='w-5 h-5 text-gray-400 flex-shrink-0' />}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'donatur' && (
          <div className='space-y-4'>
            {donors.slice(0, visibleDonors).map((donor, index) => (
              <div
                key={index}
                className='bg-white p-4 rounded-lg shadow-sm'>
                <div className='flex justify-between items-start'>
                  <span className='font-medium'>{donor.name}</span>
                  <span className='text-sm text-gray-500'>{donor.timeAgo}</span>
                </div>
                <div className='text-green-600 text-sm mt-1'>Berdonasi sebesar {donor.amount}</div>
              </div>
            ))}
            {visibleDonors < donors.length && (
              <button
                onClick={loadMoreDonors}
                className='w-full py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium'>
                Loadmore
              </button>
            )}
          </div>
        )}

        {activeTab === 'keterangan' && (
          <div className='text-gray-600'>
            <p>Keterangan kampanye akan ditampilkan di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
