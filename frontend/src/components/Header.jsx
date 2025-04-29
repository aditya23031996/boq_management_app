import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const isActive = (hash) => location.hash === hash;

  return (
    <header className="fixed top-0 w-full bg-white z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* --- Logo --- */}
        <div className="flex items-center space-x-2">
          <img
            src="/src/images/Dheeradi-logo.png"
            alt="DA logo"
            className="h-8 object-contain"
          />
        </div>

        {/* --- Nav Links --- */}
        <nav className="flex items-center space-x-6">
          {["About Us", "Services", "Sector", "Projects", "Contact Us"].map(
            (t) => (
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
            )
          )}

          {/* --- Careers Button --- */}
          <a
            href="#careers"
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium hover:bg-gray-300 transition"
          >
            Careers
          </a>

          {/* --- BOQ Manager --- */}
          <a
            href="#contact-us"
            className="bg-black text-white px-3 py-1 rounded-full font-medium hover:bg-gray-300 transition"
          >
            BoQ Manager
          </a>
        </nav>
      </div>
    </header>
  );
}
