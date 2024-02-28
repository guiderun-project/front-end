import React from 'react';

import { Button, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Header from './components/Header';

import { BROWSER_PATH } from '@/constants/path';
import { RootState } from '@/store/index';
import { RoleEnum } from '@/types/group';

const SignupIntro: React.FC = () => {
  const [, setSearchparams] = useSearchParams();
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.user.role);

  /**
   *
   */
  const handleTypeSelect = (type: 'vi' | 'guide') => () => {
    setSearchparams({ type });
  };

  //
  //
  //
  React.useEffect(() => {
    if (role !== RoleEnum.New) {
      navigate(BROWSER_PATH.MAIN);
    }
  }, [role]);

  //
  //
  //

  return (
    <Stack
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      gap="2.5rem"
    >
      <Helmet>
        <title>장애여부 선택 - Guide run project</title>
      </Helmet>
      <Header>
        <FormattedMessage id="signup.intro.title" />
      </Header>
      <Typography variant="h2">
        <FormattedMessage id="signup.intro.introduce" />
      </Typography>
      <Stack gap="1rem" width="100%" alignItems="center">
        <Button
          variant="contained"
          size="large"
          color="vi"
          fullWidth
          onClick={handleTypeSelect('vi')}
        >
          <FormattedMessage id="signup.intro.vi" />
        </Button>
        <Button
          variant="contained"
          size="large"
          color="guide"
          fullWidth
          onClick={handleTypeSelect('guide')}
        >
          <FormattedMessage id="signup.intro.guide" />
        </Button>
      </Stack>
    </Stack>
  );
};

export default SignupIntro;
