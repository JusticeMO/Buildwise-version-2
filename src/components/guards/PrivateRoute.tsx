
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Special handling for tenant routes
  if (location.pathname.startsWith('/tenant/') && location.pathname !== '/tenant/login') {
    return location.pathname === '/tenant/dashboard' ? children : <Navigate to="/tenant/dashboard" replace />;
  }

  // For all other routes, check if authenticated
  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
