// components/Sidebar.js
import React from 'react';
import { LayoutDashboard, UserCog, FileEdit, Calculator, BarChart, Settings } from 'lucide-react';
import { useRouter } from 'next/router';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const router = useRouter();
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, link: '/admin' },
    { id: 'users', label: 'User Management', icon: UserCog, link: '/admin/users' },
    { id: 'content', label: 'Content Management', icon: FileEdit, link: '/admin/content' },
    { id: 'calculator', label: 'Zakat Calculator', icon: Calculator, link: '/admin/calculator' },
    { id: 'reports', label: 'Report & Analytics', icon: BarChart, link: '/admin/report' },
    { id: 'settings', label: 'Settings', icon: Settings, link: '/admin/settings' },
  ];

  return (
    <aside className='w-64 bg-white shadow-md'>
      <div className='p-4'>
        <h2 className='text-2xl font-semibold text-gray-800'>Admin Panel</h2>
      </div>
      <nav className='mt-4'>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center w-full px-4 py-2 text-left ${activeMenu === item.id ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => {
              setActiveMenu(item.id);
              router.push(item.link);
            }}>
            <item.icon className='w-5 h-5 mr-3' />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
