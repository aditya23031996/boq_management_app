import { useState } from "react";
import Sidebar from "./SideBar";
import { ChevronDown } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-100" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />

      {/* Main Area */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: collapsed ? '3.5rem' : '14rem' }}
      >
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 