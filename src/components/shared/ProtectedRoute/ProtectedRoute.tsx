import React from 'react';

import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { BROWSER_PATH, PREV_PATH_KEY } from '@/constants/path';
import { RootState } from '@/store/index';

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  React.useEffect(() => {
    window.localStorage.setItem(PREV_PATH_KEY, location.pathname);
  }, [location]);

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={BROWSER_PATH.INTRO} replace />
  );
};

export default ProtectedRoute;
