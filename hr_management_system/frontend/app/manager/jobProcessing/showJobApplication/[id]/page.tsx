'use client'
import { withRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';



type jobApplicationType = {
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

const ViewApplication = () => {
  const router = useRouter();
  // const { id } = router.query;

  const param = useParams();
  const id = param.id;
  //const id = 6;

  

  const [jobApplication, setJobApplication] = useState<jobApplicationType | null>(null);

  

  useEffect(() => {
    
    const fetchJobApplication = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/job/showJobApplication/${id}`);
        setJobApplication(response.data);
      } catch (error) {
        console.error('Error fetching job application', error);
      }
    };

    if (id) {
      fetchJobApplication();
    }
  }, [id]);

  const handleMakeShortlist = async () => {
    try {
      if(jobApplication?.Status == "Submitted"){
        await axios.get(`http://localhost:3001/job/makeShortListed/${id}`);
      }
      if(jobApplication?.Status == "Shortlisted"){
        await axios.get(`http://localhost:3001/job/makeSelected/${id}`);
      }
      
      router.push('/manager/jobProcessing/showAllJobApplication');
    } catch (error) {
      console.error('Error making shortlist', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">View Job Application</h1>
        {jobApplication ? (
          <div className="space-y-4">
            <p>
              <span className="font-bold">ID:</span> {jobApplication.id}
            </p>
            <p>
              <span className="font-bold">Name:</span> {jobApplication.Name}
            </p>
            <p>
              <span className="font-bold">Email:</span> {jobApplication.Email}
            </p>
            <p>
              <span className="font-bold">Phone Number:</span> {jobApplication.PhoneNumber}
            </p>
            <p>
              <span className="font-bold">Address:</span> {jobApplication.Address}
            </p>
            <p>
              <span className="font-bold">Phone No:</span> {jobApplication.PhoneNo}
            </p>
            <p>
              <span className="font-bold">Upload File Name:</span> {jobApplication.UploadFileName}
            </p>
            <p>
              <span className="font-bold">Job ID:</span> {jobApplication.JobId}
            </p>
            <p>
              <span className="font-bold">Status:</span> {jobApplication.Status}
            </p>
            <button
              onClick={handleMakeShortlist}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Make Shortlist
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ViewApplication;
