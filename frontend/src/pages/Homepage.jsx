// src/pages/Homepage.jsx
import { Link } from "react-router-dom";
import { Rocket, DollarSign, LayoutDashboard } from "lucide-react";
import BoQBuilder from "./BoQBuilder"; // or just link to /builder

export default function Homepage() {
  return (
    <div className="flex flex-col space-y-16">
      {/* --- Top Nav --- */}
      <header className="fixed top-0 w-full bg-white z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* --- Logo --- */}
          <div className="flex items-center space-x-2">
            <img src="/src/images/Dheeradi-logo.png" alt="DA logo" className="h-8 object-contain" />
            {/* <span className="font-bold text-lg text-[#154078]">Dheeradi Projects</span> */}
          </div>
          {/* --- Nav Links --- */}
          <nav className="space-x-6 text-gray-700">
            {["About Us","Services","Sector","Projects","Contact Us"].map((t) => (
              <a key={t} href={`#${t.toLowerCase().replace(/\s+/g,"-")}`} className="hover:text-[#154078]">
                {t}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center text-center h-[80vh]"
        style={{
          backgroundImage: `url('/src/images/background.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* content */}
        <div className="relative px-4 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-snug mb-4">
            Transforming Projects into Success Stories
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90">
            At Dheeradi Project Management Consultancy, we empower organisations to achieve their
            strategic goals using proven methodologies and industry-leading insights. Our teams turn
            complex challenges into clear, actionable plans ensuring every project is a success.
          </p>
        </div>
      </section>

      {/* --- What Are We --- */}
      <section id="about-us" className="pt-24 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">What Are We</h2>
          <p className="text-gray-600 leading-relaxed">
            At Dheeradi, we are a dedicated Project Management Consultancy committed to delivering
            exceptional results across all project phases. With a strong foundation in managing
            complex projects, we provide innovative solutions that ensure timely delivery,
            cost-effectiveness, and quality.
          </p>
        </div>
      </section>

      {/* --- Sectors & Vision --- */}
      <section id="sector" className="py-16 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">Tailored Sectors for Every Project</h3>
          <p className="text-gray-600">
            Our expertise lies in optimizing project workflows, minimizing delays, and maintaining
            budgetary control across Construction, IT, Healthcare, Energy, Government, Retail,
            Education and Transportation.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {[
              "Construction",
              "IT and Technology",
              "Healthcare and Life Science",
              "Energy and Utilities",
              "Manufacturing",
              "Government and Public Sectors",
              "Retail and Hospitality",
              "Education",
              "Transportation",
            ].map((i) => <li key={i}>{i}</li>)}
          </ul>
        </div>
        <div className="flex-1 bg-blue-200 p-8 rounded-lg shadow relative">
          <h3 className="text-2xl font-semibold text-white mb-4">Our Vision</h3>
          <p className="text-white/90 leading-relaxed">
            We aim to bring innovation, efficiency, and strategic expertise to every sector we serve.
            By delivering tailored solutions and ensuring seamless execution, we help industries
            achieve sustainable growth and long-term success.
          </p>
          <button className="mt-6 bg-white text-[#154078] px-4 py-2 rounded-full font-medium">
            Learn more
          </button>
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-blue-600 clip-triangle"></div>
        </div>
      </section>

      {/* --- Our Services --- */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Post Project Evaluation",
            "Planning and Strategy",
            "Project Monitoring and Control",
            "Risk Management",
            "Training and Workshop",
            "Resource Management",
          ].map((svc) => (
            <div
              key={svc}
              className="relative bg-cover bg-center h-56 rounded-lg overflow-hidden group"
              style={{ backgroundImage: `url('/services/${svc}.jpg')` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold">{svc}</h3>
                <button className="mt-2 bg-white text-[#154078] px-3 py-1 rounded-full text-sm">
                  Learn more
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Projects Showcase --- */}
      <section id="projects" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Projects</h2>
          <div className="space-y-8">
            {[
              {
                title: "Residential Township Development • Bangalore, India",
                desc: "Development of a large-scale residential township with modern amenities and green spaces.",
              },
              {
                title: "Data Center Infrastructure • Hyderabad, India",
                desc: "Delivering high-performance IT infrastructure and Tier III data center setup.",
              },
              {
                title: "Residential Complex Renovation • Pune, India",
                desc: "Revitalising a 10-building complex, modernising interiors and enhancing common areas.",
              },
            ].map((p) => (
              <div key={p.title} className="flex flex-col md:flex-row bg-white rounded-lg shadow overflow-hidden">
                <div className="h-40 md:h-auto md:w-48 bg-gray-200" />
                <div className="p-6 flex-1">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="mt-2 text-gray-600">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Get In Touch --- */}
      <section id="contact-us" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8">We’d love to hear from you about your next project.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📞</span>
              <span className="text-lg font-medium">+91 04892 38409</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">✉️</span>
              <span className="text-lg font-medium">contact@dheeradi.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- BoQ Manager CTA / Embed --- */}
      <section id="boq-manager" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold text-[#154078]">BoQ Management App</h2>
          <p className="text-gray-700">
            Upload your Bill of Quantities, track progress, and generate milestone-based bills—all in one place.
          </p>
          <Link
            to="/builder"
            className="inline-block bg-[#154078] text-white font-semibold px-8 py-3 rounded-md hover:bg-[#12345a] transition"
          >
            Launch BoQ Manager
          </Link>

          {/* ––– If you prefer embedding directly, swap the button for: ––– */}
          {/* <div className="mt-12 bg-white rounded-lg shadow p-6">
               <BoQBuilder />
             </div> */}
        </div>
      </section>
    </div>
  );
}
