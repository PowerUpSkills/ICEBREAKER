import React, { useState } from 'react';

const AdminLoginStyled = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Simple password check - in a real app, you'd want more security
    if (password === 'teamicebreaker123') {
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <div className="content-container animate-scale-in">
        <div className="text-center mb-6">
          <h1 className="section-title mb-2">Facilitator Access</h1>
          <p className="text-gray-600">Enter your password to access the dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter facilitator password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <button
            onClick={handleLogin}
            className="btn btn-primary w-full py-3"
          >
            Access Dashboard
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            This area is for the team facilitator only
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginStyled;
