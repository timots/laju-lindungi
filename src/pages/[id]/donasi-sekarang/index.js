import { useEffect, useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { useRouter } from 'next/router';
import axios from 'axios';

const paymentMethods = [
  { id: 'bsi', name: 'VA Bank Syariah Indonesia', type: 'virtual' },
  { id: 'bca', name: 'VA Bank BCA', type: 'virtual' },
  { id: 'mandiri', name: 'VA Bank Mandiri', type: 'virtual' },
  { id: 'bni', name: 'VA Bank BNI', type: 'virtual' },
  { id: 'bri', name: 'VA Bank BRI', type: 'virtual' },
  { id: 'muamalat', name: 'VA Bank Muamalat', type: 'virtual' },
  { id: 'cimb', name: 'VA Bank CIMB Niaga', type: 'virtual' },
  { id: 'permata', name: 'VA Permata Bank', type: 'virtual' },
  { id: 'danamon', name: 'VA Bank Danamon', type: 'virtual' },
  { id: 'agi', name: 'VA Bank Artha Graha Internasional', type: 'virtual' },
  { id: 'flip', name: 'Flip Transfer', type: 'transfer' },
  { id: 'bsi_transfer', name: 'Transfer Bank Syariah Indonesia', type: 'transfer' },
];

export default function DonationPage() {
  const router = useRouter();
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

  if (loading) return <div className='text-center py-8'>Loading...</div>;
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
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <img
                src='/bank-icon.png'
                alt='Bank Icon'
                width={24}
                height={24}
              />
              <span className='text-gray-700'>Metode Pembayaran</span>
            </div>
            <button
              onClick={togglePaymentModal}
              className='text-blue-600 px-4 py-2 border border-blue-600 rounded-lg'>
              {selectedPaymentMethod ? selectedPaymentMethod.name : 'Pilih'}
            </button>
          </div>

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
              className='w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <input
              type='email'
              placeholder='Email (optional)'
              className='w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <textarea
              placeholder='Tuliskan pesan atau doa disini (optional)'
              rows={4}
              className='w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        {/* Total Donation Amount */}
        <div className='fixed bottom-0 left-0 right-0 z-50'>
          <div className='flex justify-center'>
            <button className='w-full max-w-md mx-auto py-4 rounded-lg font-medium mt-6 bg-blue-600 text-white hover:bg-blue-700 transition-colors'>Sedekah Sekarang - Rp {totalAmount}</button>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg w-full max-w-md mx-4'>
            <div className='flex justify-between items-center p-4 border-b'>
              <h2 className='text-lg font-semibold'>Metode Pembayaran</h2>
              <button onClick={togglePaymentModal}>
                <X className='w-6 h-6' />
              </button>
            </div>
            <div className='p-4 max-h-[70vh] overflow-y-auto'>
              <h3 className='font-semibold mb-2'>Virtual Account (Verifikasi Otomatis)</h3>
              {paymentMethods
                .filter((method) => method.type === 'virtual')
                .map((method) => (
                  <button
                    key={method.id}
                    onClick={() => selectPaymentMethod(method)}
                    className='w-full text-left py-2 px-4 hover:bg-gray-100 flex items-center'>
                    <img
                      src={`/${method.id}-logo.png`}
                      alt={method.name}
                      width={40}
                      height={40}
                      className='mr-4'
                    />
                    {method.name}
                  </button>
                ))}
              <h3 className='font-semibold mb-2 mt-4'>Transfer Bank (Verifikasi Manual 1x24jam)</h3>
              {paymentMethods
                .filter((method) => method.type === 'transfer')
                .map((method) => (
                  <button
                    key={method.id}
                    onClick={() => selectPaymentMethod(method)}
                    className='w-full text-left py-2 px-4 hover:bg-gray-100 flex items-center'>
                    <img
                      src={`/${method.id}-logo.png`}
                      alt={method.name}
                      width={40}
                      height={40}
                      className='mr-4'
                    />
                    {method.name}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
