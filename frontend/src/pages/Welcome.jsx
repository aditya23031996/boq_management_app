import React, { use } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    companyName: "",
    companyGST: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user", form);
      const data = await response.json();
      if (response.ok) {
        setMessage("Registration successful!");
      } else {
        setMessage(data.message || "Registration failed.");
      }
      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        companyName: "",
        companyGST: "",
      });
      
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  }


  const navigate = useNavigate();

  return (
    // <div className="welcome-container">
    //   <div className="welcome-box">
    //     <h1>Welcome to Dheeradi Projects</h1>
    //     <button className="btn-primary" onClick={() => navigate("/builder")}>
    //       Create New BoQ
    //     </button>
    //   </div>
    // </div>
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="organization"
          value={form.organization}
          onChange={handleChange}
          placeholder="Organization"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save User
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}

export default Welcome;
