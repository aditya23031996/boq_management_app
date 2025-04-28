import DashboardLayout from "../components/DashboardLayout";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-[#154078] mb-8">
          Welcome to Your Dashboard 🚀
        </h1>

        {/* --- KPI Cards Section --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <KpiCard title="Total Scope" value="0" />
          <KpiCard title="Total Billings" value="INR 0" />
          <KpiCard title="Balance To Bill" value="0" />
          <KpiCard title="Work Completed" value="0%" />
        </div>

        {/* BoQ Actions Section */}
        <div className="bg-white shadow-md rounded-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Add a New BoQ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload BoQ */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Upload New BoQ
              </h3>
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

            {/* Create New BoQ */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Create New BoQ
              </h3>
              <p className="text-gray-600 mb-4">
                Start creating a new Bill of Quantities (BoQ) for your project.
              </p>
              <Link
                to="/builder"
                className="inline-block bg-[#154078] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#12345a] transition"
              >
                Go to Builder
              </Link>
            </div>
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
    </DashboardLayout>
  );
}

function KpiCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
      <h3 className="text-sm font-semibold text-gray-500 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
