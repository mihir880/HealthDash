// src/components/Header/Header.jsx
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/images/TestLogo.svg" alt="Tech.Care Logo" className="logo-image" />
      </div>
      
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#" className="nav-link">
              <img src="/images/home.svg" alt="" className="nav-icon" />
              <span>Overview</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link active">
              <img src="/images/group.svg" alt="" className="nav-icon" />
              <span>Patients</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <img src="/images/calendar.svg" alt="" className="nav-icon" />
              <span>Schedule</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <img src="/images/chat.svg" alt="" className="nav-icon" />
              <span>Message</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <img src="/images/credit_card.svg" alt="" className="nav-icon" />
              <span>Transactions</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div className="user-profile">
        <div className="user-info">
          <div className="user-name">Dr. Jose Simmons</div>
          <div className="user-role">General Practitioner</div>
        </div>
        <div className="avatar-container">
          <img 
            src="/images/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png"
            alt="Dr. Jose Simmons"
            className="avatar"
          />
        </div>
        
        <button className="settings-button" aria-label="Settings">
          <img 
            src="/images/settings.svg"
            alt="settings"
          />
        </button>
        
        <button className="more-button" aria-label="More Options">
          <img src="/images/v_threedots.svg" alt="vertical three dots"/>
        </button>
      </div>
    </header>
  );
};

export default Header;