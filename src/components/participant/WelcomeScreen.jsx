import React, { useState } from 'react';

const WelcomeScreen = ({ onStart }) => {
  const [name, setName] = useState('');

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="text-center mb-8">
          <h1 className="section-title mb-2">TechTOM Team Icebreaker!</h1>
          <p className="text-gray-600">Let's get to know each other better and build our team spirit</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button
            onClick={() => onStart(name)}
            disabled={!name.trim()}
            className="btn btn-primary w-full py-3"
          >
            Let's Begin!
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          Your responses will only be shared during our team meeting.
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
