'use client';

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
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FormSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
    major: z.string().min(1, 'Major is required'),
    phoneNumber: z.string().min(1, 'phone number is required'),
    gender:z.string().min(1, 'gender is required'),
    securityQuestion: z.string().min(1, 'Security question is required'),
    securityAnswer: z.string().min(1, 'Security answer is required'),
  })
  

  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  })

const securityQuestions = [
  "What was your first pet's name?",
  "In which city were you born?",
  "What is your favorite color?",
  "What is your favorite food?",
  "What is your favorite movie?",
  "What is your favorite book?",
  "What is your favorite sport?",
  "What is your favorite game?",
  "What is your favorite hobby?",
];

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      major: '',
      gender: '',
      securityQuestion: '',
      securityAnswer: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          phoneNumber: values.phoneNumber,
          major: values.major,
          gender: values.gender,
          securityQuestion: values.securityQuestion,
          securityAnswer: values.securityAnswer,
        }),
      });
  
      if (response.ok) {
        router.push('/auth/login');
      } else {
        const errorData = await response.json();
        if (errorData.code === 'USER_EXISTS') {
          alert('An account with this email already exists.');
        } else {
          alert(errorData.message || 'Registration failed');
        }
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <option value="">Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="securityQuestion"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Security Question</FormLabel>
      <br/>
      <FormControl>
        <select {...field} className="input">
          <option value="">Select a security question</option>
          {securityQuestions.map((question, index) => (
            <option key={index} value={question}>
              {question}
            </option>
          ))}
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="securityAnswer"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Security Answer</FormLabel>
      <FormControl>
        <Input
          placeholder="Enter your answer"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter your password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Re-Enter your password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
          Sign up
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/auth/login'>
          Sign in
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;