import React from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import authApi from '@/apis/requests/auth';
import infoApi from '@/apis/requests/info';
import { BROWSER_PATH, PREV_PATH_KEY } from '@/constants/path';
import Loading from '@/pages/Loading';
import { setAccessToken } from '@/store/reducer/auth';
import { updateInfo } from '@/store/reducer/user';
import { RoleEnum } from '@/types/group';

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data, isError, error, isLoading, isSuccess } = useQuery({
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
    if (data?.isExist) {
      dispatch(updateInfo({ role: RoleEnum.User }));
      queryClient.invalidateQueries({ queryKey: ['userInfoGet'] });
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

  if (isSuccess) {
    if (data.accessToken && data.isExist) {
      return <Outlet />;
    }
  }
  return <Navigate to={BROWSER_PATH.INTRO} replace />;
};

export default ProtectedRoute;
