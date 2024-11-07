import React, { useState } from 'react';
import { Bell, Calendar, DollarSign, Users, FileText, LayoutDashboard, UserCog, FileEdit, Calculator, BarChart, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Pembayaran zakat baru diterima', time: '5 menit yang lalu' },
    { id: 2, message: 'Donasi baru untuk program pendidikan', time: '1 jam yang lalu' },
    { id: 3, message: 'Laporan bulanan siap diunduh', time: '3 jam yang lalu' },
  ]);

  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: UserCog },
    { id: 'content', label: 'Content Management', icon: FileEdit },
    { id: 'calculator', label: 'Zakat Calculator', icon: Calculator },
    { id: 'reports', label: 'Report & Analytics', icon: BarChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className='flex h-screen bg-gray-100'>
      <div className='flex-1 overflow-auto'>
        <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Total Pengguna</CardTitle>
                <Users className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>1,234</div>
                <p className='text-xs text-muted-foreground'>+20% dari bulan lalu</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Total Zakat</CardTitle>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>Rp 567,890,000</div>
                <p className='text-xs text-muted-foreground'>+15% dari bulan lalu</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Total Donasi</CardTitle>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>Rp 234,567,000</div>
                <p className='text-xs text-muted-foreground'>+10% dari bulan lalu</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Program Aktif</CardTitle>
                <FileText className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>12</div>
                <p className='text-xs text-muted-foreground'>2 program baru bulan ini</p>
              </CardContent>
            </Card>
          </div>

          <div className='mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Konten Terbaru</CardTitle>
                <CardDescription>Artikel dan pengumuman yang baru dipublikasikan</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-4'>
                  <li className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <FileText className='h-6 w-6' />
                    </div>
                    <div>
                      <p className='font-medium'>Panduan Zakat Fitrah 2024</p>
                      <p className='text-sm text-muted-foreground'>Dipublikasikan 2 hari yang lalu</p>
                    </div>
                  </li>
                  <li className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <FileText className='h-6 w-6' />
                    </div>
                    <div>
                      <p className='font-medium'>Laporan Donasi Bencana Alam Q1 2024</p>
                      <p className='text-sm text-muted-foreground'>Dipublikasikan 5 hari yang lalu</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acara Mendatang</CardTitle>
                <CardDescription>Jadwal kegiatan dan acara penting</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-4'>
                  <li className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <Calendar className='h-6 w-6' />
                    </div>
                    <div>
                      <p className='font-medium'>Pembagian Zakat Fitrah</p>
                      <p className='text-sm text-muted-foreground'>20 April 2024</p>
                    </div>
                  </li>
                  <li className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <Calendar className='h-6 w-6' />
                    </div>
                    <div>
                      <p className='font-medium'>Seminar Online: Optimalisasi Zakat di Era Digital</p>
                      <p className='text-sm text-muted-foreground'>5 Mei 2024</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className='mt-8'>
            <CardHeader>
              <CardTitle>Notifikasi Sistem</CardTitle>
              <CardDescription>Pemberitahuan dan peringatan penting</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className='space-y-4'>
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <Bell className='h-6 w-6' />
                    </div>
                    <div>
                      <p className='font-medium'>{notification.message}</p>
                      <p className='text-sm text-muted-foreground'>{notification.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
