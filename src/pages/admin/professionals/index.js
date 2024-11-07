'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, BarChart2 } from 'lucide-react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AgentsManagement() {
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingAgent, setEditingAgent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  console.log(router, 'ini router');

  const agentsPerPage = 5;

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.post('/api/admin/agent/list');
        setAgents(response.data.data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchAgents();
  }, []);

  const filteredAgents = agents.filter((agent) => agent.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filterType === 'all' || agent.type === filterType));

  const currentAgents = filteredAgents.slice((currentPage - 1) * agentsPerPage, currentPage * agentsPerPage);

  console.log(currentAgents, 'ini current agents');

  const addAgent = (newAgent) => {
    setAgents((prevAgents) => [...prevAgents, { ...newAgent, id: prevAgents.length + 1 }]);
  };

  const deleteAgent = (id) => {
    setAgents((prevAgents) => prevAgents.filter((agent) => agent.id !== id));
  };

  const toggleAgentStatus = (id) => {
    setAgents((prevAgents) => prevAgents.map((agent) => (agent.id === id ? { ...agent, status: agent.status === 'active' ? 'inActive' : 'active' } : agent)));
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Agents Management</h1>

      <div className='flex justify-between mb-4'>
        <div className='flex gap-2'>
          <Input
            placeholder='Search agents...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-64'
          />
          <Select
            value={filterType}
            onValueChange={setFilterType}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Types</SelectItem>
              <SelectItem value='Customer Service'>Customer Service</SelectItem>
              <SelectItem value='Sales'>Sales</SelectItem>
              <SelectItem value='Technical Support'>Technical Support</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Agent</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Agent</DialogTitle>
            </DialogHeader>
            <AgentForm
              agent={editingAgent}
              onSubmit={(agent) => {
                addAgent(agent);
                setIsDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentAgents.map((agent) => (
            <TableRow key={agent.id}>
              <TableCell>{agent.name}</TableCell>
              <TableCell>{agent.type}</TableCell>
              <TableCell>
                <Switch
                  checked={agent.status === 'active'}
                  onCheckedChange={() => toggleAgentStatus(agent.id)}
                />
              </TableCell>
              <TableCell>
                <PerformanceBadge performance={agent.performance} />
              </TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => router.push(`${router.asPath}/${agent.id}`)}>
                    <Edit className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => deleteAgent(agent.id)}>
                    <Trash2 className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => alert(`View metrics for ${agent.name}`)}>
                    <BarChart2 className='h-4 w-4' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className='mt-4 flex justify-center'>{/* Pagination Component can be implemented here */}</div>
    </div>
  );
}

function AgentForm({ agent, onSubmit }) {
  const router = useRouter();
  const [formData, setFormData] = useState(
    agent || {
      name: '',
      functions: [],
      subFunctions: [],
      prompt: '',
      type: 'Customer Service',
      status: 'inActive',
      performance: 0,
    }
  );

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, 'ini form data nya');
    console.log(router, 'ini router push sebelum try');

    try {
      const response = await axios.post('/api/admin/agent/add', formData);
      console.log('Success:', response.data);
      onSubmit(formData);

      const newId = response.data.data;
      router.push(`${router.asPath}/${newId}`);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4'>
      <div>
        <Label htmlFor='name'>Name</Label>
        <Input
          id='name'
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor='type'>Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => handleInputChange('type', value)}>
          <SelectTrigger>
            <SelectValue placeholder='Select agent type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Customer Service'>Customer Service</SelectItem>
            <SelectItem value='Sales'>Sales</SelectItem>
            <SelectItem value='Technical Support'>Technical Support</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type='submit'>Save Agent</Button>
    </form>
  );
}

function PerformanceBadge({ performance }) {
  let color = performance >= 90 ? 'bg-green-500' : performance >= 70 ? 'bg-yellow-500' : 'bg-red-500';
  return <Badge className={`${color} text-white`}>{performance}%</Badge>;
}
