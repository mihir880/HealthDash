// src/components/BloodPressureChart/BloodPressureChart.jsx
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import PropTypes from 'prop-types';
import './BloodPressureChart.css';

// Register all Chart.js components
Chart.register(...registerables);

const BloodPressureChart = ({ bloodPressureData, timeRange = 'last6months' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Clean up function to destroy chart instance when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!bloodPressureData?.history || !chartRef.current) return;

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    // Filter the data to show only the last 6 months
    const filteredData = filterDataByTimeRange(bloodPressureData.history, timeRange);

    // Prepare data for the chart
    const months = filteredData.map(item => item.month);
    const systolicValues = filteredData.map(item => item.systolic);
    const diastolicValues = filteredData.map(item => item.diastolic);
    
    // Create gradient for systolic line
    const systolicGradient = ctx.createLinearGradient(0, 0, 0, 300);
    systolicGradient.addColorStop(0, 'rgba(194, 110, 180, 0.2)');
    systolicGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    // Create gradient for diastolic line
    const diastolicGradient = ctx.createLinearGradient(0, 0, 0, 300);
    diastolicGradient.addColorStop(0, 'rgba(140, 111, 230, 0.2)');
    diastolicGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    // Calculate min and max for better axis scaling
    const minDiastolic = Math.min(...diastolicValues) - 10;
    const maxSystolic = Math.max(...systolicValues) + 10;

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Systolic',
            data: systolicValues,
            borderColor: '#C26EB4',
            backgroundColor: systolicGradient,
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#C26EB4',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 1.5,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Diastolic',
            data: diastolicValues,
            borderColor: '#8C6FE6',
            backgroundColor: diastolicGradient,
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#8C6FE6',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 1.5,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#072635',
            bodyColor: '#072635',
            borderColor: '#EDEDED',
            borderWidth: 1,
            padding: 10,
            displayColors: true,
            callbacks: {
              title: (tooltipItems) => {
                return tooltipItems[0].label;
              },
              label: (context) => {
                const label = context.dataset.label || '';
                const value = context.parsed.y;
                return `${label}: ${value}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false,  // Changed back to false to hide vertical lines
              drawBorder: false
            },
            ticks: {
              color: '#707070',
              font: {
                family: 'Manrope',
                size: 12
              }
            }
          },
          y: {
            min: minDiastolic > 50 ? minDiastolic : 50,
            max: maxSystolic < 180 ? maxSystolic : 180,
            grid: {
              color: 'rgba(220, 220, 220, 0.5)',
              drawBorder: false,
              lineWidth: 1
            },
            ticks: {
              color: '#707070',
              font: {
                family: 'Manrope',
                size: 12
              },
              stepSize: 20
            }
          }
        }
      }
    });
  }, [bloodPressureData, timeRange]);

  // Function to filter data based on time range
  const filterDataByTimeRange = (historyData, range) => {
    // Return all data if we have 6 or fewer entries
    if (historyData.length <= 6) {
      return historyData;
    }

    // Otherwise return just the last 6 months
    if (range === 'last6months') {
      return historyData.slice(-6);
    } else if (range === 'last3months') {
      return historyData.slice(-3);
    } else if (range === 'last12months') {
      return historyData.slice(-12);
    }

    // Default fallback
    return historyData;
  };

  return (
    <div className="chart-container">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

BloodPressureChart.propTypes = {
  bloodPressureData: PropTypes.shape({
    history: PropTypes.arrayOf(
      PropTypes.shape({
        month: PropTypes.string.isRequired,
        systolic: PropTypes.number.isRequired,
        diastolic: PropTypes.number.isRequired
      })
    ).isRequired,
    current: PropTypes.shape({
      systolic: PropTypes.number.isRequired,
      diastolic: PropTypes.number.isRequired,
      systolicStatus: PropTypes.string,
      diastolicStatus: PropTypes.string
    }).isRequired
  }).isRequired,
  timeRange: PropTypes.string
};

export default BloodPressureChart;