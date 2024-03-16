import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import infoApi from './apis/requests/info';
import Loading from './pages/Loading';
import { RootState } from './store';
import { updateInfo } from './store/reducer/user';
import { RoleEnum } from './types/group';

const App: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userRole = useSelector((state: RootState) => state.user.role);

  const { data: userData, isLoading } = useQuery({
    queryKey: ['userInfoGet', accessToken, userRole],
    queryFn: () => infoApi.userInfoGet(),
    enabled: !!accessToken && userRole !== RoleEnum.New,
  });
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

  return isLoading ? <Loading /> : <Outlet />;
};

export default App;
