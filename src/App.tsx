import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import authApi from './apis/requests/auth';
import infoApi from './apis/requests/info';
import { BROWSER_PATH } from './constants/path';
import Loading from './pages/Loading';
import { RootState } from './store';
import { setAccessToken } from './store/reducer/auth';
import { updateInfo } from './store/reducer/user';
import { RoleEnum } from './types/group';

const App: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userRole = useSelector((state: RootState) => state.user.role);

  const {
    data: newAccessToken,
    isLoading: isLoadingGetAccessToken,
    isError,
  } = useQuery({
    queryKey: ['accessTokenGet'],
    queryFn: () => authApi.accessTokenGet(),
  });

  const { data: userData, isLoading: isLoadigGetUserData } = useQuery({
    queryKey: ['userInfoGet', accessToken, userRole],
    queryFn: () => infoApi.userInfoGet(),
    enabled: !!accessToken && userRole !== RoleEnum.New,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      dispatch(updateInfo(userData));
    }
  }, [userData]);

  useEffect(() => {
    if (newAccessToken) {
      dispatch(setAccessToken(newAccessToken));
    }
  }, [newAccessToken]);

  if (isError) {
    return <Navigate to={BROWSER_PATH.INTRO} />;
  }

  return isLoadigGetUserData || isLoadingGetAccessToken ? (
    <Loading />
  ) : (
    <Outlet />
  );
};

export default App;
