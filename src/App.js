import logo from './logo.svg';
import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import VerificationPage from './components/VerificationPage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './App.css';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/dashboard" element={<dashboard />} />
        <Route path="/threat-detection" element={<ThreatAlerts />} />
      </Routes> </BrowserRouter>
  );
}

export default App;
