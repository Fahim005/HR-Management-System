'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface Employee {
  id: number;
  Name: string;
  Email: string;
  Gender: string;
  DOB: string;
  PhoneNum: string;
}

const NoticeCreationPage = () => {
  const [noticeData, setNoticeData] = useState({
    Title: '',
    Description: '',
    SendToUserId: '', 
  });

  const [employees, setEmployees] = useState<Employee[]>([]);
  const orgID = Cookies.get('orgID') || '';

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/auth/getAllEmployees/${orgID}`);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees', error);
      }
    };

    fetchEmployees();
  }, [orgID]);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setNoticeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      
      const sendToUserId = noticeData.SendToUserId || null;

      const response = await axios.post('http://localhost:3001/noticeboard/createNotice', {
        ...noticeData,
        SendToUserId: sendToUserId,
      },{withCredentials: true,headers: {'Content-Type': 'application/json',}});
      console.log('Notice created successfully', response.data);
      
    } catch (error) {
      console.error('Error creating notice', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Notice Creation</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title:</label>
            <input
              type="text"
              name="Title"
              value={noticeData.Title}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              name="Description"
              value={noticeData.Description}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Send To User:</label>
            <select
              name="SendToUserId"
              value={noticeData.SendToUserId}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select User</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.Name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoticeCreationPage;
