import React from 'react';

import { Button, Stack, Typography } from '@mui/material';
import { useNavigate, useRouteError } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { ErrorType } from '@/apis/types/error';

// interface ErrorBoundaryProps {
//   children: JSX.Element;
// }

// interface ErrorBoundaryState {
//   hasError: boolean;
// }

//
//
//

// class ErrorBoundary extends React.Component<
//   ErrorBoundaryProps,
//   ErrorBoundaryState
// > {
//   constructor(props: ErrorBoundaryProps) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }

//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
//     console.error('Error caught by componentDidCatch:', error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <Stack
//           width="100vw"
//           height="100vh"
//           alignItems="center"
//           justifyContent="center"
//           gap="2rem"
//         >
//           <Typography fontWeight={700} fontSize="1.75rem">
//             에러가 발생했습니다. 관리자에게 문의해주세요.
//           </Typography>
//           <Button variant="outlined" fullWidth>
//             이전 페이지로 이동
//           </Button>
//         </Stack>
//       );
//     }

//     return this.props.children;
//   }
// }

const ErrorBoundary: React.FC = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  let errorMessage: string;

  if (axios.isAxiosError<ErrorType>(error) && error.response) {
    errorMessage = `${error.response.data.message ?? error.response.status}`;
  } else {
    errorMessage = '알 수 없는 에러';
  }

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
          에러 메시지
        </Typography>
        <Typography>{errorMessage}</Typography>
      </Stack>
      <Button
        fullWidth
        variant="outlined"
        size="large"
        onClick={() => navigate(-1)}
      >
        이전 페이지로 이동
      </Button>
    </Stack>
  );
};

export default ErrorBoundary;
