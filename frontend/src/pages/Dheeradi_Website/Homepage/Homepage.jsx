import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Hammer,
  Rocket,
  // FirstAidKit, // use FirstAidKit instead of FirstAid
  Microscope,
  Zap,
  Settings,
  Building,
  ShoppingBag,
  BookOpen,
  Truck,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import PageLayout from "../../../components/PageLayout";

// Button
const Button = ({ children, to, onClick, className = "" }) =>
  to ? (
    <Link to={to} className={`bg-[#003049] text-white rounded-full px-6 py-3 font-semibold shadow hover:bg-[#002235] transition ${className}`}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={`bg-[#003049] text-white rounded-full px-6 py-3 font-semibold shadow hover:bg-[#002235] transition ${className}`}>
      {children}
    </button>
  );

const industries = [
  { name: "Construction", icon: Hammer },
  { name: "IT and Technology", icon: Rocket },
  {
    name: "Healthcare & Life Science",
    icon: Building, // updated icon here
    subIcon: Microscope,
  },
  { name: "Energy & Utilities", icon: Zap },
  { name: "Manufacturing", icon: Settings },
  { name: "Government & Public Sector", icon: Building },
  { name: "Retail & Hospitality", icon: ShoppingBag },
  { name: "Education", icon: BookOpen },
  { name: "Transportation", icon: Truck },
];

// Contact Card Component
const contactMethods = [
  { icon: Phone, title: "Call Us", info: "+91 8982476890" },
  { icon: Mail, title: "Email Us", info: "admin@dheeradiprojects.com" },
  { icon: MapPin, title: "Visit Us", info: "New Delhi, India" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

// Modal for project details
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative">
        <button className="absolute top-4 right-6 text-xl" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold mb-3">{project.title}</h2>
        <img src={project.image} alt={project.title} className="rounded mb-4 h-48 w-full object-cover" />
        <p className="text-gray-700">{project.details}</p>
      </div>
    </div>
  );
};

