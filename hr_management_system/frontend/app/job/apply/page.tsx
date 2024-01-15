'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SubmitForm = () => {
  const router = useRouter();
  const initialFormData = {
    Name: '',
    Email: '',
    PhoneNumber: '',
    Address: '',
    PhoneNo: '',
    UploadFileName: '',
    JobId: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3001/job/createJobApplication', formData);
      console.log('Form submitted successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Submit Form</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="text"
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number:</label>
            <input
              type="text"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Address:</label>
            <input
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone No:</label>
            <input
              type="text"
              name="PhoneNo"
              value={formData.PhoneNo}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Upload File Name:</label>
            <input
              type="text"
              name="UploadFileName"
              value={formData.UploadFileName}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Job ID:</label>
            <input
              type="text"
              name="JobId"
              value={formData.JobId}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitForm;
