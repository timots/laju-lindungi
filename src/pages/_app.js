import AdminLayout from '@/components/layout/adminLayout';
import AppLayout from '@/components/layout/appLayout';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
// import nextI18nextConfig from '../../next-i18next.config';

function App({ Component, pageProps }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');

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
// export default App;
