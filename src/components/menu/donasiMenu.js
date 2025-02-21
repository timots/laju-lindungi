'use client';

import { Heart, Repeat, Coins, Grid } from 'lucide-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default function ProgramNavigation({ button1, button2, button3, button4 }) {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  console.log({
    button1Data: button1,
    button2Data: button2,
    button3Data: button3,
    button4Data: button4,
  });

  // const handleOpenProgram = (href) => {
  //   router.push(href);
  // };

  const handleOpenProgram = (program) => {
    const queryTags = program.tags.join(',');

    router.push({
      pathname: '/categories/tags',
      query: {
        tags: queryTags,
        name: program.title,
      },
    });
  };

  const programs = [
    {
      id: 1,
      title: button1?.name || t('menu.button1'),
      icon: button1?.image ? null : Heart,
      image: button1?.image || null,
      href: '/donasi-kemanusiaan',
      color: 'bg-blue-500',
      tags: button1?.tags || [],
    },
    {
      id: 2,
      title: button2?.name || t('menu.button2'),
      icon: button2?.image ? null : Repeat,
      image: button2?.image || null,
      href: '/sedekah-rutin',
      color: 'bg-blue-500',
      tags: button2?.tags || [],
    },
    {
      id: 3,
      title: button3?.name || t('menu.button3'),
      icon: button3?.image ? null : Coins,
      image: button3?.image || null,
      href: '/zakat',
      color: 'bg-orange-500',
      tags: button3?.tags || [],
    },
    {
      id: 4,
      title: button4?.name || t('menu.button4'),
      icon: button4?.image ? null : Grid,
      image: button4?.image || null,
      href: '/semua-program',
      color: 'bg-blue-500',
      tags: button4?.tags || [],
    },
  ];

  return (
    <div className='mx-auto w-full max-w-md px-4 py-6'>
      <div className='grid grid-cols-4 gap-4'>
        {programs.map((program) => (
          <div
            key={program.id}
            onClick={() => handleOpenProgram(program)}
            className='group flex cursor-pointer flex-col items-center text-center'>
            <div className={`mb-2 flex h-14 w-14 items-center justify-center rounded-xl ${program.color} p-2 transition-transform group-hover:scale-105`}>
              {program.image ? (
                <img
                  src={program.image}
                  alt={program.title}
                  width={32}
                  height={32}
                  className='text-white'
                />
              ) : (
                program.icon && <program.icon className='h-8 w-8 text-white' />
              )}
            </div>
            <span className='text-xs leading-tight text-gray-700'>{program.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
