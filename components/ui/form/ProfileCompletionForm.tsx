/*'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../input';
import { Button } from '../button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { useRouter } from 'next/navigation';
import { prisma } from '@/util/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { request } from 'http';


const FormSchema = z
  .object({
    major: z.string().min(1, 'Major is required'),
    phoneNumber: z.string().min(1, 'phone number is required'),
    gender:z.string().min(1, 'gender is required'),
  })
  

const ProfileCompletionForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneNumber: '',
      major: '',
      gender: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const { email} = await request.json();
      // Find the user based on email (or username)
      const user = await prisma.user.findUnique({
        where: { email },
      });
      
      if (!user) {
        return NextResponse.json(
          { status: "error", message: "User not found" },
          { status: 404 }
        );
      }
      
      const userId = user.userId;
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: values.phoneNumber,
          major: values.major,
          gender: values.gender,
          userId,
        }),
      });
  
      if (response.ok) {
        router.push('/auth/login');
      } else {
        // Attempt to parse error response if not ok
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(errorData.message || 'Registration failed');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in registration:", error.message);
        alert(error.message || "An error occurred while registering.");
      } else {
        console.error("Unknown error:", error);
        alert("An unknown error occurred.");
      }
    }
  };
  
  
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
      

        <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder='Phone number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         

<FormField
  control={form.control}
  name="major"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Major</FormLabel>
      <br/>
      <FormControl>
        <select {...field} className="input">
          <option value="">Select your major</option>
          <option value="ComputerScienceSoftwareEngineering">Computer Science - Software Engineering</option>
          <option value="ComputerScienceNetworkAndSecurity">Computer Science - Network and Security</option>
          <option value="ComputerScienceMultiMedia">Computer Science - MultiMedia</option>
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="gender"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Gender</FormLabel>
      <br/>
      <FormControl>
        <select {...field} className="input">
          <option value="">Select your major</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

        
         
        </div>
        <Button className='w-full mt-6' type='submit'>
        Apply
        </Button>
      </form>
      
    </Form>
  );
};

export default ProfileCompletionForm;
*/



