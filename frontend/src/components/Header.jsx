import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Left side: Logo + Company Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/DA-logo.png" // <- put your DA logo here inside public folder
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-[#154078] font-bold text-xl">
            Dheeradi Projects
          </span>
        </Link>

        {/* Right side: Navigation links */}
        <nav className="flex items-center space-x-8">
          <Link
            to="/"
            className={`text-sm font-semibold ${
              isActive("/") ? "text-[#154078]" : "text-gray-700 hover:text-[#154078]"
            }`}
          >
            Home
          </Link>
          <Link
            to="/builder"
            className={`text-sm font-semibold ${
              isActive("/builder") ? "text-[#154078]" : "text-gray-700 hover:text-[#154078]"
            }`}
          >
            Builder
          </Link>
          <Link
            to="/login"
            className={`text-sm font-semibold ${
              isActive("/login") ? "text-[#154078]" : "text-gray-700 hover:text-[#154078]"
            }`}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
