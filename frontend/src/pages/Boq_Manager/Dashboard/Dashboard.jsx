// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../components3/DashboardLayout";
import { 
  Bell, 
  FileText, 
  CreditCard, 
  BarChart3, 
  CheckSquare, 
  Settings, 
  Folder,
  User,
  ArrowUp,
  ArrowDown,
  PlusCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  ComposedChart,
} from "recharts";
import { useAuth } from "/src/context/AuthContext.jsx";

// Sample KPI data
const sampleKpis = {
  totalScope: 1500,
  billingsCompleted: "₹1,000,000",
  billingsCompletedChange: -2,
  billingsInProgress: "₹250,000",
  billingsInProgressChange: 3,
  balanceToBill: "₹250,000",
  workCompleted: 65,
  projectsChange: 33,
  boqsChange: -10,
  scopeChange: 10,
  balanceChange: 15,
  workCompletedChange: 5,
};

const sampleBillingTrend = [
  { month: "Jan", amount: 200000, forecast: false },
  { month: "Feb", amount: 180000, forecast: false },
  { month: "Mar", amount: 215000, forecast: false },
  { month: "Apr", amount: 240000, forecast: false },
  { month: "May", amount: 195000, forecast: false },
  { month: "Jun", amount: 220000, forecast: false },
  { month: "Jul", amount: 230000, forecast: true },
  { month: "Aug", amount: 210000, forecast: true },
  { month: "Sep", amount: 225000, forecast: true },
  { month: "Oct", amount: 235000, forecast: true },
  { month: "Nov", amount: 205000, forecast: true },
  { month: "Dec", amount: 240000, forecast: true },
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
    billings: "₹900,000",
    status: "In Progress",
    category: "Infrastructure",
    manager: "Alice",
  },
  {
    id: "2",
    projectName: "Airport Terminal Upgrade",
    createdAt: "2025-04-05",
    scope: "1800 items",
    billings: "₹1,080,000",
    status: "Completed",
    category: "Transportation",
    manager: "Bob",
  },
  {
    id: "3",
    projectName: "Highway Maintenance",
    createdAt: "2025-03-28",
    scope: "1200 items",
    billings: "₹600,000",
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
const allManagers   = ["All", "Alice", "Bob", "Charlie"];

function KpiCard({ title, value, icon, change }) {
  const icons = { FileText, CreditCard, BarChart3, CheckSquare, Folder };
  const IconComponent = icons[icon] || FileText;
  let changeIcon = null;
  let changeColor = "text-gray-500";
  if (change > 0) {
    changeIcon = <ArrowUp size={14} className="text-green-600 inline-block" />;
    changeColor = "text-green-600";
  } else if (change < 0) {
    changeIcon = <ArrowDown size={14} className="text-red-600 inline-block" />;
    changeColor = "text-red-600";
  }
  return (
    <div className="bg-white border border-gray-200 rounded-md p-3 flex flex-col items-start shadow-sm min-w-[110px]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="p-1 bg-gray-100 rounded mb-1">
        <IconComponent size={18} className="text-[#154078]" />
      </div>
      <div className="text-lg font-bold text-[#154078] leading-tight">{value}</div>
      <div className="text-xs text-gray-500 mb-0.5 font-medium leading-tight">{title}</div>
      {change !== undefined && (
        <div className={`text-xs ${changeColor} flex items-center`}>{changeIcon}<span className="ml-1">{Math.abs(change)}%</span></div>
      )}
    </div>
  );
}

function SectionHeader({ children }) {
  return (
    <div className="flex items-center gap-2 mb-2 mt-2">
      <span className="inline-block w-1 h-5 rounded bg-[#154078]" />
      <h2 className="text-base font-semibold text-[#154078] tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{children}</h2>
      </div>
  );
}

function HeroSection({ username, company }) {
  // Time-based greeting
  const hour = new Date().getHours();
  let greeting = "Good evening";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-200 rounded-md p-4 mb-4 shadow-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex flex-col gap-1">
        <h1 className="text-lg md:text-xl font-bold text-[#154078] mb-0.5">{greeting}, {username}!</h1>
        <p className="text-gray-600 text-sm">Welcome to <span className="font-semibold text-[#154078]">{company}</span>'s BOQ Dashboard.</p>
                </div>
      <Link to="/project/create" className="mt-3 md:mt-0 px-4 py-1.5 rounded bg-[#154078] text-white font-semibold shadow hover:bg-[#1e3a8a] transition text-sm">+ Create New Project</Link>
            </div>
  );
}

