import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const campaigns = [
  {
    id: 1,
    title: 'Ayo Berikan Kehangatan Untuk Warga Palestina',
    image: '/placeholder.svg?height=120&width=200',
    organization: 'Yayasan Langkah Maju Peduli',
    raised: 'Rp 820.000',
    timeLeft: '3 bulan, 21 hari lagi',
    verified: true,
    badges: ['1', 'C', 'E', '+'],
  },
  {
    id: 2,
    title: 'Ayo Patungan Sedekah Karpet Musholla Al Muhajirin',
    image: '/placeholder.svg?height=120&width=200',
    organization: 'Yayasan Langkah Maju Peduli',
    raised: 'Rp 0',
    timeLeft: '1 bulan, 25 hari lagi',
    verified: true,
  },
  {
    id: 3,
    title: 'Tebus Dosa dan Raih Rahmat dengan Bayar Kafarat',
    image: '/placeholder.svg?height=120&width=200',
    organization: 'Yayasan Langkah Maju Peduli',
    raised: 'Rp 5.350.000',
    timeLeft: '2 bulan, 3 hari lagi',
    verified: true,
    badges: ['1', 'C', 'E', '+'],
  },
  {
    id: 4,
    title: 'Sedekah Semen Untuk Renovasi Musholla Al-Ikhlas',
    image: '/placeholder.svg?height=120&width=200',
    organization: 'Yayasan Langkah Maju Peduli',
    raised: 'Rp 200.000',
    timeLeft: '1 bulan, 12 hari lagi',
    verified: true,
    status: 'active',
  },
  {
    id: 5,
    title: 'Sedekah Berbagi Makan Sehat',
    image: '/placeholder.svg?height=120&width=200',
    organization: 'Yayasan Langkah Maju Peduli',
    raised: 'Rp 1.058.000',
    verified: true,
    badges: ['1', 'C', 'E', '+'],
    status: 'active',
  },
];

const CardList = () => {
  return (
    <div className='max-w-3xl mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-6'>Luaskan Pedulimu</h2>
      <div className='space-y-4'>
        {campaigns.map((campaign) => (
          <Link
            href='#'
            key={campaign.id}>
            <div className='bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow'>
              <div className='flex gap-4'>
                <div className='flex-shrink-0'>
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    width={120}
                    height={80}
                    className='rounded-lg object-cover'
                  />
                </div>
                <div className='flex-grow min-w-0'>
                  <div className='flex items-center gap-2 mb-1'>
                    <span className='text-sm text-gray-600'>{campaign.organization}</span>
                    {campaign.verified && <CheckCircle className='w-4 h-4 text-blue-500 flex-shrink-0' />}
                  </div>
                  <h3 className='font-semibold text-gray-900 mb-2 line-clamp-2'>{campaign.title}</h3>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='font-bold text-orange-500'>{campaign.raised}</span>
                    <span className='text-sm text-gray-500'>terkumpul</span>
                  </div>
                  <div className='w-full bg-gray-100 rounded-full h-1.5 mb-2'>
                    <div
                      className='bg-orange-500 h-1.5 rounded-full'
                      style={{ width: campaign.raised === 'Rp 0' ? '0%' : '45%' }}
                    />
                  </div>
                  <div className='flex items-center justify-between'>
                    {campaign.badges && (
                      <div className='flex gap-1'>
                        {campaign.badges.map((badge, index) => (
                          <span
                            key={index}
                            className='bg-orange-50 text-orange-500 text-xs px-2 py-0.5 rounded'>
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                    {campaign.timeLeft && <span className='text-sm text-gray-500'>{campaign.timeLeft}</span>}
                    {campaign.status === 'ended' && <span className='text-sm text-orange-500'>sudah berakhir</span>}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className='text-center mt-6'>
        <button className='text-blue-500 border border-blue-500 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors'>Load more</button>
      </div>
    </div>
  );
};

export default CardList;
