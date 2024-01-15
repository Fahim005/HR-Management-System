'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Modal from 'react-modal';

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
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const seenNotices = async () => {
    try {
      const response =  axios.get('http://localhost:3001/noticeboard/viewAllNotice', {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error fetching notices', error);
    }
  };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:3001/noticeboard/viewAllNotice', {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        });
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices', error);
      }
    };

    fetchNotices();
  }, []);

  const openModal = (notice: Notice) => {
        axios.get<Notice>(`http://localhost:3001/noticeboard/viewNotice/${notice.id}`, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        });
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNotice(null);
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">All Notices</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id} className="hover:bg-gray-100 text-center">
              <td className="py-2 px-4 border-b">{notice.noticeDescription.Title}</td>
              <td className="py-2 px-4 border-b">{notice.Status}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => openModal(notice)} className="text-blue-500 hover:underline cursor-pointer">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  ariaHideApp={false}
  className="modal"
  overlayClassName="overlay"
  style={{
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '40%', // Adjust the width as needed
      height: '23%', // Adjust the height as needed
      overflowY: 'auto',
      borderRadius: '10px', // Add rounded corners
      border: '2px solid #cbd5e0', // Add a grey border
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }}
>
  <div className="flex items-center justify-center bg-gray-100">
    <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Notice View</h1>
      {selectedNotice ? (
        <div className="space-y-4">
          <div className="border-b py-2">
            <span className="font-bold">Title:</span> {selectedNotice.noticeDescription.Title}
          </div>
          <div className="py-2">
            <span className="font-bold">Description:</span> {selectedNotice.noticeDescription.Description}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  </div>
</Modal>
    </div>
  );
};

export default ViewAllNoticesPage;
