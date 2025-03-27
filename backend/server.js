const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db"); // Use require instead of import

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
