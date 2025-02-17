'use client';

import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function CampaignTabs({ data }) {
  const [activeTab, setActiveTab] = useState('keterangan');
  const [visibleDonors, setVisibleDonors] = useState(3);
  const [expandedUpdateId, setExpandedUpdateId] = useState(null);
  const updates = data?.history;
  const orders = data?.orders;

  function formatDateToIndonesian(createdAt) {
    const date = new Date(createdAt._seconds * 1000);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  const loadMoreDonors = () => {
    setVisibleDonors((prev) => prev + 5);
  };

  const toggleUpdate = (index) => {
    setExpandedUpdateId(expandedUpdateId === index ? null : index);
  };

  return (
    <div className='mt-6 min-h-96'>
      <div className='flex border-b'>
        {['keterangan', 'kabar', 'donatur'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 -mb-px transition-all duration-200 focus:outline-none
              ${activeTab === tab ? 'text-blue-500 border-b-2 border-blue-500 font-medium' : 'text-gray-500 hover:text-blue-500'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'kabar' && ` (${updates?.length || 0})`}
            {tab === 'donatur' && ` (${orders?.length || '0'})`}
          </button>
        ))}
      </div>

      <div className='mt-4'>
        {activeTab === 'kabar' && (
          <div className='space-y-6'>
            {updates?.map((update, index) => (
              <div
                key={index}
                className='relative pl-6'>
                <div className='absolute left-0 top-2 w-3 h-3 bg-blue-500 rounded-full' />
                <div className='text-sm text-gray-500 mb-1'>{formatDateToIndonesian(update?.createdAt)}</div>
                <div className='space-y-2'>
                  <div
                    className='flex items-center justify-between cursor-pointer'
                    onClick={() => update.des && toggleUpdate(index)}>
                    <div className='font-medium pr-4'>{update.title}</div>
                    {update.des && (expandedUpdateId === index ? <ChevronDown className='w-5 h-5 text-gray-400 flex-shrink-0' /> : <ChevronRight className='w-5 h-5 text-gray-400 flex-shrink-0' />)}
                  </div>
                  {expandedUpdateId === index && update.des && (
                    <div
                      className='text-gray-600 pl-4 pt-2'
                      dangerouslySetInnerHTML={{ __html: update.des }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'donatur' && (
          <div className='space-y-4'>
            {orders.slice(0, visibleDonors).map((donor, index) => (
              <div
                key={index}
                className='bg-white p-4 rounded-lg shadow-sm'>
                <div className='flex justify-between items-start'>
                  <span className='font-medium'>{donor?.contact_information?.name}</span>
                  <span className='text-sm text-gray-500'>{formatDateToIndonesian(donor?.createdAt)}</span>
                </div>
                <div className='text-green-600 text-sm mt-1'>Berdonasi sebesar {donor.amount}</div>
              </div>
            ))}
            {visibleDonors < orders.length && (
              <button
                onClick={loadMoreDonors}
                className='w-full py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium focus:outline-none'>
                Loadmore
              </button>
            )}
          </div>
        )}

        {activeTab === 'keterangan' && (
          <div
            className='prose prose-lg max-w-none prose-headings:text-gray-900 
              prose-p:text-gray-600 prose-a:text-blue-600 prose-strong:text-gray-900'>
            <div
              className='break-words overflow-hidden'
              dangerouslySetInnerHTML={{
                __html: data?.guide || '<p>Keterangan kampanye akan ditampilkan di sini.</p>',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
