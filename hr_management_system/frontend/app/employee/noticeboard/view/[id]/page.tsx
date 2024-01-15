'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useParams } from 'next/navigation';

type Notice = {
  id: number;
  Title: string;
  Description: string;
};

const NoticeView: React.FC = () => {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const param = useParams();

  useEffect(() => {
    // Set the app element after the component has mounted
    Modal.setAppElement('body');
  }, []);

  useEffect(() => {
    const id = param.id;
    console.log('ID:', id);

    const fetchNotices = async () => {
      try {
        const response = await axios.get<Notice>(`http://localhost:3001/noticeboard/viewNotice/${id}`, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        });
        console.log('API Response:', response.data);
        setNotice(response.data);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Error fetching notices', error);
      }
    };

    if (id) {
      fetchNotices();
    }
  }, [param]);

  return (
    <Modal
    isOpen={isModalOpen}
    onRequestClose={() => setIsModalOpen(false)}
    className="modal"
    overlayClassName="overlay"
    style={{
      content: {
        maxWidth: '400px', // Adjust the width as needed
        margin: 'auto',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the overlay color as needed
      },
    }}
  >
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4">Notice View</h1>
          {notice ? (
            <div className="space-y-4">
              <p>
                <span className="font-bold">Title:</span> {notice.Title}
              </p>
              <p>
                <span className="font-bold">Description:</span> {notice.Description}
              </p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default NoticeView;
