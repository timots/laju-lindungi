'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Info, HandHeart, Trophy, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (i18n.isInitialized) {
      setIsLoading(false);
    }
  }, [i18n]);

  useEffect(() => {
    console.log('Current language:', i18n.language);
    console.log('Available languages:', i18n.languages);
    console.log('Translation test:', t('nav.home'));
  }, [i18n.language, t]);

  const menuItems = [
    { id: 'home', label: t('nav.home'), icon: Home, link: '/' },
    { id: 'info', label: t('nav.infoTerbaru'), icon: Info, link: '/info' },
    { id: 'galang', label: t('nav.Galang_dana'), icon: HandHeart, link: '/galang' },
    { id: 'rekening', label: t('nav.rekening'), icon: Trophy, link: '/rekening' },
    { id: 'user', label: t('nav.User'), icon: User, link: '/auth/login' },
  ];

  if (isLoading) {
    return <div className='flex h-16 items-center justify-center'>Loading...</div>;
  }

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50'>
      <div className='mx-auto max-w-md bg-gradient-to-r from-blue-500 to-blue-600'>
        <ul className='flex h-16 items-center justify-between'>
          {menuItems.map((item) => {
            const isActive = pathname === item.link;
            return (
              <li
                key={item.id}
                className='flex-1'>
                <Link
                  href={item.link}
                  className={`flex h-full w-full flex-col items-center justify-center gap-1 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'text-white hover:bg-blue-50 hover:text-blue-600'}`}>
                  <item.icon className='h-5 w-5' />
                  <span className='text-xs font-medium'>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
