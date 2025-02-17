// VerificationPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VerificationPage.css';

const VerificationPage = () => {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // For demonstration, assume the email is stored in localStorage after login.
  // (In a real-world scenario, you might use a global state management solution.)
  const email = localStorage.getItem('email'); // Ensure that after login you store the email

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/verify-2fa', {
        email,
        code,
      });
      // If verification is successful, redirect to the main app page (Dashboard)
      navigate('/dashboard');
    } catch (error) {
      console.error('Verification failed:', error.response ? error.response.data : error.message);
      setErrorMessage(error.response?.data?.error || 'Verification failed. Please try again.');
    }
  };

  return (
    <div className="verification-container">
      <div className="verification-card">
        <h2>Enter Verification Code</h2>
        <p>Please enter the 6-digit code sent to your email.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength="6"
            required
            className="verification-input"
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="verify-button">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default VerificationPage;
