import React from 'react';

import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { NavBar } from '../NavBar';

import { BROWSER_PATH, PREV_PATH_KEY } from '@/constants/path';
import SignupComplete from '@/pages/Signup/SignupComplete';
import { RootState } from '@/store/index';
import getAuthority from '@/utils/authority';

interface ProtectedRouteProps {
  protectedLevel: 'APPROVED_USER' | 'WAITING_USER';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ protectedLevel }) => {
  const location = useLocation();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { role } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    window.localStorage.setItem(
      PREV_PATH_KEY,
      `${location.pathname}${location.search}`,
    );
  }, [location]);

  if (!accessToken) {
    return <Navigate to={BROWSER_PATH.INTRO} replace />;
  }

  if (protectedLevel === 'APPROVED_USER') {
    if (getAuthority.isUser(role)) {
      return <Outlet />;
    } else if (getAuthority.isWait(role)) {
      return <SignupComplete />;
    }
  }

  if (protectedLevel === 'WAITING_USER' && getAuthority.isSignup(role)) {
    return (
      <>
        <Stack padding="5rem 0" marginBottom="2.9375rem" gap="3.75rem">
          <Outlet />
        </Stack>
        {getAuthority.isUser(role) && <NavBar />}
      </>
    );
  }

  return <Navigate to={BROWSER_PATH.INTRO} replace />;
};

export default ProtectedRoute;
