'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface JobCategory {
  id: string;
  Name: string;
}

const SubmitForm = () => {
  const router = useRouter();
  const [jobCategories, setJobCategories] = useState<JobCategory[]>([]);

  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    JobId: '',
    SubmissionDate: '',
    CloseDate: '',
    Status: 'Open',
  });

  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/allJobCategories/3');
        setJobCategories(response.data);
      } catch (error) {
        console.error('Error fetching job categories', error);
      }
    };

    fetchJobCategories();
  }, []);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/job/createPost', formData);
      console.log('Form submitted successfully', response.data);
      router.push('/manager/jobPostProcessing/showAllJobPost');
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Submit Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title:</label>
            <input
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Job ID:</label>
            <select
              name="JobId"
              value={formData.JobId}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Job Type</option>
              {jobCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.Name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Submission Date:</label>
            <input
              type="datetime-local"
              name="SubmissionDate"
              value={formData.SubmissionDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Close Date:</label>
            <input
              type="datetime-local"
              name="CloseDate"
              value={formData.CloseDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Status:</label>
            <input
              type="text"
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
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

export default SubmitForm;
