'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function GalangHeader() {
  const { t } = useTranslation();

  return (
    <div className='bg-gray-50 flex flex-col items-center px-4 mb-10'>
      <div className='w-full max-w-md text-center space-y-6'>
        <h1 className='text-3xl font-bold text-blue-600'>{t('galang page.header title')}</h1>

        <p className='text-gray-800'>
          {t('galang page.header text 1')}
          <span className='text-blue-600'>Lajupeduli.org</span>
          {t('galang page.header text 2')}
          <span className='text-red-600'>{t('galang page.header text 3')}</span>.
        </p>

        <p className='text-gray-800'>{t('galang page.header text 4')}</p>

        <p className='text-gray-800'>
          {t('galang page.header text 6')}
          <span className='text-blue-600'>Lajupeduli.org</span>
        </p>

        <div className='space-y-4 pt-4'>
          <Link
            href='/daftar'
            className='block w-full bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors'>
            {t('galang page.button register')}
          </Link>

          <div className='text-gray-600'>{t('galang page.description button')}</div>

          <Link
            href='/masuk'
            className='block w-full bg-orange-500 text-white py-3 px-6 rounded-md text-lg font-medium hover:bg-orange-600 transition-colors'>
            {t('galang page.button Login')}
          </Link>
        </div>
      </div>
    </div>
  );
}