function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Link to="/project/create" className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded text-[#154078] font-semibold hover:bg-blue-100 transition text-sm">
        <PlusCircle size={15} /> New Project
      </Link>
      <Link to="/builder" className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded text-[#154078] font-semibold hover:bg-blue-100 transition text-sm">
        <FileText size={15} /> New BoQ
      </Link>
      <Link to="/reports" className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded text-[#154078] font-semibold hover:bg-blue-100 transition text-sm">
        <BarChart3 size={15} /> Reports
            </Link>
          </div>
  );
}

function StatusBadge({ status }) {
  const color = status === "Completed" ? "bg-green-100 text-green-700" : status === "In Progress" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700";
  return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>{status}</span>;
}

function RecentBoqsTable({ boqs }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-3 py-2 font-semibold text-gray-700">Project</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Created</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Scope</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Billing</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Status</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Manager</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {boqs.map((bq) => (
            <tr key={bq.id} className="border-b hover:bg-gray-50 transition">
              <td className="px-3 py-2 font-medium text-[#154078]">{bq.projectName}</td>
              <td className="px-3 py-2">{bq.createdAt}</td>
              <td className="px-3 py-2">{bq.scope}</td>
              <td className="px-3 py-2">{bq.billings}</td>
              <td className="px-3 py-2"><StatusBadge status={bq.status} /></td>
              <td className="px-3 py-2">{bq.manager}</td>
              <td className="px-3 py-2">
                <Link to={`/boq/${bq.id}`} className="text-[#154078] hover:underline font-semibold">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
}

function NotificationCard({ notifications }) {
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-[#154078] flex items-center gap-2">
          <Bell size={14} /> Notifications
        </h2>
        <button className="text-xs text-blue-600 hover:underline">Clear All</button>
      </div>
      <ul className="space-y-1 max-h-48 overflow-y-auto">
        {notifications.length === 0 ? (
          <li className="text-gray-500 text-center">No new notifications.</li>
        ) : (
          notifications.map((n) => (
            <li key={n.id} className="flex items-center gap-1.5 p-1 bg-gray-50 rounded">
              <Bell size={12} className="text-blue-600" />
              <span className="text-gray-700 text-xs">{n.message}</span>
            </li>
          ))
        )}
      </ul>
      </div>
    );
  }
  
function BillingTrendChart() {
  const [rollingPeriod, setRollingPeriod] = useState(3);
  const data = [
    { month: "Jan", completed: 150000, inProgress: 50000 },
    { month: "Feb", completed: 130000, inProgress: 50000 },
    { month: "Mar", completed: 170000, inProgress: 45000 },
    { month: "Apr", completed: 200000, inProgress: 40000 },
    { month: "May", completed: 160000, inProgress: 35000 },
    { month: "Jun", completed: 180000, inProgress: 40000 },
    { month: "Jul", completed: 190000, inProgress: 40000 },
    { month: "Aug", completed: 175000, inProgress: 35000 },
    { month: "Sep", completed: 185000, inProgress: 30000 },
    { month: "Oct", completed: 195000, inProgress: 40000 },
    { month: "Nov", completed: 170000, inProgress: 35000 },
    { month: "Dec", completed: 210000, inProgress: 30000 },
  ];
  const dataWithTotal = data.map(item => ({
    ...item,
    total: item.completed + item.inProgress,
  }));
  function computeRollingAverage(dataArr, period) {
    const result = [];
    for (let i = 0; i < dataArr.length; i++) {
      if (i < period - 1) {
        result.push(null);
      } else {
        let sum = 0;
        for (let j = i - period + 1; j <= i; j++) {
          sum += dataArr[j].total;
        }
        result.push(sum / period);
      }
    }
    return result;
  }
  const rollingAvg = computeRollingAverage(dataWithTotal, rollingPeriod);
  const forecastMonths = ["Jan*", "Feb*", "Mar*"];
  const lastRolling = rollingAvg.slice().reverse().find(val => val !== null) || 0;
  const forecastData = forecastMonths.map(m => ({
    month: m,
    completed: null,
    inProgress: null,
    total: null,
    rollingAvg: lastRolling,
  }));
  const chartData = [
    ...dataWithTotal.map((d, i) => ({ ...d, rollingAvg: rollingAvg[i] })),
    ...forecastData,
  ];
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs mb-2 font-semibold text-gray-700">Billing Trend (12 mo)</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs">Rolling Avg:</span>
          {[3, 6, 12].map(period => (
                  <button
              key={period}
              onClick={() => setRollingPeriod(period)}
              className={`px-2 py-1 rounded-full text-xs border ${
                rollingPeriod === period
                  ? "bg-[#154078] text-white border-[#154078]"
                  : "bg-gray-100 text-gray-800 border-gray-200"
              }`}
            >
              {period} mo
                    </button>
                  ))}
                </div>
              </div>
      <ResponsiveContainer width="100%" height={160}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <defs>
            <linearGradient id="gradientCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#154078" stopOpacity={0.85} />
              <stop offset="95%" stopColor="#154078" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="gradientInProgress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#154078" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#154078" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
          <XAxis dataKey="month" stroke="#154078" tick={{ fontSize: 10 }} />
          <YAxis stroke="#154078" tick={{ fontSize: 10 }} />
          <Tooltip contentStyle={{ fontSize: "10px" }} />
          <Legend verticalAlign="top" wrapperStyle={{ fontSize: "10px", color: "#154078" }} />
          <Bar dataKey="completed" stackId="a" fill="url(#gradientCompleted)" barSize={12} />
          <Bar dataKey="inProgress" stackId="a" fill="url(#gradientInProgress)" barSize={12} />
          <Line dataKey="rollingAvg" stroke="#48bb78" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 3 }} />
        </ComposedChart>
                </ResponsiveContainer>
              </div>
  );
}

