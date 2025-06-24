// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
  Download,
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
  AreaChart,
  Area,
  CartesianGrid,
  ReferenceLine,
  PieChart,
  Pie,
  LabelList,
} from "recharts";
import { LineChart as ReLineChart, Line as ReLine, ResponsiveContainer as ReResponsiveContainer } from 'recharts';
import { useAuth } from "/src/context/AuthContext.jsx";
import ProjectStatusPie from '../components3/ProjectStatusPie';
import DashboardLayout from "../components3/DashboardLayout";

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

const sampleNotifications = [
  { id: 1, message: "New BoQ uploaded: City Mall Expansion" },
  { id: 2, message: "Invoice generated for Airport Terminal Upgrade" },
  { id: 3, message: "50% work milestone reached for Highway Maintenance" },
];

// AnimatedCounter: animates numbers from 0 to value
function AnimatedCounter({ value, duration = 1000, format = v => v, className = "" }) {
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    let end = typeof value === 'number' ? value : parseFloat(value.toString().replace(/[^\d.-]/g, ''));
    if (isNaN(end)) {
      setDisplay(value);
      return;
    }
    let startTime = null;
    function animate(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setDisplay(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(animate);
    }
    animate(performance.now());
    // eslint-disable-next-line
  }, [value]);
  return <span className={className}>{format(display)}</span>;
}

function KpiCard({ title, value, icon, change, tooltip }) {
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
  // Format for currency or percent
  let format = v => v;
  if (typeof value === 'string' && value.startsWith('₹')) {
    format = v => `₹${v.toLocaleString()}`;
  } else if (typeof value === 'string' && value.endsWith('%')) {
    format = v => `${v}%`;
  } else if (typeof value === 'number') {
    format = v => v.toLocaleString();
  }
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col items-start shadow-md min-w-[120px] transition-transform duration-200 hover:scale-105 hover:shadow-xl relative group"
      style={{ fontFamily: 'Inter, sans-serif', cursor: tooltip ? 'pointer' : 'default' }}
      tabIndex={tooltip ? 0 : -1}
    >
      <div className="p-1.5 bg-gray-100 rounded mb-2">
        <IconComponent size={20} className="text-[#154078]" />
      </div>
      <div className="text-xl font-extrabold text-[#154078] leading-tight">
        <AnimatedCounter value={value} format={format} className="text-xl font-extrabold" />
      </div>
      <div className="text-sm text-gray-500 mb-1 font-normal leading-tight">{title}</div>
      {change !== undefined && (
        <div className={`text-xs ${changeColor} flex items-center`}>{changeIcon}<span className="ml-1">{Math.abs(change)}%</span></div>
      )}
      {tooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs px-3 py-2 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none z-20 shadow-lg transition-opacity duration-200">
          {tooltip}
        </div>
      )}
    </div>
  );
}

function SectionHeader({ children }) {
  return (
    <div className="flex items-center gap-2 mb-2 mt-2">
      <span className="inline-block w-1 h-5 rounded bg-[#264653]" />
      <h2 className="text-base font-medium text-[#264653] tracking-tight" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>{children}</h2>
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
    <div className="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-200 rounded-md p-4 mb-4 shadow-sm font-inter">
      <div className="flex flex-col gap-1">
        <h1 className="text-base font-medium text-[#154078] mb-0.5">
          {greeting}, {username}!
        </h1>
        <p className="text-sm text-gray-600">
          Welcome to <span className="font-medium text-[#154078]">{company}</span>'s BOQ Dashboard.
        </p>
      </div>
      <Link to="/project/create" className="mt-3 md:mt-0 px-4 py-1.5 rounded bg-[#154078] text-white font-medium shadow hover:bg-[#1e3a8a] transition text-sm">
        + Create New Project
      </Link>
    </div>
  );
}

