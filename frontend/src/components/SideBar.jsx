// Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Folder,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/dashboard', icon: <LayoutDashboard size={16} /> },
  { label: 'Projects', to: '/projects', icon: <Folder size={16} /> },
  { label: 'Bill of Quantities', to: '/reports', icon: <FileText size={16} /> },
  { label: 'Settings', to: '/settings', icon: <Settings size={16} /> },
];

export default function Sidebar({ collapsed, toggleSidebar }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 flex flex-col bg-gray-900 text-white shadow-lg transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-48'
      } font-sans antialiased`}
    >
      {/* Header */}
      <div className="flex items-center justify-center p-3 border-b border-gray-700">
        {!collapsed && (
          <span className="text-base font-normal tracking-normal">
            Bill of Quantities Manager
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-2">
        {navItems.map(({ label, to, icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center transition-colors duration-200 px-2 py-1 rounded-md hover:bg-gray-700 ${
              collapsed ? 'justify-center' : 'gap-1'
            } ${isActive(to) ? 'bg-gray-700 shadow-inner' : ''}`}
          >
            {icon}
            {!collapsed && (
              <span className="text-xs font-semibold">{label}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Toggle Button at Bottom Center */}
      <div className="p-3 flex justify-center">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-700 rounded-full transition"
          aria-expanded={!collapsed}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
}
