'use client';

import React, { useEffect, useState } from 'react';
import { Save, RefreshCw, Globe, MessageSquare, Sliders, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '@/context/context';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AISettingsPage() {
  const { darkMode } = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const [dataAgent, setDataAgent] = useState({
    // Default values
    name: '',
    personality: '',
    expertise: '',
    sopGuidelines: '',
    welcomeMessage: '',
    responseLength: 'medium',
    contentFilter: 'moderate',
    useEmojis: false,
    primaryLanguage: 'bahasa-indonesia',
    multiLanguage: false,
    translationQuality: 75,
    formality: 50,
    enthusiasm: 50,
    humor: 50,
  });
  const [mounted, setMounted] = useState(false);

  const handleInputChange = (field, value) => {
    setDataAgent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const { id: agentId, ...dataToSend } = dataAgent;
      if (!id) {
        console.error('Error: id must be provided');
        return;
      }
      console.log(dataToSend, 'ini data to send');
      const response = await axios.post('/api/admin/agent/set', { id, ...dataToSend });
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const fetchAgents = async () => {
      if (!id) return;

      try {
        const response = await axios.post('/api/admin/agent/view', { id });
        // Merge fetched data with default values
        setDataAgent((prev) => ({
          ...prev,
          ...response.data.data,
        }));
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchAgents();
  }, [id]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen p-8 ${darkMode ? ' text-white' : ' text-gray-900'}`}>
      {/* Previous header and stats cards remain unchanged */}

      <div className='grid gap-8 md:grid-cols-2'>
        <Card className={`transition-shadow hover:shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <CardHeader className={darkMode ? 'bg-gray-800' : 'bg-white'}>
            <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>AI Persona</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label
                htmlFor='ai-name'
                className={darkMode ? 'text-white' : 'text-gray-900'}>
                AI Assistant Name
              </Label>
              <Input
                id='ai-name'
                placeholder='Enter AI assistant name'
                value={dataAgent.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}
              />
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='ai-personality'
                className={darkMode ? 'text-white' : 'text-gray-900'}>
                Personality Traits
              </Label>
              <Input
                id='ai-personality'
                placeholder='e.g., Friendly, Professional, Humorous'
                value={dataAgent.personality || ''}
                onChange={(e) => handleInputChange('personality', e.target.value)}
                className={darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}
              />
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='ai-expertise'
                className={darkMode ? 'text-white' : 'text-gray-900'}>
                Areas of Expertise
              </Label>
              <Input
                id='ai-expertise'
                placeholder='e.g., Customer Service, Product Knowledge'
                value={dataAgent.expertise || ''}
                onChange={(e) => handleInputChange('expertise', e.target.value)}
                className={darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={`transition-shadow hover:shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <CardHeader className={darkMode ? 'bg-gray-800' : 'bg-white'}>
            <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>SOP on Responding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <Label
                htmlFor='sop-message'
                className={darkMode ? 'text-white' : 'text-gray-900'}>
                Response Guidelines
              </Label>
              <Textarea
                id='sop-message'
                placeholder='Enter your SOP guidelines'
                value={dataAgent.sopGuidelines || ''}
                onChange={(e) => handleInputChange('sopGuidelines', e.target.value)}
                className={`min-h-[200px] ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={`transition-shadow hover:shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <CardHeader className={darkMode ? 'bg-gray-800' : 'bg-white'}>
            <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>Welcome Message</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <Label
                htmlFor='welcome-message'
                className={darkMode ? 'text-white' : 'text-gray-900'}>
                Customize Welcome Message
              </Label>
              <Textarea
                id='welcome-message'
                placeholder='Enter your custom welcome message'
                value={dataAgent.welcomeMessage || ''}
                onChange={(e) => handleInputChange('welcomeMessage', e.target.value)}
                className={`min-h-[100px] ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={`transition-shadow hover:shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <CardHeader className={darkMode ? 'bg-gray-800' : 'bg-white'}>
            <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>Response Generation Guidelines</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label
                htmlFor='response-length'
                className={darkMode ? 'text-white' : 'text-gray-900'}>
                Preferred Response Length
              </Label>
              <Select
                value={dataAgent.responseLength || 'medium'}
                onValueChange={(value) => handleInputChange('responseLength', value)}>
                <SelectTrigger
                  id='response-length'
                  className={darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>
                  <SelectValue placeholder='Select response length' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='short'>Short (1-2 sentences)</SelectItem>
                  <SelectItem value='medium'>Medium (3-4 sentences)</SelectItem>
                  <SelectItem value='long'>Long (5+ sentences)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='content-filtering'
                className={darkMode ? 'text-white' : 'text-gray-900'}>
                Content Filtering Level
              </Label>
              <Select
                value={dataAgent.contentFilter || 'moderate'}
                onValueChange={(value) => handleInputChange('contentFilter', value)}>
                <SelectTrigger
                  id='content-filtering'
                  className={darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>
                  <SelectValue placeholder='Select content filtering level' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='strict'>Strict</SelectItem>
                  <SelectItem value='moderate'>Moderate</SelectItem>
                  <SelectItem value='lenient'>Lenient</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex items-center space-x-2'>
              <Switch
                id='use-emojis'
                checked={dataAgent.useEmojis || false}
                onCheckedChange={(checked) => handleInputChange('useEmojis', checked)}
              />
              <Label
                htmlFor='use-emojis'
                className={darkMode ? 'text-white' : 'text-gray-900'}>
                Use Emojis in Responses
              </Label>
            </div>
          </CardContent>
        </Card>

        <Card className={`transition-shadow hover:shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <CardHeader className={darkMode ? 'bg-gray-800' : 'bg-white'}>
            <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>Language Settings</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label
                htmlFor='primary-language'
                className={darkMode ? 'text-white' : 'text-gray-900'}>
                Primary Language
              </Label>
              <Select
                value={dataAgent.primaryLanguage || 'bahasa-indonesia'}
                onValueChange={(value) => handleInputChange('primaryLanguage', value)}>
                <SelectTrigger
                  id='primary-language'
                  className={darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>
                  <SelectValue placeholder='Select primary language' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='english'>English</SelectItem>
                  <SelectItem value='bahasa-indonesia'>Bahasa Indonesia</SelectItem>
                  <SelectItem value='spanish'>Spanish</SelectItem>
                  <SelectItem value='french'>French</SelectItem>
                  <SelectItem value='german'>German</SelectItem>
                  <SelectItem value='chinese'>Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex items-center space-x-2'>
              <Switch
                id='multi-language'
                checked={dataAgent.multiLanguage || false}
                onCheckedChange={(checked) => handleInputChange('multiLanguage', checked)}
              />
              <Label
                htmlFor='multi-language'
                className={darkMode ? 'text-white' : 'text-gray-900'}>
                Enable Multi-language Support
              </Label>
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='translation-quality'
                className={darkMode ? 'text-white' : 'text-gray-900'}>
                Translation Quality
              </Label>
              <Slider
                id='translation-quality'
                value={[dataAgent.translationQuality || 75]}
                max={100}
                step={1}
                onValueChange={(value) => handleInputChange('translationQuality', value[0])}
                className={darkMode ? 'bg-gray-700' : 'bg-gray-200'}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={`transition-shadow hover:shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <CardHeader className={darkMode ? 'bg-gray-800' : 'bg-white'}>
            <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>Tone of Voice</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {[
              {
                id: 'formality',
                label: 'Formality',
                min: 'Casual',
                max: 'Formal',
              },
              {
                id: 'enthusiasm',
                label: 'Enthusiasm',
                min: 'Reserved',
                max: 'Enthusiastic',
              },
              {
                id: 'humor',
                label: 'Humor Level',
                min: 'Serious',
                max: 'Humorous',
              },
            ].map((item) => (
              <div
                key={item.id}
                className='space-y-2'>
                <Label
                  htmlFor={item.id}
                  className={darkMode ? 'text-white' : 'text-gray-900'}>
                  {item.label}
                </Label>
                <Slider
                  id={item.id}
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setData({ ...data, [item.id]: value[0] })}
                  className={darkMode ? 'bg-gray-700' : 'bg-gray-200'}
                />
                <div className='flex justify-between text-xs text-muted-foreground'>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{item.min}</span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{item.max}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className='flex justify-end space-x-4 mt-8'>
        <Button
          variant='outline'
          className={darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className={`bg-primary text-primary-foreground hover:bg-primary/90 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}>
          <Save className='mr-2 h-4 w-4' /> Save Changes
        </Button>
      </div>
    </div>
  );
}
