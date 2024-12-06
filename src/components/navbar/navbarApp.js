'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Info, HandHeart, Trophy, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import useUserStore from '@/hooks/zustand';

const Navbar = () => {
  const pathname = usePathname();
  const globalState = useUserStore();
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const getLocation = async () => {
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;

        // Mendapatkan negara berdasarkan koordinat
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await response.json();
        console.log(data, 'ini data get country nya');
        const country = data.address.country || 'Unknown';
        globalState?.setLocation(country);

        // Mendapatkan kode mata uang berdasarkan negara
        const currencyResponse = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        const currencyData = await currencyResponse.json();
        const currencyCode = currencyData[0]?.currencies ? Object.keys(currencyData[0].currencies)[0] : 'Unknown';
        globalState?.setCurrency(currencyCode);

        console.log(`Country: ${country}, Currency: ${currencyCode}`);

        // Menentukan bahasa berdasarkan negara
        if (country === 'Indonesia') {
          i18n.changeLanguage('id');
          globalState?.setLanguageId('id');
        } else if (country === 'Malaysia') {
          i18n.changeLanguage('my');
          globalState?.setLanguageId('my');
        } else {
          i18n.changeLanguage('en');
          globalState?.setLanguageId('en');
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    } else {
      console.log('Geolocation tidak didukung di browser Anda.');
    }
  };

  useEffect(() => {
    if (!globalState?.location) {
      getLocation();
    }
  }, [globalState?.location]);

  useEffect(() => {
    if (i18n.isInitialized) {
      setIsLoading(false);
    }
  }, [i18n]);

  if (isLoading) {
    return <div className='flex h-16 items-center justify-center'>Loading...</div>;
  }

  const menuItems = [
    { id: 'home', label: t('nav.home') || 'Home', icon: Home, link: '/' },
    { id: 'info', label: t('nav.infoTerbaru') || 'Info', icon: Info, link: '/info' },
    { id: 'galang', label: t('nav.Galang_dana') || 'Galang Dana', icon: HandHeart, link: '/galang' },
    { id: 'rekening', label: t('nav.rekening') || 'Rekening', icon: Trophy, link: '/rekening' },
    { id: 'user', label: t('nav.User') || 'User', icon: User, link: '/auth/login' },
  ];

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
