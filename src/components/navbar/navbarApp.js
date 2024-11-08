'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Info, HandHeart, Trophy, User } from 'lucide-react';

const menuItems = [
  { id: 'home', label: 'Home', icon: Home, link: '/' },
  { id: 'info', label: 'Info Terbaru', icon: Info, link: '/info' },
  { id: 'galang', label: 'Galang Dana', icon: HandHeart, link: '/galang' },
  { id: 'rekening', label: 'Rekening', icon: Trophy, link: '/rekening' },
  { id: 'user', label: 'User', icon: User, link: '/auth/login' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50 '>
      <div className='max-w-md mx-auto px-4 bg-gradient-to-r from-blue-500 to-blue-600'>
        <ul className='flex justify-between items-center h-16'>
          {menuItems.map((item) => {
            const isActive = pathname === item.link;
            return (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive ? 'text-blue-600 bg-blue-50' : 'text-white hover:text-blue-600 hover:bg-blue-50'}`}>
                  <item.icon className='w-6 h-6' />
                  <span className='text-xs font-medium'>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
