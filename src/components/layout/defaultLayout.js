import { useState } from 'react';

const DefaultLayout = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
