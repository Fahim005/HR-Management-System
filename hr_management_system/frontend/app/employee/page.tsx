'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import useAuth from '../useAuth';


interface User {
  id: number;
  Name: string;
  Email: string;
  Gender: string;
  DOB: string;
  PhoneNum: string;
  Password: string;
  userOrganizationTable: {
    id: number;
    organization: {
      id: number;
      Name: string;
      Email: string;
      Password: string;
    };
  };
}

function ManagerDashboard() {
  useAuth();
  const [ user, setUser ] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/auth/getEmployeeDetails`,{withCredentials: true,headers: {'Content-Type': 'application/json',}});
        setUser(response.data);
        
        console.log(user?.Name);
        console.log(user?.Email);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    
  }, []);

  useEffect(() => {
    if (user) {
        const orgID = String(user?.userOrganizationTable.organization.id);
        Cookies.set('orgID', orgID);
    }
}, [user]);

  return (
    <>
    <h3>Welcome, {user?.Name}</h3>
    </>
  );
}

export default ManagerDashboard;
