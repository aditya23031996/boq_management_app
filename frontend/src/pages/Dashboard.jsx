import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/SideBar";
import PageLayout from "../components/PageLayout";
import { Bell, FileText, CreditCard, BarChart3, CheckSquare, Settings } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

// Sample data
const sampleKpis = {
  totalScope: 1500,
  totalBillings: "INR 1,250,000",
  balanceToBill: "INR 250,000",
  workCompleted: 65,
};
const sampleBillingTrend = [
  { month: "Jan", amount: 200000 },
  { month: "Feb", amount: 180000 },
  { month: "Mar", amount: 215000 },
  { month: "Apr", amount: 240000 },
  { month: "May", amount: 195000 },
  { month: "Jun", amount: 220000 },
];
const sampleProjectStatusTrend = [
  { phase: "Planning", inProgress: 5, completed: 15 },
  { phase: "Execution", inProgress: 8, completed: 12 },
  { phase: "Review", inProgress: 4, completed: 16 },
];
const sampleRecentBoqs = [
  {
    id: "1",
    projectName: "City Mall Expansion",
    createdAt: "2025-04-10",
    scope: "1500 items",
    billings: "INR 900,000",
    status: "In Progress",
    category: "Infrastructure",
    manager: "Alice",
  },
  {
    id: "2",
    projectName: "Airport Terminal Upgrade",
    createdAt: "2025-04-05",
    scope: "1800 items",
    billings: "INR 1,080,000",
    status: "Completed",
    category: "Transportation",
    manager: "Bob",
  },
  {
    id: "3",
    projectName: "Highway Maintenance",
    createdAt: "2025-03-28",
    scope: "1200 items",
    billings: "INR 600,000",
    status: "In Progress",
    category: "Infrastructure",
    manager: "Alice",
  },
];
const sampleNotifications = [
  { id: 1, message: "New BoQ uploaded: City Mall Expansion" },
  { id: 2, message: "Invoice generated for Airport Terminal Upgrade" },
  { id: 3, message: "50% work milestone reached for Highway Maintenance" },
];
const allCategories = ["All", "Infrastructure", "Transportation", "Energy", "Utilities"];
const allManagers = ["All", "Alice", "Bob", "Charlie"];

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarMargin = collapsed ? "ml-20" : "ml-64";

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [managerFilter, setManagerFilter] = useState("All");

  const filteredBoqs = sampleRecentBoqs.filter((bq) => {
    const matchesSearch = bq.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || bq.category === categoryFilter;
    const matchesManager = managerFilter === "All" || bq.manager === managerFilter;
    return matchesSearch && matchesCategory && matchesManager;
  });

  return (
    <PageLayout>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        toggleSidebar={() => setCollapsed(!collapsed)}
      />

      {/* Main Content */}
      <div className={`${sidebarMargin} pt-20 max-w-7xl mx-auto px-6 py-8 space-y-8`}>
        <h1 className="text-4xl font-bold text-[#154078]">Dashboard</h1>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard title="Total Scope" value={sampleKpis.totalScope} icon="FileText" />
          <KpiCard title="Total Billings" value={sampleKpis.totalBillings} icon="CreditCard" />
          <KpiCard title="Balance to Bill" value={sampleKpis.balanceToBill} icon="BarChart3" />
          <KpiCard title="Work Completed" value={`${sampleKpis.workCompleted}%`} icon="CheckSquare" />
        </div>

        {/* Filters Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("All");
                setManagerFilter("All");
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              Reset All
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search projects by name..."
              className="w-full border border-gray-300 rounded-md p-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div>
              <h3 className="text-sm font-medium mb-2">Category</h3>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      categoryFilter === cat
                        ? "bg-[#154078] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Project Manager</h3>
              <div className="flex flex-wrap gap-2">
                {allManagers.map((mgr) => (
                  <button
                    key={mgr}
                    onClick={() => setManagerFilter(mgr)}
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      managerFilter === mgr
                        ? "bg-[#154078] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {mgr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#154078] flex items-center gap-2">
              <Bell size={24} /> Notifications
            </h2>
            <button className="text-sm text-blue-600 hover:underline">Clear All</button>
          </div>
          <ul className="space-y-4 max-h-64 overflow-y-auto">
            {sampleNotifications.length === 0 ? (
              <li className="text-gray-500 text-center">No new notifications.</li>
            ) : (
              sampleNotifications.map((n) => (
                <li
                  key={n.id}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg"
                >
                  <Bell size={20} className="text-blue-600" />
                  <span className="text-gray-700">{n.message}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Billing Trend (6 mo)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sampleBillingTrend} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#154078" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Project Status Overview</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={sampleProjectStatusTrend}
                  margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="phase" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="inProgress" stroke="#f6ad55" />
                  <Line type="monotone" dataKey="completed" stroke="#48bb78" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent BoQs */}
        <div className="bg-white shadow rounded-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Recent BoQs</h2>
            <Link to="/builder" className="text-[#154078] font-medium">
              + New BoQ
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Project</th>
                  <th className="px-4 py-2">Created</th>
                  <th className="px-4 py-2">Scope</th>
                  <th className="px-4 py-2">Billing</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBoqs.map((bq) => (
                  <tr key={bq.id} className="border-t">
                    <td className="px-4 py-2">{bq.projectName}</td>
                    <td className="px-4 py-2">{bq.createdAt}</td>
                    <td className="px-4 py-2">{bq.scope}</td>
                    <td className="px-4 py-2">{bq.billings}</td>
                    <td className="px-4 py-2">{bq.status}</td>
                    <td className="px-4 py-2">
                      <Link to={`/boq/${bq.id}`} className="text-[#154078] hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

// Local KPI Card component
function KpiCard({ title, value, icon }) {
  const icons = { FileText, CreditCard, BarChart3, CheckSquare };
  const IconComponent = icons[icon] || FileText;
  return (
    <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
      <div className="p-3 bg-[#e6f2ff] rounded-full">
        <IconComponent size={24} className="text-[#154078]" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
