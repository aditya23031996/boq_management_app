import AuthLayout from "../components2/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../../services/auth";
import { toast } from 'react-hot-toast';
import { useAuth } from "../../../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { token, user } = await loginUser(email, password);
      login(token, user);
      toast.success('Login successful! 🎉');
      navigate(`/${user.user_id}/dashboard`);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Login failed! ❌');
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-[#154078] mb-2 tracking-tight">Sign in to your account</h1>
        <p className="text-gray-500 text-base">Welcome back! Please enter your credentials.</p>
      </div>
      {error && (
        <div className="text-red-500 text-center mb-4 text-sm">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="w-full space-y-5">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </span>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            className="w-full border border-gray-300 rounded-md p-3 pl-10 focus:ring-2 focus:ring-[#154078] focus:border-[#154078] outline-none transition"
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
            className="w-full border border-gray-300 rounded-md p-3 pl-10 focus:ring-2 focus:ring-[#154078] focus:border-[#154078] outline-none transition"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#154078] to-[#1e3a8a] text-white font-semibold py-3 rounded-md shadow hover:from-[#1e3a8a] hover:to-[#154078] transition"
        >
          Log in
        </button>
      </form>
      <div className="flex justify-between items-center mt-4">
        <Link to="/forgot-password" className="text-sm text-[#154078] hover:underline">
          Forgotten password?
        </Link>
      </div>
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-200" />
        <span className="mx-4 text-gray-400 text-xs">or</span>
        <div className="flex-grow border-t border-gray-200" />
      </div>
      <div className="flex justify-center">
        <Link
          to="/register"
          className="bg-green-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-green-600 transition shadow"
        >
          Create new account
        </Link>
      </div>
    </AuthLayout>
  );
}
