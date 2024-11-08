'use client';

import Image from 'next/image';
import { useRouter } from 'next/router';

const programs = [
  {
    id: 1,
    title: 'Donasi Kemanusiaan',
    icon: '/placeholder.svg?height=60&width=60',
    href: '/donasi-kemanusiaan',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'Sedekah Rutin',
    icon: '/placeholder.svg?height=60&width=60',
    href: '/sedekah-rutin',
    color: 'bg-blue-500',
  },
  {
    id: 3,
    title: 'Zakat',
    icon: '/placeholder.svg?height=60&width=60',
    href: '/zakat',
    color: 'bg-orange-500',
  },
  {
    id: 4,
    title: 'Semua Program Kebaikan',
    icon: '/placeholder.svg?height=60&width=60',
    href: '/semua-program',
    color: 'bg-blue-500',
  },
];

export default function ProgramNavigation() {
  const router = useRouter();

  const handleOpenProgram = (href) => {
    router.push(href);
  };

  return (
    <div className='w-full max-w-md mx-auto px-4 py-6'>
      <div className='grid grid-cols-4 gap-4'>
        {programs.map((program) => (
          <div
            key={program.id}
            onClick={() => handleOpenProgram(program.href)}
            className='flex flex-col items-center text-center group cursor-pointer'>
            <div className={`w-14 h-14 rounded-xl ${program.color} p-2 mb-2 transition-transform group-hover:scale-105`}>
              <Image
                src={program.icon}
                alt=''
                width={60}
                height={60}
                className='w-full h-full object-contain'
              />
            </div>
            <span className='text-xs text-gray-700 leading-tight'>{program.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
