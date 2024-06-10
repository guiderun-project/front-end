import React from 'react';

import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Loading from '../Loading';

import authApi from '@/apis/requests/auth';
import infoApi from '@/apis/requests/info';
import { BROWSER_PATH, PREV_PATH_KEY } from '@/constants/path';
import { setAccessToken } from '@/store/reducer/auth';
import { updateInfo } from '@/store/reducer/user';

const Oauth: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const prevPath = window.localStorage.getItem(PREV_PATH_KEY);

  const { mutate } = useMutation({
    mutationKey: ['kakaoAuthPost'],
    mutationFn: (code: string) => authApi.kakaoAuthPost({ code }),
    throwOnError: true,
    onSuccess: (data) => {
      dispatch(setAccessToken(data.accessToken));
      if (data.isExist) {
        infoApi.userInfoGet().then((res) => {
          dispatch(updateInfo(res));

          navigate(prevPath ? prevPath : '/');
        });
      } else {
        navigate(BROWSER_PATH.SIGNUP);
      }
    },
  });

  //
  //
  //
  React.useEffect(() => {
    if (!code) {
      navigate(BROWSER_PATH.INTRO);
      return;
    }
    mutate(code);
  }, [code]);

  //
  //
  //

  return <Loading />;
};

export default Oauth;
