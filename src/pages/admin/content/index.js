import React, { useState } from 'react';
import { Plus, Pencil, Trash2, MoreHorizontal, Search, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const ContentManagement = () => {
  const [contents, setContents] = useState([
    { id: 1, title: 'Syahadat: Pilar Pertama Islam', category: 'Pilar Islam', status: 'Published', publishDate: new Date() },
    { id: 2, title: 'Pentingnya Shalat dalam Kehidupan Muslim', category: 'Pilar Islam', status: 'Scheduled', publishDate: new Date(2024, 3, 15) },
    { id: 3, title: 'Zakat: Membersihkan Harta dan Jiwa', category: 'Pilar Islam', status: 'Draft', publishDate: null },
    { id: 4, title: 'Puasa Ramadhan: Meningkatkan Ketakwaan', category: 'Pilar Islam', status: 'Published', publishDate: new Date() },
    { id: 5, title: 'Haji: Perjalanan Spiritual ke Baitullah', category: 'Pilar Islam', status: 'Draft', publishDate: null },
  ]);

  const [isAddContentOpen, setIsAddContentOpen] = useState(false);
  const [newContent, setNewContent] = useState({ title: '', category: '', content: '', status: 'Draft', publishDate: null });
  const [editingContent, setEditingContent] = useState(null);

  const handleAddContent = () => {
    setContents([...contents, { ...newContent, id: contents.length + 1 }]);
    setNewContent({ title: '', category: '', content: '', status: 'Draft', publishDate: null });
    setIsAddContentOpen(false);
  };

  const handleEditContent = (content) => {
    setEditingContent(content);
    setIsAddContentOpen(true);
  };

  const handleUpdateContent = () => {
    setContents(contents.map((c) => (c.id === editingContent.id ? editingContent : c)));
    setEditingContent(null);
    setIsAddContentOpen(false);
  };

  const handleDeleteContent = (contentId) => {
    setContents(contents.filter((content) => content.id !== contentId));
  };

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Content Management</h1>
        <Dialog
          open={isAddContentOpen}
          onOpenChange={setIsAddContentOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className='mr-2 h-4 w-4' /> Add Content
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[625px]'>
            <DialogHeader>
              <DialogTitle>{editingContent ? 'Edit Content' : 'Add New Content'}</DialogTitle>
              <DialogDescription>{editingContent ? 'Edit the content details here.' : 'Add a new content to the system here.'}</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='title'
                  className='text-right'>
                  Title
                </Label>
                <Input
                  id='title'
                  value={editingContent ? editingContent.title : newContent.title}
                  onChange={(e) => (editingContent ? setEditingContent({ ...editingContent, title: e.target.value }) : setNewContent({ ...newContent, title: e.target.value }))}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='category'
                  className='text-right'>
                  Category
                </Label>
                <Select
                  value={editingContent ? editingContent.category : newContent.category}
                  onValueChange={(value) => (editingContent ? setEditingContent({ ...editingContent, category: value }) : setNewContent({ ...newContent, category: value }))}>
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Select a category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Pilar Islam'>Pilar Islam</SelectItem>
                    <SelectItem value='Konten Islami'>Konten Islami</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='content'
                  className='text-right'>
                  Content
                </Label>
                <Textarea
                  id='content'
                  value={editingContent ? editingContent.content : newContent.content}
                  onChange={(e) => (editingContent ? setEditingContent({ ...editingContent, content: e.target.value }) : setNewContent({ ...newContent, content: e.target.value }))}
                  className='col-span-3'
                  rows={5}
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='status'
                  className='text-right'>
                  Status
                </Label>
                <Select
                  value={editingContent ? editingContent.status : newContent.status}
                  onValueChange={(value) => (editingContent ? setEditingContent({ ...editingContent, status: value }) : setNewContent({ ...newContent, status: value }))}>
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Select a status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Draft'>Draft</SelectItem>
                    <SelectItem value='Scheduled'>Scheduled</SelectItem>
                    <SelectItem value='Published'>Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='publishDate'
                  className='text-right'>
                  Publish Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={`col-span-3 justify-start text-left font-normal ${!editingContent?.publishDate && !newContent.publishDate && 'text-muted-foreground'}`}>
                      <Calendar className='mr-2 h-4 w-4' />
                      {editingContent?.publishDate || newContent.publishDate ? format(editingContent?.publishDate || newContent.publishDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <CalendarComponent
                      mode='single'
                      selected={editingContent?.publishDate || newContent.publishDate}
                      onSelect={(date) => (editingContent ? setEditingContent({ ...editingContent, publishDate: date }) : setNewContent({ ...newContent, publishDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button
                type='submit'
                onClick={editingContent ? handleUpdateContent : handleAddContent}>
                {editingContent ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className='mb-4'>
        <Input
          placeholder='Search contents...'
          className='max-w-sm'
          type='search'
          icon={<Search className='h-4 w-4 text-gray-500' />}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Publish Date</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contents.map((content) => (
            <TableRow key={content.id}>
              <TableCell className='font-medium'>{content.title}</TableCell>
              <TableCell>{content.category}</TableCell>
              <TableCell>{content.status}</TableCell>
              <TableCell>{content.publishDate ? format(content.publishDate, 'PPP') : 'Not set'}</TableCell>
              <TableCell className='text-right'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      className='h-8 w-8 p-0'>
                      <span className='sr-only'>Open menu</span>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEditContent(content)}>
                      <Pencil className='mr-2 h-4 w-4' />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDeleteContent(content.id)}>
                      <Trash2 className='mr-2 h-4 w-4' />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContentManagement;
