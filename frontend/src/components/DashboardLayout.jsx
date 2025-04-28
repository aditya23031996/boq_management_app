import { useState } from "react";
import Sidebar from "./Sidebar";
import { ChevronDown } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />

      {/* Main Area */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: collapsed ? '5rem' : '16rem' }}
      >
        {/* Top Navbar */}
        <header className="h-16 bg-white flex items-center justify-between px-6 shadow-sm border-b">
          <h1 className="text-xl font-bold text-[#154078]">BoQ Management</h1>
          <div className="relative">
            <button
              className="flex items-center space-x-2 bg-[#154078] text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
            >
              <span>Profile</span>
              <ChevronDown size={18} />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
