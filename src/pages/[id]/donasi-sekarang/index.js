import { useEffect, useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { useRouter } from 'next/router';
import axios from 'axios';
import useUserStore from '@/hooks/zustand';
import { LoadingScreen } from '@/components/loading/loadingScreen';

export default function DonationPage() {
  const router = useRouter();
  const globalState = useUserStore();
  const [selectedSalutation, setSelectedSalutation] = useState('Bapak');
  const [hideIdentity, setHideIdentity] = useState(false);
  const [variants, setVariants] = useState([]);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  // console.log(router, 'ini router');

  const togglePaymentModal = () => {
    setShowPaymentModal(!showPaymentModal);
  };

  const selectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    setShowPaymentModal(false);
  };

  const handleGetVariants = async (id) => {
    try {
      if (!id) return;
      const response = await axios.post('/api/v1/variants/read', { productId: id });
      return response.data;
    } catch (error) {
      console.error(error.message);
      setError('Gagal memuat data kampanye.');
    }
  };

  const handleGetCampaigns = async (id) => {
    try {
      if (!id) return;
      const response = await axios.post('/api/v1/article/read', { productId: id });
      return response.data;
    } catch (error) {
      console.error(error.message);
      setError('Gagal memuat data kampanye.');
    }
  };

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const variants = await handleGetVariants(router?.query?.id);
      const product = await handleGetCampaigns(router?.query?.id);
      setVariants(variants?.data || []);
      setProduct(product?.data || {});

      // Initialize quantities
      const initialQuantities = (variants?.data || []).reduce((acc, variant) => {
        acc[variant.id] = 0;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router?.query?.id) {
      loadCampaigns();
    }
  }, [router?.query?.id]);

  const addItem = (id) => {
    updateQuantity(id, 1); // Start with a quantity of 1
  };

  const updateQuantity = (id, change) => {
    setQuantities((prev) => {
      const newQuantities = { ...prev, [id]: Math.max(0, (prev[id] || 0) + change) };
      updateTotalAmount(newQuantities);
      return newQuantities;
    });
  };

  const updateTotalAmount = (newQuantities) => {
    let total = 0;
    variants.forEach((variant) => {
      total += (newQuantities[variant.id] || 0) * variant.regular_price_int;
    });
    setTotalAmount(total);
  };

  const handleDonateNow = async () => {
    try {
      const items = variants
        .filter((variant) => quantities[variant.id] > 0)
        .map((variant) => ({
          productId: product.id,
          variantId: variant.id,
          quantity: quantities[variant.id],
          message: '-',
        }));

      const data = {
        format: 'stripe',
        isProduction: false,
        payload: {
          companyId: 'vrWcmcy7wEw1BUkQP3l9',
          projectId: 'HWMHbyA6S12FXzVwcru7',
          contactId: `HWMHbyA6S12FXzVwcru7-${phoneNumber}`,
          userId: `HWMHbyA6S12FXzVwcru7-${phoneNumber}`,
          contact_information: {
            name: hideIdentity ? 'Hamba Allah' : name,
            email,
            phone_number: phoneNumber,
          },
          items: items,
          additional_data: { msg: message },
          currency: globalState?.currency,
          region: 'id',
          automatic_payment_methods: true,
          affilate: true,
          affilateId: 'gading123',
        },
      };

      console.log('Donation Data:', data);

      const response = await axios.post('/api/public/payment/stripe/create-payment', data);
      console.log(response, 'ini response');

      const clientSecret = response.data?.data?.client_secret;
      if (!clientSecret) {
        throw new Error('Client secret not found in response');
      }
      router.push({
        pathname: `${router.asPath}/payment`,
        query: { clientSecret },
      });
    } catch (error) {
      console.error('Error initiating payment:', error);
      setError(error.response?.data?.message || 'Failed to process donation.');
    }
  };

  // if (loading) return <div className='text-center py-8'>Loading...</div>;
  if (loading) return <LoadingScreen />;

  if (error) return <div className='text-center py-8 text-red-500'>Error: {error}</div>;

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='sticky top-0 bg-white border-b z-10'>
        <div className='max-w-md mx-auto px-4 h-14 flex items-center'>
          <button
            onClick={() => router.back()}
            className='p-2 -ml-2'>
            <ChevronLeft className='w-6 h-6' />
          </button>
          <h1 className='ml-2 text-lg font-medium truncate'>{product?.name}.</h1>
        </div>
      </div>

      <div className='max-w-md mx-auto px-4 py-4'>
        {/* Campaign Banner */}
        <div className='mb-6'>
          <img
            src={product?.images?.[0]}
            alt='Campaign Banner'
            width={400}
            height={200}
            className='w-full rounded-lg'
          />
          <h2 className='text-xl font-bold mt-4'>{product?.name}</h2>
        </div>

        {/* Donation Options */}
        <div className='space-y-4 mb-6'>
          {variants.map((variant) => (
            <div
              key={variant.id}
              className='bg-white rounded-lg p-4 flex items-center shadow-sm'>
              <img
                src={variant.image}
                alt={variant.name}
                width={100}
                height={100}
                className='w-24 h-24 rounded-lg object-cover'
              />
              <div className='ml-4 flex-1'>
                <h3 className='font-medium'>{variant.name}</h3>
                <p className='text-gray-900 font-medium mt-1'>Rp {variant.regular_price_int}</p>
                {quantities[variant.id] > 0 ? (
                  <div className='flex items-center mt-2'>
                    <button
                      onClick={() => updateQuantity(variant.id, -1)}
                      className='px-3 py-1 border rounded-lg'>
                      -
                    </button>
                    <span className='mx-2'>{quantities[variant.id] || 0}</span>
                    <button
                      onClick={() => updateQuantity(variant.id, 1)}
                      className='px-3 py-1 border rounded-lg'>
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addItem(variant.id)}
                    className='bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors mt-2'>
                    + Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Donation Form */}
        <div className='bg-white rounded-lg p-4 shadow-sm'>
          <div className='mb-4'>
            <p className='mb-2'>Sapaan :</p>
            <div className='flex gap-2'>
              {['Bapak', 'Ibu', 'Kak'].map((salutation) => (
                <button
                  key={salutation}
                  onClick={() => setSelectedSalutation(salutation)}
                  className={`px-6 py-2 rounded-lg ${selectedSalutation === salutation ? 'bg-blue-600 text-white' : 'border text-gray-600'}`}>
                  {salutation}
                </button>
              ))}
            </div>
          </div>

          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Nama Lengkap'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>Sembunyikan nama saya (Hamba Allah)</span>
              <button
                onClick={() => setHideIdentity(!hideIdentity)}
                className={`w-12 h-6 rounded-full transition-colors ${hideIdentity ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${hideIdentity ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <input
              type='tel'
              placeholder='No Whatsapp atau Handphone'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className='w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <input
              type='email'
              placeholder='Email (optional)'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <textarea
              placeholder='Tuliskan pesan atau doa disini (optional)'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className='w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        {/* Total Donation Amount */}
        <div className='fixed bottom-0 left-0 right-0 z-50'>
          <div className='flex justify-center'>
            <button
              onClick={handleDonateNow}
              className='w-full max-w-md mx-auto py-4 rounded-lg font-medium mt-6 bg-blue-600 text-white hover:bg-blue-700 transition-colors'>
              Sedekah Sekarang - Rp {totalAmount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
