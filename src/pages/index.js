import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Home, Info, HandHeart, Trophy, User, Search, CheckCircle2 } from 'lucide-react';
import CardSlider from '@/components/card/cardSlider';
import HeaderSlider from '@/components/card/headerSlider';
import CardList from '@/components/card/cardList';

export default function CharityHome() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='fixed top-0 w-full z-50 bg-gradient-to-r from-blue-500 to-blue-600 p-4'>
        <div className='flex items-center gap-2 max-w-lg mx-auto'>
          <Image
            src='/placeholder.svg'
            alt='LajuPeduli Logo'
            width={40}
            height={40}
            className='rounded-full bg-white p-1'
          />
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <Input
              className='w-full pl-10 bg-white/90 border-0'
              placeholder='Cari campaign...'
              type='search'
            />
          </div>
        </div>
      </header>

      <main className='flex-1 max-w-lg mx-auto w-full pt-20 pb-16'>
        {/* Hero Banner */}
        <HeaderSlider />

        {/* Category Icons */}
        <CardSlider />

        {/* Campaign Sections */}
        <CardList />

        {/* Palestine Support Section */}
        <div className='p-4 bg-orange-50'>
          <h2 className='text-2xl font-bold mb-2'>Kuatkan Palestina</h2>
          <p className='text-gray-600 mb-4'>Berikan Dukungan Kemanusiaan Untuk Palestina!</p>
          <div className='grid gap-4'>
            <Card>
              <CardContent className='p-3'>
                <Image
                  src='/placeholder.svg'
                  alt='Palestine Campaign'
                  width={400}
                  height={200}
                  className='w-full h-48 object-cover rounded-lg mb-3'
                />
                <div className='flex items-center gap-2 mb-2'>
                  <span className='text-sm font-medium'>Yayasan Langkah Maju Peduli</span>
                  <CheckCircle2 className='w-4 h-4 text-blue-500' />
                </div>
                <h3 className='font-bold mb-2'>Yuk Jadi Orangtua Asuh Yatim Palestina</h3>
                <div className='flex items-center justify-between text-sm'>
                  <span className='font-bold text-orange-500'>Rp 11.029.000</span>
                  <span className='text-gray-500'>terkumpul</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-1.5 my-2'>
                  <div
                    className='bg-orange-500 h-1.5 rounded-full'
                    style={{ width: '60%' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Articles Section */}
        <div className='p-4'>
          <h2 className='text-xl font-bold mb-4'>Kebaikanmu Terus Mengalir Hingga Penjuru Negeri!</h2>
          <div className='grid grid-cols-2 gap-4'>
            <Card>
              <CardContent className='p-3'>
                <div className='relative'>
                  <Image
                    src='/placeholder.svg'
                    alt='Article'
                    width={200}
                    height={150}
                    className='w-full h-32 object-cover rounded-lg'
                  />
                  <Badge className='absolute top-2 left-2 bg-green-500'>ARTIKEL</Badge>
                </div>
                <h3 className='font-bold mt-2 text-sm'>Makna Lailatul Qadar dalam Sejarah Islam</h3>
                <p className='text-xs text-gray-500 mt-2'>November 7, 2024</p>
                <Link
                  href='#'
                  className='text-green-500 text-sm font-medium mt-2 block'>
                  READ MORE »
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className='p-4 bg-white'>
          <div className='text-center mb-6'>
            <p className='text-sm mb-4'>Laju Peduli adalah Organisasi Sosial yang lahir dari semangat kepedulian untuk membantu masalah kemanusiaan di Indonesia dan juga di dunia islam khususnya Palestina.</p>
            <p className='text-xs font-bold mb-4'>KEP. UPZ/020 TAHUN 2023</p>
          </div>

          <div className='mb-6'>
            <h3 className='font-bold mb-4'>Metode Pembayaran</h3>
            <div className='grid grid-cols-4 gap-4'>
              {['BCA', 'Mandiri', 'BSI', 'BRI', 'BNI'].map((bank) => (
                <div
                  key={bank}
                  className='bg-gray-100 p-2 rounded-lg'>
                  <Image
                    src='/placeholder.svg'
                    alt={bank}
                    width={60}
                    height={30}
                    className='w-full h-auto'
                  />
                </div>
              ))}
            </div>
          </div>

          <div className='text-center'>
            <h3 className='font-bold mb-4'>Info Selengkapnya:</h3>
            <div className='flex justify-center gap-4'>
              {['Facebook', 'Instagram', 'TikTok', 'WhatsApp', 'YouTube'].map((social) => (
                <Link
                  key={social}
                  href='#'
                  className='text-blue-500'>
                  <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center'>
                    <Image
                      src='/placeholder.svg'
                      alt={social}
                      width={24}
                      height={24}
                    />
                  </div>
                </Link>
              ))}
            </div>
            <p className='text-sm mt-4'>@LajuPeduli. All Right Reserved</p>
          </div>
        </footer>
      </main>

      {/* Bottom Navigation */}
      <nav className='fixed bottom-0 w-full bg-blue-700 border-t'>
        <div className='max-w-lg mx-auto flex justify-around p-2'>
          {[
            { icon: Home, label: 'Home' },
            { icon: Info, label: 'Info Terbaru' },
            { icon: HandHeart, label: 'Galang Dana' },
            { icon: Trophy, label: 'Ranking' },
            { icon: User, label: 'Akun' },
          ].map((item, i) => (
            <Link
              key={i}
              href='#'
              className='flex flex-col items-center gap-1 text-white hover:text-blue-500'>
              <item.icon className='w-6 h-6' />
              <span className='text-xs'>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
