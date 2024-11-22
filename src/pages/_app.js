import AdminLayout from '@/components/layout/adminLayout';
import AppLayout from '@/components/layout/appLayout';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }) {
  const router = useRouter();
  // const { i18n } = useTranslation();
  // const globalState = useUserStore();
  const isAdminRoute = router.pathname.startsWith('/admin');

  // const getLocation = async () => {
  //   if ('geolocation' in navigator) {
  //     try {
  //       const position = await new Promise((resolve, reject) => {
  //         navigator.geolocation.getCurrentPosition(resolve, reject);
  //       });
  //       const { latitude, longitude } = position.coords;

  //       // Mendapatkan negara berdasarkan koordinat
  //       const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
  //       const data = await response.json();
  //       const country = data.address.country || 'Unknown';
  //       globalState?.setLocation(country);

  //       // Mendapatkan kode mata uang berdasarkan negara
  //       const currencyResponse = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  //       const currencyData = await currencyResponse.json();
  //       const currencyCode = currencyData[0]?.currencies ? Object.keys(currencyData[0].currencies)[0] : 'Unknown';
  //       globalState?.setCurrency(currencyCode);

  //       console.log(`Country: ${country}, Currency: ${currencyCode}`);

  //       // Menentukan bahasa berdasarkan negara
  //       if (country === 'Indonesia') {
  //         i18n.changeLanguage('id');
  //         globalState?.setLanguageId('id');
  //       } else if (country === 'Malaysia') {
  //         i18n.changeLanguage('my');
  //         globalState?.setLanguageId('my');
  //       } else {
  //         i18n.changeLanguage('en');
  //         globalState?.setLanguageId('en');
  //       }
  //     } catch (error) {
  //       console.error('Error getting location:', error);
  //     }
  //   } else {
  //     console.log('Geolocation tidak didukung di browser Anda.');
  //   }
  // };

  // useEffect(() => {
  //   if (!globalState?.location) {
  //     getLocation();
  //   }
  // }, [globalState?.location]);

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
