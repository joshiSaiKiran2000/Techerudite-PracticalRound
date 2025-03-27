import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome</h2>
      <button onClick={() => navigate("/customer-register")} style={buttonStyle}>
        Customer Registration
      </button>
      <button onClick={() => navigate("/admin-register")} style={buttonStyle}>
        Admin Registration
      </button>
      <button onClick={() => navigate("/admin-login")} style={buttonStyle}>
        Admin Login
      </button>
    </div>
  );
};

const buttonStyle = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};

export default Home;
