// Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Folder,
  FileText,
  Receipt,
  BarChart3,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'Projects', to: '/projects', icon: <Folder size={18} /> },
  { label: 'Bill of Quantities', to: '/boq', icon: <FileText size={18} /> },
  { label: 'Invoices', to: '/invoices', icon: <Receipt size={18} /> },
  { label: 'Reports', to: '/reports', icon: <BarChart3 size={18} /> },
  { label: 'Team', to: '/team', icon: <Users size={18} /> },
  { label: 'Settings', to: '/settings', icon: <Settings size={18} /> },
];

export default function Sidebar({ collapsed, toggleSidebar }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 flex flex-col bg-[#10192A] text-white transition-all duration-300 shadow-lg z-30 ${
        collapsed ? 'w-12' : 'w-48'
      }`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Brand */}
      <div className={`flex items-center justify-center h-14 border-b border-[#1E293B] ${collapsed ? 'px-0' : 'px-3'}`}>
        {!collapsed && (
          <span className="text-lg font-regular tracking-tight text-white">Bill of Quantities Manager</span>
        )}
      </div>
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        {navItems.map(({ label, to, icon }) => (
          <Link
            key={to}
            to={to}
            className={`group flex items-center px-2 py-2 rounded-md relative transition-colors duration-200 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              collapsed ? 'justify-center' : 'gap-3'
            } ${isActive(to) ? 'bg-[#1E293B]' : 'hover:bg-[#172136]'} ${isActive(to) ? 'text-blue-400' : 'text-gray-200'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}
            tabIndex={0}
          >
            {/* Active/hover indicator */}
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded bg-blue-500 transition-all ${
                isActive(to) ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
              }`}
            />
            <span className={`transition group-hover:text-blue-400 ${isActive(to) ? 'text-blue-400' : 'text-gray-400'}`}>{icon}</span>
            {!collapsed && (
              <span className={`text-sm font-medium transition group-hover:text-blue-400 ${isActive(to) ? 'text-blue-400' : 'text-gray-200'}`}>{label}</span>
            )}
          </Link>
        ))}
      </nav>
      {/* Toggle Button at Bottom Center */}
      <div className="p-2 flex justify-center border-t border-[#1E293B]">
        <button
          onClick={toggleSidebar}
          className="p-1 hover:bg-[#172136] rounded-full transition text-gray-400 hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-expanded={!collapsed}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
}
