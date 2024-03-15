import React from 'react';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import authApi from './apis/requests/auth';
import infoApi from './apis/requests/info';
import { BROWSER_PATH } from './constants/path';
import { RootState } from './store';
import { setAccessToken } from './store/reducer/auth';
import { updateInfo } from './store/reducer/user';
import { RoleEnum } from './types/group';

const App: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userRole = useSelector((state: RootState) => state.user.role);
  const { data: newAccessToken, isError } = useSuspenseQuery({
    queryKey: ['accessTokenGet'],
    queryFn: () => authApi.accessTokenGet(),
  });
  const { data: userData } = useQuery({
    queryKey: ['userInfoGet', accessToken, userRole],
    queryFn: () => infoApi.userInfoGet(),
    enabled: !!accessToken && userRole !== RoleEnum.New,
  });
  const dispatch = useDispatch();

  if (isError) {
    <Navigate to={BROWSER_PATH.INTRO} replace />;
  }

  //
  //
  //
  React.useEffect(() => {
    if (userData) {
      dispatch(updateInfo(userData));
    }
  }, [userData]);

  //
  //
  //
  React.useEffect(() => {
    if (newAccessToken) {
      dispatch(setAccessToken(newAccessToken));
    }
  }, [newAccessToken]);

  //
  //
  //
  return <Outlet />;
};

export default App;
