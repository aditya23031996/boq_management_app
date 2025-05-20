import React from "react";

const features = [
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-300">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Auto-Save Progress",
    desc: "Never lose your work. All changes are saved in real-time!"
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-300">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
      </svg>
    ),
    title: "Smart Suggestions",
    desc: "Get AI-powered tips to optimize your BOQ entries."
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-300">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V7a4 4 0 10-8 0v3m12 0H5" />
      </svg>
    ),
    title: "Team Collaboration",
    desc: "Invite your team and work together in real-time."
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-pink-300">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v9" />
      </svg>
    ),
    title: "Instant Reports",
    desc: "Generate beautiful reports with a single click."
  },
];
const funFacts = [
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-cyan-300">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
      </svg>
    ),
    text: "BOQ Manager users save an average of 5 hours per week!"
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-300">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v9" />
      </svg>
    ),
    text: "You can export your BOQ as PDF, Excel, or CSV in one click."
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-orange-300">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87" />
      </svg>
    ),
    text: "Our platform is trusted by 100+ construction companies."
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-lime-300">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" />
      </svg>
    ),
    text: "Real-time notifications keep your team in sync."
  },
];
const randomFeature = features[Math.floor(Math.random() * features.length)];
const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left: Form Card */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6">
        {/* Glassmorphic Card */}
        <div className="w-full max-w-md bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-gray-200">
          {children}
        </div>
        {/* Footer */}
        <div className="mt-8 text-xs text-gray-400 text-center">
          &copy; {new Date().getFullYear()} BOQ Manager. All rights reserved.
        </div>
      </div>
      {/* Right: Illustration/Tagline + Feature + Fun Fact */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-[#154078] to-[#1e3a8a] text-white p-12 relative overflow-hidden">
        {/* Animated SVG Blob Background */}
        <svg className="absolute -top-24 -left-24 w-[36rem] h-[36rem] opacity-30 animate-blob-move" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(300,300)">
            <path d="M120,-180C160,-140,200,-120,210,-80C220,-40,200,20,170,60C140,100,100,120,60,150C20,180,-20,220,-60,210C-100,200,-140,140,-180,100C-220,60,-260,40,-250,0C-240,-40,-180,-80,-140,-120C-100,-160,-80,-200,-40,-220C0,-240,40,-220,80,-200C120,-180,120,-180,120,-180Z" fill="#38bdf8" />
          </g>
        </svg>
        <div className="relative z-10 flex flex-col items-center animate-fade-in">
          {/* Large Icon */}
          <div className="mb-8 animate-bounce-slow">
            <svg width="72" height="72" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white/80 drop-shadow-lg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V7a4.5 4.5 0 10-9 0v3.5M5.25 10.5h13.5M6.75 10.5v7.25A2.25 2.25 0 009 20h6a2.25 2.25 0 002.25-2.25V10.5" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold mb-2 drop-shadow">Welcome Back!</h2>
          <p className="mb-6 text-lg opacity-90 font-medium">Your professional BOQ management platform</p>
          <div className="italic opacity-80 text-sm border-l-4 border-green-300 pl-4 max-w-xs mb-8">“Efficiency, security, and clarity for every project.”</div>
          {/* Glassmorphic Feature Card */}
          <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-lg border border-white/30 px-6 py-5 flex flex-col items-center gap-2 relative mb-4 w-full max-w-xs transition-transform duration-300 hover:scale-105">
            <div className="absolute top-2 right-2">
              <span className="inline-block w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            </div>
            <div className="mb-2">{randomFeature.icon}</div>
            <div className="font-bold text-lg text-white/90">{randomFeature.title}</div>
            <div className="text-white/80 text-sm text-center">{randomFeature.desc}</div>
          </div>
          {/* Fun Fact */}
          <div className="flex items-center gap-2 bg-cyan-900/40 rounded-lg px-4 py-2 mt-2 mb-4 shadow border border-cyan-400/30">
            <span>{randomFact.icon}</span>
            <span className="text-cyan-100 text-sm font-medium">Did you know? {randomFact.text}</span>
          </div>
          {/* Try Demo Button */}
          <button className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-green-400 via-blue-400 to-pink-400 text-white font-bold shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-white/60">Try Demo</button>
          {/* Animated Gradient Bar */}
          <div className="w-32 h-2 rounded-full bg-gradient-to-r from-green-300 via-blue-400 to-pink-400 animate-gradient-x mt-4 opacity-80" />
        </div>
        {/* Animations */}
        <style>{`
          @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          .animate-bounce-slow { animation: bounce-slow 2.5s infinite; }
          @keyframes gradient-x { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
          .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s linear infinite; }
          @keyframes fade-in { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none;} }
          .animate-fade-in { animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both; }
          @keyframes blob-move { 0%,100% { transform: scale(1) translate(0,0);} 50% { transform: scale(1.1) translate(40px,20px);} }
          .animate-blob-move { animation: blob-move 8s ease-in-out infinite alternate; }
        `}</style>
      </div>
    </div>
  );
} 