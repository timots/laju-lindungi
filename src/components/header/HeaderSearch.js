'use client';

import { useState } from 'react';
import { Bell, Search, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function Header({ title = 'Laju Timothy', showBackButton = false, onBackClick }) {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <header className='fixed top-0 left-0 right-0 bg-white z-50 '>
      <div className='max-w-md mx-auto px-4 h-16 flex items-center justify-between'>
        {showBackButton ? (
          <button
            onClick={onBackClick}
            className='p-2 -ml-2'>
            <ChevronLeft className='w-6 h-6' />
          </button>
        ) : (
          <Link
            href='/'
            className='text-xl font-bold text-blue-600'>
            {title}
          </Link>
        )}

        <div className='flex items-center space-x-4'>
          {isSearchActive ? (
            <input
              type='text'
              placeholder='Search...'
              className='border rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300'
              autoFocus
              onBlur={() => setIsSearchActive(false)}
            />
          ) : (
            <>
              <button
                onClick={() => setIsSearchActive(true)}
                className='p-2'>
                <Search className='w-5 h-5' />
              </button>
              <Link
                href='/notifications'
                className='p-2'>
                <Bell className='w-5 h-5' />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
