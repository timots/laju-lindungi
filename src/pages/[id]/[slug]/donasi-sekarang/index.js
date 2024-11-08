'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';

const donationOptions = [
  {
    id: 1,
    title: '2kg Gandum',
    price: 'Rp 35.000',
    image: '/placeholder.svg?height=350&width=500',
  },
  {
    id: 2,
    title: '4kg Gandum',
    price: 'Rp 75.000',
    image: '/placeholder.svg?height=350&width=500',
  },
  {
    id: 3,
    title: '6kg Gandum',
    price: 'Rp 105.000',
    image: '/placeholder.svg?height=350&width=500',
  },
  {
    id: 4,
    title: '10kg Gandum',
    price: 'Rp 175.000',
    image: '/placeholder.svg?height=350&width=500',
  },
  {
    id: 5,
    title: '1 Keluarga',
    subtitle: 'untuk 2 pekan',
    price: 'Rp 560.000',
    image: '/placeholder.svg?height=350&width=500',
  },
  {
    id: 6,
    title: '1 Keluarga',
    subtitle: 'untuk 1 bulan',
    price: 'Rp 980.000',
    image: '/placeholder.svg?height=350&width=500',
  },
];

export default function DonationPage() {
  const router = useRouter();
  const [selectedSalutation, setSelectedSalutation] = useState('Bapak');
  const [hideIdentity, setHideIdentity] = useState(false);
  const { id, title, collected, progress, organization } = router.query;
  console.log(router, 'ini router donasi');

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='sticky top-0 bg-white border-b z-10'>
        <div className='max-w-md mx-auto px-4 h-14 flex items-center'>
          <button
            onClick={() => router.back()}
            className='p-2 -ml-2'>
            <ChevronLeft className='w-6 h-6' />
          </button>
          <h1 className='ml-2 text-lg font-medium truncate'>{title}.</h1>
        </div>
      </div>

      <div className='max-w-md mx-auto px-4 py-4'>
        {/* Campaign Banner */}
        <div className='mb-6'>
          <Image
            src='/placeholder.svg?height=200&width=400'
            alt='Campaign Banner'
            width={400}
            height={200}
            className='w-full rounded-lg'
          />
          <h2 className='text-xl font-bold mt-4'>{title}</h2>
        </div>

        {/* Donation Options */}
        <div className='space-y-4 mb-6'>
          {donationOptions.map((option) => (
            <div
              key={option.id}
              className='bg-white rounded-lg p-4 flex items-center shadow-sm'>
              <Image
                src={option.image}
                alt={option.title}
                width={100}
                height={100}
                className='w-24 h-24 rounded-lg object-cover'
              />
              <div className='ml-4 flex-1'>
                <h3 className='font-medium'>{option.title}</h3>
                {option.subtitle && <p className='text-sm text-blue-600'>{option.subtitle}</p>}
                <p className='text-gray-900 font-medium mt-1'>{option.price}</p>
              </div>
              <button className='bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors'>+ Add</button>
            </div>
          ))}
        </div>

        {/* Donation Form */}
        <div className='bg-white rounded-lg p-4 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <Image
                src='/placeholder.svg?height=40&width=40'
                alt='Payment'
                width={40}
                height={40}
                className='w-10 h-10'
              />
              <span className='text-gray-700'>Metode Pembayaran</span>
            </div>
            <button className='text-blue-600 px-4 py-2 border border-blue-600 rounded-lg'>Pilih</button>
          </div>

          <div className='mb-4'>
            <p className='mb-2'>Sapaan :</p>
            <div className='flex gap-2'>
              {['Bapak', 'Ibu', 'Kak'].map((salutation) => (
                <button
                  key={salutation}
                  onClick={() => setSelectedSalutation(salutation)}
                  className={`px-6 py-2 rounded-lg ${selectedSalutation === salutation ? 'bg-blue-600 text-white' : 'border text-gray-600'}`}>
                  {salutation}
                </button>
              ))}
            </div>
          </div>

          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Nama Lengkap'
              className='w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>Sembunyikan nama saya (Hamba Allah)</span>
              <button
                onClick={() => setHideIdentity(!hideIdentity)}
                className={`w-12 h-6 rounded-full transition-colors ${hideIdentity ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${hideIdentity ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <input
              type='tel'
              placeholder='No Whatsapp atau Handphone'
              className='w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <input
              type='email'
              placeholder='Email (optional)'
              className='w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <textarea
              placeholder='Tuliskan pesan atau doa disini (optional)'
              rows={4}
              className='w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        <button className='w-full bg-blue-600 text-white py-4 rounded-lg font-medium mt-6 hover:bg-blue-700 transition-colors'>Infaq Sekarang!</button>
      </div>
    </div>
  );
}
