import React from 'react';

import { Stack, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import { Helmet } from 'react-helmet-async';
import { useIntl, FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import authApi from '@/apis/requests/auth';
import runningLottie from '@/assets/running_lottie.json';
import { BROWSER_PATH } from '@/constants/path';
import { setAccessToken } from '@/store/reducer/auth';

const Oauth: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const intl = useIntl();
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
          navigate('/');
          return;
        }
        navigate(BROWSER_PATH.SIGNUP);
      })
      .catch((err) => {
        throw Error(err);
      });
  }, [code]);

  //
  //
  //

  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh">
      <Helmet>
        <title>가입 인증 진행 중 - Guide run Project</title>
      </Helmet>
      <Stack maxWidth="20rem" maxHeight="20rem" alignItems="center">
        <Lottie
          alt={intl.formatMessage({ id: 'oauth.loading.alt' })}
          animationData={runningLottie}
        />
        <Typography variant="h5" fontWeight={600}>
          <FormattedMessage id="oauth.loading" />
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Oauth;
