import { useEffect, useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { useRouter } from 'next/router';
import axios from 'axios';
import useUserStore from '@/hooks/zustand';
import { LoadingScreen } from '@/components/loading/loadingScreen';
import { useTranslation } from 'react-i18next';
import { trackPixelEvents } from '@/utils/pixelUtil';

export default function DonationPage() {
  const router = useRouter();
  const globalState = useUserStore();
  const { t, i18n } = useTranslation();
  const [selectedSalutation, setSelectedSalutation] = useState('Bapak');
  const [hideIdentity, setHideIdentity] = useState(false);
  const [variants, setVariants] = useState([]);
  const [customVariants, setCustomVariants] = useState([]);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [donationLoading, setDonationLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [showInputPrice, setShowInputPrice] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [customVariantAmounts, setCustomVariantAmounts] = useState({});

  useEffect(() => {
    if (i18n.isInitialized) {
      setLoading(false);
    }
  }, [i18n]);

  const formatPrice = (currency, amount) => {
    // Mapping for custom currency symbols
    const currencySymbols = {
      IDR: 'Rp.',
      MYR: 'RM ',
      USD: '$ ',
    };

    const symbol = currencySymbols[currency] || ''; // Default to empty string if currency is not mapped

    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    });

    // Format amount and replace the default currency symbol with our custom symbol
    return formatter
      .format(amount)
      .replace(/^\D+/g, symbol) // Replace leading currency symbol (if any) with our custom symbol
      .trim();
  };

  const handleGetVariants = async (id) => {
    try {
      if (!id) return;

      const country = globalState?.location?.toLowerCase() || '';
      const response = await axios.post('/api/v1/variants/read', {
        productId: id,
        country,
      });
      return response.data;
    } catch (error) {
      console.error(error.message);
      setError('Gagal memuat data kampanye.');
    }
  };

  const handleGetCampaigns = async (id) => {
    try {
      if (!id) return;
      const response = await axios.post('/api/v1/article/read', {
        productId: id,
      });
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
      setProduct(product?.data || {});

      const validVariants = [];
      const customVariants = [];

      // Split variants based on regular_price_int
      (variants?.data || []).forEach((variant) => {
        if (variant.regular_price_int === 0) {
          customVariants.push(variant); // If regular_price_int is 0, add to customVariants
        } else {
          validVariants.push(variant); // Otherwise, add to validVariants
        }
      });

      // Set the appropriate state
      setVariants(validVariants);
      setCustomVariants(customVariants);

      // Initialize quantities for valid variants
      const initialQuantities = validVariants.reduce((acc, variant) => {
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

  const addCustomVariantAmount = (id) => {
    const paymentButtonEvent = globalState?.webConfig?.aditionalDataPixels?.selectVariantButton || 'initiate_checkout';

    trackPixelEvents({
      eventName: paymentButtonEvent,
      eventData: {
        content_name: product?.name,
        content_ids: product?.id,
        currency: globalState?.currency || 'IDR',
        payment_method: 'stripe',
      },
      dynamicTagPixels: paymentButtonEvent,
    });
    setShowInputPrice(true);
    updateTotalAmount(null);
    setCustomVariantAmounts((prev) => ({
      ...prev,
      [id]: 0, // Default value
    }));
  };

  const handleCustomAmountChange = (id, value) => {
    // Ensure the value is a number and not negative
    const newValue = Math.max(0, parseInt(value) || 0);

    setCustomVariantAmounts((prev) => {
      const updatedAmounts = { ...prev, [id]: newValue };
      updateTotalAmount(null, updatedAmounts);
      return updatedAmounts;
    });
  };

  const addItem = (id, price) => {
    const paymentButtonEvent = globalState?.webConfig?.aditionalDataPixels?.selectVariantButton || 'initiate_checkout';

    trackPixelEvents({
      eventName: paymentButtonEvent,
      eventData: {
        content_name: product?.name,
        content_ids: product?.id,
        currency: globalState?.currency || 'IDR',
        payment_method: 'stripe',
      },
      dynamicTagPixels: paymentButtonEvent,
    });
    setShowInputPrice(false);
    updateQuantity(id, 1);
  };

  const updateQuantity = (id, change) => {
    setQuantities((prev) => {
      const newQuantities = {
        ...prev,
        [id]: Math.max(0, (prev[id] || 0) + change),
      };
      updateTotalAmount(newQuantities, null);
      return newQuantities;
    });
  };

  const updateTotalAmount = (newQuantities = {}, customAmounts = {}) => {
    let total = 0;

    // Jika newQuantities tersedia, atur semua value di customVariantAmounts menjadi 0
    if (newQuantities) {
      setCustomVariantAmounts((prev) => {
        const resetCustomAmounts = Object.keys(prev).reduce((acc, key) => {
          acc[key] = 0;
          return acc;
        }, {});
        return resetCustomAmounts;
      });

      // Hitung total untuk regular variants
      variants.forEach((variant) => {
        total += (newQuantities[variant.id] || 0) * variant.regular_price_int;
      });
    }

    // Jika customAmounts tersedia, atur semua value di quantities menjadi 0
    if (customAmounts) {
      setQuantities((prev) => {
        const resetQuantities = Object.keys(prev).reduce((acc, key) => {
          acc[key] = 0;
          return acc;
        }, {});
        return resetQuantities;
      });

      // Tambahkan total untuk custom variants
      Object.keys(customAmounts).forEach((id) => {
        const amount = customAmounts[id] || 0;
        const variant = customVariants.find((v) => v.id === id);
        if (variant) {
          total += amount;
        }
      });
    }

    setTotalAmount(total);
  };

  const handleDonateNow = async () => {
    setDonationLoading(true);
    try {
      const variantItems = variants
        .filter((variant) => quantities[variant.id] > 0)
        .map((variant) => ({
          productId: product.id,
          variantId: variant.id,
          quantity: quantities[variant.id],
          message: '-',
        }));

      const customVariantItems = customVariants
        .filter((variant) => customVariantAmounts[variant.id] > 0)
        .map((variant) => ({
          productId: product.id,
          variantId: variant.id,
          quantity: 1,
          message: '-',
          regular_price_int: totalAmount,
        }));

      // Gabungkan semua items
      const items = [...variantItems, ...customVariantItems];

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
          region: globalState?.countryCode,
          automatic_payment_methods: true,
          affilate: true,
          affilateId: 'gading123',
        },
      };

      const paymentButtonEvent = globalState?.webConfig?.aditionalDataPixels?.paymentButton || 'initiate_checkout';

      trackPixelEvents({
        eventName: paymentButtonEvent,
        eventData: {
          content_name: product?.name,
          content_ids: product?.id,
          value: totalAmount,
          currency: globalState?.currency || 'IDR',
          payment_method: 'stripe',
        },
        dynamicTagPixels: paymentButtonEvent,
      });

      const response = await axios.post('/api/public/payment/stripe/create-payment', data);

      console.log(response, 'responseeee');

      // if (response?.data?.status === true && response?.data?.data) {
      //   window.open(response.data.data, '_blank');
      // } else {
      //   setError('Unable to process payment. Please try again.');
      // }

      const clientSecret = response?.data?.data?.client_secret;
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
    } finally {
      setDonationLoading(false);
    }
  };

  useEffect(() => {
    if (router?.query?.id) {
      loadCampaigns();
    }
  }, [router?.query?.id]);

  useEffect(() => {
    const checkoutPageEvent = globalState?.webConfig?.aditionalDataPixels?.checkoutPage || 'InitiateCheckout';

    // Track pixel events when page loads
    trackPixelEvents({
      eventName: checkoutPageEvent,
      eventData: {
        content_name: product?.name,
        content_ids: product?.id,
        currency: globalState?.currency || 'IDR',
      },
      dynamicTagPixels: checkoutPageEvent,
    });
  }, [product?.id]);

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
        <div className='flex flex-col sm:flex-row gap-4 mb-6 bg-white rounded-lg p-4 shadow-sm'>
          <div className='w-full sm:w-[120px] h-[120px] flex-shrink-0'>
            <img
              src={product?.images?.[0]}
              alt='Campaign Banner'
              className='w-full h-full object-cover rounded-lg'
            />
          </div>
          <div className='flex flex-col justify-center'>
            <h2 className='text-lg font-semibold text-[#000000] line-clamp-2'>{product?.name}</h2>
          </div>
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
                <p className='text-gray-900 font-medium mt-1'>{formatPrice(globalState?.currency || 'IDR', variant.regular_price_int)}</p>

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
                    onClick={() => addItem(variant.id, variant?.regular_price_int)}
                    className='bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors mt-2'>
                    + Add
                  </button>
                )}
              </div>
            </div>
          ))}

          {customVariants.map((variant) => (
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

                {showInputPrice ? (
                  <div className='mt-3'>
                    <div className='relative'>
                      <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>{globalState?.currency}</span>
                      <input
                        type='number'
                        min='0'
                        placeholder='Masukkan Nominal Yang Di Inginkan'
                        value={customVariantAmounts[variant.id] || ''}
                        onChange={(e) => handleCustomAmountChange(variant.id, e.target.value)}
                        className='w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => addCustomVariantAmount(variant.id)}
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
          {/* <div className='mb-4'>
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
          </div> */}

          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Input Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <input
              type='tel'
              placeholder='Phone Number'
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
              placeholder='Create a pray for Them (optional)'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className='w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        <div className=' bottom-0 left-0 right-0 z-50'>
          <div className='flex justify-center'>
            <button
              onClick={handleDonateNow}
              disabled={donationLoading}
              className={`w-full max-w-md mx-auto py-4 rounded-lg font-medium mt-6 transition-colors ${donationLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
              {donationLoading ? (
                <span className='flex items-center justify-center'>
                  <svg
                    className='w-5 h-5 mr-2 text-blue-600 animate-spin'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8v8z'></path>
                  </svg>
                </span>
              ) : (
                <>
                  Sedekah Sekarang <span>{formatPrice(globalState?.currency || 'IDR', totalAmount)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
