import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { loadStripe } from '@stripe/stripe-js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  console.log(router, 'ini router');
  console.log(stripe, 'ini stripe');

  const stripePromise = loadStripe('pk_test_eZL2hA7uIiCkLVuxcTNIIx7I008ckE9NzV');

  const handleSubmit = async (e) => {
    console.log('masuk');
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const paymentElement = elements.getElement(PaymentElement);

    if (!paymentElement) {
      setMessage('Payment form not loaded. Please try again.');
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error) {
      setMessage(error.message);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'accordion',
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
      },
    },
  };

  const paymentMethod = {
    paymentMethodOrder: ['apple_pay', 'google_pay', 'card', 'klarna'],
  };

  return (
    <form
      id='payment-form'
      onSubmit={handleSubmit}
      className='flex flex-col items-center p-6 bg-white shadow-lg rounded-md max-w-md mx-auto'>
      <h2 className='text-lg font-semibold text-center mb-4'>Complete Your Payment</h2>
      <LinkAuthenticationElement
        id='link-authentication-element'
        className='mb-4 w-full'
      />
      <PaymentElement
        id='payment-element'
        options={paymentElementOptions}
        paymentMethodOrder={paymentMethod}
        className='mb-4 w-full'
      />
      <Button
        className='mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors'
        disabled={isLoading || !stripe || !elements}
        id='submit'>
        <span id='button-text'>
          {isLoading ? (
            <div
              className='spinner border-t-2 border-white w-4 h-4 rounded-full animate-spin'
              id='spinner'></div>
          ) : (
            'Pay Now'
          )}
        </span>
      </Button>
      {message && (
        <div
          id='payment-message'
          className='text-red-600 mt-2'>
          {message}
        </div>
      )}
    </form>
  );
}
