import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Payment from '@/components/payment/stripe/payment';

function PaymentPage() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const { clientSecret } = router.query;
      if (clientSecret) {
        setClientSecret(clientSecret);
      }
    }
  }, [router.isReady, router.query]);

  return (
    <main className='mb-4'>
      <Payment clientSecret={clientSecret} />
    </main>
  );
}

export default PaymentPage;
