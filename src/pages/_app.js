import AdminLayout from '@/components/layout/adminLayout';
import AppLayout from '@/components/layout/appLayout';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import useUserStore from '@/hooks/zustand';
import { addFacebookPixel, addGoogleTagManager } from '@/utils/pixelUtil';
import { useEffect } from 'react';
import axios from 'axios';
import '@/utils/translate/i18n';

function App({ Component, pageProps }) {
  const router = useRouter();
  const globalState = useUserStore();
  const isAdminRoute = router.pathname.startsWith('/admin');

  const getData = async () => {

    try {
      const res = await axios.post('/api/public/config/read', {
        projectId: 'HWMHbyA6S12FXzVwcru7',
      });

      if (res?.data?.data.length > 0) {
        globalState.setWebConfig(res?.data?.data[0]);

        // tambah facebook pixel kalo ada
        if (res?.data?.data[0]?.pixels?.facebook) {
          addFacebookPixel(res?.data?.data[0].pixels.facebook || '2340318182830705');
        }
        // tambah google tag manager kalo ada
        if (res?.data?.data[0]?.pixels?.['tag-manager']) {
          addGoogleTagManager(res?.data?.data[0].pixels?.['tag-manager'] || 'GTM-T386H9R');
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // if (globalState?.webConfig === ' ') {
    getData();
    // }
  }, []);

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
