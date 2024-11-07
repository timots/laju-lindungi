import React, { useState } from 'react';
import { Save, Plus, Trash2, Calculator, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminSettingsCalculator = () => {
  const [zakatFormulas, setZakatFormulas] = useState({
    emas: { nisab: 85, rate: 0.025 },
    perak: { nisab: 595, rate: 0.025 },
    uang: { nisab: 85, rate: 0.025 }, // Menggunakan nilai emas sebagai patokan
    perdagangan: { nisab: 85, rate: 0.025 }, // Menggunakan nilai emas sebagai patokan
  });

  const [wealthCategories, setWealthCategories] = useState([
    { id: 1, name: 'Emas', description: 'Perhiasan atau batangan emas' },
    { id: 2, name: 'Perak', description: 'Perhiasan atau batangan perak' },
    { id: 3, name: 'Uang', description: 'Uang tunai atau tabungan' },
    { id: 4, name: 'Perdagangan', description: 'Aset perdagangan dan inventori' },
  ]);

  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  const [zakatPayments, setZakatPayments] = useState([
    { id: 1, name: 'Ahmad', amount: 5000000, date: '2024-03-15', category: 'Uang' },
    { id: 2, name: 'Fatimah', amount: 3000000, date: '2024-03-16', category: 'Emas' },
    { id: 3, name: 'Umar', amount: 2000000, date: '2024-03-17', category: 'Perdagangan' },
  ]);

  const handleFormulaChange = (category, field, value) => {
    setZakatFormulas((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: parseFloat(value) },
    }));
  };

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.description) {
      setWealthCategories((prev) => [...prev, { id: Date.now(), ...newCategory }]);
      setNewCategory({ name: '', description: '' });
    }
  };

  const handleDeleteCategory = (id) => {
    setWealthCategories((prev) => prev.filter((category) => category.id !== id));
  };

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-6'>Zakat Calculator Settings</h1>

      <Tabs defaultValue='formulas'>
        <TabsList className='mb-4'>
          <TabsTrigger value='formulas'>Zakat Formulas</TabsTrigger>
          <TabsTrigger value='categories'>Wealth Categories</TabsTrigger>
          <TabsTrigger value='payments'>Zakat Payments</TabsTrigger>
        </TabsList>

        <TabsContent value='formulas'>
          <Card>
            <CardHeader>
              <CardTitle>Zakat Calculation Formulas</CardTitle>
              <CardDescription>Configure the nisab and zakat rates for different categories</CardDescription>
            </CardHeader>
            <CardContent>
              {Object.entries(zakatFormulas).map(([category, { nisab, rate }]) => (
                <div
                  key={category}
                  className='mb-4'>
                  <h3 className='text-lg font-semibold mb-2 capitalize'>{category}</h3>
                  <div className='flex space-x-4'>
                    <div>
                      <Label htmlFor={`${category}-nisab`}>Nisab (gram)</Label>
                      <Input
                        id={`${category}-nisab`}
                        type='number'
                        value={nisab}
                        onChange={(e) => handleFormulaChange(category, 'nisab', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${category}-rate`}>Zakat Rate</Label>
                      <Input
                        id={`${category}-rate`}
                        type='number'
                        value={rate}
                        onChange={(e) => handleFormulaChange(category, 'rate', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button className='mt-4'>
                <Save className='mr-2 h-4 w-4' /> Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='categories'>
          <Card>
            <CardHeader>
              <CardTitle>Wealth Categories</CardTitle>
              <CardDescription>Manage categories of wealth subject to zakat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='mb-4'>
                <Input
                  placeholder='New category name'
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className='mb-2'
                />
                <Input
                  placeholder='Category description'
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className='mb-2'
                />
                <Button onClick={handleAddCategory}>
                  <Plus className='mr-2 h-4 w-4' /> Add Category
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className='text-right'>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wealthCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell className='text-right'>
                        <Button
                          variant='ghost'
                          onClick={() => handleDeleteCategory(category.id)}>
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='payments'>
          <Card>
            <CardHeader>
              <CardTitle>Zakat Payments</CardTitle>
              <CardDescription>Monitor recent zakat payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {zakatPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.name}</TableCell>
                      <TableCell>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(payment.amount)}</TableCell>
                      <TableCell>{new Date(payment.date).toLocaleDateString('id-ID')}</TableCell>
                      <TableCell>{payment.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettingsCalculator;
