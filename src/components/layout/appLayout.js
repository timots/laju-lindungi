import { useRouter } from 'next/router';
import React from 'react';

import Navbar from '../navbar/navbarApp';
import Header from '../header/HeaderSearch';

const AppLayout = ({ children }) => {
  const router = useRouter();
  const fullPage = ['/auth/login', '/auth/signup', '/auth/reset-password', '/account', '/account/loyalty-program', '/account/vouchers', '/products/[id]', '/products', '/categories', '/wishlist'].includes(router.pathname);
  const noNavbar = [''].includes(router.pathname);

  return (
    <div>
      {!fullPage ? (
        <div className='flex flex-col min-h-screen bg-white mx-auto w-full relative max-w-md'>
          <Header />
          {/* Main content area */}
          <main className='flex-grow pb-16 pt-4 overflow-y-auto'>{children}</main>
          {/* Fixed navbar at bottom */}
          {!noNavbar && (
            <div className='fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto'>
              <Navbar />
            </div>
          )}
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default AppLayout;
