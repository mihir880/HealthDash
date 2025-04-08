// src/components/DiagnosticList/DiagnosticList.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './DiagnosticList.css';

const DiagnosticList = ({ diagnoses }) => {
  const getStatusClass = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('observation')) return 'status-observation';
    if (statusLower.includes('cured')) return 'status-cured';
    if (statusLower.includes('inactive')) return 'status-inactive';
    return '';
  };

  return (
    <>
      <h2 className="section-title card-title-24pt">Diagnostic List</h2>
      
      <div className="card diagnostic-list-card">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th className="body-secondary-info-14pt">Problem/Diagnosis</th>
              <th className="body-secondary-info-14pt">Description</th>
              <th className="body-secondary-info-14pt">Status</th>
            </tr>
          </thead>
          <tbody>
            {diagnoses.map(diagnosis => (
              <tr key={diagnosis.id}>
                <td className="body-emphasized-14pt">{diagnosis.problem}</td>
                <td className="body-regular-14">{diagnosis.description}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(diagnosis.status)}`}>
                    {diagnosis.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

DiagnosticList.propTypes = {
  diagnoses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      problem: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    })
  ).isRequired
};

export default DiagnosticList;