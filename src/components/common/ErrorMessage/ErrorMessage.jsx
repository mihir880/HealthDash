// src/components/common/ErrorMessage/ErrorMessage.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-icon">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 16V26" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23.9941 32H24.0121" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 className="error-title">Error Loading Data</h3>
      <p className="error-message">{message}</p>
      <button className="retry-button">Retry</button>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorMessage;