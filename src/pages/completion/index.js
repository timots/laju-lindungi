import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function Completion() {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const stripePromise = loadStripe('pk_test_eZL2hA7uIiCkLVuxcTNIIx7I008ckE9NzV');

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      if (error) {
        setPaymentInfo({ error: error.message });
      } else if (paymentIntent) {
        setPaymentInfo(paymentIntent);
      }
    });
  }, []);

  console.log(paymentInfo, 'ini payment info');

  return (
    <div className='min-h-screen  flex items-center justify-center p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle className='text-2xl flex items-center gap-2'>
            <CheckCircle className='text-green-500' />
            Payment Successful
          </CardTitle>
          <CardDescription>Thank you for your payment. Here's your invoice details.</CardDescription>
        </CardHeader>
        <CardContent>
          {paymentInfo && !paymentInfo.error ? (
            <div className='space-y-4'>
              <div className='flex justify-between'>
                <span className='font-medium'>Payment Status:</span>
                <span className='text-green-600 font-semibold'>{paymentInfo.status}</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Payment ID:</span>
                <a
                  href={`https://dashboard.stripe.com/test/payments/${paymentInfo.id}`}
                  target='_blank'
                  rel='noreferrer'
                  className='text-blue-600 hover:underline'>
                  {paymentInfo.id}
                </a>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Amount:</span>
                <span>
                  {(paymentInfo.amount / 100).toFixed(2)} {paymentInfo.currency.toUpperCase()}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Payment Method:</span>
                <span>{paymentInfo.payment_method}</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Created At:</span>
                <span>{new Date(paymentInfo.created * 1000).toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <div className='text-red-500'>{paymentInfo?.error || 'Loading payment information...'}</div>
          )}
        </CardContent>
        <Separator />
        <CardFooter className='flex justify-between mt-4'>
          <Button
            variant='outline'
            asChild>
            <Link
              href='/'
              className='flex items-center gap-2'>
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </Button>
          <Button>Download Invoice</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Completion;
