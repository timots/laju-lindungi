import AdminLayout from '@/components/layout/adminLayout';
import AppLayout from '@/components/layout/appLayout';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import useUserStore from '@/hooks/zustand';
import { useState } from 'react';
import { LoadingScreen } from '@/components/loading/loadingScreen';

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
        console.log(data, 'ini data dari open street map ');
        const country = data.address.country || 'Unknown';
        globalState?.setLocation(country);

        const currencyResponse = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        const currencyData = await currencyResponse.json();
        console.log(currencyData, 'ini currancy data');
        const currencyCode = currencyData[0]?.currencies ? Object.keys(currencyData[0].currencies)[0] : 'Unknown';

        console.log('Mata uang:', currencyCode);

        if (country === 'Indonesia') {
          i18n.changeLanguage('id');
          globalState?.setLanguageId('id');
        } else if (country === 'Malaysia') {
          i18n.changeLanguage('my');
          globalState?.setLanguageId('my');
        } else {
          console.log('negara selain Malaysia dan Indonesia set otomatis ke bahasa Inggris');
        }

        globalState?.setCurrency(currencyCode);
      } catch (error) {
        console.error(error, 'ini errornya');
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

  // console.log(globalState, 'ini global state');

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
