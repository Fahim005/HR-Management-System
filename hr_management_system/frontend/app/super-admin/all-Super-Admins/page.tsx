'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface SuperAdmin {
    id: number;
    Name: string;
    Email: string;
    Gender: string;
    DOB: string;
    PhoneNum: string;
  }


const SuperAdminList = () => {
    const [superAdmins, setSuperAdmins] = useState<SuperAdmin[]>([]);

  useEffect(() => {
    const fetchSuperAdmins = async () => {
      try {
        const response = await axios.get<SuperAdmin[]>('http://localhost:3001/auth/allSuperAdmin',{withCredentials: true,headers: {'Content-Type': 'application/json',}});
        setSuperAdmins(response.data);
      } catch (error) {
        console.error('Error fetching Super Admins:', error);
      }
    };

    fetchSuperAdmins();
  }, []);

  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:3001/auth/deleteUser/${userId}`,{withCredentials: true,headers: {'Content-Type': 'application/json',}});
      setSuperAdmins(superAdmins.filter(admin => admin.id !== userId));
      console.log(`Super Admin with ID ${userId} deleted successfully!`);
    } catch (error) {
      console.error('Error deleting Super Admin:', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Super Admins List</h1>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Gender</th>
            <th className="py-2 px-4 border-b">DOB</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {superAdmins.map((admin) => (
            <tr key={admin.id}>
              <td className="py-2 px-4 border-b text-center">{admin.id}</td>
              <td className="py-2 px-4 border-b text-center">{admin.Name}</td>
              <td className="py-2 px-4 border-b text-center">{admin.Email}</td>
              <td className="py-2 px-4 border-b text-center">{admin.Gender}</td>
              <td className="py-2 px-4 border-b text-center">{admin.DOB}</td>
              <td className="py-2 px-4 border-b text-center">{admin.PhoneNum}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleDelete(admin.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperAdminList;
