import React from 'react';

import { Button, Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import TeamingCriteria from './components/TeamingCriteria';

import { PageTitle } from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import { RootState } from '@/store/index';
import { RoleEnum } from '@/types/group';

const SignupComplete: React.FC = () => {
  const { role } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  //
  //
  //
  // React.useEffect(() => {
  //   if (role !== RoleEnum.Wait) {
  //     navigate(BROWSER_PATH.MAIN);
  //   }
  // }, [role]);

  //
  //
  //

  return (
    <>
      <PageTitle title="회원가입 완료" />
      <Header>
        <FormattedMessage id="signup.complete.title" />
      </Header>
      <Stack
        component="main"
        minHeight="100vh"
        alignItems="center"
        gap="3.75rem"
        paddingBottom="3.4375rem"
      >
        <Stack alignItems="center" gap="0.5rem">
          <Typography
            component="h1"
            fontSize="2rem"
            fontWeight={400}
            textAlign="center"
          >
            가입이 완료되었습니다.
          </Typography>
          <Typography component="p" fontSize="0.9375rem" textAlign="center">
            팀 편성이 완료되면 알림톡으로 알려드릴게요!
          </Typography>
        </Stack>
        <TeamingCriteria />
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
        </Stack>
      </Stack>
    </>
  );
};

export default SignupComplete;
