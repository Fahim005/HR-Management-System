import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginSelection() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-col items-center justify-center">
      <Head>
        <title>HR Management System - Select Account Type</title>
      </Head>

      <p className="text-xl text-gray-200 text-center mb-8">
        Please select your account type to proceed:
      </p>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <Link href="/individual-login">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
            Individual
          </button>
        </Link>
        <Link href="/organization-login">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
            Organization
          </button>
        </Link>
        <p className="text-center text-black text-xs">
          Do not have an account? <Link href="/signup-organization" className=' text-white'>Register</Link> | Go Back to <Link href="/" className=' text-white'>Home</Link>
        </p>
      </div>
    </div>
  );
}
