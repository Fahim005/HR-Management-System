// 'use client'
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
        <Link href="/manager/noticeboard//create-notice">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Create Notice
            </button>
          </Link>
          <br></br>
          <br></br>
          <Link href="/manager/noticeboard/viewAll">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              View All Notices
            </button>
          </Link>
    </div>
  );
};

export default HomePage;
