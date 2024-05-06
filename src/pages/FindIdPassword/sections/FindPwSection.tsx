import React from 'react';

import { Box, Button, Stack } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import CertificateUserPw from './password/CertificateUserPw';
import EditUserPw from './password/EditUserPw';
import { useMutationState } from '@tanstack/react-query';

const FindPwSection: React.FC = () => {
  const [isCertificated, setIsCertificated] = React.useState(false);

  const [isSuccess] = useMutationState({
    filters: { mutationKey: ['findPwToken'] },
    select: (mutate) => mutate.state.status === 'success',
  });
  return (
    <Stack id="tabpanel-find-pw" role="tabpanel" aria-labelledby="tab-find-pw">
      {!isCertificated ? <CertificateUserPw /> : <EditUserPw />}
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
            disabled={!isSuccess}
            fullWidth
            size="large"
            variant="contained"
            onClick={() => setIsCertificated(true)}
          >
            비밀번호 재설정 하기{' '}
            <ChevronRightIcon aria-hidden fontSize="small" />
          </Button>
        ) : (
          <Button
            type="submit"
            form="edit-pw"
            fullWidth
            size="large"
            variant="contained"
          >
            비밀번호 변경
          </Button>
        )}
      </Box>
    </Stack>
  );
};

export default FindPwSection;
