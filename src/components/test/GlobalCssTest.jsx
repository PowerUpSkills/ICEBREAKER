import React from 'react';

const GlobalCssTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-6">
      <div className="card p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2 text-center">Global CSS Test</h1>
        <p className="text-gray-600 text-center mb-8">This component is using global CSS classes.</p>
        
        <div className="mb-6">
          <label className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter your username"
          />
        </div>
        
        <div className="mb-6">
          <label className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter your password"
          />
        </div>
        
        <button className="btn btn-primary w-full py-3">
          Login
        </button>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            This is a test component with global CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalCssTest;
