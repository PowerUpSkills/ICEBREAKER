import React from 'react';
import './vanilla.css';

const VanillaCssTest = () => {
  return (
    <div className="vanilla-container">
      <div className="vanilla-card">
        <h1 className="vanilla-title">Vanilla CSS Test</h1>
        <p className="vanilla-subtitle">This component is using vanilla CSS instead of Tailwind CSS.</p>
        
        <div className="vanilla-form-field">
          <label className="vanilla-label">
            Username
          </label>
          <input
            type="text"
            className="vanilla-input"
            placeholder="Enter your username"
          />
        </div>
        
        <div className="vanilla-form-field">
          <label className="vanilla-label">
            Password
          </label>
          <input
            type="password"
            className="vanilla-input"
            placeholder="Enter your password"
          />
        </div>
        
        <button className="vanilla-button">
          Login
        </button>
        
        <div className="vanilla-footer">
          <p className="vanilla-footer-text">
            This is a test component with vanilla CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default VanillaCssTest;
