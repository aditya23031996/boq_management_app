import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Folder,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({ collapsed, toggleSidebar }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`bg-gradient-to-b from-[#154078] to-[#415a77] text-white fixed top-16 bottom-0 left-0 flex flex-col shadow-2xl transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Section */}
      <div className="p-6 flex items-center justify-between border-b border-[#2c3e50]">
        {!collapsed && (
          <span className="text-3xl font-extrabold tracking-wider">BoQ</span>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-[#2c3e50] rounded-full transition"
        >
          {collapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-4 space-y-2">
        <SidebarLink
          to="/dashboard"
          icon={<LayoutDashboard size={20} />}
          active={isActive("/dashboard")}
          collapsed={collapsed}
        >
          Dashboard
        </SidebarLink>
        <SidebarLink
          to="/projects"
          icon={<Folder size={20} />}
          active={isActive("/projects")}
          collapsed={collapsed}
        >
          Projects
        </SidebarLink>
        <SidebarLink
          to="/boqs"
          icon={<FileText size={20} />}
          active={isActive("/boqs")}
          collapsed={collapsed}
        >
          BoQs
        </SidebarLink>
        <SidebarLink
          to="/settings"
          icon={<Settings size={20} />}
          active={isActive("/settings")}
          collapsed={collapsed}
        >
          Settings
        </SidebarLink>
      </nav>

      {/* Footer Section (Optional) */}
      <div className="p-4 border-t border-[#2c3e50] mt-auto">
        {!collapsed && <span className="text-sm">Version 1.0.0</span>}
      </div>
    </aside>
  );
}

function SidebarLink({ to, icon, active, collapsed, children }) {
  return (
    <Link
      to={to}
      className={`flex items-center ${
        collapsed ? "justify-center" : "gap-4"
      } px-4 py-3 rounded-md transition-all duration-300 hover:bg-[#2c3e50] ${
        active ? "bg-[#2c3e50] shadow-inner" : ""
      }`}
    >
      {icon}
      {!collapsed && <span className="font-semibold">{children}</span>}
    </Link>
  );
}
