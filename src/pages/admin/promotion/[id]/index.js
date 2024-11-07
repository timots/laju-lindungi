import React, { useState } from 'react';
import { Save, ShoppingCart, RefreshCw, Sliders, Users, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export default function PromotionSettingsPage() {
  const [promoData, setPromoData] = useState({
    price: '',
    image: null,
    startDate: '',
    endDate: '',
    header: '',
    content: '',
    selectedAI: '',
    useEmojis: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromoData({ ...promoData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setPromoData({ ...promoData, image: file });
  };

  const handleSave = async () => {
    console.log(promoData, 'Saving promotion data...');
    // Implement your save logic here
  };

  return (
    <div className='min-h-screen p-8   text-white'>
      <div className='container mx-auto space-y-8'>
        <header className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600'>AI Product Promotion Settings</h1>
        </header>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-2'>
          {[
            { title: 'Total Buying', value: '1,274', change: '+20.1%', icon: ShoppingCart },
            { title: 'Active Users', value: '573', change: '+201', icon: Users },
          ].map((item, index) => (
            <Card
              key={index}
              className='bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-gray-300'>{item.title}</CardTitle>
                <item.icon className='h-4 w-4 text-blue-400' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-white'>{item.value}</div>
                <p className='text-xs text-gray-400'>{item.change} from last period</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          <Card className='bg-gray-800 border-gray-700'>
            <CardHeader>
              <CardTitle className='text-xl text-blue-400'>Promotion Details</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label
                  htmlFor='ai-name'
                  className='text-gray-300'>
                  AI Product Name
                </Label>
                <Input
                  id='ai-name'
                  name='selectedAI'
                  placeholder='Enter AI product name'
                  onChange={handleInputChange}
                  className='bg-gray-700 text-white border-gray-600 focus:border-blue-400 focus:ring-blue-400'
                />
              </div>
              <div className='space-y-2'>
                <Label
                  htmlFor='promo-price'
                  className='text-gray-300'>
                  Promotion Price
                </Label>
                <Input
                  id='promo-price'
                  name='price'
                  type='number'
                  placeholder='Enter promotion price'
                  onChange={handleInputChange}
                  className='bg-gray-700 text-white border-gray-600 focus:border-blue-400 focus:ring-blue-400'
                />
              </div>
              <div className='space-y-2'>
                <Label
                  htmlFor='promo-header'
                  className='text-gray-300'>
                  Promotion Header
                </Label>
                <Input
                  id='promo-header'
                  name='header'
                  placeholder='Enter promotion header'
                  onChange={handleInputChange}
                  className='bg-gray-700 text-white border-gray-600 focus:border-blue-400 focus:ring-blue-400'
                />
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-800 border-gray-700'>
            <CardHeader>
              <CardTitle className='text-xl text-blue-400'>SOP on Promotion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <Label
                  htmlFor='promo-content'
                  className='text-gray-300'>
                  Promotion Guidelines
                </Label>
                <Textarea
                  id='promo-content'
                  name='content'
                  placeholder='Enter promotion guidelines'
                  onChange={handleInputChange}
                  className='min-h-[200px] bg-gray-700 text-white border-gray-600 focus:border-blue-400 focus:ring-blue-400'
                />
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-800 border-gray-700'>
            <CardHeader>
              <CardTitle className='text-xl text-blue-400'>Promotion Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <Label
                  htmlFor='promo-image'
                  className='text-gray-300'>
                  Upload Promotion Image
                </Label>
                <div className='flex items-center space-x-2'>
                  <Input
                    id='promo-image'
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='hidden'
                  />
                  <Button
                    onClick={() => document.getElementById('promo-image').click()}
                    className='bg-blue-500 hover:bg-blue-600 text-white'>
                    <Upload className='mr-2 h-4 w-4' /> Upload Image
                  </Button>
                  {promoData.image && <span className='text-gray-300'>{promoData.image.name}</span>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-800 border-gray-700'>
            <CardHeader>
              <CardTitle className='text-xl text-blue-400'>Promotion Period</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label
                  htmlFor='start-date'
                  className='text-gray-300'>
                  Start Date
                </Label>
                <Input
                  id='start-date'
                  name='startDate'
                  type='date'
                  onChange={handleInputChange}
                  className='bg-gray-700 text-white border-gray-600 focus:border-blue-400 focus:ring-blue-400'
                />
              </div>
              <div className='space-y-2'>
                <Label
                  htmlFor='end-date'
                  className='text-gray-300'>
                  End Date
                </Label>
                <Input
                  id='end-date'
                  name='endDate'
                  type='date'
                  onChange={handleInputChange}
                  className='bg-gray-700 text-white border-gray-600 focus:border-blue-400 focus:ring-blue-400'
                />
              </div>
              <div className='flex items-center space-x-2'>
                <Switch
                  id='use-emojis'
                  checked={promoData.useEmojis}
                  onCheckedChange={(checked) => setPromoData({ ...promoData, useEmojis: checked })}
                />
                <Label
                  htmlFor='use-emojis'
                  className='text-gray-300'>
                  Use Emojis in Promotion
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='flex justify-end space-x-4 mt-8'>
          <Button
            variant='outline'
            className='bg-gray-700 text-white hover:bg-gray-600'>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className='bg-blue-500 text-white hover:bg-blue-600'>
            <Save className='mr-2 h-4 w-4' /> Save Promotion
          </Button>
        </div>
      </div>
    </div>
  );
}
