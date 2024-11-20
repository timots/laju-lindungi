import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { CheckCircle, Clock } from 'lucide-react';
import { differenceInDays } from 'date-fns';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Progress } from '@radix-ui/react-progress';

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
              key={campaign.id}
              className='block'>
              <div className='bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow'>
                <div className='flex gap-4 p-4'>
                  <div className='flex-shrink-0'>
                    <img
                      src={campaign?.images?.[0] || '/placeholder.svg'}
                      alt={campaign.name}
                      width={160}
                      height={120}
                      className='rounded-lg object-cover w-[160px] h-[120px]'
                    />
                  </div>
                  <div className='flex-grow min-w-0 space-y-2'>
                    <h3 className='font-semibold text-gray-900 text-lg line-clamp-2'>{campaign.name}</h3>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-gray-600'>{campaign.vendor}</span>
                      {campaign.status && <CheckCircle className='w-4 h-4 text-blue-500 flex-shrink-0' />}
                    </div>
                    <div className='space-y-2'>
                      <div className='flex items-center gap-1'>
                        <span className='font-bold text-orange-500 text-lg'>Rp {parseInt(campaign.amount_total || 0).toLocaleString('id-ID')}</span>
                        <span className='text-sm text-gray-500'>terkumpul</span>
                      </div>
                      <Progress
                        value={60}
                        className='h-2 bg-orange-100'
                        indicatorClassName='bg-orange-500'
                      />
                      <div className='flex items-center justify-between pt-1'>
                        <div className='flex -space-x-2'>
                          {campaign.orders?.slice(0, 4).map((donor, index) => (
                            <Avatar
                              key={index}
                              className='w-6 h-6 border-2 border-white'>
                              <AvatarFallback className='bg-orange-500 text-[10px] text-white'>{donor.contact_information?.name?.[0]}</AvatarFallback>
                            </Avatar>
                          ))}
                          {campaign.orders?.length > 4 && (
                            <Avatar className='w-6 h-6 border-2 border-white'>
                              <AvatarFallback className='bg-orange-500 text-[10px] text-white'>+{campaign.orders.length - 4}</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                          <Clock className='w-4 h-4' />
                          <span>{campaign?.endAt?._seconds ? `${differenceInDays(new Date(campaign.endAt._seconds * 1000), new Date())} hari lagi` : '∞'}</span>
                        </div>
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
