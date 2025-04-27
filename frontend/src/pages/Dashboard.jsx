import PageLayout from "../components/PageLayout";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-[#154078] mb-8">
          Welcome to Your Dashboard
        </h1>

        {/* Upload BoQ Section */}
        <div className="bg-white shadow-md rounded-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Upload New BoQ
          </h2>
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="file"
              accept=".xlsx, .xls"
              className="border border-gray-300 rounded-md p-3 w-full md:w-auto"
            />
            <button
              type="button"
              className="bg-[#154078] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#12345a] transition"
            >
              Upload
            </button>
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Your Projects
          </h2>

          <div className="text-gray-500">
            No BoQ uploaded yet. Start by uploading one!
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
