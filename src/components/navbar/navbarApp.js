// components/Navbar.js
import React from 'react';
import { useRouter } from 'next/router';
import { Home, Info, HandHeart, Trophy, User } from 'lucide-react';

const Navbar = () => {
  const router = useRouter();

  const menuItems = [
    { id: 'Home', label: 'Home', icon: Home, link: '/' },
    { id: 'Info terbaru', label: 'Info Terbaru', icon: Info, link: '/info' },
    { id: 'Galang Dana', label: 'Galang Dana', icon: HandHeart, link: '/galang' },
    { id: 'Ranking', label: 'Ranking', icon: Trophy, link: '/ranking' },
    { id: 'User', label: 'User', icon: User, link: '/user' },
  ];

  const handleClick = (link) => {
    router.push(link);
  };

  return (
    <nav className='fixed bottom-0 w-full bg-white border-t'>
      <div className='max-w-lg mx-auto flex justify-around p-2'>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.link)}
            className='flex flex-col items-center gap-1 text-gray-500 hover:text-blue-500'>
            <item.icon className='w-6 h-6' />
            <span className='text-xs'>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
