'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { useTheme } from '@/context/context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Toast } from '@/components/ui/toast';
import { useRouter } from 'next/router';

const initialAgents = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Sales', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Support', status: 'Inactive' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Marketing', status: 'Active' },
];

export default function PromotionPage() {
  const { darkMode } = useTheme();
  const [agents, setAgents] = useState(initialAgents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: '', email: '', role: '', status: 'Active' });
  const router = useRouter();
  const filteredAgents = agents.filter((agent) => agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || agent.email.toLowerCase().includes(searchTerm.toLowerCase()) || agent.role.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleEditNavigation = (id) => {
    router.push(`/${router.asPath}/${id}`);
  };

  console.log(router);

  const handleAddAgent = (e) => {
    e.preventDefault();
    if (newAgent.name && newAgent.email && newAgent.role) {
      setAgents([...agents, { ...newAgent, id: agents.length + 1 }]);
      setNewAgent({ name: '', email: '', role: '', status: 'Active' });
      setIsAddDialogOpen(false);
      Toast({
        title: 'Agent Added',
        description: 'New agent has been successfully added.',
      });
    } else {
      Toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAgent = (id) => {
    setAgents(agents.filter((agent) => agent.id !== id));
    Toast({
      title: 'Agent Deleted',
      description: 'Agent has been successfully removed.',
    });
  };

  const handleToggleStatus = (id) => {
    setAgents(agents.map((agent) => (agent.id === id ? { ...agent, status: agent.status === 'Active' ? 'Inactive' : 'Active' } : agent)));
  };

  return (
    <div className={`min-h-screen p-8 ${darkMode ? '0 text-white' : ' text-gray-900'}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <h1 className='text-4xl font-bold mb-8'>Promotion Page</h1>
      </motion.div>

      <div className='mb-6 flex justify-between items-center'>
        <div className='relative w-64'>
          <Input
            type='text'
            placeholder='Search agents...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
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
            <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
              <Plus
                size={18}
                className='mr-2'
              />{' '}
              Add Promotion
            </Button>
          </DialogTrigger>
          <DialogContent className={darkMode ? 'bg-gray-800 text-white' : 'bg-white'}>
            <DialogHeader>
              <DialogTitle>Add New Agent</DialogTitle>
              <DialogDescription>Enter the details of the new agent below.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddAgent}>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='name'
                    className='text-right'>
                    Name
                  </Label>
                  <Input
                    id='name'
                    value={newAgent.name}
                    onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                    className='col-span-3'
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='email'
                    className='text-right'>
                    Email
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    value={newAgent.email}
                    onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                    className='col-span-3'
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='role'
                    className='text-right'>
                    Role
                  </Label>
                  <Input
                    id='role'
                    value={newAgent.role}
                    onChange={(e) => setNewAgent({ ...newAgent, role: e.target.value })}
                    className='col-span-3'
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type='submit'>Add Agent</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell className='font-medium'>{agent.name}</TableCell>
                <TableCell>{agent.email}</TableCell>
                <TableCell>{agent.role}</TableCell>
                <TableCell>
                  <Switch
                    checked={agent.status === 'Active'}
                    onCheckedChange={() => handleToggleStatus(agent.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className='flex space-x-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleEditNavigation(agent.id)} // Navigasi ketika klik edit
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => handleDeleteAgent(agent.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
