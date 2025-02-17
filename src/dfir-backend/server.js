// Import required modules
const express = require('express');
const axios = require('axios'); // Used to make HTTP requests (for CAPTCHA verification if needed)
const nodemailer = require('nodemailer');
const cors = require('cors');//importing CORS
require('dotenv').config(); // Load environment variables from .env

// Create an Express application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));  

const PORT = process.env.PORT || 3001;

// Configure Nodemailer using Gmail's SMTP service
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use TLS, not SSL
  auth: {
    user: process.env.EMAIL_USER,  // Your Gmail address from .env
    pass: process.env.EMAIL_PASS   // Your App Password from .env
  },
  // Optionally, you can include TLS options if necessary:
  tls: {
    // do not fail on invalid certs; generally not recommended in production,
    // but sometimes useful for testing
    rejectUnauthorized: false
  }
});



// Function to send email for 2FA code
function sendEmail(to, subject, message) {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Corrected from ProcessingInstruction.env.EMAIL_USER
    to,
    subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

// In-memory demo user database
const users = {
  "dion9j@gmail.com": { password: "Dionel133" } // Demo user with email and password
};

// Keep track of failed login attempts
const failedAttempts = {};

// To store 2FA codes for each user
const twoFACodes = {}; // Changed to "twoFACodes" for consistency

// Login endpoint (without reCAPTCHA for now)
app.post('/api/login', async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  // Email verification: Check if the user exists
  if (!users[email]) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // Check if the provided password matches the stored password
  if (users[email].password !== password) {
    // Increase the failed login attempt counter
    failedAttempts[email] = (failedAttempts[email] || 0) + 1;
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // Reset failed attempts on successful password verification
  failedAttempts[email] = 0;

  // Generate a random 6-digit 2FA code
  const twoFACode = Math.floor(100000 + Math.random() * 900000).toString();
  twoFACodes[email] = twoFACode;

  // Send the 2FA code to the user's email
  sendEmail(email, "Your 2FA Code", `Your two-factor authentication code is: ${twoFACode}`);

  // Respond to the client that a 2FA code has been sent
  return res.json({ message: "2FA code sent to your email. Please verify to complete login." });
});

// 2FA verification endpoint
app.post('/api/verify-2fa', (req, res) => {
  const { email, code } = req.body;

  // Check if the provided code matches the generated 2FA code
  if (twoFACodes[email] && twoFACodes[email] === code) {
    // On successful verification, remove the 2FA code from our store
    delete twoFACodes[email];

    // In a real application, you would now create a session or generate a JWT token.
    return res.json({ message: "Login successful! Session created." });
  } else {
    return res.status(400).json({ error: "Invalid Verification code" });
  }
});

// Start the server
app.listen(PORT, () => {  
  console.log(`Server is running on port ${PORT}`);
});
