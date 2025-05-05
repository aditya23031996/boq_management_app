// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/SideBar";
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
  ArrowDown
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
  ComposedChart
} from "recharts";

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

// Receivables Aging Component
function ReceivablesAging() {
  const receivablesData = [
    {
      name: "Receivables",
      current: 0,
      overdue1_15: 0,
      days16_30: 118000,
      days31_45: 0,
      above45: 19706,
    },
  ];

  const currentVal   = Number(receivablesData[0].current)    || 0;
  const overdueVal   = Number(receivablesData[0].overdue1_15)|| 0;
  const days1630Val  = Number(receivablesData[0].days16_30)  || 0;
  const days3145Val  = Number(receivablesData[0].days31_45)  || 0;
  const above45Val   = Number(receivablesData[0].above45)    || 0;

  const total     = currentVal + overdueVal + days1630Val + days3145Val + above45Val;
  const safeTotal = total > 0 ? total : 1;

  const colors = {
    current:     "#60A5FA",
    overdue1_15: "#FBBF24",
    days16_30:   "#F97316",
    days31_45:   "#EF4444",
    above45:     "#B91C1C",
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Total Receivables</h2>
        <button className="text-blue-600 text-sm">+ New</button>
      </div>
      <p className="text-gray-500 text-sm mb-2">₹{total.toLocaleString()}</p>
            <div style={{ height: 24 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={receivablesData}
            layout="vertical"                      // ← bars horizontal
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <YAxis type="category" dataKey="name" hide />
            <XAxis type="number" hide domain={[0, safeTotal]} />
            <Bar dataKey="current" stackId="a" barSize={8}>
              <Cell fill={colors.current} />
            </Bar>
            <Bar dataKey="overdue1_15" stackId="a" barSize={8}>
              <Cell fill={colors.overdue1_15} />
            </Bar>
            <Bar dataKey="days16_30" stackId="a" barSize={8}>
              <Cell fill={colors.days16_30} />
            </Bar>
            <Bar dataKey="days31_45" stackId="a" barSize={8}>
              <Cell fill={colors.days31_45} />
            </Bar>
            <Bar dataKey="above45" stackId="a" barSize={8}>
              <Cell fill={colors.above45} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Helper to format numbers & ₹-strings
function formatNumber(value) {
  if (typeof value === "number") {
    if (value < 1e3) return value;
    if (value < 1e5) return (value / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
    if (value < 1e7) return (value / 1e5).toFixed(1).replace(/\.0$/, "") + "L";
    return (value / 1e7).toFixed(1).replace(/\.0$/, "") + "Cr";
  }
  if (typeof value === "string" && value.startsWith("₹")) {
    const num = Number(value.replace(/[₹,]/g, ""));
    if (isNaN(num)) return value;
    if (num < 1e3) return "₹" + num;
    if (num < 1e5) return "₹" + (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
    if (num < 1e7) return "₹" + (num / 1e5).toFixed(1).replace(/\.0$/, "") + "L";
    return "₹" + (num / 1e7).toFixed(1).replace(/\.0$/, "") + "Cr";
  }
  return value;
}

// KPI Card update: use a unified text style throughout
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

  const formattedValue = formatNumber(value);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-blue-100 transition transform hover:-translate-y-1 rounded-lg p-4 flex flex-col space-y-1 shadow-lg text-sm">
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-blue-100 rounded-full">
          <IconComponent size={20} className="text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600 truncate">{title}</p>
          <p className="text-sm font-medium text-gray-800">{formattedValue}</p>
        </div>
      </div>
      {change !== undefined && (
        <p className={`text-sm ${changeColor} flex items-center`}>
          {changeIcon}
          <span className="ml-1">{Math.abs(change)}% last month</span>
        </p>
      )}
    </div>
  );
}

// Billing Trend Chart update: uniform text across chart and controls
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

  // Forecast for next 3 months using the last valid rolling average value.
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
    <div className="bg-white shadow rounded-lg p-4 text-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm mb-2">Billing Trend (12 mo)</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm">Rolling Avg:</span>
          {[3, 6, 12].map(period => (
            <button
              key={period}
              onClick={() => setRollingPeriod(period)}
              className={`px-2 py-1 rounded-full text-sm ${
                rollingPeriod === period
                  ? "bg-[#154078] text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {period} mo
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="80%" height={200}>
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
          <XAxis dataKey="month" stroke="#154078" tick={{ fontSize: 12 }} />
          <YAxis stroke="#154078" tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ fontSize: "12px" }} />
          <Legend verticalAlign="top" wrapperStyle={{ fontSize: "12px", color: "#154078" }} />
          <Bar dataKey="completed" stackId="a" fill="url(#gradientCompleted)" barSize={18} />
          <Bar dataKey="inProgress" stackId="a" fill="url(#gradientInProgress)" barSize={18} />
          <Line dataKey="rollingAvg" stroke="#48bb78" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Dashboard() {
  const [collapsed, setCollapsed]           = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const contentMarginLeft                   = collapsed ? "4rem" : "12rem";

  const username         = "@username";
  const userCompanyName  = "@user_company_name";

  const [searchQuery, setSearchQuery]   = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [managerFilter, setManagerFilter]   = useState("All");
  const [showFilters, setShowFilters]       = useState(false);

  const filteredBoqs = sampleRecentBoqs.filter((bq) => {
    const matchesSearch   = bq.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || bq.category === categoryFilter;
    const matchesManager  = managerFilter  === "All" || bq.manager  === managerFilter;
    return matchesSearch && matchesCategory && matchesManager;
  });

  return (
    <>
      <Sidebar collapsed={collapsed} toggleSidebar={() => setCollapsed(!collapsed)} />
      <div
        className="max-w-7xl mx-auto px-6 py-8 transition-all duration-300"
        style={{ marginLeft: contentMarginLeft }}
      >
        {/* Top Bar */}
        <div className="mb-6">
          <div className="bg-white shadow rounded-lg px-6 py-4 flex items-center justify-between">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search projects by name..."
                className="w-full border border-gray-300 rounded-md p-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowFilters(true)}
                onBlur={() => setTimeout(() => setShowFilters(false), 150)}
              />
              {showFilters && (
                <div className="absolute top-full left-0 z-10 mt-2 w-full bg-white border border-gray-300 rounded-md p-4 shadow">
                  <div className="mb-4">
                    <h3 className="text-sm mb-1">Category</h3>
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
                    <h3 className="text-sm mb-1">Project Manager</h3>
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
              )}
            </div>
            <div className="flex items-center ml-4 space-x-2">
              <button
                onClick={() => setShowNotifications((p) => !p)}
                className="p-2 rounded-full hover:bg-gray-200"
                aria-label="Toggle Notifications"
              >
                <Bell size={24} className="text-gray-800" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-200">
                <User size={24} className="text-gray-800" />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {showNotifications && (
          <div className="mb-6 bg-white shadow-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-[#154078] flex items-center gap-2">
                <Bell size={24} /> Notifications
              </h2>
              <button className="text-sm text-blue-600 hover:underline">
                Clear All
              </button>
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
        )}

        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-lg text-gray-800">
            Hello {username}, {userCompanyName}
          </h1>
        </div>

        {/* KPI Grid */}
        <div className="mb-8 grid grid-cols-7 gap-4">
          <KpiCard title="Total Projects" value={3} icon="Folder" change={sampleKpis.projectsChange} />
          <KpiCard title="Total BoQs" value={sampleRecentBoqs.length} icon="FileText" change={sampleKpis.boqsChange} />
          <KpiCard title="Total Scope" value={sampleKpis.totalScope} icon="FileText" change={sampleKpis.scopeChange} />
          <KpiCard title="Billings Completed" value={sampleKpis.billingsCompleted} icon="CreditCard" change={sampleKpis.billingsCompletedChange} />
          <KpiCard title="Billings In Progress" value={sampleKpis.billingsInProgress} icon="CreditCard" change={sampleKpis.billingsInProgressChange} />
          <KpiCard title="Balance to Bill" value={sampleKpis.balanceToBill} icon="BarChart3" change={sampleKpis.balanceChange} />
          <KpiCard title="Work Completed" value={`${sampleKpis.workCompleted}%`} icon="CheckSquare" change={sampleKpis.workCompletedChange} />
        </div>

        {/* Receivables Aging */}
        <div className="mb-8">
          <ReceivablesAging />
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <BillingTrendChart />
        </div>

        {/* Recent BoQs */}
        <div className="mb-8 bg-white shadow rounded-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl">Recent BoQs</h2>
            <Link to="/builder" className="text-[#154078]">+ New BoQ</Link>
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
    </>
  );
}
