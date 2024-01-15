import Link from "next/link";

export default function JobPostProcessingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Job Post Processing</h1>
        
        <div className="mb-4">
          <Link href="/manager/jobPostProcessing/createPost">
            <button className="text-blue-500 hover:underline">Post Job Requirements</button>
          </Link>
        </div>

        <div>
          <Link href="/manager/jobPostProcessing/showAllJobPost">
            <button className="text-blue-500 hover:underline">Show All Job Posts</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
