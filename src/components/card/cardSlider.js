import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

const CampaignCard = ({ campaign }) => {
  console.log(campaign, 'ini campaign');
  const router = useRouter();

  const createSlug = (title) => {
    console.log(title);
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const handleCardClick = () => {
    console.log(campaign.name, 'ini name');

    const slug = createSlug(campaign.name);
    router.push(`${router.asPath}/campaign/${slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className='block cursor-pointer'>
      <div className='bg-white rounded-xl overflow-hidden shadow-lg'>
        <div className='relative'>
          <img
            src={campaign.images[0] || '/placeholder.svg'}
            alt={campaign.name}
            width={400}
            height={200}
            className='w-full h-48 object-cover'
          />
          {campaign.verified && <div className='absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded'>Verified</div>}
        </div>
        <div className='p-4'>
          <h3 className='font-semibold text-gray-800 mb-2 line-clamp-2'>{campaign.name || 'No Name'}</h3>
          <p className='text-sm text-gray-600 mb-3'>{campaign.type}</p>
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span className='font-semibold text-orange-500'>{campaign.modal_price_int}</span>
              <span className='text-gray-500'>terkumpul</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-orange-500 h-2 rounded-full'
                style={{ width: `${campaign.sale_price_int}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardSlider = ({ Header, BgColour }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  console.log(campaigns, 'ini campaign di slider');
  const totalSlides = Math.ceil(campaigns.length / 2);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className={`p-8 ${BgColour}`}>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl md:text-3xl font-bold text-white mb-6 text-center'>{Header}</h2>
        <div className='relative'>
          <div className='overflow-hidden'>
            <div
              className='flex transition-transform duration-300 ease-in-out'
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {Array.from({ length: totalSlides }).map((_, index) => (
                <div
                  key={index}
                  className='w-full flex-shrink-0 flex gap-6'>
                  {campaigns.slice(index * 2, index * 2 + 2).map((campaign) => (
                    <div
                      key={campaign.id}
                      className='w-1/2'>
                      <CampaignCard campaign={campaign} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className='absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </div>
        <div className='flex justify-center gap-2 mt-6'>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white opacity-50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
