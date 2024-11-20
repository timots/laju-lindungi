'use client';

import { Heart, Repeat, Coins, Grid } from 'lucide-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default function ProgramNavigation() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const handleOpenProgram = (href) => {
    router.push(href);
  };

  const programs = [
    {
      id: 1,
      title: t('menu.button1'),
      icon: Heart,
      href: '/donasi-kemanusiaan',
      color: 'bg-blue-500',
    },
    {
      id: 2,
      title: t('menu.button2'),
      icon: Repeat,
      href: '/sedekah-rutin',
      color: 'bg-blue-500',
    },
    {
      id: 3,
      title: t('menu.button3'),

      icon: Coins,
      href: '/zakat',
      color: 'bg-orange-500',
    },
    {
      id: 4,
      title: t('menu.button4'),
      icon: Grid,
      href: '/semua-program',
      color: 'bg-blue-500',
    },
  ];

  return (
    <div className='mx-auto w-full max-w-md px-4 py-6'>
      <div className='grid grid-cols-4 gap-4'>
        {programs.map((program) => (
          <div
            key={program.id}
            onClick={() => handleOpenProgram(program.href)}
            className='group flex cursor-pointer flex-col items-center text-center'>
            <div className={`mb-2 flex h-14 w-14 items-center justify-center rounded-xl ${program.color} p-2 transition-transform group-hover:scale-105`}>
              <program.icon className='h-8 w-8 text-white' />
            </div>
            <span className='text-xs leading-tight text-gray-700'>{program.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
