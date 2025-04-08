// src/services/api.js

/**
 * API Service for handling all data fetching
 * This file contains methods for interacting with the Coalition Technologies Patient Data API
 */

// Correct Base URL for the Coalition Technologies Patient Data API
const API_BASE_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';

// API authentication credentials
const API_USERNAME = 'coalition';
const API_PASSWORD = 'skills-test';

/**
 * Fetch all patients data
 * @returns {Promise<Array>} - All patients data
 */
export const fetchAllPatients = async () => {
  try {
    // Create the authorization header with Basic Auth
    const headers = new Headers();
    const authString = `${API_USERNAME}:${API_PASSWORD}`;
    const encodedAuth = btoa(authString);
    headers.append('Authorization', `Basic ${encodedAuth}`);
    headers.append('Content-Type', 'application/json');
    
    // Make the request to get all patients
    const response = await fetch(`${API_BASE_URL}/patients`, {
      method: 'GET',
      headers: headers
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching all patients:', error);
    throw error;
  }
};

/**
 * Fetch patient data by name
 * @param {string} patientName - The name of the patient to fetch data for
 * @returns {Promise<Object>} - The patient data
 */
export const fetchPatientByName = async (patientName) => {
  try {
    const allPatients = await fetchAllPatients();
    
    // Find the patient by name
    const patient = allPatients.find(p => 
      p.name.toLowerCase().includes(patientName.toLowerCase())
    );
    
    if (!patient) {
      throw new Error(`Patient with name ${patientName} not found`);
    }
    
    return transformApiData(patient);
  } catch (error) {
    console.error(`Error fetching patient ${patientName}:`, error);
    throw error;
  }
};

/**
 * Transform the API data to match our application's structure
 * @param {Object} apiData - Raw data from the API
 * @returns {Object} - Transformed data
 */
const transformApiData = (apiData) => {
  if (!apiData) return null;
  
  // Extract the blood pressure history from diagnosis_history
  const bloodPressureHistory = apiData.diagnosis_history.map(entry => ({
    month: `${entry.month} ${entry.year}`,
    systolic: entry.blood_pressure.systolic.value,
    diastolic: entry.blood_pressure.diastolic.value
  }));
  
  // Get the most recent blood pressure data (first entry in the array)
  const currentBloodPressure = apiData.diagnosis_history[0]?.blood_pressure || {
    systolic: { value: 0, levels: '' },
    diastolic: { value: 0, levels: '' }
  };
  
  return {
    id: apiData.name.toLowerCase().replace(/\s+/g, '-'),
    name: apiData.name,
    avatar: apiData.profile_picture,
    dateOfBirth: formatDate(apiData.date_of_birth),
    gender: apiData.gender,
    age: calculateAge(apiData.date_of_birth),
    contactInfo: {
      phone: apiData.phone_number,
      emergencyContact: apiData.emergency_contact
    },
    insurance: apiData.insurance_type,
    bloodPressure: {
      history: bloodPressureHistory,
      current: {
        systolic: currentBloodPressure.systolic.value,
        diastolic: currentBloodPressure.diastolic.value,
        systolicStatus: currentBloodPressure.systolic.levels,
        diastolicStatus: currentBloodPressure.diastolic.levels
      }
    },
    vitalSigns: {
      respiratoryRate: {
        value: `${apiData.diagnosis_history[0]?.respiratory_rate.value} bpm`,
        status: apiData.diagnosis_history[0]?.respiratory_rate.levels
      },
      temperature: {
        value: `${apiData.diagnosis_history[0]?.temperature.value}°F`,
        status: apiData.diagnosis_history[0]?.temperature.levels
      },
      heartRate: {
        value: `${apiData.diagnosis_history[0]?.heart_rate.value} bpm`,
        status: apiData.diagnosis_history[0]?.heart_rate.levels
      }
    },
    diagnoses: apiData.diagnostic_list.map((diagnosis, index) => ({
      id: index + 1,
      problem: diagnosis.name,
      description: diagnosis.description,
      status: diagnosis.status
    })),
    labResults: apiData.lab_results.map((result, index) => ({
      id: index + 1,
      name: result
    }))
  };
};

/**
 * Format a date string from ISO format to a more readable format
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} - Formatted date string (Month DD, YYYY)
 */
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Calculate age from birth date
 * @param {string} birthDate - Birth date in ISO format (YYYY-MM-DD)
 * @returns {number} - Age in years
 */
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