'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Organization {
  id : number,
  Name: string,
  Email: string;
}

function OrganizationDashboard() {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const orgID = Cookies.get('orgID');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/auth/findOrg/${orgID}`);
        setOrganization(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    };
    fetchData();
  }, [orgID]);
  
  return (
    <>
    {organization && (
      <div>
          <h3>Welcome, {organization.Name}</h3>
        </div>
      )}
    </>
  );
}

export default OrganizationDashboard;
