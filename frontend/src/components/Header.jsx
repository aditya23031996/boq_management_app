import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (hash) => location.hash === hash;

  const navItems = ["About Us", "Services", "Sector", "Projects", "Contact Us"];

  return (
    <>
      <header className="fixed top-0 w-full bg-white z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* --- Logo --- */}
          <div className="flex items-center space-x-2">
            <img
              src="/images/Dheeradi-logo.png"
              alt="DA logo"
              className="h-8 object-contain"
            />
          </div>

          {/* --- Desktop Nav --- */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((t) => (
              <div key={t} className="relative group">
                <a
                  href={`#${t.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`text-gray-700 hover:text-black ${
                    isActive(`#${t.toLowerCase().replace(/\s+/g, "-")}`)
                      ? "font-semibold text-black"
                      : ""
                  }`}
                >
                  {t}
                </a>
                <span
                  className={`absolute bottom-[-2px] left-0 w-full h-[2px] bg-black transition-transform duration-300 ${
                    isActive(`#${t.toLowerCase().replace(/\s+/g, "-")}`)
                      ? "scale-x-100"
                      : "scale-x-0"
                  } group-hover:scale-x-100`}
                ></span>
              </div>
            ))}
            {/* --- Careers Button --- */}
            <a
              href="#careers"
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium hover:bg-gray-300 transition"
            >
              Careers
            </a>
            {/* --- BOQ Manager --- */}
            {/* <a
              href="#contact-us"
              className="bg-black text-white px-3 py-1 rounded-full font-medium hover:bg-gray-300 transition"
            >
              BoQ Manager
            </a> */}
          </nav>

          {/* --- Mobile Menu Toggle --- */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen((prev) => !prev)}>
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* --- Mobile Nav Menu --- */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <nav className="flex flex-col space-y-2 p-4">
              {navItems.map((t) => (
                <a
                  key={t}
                  href={`#${t.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-gray-700 hover:text-black ${
                    isActive(`#${t.toLowerCase().replace(/\s+/g, "-")}`)
                      ? "font-semibold text-black"
                      : ""
                  }`}
                >
                  {t}
                </a>
              ))}
              <a
                href="#careers"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium hover:bg-gray-300 transition"
              >
                Careers
              </a>
              <a
                href="#contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-black text-white px-3 py-1 rounded-full font-medium hover:bg-gray-300 transition"
              >
                BoQ Manager
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
