import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Home Page</h1>
        <Link href={`jobProcessing/showAllJobApplication`} passHref>
          <button className="block text-blue-500 hover:underline mb-2">All Job Application</button>
        </Link>
        <Link href={`jobProcessing/showAllShortListed`} passHref>
          <button className="block text-blue-500 hover:underline mb-2">Show All ShortListed</button>
        </Link>
        <Link href={`jobProcessing/showAllSelected`} passHref>
          <button className="block text-blue-500 hover:underline">Show All Selected</button>
        </Link>
      </div>
    </div>
  );
}
