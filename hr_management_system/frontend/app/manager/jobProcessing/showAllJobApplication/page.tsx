'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type JobApplication = {
  id: number;
  Name: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
  PhoneNo: string;
  UploadFileName: string;
  JobId: number;
  Status: string;
};

const ViewJobApplications = () => {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await axios.get('http://localhost:3001/job/showAllJobApplication', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setJobApplications(response.data);
      } catch (error) {
        console.error('Error fetching job applications', error);
      }
    };

    fetchJobApplications();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Job Applications</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone Number</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Upload File Name</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobApplications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{application.id}</td>
                <td className="py-2 px-4 border-b">{application.Name}</td>
                <td className="py-2 px-4 border-b">{application.Email}</td>
                <td className="py-2 px-4 border-b">{application.PhoneNo}</td>
                <td className="py-2 px-4 border-b">{application.Address}</td>
                <td className="py-2 px-4 border-b">{application.UploadFileName}</td>
                <td className="py-2 px-4 border-b">{application.Status}</td>
                <td className="py-2 px-4 border-b">
                  <Link href={`/manager/jobProcessing/showJobApplication/${application.id}`}>
                    <button className="text-blue-500 hover:underline">View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewJobApplications;
