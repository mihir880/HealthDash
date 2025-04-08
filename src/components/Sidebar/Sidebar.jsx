// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ patients, activePatientId, onPatientSelect }) => {
  // Default patients in case API fails
  const defaultPatients = [
    { id: 'emily-williams', name: 'Emily Williams', gender: 'Female', age: 18 },
    { id: 'ryan-johnson', name: 'Ryan Johnson', gender: 'Male', age: 45 },
    { id: 'jessica-taylor', name: 'Jessica Taylor', gender: 'Female', age: 29 }
  ];
  
  // Use API patients if available, otherwise use defaults
  const patientList = patients && patients.length > 0 ? patients : defaultPatients;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Patients</h2>
        <button className="search-button" aria-label="Search patients">
        <img src="/images/search.svg" alt="search icon" />
        </button>
      </div>
      
      <ul className="patient-list">
        {patientList.map(patient => (
          <li 
            key={patient.id}
            className={`patient-item ${patient.id === activePatientId ? 'active' : ''}`}
            onClick={() => onPatientSelect(patient.name)}
          >
            <div className="patient-info">
              {patient.avatar ? (
                <img 
                  src={patient.avatar} 
                  alt={patient.name} 
                  className="patient-avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    // Use the first letter of the name as fallback
                    e.target.style.display = 'none';
                    e.target.parentNode.classList.add('patient-avatar-fallback');
                    e.target.parentNode.textContent = patient.name.charAt(0);
                  }}
                />
              ) : (
                <div className="patient-avatar-fallback">
                  {patient.name.charAt(0)}
                </div>
              )}
              <div className="patient-details">
                <span className="patient-name">{patient.name}</span>
                <span className="patient-meta">
                  {patient.gender}, {patient.age}
                </span>
              </div>
            </div>
            <button className="action-button" aria-label="More options">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8.66675C8.36819 8.66675 8.66667 8.36827 8.66667 8.00008C8.66667 7.63189 8.36819 7.33341 8 7.33341C7.63181 7.33341 7.33333 7.63189 7.33333 8.00008C7.33333 8.36827 7.63181 8.66675 8 8.66675Z" stroke="#707070" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.6667 8.66675C13.0349 8.66675 13.3333 8.36827 13.3333 8.00008C13.3333 7.63189 13.0349 7.33341 12.6667 7.33341C12.2985 7.33341 12 7.63189 12 8.00008C12 8.36827 12.2985 8.66675 12.6667 8.66675Z" stroke="#707070" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.33333 8.66675C3.70152 8.66675 4 8.36827 4 8.00008C4 7.63189 3.70152 7.33341 3.33333 7.33341C2.96514 7.33341 2.66666 7.63189 2.66666 8.00008C2.66666 8.36827 2.96514 8.66675 3.33333 8.66675Z" stroke="#707070" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;