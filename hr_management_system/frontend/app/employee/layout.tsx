'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import useAuth from '../useAuth';
import axios from 'axios';

type Notice = {
  filter(arg0: (notice: any) => boolean): unknown;
  id: number;
  SendToUserID: number;
  Status: string;
  noticeDescription: {
    id: number;
    Title: string;
    Description: string;
  };
};

function EmployeeLayout<T extends React.ReactNode>({ children }: { children: T }) {
  const [unseenNoticeCount, setUnseenNoticeCount] = React.useState<number>(0);
  const [notice, setNotice] = useState<Notice>();
  const router = useRouter();

  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://localhost:3001/noticeboard/viewAllNotice',{withCredentials: true,headers: {'Content-Type': 'application/json',}});
      console.log(response.data);
      const unseenNotices = response.data.filter((notice: { Status: string; }) => notice.Status === 'Unseen');
      setUnseenNoticeCount(unseenNotices.length);
      console.log(unseenNoticeCount);
    } catch (error) {
      console.error('Error fetching notices', error);
    }
  };

  React.useEffect(() => {
    fetchNotices();
  }, []);

  function handleLogout() {
    Cookies.remove('user_token');
    Cookies.remove('orgID');
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
                href="/employee"
                className="block py-2 px-4 hover:bg-gray-600 transition duration-150 ease-in-out"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/employee/noticeboard"
                className="block py-2 px-4 hover:bg-gray-600 transition duration-150 ease-in-out"
              >
                Noticeboard
                {unseenNoticeCount > 0 && (
                  <span className="text-red-500"> ({unseenNoticeCount} Unseen)</span>
                )}
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

export default EmployeeLayout;
