import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import authApi from './apis/requests/auth';
import infoApi from './apis/requests/info';
import { BROWSER_PATH, PREV_PATH_KEY } from './constants/path';
import Loading from './pages/Loading';
import { RootState } from './store';
import { setAccessToken } from './store/reducer/auth';
import { updateInfo } from './store/reducer/user';

const App: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userRole = useSelector((state: RootState) => state.user.role);
  const userId = useSelector((state: RootState) => state.user.userId);

  const {
    data: newAccessToken,
    isLoading: isLoadingGetAccessToken,
    isError,
  } = useQuery({
    queryKey: ['accessTokenGet'],
    queryFn: () => authApi.accessTokenGet(),
    enabled: !accessToken,
  });

  const {
    data: userData,
    isLoading: isLoadigGetUserData,
    isError: isErrorGetUserInfo,
  } = useQuery({
    queryKey: ['userInfoGet', accessToken, userRole],
    queryFn: () => infoApi.userInfoGet(),
    enabled: !!accessToken && !userId,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      dispatch(updateInfo(userData));
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (newAccessToken && newAccessToken !== accessToken) {
      dispatch(setAccessToken(newAccessToken));
    }
  }, [newAccessToken, accessToken, dispatch]);

  if (isError || isErrorGetUserInfo) {
    window.localStorage.setItem(
      PREV_PATH_KEY,
      `${location.pathname}${location.search}`,
    );
    return <Navigate to={BROWSER_PATH.INTRO} />;
  }

  return isLoadigGetUserData || isLoadingGetAccessToken || !userId ? (
    <Loading />
  ) : (
    <Outlet />
  );
};

export default App;
