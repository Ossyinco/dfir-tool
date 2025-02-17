import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
  // State variables for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission (page reload)
    
    try {
      // Make a POST request to your login API endpoint
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password,
        // captchaToken: 'dummy-token' // Remove or replace when integrating reCAPTCHA
      });
      console.log("Success");
      //storing email in local storage for later use
      localStorage.setItem('email',email);
      //navigate to verificationPage
      navigate('/verify');
      
      // Optionally, move on to a 2FA verification component/page
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert(error.response?.data.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        {/* Username/Email Field */}
        <div className="form-group">
          <label htmlFor="email">Username/Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        
        {/* Password Field with Show/Hide */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <button 
              type="button" 
              className="toggle-password" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        
        {/* Remember Me Checkbox */}
        <div className="form-group remember-me">
          <input 
            type="checkbox" 
            id="rememberMe" 
            name="rememberMe" 
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        
        {/* Login Button */}
        <button type="submit" className="login-button">Login</button>
        
        {/* Forgot Password Link */}
        <div className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
