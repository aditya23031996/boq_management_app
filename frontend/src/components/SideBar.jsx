import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Folder, FileText, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Sidebar({ collapsed, toggleSidebar }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`bg-gradient-to-b from-[#1e3a8a] to-[#154078] text-white h-screen fixed top-0 left-0 flex flex-col shadow-xl transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>
      {/* Top Section */}
      <div className="p-6 flex items-center justify-between border-b border-blue-700">
        {!collapsed && (
          <span className="text-2xl font-bold tracking-wide">BoQ</span>
        )}
        <button onClick={toggleSidebar} className="text-white">
          {collapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-4 space-y-2">
        <SidebarLink to="/dashboard" icon={<LayoutDashboard size={20} />} active={isActive("/dashboard")} collapsed={collapsed}>
          Dashboard
        </SidebarLink>
        <SidebarLink to="/projects" icon={<Folder size={20} />} active={isActive("/projects")} collapsed={collapsed}>
          Projects
        </SidebarLink>
        <SidebarLink to="/boqs" icon={<FileText size={20} />} active={isActive("/boqs")} collapsed={collapsed}>
          BoQs
        </SidebarLink>
        <SidebarLink to="/settings" icon={<Settings size={20} />} active={isActive("/settings")} collapsed={collapsed}>
          Settings
        </SidebarLink>
      </nav>
    </aside>
  );
}

function SidebarLink({ to, icon, active, collapsed, children }) {
  return (
    <Link
      to={to}
      className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} px-4 py-3 rounded-md transition-all duration-300 ${
        active
          ? "bg-white bg-opacity-20 shadow-inner"
          : "hover:bg-white hover:bg-opacity-10"
      }`}
    >
      {icon}
      {!collapsed && <span className="font-medium">{children}</span>}
    </Link>
  );
}
