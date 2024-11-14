import { useRouter } from 'next/router';
import React from 'react';

import Navbar from '../navbar/navbarApp';

const AppLayout = ({ children }) => {
  const router = useRouter();
  const fullPage = ['/auth/login', '/auth/signup', '/auth/reset-password', '/account', '/account/loyalty-program', '/account/vouchers', '/products/[id]', '/products', '/categories', '/wishlist'].includes(router.pathname);
  const noNavbar = ['/[id]/donasi-sekarang'].includes(router.pathname);
  return (
    <div>
      {!fullPage ? (
        <div className='flex flex-col min-h-screen bg-white mx-auto w-full relative max-w-md'>
          <div className='flex-grow  mb-16 overflow-y-auto'>{children}</div>
          {!noNavbar ? <Navbar /> : <></>}
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default AppLayout;
