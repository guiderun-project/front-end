import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import authApi from '@/apis/requests/auth';
import { BROWSER_PATH, PREV_PATH_KEY } from '@/constants/path';
import Loading from '@/pages/Loading';
import { setAccessToken } from '@/store/reducer/auth';

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['accessTokenGet'],
    queryFn: () => authApi.accessTokenGet(),
    retry: false,
    throwOnError: false,
  });

  //
  //
  //
  React.useEffect(() => {
    window.localStorage.setItem(PREV_PATH_KEY, location.pathname);
  }, [location]);

  //
  //
  //
  React.useEffect(() => {
    if (data?.accessToken) {
      dispatch(setAccessToken(data.accessToken));
    }
  }, [data]);

  //
  //
  //

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error.status === 401) {
    return <Navigate to={BROWSER_PATH.INTRO} replace />;
  }

  if (data) {
    if (data.accessToken) {
      if (data.isExist) {
        return <Outlet />;
      } else {
        return <Navigate to={BROWSER_PATH.SIGNUP} replace />;
      }
    }
  }
  return <Navigate to={BROWSER_PATH.INTRO} replace />;
};

export default ProtectedRoute;
