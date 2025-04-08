// src/components/VitalSigns/VitalSigns.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './VitalSigns.css';

const VitalSigns = ({ vitalSigns }) => {
  const getStatusClass = (status) => {
    if (!status) return '';
    const statusLower = status.toLowerCase();
    if (statusLower.includes('normal')) return 'status-normal';
    if (statusLower.includes('lower')) return 'status-below';
    if (statusLower.includes('higher')) return 'status-above';
    return '';
  };

  return (
    <div className="vital-signs-grid">
      <div className="vital-sign-card respiratory">
        <div className="vital-sign-icon">
          <img src="/images/respiratoryrate.svg" alt="respiratory" />
        </div>
        <h4 className="vital-sign-title">Respiratory Rate</h4>
        <div className="vital-sign-value">{vitalSigns.respiratoryRate.value}</div>
        <div className={`vital-sign-status ${getStatusClass(vitalSigns.respiratoryRate.status)}`}>
          {vitalSigns.respiratoryRate.status}
        </div>
      </div>
      
      <div className="vital-sign-card temperature">
        <div className="vital-sign-icon">
        <img src="/images/temperature.svg" alt="Temperature" />
        </div>
        <h4 className="vital-sign-title">Temperature</h4>
        <div className="vital-sign-value">{vitalSigns.temperature.value}</div>
        <div className={`vital-sign-status ${getStatusClass(vitalSigns.temperature.status)}`}>
          {vitalSigns.temperature.status}
        </div>
      </div>
      
      <div className="vital-sign-card heart-rate">
        <div className="vital-sign-icon">
          <img src="/images/HeartBPM.svg" alt="Heart Rate Icon" />
        </div>
        <h4 className="vital-sign-title">Heart Rate</h4>
        <div className="vital-sign-value">{vitalSigns.heartRate.value}</div>
        <div className={`vital-sign-status ${getStatusClass(vitalSigns.heartRate.status)}`}>
          <img src="/images/ArrowDown.svg" alt="Up arrow" className="down-arrow" />
          {vitalSigns.heartRate.status}
        </div>
      </div>
    </div>
  );
};

VitalSigns.propTypes = {
  vitalSigns: PropTypes.shape({
    respiratoryRate: PropTypes.shape({
      value: PropTypes.string.isRequired,
      status: PropTypes.string
    }).isRequired,
    temperature: PropTypes.shape({
      value: PropTypes.string.isRequired,
      status: PropTypes.string
    }).isRequired,
    heartRate: PropTypes.shape({
      value: PropTypes.string.isRequired,
      status: PropTypes.string
    }).isRequired
  }).isRequired
};

export default VitalSigns;