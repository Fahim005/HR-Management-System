'use client'
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import router, { useRouter } from 'next/navigation';
import { useState } from 'react';

interface OrganizationSignupProps {}

const OrganizationSignup: React.FC<OrganizationSignupProps> = () => {
  const router = useRouter();
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/auth/createOrganization', {Name, Email, Password});
      console.log('Form submitted successfully', response.data);
      router.push('/organization-login');
    } catch (error) {
      console.error('Error submitting form', error);
    }

  };

  return (
    <div className="min-h-screen from-sky-500 to-indigo-500 bg-gradient-to-r flex flex-col items-center justify-center">
      <Head>
        <title>HR Management System - Organization Signup</title>
      </Head>

      {/* <Image
        src="/logo.png"
        alt="Company Logo"
        width={200}
        height={200}
        className="rounded-full mb-8"
      /> */}

      <h1 className="text-3xl font-bold text-center mb-8">
        Organization Signup
      </h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="Name" className="block text-gray-700 font-bold mb-2">
            Organization Name
          </label>
          <input
            type="text"
            id="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Email" className="block text-gray-700 font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="Password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className='flex items-center justify-center'>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </button>
        </div>
      </form>

      <p className="text-center text-black text-xs">
        Already have an account? <Link href="/organization-login" className=' text-white'>Sign in</Link> | Go Back to <Link href="/" className=' text-white'>Home</Link>
      </p>
    </div>
  );
};

export default OrganizationSignup;
