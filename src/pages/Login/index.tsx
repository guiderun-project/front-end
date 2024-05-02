import React from 'react';

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
import { isAxiosError } from 'axios';
import { Helmet } from 'react-helmet-async';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import authApi from '@/apis/requests/auth';
import infoApi from '@/apis/requests/info';
import { LoginPostRequest } from '@/apis/types/auth';
import { ErrorType } from '@/apis/types/error';
import { BROWSER_PATH } from '@/constants/path';
import { setAccessToken } from '@/store/reducer/auth';
import { setUserInfo } from '@/store/reducer/user';
//
//
//

const StyledSubmitButton = styled.button`
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

//
//
//

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { control, formState, handleSubmit, setError } =
    useForm<LoginPostRequest>({
      defaultValues: {
        accountId: '',
        password: '',
      },
    });
  const { isPending, isSuccess, mutate } = useMutation({
    mutationKey: ['loginPost'],
    mutationFn: (loginData: LoginPostRequest) => authApi.loginPost(loginData),
    onSuccess: async (accessToken) => {
      dispatch(setAccessToken(accessToken));
      infoApi
        .userInfoGet()
        .then((res) => {
          dispatch(setUserInfo(res));
          navigate(BROWSER_PATH.MAIN);
        })
        .catch((err) => {
          if (isAxiosError<ErrorType>(err))
            throw Error(err.response?.data.message);
        });
    },
    onError: (error) => {
      if (error.response) {
        const errorCode = error.response.data.errorCode;
        if (errorCode === '0001' || errorCode === '0002') {
          setError('root', {
            message: '아이디 혹은 비밀번호가 일치하지 않습니다.',
          });
        } else {
          alert('에러가 발생했습니다. 다시 시도해주세요.');
        }
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    },
  });

  /**
   *
   */
  const handleLoginSubmit: SubmitHandler<LoginPostRequest> = (loginData) => {
    mutate(loginData);
  };

  //
  //
  //

  return (
    <>
      <Helmet>
        <title>로그인 - Guide run Project</title>
      </Helmet>
      <Stack
        boxSizing="border-box"
        minHeight="100vh"
        height="100%"
        paddingTop="10.375rem"
        paddingBottom="5.125rem"
        alignItems="center"
        justifyContent="space-between"
        gap="7.875rem"
      >
        <Stack alignItems="center" gap="3.75rem">
          <Typography component="h1" fontSize="2.5rem" fontWeight={400}>
            아이디로 로그인
          </Typography>
          <Stack gap="2.5rem">
            <Stack gap="0.25rem">
              {formState.errors.root ? (
                <Typography role="alert" color="error" fontSize="0.875rem">
                  {formState.errors.root.message}
                </Typography>
              ) : null}
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
                      sx={{
                        height: '3.5rem',
                      }}
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
                      color={formState.errors.root ? 'error' : 'primary'}
                      type="password"
                      placeholder="비밀번호"
                      sx={{
                        height: '3.5rem',
                      }}
                    />
                  )}
                />
                <StyledSubmitButton
                  disabled={isPending || isSuccess}
                  type="submit"
                >
                  {isPending || isSuccess ? (
                    <CircularProgress size={14} />
                  ) : (
                    '로그인'
                  )}
                </StyledSubmitButton>
              </StyledLoginForm>
            </Stack>
            <Stack
              component={Link}
              to="/"
              direction="row"
              gap="0.25rem"
              alignItems="center"
              justifyContent="center"
              color="#111"
            >
              {/* TODO: 아이디 비밀번호 찾기 페이지 구현 */}
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
