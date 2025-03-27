import React, { useState } from "react";
import axios from "axios";

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        ...formData,
        role: "customer",
      });
      alert("Registration successful. Check email for verification.");

      // Reset form fields after successful registration
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      let msg = "An unexpected error occurred. Please try again.";

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        msg = error.response.data.message;
      }

      alert(msg);
    }
    setLoading(false); // Stop loading
  };

  return (
    <div style={styles.container}>
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Registering..." : "Register as Customer"}
        </button>
      </form>

      {loading && <p>Sending verification email...</p>}
    </div>
  );
};

// Basic Styles
const styles = {
  container: { textAlign: "center", marginTop: "20px" },
  form: { display: "flex", flexDirection: "column", alignItems: "center" },
  input: { margin: "5px", padding: "10px", width: "250px" },
  button: { padding: "10px", cursor: "pointer", marginTop: "10px" },
};

export default CustomerRegister;
