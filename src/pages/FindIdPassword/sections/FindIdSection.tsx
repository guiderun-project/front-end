import React from 'react';

import { Box, Button, Stack } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Mutation, useMutation, useMutationState } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { BROWSER_PATH } from '@/constants/path';

import CertificateUserId from './id/CertificateUserId';
import UserIdInfo from './id/UserIdInfo';
import {
  CheckCertificationTokenPostResponse,
  GetUserIdPostRequest,
} from '@/apis/types/auth';
import authApi from '@/apis/requests/auth';
import { useQueryClient } from '@tanstack/react-query';

const FindIdSection = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['getUserIdPost'],
    mutationFn: (data: GetUserIdPostRequest) => authApi.getUserIdPost(data),
  });
  const [idTokenState] = useMutationState({
    filters: { mutationKey: ['findIdToken'] },
    select: (mutation) => {
      return {
        isSuccess: mutation.state.status === 'success',
        token: mutation.state.data as string,
      };
    },
  });

  return (
    <Stack id="tabpanel-find-id" role="tabpanel" aria-labelledby="tab-find-id">
      {!isSuccess ? <CertificateUserId /> : <UserIdInfo />}
      <Box
        display="flex"
        justifyContent="center"
        position="fixed"
        bottom="7.125rem"
        left={0}
        right={0}
      >
        {!isSuccess ? (
          <Button
            disabled={!idTokenState?.isSuccess || isPending}
            fullWidth
            size="large"
            variant="contained"
            onClick={() => {
              if (idTokenState?.token) {
                mutate({ token: idTokenState.token });
              }
            }}
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
