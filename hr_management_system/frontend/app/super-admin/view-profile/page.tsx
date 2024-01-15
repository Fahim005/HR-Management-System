'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface FormData {
    Name: string;
    Email: string;
    Gender: string;
    DOB: string;
    PhoneNum: string;
    Password: string;
  }

const Profile = () => {
  const [profileData, setProfileData] = useState<FormData>();

  useEffect(() => {
     axios.get('http://localhost:3001/auth/showOwnProfile',{withCredentials: true,headers: {'Content-Type': 'application/json',}},)
      .then(response => {
        setProfileData(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        {profileData ? (
          <div>
            <p><strong>Name:</strong> {profileData.Name}</p>
            <p><strong>Email:</strong> {profileData.Email}</p>
            <p><strong>Gender:</strong> {profileData.Gender}</p>
            <p><strong>Date of Birth:</strong> {profileData.DOB}</p>
            <p><strong>Phone Number:</strong> {profileData.PhoneNum}</p>
            {/* Add more fields as needed */}
          </div>
        ) : (
          <p>Loading profile data...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
