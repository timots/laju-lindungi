'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Tag, Clock, User, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const TemplatePage = () => {
  const { darkMode } = useTheme();
  const [templates, setTemplates] = useState([
    { id: 1, name: 'AI Accounting Assistant', description: 'Helps with bookkeeping, financial analysis, and tax preparation', category: 'Finance', createdBy: 'AI Team', createdAt: '2023-05-15', tags: ['accounting', 'finance', 'tax'] },
    {
      id: 2,
      name: 'Customer Service Chatbot',
      description: 'Handles customer inquiries and provides support 24/7',
      category: 'Customer Support',
      createdBy: 'Support Team',
      createdAt: '2023-05-14',
      tags: ['customer service', 'chatbot', 'support'],
    },
    {
      id: 3,
      name: 'Content Generator',
      description: 'Creates blog posts, social media content, and product descriptions',
      category: 'Marketing',
      createdBy: 'Marketing Team',
      createdAt: '2023-05-13',
      tags: ['content', 'marketing', 'writing'],
    },
  ]);
  const [newTemplate, setNewTemplate] = useState({ name: '', description: '', category: '', tags: '' });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleAddTemplate = (e) => {
    e.preventDefault();
    if (newTemplate.name && newTemplate.description && newTemplate.category) {
      const newTemplateEntry = {
        id: templates.length + 1,
        name: newTemplate.name,
        description: newTemplate.description,
        category: newTemplate.category,
        createdBy: 'Current User',
        createdAt: new Date().toISOString().split('T')[0],
        tags: newTemplate.tags.split(',').map((tag) => tag.trim()),
      };
      setTemplates([newTemplateEntry, ...templates]);
      setNewTemplate({ name: '', description: '', category: '', tags: '' });
      setIsAddDialogOpen(false);
      toast({
        title: 'Template Added',
        description: 'New AI function template has been successfully added.',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
    }
  };

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-8'>
        <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600'>AI Function Templates</h1>
      </motion.div>

      <div className='flex justify-between items-center mb-8'>
        <div className='relative w-64'>
          <Input
            type='text'
            placeholder='Search templates...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500`}
          />
          <Search
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            size={18}
          />
        </div>
        <Dialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className='bg-blue-600 hover:bg-blue-700 text-white transition duration-300 ease-in-out transform hover:scale-105'>
              <Plus
                size={18}
                className='mr-2'
              />{' '}
              Add New Template
            </Button>
          </DialogTrigger>
          <DialogContent className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg`}>
            <DialogHeader>
              <DialogTitle>Add New AI Function Template</DialogTitle>
              <DialogDescription>Enter the details of the new AI function template below.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddTemplate}>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <label
                    htmlFor='name'
                    className='text-right'>
                    Name
                  </label>
                  <Input
                    id='name'
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    className='col-span-3'
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <label
                    htmlFor='description'
                    className='text-right'>
                    Description
                  </label>
                  <Textarea
                    id='description'
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    className='col-span-3'
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <label
                    htmlFor='category'
                    className='text-right'>
                    Category
                  </label>
                  <Select
                    onValueChange={(value) => setNewTemplate({ ...newTemplate, category: value })}
                    required>
                    <SelectTrigger className='col-span-3'>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Finance'>Finance</SelectItem>
                      <SelectItem value='Customer Support'>Customer Support</SelectItem>
                      <SelectItem value='Marketing'>Marketing</SelectItem>
                      <SelectItem value='Human Resources'>Human Resources</SelectItem>
                      <SelectItem value='Operations'>Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <label
                    htmlFor='tags'
                    className='text-right'>
                    Tags
                  </label>
                  <Input
                    id='tags'
                    value={newTemplate.tags}
                    onChange={(e) => setNewTemplate({ ...newTemplate, tags: e.target.value })}
                    className='col-span-3'
                    placeholder='Enter tags separated by commas'
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type='submit'
                  className='bg-blue-600 hover:bg-blue-700 text-white transition duration-300 ease-in-out'>
                  Add Template
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} overflow-hidden`}>
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='mb-4'>{template.description}</p>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {template.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant='secondary'>
                      <Tag
                        size={12}
                        className='mr-1'
                      />
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                  <User
                    size={14}
                    className='mr-1'
                  />
                  <span className='mr-4'>{template.createdBy}</span>
                  <Clock
                    size={14}
                    className='mr-1'
                  />
                  <span>{template.createdAt}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant='ghost'
                  className='ml-auto'>
                  Use Template{' '}
                  <ChevronRight
                    size={16}
                    className='ml-2'
                  />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TemplatePage;
