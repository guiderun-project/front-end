import React from 'react';

import { Stack, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useNavigate, useSearchParams } from 'react-router-dom';

import runningLottie from '@/assets/running_lottie.json';
import { BROWSER_PATH } from '@/constants/path';

const Oauth: React.FC = () => {
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
    }
    setTimeout(() => {
      navigate(BROWSER_PATH.SIGNUP);
    }, 1000);
    //TODO 액세스토큰 발급 요청 및 회원가입 또는 로그인 로직 구현
  }, [code]);

  //
  //
  //

  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh">
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
