'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Info, HandHeart, Trophy, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { i18n, t } = useTranslation();

  const onChangeLang = (e) => {
    const lang_code = e.target.value;
    store.set('lang', lang_code);
    i18n.changeLanguage(lang_code);
    window.location.reload();
  };

  const menuItems = [
    { id: 'home', label: t('nav:home'), icon: Home, link: '/' },
    { id: 'info', label: t('nav:about'), icon: Info, link: '/info' },
    { id: 'galang', label: t('nav:services'), icon: HandHeart, link: '/galang' },
    { id: 'rekening', label: t('nav:contact'), icon: Trophy, link: '/rekening' },
    { id: 'user', label: t('nav:profile'), icon: User, link: '/auth/login' },
  ];

  console.log(menuItems, 'ini menu items');
  console.log(i18n, 'ini i 18 n');

  const handleLanguageChange = (language) => {
    if (i18n.changeLanguage) {
      i18n.changeLanguage(language);
    } else {
      console.error('changeLanguage method not available');
    }
  };
  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50'>
      <div className='max-w-md mx-auto px-4 bg-gradient-to-r from-blue-500 to-blue-600'>
        <ul className='flex justify-between items-center h-16'>
          {menuItems.map((item) => {
            const isActive = pathname === item.link;
            return (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive ? 'text-blue-600 bg-blue-50' : 'text-white hover:text-blue-600 hover:bg-blue-50'}`}>
                  <item.icon className='w-6 h-6' />
                  <span className='text-xs font-medium'>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className='flex items-center space-x-4'>
          {/* Language Switcher */}
          <div className='relative'>
            <select
              onChange={(e) => handleLanguageChange(e.target.value)}
              value={i18n.language}
              className='appearance-none bg-white border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
              <option value='id'>Indonesia</option>
              <option value='en'>English</option>
              <option value='ms'>Malaysia</option>
              <option value='ar'>العربية</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
