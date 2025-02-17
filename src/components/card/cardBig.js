'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from 'lucide-react';
import { format } from 'date-fns';

function ArticleCard({ article }) {
  return (
    <div className='bg-white rounded-2xl overflow-hidden shadow-sm mb-4'>
      <Link href={`/article/${article.id}`}>
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
        <Link href={`/article/${article.id}`}>
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
