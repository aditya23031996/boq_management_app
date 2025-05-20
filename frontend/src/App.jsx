import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Homepage from "./pages/Dheeradi_Website/Homepage/Homepage";
import Login from "./pages/Boq_Manager/Login/Login";
import Register from "./pages/Boq_Manager/Register/Register";
import Dashboard from "./pages/Boq_Manager/Dashboard/Dashboard";
import Projects from "./pages/Boq_Manager/Projects/Projects";
import BOQ from "./pages/Boq_Manager/BOQ/BOQ";

function App() {
  return (
    <BrowserRouter>
      {/* ✅ Add Toaster at the top level */}
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/boq" element={<BOQ />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
