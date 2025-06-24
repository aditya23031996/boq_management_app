import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Dheeradi Projects</h3>
          <p className="text-sm">
            Empowering your strategic projects with innovative management solutions since 2014.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-md font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/projects" className="hover:text-white">Projects</Link></li>
            <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-md font-semibold text-white mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-md font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Phone: +91 8982476890</li>
            <li>Email: <a href="mailto:admin@dheeradiprojects.com" className="hover:text-white">admin@dheeradiprojects.com</a></li>
            <li>Location: New Delhi, India</li>
          </ul>
          <div className="mt-4 flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook size={20} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter size={20} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={20} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Dheeradi Projects Private Limited</span>. All rights reserved.
      </div>
    </footer>
  );
}
