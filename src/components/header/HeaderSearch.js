'use client';

import React, { useEffect, useState } from 'react';
import { Bell, Search, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import useUserStore from '@/hooks/zustand';
import * as Flags from 'country-flag-icons/react/3x2';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Header({ title = 'Laju Peduli', showBackButton = false, onBackClick }) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const globalState = useUserStore();

  useEffect(() => {
    if (i18n.isInitialized) {
      setIsLoading(false);
    }
  }, [i18n]);

  if (isLoading) {
    return <div className='flex justify-center items-center h-16'>Loading...</div>;
  }

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    globalState?.setLanguageId(language);
  };

  const languageFlags = {
    id: Flags.ID,
    en: Flags.GB,
    my: Flags.MY,
    ar: Flags.SA,
    zh: Flags.CN,
  };

  const FlagIcon = languageFlags[i18n.language] || Flags.GB;

  return (
    <header className='fixed top-0 left-0 right-0 bg-background z-50  bg-white'>
      <div className='max-w-md mx-auto px-4 h-16 flex items-center justify-between bg-gradient-to-br from-blue-500 to-blue-600'>
        <div className='flex items-center'>
          {showBackButton ? (
            <Button
              variant='ghost'
              size='icon'
              onClick={onBackClick}
              className='-ml-2'>
              <ChevronLeft className='h-6 w-6' />
              <span className='sr-only'>Go back</span>
            </Button>
          ) : (
            <Link
              href='/'
              className='text-xl font-bold text-primary '>
              <img
                src='/payment logo/Laju_peduli_logo.png'
                alt='Laju Peduli'
                width={150}
                height={50}
              />
            </Link>
          )}
        </div>

        <div className='flex items-center space-x-2'>
          {isSearchActive ? (
            <input
              type='text'
              placeholder={t('Search...')}
              className='border rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary'
              autoFocus
              onBlur={() => setIsSearchActive(false)}
            />
          ) : (
            <>
              {/* <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsSearchActive(true)}>
                <Search className='h-5 w-5' />
                <span className='sr-only'>Search</span>
              </Button> */}

              <Select
                onValueChange={handleLanguageChange}
                value={i18n.language}>
                <SelectTrigger className='w-[40px] h-[40px] p-0 border-none '>
                  <SelectValue>
                    <FlagIcon className='h-5 w-5' />
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  <SelectItem value='id'>
                    <div className='flex items-center'>
                      <Flags.ID className='h-4 w-4 mr-2' />
                      <span>Indonesia</span>
                    </div>
                  </SelectItem>
                  <SelectItem value='en'>
                    <div className='flex items-center'>
                      <Flags.GB className='h-4 w-4 mr-2' />
                      <span>English</span>
                    </div>
                  </SelectItem>
                  <SelectItem value='my'>
                    <div className='flex items-center'>
                      <Flags.MY className='h-4 w-4 mr-2' />
                      <span>Malay</span>
                    </div>
                  </SelectItem>
                  <SelectItem value='ar'>
                    <div className='flex items-center'>
                      <Flags.SA className='h-4 w-4 mr-2' />
                      <span>Arabic</span>
                    </div>
                  </SelectItem>
                  <SelectItem value='zh'>
                    <div className='flex items-center'>
                      <Flags.CN className='h-4 w-4 mr-2' />
                      <span>Chinese</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* <Button
                variant='ghost'
                size='icon'
                asChild>
                <Link href='/notifications'>
                  <Bell className='h-5 w-5' />
                  <span className='sr-only'>Notifications</span>
                </Link>
              </Button> */}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
