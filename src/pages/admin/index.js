'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Tag, ShoppingBag, FileText, UserPlus, FilePlus } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Agent Available', value: '25', icon: <Users className='h-8 w-8 text-blue-500' /> },
    { label: 'Promo Available', value: '10', icon: <Tag className='h-8 w-8 text-green-500' /> },
    { label: 'Buyer', value: '1,805', icon: <ShoppingBag className='h-8 w-8 text-purple-500' /> },
    { label: 'Template', value: '54', icon: <FileText className='h-8 w-8 text-yellow-500' /> },
  ];

  const actionButtons = [
    { label: 'SET Agent', icon: <UserPlus className='h-5 w-5 mr-2' />, color: 'bg-blue-500 hover:bg-blue-600' },
    { label: 'SET Promo', icon: <UserPlus className='h-5 w-5 mr-2' />, color: 'bg-green-500 hover:bg-green-600' },
    { label: 'SET Template', icon: <FilePlus className='h-5 w-5 mr-2' />, color: 'bg-yellow-500 hover:bg-yellow-600' },
  ];

  return (
    <div className='container mx-auto p-4 min-w-screen'>
      <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        {stats.map((stat, index) => (
          <Card
            key={index}
            className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>{stat.label}</p>
                <p className='text-2xl font-bold'>{stat.value}</p>
              </div>
              <div className='text-4xl'>{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
