import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

function Completion() {
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <Card className='w-full max-w-md text-center'>
        <CardContent className='pt-6 pb-2 flex flex-col items-center space-y-4'>
          <CheckCircle className='w-16 h-16 text-green-500' />
          <h2 className='text-2xl font-semibold'>Payment Successful</h2>
          <p className='text-gray-600'>Thank you for your payment</p>
        </CardContent>
        <CardFooter className='flex justify-center pb-6'>
          <Button asChild>
            <Link href='/'>Back to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Completion;
