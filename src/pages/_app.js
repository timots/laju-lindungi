import AdminLayout from '@/components/layout/adminLayout';
import AppLayout from '@/components/layout/appLayout';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import useUserStore from '@/hooks/zustand';
import { useState } from 'react';

function App({ Component, pageProps }) {
  const router = useRouter();
  const { i18n } = useTranslation();
  const globalState = useUserStore();
  const isAdminRoute = router.pathname.startsWith('/admin');

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

        if (country === 'Indonesia' || country === 'Malaysia') {
          i18n.changeLanguage('id'); // Set language to 'id' for Indonesia or Malaysia
          globalState?.setLanguageId('id');
        } else {
          // No action needed for other countries
        }
      } catch (error) {
        console.log('Tidak dapat mengakses lokasi. Pastikan izin diberikan.');
        console.error(error);
      }
    } else {
      console.log('Geolocation tidak didukung di browser Anda.');
    }
  };

  useEffect(() => {
    if (globalState?.location === '') {
      getLocation();
    }
  }, [globalState?.location]);

  console.log(globalState, 'ini global state');

  return (
    <>
      {isAdminRoute ? (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      ) : (
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      )}
    </>
  );
}

export default appWithTranslation(App);
