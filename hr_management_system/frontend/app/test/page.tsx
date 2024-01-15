'use client'
import Link from "next/link";
import Cookies from 'js-cookie';
import axios from "axios";


function ProtectedPage() {
  const token = Cookies.get('user_token');
  // const data = axios.get('http://localhost:3001/noticeboard/viewNotice/5',{
  //   withCredentials: true,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }},);
  if (!token) {
    return <div>Unauthorized! Please <Link href="/loginAs">login</Link>.</div>;
  }

  // Protected content here
  return (
    <div>
      {/* <p>{data}</p> */}
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}

function handleLogout() {
    Cookies.remove('user_token');
  //localStorage.removeItem('user_token'); // If you also stored it in local storage
  // Redirect to login or a public page
}

export default ProtectedPage;
