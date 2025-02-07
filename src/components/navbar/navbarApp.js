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

        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await response.json();
        const country = data.address.country || 'Unknown';
        globalState?.setLocation(country);

        const currencyResponse = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        const currencyData = await currencyResponse.json();
        const currencyCode = currencyData[0]?.currencies ? Object.keys(currencyData[0].currencies)[0] : 'Unknown';
        globalState?.setCurrency(currencyCode);

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

        setIsLoading(false);
      } catch (error) {
        console.error('Error getting location:', error);
        setIsLoading(false);
      }
    } else {
      console.log('Geolocation tidak didukung di browser Anda.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!globalState?.location) {
      getLocation();
    }
  }, []);

  useEffect(() => {
    if (i18n.isInitialized) {
      setIsLoading(false);
    } else {
      const interval = setInterval(() => {
        if (i18n.isInitialized) {
          setIsLoading(false);
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [i18n]);

  if (isLoading) {
    return <div className='flex h-16 items-center justify-center'>Loading...</div>;
  }

  if (!i18n.isInitialized) {
    return <div className='flex h-16 items-center justify-center'>Loading translations...</div>;
  }

  const menuItems = [
    { id: 'home', label: t('nav.home') || 'Home', icon: Home, link: '/' },
    { id: 'info', label: t('nav.infoTerbaru') || 'Info', icon: Info, link: '/info' },
  ];

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50'>
      <div className='mx-auto max-w-md bg-gradient-to-r from-blue-600 via-blue-500 to-orange-400 shadow-lg'>
        <ul className='flex h-16 items-center justify-between px-2'>
          {menuItems.map((item) => {
            const isActive = pathname === item.link;
            return (
              <li
                key={item.id}
                className='flex-1'>
                <Link
                  href={item.link}
                  className={`flex h-14 flex-col items-center justify-center gap-1 rounded-xl transition-all duration-300 ${
                    isActive ? 'bg-white/10 backdrop-blur-sm text-white shadow-inner' : 'text-white/90 hover:bg-white/5 hover:text-white'
                  }`}>
                  <item.icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`} />
                  <span className={`text-xs font-medium transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-80'}`}>{item.label}</span>
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
