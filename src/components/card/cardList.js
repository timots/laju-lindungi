import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { CheckCircle, Clock } from 'lucide-react';

const CardList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaignData = async () => {
    try {
      const requestData = {
        companyId: 'vrWcmcy7wEw1BUkQP3l9',
        projectId: 'HWMHbyA6S12FXzVwcru7',
      };

      const response = await axios.post('/api/v1/article/read', requestData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Gagal memuat data');
    }
  };

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

  if (loading) return <div className='text-center py-8'>Loading...</div>;
  if (error) return <div className='text-center py-8 text-red-500'>Error: {error}</div>;

  return (
    <div className='max-w-3xl mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-6'>Luaskan Pedulimu</h2>
      <div className='space-y-4'>
        {Array.isArray(campaigns) && campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <Link
              href={`/campaign/${campaign.id}`}
              key={campaign.id}>
              <div className='bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow'>
                <div className='flex gap-4'>
                  <div className='flex-shrink-0'>
                    <img
                      src={campaign?.images?.[0] || '/placeholder.svg'}
                      alt={campaign.name}
                      width={120}
                      height={80}
                      className='rounded-lg object-cover w-[120px] h-[80px]'
                    />
                  </div>
                  <div className='flex-grow min-w-0'>
                    <h3 className='font-semibold text-gray-900 mb-1 line-clamp-2'>{campaign.name}</h3>
                    <div className='flex items-center gap-1 mb-2'>
                      <span className='text-sm text-gray-600'>{campaign.vendor}</span>
                      {campaign.status && <CheckCircle className='w-4 h-4 text-blue-500 flex-shrink-0' />}
                    </div>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='font-bold text-orange-500'>Rp {parseInt(campaign.amount_total || 0).toLocaleString('id-ID')}</span>
                      <span className='text-sm text-gray-500'>terkumpul</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='flex gap-1'>
                        {campaign.orders.map((order, index) => {
                          const initial = order.contact_information?.name?.[0] || '';

                          return (
                            <span
                              key={index}
                              className='w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold'>
                              {initial}
                            </span>
                          );
                        })}
                      </div>

                      <div className='flex items-center text-sm text-gray-500'>
                        <Clock className='w-4 h-4 mr-1' />
                        <span>1 bulan, 10 hari lagi</span>
                      </div>
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
