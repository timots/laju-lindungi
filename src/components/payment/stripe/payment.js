import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './checkoutForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_eZL2hA7uIiCkLVuxcTNIIx7I008ckE9NzV');

function Payment({ clientSecret }) {
  console.log(clientSecret, 'clientScreet');
  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
