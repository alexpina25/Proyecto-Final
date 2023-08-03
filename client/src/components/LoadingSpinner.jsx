import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <div className="loading-text">Cargando...</div>
    </div>
  );
};

export default LoadingSpinner;
