'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type jobApplication = {
    id: number;
    Name: string;
    Email: string;
    PhoneNumber: string;
    Address: string;
    PhoneNo: string;
    UploadFileName: string;
    JobId: number;
    Status: string;
}

const ViewJobApplications = () => {
  const [jobApplications, setJobApplications] = useState<jobApplication[]>([]);

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await axios.get('http://localhost:3001/job/showAllShortListed');
        setJobApplications(response.data);
      } catch (error) {
        console.error('Error fetching job applications', error);
      }
    };

    fetchJobApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Job Applications</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone Number</th>
            <th className="p-2">Address</th>
            <th className="p-2">Upload File Name</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobApplications.map((application) => (
            <tr key={application.id} className="border-b border-gray-300">
              <td className="p-2">{application.id}</td>
              <td className="p-2">{application.Name}</td>
              <td className="p-2">{application.Email}</td>
              <td className="p-2">{application.PhoneNo}</td>
              <td className="p-2">{application.Address}</td>
              <td className="p-2">{application.UploadFileName}</td>
              <td className="p-2">{application.Status}</td>
              <td className="p-2">
                <Link href={`/manager/jobProcessing/showJobApplication/${application.id}`}>
                  <button className="text-blue-500">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewJobApplications;
