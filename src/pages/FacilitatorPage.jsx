import React, { useState } from 'react';
import AdminLogin from '../components/facilitator/AdminLogin';
import FacilitatorDashboard from '../components/facilitator/FacilitatorDashboard';

const FacilitatorPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen">
      {isLoggedIn ? <FacilitatorDashboard /> : <AdminLogin onLogin={handleLogin} />}
    </div>
  );
};

export default FacilitatorPage;
