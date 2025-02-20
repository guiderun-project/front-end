import React, { useEffect, useRef, useMemo } from 'react';

import styled from '@emotion/styled';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import authApi from '@/apis/requests/auth';
import { LoginPostRequest } from '@/apis/types/auth';
import { PageTitle } from '@/components/shared';
import { BROWSER_PATH, PREV_PATH_KEY } from '@/constants/path';
import { RootState } from '@/store/index';
import { setAccessToken } from '@/store/reducer/auth';

const StyledSubmitButton = styled.button`
  color: #000;
  max-width: 18.4375rem;
  width: 100%;
  height: 3.25rem;
  border: 1px solid #111;
  padding: 0.625rem 1.5rem;
  border-radius: 10000px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9375rem;
  font-weight: 600;
  background-color: inherit;
  cursor: pointer;
  transition: 0.1s all ease-in;

  &:hover {
    background-color: #e8e8e8;
  }

  &:disabled {
    cursor: default;
    transition: none;
    &:hover {
      background-color: inherit;
    }
  }
`;

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  max-width: 19.6875rem;
`;

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultValues = useMemo(
    () => ({
      accountId: '',
      password: '',
    }),
    [],
  );

  const { control, formState, handleSubmit, setError } =
    useForm<LoginPostRequest>({
      defaultValues,
    });

  const { isPending, isSuccess, mutate } = useMutation({
    mutationKey: ['loginPost'],
    mutationFn: (loginData: LoginPostRequest) => authApi.loginPost(loginData),
    onSuccess: async (token) => {
      dispatch(setAccessToken(token)); 
    },
    onError: (error) => {
      if (error.response) {
        const errorCode = error.response.data.errorCode;
        setError('root', {
          message:
            errorCode === '0001' || errorCode === '0002'
              ? '아이디 혹은 비밀번호가 일치하지 않습니다.'
              : '에러가 발생했습니다. 다시 시도해주세요.',
        });

        inputRef.current?.focus();
      }
    },
  });

  const handleLoginSubmit: SubmitHandler<LoginPostRequest> = (loginData) => {
    mutate(loginData);
  };

  useEffect(() => {
    if (accessToken && isSuccess) {
      const prevPath = window.localStorage.getItem(PREV_PATH_KEY);
      window.localStorage.removeItem(PREV_PATH_KEY);
      navigate(prevPath || BROWSER_PATH.MAIN, { replace: true });
    }
  }, [accessToken, isSuccess, navigate]);

  return (
    <>
      <PageTitle title="로그인" />
      <Stack
        minHeight="100vh"
        paddingY="10.375rem"
        alignItems="center"
        justifyContent="space-between"
        gap="7.875rem"
      >
        <Stack alignItems="center" gap="3.75rem">
          <Typography component="h1" fontSize="2.5rem" fontWeight={400}>
            아이디로 로그인
          </Typography>
          <Stack gap="2.5rem">
            {formState.errors.root && (
              <Typography role="alert" color="error" fontSize="0.875rem">
                {formState.errors.root.message}
              </Typography>
            )}
            <StyledLoginForm onSubmit={handleSubmit(handleLoginSubmit)}>
              <Controller
                name="accountId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    required
                    fullWidth
                    inputRef={inputRef}
                    color={formState.errors.root ? 'error' : 'primary'}
                    autoComplete="off"
                    placeholder="아이디"
                    sx={{ height: '3.5rem' }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    type="password"
                    placeholder="비밀번호"
                    sx={{ height: '3.5rem' }}
                  />
                )}
              />
              <StyledSubmitButton disabled={isPending} type="submit">
                {isPending ? <CircularProgress size={14} /> : '로그인'}
              </StyledSubmitButton>
            </StyledLoginForm>
          </Stack>
          <Stack
            component={Link}
            to={BROWSER_PATH.FIND_ID_PASSWORD}
            direction="row"
            alignItems="center"
            justifyContent="center"
            color="#111"
          >
            <Typography
              fontSize="0.875rem"
              fontWeight={500}
              sx={{
                textDecoration: 'underline',
                textUnderlinePosition: 'under',
              }}
            >
              아이디/비밀번호를 잊으셨나요?
            </Typography>
            <ChevronRightIcon aria-hidden fontSize="small" />
          </Stack>
        </Stack>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => navigate(BROWSER_PATH.MAIN)}
        >
          <FormattedMessage id="intro.main.button" />
        </Button>
      </Stack>
    </>
  );
};

export default Login;
