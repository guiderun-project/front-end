import React, { Suspense } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import infoApi from './apis/requests/info';
import { BROWSER_PATH } from './constants/path';
import Loading from './pages/Loading';
import { RootState } from './store';
import { updateInfo } from './store/reducer/user';
import { RoleEnum } from './types/group';

const App: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userRole = useSelector((state: RootState) => state.user.role);
  const { data: userData } = useQuery({
    queryKey: ['userInfoGet', accessToken, userRole],
    queryFn: () => infoApi.userInfoGet(),
    enabled:
      !!accessToken && userRole !== RoleEnum.Wait && userRole !== RoleEnum.New,
  });
  //   const navigate = useNavigate();
  const dispatch = useDispatch();

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
  //   React.useEffect(() => {
  //     if (!accessToken) {
  //       navigate(BROWSER_PATH.INTRO);
  //       return;
  //     }
  //   }, [accessToken]);
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
};

export default App;
