'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  phoneNumber?: string;
  message: string;
};

export default function Contact() {
  const [status, setStatus] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus('Submitting...');
    try {
      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setStatus(`Error: ${errorData.error}`);
        return;
      }
      setStatus('Message sent successfully!');
      reset();
    } catch (err) {
      console.error('Error submitting the form:', err);
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <Card className="w-full max-w-xl bg-white shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Get in Touch</CardTitle>
          <CardDescription>
            Feel free to share your views and opinions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Please enter your name..."
                required
                {...register('name')}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Please enter email..."
                required
                {...register('email')}
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
              <Input
                id="phoneNumber"
                placeholder="Enter phone number..."
                {...register('phoneNumber')}
              />
            </div>
            <div>
              <Label htmlFor="message">What do you have in mind?</Label>
              <Textarea
                id="message"
                placeholder="Please enter your message..."
                required
                {...register('message')}
                rows={5}
              />
            </div>
            <div className="text-center">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
            {status && <p className="mt-2 text-center text-sm">{status}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
