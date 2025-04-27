import PageLayout from "../components/PageLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      loginUser(email, password);
      navigate("/builder");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-160px)] bg-gray-50 px-4">
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-center text-[#154078] mb-6">
            Log in
          </h1>

          {/* Error message */}
          {error && (
            <div className="text-red-500 text-center mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* Email Input */}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#154078] outline-none"
            />

            {/* Password Input */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#154078] outline-none"
            />

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#154078] text-white font-semibold py-3 rounded-md hover:bg-[#12345a] transition"
            >
              Log in
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-sm text-[#154078] hover:underline"
            >
              Forgotten password?
            </Link>
          </div>

          {/* Divider */}
          <div className="border-t my-6"></div>

          {/* Create New Account Button */}
          <div className="flex justify-center">
            <Link
              to="/register"
              className="bg-green-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-green-600 transition"
            >
              Create new account
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
