import React from 'react';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Loading from '../Loading';

import authApi from '@/apis/requests/auth';
import infoApi from '@/apis/requests/info';
import { ErrorType } from '@/apis/types/error';
import { BROWSER_PATH } from '@/constants/path';
import { setAccessToken } from '@/store/reducer/auth';
import { updateInfo } from '@/store/reducer/user';

const Oauth: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  //
  //
  //

  React.useEffect(() => {
    if (!code) {
      navigate(BROWSER_PATH.INTRO);
      return;
    }

    authApi
      .kakaoAuthPost({ code })
      .then((res) => {
        dispatch(setAccessToken(res.accessToken));
        if (res.isExist) {
          infoApi.userInfoGet().then((res) => {
            dispatch(updateInfo(res));
          });
          navigate('/');
          return;
        }
        navigate(BROWSER_PATH.SIGNUP);
      })
      .catch((err) => {
        if (axios.isAxiosError<ErrorType>(err)) throw new Error(err.message);
      });
  }, [code]);

  //
  //
  //

  return <Loading />;
};

export default Oauth;
