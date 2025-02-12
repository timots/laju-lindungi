'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from 'lucide-react';
import { format } from 'date-fns';

const articles = [
  {
    id: 1,
    title: 'Makna Lailatul Qadar dalam Sejarah Islam',
    image: '/placeholder.svg?height=400&width=600',
    category: 'ARTIKEL',
    date: 'November 7, 2024',
    comments: 'Tidak ada komentar',
    excerpt: 'Memahami makna dan sejarah malam yang lebih baik dari seribu bulan...',
    slug: 'makna-lailatul-qadar',
  },
  {
    id: 2,
    title: '5 Langkah Refleksi dan Evaluasi Diri di Akhir Ramadhan',
    image: '/placeholder.svg?height=400&width=600',
    category: 'AGAMA',
    date: 'November 6, 2024',
    comments: 'Tidak ada komentar',
    excerpt: 'Panduan praktis melakukan muhasabah di penghujung Ramadhan...',
    slug: '5-langkah-refleksi',
  },
  {
    id: 3,
    title: '3 Dampak Ramadhan terhadap Pola Pinjam-Meminjam di Masyarakat',
    image: '/placeholder.svg?height=400&width=600',
    category: 'ARTIKEL',
    date: 'November 6, 2024',
    comments: 'Tidak ada komentar',
    excerpt: 'Menganalisis perubahan perilaku ekonomi selama bulan Ramadhan...',
    slug: 'dampak-ramadhan-pinjaman',
  },
  {
    id: 4,
    title: '2 Hadis tentang Zakat Fitrah: Kewajiban dan Pahalanya',
    image: '/placeholder.svg?height=400&width=600',
    category: 'ARTIKEL',
    date: 'November 5, 2024',
    comments: 'Tidak ada komentar',
    excerpt: 'Memahami dasar hukum dan keutamaan membayar zakat fitrah...',
    slug: 'hadis-zakat-fitrah',
  },
  // ... more articles with similar structure
].concat(
  Array.from({ length: 16 }, (_, i) => ({
    id: i + 5,
    title: `Artikel Ramadhan ${i + 1}`,
    image: '/placeholder.svg?height=400&width=600',
    category: i % 2 === 0 ? 'ARTIKEL' : 'AGAMA',
    date: 'November 5, 2024',
    comments: 'Tidak ada komentar',
    excerpt: 'Lorem ipsum dolor sit amet...',
    slug: `artikel-${i + 5}`,
  }))
);

function ArticleCard({ article }) {
  return (
    <div className='bg-white rounded-2xl overflow-hidden shadow-sm mb-4'>
      <Link href={`/artikel/${article.slug}`}>
        <div className='relative'>
          <img
            src={article.thumbnail_image || 'https://picsum.photos/600/400'}
            alt={article.title}
            width={600}
            height={400}
            className='w-full h-48 object-cover'
          />
          <span className={`absolute top-4 right-4 ${article.category === 'ARTIKEL' ? 'bg-emerald-500' : 'bg-emerald-500'} text-white text-xs px-4 py-1 rounded-full`}>{article.category || 'ARTIKEL'}</span>
        </div>
      </Link>
      <div className='p-4'>
        <Link href={`/artikel/${article.slug}`}>
          <h2 className='text-lg font-semibold text-orange-500 hover:text-orange-600 mb-2'>{article.title}</h2>
        </Link>
        <Link
          href={`/article/${article.id}`}
          className='text-emerald-500 text-sm font-medium hover:text-emerald-600'>
          READ MORE »
        </Link>
        <div className='mt-4 text-sm text-gray-500 flex items-center justify-between'>
          {/* <span>{article.createdAt}</span> */}
          <span>{format(new Date(article?.createdAt._seconds * 1000), 'MMMM d, yyyy')}</span>
          <span>{article.comments || 'Tidak ada komentar'}</span>
        </div>
      </div>
    </div>
  );
}

export default function CardBig(articleCard) {
  const [visibleArticles, setVisibleArticles] = useState(5);

  const loadMore = () => {
    setVisibleArticles((prev) => Math.min(prev + 5, articleCard?.articleCard?.length));
  };

  return (
    <div className='px-4 py-4'>
      <div className='space-y-4'>
        {articleCard?.articleCard?.slice(0, visibleArticles).map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
          />
        ))}
      </div>
      {visibleArticles < articleCard?.articleCard?.length && (
        <div className='mt-6 text-center'>
          <button
            onClick={loadMore}
            className='bg-emerald-500 text-white px-6 py-2 rounded-full hover:bg-emerald-600 transition-colors'>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
