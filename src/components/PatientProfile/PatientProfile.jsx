// src/components/PatientProfile/PatientProfile.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './PatientProfile.css';

const PatientProfile = ({ patient }) => {
  // Make sure we're displaying the correct patient
  if (!patient) return <div>No patient data available</div>;

  return (
    <aside className="patient-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <img 
            src={patient.avatar} 
            alt={patient.name}
            className="avatar-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${process.env.PUBLIC_URL}/assets/images/avatar-placeholder.png`;
            }}
          />
        </div>
        <h2 className="profile-name">{patient.name}</h2>
      </div>
      
      <ul className="profile-info-list">
        <li className="profile-info-item">
          <div className="info-icon">
            {/* Calendar Icon */}
            <img src="/images/BirthIcon.svg" alt="info-icon" />
          </div>
          <div className="info-content">
            <span className="info-label body-secondary-info-14pt">Date Of Birth</span>
            <span className="info-value body-emphasized-14pt">{patient.dateOfBirth}</span>
          </div>
        </li>
        
        <li className="profile-info-item">
          <div className="info-icon">
            {/* Gender Icon */}
            <img src="/images/gender.svg" alt="gender" />
          </div>
          <div className="info-content">
            <span className="info-label body-secondary-info-14pt">Gender</span>
            <span className="info-value body-emphasized-14pt">{patient.gender}</span>
          </div>
        </li>
        
        <li className="profile-info-item">
          <div className="info-icon">
            <img src="/images/PhoneIcon.svg" alt="PhoneIcon" />
          </div>
          <div className="info-content">
            <span className="info-label body-secondary-info-14pt">Contact Info.</span>
            <span className="info-value body-emphasized-14pt">{patient.contactInfo?.phone}</span>
          </div>
        </li>
        
        <li className="profile-info-item">
          <div className="info-icon">
            <img src="/images/PhoneIcon.svg" alt="PhoneIcon" />
          </div>
          <div className="info-content">
            <span className="info-label body-secondary-info-14pt">Emergency Contacts</span>
            <span className="info-value body-emphasized-14pt">{patient.contactInfo?.emergencyContact}</span>
          </div>
        </li>
        
        <li className="profile-info-item">
          <div className="info-icon">
            <img src="/images/InsuranceIcon.svg" alt="InsuranceIcon" />
          </div>
          <div className="info-content">
            <span className="info-label body-secondary-info-14pt">Insurance Provider</span>
            <span className="info-value body-emphasized-14pt">{patient.insurance}</span>
          </div>
        </li>
      </ul>
      
      <button className="show-all-btn">Show All Information</button>
      
      <div className="lab-results-section">
        <h3 className="lab-results-title inner-card-title-18pt">Lab Results</h3>
        
        <ul className="lab-results-list">
          {patient.labResults && patient.labResults.map(result => (
            <li key={result.id} className="lab-result-item">
              <span className="lab-result-name body-regular-14">{result.name}</span>
              <button className="download-btn" aria-label={`Download ${result.name}`}>
                <img src="/images/download.svg" alt="Download" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

PatientProfile.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    dateOfBirth: PropTypes.string,
    gender: PropTypes.string,
    contactInfo: PropTypes.shape({
      phone: PropTypes.string,
      emergencyContact: PropTypes.string
    }),
    insurance: PropTypes.string,
    labResults: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string
      })
    )
  }).isRequired
};

export default PatientProfile;