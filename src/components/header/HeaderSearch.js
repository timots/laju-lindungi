'use client';

import React, { useEffect, useState } from 'react';
import { Bell, Search, ChevronLeft, X } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import useUserStore from '@/hooks/zustand';
import * as Flags from 'country-flag-icons/react/3x2';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Header({ title = 'Synergy Humanity', showBackButton = false, onBackClick }) {
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
    return (
      <div className='flex justify-center items-center h-16 bg-white shadow-sm'>
        <div className='animate-pulse text-gray-400'>Loading...</div>
      </div>
    );
  }

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    globalState?.setLanguageId(language);
  };

  const handleSearch = (searchInput) => {
    const searchValue = searchInput?.value.trim();
    if (!searchValue) return;
    window.location.href = `/searched/${searchValue}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e.target);
    }
  };

  const closeSearch = (e) => {
    const input = e.target.closest('div')?.querySelector('input');
    if (input) input.value = '';
    setIsSearchActive(false);
  };

  const handleSearchButtonClick = (e) => {
    const searchInput = e.target.closest('div')?.querySelector('input');
    handleSearch(searchInput);
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
    <header className='fixed top-0 left-0 right-0 bg-background z-50 '>
      <div className='max-w-md mx-auto px-4 h-16 flex items-center justify-between bg-gradient-to-br from-white to-slate-50'>
        <div className='flex items-center gap-2'>
          {showBackButton ? (
            <Button
              variant='ghost'
              size='icon'
              onClick={onBackClick}
              className='hover:bg-gray-100 transition-colors'>
              <ChevronLeft className='h-5 w-5 text-gray-600' />
              <span className='sr-only'>Go back</span>
            </Button>
          ) : (
            <Link
              href='/'
              className='flex items-center gap-2'>
              <img
                src='/payment logo/synergyhumanity.jpeg'
                alt='Laju Peduli'
                width={40}
                height={40}
                className='rounded-lg object-contain'
              />
              <span className='text-lg font-semibold text-blue-500 sm:block'>{title}</span>
            </Link>
          )}
        </div>

        <div className='flex items-center gap-3'>
          {isSearchActive ? (
            <div className='flex items-center bg-gray-100 rounded-lg px-3 py-1.5 transition-all duration-200'>
              <input
                type='text'
                placeholder={t('Search...')}
                className='bg-transparent border-none outline-none text-sm w-40 placeholder-gray-500 text-gray-800'
                autoFocus
                onKeyPress={handleKeyPress}
              />
              <Button
                variant='ghost'
                size='icon'
                className='p-1 hover:bg-gray-200 transition-colors'
                onClick={handleSearchButtonClick}>
                <Search className='h-4 w-4 text-gray-600' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='p-1 hover:bg-gray-200 transition-colors'
                onClick={closeSearch}>
                <X className='h-4 w-4 text-gray-600' />
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsSearchActive(true)}
                className='hover:bg-gray-100 transition-colors'>
                <Search className='h-5 w-5 text-gray-600' />
                <span className='sr-only'>Search</span>
              </Button>

              <Select
                onValueChange={handleLanguageChange}
                value={i18n.language}>
                <SelectTrigger className='w-[42px] h-[42px] p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
                  <SelectValue>
                    <FlagIcon className='h-5 w-5' />
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className='bg-white border border-gray-200 shadow-lg rounded-lg'>
                  {Object.entries({
                    id: 'Indonesia',
                    en: 'English',
                    my: 'Malay',
                    ar: 'Arabic',
                    zh: 'Chinese',
                  }).map(([code, label]) => {
                    const Flag = languageFlags[code];
                    return (
                      <SelectItem
                        key={code}
                        value={code}
                        className='hover:bg-gray-50'>
                        <div className='flex items-center gap-2 py-1'>
                          <Flag className='h-4 w-4' />
                          <span className='text-sm text-gray-700'>{label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
