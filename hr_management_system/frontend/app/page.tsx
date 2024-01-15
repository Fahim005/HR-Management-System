'use client'
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [active, setActive] = useState(false);

  const handleMenuToggle = () => setActive(!active);

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-col justify-center items-center">
      <Head>
        <title>Welcome to HR Management System</title>
        <meta name="description" content="Your one-stop solution for managing all your HR needs." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Image
        src="/logo.jpg"
        alt="Company Logo"
        width={200}
        height={200}
        className="rounded-full mb-8"
      /> */}

      <h1 className="text-5xl font-bold text-white text-center mb-8">HR Management System</h1>

      <p className="text-xl text-gray-200 text-center mb-8">
        Simplify your HR processes and empower your employees.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <Link href="/loginAs">
          <button className="text-white bg-indigo-600 hover:bg-indigo-700 font-bold rounded-lg px-4 py-2 shadow-md">
            Login
          </button>
        </Link>
        <Link href="/signup-organization">
          <button className="text-white bg-gray-800 hover:bg-gray-700 font-bold rounded-lg px-4 py-2 shadow-md">
            Sign Up For Your Organization
          </button>
        </Link>
      </div>

      <nav className="fixed top-0 right-0 p-4">
        <Link href="/job/allPost">
          <button className="text-white bg-green-500 hover:bg-green-600 font-bold rounded-lg px-4 py-2 shadow-md">
            Apply for Job
          </button>
        </Link>
      </nav>

      <nav className="fixed bottom-0 right-0 p-4">
        <button
          onClick={handleMenuToggle}
          className="text-white hover:text-gray-200 transition-colors duration-200 ease-in-out focus:outline-none"
        >
          {active ? (
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6L18 18"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6H20M4 12H20M4 18H20"
              />
            </svg>
          )}
        </button>
        {active && (
          <ul className="mt-4 text-gray-200 text-sm">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}
