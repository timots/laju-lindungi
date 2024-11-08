'use client';

import Image from 'next/image';
import Link from 'next/link';

const bankAccounts = [
  {
    name: 'Bank Central Asia (BCA)',
    accountNumber: '680 1259 674',
    accountName: 'A.n. Langkah Maju Peduli',
    bankCode: '014',
    logo: '/placeholder.svg?height=50&width=100',
  },
  {
    name: 'Bank Mandiri',
    accountNumber: '1010 0333 88875',
    accountName: 'A.n. Langkah Maju Peduli',
    bankCode: '008',
    logo: '/placeholder.svg?height=50&width=100',
  },
  {
    name: 'Bank Syariah Indonesia (BSI)',
    accountNumber: '714 8351 915',
    accountName: 'A.n. Langkah Maju Peduli',
    bankCode: '451',
    logo: '/placeholder.svg?height=50&width=100',
  },
  {
    name: 'Bank Rakyat Indonesia (BRI)',
    accountNumber: '22350 1000 171301',
    accountName: 'A.n. Langkah Maju Peduli',
    bankCode: '002',
    logo: '/placeholder.svg?height=50&width=100',
  },
  {
    name: 'Bank Negara Indonesia (BNI)',
    accountNumber: '897 3331 119',
    accountName: 'A.n. Langkah Maju Peduli',
    bankCode: '114',
    logo: '/placeholder.svg?height=50&width=100',
  },
];

export default function BankAccounts() {
  return (
    <div className='flex flex-col  bg-white'>
      <div className='max-w-md mx-auto w-full px-4 py-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>Nomor Rekening Laju Peduli</h1>

        <div className='space-y-4'>
          {bankAccounts.map((bank, index) => (
            <div
              key={index}
              className='bg-white rounded-lg overflow-hidden shadow-sm'>
              <div className='bg-sky-400 text-white px-4 py-2'>
                <h2 className='text-lg font-medium'>{bank.name}</h2>
              </div>
              <div className='p-4'>
                <div className='flex items-start justify-between'>
                  <div className='space-y-2'>
                    <p className='text-2xl font-bold text-gray-800'>{bank.accountNumber}</p>
                    <p className='text-gray-800 font-medium'>{bank.accountName}</p>
                    <p className='text-sm'>
                      Kode <span className='text-red-600'>Bank: {bank.bankCode}</span>
                    </p>
                  </div>
                  <div className='w-24'>
                    <Image
                      src={bank.logo}
                      alt={bank.name}
                      width={100}
                      height={50}
                      className='w-full h-auto'
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-8 text-center space-y-4'>
          <p className='text-gray-800 font-medium'>Hebatkan Pedulimu Dengan Klik Donasi Sekarang</p>
          <Link
            href='/donasi'
            className='inline-block w-full bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors'>
            Ayo Berdonasi Sekarang!
          </Link>
        </div>
      </div>
    </div>
  );
}
