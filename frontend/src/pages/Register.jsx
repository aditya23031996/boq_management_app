import PageLayout from "../components/PageLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/auth";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const companyName = e.target.companyName.value;
    const companyGST = e.target.companyGST.value;

    try {
      registerUser({ firstName, lastName, email, password, companyName, companyGST });
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-160px)] bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-[#154078] mb-6">
            Create Account
          </h1>

          {error && (
            <div className="text-red-500 text-center mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#154078] outline-none"
            />

            {/* Last Name */}
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#154078] outline-none"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#154078] outline-none"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#154078] outline-none"
            />

            {/* Company Name */}
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#154078] outline-none"
            />

            {/* Company GST */}
            <input
              type="text"
              name="companyGST"
              placeholder="Company GST"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#154078] outline-none"
            />

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-[#154078] text-white font-semibold py-3 rounded-md hover:bg-[#12345a] transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#154078] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
