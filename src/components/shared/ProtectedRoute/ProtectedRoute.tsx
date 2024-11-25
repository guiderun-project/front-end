import React from 'react';

import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { NavBar } from '../NavBar';
import { PageLayout } from '../PageLayout';

import infoApi from '@/apis/requests/info';
import { BROWSER_PATH, PREV_PATH_KEY } from '@/constants/path';
import Loading from '@/pages/Loading';
import { RootState } from '@/store/index';
import { setUserInfo } from '@/store/reducer/user';
import SignupComplete from '@/pages/Signup/SignupComplete';
import getAuthority from '@/utils/authority';

interface ProtectedRouteProps {
  protectedLevel: 'APPROVED_USER' | 'WAITING_USER';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ protectedLevel }) => {
  const location = useLocation();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { userId, role } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ['userInfoGet'],
    queryFn: () => infoApi.userInfoGet(),
    enabled: Boolean(accessToken),
  });

  React.useEffect(() => {
    if (data) {
      dispatch(setUserInfo(data));
    }
  }, [data]);

  React.useEffect(() => {
    window.localStorage.setItem(
      PREV_PATH_KEY,
      `${location.pathname}${location.search}`,
    );
  }, [location]);

  if (isLoading || (accessToken && !userId)) {
    return <Loading />;
  }

  if (!accessToken) {
    return <Navigate to={BROWSER_PATH.INTRO} replace />;
  }

  if (protectedLevel === 'APPROVED_USER') {
    if (getAuthority.isUser(role)) {
      return <Outlet />;
    } else if (getAuthority.isWait(role)) {
      return (
        <PageLayout>
          <SignupComplete />
        </PageLayout>
      );
    }
  }

  if (protectedLevel === 'WAITING_USER' && getAuthority.isSignup(role)) {
    return (
      <PageLayout>
        <Stack padding="5rem 0" marginBottom="2.9375rem" gap="3.75rem">
          <Outlet />
        </Stack>
        {getAuthority.isUser(role) && <NavBar />}
      </PageLayout>
    );
  }

  return <Navigate to={BROWSER_PATH.INTRO} replace />;
};

export default ProtectedRoute;
