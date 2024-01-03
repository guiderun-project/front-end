import { Button, Stack, Typography } from '@mui/material';

import Header from './components/Header';

const SignupComplete: React.FC = () => {
  return (
    <Stack
      minHeight="100vh"
      justifyContent="space-around"
      alignItems="center"
      gap="2.5rem"
    >
      <Header>가입 완료</Header>
      <Typography fontSize="2.5rem" fontWeight={400} textAlign="center">
        팀편성이
        <br /> 진행중입니다.
      </Typography>
      <Stack aria-label="시각장애유무 버튼 박스" gap="1rem" width="100%">
        <Button variant="contained" size="large" fullWidth>
          내가 제출한 정보 확인하기
        </Button>
        <Button variant="contained" size="large" fullWidth>
          마이 페이지
        </Button>
      </Stack>
    </Stack>
  );
};

export default SignupComplete;
