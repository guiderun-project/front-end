import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// import authApi from './apis/requests/auth';
import infoApi from './apis/requests/info';
// import { BROWSER_PATH } from './constants/path';
import { RootState } from './store';
// import { setAccessToken } from './store/reducer/auth';
import { updateInfo } from './store/reducer/user';
import { RoleEnum } from './types/group';

const App: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userRole = useSelector((state: RootState) => state.user.role);
  // const { data: newAccessToken, error } = useSuspenseQuery<
  //   string,
  //   { errorCode: string; message: string }
  // >({
  //   queryKey: ['accessTokenGet'],
  //   queryFn: () => authApi.accessTokenGet(),
  // });
  const { data: userData } = useQuery({
    queryKey: ['userInfoGet', accessToken, userRole],
    queryFn: () => infoApi.userInfoGet(),
    enabled: !!accessToken && userRole !== RoleEnum.New,
  });
  // const navigate = useNavigate();
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
  // React.useEffect(() => {
  //   if (error) {
  //     if (error.errorCode === '0104') navigate(BROWSER_PATH.INTRO);
  //   }
  //   if (newAccessToken) {
  //     dispatch(setAccessToken(newAccessToken));
  //   }
  // }, [newAccessToken, error]);

  //
  //
  //
  return <Outlet />;
};

export default App;
