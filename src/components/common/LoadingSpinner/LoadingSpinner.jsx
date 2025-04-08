// src/components/common/LoadingSpinner/LoadingSpinner.jsx
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
      <p className="loading-text">Loading patient data...</p>
    </div>
  );
};

export default LoadingSpinner;