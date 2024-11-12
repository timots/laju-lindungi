import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className='w-full bg-white px-4 py-8'>
      <div className='flex flex-col items-center text-center'>
        {/* Logo */}
        <img
          src='/placeholder.svg'
          alt='LajuPeduli Logo'
          width={120}
          height={40}
          className='mb-4'
        />

        {/* Mission Statement */}
        <p className='mb-4 text-sm'>
          <span className='font-semibold'>Laju Peduli</span> {t('title content.organization')}
        </p>

        {/* Registration Number */}
        <p className='mb-6 text-sm font-medium'>KEP. UPZ/020 TAHUN 2023</p>

        {/* Anti-Corruption Statement */}
        <div className='mb-8 rounded-lg border border-dashed border-gray-300 p-4 text-sm'>
          <p className='text-center'>{t('title content.organization2')}</p>
        </div>

        {/* Payment Methods */}
        <div className='mb-8'>
          <h3 className='mb-4 text-lg font-semibold'>{t('title content.footer')}</h3>
          <div className='grid grid-cols-4 gap-4'>
            {/* Bank logos - First row */}
            <img
              src='/payment logo/BCA.png'
              alt='BCA'
              width={60}
              height={30}
            />
            <img
              src='/payment logo/mandiri.png'
              alt='Mandiri'
              width={60}
              height={30}
            />
            <img
              src='/payment logo/BNI.png'
              alt='BSI'
              width={60}
              height={30}
            />
            <img
              src='/payment logo/BRI.png'
              alt='BRI'
              width={60}
              height={30}
            />
            {/* Bank logos - Second row */}
            <img
              src='/payment logo/CIMB.png'
              alt='BNI'
              width={60}
              height={30}
            />
            <img
              src='/payment logo/alfamart.png'
              alt='Bank Muamalat'
              width={60}
              height={30}
            />
            <img
              src='/payment logo/gopay.png'
              alt='Danamon'
              width={60}
              height={30}
            />
            <img
              src='/payment logo/qris.png'
              alt='CIMB'
              width={60}
              height={30}
            />
          </div>
        </div>

        {/* Digital Channels */}
        <div className='mb-8'>
          <h3 className='mb-4 text-lg font-semibold'>{t('title content.footer2')}</h3>
          <div className='grid grid-cols-3 gap-4'>
            <img
              src='/placeholder.svg'
              alt='Kitabisa'
              width={100}
              height={40}
            />
            <img
              src='/placeholder.svg'
              alt='Amalsholeh'
              width={100}
              height={40}
            />
            <img
              src='/placeholder.svg'
              alt='Bersedekah'
              width={100}
              height={40}
            />
            <img
              src='/placeholder.svg'
              alt='Tokopedia'
              width={100}
              height={40}
            />
            <img
              src='/placeholder.svg'
              alt='Shopee'
              width={100}
              height={40}
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className='mb-4 text-lg font-semibold'>{t('title content.footer3')}:</h3>
          <div className='flex justify-center gap-4'>
            <Link
              href='#'
              className='rounded-full bg-[#1877F2] p-3 text-white'>
              <Facebook size={24} />
            </Link>
            <Link
              href='#'
              className='rounded-full bg-gradient-to-br from-[#fa7e1e] via-[#d62976] to-[#962fbf] p-3 text-white'>
              <Instagram size={24} />
            </Link>
            <Link
              href='#'
              className='rounded-full bg-black p-3 text-white'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='currentColor'>
                <path d='M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z' />
              </svg>
            </Link>
            <Link
              href='#'
              className='rounded-full bg-[#25D366] p-3 text-white'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='currentColor'>
                <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
              </svg>
            </Link>
            <Link
              href='#'
              className='rounded-full bg-[#FF0000] p-3 text-white'>
              <Youtube size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
