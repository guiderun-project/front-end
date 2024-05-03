import React from 'react';

import { Box, Button, Stack } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { BROWSER_PATH } from '@/constants/path';

import CertificateUserId from './id/CertificateUserId';
import UserIdInfo from './id/UserIdInfo';

const FindIdSection = () => {
  const [isCertificated, setIsCertificated] = React.useState(false);

  //   const { isSuccess } = useMutation({});

  //
  //
  //

  return (
    <Stack id="tabpanel-find-id" role="tabpanel" aria-labelledby="tab-find-id">
      {!isCertificated ? <CertificateUserId /> : <UserIdInfo />}
      <Box
        display="flex"
        justifyContent="center"
        position="fixed"
        bottom="7.125rem"
        left={0}
        right={0}
      >
        {!isCertificated ? (
          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={() => setIsCertificated(true)}
          >
            아이디 찾기 <ChevronRightIcon aria-hidden fontSize="small" />
          </Button>
        ) : (
          <Button
            component={Link}
            to={BROWSER_PATH.LOGIN}
            fullWidth
            size="large"
            variant="contained"
          >
            로그인 페이지로 이동{' '}
            <ChevronRightIcon aria-hidden fontSize="small" />
          </Button>
        )}
      </Box>
    </Stack>
  );
};

export default FindIdSection;
