import React, { useState } from "react";
import axios from "axios";

const AdminRegister = () => {
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
        role: "admin",
      });
      alert("Registration successful. Check email for verification.");
      setFormData({ firstName: "", lastName: "", email: "", password: "" }); // Clear form
    } catch (error) {
      alert("Error registering user");
    }
    setLoading(false); // Stop loading
  };

  return (
    <div style={styles.container}>
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName} // Controlled input
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName} // Controlled input
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email} // Controlled input
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password} // Controlled input
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Registering..." : "Register as Admin"}
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

export default AdminRegister;
