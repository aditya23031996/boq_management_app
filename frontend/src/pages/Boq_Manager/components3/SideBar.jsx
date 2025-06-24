import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
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

export default function Sidebar({ collapsed, toggleSidebar }) {
  const location = useLocation();
  const { user } = useAuth();
  const params = useParams();
  const user_id = user?.user_id || params.user_id;

  // Subtle, accessible color palette
  const BG = "#202632";
  const ACCENT = "#202632";
  const NAV_TEXT = "#e5ecfa";
  const ICON_ACTIVE = "#4099ea";
  const ICON_INACTIVE = "#a6b5c9";
  const ACTIVE_BG = "#232e43";

  const navItems = [
    { label: 'Dashboard', to: user_id ? `/${user_id}/dashboard` : '/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Projects', to: user_id ? `/${user_id}/projects` : '/projects', icon: <Folder size={18} /> },
    { label: 'BoQ Sheets', to: user_id ? `/${user_id}/bill_of_quantities` : '/boq', icon: <FileText size={18} /> },
    { label: 'Invoices', to: '/invoices', icon: <Receipt size={18} /> },
    { label: 'Reports', to: '/reports', icon: <BarChart3 size={18} /> },
    { label: 'Team', to: '/team', icon: <Users size={18} /> },
    { label: 'Settings', to: '/settings', icon: <Settings size={18} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`
        fixed top-0 left-0 flex flex-col z-40
        ${collapsed ? 'w-14' : 'w-48'} transition-all duration-300
        bg-[${BG}] border-r border-[#22293a] min-h-screen
      `}
      style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
    >
      {/* Brand area with blue background */}
      <div className="flex flex-col justify-center h-16 border-b border-[#22293a] bg-[#264653]">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start pl-5'}`}>
          {!collapsed && (
            <span className="inline-block h-5 w-1.5 rounded bg-white mr-2" aria-hidden />
          )}
          <span className={`text-xl font-semibold text-white tracking-wide select-none`}>
            {collapsed ? 'Q' : 'QuantifyPro'}
          </span>
        </div>
        {!collapsed && (
          <span className="text-[11px] font-normal text-white/80 ml-7 mt-0.5 select-none tracking-wide">
            Bill of Quantities Manager
          </span>
        )}
      </div>
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto pt-3 pb-1">
        <ul className="flex flex-col gap-0.5">
          {navItems.map(({ label, to, icon }) => {
            const active = isActive(to);
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`
                    group flex items-center
                    ${collapsed ? 'justify-center' : 'gap-3 pl-7 pr-2'}
                    py-2 rounded-md
                    text-[15px] font-normal tracking-wide
                    transition-all duration-100
                    ${
                      active
                        ? `bg-[${ACTIVE_BG}] text-white`
                        : `hover:bg-[#232e43] text-[${NAV_TEXT}] hover:text-white`
                    }
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1976d2] focus:z-10
                  `}
                  tabIndex={0}
                  title={collapsed ? label : undefined}
                >
                  {/* Small dot for active, minimal (Apple style) */}
                  <span className={`mr-2 ${active ? 'inline-block h-2 w-2 rounded-full bg-[#1976d2]' : 'w-2'}`}></span>
                  <span className={`
                    transition group-hover:scale-110
                    ${active ? `text-[${ICON_ACTIVE}]` : `text-[${ICON_INACTIVE}]`}
                  `}>
                    {icon}
                  </span>
                  {!collapsed && (
                    <span className={`ml-1 ${active ? 'text-white' : `text-[${NAV_TEXT}]`}`}>
                      {label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Toggle Button */}
      <div className="flex justify-center items-center py-3">
        <button
          onClick={toggleSidebar}
          className={`
            flex items-center justify-center w-9 h-9
            bg-[#232e43] hover:bg-[#1976d2]
            rounded-md text-[#a6b5c9] hover:text-white
            border-none transition
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1976d2]
          `}
          aria-expanded={!collapsed}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <ChevronRight size={18} />
            : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
}
