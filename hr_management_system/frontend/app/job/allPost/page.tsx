'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type Post = {
  id: number;
  Title: string;
  Description: string;
  JobId: string;
  SubmissionDate: string;
  CloseDate: string;
  Status: string;
};

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editedPost, setEditedPost] = useState<Post | null>(null);
  const statusOptions = ['Open', 'Close'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>('http://localhost:3001/job/showAllAvailableJobApplication');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchPosts();
  }, []);


  return (
    <div >
      <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Job ID</th>
            <th className="py-2 px-4 border-b">Submission Date</th>
            <th className="py-2 px-4 border-b">Close Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="py-2 px-4 border-b">{post.Title}</td>
              <td className="py-2 px-4 border-b">{post.Description}</td>
              <td className="py-2 px-4 border-b">{post.JobId}</td>
              <td className="py-2 px-4 border-b">{post.SubmissionDate}</td>
              <td className="py-2 px-4 border-b">{post.CloseDate}</td>
              <td className="py-2 px-4 border-b">{post.Status}</td>
              <td className="py-2 px-4 border-b">
                  <Link href={`/job/apply`}>
                    <button className="text-blue-500 hover:underline">Apply</button>
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

export default Posts;
