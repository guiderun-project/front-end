import { Box, Button, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { KAKAO_REDIRECT_URL } from '../../constants/path';

import kakaoImg from '@/assets/kakao_login.png';
import { getKakaoOauthUrl } from '@/utils/login';

const Intro: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Stack
      minHeight="100vh"
      height="100%"
      justifyContent="center"
      alignItems="center"
      gap="4rem"
    >
      <Typography variant="h1" fontSize="2.5rem" fontWeight="500">
        어서오세요!
      </Typography>
      <Stack aria-label="소셜 로그인" gap="1rem" alignItems="center">
        <Typography variant="subtitle1" fontWeight="700">
          3초만에 가입하기
        </Typography>
        <Link aria-label="카카오" to={getKakaoOauthUrl(KAKAO_REDIRECT_URL)}>
          <Box
            component="img"
            src={kakaoImg}
            alt="카카오 로그인 및 회원가입 이미지"
          />
        </Link>
      </Stack>
      <Button
        variant="contained"
        color="warning"
        size="large"
        onClick={() => navigate('/main')}
      >
        메인으로
      </Button>
    </Stack>
  );
};

export default Intro;
