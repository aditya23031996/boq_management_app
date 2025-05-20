import AuthLayout from "../components2/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../../services/auth";
import { toast } from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const companyName = e.target.companyName.value;
    const companyGST = e.target.companyGST.value;

    try {
      await registerUser({ firstName, lastName, email, password, companyName, companyGST });
      toast.success('Registration successful! Please log in.');
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-[#154078] mb-2 tracking-tight">Create your account</h1>
        <p className="text-gray-500 text-base">Sign up to get started with BOQ Manager.</p>
      </div>
      {error && (
        <div className="text-red-500 text-center mb-4 text-sm">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </span>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 pl-10 focus:ring-2 focus:ring-[#154078] focus:border-[#154078] outline-none transition"
          />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </span>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 pl-10 focus:ring-2 focus:ring-[#154078] focus:border-[#154078] outline-none transition"
          />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </span>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 pl-10 focus:ring-2 focus:ring-[#154078] focus:border-[#154078] outline-none transition"
          />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 pl-10 focus:ring-2 focus:ring-[#154078] focus:border-[#154078] outline-none transition"
          />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6" /></svg>
          </span>
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 pl-10 focus:ring-2 focus:ring-[#154078] focus:border-[#154078] outline-none transition"
          />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </span>
          <input
            type="text"
            name="companyGST"
            placeholder="Company GST"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 pl-10 focus:ring-2 focus:ring-[#154078] focus:border-[#154078] outline-none transition"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#154078] to-[#1e3a8a] text-white font-semibold py-3 rounded-md shadow hover:from-[#1e3a8a] hover:to-[#154078] transition"
        >
          Register
        </button>
      </form>
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-200" />
        <span className="mx-4 text-gray-400 text-xs">or</span>
        <div className="flex-grow border-t border-gray-200" />
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        Already have an account?{' '}
        <Link to="/login" className="text-[#154078] hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
