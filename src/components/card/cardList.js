import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const CardList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaignData = async () => {
    try {
      const requestData = {
        companyId: 'vrWcmcy7wEw1BUkQP3l9',
        slug: 'donasi-kambing-guling',
        projectId: 'HWMHbyA6S12FXzVwcru7',
      };

      const response = await axios.post('/api/v1/article/read', requestData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Gagal memuat data');
    }
  };

  console.log(campaigns, 'ini campaign');

  useEffect(() => {
    const loadCampaigns = async () => {
      setLoading(true);
      try {
        const data = await fetchCampaignData();
        setCampaigns(data?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='max-w-3xl mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-6'>Luaskan Pedulimu</h2>
      <div className='space-y-4'>
        {Array.isArray(campaigns) && campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <Link
              href='#'
              key={campaign.id}>
              <div className='bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow'>
                <div className='flex gap-4'>
                  <div className='flex-shrink-0'>
                    <img
                      src={campaign.images[0] || '/placeholder.svg'}
                      alt={campaign.name}
                      width={120}
                      height={80}
                      className='rounded-lg object-cover'
                    />
                  </div>
                  <div className='flex-grow min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <span className='text-sm text-gray-600'>{campaign.companyId}</span> {/* Mengganti organization */}
                      {campaign.status && <CheckCircle className='w-4 h-4 text-blue-500 flex-shrink-0' />} {/* Cek status */}
                    </div>
                    <h3 className='font-semibold text-gray-900 mb-2 line-clamp-2'>{campaign.name}</h3> {/* Menggunakan name */}
                    <div className='flex items-center justify-between mb-2'>
                      <span className='font-bold text-orange-500'>{campaign.sale_price === '0' ? 'Rp 0' : `Rp ${campaign.sale_price}`}</span> {/* Menampilkan sale_price */}
                      <span className='text-sm text-gray-500'>terkumpul</span>
                    </div>
                    <div className='w-full bg-gray-100 rounded-full h-1.5 mb-2'>
                      <div
                        className='bg-orange-500 h-1.5 rounded-full'
                        style={{ width: campaign.sale_price === '0' ? '0%' : '45%' }}
                      />
                    </div>
                    <div className='flex items-center justify-between'>
                      {campaign.upsell && (
                        <div className='flex gap-1'>
                          <span className='bg-orange-50 text-orange-500 text-xs px-2 py-0.5 rounded'>{campaign.upsell}</span>
                        </div>
                      )}
                      {/* Membatasi panjang deskripsi */}
                      <span className='text-sm text-gray-500 line-clamp-3'>{campaign.description}</span>
                      {/* Menggunakan line-clamp-3 untuk membatasi teks menjadi 3 baris */}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className='text-center text-gray-500'>Tidak ada artikel terbaru</div>
        )}
      </div>
      {Array.isArray(campaigns) && campaigns.length > 0 && (
        <div className='text-center mt-6'>
          <button className='text-blue-500 border border-blue-500 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors'>Load more</button>
        </div>
      )}
    </div>
  );
};

export default CardList;
