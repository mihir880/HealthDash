// src/components/PatientDashboard/PatientDashboard.jsx
import React, { useState } from 'react';
import BloodPressureChart from '../BloodPressureChart/BloodPressureChart';
import VitalSigns from '../VitalSigns/VitalSigns';
import DiagnosticList from '../DiagnosticList/DiagnosticList';
import PatientProfile from '../PatientProfile/PatientProfile';
import PropTypes from 'prop-types';
import './PatientDashboard.css';

const PatientDashboard = ({ patientData }) => {
  const [timeRange, setTimeRange] = useState('last6months');

  // Handle time range dropdown change
  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  if (!patientData) {
    return <div className="dashboard-container">No patient data available</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Diagnosis History Section */}
        <section className="diagnosis-section">
          <h2 className="section-title card-title-24pt">Diagnosis History</h2>
          
          <div className="card blood-pressure-card">
            <div className="card-header">
              <h3 className="card-title inner-card-title-18pt">Blood Pressure</h3>
              <div className="time-filter-container">
                <select 
                  className="time-filter body-secondary-info-14pt"
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                >
                  <option value="last6months">Last 6 months</option>
                  <option value="last3months">Last 3 months</option>
                  <option value="last12months">Last 12 months</option>
                  <option value="all">All data</option>
                </select>
              </div>
            </div>
            
            <div className="chart-legend-container">
              <div className="chart-container">
                <BloodPressureChart 
                  bloodPressureData={patientData.bloodPressure} 
                  timeRange={timeRange}
                />
              </div>
              
              <div className="bp-legend">
                <div className="legend-item">
                  <div className="legend-dot systolic"></div>
                  <div className="legend-label">Systolic</div>
                  <div className="legend-value">
                    {patientData.bloodPressure.current.systolic}
                  </div>
                 
                  <div className="legend-status status-alert body-secondary-info-14pt">
                    <img src="/images/ArrowUp.svg" alt="Up arrow" className="up-arrow"/>
                    {patientData.bloodPressure.current.systolicStatus}
                  </div>
                </div>
                
                <div className="legend-item">
                  <div className="legend-dot diastolic"></div>
                  <div className="legend-label">Diastolic</div>
                  <div className="legend-value">
                    {patientData.bloodPressure.current.diastolic}
                  </div>
                 
                  <div className="legend-status status-below body-secondary-info-14pt">
                    <img src="/images/ArrowDown.svg" alt="Down arrow" className="down-arrow"/>
                    {patientData.bloodPressure.current.diastolicStatus}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <VitalSigns vitalSigns={patientData.vitalSigns} />
        </section>
        
        {/* Diagnostic List Section */}
        <section className="diagnostic-list-section">
          <DiagnosticList diagnoses={patientData.diagnoses} />
        </section>
      </div>
      
      <div className="patient-sidebar">
        <PatientProfile patient={patientData} />
      </div>
    </div>
  );
};

PatientDashboard.propTypes = {
  patientData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    dateOfBirth: PropTypes.string,
    gender: PropTypes.string,
    contactInfo: PropTypes.object,
    insurance: PropTypes.string,
    bloodPressure: PropTypes.object.isRequired,
    vitalSigns: PropTypes.object.isRequired,
    diagnoses: PropTypes.array.isRequired,
    labResults: PropTypes.array
  })
};

export default PatientDashboard;