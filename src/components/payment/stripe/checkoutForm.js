import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Receipt, User, Package, CreditCard } from 'lucide-react';
import axios from 'axios';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataOrder, setDataOrder] = useState();
  const router = useRouter();

  const HandleGetOrder = async () => {
    try {
      const response = await axios.post('/api/public/payment/list-order', {
        client_secret: router?.query?.clientSecret,
      });
      setDataOrder(response?.data?.data?.[0]);
    } catch (error) {
      console.error(error.message);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

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

    if (error) setMessage(error.message);
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

  useEffect(() => {
    HandleGetOrder();
  }, []);

  const formatCurrency = (amount, currency = 'IDR') => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <form
      id='payment-form'
      onSubmit={handleSubmit}
      className='max-w-3xl mx-auto p-6'>
      <Card className='mb-8 bg-white'>
        <CardHeader className='border-b bg-gray-50'>
          <div className='flex justify-between items-center'>
            <div>
              <CardTitle className='text-2xl font-bold text-gray-800'>Invoice</CardTitle>
              {dataOrder?.payment_information?.invoiceId && <p className='text-sm text-gray-500 mt-1'>#{dataOrder.payment_information.invoiceId}</p>}
            </div>
            <Receipt className='w-8 h-8 text-blue-600' />
          </div>
        </CardHeader>

        <CardContent className='pt-6'>
          <div className='grid md:grid-cols-2 gap-8 mb-8'>
            {/* Contact Information */}
            <div className='space-y-4'>
              <div className='flex items-center gap-2 mb-4'>
                <User className='w-5 h-5 text-blue-600' />
                <h3 className='font-semibold text-gray-800'>Contact Details</h3>
              </div>
              <div className='space-y-2 text-sm'>
                <p>
                  <span className='text-gray-500'>Name:</span> <span className='font-medium'>{dataOrder?.contact_information?.name || 'N/A'}</span>
                </p>
                <p>
                  <span className='text-gray-500'>Email:</span> <span className='font-medium'>{dataOrder?.contact_information?.email || 'N/A'}</span>
                </p>
                <p>
                  <span className='text-gray-500'>Phone:</span> <span className='font-medium'>{dataOrder?.contact_information?.phone_number || 'N/A'}</span>
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className='space-y-4'>
              <div className='flex items-center gap-2 mb-4'>
                <Package className='w-5 h-5 text-blue-600' />
                <h3 className='font-semibold text-gray-800'>Order Summary</h3>
              </div>
              <div className='space-y-2 text-sm'>
                <p>
                  <span className='text-gray-500'>Order Date:</span> <span className='font-medium'>{new Date().toLocaleDateString()}</span>
                </p>
                <p>
                  <span className='text-gray-500'>Payment Status:</span> <span className='inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded'>Pending</span>
                </p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className='mb-8'>
            <div className='flex items-center gap-2 mb-4'>
              <Package className='w-5 h-5 text-blue-600' />
              <h3 className='font-semibold text-gray-800'>Order Details</h3>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-gray-50'>
                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Item</th>
                    <th className='px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase'>Quantity</th>
                    <th className='px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase'>Price</th>
                    <th className='px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase'>Total</th>
                  </tr>
                </thead>
                <tbody className='divide-y'>
                  {dataOrder?.items?.map((item, index) => (
                    <tr
                      key={item.id}
                      className='text-sm'>
                      <td className='px-4 py-4'>
                        <div>
                          <p className='font-medium text-gray-800'>{item.name}</p>
                        </div>
                      </td>
                      <td className='px-4 py-4 text-center'>{item.quantity}</td>
                      <td className='px-4 py-4 text-right'>{formatCurrency(item.regular_price_int, dataOrder.currency)}</td>
                      <td className='px-4 py-4 text-right font-medium'>{formatCurrency(item.regular_price_int * item.quantity, dataOrder.currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total Summary */}
          <div className='bg-gray-50 p-4 rounded-lg'>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-500'>Subtotal</span>
                <span>{formatCurrency(dataOrder?.amountBeforeTax || 0, dataOrder?.currency)}</span>
              </div>
              {dataOrder?.tax > 0 && (
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-500'>Tax</span>
                  <span>{formatCurrency(dataOrder.tax, dataOrder?.currency)}</span>
                </div>
              )}
              <Separator className='my-2' />
              <div className='flex justify-between text-lg font-semibold'>
                <span>Total</span>
                <span className='text-blue-600'>{formatCurrency(dataOrder?.amount || 0, dataOrder?.currency)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Section */}
      <Card className='bg-white'>
        <CardHeader className='border-b bg-gray-50'>
          <div className='flex items-center gap-2'>
            <CreditCard className='w-6 h-6 text-blue-600' />
            <CardTitle className='text-xl font-bold text-gray-800'>Payment Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className='pt-6'>
          <LinkAuthenticationElement
            id='link-authentication-element'
            className='mb-6'
          />
          <PaymentElement
            id='payment-element'
            options={paymentElementOptions}
            paymentMethodOrder={paymentMethod}
            className='mb-6'
          />
          <Button
            className='w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors'
            disabled={isLoading || !stripe || !elements}
            id='submit'>
            {isLoading ? <div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin'></div> : 'Pay Now'}
          </Button>
          {message && <div className='mt-4 p-4 bg-red-50 text-red-600 text-sm rounded-lg'>{message}</div>}
        </CardContent>
      </Card>
    </form>
  );
}
