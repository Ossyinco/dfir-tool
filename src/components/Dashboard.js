// Dashboard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBell, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import './Dashboard.css';
import logo from './logo.png'
import ThreatAlerts from './ThreatAlerts';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard'); // default section
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setMenuOpen(false); // Optionally close the menu on selection
  };


  return (
    <div className="dashboard-container">
      {/* Wrap header and dropdown in a relatively positioned container */}
      <div className="header-container">
      <header className="dashboard-header">
  <div className="header-left">
    <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Navigation">
      {menuOpen ? <FaTimes /> : <FaBars />}
    </button>
    <div className="branding">
      <img src={logo} alt="Tool Logo" className="logo" />
      <span>EvidenceX</span>
    </div>
  </div>
  
  <div className="header-center">
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input type="text" placeholder="Search evidence, logs, alerts..." aria-label="Search" />
    </div>
    <div className="global-filters">
      <input type="date" aria-label="Start Date" />
      <input type="date" aria-label="End Date" />
    </div>
  </div>
  
  <div className="header-right">
    <div className="notifications" aria-label="Notifications">
      <FaBell className="icon" />
      <span className="badge">3</span>
    </div>
    <div className="user-profile" aria-label="User Profile">
      <FaUserCircle className="icon" />
      <span className="user-name">John Doe</span>
    </div>
  </div>
</header>

        {/* Dropdown Menu positioned relative to header-container */}
        <nav className={`dropdown-menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <a href="#dashboard" onClick={() => handleSectionChange('dashboard')}>
                Dashboard
              </a>
            </li>
            <li>
              <a href="#threat-detection" onClick={() => handleSectionChange('threat-detection')}>
                Threat Detection & Alerts
              </a>
            </li>
            <li>
              <a href="#evidence-collection" onClick={() => handleSectionChange('evidence-collection')}>
                Evidence Collection
              </a>
            </li>
            <li>
              <a href="#automated-scanning" onClick={() => handleSectionChange('automated-scanning')}>
                Automated Scanning
              </a>
            </li>
            <li>
              <a href="#visualization" onClick={() => handleSectionChange('visualization')}>
                Visualization & Timeline
              </a>
            </li>
            <li>
              <a href="#reports" onClick={() => handleSectionChange('reports')}>
                Reports
              </a>
            </li>
            <li>
              <a href="#settings" onClick={() => handleSectionChange('settings')}>
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="main-content">
        {activeSection === 'dashboard' && (
          <div>
            <h1>Dashboard Overview</h1>
            <p>This is where key metrics and forensic summaries will be displayed.</p>
          </div>
        )}

        {activeSection === 'threat-detection' && <ThreatAlerts />}
        
        {activeSection === 'evidence-collection' && (
          <div>
            <h1>Evidence Collection</h1>
            <p>This section will display imported forensic images and artifacts.</p>
          </div>
        )}
        
        {activeSection === 'automated-scanning' && (
          <div>
            <h1>Automated Scanning</h1>
            <p>This section shows results from file, log, registry, and network analysis.</p>
          </div>
        )}
        
        {activeSection === 'visualization' && (
          <div>
            <h1>Visualization & Timeline</h1>
            <p>This section will display interactive timelines and graphical data views.</p>
          </div>
        )}
        
        {activeSection === 'reports' && (
          <div>
            <h1>Reports</h1>
            <p>Generate, view, and export forensic reports in multiple formats.</p>
          </div>
        )}
        
        {activeSection === 'settings' && (
          <div>
            <h1>Settings</h1>
            <p>Manage tool settings, integrations, and user preferences here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
