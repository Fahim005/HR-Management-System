'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

type Notice = {
  id: number;
  SendToUserID: number;
  Status: string;
  noticeDescription: {
    id: number;
    Title: string;
    Description: string;
  };
};

const ViewAllNoticesPage = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:3001/noticeboard/trackAllNotice',{withCredentials: true,headers: {'Content-Type': 'application/json',}});
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices', error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">All Notices</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">SendToUserId</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id} className="hover:bg-gray-100 text-center">
              <td className="py-2 px-4 border-b">{notice.id}</td>
              <td className="py-2 px-4 border-b">{notice.noticeDescription.Title}</td>
              <td className="py-2 px-4 border-b">{notice.noticeDescription.Description}</td>
              <td className="py-2 px-4 border-b">{notice.SendToUserID}</td>
              <td className="py-2 px-4 border-b">{notice.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllNoticesPage;