// BillingTrendChart component
function BillingTrendChart() {
  // Simulated data for 12 months
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
  // Find current month index
  const now = new Date();
  const currentMonthIdx = now.getMonth();
  const currentMonth = data[currentMonthIdx]?.month;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
      <h2 className="text-base font-medium text-[#154078] mb-1">Billing Trend</h2>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#154078" stopOpacity={0.7}/>
              <stop offset="95%" stopColor="#154078" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorInProgress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#48bb78" stopOpacity={0.5}/>
              <stop offset="95%" stopColor="#48bb78" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#154078" tick={{ fontSize: 13, fontFamily: 'Inter, sans-serif' }} />
          <YAxis stroke="#154078" tick={{ fontSize: 13, fontFamily: 'Inter, sans-serif' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
          <Tooltip contentStyle={{ fontSize: "13px", fontFamily: 'Inter, sans-serif' }} formatter={v => `₹${v.toLocaleString()}`}/>
          <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', fontFamily: 'Inter, sans-serif' }} />
          <Area type="monotone" dataKey="completed" name="Completed" stroke="#154078" fillOpacity={1} fill="url(#colorCompleted)" strokeWidth={3} />
          <Area type="monotone" dataKey="inProgress" name="In Progress" stroke="#48bb78" fillOpacity={1} fill="url(#colorInProgress)" strokeWidth={3} />
          {currentMonth && (
            <ReferenceLine x={currentMonth} stroke="#fbbf24" strokeDasharray="4 2" label={{ value: 'This Month', position: 'top', fill: '#fbbf24', fontSize: 12, fontFamily: 'Inter, sans-serif' }} />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// NotificationDropdown component
function NotificationDropdown({ notifications }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <button
        className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <Bell size={20} className="text-[#154078]" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          <div className="p-3 border-b font-normal text-[#154078]">Notifications</div>
          <ul className="max-h-60 overflow-y-auto divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <li className="p-3 text-gray-500 text-center">No new notifications.</li>
            ) : notifications.map((n) => (
              <li key={n.id} className="p-3 text-gray-700">{n.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ProfileDropdown component
function ProfileDropdown({ user }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition"
        onClick={() => setOpen((o) => !o)}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <User size={18} className="text-[#154078]" />
        <span className="font-normal text-[#154078] text-sm">{user?.name || 'Profile'}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          <div className="p-3 border-b text-[#154078] font-normal">{user?.name || 'User'}</div>
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}

// Floating Quick Action Button
function FloatingQuickAction() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        className="fixed z-50 bottom-8 right-8 bg-[#154078] hover:bg-blue-900 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl transition-all duration-200"
        onClick={() => setOpen((o) => !o)}
        aria-label="Quick Actions"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        +
      </button>
      {open && (
        <div className="fixed z-50 bottom-28 right-8 bg-white border border-gray-200 rounded-xl shadow-xl p-4 flex flex-col gap-3 min-w-[180px] animate-fade-in" style={{ fontFamily: 'Inter, sans-serif' }}>
          <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-[#154078] font-normal" onClick={() => { window.location.href = '/project/create'; }}><Folder size={16}/> New Project</button>
          <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-[#154078] font-normal" onClick={() => { window.location.href = '/builder'; }}><FileText size={16}/> New BoQ</button>
        </div>
      )}
    </>
  );
}

export default function Dashboard() {
  const { user_id } = useParams();
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [boqs, setBoqs] = useState([]);
  const [userName, setUserName] = useState("");
  const [companyName, setCompanyName] = useState("");
// Calculate total scope from all projects
  const totalScope = projects.reduce((sum, p) => sum + (Number(p.total_scope) || 0), 0);

  useEffect(() => {
    if (!user_id) return;
    fetch(`/project/${user_id}`)
      .then(res => res.json())
      .then(setProjects);
    fetch(`/boq/${user_id}`)
      .then(res => res.json())
      .then(setBoqs);
    fetch(`/user/${user_id}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          const name = (data.first_name || "") + (data.last_name ? (" " + data.last_name) : "");
          setUserName(name.trim() || "User");
          setCompanyName(data.company_name || "");
        } else {
          setUserName("User");
        }
      })
      .catch(() => setUserName("User"));
  }, [user_id]);

  return (
    <DashboardLayout>
      <div className="px-4 py-6 transition-all duration-300" 
      style={{ fontFamily: "Inter, sans-serif" }}>
        
        {/* Top Bar: Notification Bell & Profile Dropdown */}
        <div className="flex items-center justify-end gap-4 mb-4">
          <NotificationDropdown notifications={sampleNotifications} />
          <ProfileDropdown user={user} />
        </div>

        {/* Welcome Banner */}
        <HeroSection username={userName} company={companyName} />

        {/* KPI Grid */}
        <SectionHeader>Key Metrics</SectionHeader>
        <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5">
          <KpiCard title="Total Projects" value={projects.length} icon="Folder" change={sampleKpis.projectsChange} tooltip="Total number of projects you are managing." />
          <KpiCard title="Total BoQs" value={boqs.length} icon="FileText" change={sampleKpis.boqsChange} tooltip="Total Bill of Quantities across all projects." />
          <KpiCard title="Total Scope" value={totalScope} icon="FileText" change={sampleKpis.scopeChange} tooltip="Sum of all project scopes." />
          <KpiCard title="Billings Completed" value={sampleKpis.billingsCompleted} icon="CreditCard" change={sampleKpis.billingsCompletedChange} tooltip="Total value of completed billings." />
          <KpiCard title="Billings In Progress" value={sampleKpis.billingsInProgress} icon="CreditCard" change={sampleKpis.billingsInProgressChange} tooltip="Current value of billings in progress." />
          <KpiCard title="Balance to Bill" value={sampleKpis.balanceToBill} icon="BarChart3" change={sampleKpis.balanceChange} tooltip="Remaining value to be billed." />
          <KpiCard title="Work Completed" value={`${sampleKpis.workCompleted}%`} icon="CheckSquare" change={sampleKpis.workCompletedChange} tooltip="Overall work completion percentage." />
        </div>

        {/* Modern Data Visualizations */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProjectStatusPie projects={projects} />
          <BillingTrendChart />
        </div>

        {/* Floating Quick Action Button */}
        <FloatingQuickAction />
        
      </div>
    </DashboardLayout>
  );
}