export default function Dashboard() {
  const { user_id } = useParams();
  const { user, token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [managerFilter, setManagerFilter] = useState("All");

  useEffect(() => {
    if (!user_id) return;
    fetch(`/project/${user_id}`)
      .then(res => res.json())
      .then(setProjects);
  }, [user_id]);

  const filteredBoqs = projects.filter((bq) => {
    const matchesSearch = (bq.name || "").toLowerCase().includes((searchQuery || "").toLowerCase());
    const matchesCategory = categoryFilter === "All" || bq.category === categoryFilter;
    const matchesManager = managerFilter === "All" || bq.manager === managerFilter;
    return matchesSearch && matchesCategory && matchesManager;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 transition-all duration-300" style={{ fontFamily: 'Inter, sans-serif', background: '#f7f8fa', minHeight: '100vh' }}>
        {/* Hero Section */}
        <HeroSection username={user?.name} company={user?.company} />
        {/* Quick Actions */}
        <QuickActions />
        {/* KPI Grid */}
        <SectionHeader>Key Metrics</SectionHeader>
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <KpiCard title="Total Projects" value={projects.length} icon="Folder" change={sampleKpis.projectsChange} />
          <KpiCard title="Total BoQs" value={projects.length} icon="FileText" change={sampleKpis.boqsChange} />
          <KpiCard title="Total Scope" value={sampleKpis.totalScope} icon="FileText" change={sampleKpis.scopeChange} />
          <KpiCard title="Billings Completed" value={sampleKpis.billingsCompleted} icon="CreditCard" change={sampleKpis.billingsCompletedChange} />
          <KpiCard title="Billings In Progress" value={sampleKpis.billingsInProgress} icon="CreditCard" change={sampleKpis.billingsInProgressChange} />
          <KpiCard title="Balance to Bill" value={sampleKpis.balanceToBill} icon="BarChart3" change={sampleKpis.balanceChange} />
          <KpiCard title="Work Completed" value={`${sampleKpis.workCompleted}%`} icon="CheckSquare" change={sampleKpis.workCompletedChange} />
              </div>
        {/* Charts Section */}
        <SectionHeader>Billing Overview</SectionHeader>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <BillingTrendChart />
          <NotificationCard notifications={sampleNotifications} />
                    </div>
        {/* Recent BoQs */}
        <SectionHeader>Recent BoQs</SectionHeader>
        <div className="mb-6 bg-white border border-gray-200 shadow-sm rounded-md">
          <div className="flex items-center justify-between p-3 border-b">
            <h2 className="text-sm font-semibold text-[#154078]">Recent BoQs</h2>
            <Link to="/builder" className="text-[#154078] font-semibold flex items-center gap-1 text-sm"><PlusCircle size={15}/> New BoQ</Link>
          </div>
          <RecentBoqsTable boqs={filteredBoqs} />
        </div>
      </div>
    </DashboardLayout>
  );
}
