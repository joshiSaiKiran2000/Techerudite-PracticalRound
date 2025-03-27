import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import NotFound from "./NotFound";
import EmailVerification from "./EmailVerification";
import AdminRegister from "./AdminRegister";
import CustomerRegister from "./CustomerRegister";
import Home from "./Home";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-register" element={<CustomerRegister />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/verify" element={<EmailVerification />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
