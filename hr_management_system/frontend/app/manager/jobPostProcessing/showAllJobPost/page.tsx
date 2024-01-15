'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

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
        const response = await axios.get<Post[]>('http://localhost:3001/job/showAllJobPost');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchPosts();
  }, []);

  const handleUpdate = (post: Post) => {
    setSelectedPost(post);
    setEditedPost({ ...post });
  };

  const handleCancelUpdate = () => {
    setSelectedPost(null);
    setEditedPost(null);
  };

  const handleSaveUpdate = async () => {
    try {
      if (editedPost && editedPost.id !== undefined) {
        const { id, ...updateData } = editedPost;

        await axios.put(`http://localhost:3001/job/updateJobPost/${editedPost.id}`, updateData);

        const response = await axios.get<Post[]>('http://localhost:3001/job/showAllJobPost');
        setPosts(response.data);
        setSelectedPost(null);
        setEditedPost(null);
      }
    } catch (error) {
      console.error('Error updating post', error);
    }
  };

  const handleDelete = async (postId: number) => {
    try {
      await axios.delete(`http://localhost:3001/job/deleteJobPost/${postId}`);
      const response = await axios.get('http://localhost:3001/job/showAllJobPost');
      setPosts(response.data);
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedPost((prevPost) => {
      if (!prevPost) return null;

      return {
        ...prevPost,
        [name]: name === 'id' ? (value ? parseInt(value, 10) : undefined) : value,
      };
    });
  };

  return (
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
                <button className="bg-red-500 text-white px-2 py-1 mr-2" onClick={() => handleDelete(post.id)}>
                  Delete
                </button>
                {selectedPost === post ? (
                  <>
                    <button className="bg-blue-500 text-white px-2 py-1 mr-2" onClick={handleSaveUpdate}>
                      Save
                    </button>
                    <button className="bg-gray-500 text-white px-2 py-1" onClick={handleCancelUpdate}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="bg-green-500 text-white px-2 py-1" onClick={() => handleUpdate(post)}>
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editedPost && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Edit Post</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-gray-700">Title:</label>
              <input
                type="text"
                name="Title"
                value={editedPost.Title}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Description:</label>
              <textarea
                name="Description"
                value={editedPost.Description}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Job ID:</label>
              <input
                type="text"
                name="JobId"
                value={editedPost.JobId}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Submission Date:</label>
              <input
                type="datetime-local"
                name="SubmissionDate"
                value={editedPost.SubmissionDate}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Close Date:</label>
              <input
                type="datetime-local"
                name="CloseDate"
                value={editedPost.CloseDate}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Status:</label>
              <select
                name="Status"
                value={editedPost.Status}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <div className="mt-4">
            <button
              onClick={handleSaveUpdate}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancelUpdate}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