export default function Homepage() {
  const [modalProject, setModalProject] = useState(null);

  return (
    <PageLayout>
      {/* HERO */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center text-center min-h-screen w-full px-4 py-0 bg-[#003049] overflow-hidden"
        style={{
          backgroundImage: "url('/images/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(120deg, #003049cc 60%, #003049cc 100%)",
            zIndex: 1,
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center min-h-screen justify-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white text-xs sm:text-sm px-4 py-1 rounded-full mb-6 tracking-widest uppercase font-semibold shadow">
            Project Management Consultancy
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow">
            Transforming Projects<br className="hidden sm:block" /> into Success Stories
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 font-medium">
            Dheeradi empowers organisations to achieve their strategic goals with proven methodologies, innovation, and a commitment to excellence.
          </p>
          <Button
            to="#contact-us"
            className="!bg-white !text-[#003049] hover:!bg-[#e0e6ed] font-bold shadow-lg px-8 py-3 text-lg transition"
          >
            Get in Touch
          </Button>
        </div>
      </section>

      {/* ABOUT */}
      <motion.section
        id="about-us"
        className="relative flex items-center justify-center min-h-screen w-full px-4 py-0 bg-[#f7fafd] overflow-hidden"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 70% 30%, #00304922 0%, transparent 70%)",
            zIndex: 1,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#003049] mb-6">
            Who We Are
          </h2>
          <p className="text-xl sm:text-2xl text-[#003049] mb-6 font-medium">
            <b className="text-[#003049]">Dheeradi Projects</b> is your specialist consultancy for strategic infrastructure and digital programs.
          </p>
          <p className="text-lg sm:text-xl text-[#003049]/80 mb-4">
            With <span className="font-bold text-[#003049]">10+ years of experience</span>, we deliver measurable results, cost optimisation, and sustainable impact for organisations across India and beyond.
          </p>
          <p className="text-base sm:text-lg text-[#003049]/60 mb-8">
            From risk and compliance to resource planning and execution, our experts guide you from vision to victory—every step of the way. We combine industry-leading methodologies, innovation, and a commitment to excellence to ensure your projects succeed.
          </p>
          <Button
            to="#contact-us"
            className="!bg-white !text-[#003049] hover:!bg-[#e0e6ed] font-bold shadow-lg px-8 py-3 text-lg transition"
          >
            Start Your Project
          </Button>
        </div>
      </motion.section>

      {/* Sectors & Vision */}
      <section
        id="sector"
        className="relative flex items-center justify-center min-h-[60vh] w-full px-4 py-0 bg-[#f7fafd] overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 20% 80%, #00304918 0%, transparent 70%)",
            zIndex: 1,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-8 items-stretch justify-center">
          {/* Vision Card */}
          <div className="flex-1 bg-gradient-to-br from-[#003049] to-[#003049] p-10 rounded-2xl shadow-lg flex flex-col justify-center border border-[#e0e6ed] transition hover:shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Our Vision
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
              To be the trusted partner for organisations embarking on complex projects, by delivering <span className="text-[#ffd700] font-semibold">innovative</span>, <span className="text-[#ffd700] font-semibold">sustainable</span> and <span className="text-[#ffd700] font-semibold">cost-effective</span> project management solutions that foster growth and drive lasting impact.
            </p>
            <Button
            to="#contact-us"
            className="!bg-white !text-[#003049] hover:!bg-[#e0e6ed] font-bold shadow-lg px-8 py-3 text-lg transition self-start"
          >
            Learn more
          </Button>
          </div>
          {/* Industries List */}
          <div className="flex-1 bg-white p-10 rounded-2xl shadow-lg flex flex-col justify-center border border-[#e0e6ed]">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#003049] mb-4 tracking-tight">
              Industries We Serve
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {industries.map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  className="flex flex-col items-center bg-[#003049]/5 rounded-xl p-5 hover:bg-[#003049]/10 transition shadow group"
                >
                  <Icon className="text-[#003049] group-hover:text-[#003049] w-10 h-10 mb-2 transition" />
                  <span className="text-base font-semibold text-[#003049] text-center group-hover:text-[#003049] transition">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section id="services" className="py-16 bg-[#f7fafd]">
        <div className="max-w-6xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold text-[#003049]">Our Services</h2>
          <p className="text-base text-[#003049] mt-4">
            Explore the wide range of services we offer to help you achieve your project goals.
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
              className="relative bg-cover bg-center h-72 w-full rounded-lg overflow-hidden group shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 border border-[#e0e6ed]"
              style={{ backgroundImage: `url('/images/services/${svc}.png')` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#003049cc] group-hover:to-[#003049cc] transition duration-300" />
              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-end items-center text-center text-white z-10 px-4 pb-4">
                <h3 className="text-lg font-bold text-white">{svc}</h3>
                <Button
                  to="#contact-us"
                  className="mt-4 !bg-white !text-[#003049] hover:!bg-[#e0e6ed] font-bold shadow-lg px-6 py-2 text-base transition"
                >
                  Learn more
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Get In Touch */}
      <section id="contact-us" className="py-20 bg-[#003049] px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-10">
            Let’s start a conversation about your next project. Our team is ready to help you succeed.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {contactMethods.map(({ icon: Icon, title, info }) => (
              <div
                key={title}
                className="flex flex-col items-center bg-white/10 border border-white/20 p-6 rounded-xl shadow hover:bg-white/20 transition"
              >
                <Icon size={40} className="text-[#003049] mb-3" />
                <h3 className="text-base font-bold text-white mb-1">{title}</h3>
                <p className="text-sm text-white/90">{info}</p>
              </div>
            ))}
          </div>
          <Button
            to="/contact"
            className="!bg-white !text-[#003049] hover:!bg-[#e0e6ed] font-bold shadow-lg px-10 py-4 text-lg transition"
          >
            Contact Us Now
          </Button>
        </div>
      </section>

      {/* Modal */}
      {modalProject && (
        <ProjectModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </PageLayout>
  );
}
