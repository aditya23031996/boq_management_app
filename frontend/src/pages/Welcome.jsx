import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1>Welcome to Dheeradi Projects</h1>
        <button className="btn-primary" onClick={() => navigate("/builder")}>
          Create New BoQ
        </button>
      </div>
    </div>
  );
}

export default Welcome;
