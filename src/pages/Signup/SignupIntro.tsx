import { Button, Stack, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import Header from './components/Header';

const SignupIntro: React.FC = () => {
  const [, setSearchparams] = useSearchParams();

  /**
   *
   */
  const handleTypeSelect = (type: 'vi' | 'guide') => () => {
    setSearchparams({ type });
  };

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
      <Header>가입하기</Header>
      <Typography variant="h3" fontWeight={700}>
        저는,
      </Typography>
      <Stack aria-label="시각장애유무 버튼 박스" gap="1rem" width="100%">
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleTypeSelect('vi')}
        >
          시각장애 러너입니다.
        </Button>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleTypeSelect('guide')}
        >
          가이드 러너입니다.
        </Button>
      </Stack>
    </Stack>
  );
};

export default SignupIntro;
