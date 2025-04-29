import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Rocket,
  DollarSign,
  LayoutDashboard,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import BoQBuilder from "./BoQBuilder";
import PageLayout from "../components/PageLayout";

// Reusable Button
const Button = ({ children, onClick, to }) => {
  const base =
    "inline-block bg-[#154078] text-white px-6 py-3 rounded-full font-medium shadow-md hover:opacity-90 transition";
  return to ? (
    <Link to={to} className={base}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={base}>
      {children}
    </button>
  );
};

// Sample project data
const projects = [
  {
    title:
      "Zonal PE laying, Last mile Connectivity (LMC) and Direct Marketing Agency (DMA) works • Madhya Pradesh, India",
    desc: "Transforming the gas distribution landscape in Madhya Pradesh.",
    details:
      "Dheeradi managed the laying, testing, and commissioning of underground Polyethylene (PE) main and service pipelines network ranging from 20mm to 180mm Dia, with above-ground GI/Cu pipe installation and Direct Marketing Services for domestic, industrial and commercial consumers.",
    image: "src/images/projects/Morena.jpg",
  },
  {
    title: "Construction of Sewerage Network • Bhubaneshwar, India",
    desc: "Delivering high-performance infrastructure.",
    details:
      "Dheeradi planned and managed the development of a Sewerage Network and Pumping Stations in newly developed areas of Bhubaneswar City on an EPC contract including operation and maintenance.",
    image: "src/images/projects/watco.jpeg",
  },
];

const industries = [
  { name: "Construction", icon: LayoutDashboard },
  { name: "IT and Technology", icon: Rocket },
  { name: "Healthcare and Life Science", icon: DollarSign },
  { name: "Energy and Utilities", icon: LayoutDashboard },
  { name: "Manufacturing", icon: LayoutDashboard },
  { name: "Government and Public Sectors", icon: LayoutDashboard },
  { name: "Retail and Hospitality", icon: LayoutDashboard },
  { name: "Education", icon: LayoutDashboard },
  { name: "Transportation", icon: LayoutDashboard },
];

const services = [
  "Post Project Evaluation",
  "Planning and Strategy",
  "Project Monitoring and Control",
  "Risk Management",
  "Training and Workshop",
  "Resource Management",
];

// Contact Card Component
const contactMethods = [
  { icon: Phone, title: "Call Us", info: "+91 04892 38409" },
  { icon: Mail, title: "Email Us", info: "admin@dheeradiprojects.com" },
  { icon: MapPin, title: "Visit Us", info: "Bangalore, India" },
];

// Modal for project details
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <p className="text-gray-700 mb-6">{project.details}</p>
        <div className="text-right">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

// Project Card triggers modal
const ProjectCard = ({ project, onReadMore }) => (
  <div className="flex flex-col md:flex-row bg-[#f5f5f0] rounded-lg shadow-md overflow-hidden transition hover:-translate-y-1">
    <div className="w-full md:w-1/3 h-56 md:h-auto">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-gray-700 mb-4">{project.desc}</p>
      </div>
      <Button onClick={() => onReadMore(project)}>Read More</Button>
    </div>
  </div>
);

export default function Homepage() {
  const [modalProject, setModalProject] = useState(null);

  return (
    <PageLayout>
      {/* Hero with fade-in */}
      <section
        id="hero"
        className="relative flex items-center justify-center text-center h-screen"
        style={{
          backgroundImage: "url('/src/images/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          className="relative px-4 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Transforming Projects into Success Stories
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6">
            At Dheeradi, we empower organisations to achieve their strategic goals using proven methodologies and insights.
          </p>
          
        </motion.div>
      </section>

      {/* About Us */}
            {/* --- About Us --- */}
      <section id="about-us" className="pt-20 pb-20 bg-primary-light">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Dheeradi Projects</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Dheeradi Projects is a premier Project Management Consultancy with over 15 years of experience delivering large-scale infrastructure and technology programmes across India and beyond. Our multidisciplinary team of experts guides organisations from concept to completion, ensuring compliance, optimised costs, and sustainable practices.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            From feasibility analysis and risk management to resource planning and performance monitoring, we bring agility and strategic insight to every engagement. Our commitment to excellence has empowered clients in energy, transportation, government, and commercial sectors to achieve their most ambitious goals.
          </p>
        </div>
      </section>

      {/* Sectors & Vision */}
            {/* --- Sectors & Vision --- */}
      <section id="sector" className="py-16 bg-primary-light">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12">
          {/* Vision Card */}
          <div className="md:flex-1 lg:flex-2 bg-[#415a77] p-14 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-lg text-white/90 leading-normal">
              To be the trusted partner for organisations embarking on complex projects, by delivering innovative, sustainable and cost-effective project management solutions that foster growth and drive lasting impact.
            </p>
            <div className="mt-10">
              <Button>Learn more</Button>
            </div>
          </div>

          {/* Industries List */}
          <div className="md:flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Industries We Serve</h2>
            <div className="grid grid-cols-1 gap-6">
              {industries.map(({ name, icon: Icon }) => (
                <div key={name} className="flex items-center space-x-3">
                  <Icon className="text-[#154078]" />
                  <span className="font-medium text-gray-700">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
            {/* --- Projects Showcase --- */}
      <section id="projects" className="py-20 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Latest Projects</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                className="relative overflow-hidden rounded-lg shadow-lg group"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-200 mb-4">{project.desc}</p>
                  <Button onClick={() => setModalProject(project)}>Learn More</Button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button onClick={() => document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' })}>Discuss Your Project</Button>
          </div>
        </div>
      </section>

      {/* Get In Touch */}
      <section className="py-16 bg-primary-light">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#154078] mb-4">Get in Touch</h2>
          <p className="text-base text-gray-700 mb-8">
            Reach out to us about your next project!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactMethods.map(({ icon: Icon, title, info }) => (
              <div
                key={title}
                className="flex flex-col items-center bg-[#415a77] p-6 rounded-lg shadow hover:-translate-y-1 transition"
              >
                <Icon size={48} className="text-white mb-4" />
                <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                <p className="text-sm text-white">{info}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button to="/contact">Contact Us Now</Button>
          </div>
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
