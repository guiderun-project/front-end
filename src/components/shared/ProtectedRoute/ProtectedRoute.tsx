import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import infoApi from '@/apis/requests/info';
import { BROWSER_PATH, PREV_PATH_KEY } from '@/constants/path';
import { RootState } from '@/store/index';
import { setUserInfo } from '@/store/reducer/user';
import Loading from '@/pages/Loading';

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
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
    window.localStorage.setItem(PREV_PATH_KEY, location.pathname);
  }, [location]);

  if (isLoading) {
    return <Loading />;
  }

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={BROWSER_PATH.INTRO} replace />
  );
};

export default ProtectedRoute;
