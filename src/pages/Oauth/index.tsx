import { Stack } from '@mui/material';
import Lottie from 'lottie-react';

import runningLottie from '@/assets/running_lottie.json';

const Oauth: React.FC = () => {
  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh">
      <Lottie
        alt="로딩 이미지"
        height="5rem"
        width="5rem"
        animationData={runningLottie}
      />
    </Stack>
  );
};

export default Oauth;
