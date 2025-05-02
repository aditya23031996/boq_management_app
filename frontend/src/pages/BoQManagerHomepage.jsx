import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Download,
  Users,
  GitBranch,
  CreditCard,
  CheckSquare,
  BarChart3,
  Bell,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import BoQBuilder from "./BoQBuilder";
import PageLayout from "../components/PageLayout";

// Reusable Button
const Button = ({ children, onClick, to, className = "" }) => {
  const base =
    "inline-block bg-[#154078] hover:bg-[#12345a] text-white px-6 py-3 rounded-full font-medium shadow-md transition";
  return to ? (
    <Link to={to} className={`${base} ${className}`}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={`${base} ${className}`}>
      {children}
    </button>
  );
};

export default function BoQHomepage() {
  const [showBuilder, setShowBuilder] = useState(false);

  return (
    <PageLayout>
      {/* Hero */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center text-center h-screen p-6 bg-gradient-to-br from-white to-[#e6eaf1]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            BoQ Manager
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-6">
            From itemized cost breakdowns to real-time dashboards, manage every
            aspect of your Bills of Quantities in one place.
          </p>
          <Button onClick={() => setShowBuilder(true)}>
            Try the Builder
          </Button>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Features</h2>
          <p className="text-gray-600 mt-2">
            All the tools you need for drafting, billing, tracking, and analyzing your BoQs.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: FileText, title: "Intuitive Editor", desc: "Drag-and-drop items, inline editing, live totals." },
            { icon: Download, title: "PDF/Excel Export", desc: "One-click export for polished, shareable reports." },
            { icon: Users, title: "Collaboration", desc: "Real-time multi-user editing with sync." },
            { icon: GitBranch, title: "Version Control", desc: "Track changes, restore previous snapshots." },
            { icon: CreditCard, title: "Client Billing", desc: "Generate itemized invoices & bills." },
            { icon: CheckSquare, title: "Progress Tracking", desc: "Log completed quantities per item." },
            { icon: BarChart3, title: "BoQ Dashboard", desc: "Overview of all BoQs, budgets, KPIs." },
            { icon: Bell, title: "Alerts & Notifications", desc: "Notifications on overruns and deadlines." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center space-y-3">
              <Icon size={48} className="text-[#154078]" />
              <h3 className="font-semibold text-gray-800">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="dashboard-preview" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Live Dashboard Preview
          </h2>
          <div className="border rounded-lg overflow-hidden shadow-lg">
            {/* Replace with your real chart/component */}
            <img
              src="/images/dashboard.webp"
              alt="Dashboard preview"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Builder Preview */}
      {showBuilder && (
        <section id="builder" className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                BoQ Builder
              </h2>
              <Button onClick={() => setShowBuilder(false)}>Close</Button>
            </div>
            <div className="border rounded-lg shadow-inner">
              <BoQBuilder />
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      {/* <section id="contact" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Get in Touch
          </h2>
          <p className="text-gray-600">
            Questions? Bugs? Feature requests? We'd love to hear from you.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center space-y-2">
            <Phone size={36} className="text-[#154078]" />
            <h3 className="font-semibold text-gray-800">Phone</h3>
            <p className="text-gray-600">+91 8982476890</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Mail size={36} className="text-[#154078]" />
            <h3 className="font-semibold text-gray-800">Email</h3>
            <p className="text-gray-600">support@boqmanager.app</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <MapPin size={36} className="text-[#154078]" />
            <h3 className="font-semibold text-gray-800">Location</h3>
            <p className="text-gray-600">Bangalore, India</p>
          </div>
        </div>
      </section> */}
    </PageLayout>
  );
}
