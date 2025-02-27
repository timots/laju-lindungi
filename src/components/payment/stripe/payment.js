import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './checkoutForm';
import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_eZL2hA7uIiCkLVuxcTNIIx7I008ckE9NzV'); // kalo false
const stripePromise = loadStripe('pk_live_wMp5MkC9YM7VKrq47xLb7FG8008NFFMvqT'); // klo true

function Payment({ clientSecret }) {
  return (
    <>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
