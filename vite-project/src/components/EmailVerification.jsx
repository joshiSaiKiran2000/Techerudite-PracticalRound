import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get("token");
        await axios.get(`http://localhost:5000/api/auth/verify?token=${token}`);
        setMessage("Email verified successfully! You can now log in.");
      } catch (error) {
        setMessage("Invalid or expired verification link.");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return <div>{message}</div>;
};

export default EmailVerification;
