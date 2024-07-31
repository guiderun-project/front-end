import React, { PropsWithChildren, ReactNode } from 'react';

import { Button, Stack, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { ErrorType } from '@/apis/types/error';
import { BROWSER_PATH } from '@/constants/path';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  status?: number;
  errorMessage?: string;
  errorCode?: string;
}

class ErrorBoundary extends React.Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(
    error: AxiosError<ErrorType>,
  ): ErrorBoundaryState {
    return {
      hasError: true,
      status: error.status,
      errorMessage: error.response?.data.message ?? '알 수 없는 에러',
      errorCode: error.response?.data.errorCode,
    };
  }

  render() {
    if (this.state.hasError && this.props.fallback) {
      return this.props.fallback;
    }
    if (this.state.hasError) {
      return (
        <Stack
          width="100vw"
          height="100vh"
          alignItems="center"
          justifyContent="center"
          gap="2rem"
        >
          <Typography role="alert" fontWeight={700} fontSize="1.75rem">
            에러가 발생했습니다. 관리자에게 문의해주세요.
          </Typography>
          <Stack component="caption" alignItems="center" padding="2rem">
            <Typography component="h2" fontSize="1.25rem" fontWeight={700}>
              {this.state.status} 에러
            </Typography>
            <Typography>{this.state.errorMessage}</Typography>
          </Stack>
          <Stack alignItems="center" gap="2rem">
            <Button
              component={Link}
              to={'..'}
              fullWidth
              variant="outlined"
              size="large"
            >
              이전 페이지로 이동
            </Button>
            <Button
              component={Link}
              to={BROWSER_PATH.MAIN}
              fullWidth
              variant="outlined"
              size="large"
            >
              메인 페이지로 이동
            </Button>
          </Stack>
        </Stack>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
