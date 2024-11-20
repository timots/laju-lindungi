import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

function Completion() {
  const [messageBody, setMessageBody] = useState('');
  //   const { stripePromise } = props;

  const stripePromise = loadStripe('pk_test_eZL2hA7uIiCkLVuxcTNIIx7I008ckE9NzV');

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      console.log(paymentIntent, 'ini payment intent');
      console.log(messageBody, 'ini pesan body');

      setMessageBody(
        error ? (
          `> ${error.message}`
        ) : (
          <>
            &gt; Payment {paymentIntent.status}:{' '}
            <a
              href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`}
              target='_blank'
              rel='noreferrer'>
              {paymentIntent.id}
            </a>
          </>
        )
      );
    });
  }, [stripePromise]);

  // useEffect(() => {
  //   if (!stripePromise) return;

  //   stripePromise.then(async (stripe) => {
  //     const url = new URL(window.location);
  //     const clientSecret = url.searchParams.get('payment_intent_client_secret');
  //     const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
  //     console.log(paymentIntent, 'ini yang bakal hit api');
  //   });
  // }, []);

  return (
    <>
      <h1>Thank you!</h1>
      <a href='/'>home</a>
      <div
        id='messages'
        role='alert'
        style={messageBody ? { display: 'block' } : {}}>
        {messageBody}
      </div>
    </>
  );
}

export default Completion;
