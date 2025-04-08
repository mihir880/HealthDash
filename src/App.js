// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import PatientDashboard from './components/PatientDashboard/PatientDashboard';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';
import ErrorMessage from './components/common/ErrorMessage/ErrorMessage';
import { fetchAllPatients, fetchPatientByName } from './services/api';
import './App.css';

const App = () => {
  const [patientData, setPatientData] = useState(null);
  const [allPatients, setAllPatients] = useState([]);
  const [activePatient, setActivePatient] = useState('Jessica Taylor');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch all patients on initial load
  useEffect(() => {
    const loadAllPatients = async () => {
      try {
        const patients = await fetchAllPatients();
        
        // Format patients for sidebar
        const formattedPatients = patients.map(patient => ({
          id: patient.name.toLowerCase().replace(/\s+/g, '-'),
          name: patient.name,
          gender: patient.gender,
          age: calculateAge(patient.date_of_birth),
          avatar: patient.profile_picture
        }));
        
        setAllPatients(formattedPatients);
      } catch (err) {
        console.error('Error loading patients:', err);
        // If we can't load all patients, at least try to load Jessica Taylor
        setAllPatients([{
          id: 'jessica-taylor',
          name: 'Jessica Taylor',
          gender: 'Female',
          age: 29
        }]);
      }
    };
    
    loadAllPatients();
  }, []);
  
  // Load active patient data whenever activePatient changes
  useEffect(() => {
    const loadPatientData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch the active patient's data
        const data = await fetchPatientByName(activePatient);
        setPatientData(data);
      } catch (err) {
        console.error(`Error loading patient data for ${activePatient}:`, err);
        setError(`Failed to load data for ${activePatient}. Please try again.`);
      } finally {
        setLoading(false);
      }
    };
    
    if (activePatient) {
      loadPatientData();
    }
  }, [activePatient]);
  
  // Handler for patient selection
  const handlePatientSelect = (patientName) => {
    if (patientName !== activePatient) {
      setActivePatient(patientName);
    }
  };
  
  // Helper function to calculate age
  const calculateAge = (birthDate) => {
    if (!birthDate) return 0;
    
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="app">
      <Header />
      <div className="content-container">
        <Sidebar 
          patients={allPatients}
          activePatientId={patientData?.id || 'jessica-taylor'}
          onPatientSelect={handlePatientSelect}
        />
        <main className="main-content">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <PatientDashboard patientData={patientData} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;