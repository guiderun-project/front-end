import React from 'react';

import { Button, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Header from './components/Header';

import { BROWSER_PATH } from '@/constants/path';
import { RootState } from '@/store/index';
import { RoleEnum } from '@/types/group';

const SignupComplete: React.FC = () => {
  const { role } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  //
  //
  //
  React.useEffect(() => {
    if (role !== RoleEnum.Wait) {
      navigate(BROWSER_PATH.MAIN);
    }
  }, [role]);

  //
  //
  //

  return (
    <>
      <Helmet>
        <title>회원가입 완료 - Guide run Project</title>
      </Helmet>
      <Stack
        minHeight="100vh"
        justifyContent="space-around"
        alignItems="center"
        gap="2.5rem"
      >
        <Header>
          <FormattedMessage id="signup.complete.title" />
        </Header>
        <Typography
          fontSize="2.5rem"
          fontWeight={400}
          textAlign="center"
          whiteSpace="break-spaces"
        >
          <FormattedMessage id="signup.complete.matching" />
        </Typography>
        <Stack gap="1rem" width="100%" alignItems="center">
          <Button
            component={Link}
            to={BROWSER_PATH.INFO}
            variant="contained"
            size="large"
            fullWidth
          >
            <FormattedMessage id="signup.complete.checkInfo" />
          </Button>
          <Button
            component={Link}
            to={BROWSER_PATH.MYPAGE}
            variant="outlined"
            size="large"
            fullWidth
          >
            <FormattedMessage id="common.mypage" />
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default SignupComplete;
