import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function CompletePaymentPage() {
  const router = useRouter();
  const { paymentUrl } = router.query;
  const [iframeHeight, setIframeHeight] = useState('700px');

  // Wait for the payment URL to be available
  if (!paymentUrl) {
    return <div>Loading payment...</div>;
  }

  return (
    <main className='w-full h-screen flex items-center justify-center'>
      <iframe
        src={paymentUrl}
        allow='payment'
        className='w-full'
        style={{ height: iframeHeight }}
        title='Payment Gateway'
      />
    </main>
  );
}

export default CompletePaymentPage;
