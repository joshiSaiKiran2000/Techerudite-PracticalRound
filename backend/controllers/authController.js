const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: "joshisaikiran2000@gmail.com", pass: "mtnjcqldmdznqnku" },
});

const register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ message: "User is already registered" });
      } else {
        // Resend verification email
        const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
        const verificationLink = `http://localhost:5000/api/auth/verify?token=${token}`;

        await transporter.sendMail({
          from: "joshisaikiran2000@gmail.com",
          to: email,
          subject: "Verify Your Email",
          text: `Click here to verify your email: ${verificationLink}`,
        });

        return res.status(200).json({
          message: "User is not verified. Verification email resent.",
        });
      }
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      isVerified: false,
    });

    await user.save();

    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
    const verificationLink = `http://localhost:5000/api/auth/verify?token=${token}`;

    await transporter.sendMail({
      from: "joshisaikiran2000@gmail.com",
      to: email,
      subject: "Verify Your Email",
      text: `Click here to verify your email: ${verificationLink}`,
    });

    res.status(201).json({
      message: "Registered successfully. Check email for verification.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, "secret");
    await User.updateOne({ email: decoded.email }, { isVerified: true });
    res.send("Email verified successfully!");
  } catch (error) {
    res.status(400).send("Invalid or expired token");
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });
  if (user.role !== "admin")
    return res
      .status(403)
      .json({ message: "You are not allowed to login from here" });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid credentials" });
  res.json({
    message: "Login successful",
    token: jwt.sign({ email: user.email, role: user.role }, "secret"),
  });
};

module.exports = { register, verifyEmail, adminLogin };
