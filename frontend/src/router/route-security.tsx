import React, { ReactElement } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const useAuth = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const ProtectedRoutes = (): ReactElement => {
  const location = useLocation();
  const isAuth = useAuth();
  const utype = localStorage.getItem('utype');

  if (
    isAuth &&
    utype === 'land_owner' &&
    window.location.pathname === '/service-company'
  ) {
    return <Navigate to="/land-owner" replace />;
  } else if (
    isAuth &&
    utype === 'service_company' &&
    window.location.pathname === '/land-owner'
  ) {
    return <Navigate to="/service-company" replace />;
  }

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export const NoSessionRoutes = (): ReactElement => {
  const isAuth = useAuth();
  const utype = localStorage.getItem('utype');

  if (isAuth && utype === 'land_owner') {
    return <Navigate to="/land-owner" replace />;
  } else if (isAuth && utype === 'service_company') {
    return <Navigate to="/service-company" replace />;
  }

  return <Outlet />;
};
