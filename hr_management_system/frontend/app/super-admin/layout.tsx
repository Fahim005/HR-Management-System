'use client'
import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import useAuth from '../useAuth';

function SuperAdminLayout<T extends React.ReactNode>({ children }: { children: T }) {
  useAuth();
  const router = useRouter();

  function handleLogout() {
    Cookies.remove('user_token');
    router.push('/');
}

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white border-b px-4 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">HR Management System</h1>
      </header>

      <main className="flex flex-row">
        <aside className="bg-gray-700 text-white px-4 py-6 flex flex-col justify-between w-64">
          <ul className="space-y-4">
            <li>
            <Link
                href="/super-admin"
                className="block py-2 px-4 hover:bg-gray-600 transition duration-150 ease-in-out"
              >
                Dashboard
              </Link>
              <Link
                href="/super-admin/create-super-admin"
                className="block py-2 px-4 hover:bg-gray-600 transition duration-150 ease-in-out"
              >
                Create Super Admin
              </Link>
            </li>
            <li>
              <Link
                href="/super-admin/all-Super-Admins"
                className="block py-2 px-4 hover:bg-gray-600 transition duration-150 ease-in-out"
              >
                All Super Admins
              </Link>
            </li>
            <li>
              <Link
                href="/super-admin/view-profile"
                className="block py-2 px-4 hover:bg-gray-600 transition duration-150 ease-in-out"
              >
                View Profile
              </Link>
            </li>
            <li>
              <button
                className="block w-full py-2 px-4 text-white hover:text-gray-300 transition duration-150 ease-in-out"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </li>
          </ul>
        </aside>

        <section className="flex-grow bg-white px-4 py-6">
          {children}
        </section>
      </main>

      <footer className="bg-gray-100 px-4 py-6 border-t text-center">
        <p className="text-gray-500">&copy; 2023 HR Management System</p>
      </footer>
    </div>
  );
}

export default SuperAdminLayout;
