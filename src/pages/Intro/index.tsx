import { Box, Button, Stack, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';

import kakaoImg from '@/assets/kakao_login.png';
import { BROWSER_PATH, KAKAO_REDIRECT_URL } from '@/constants/path';
import { getKakaoOauthUrl } from '@/utils/login';

const Intro: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  //
  //
  //

  return (
    <Stack
      minHeight="100vh"
      height="100%"
      justifyContent="center"
      alignItems="center"
      gap="4rem"
    >
      <Typography variant="h1" fontSize="2.5rem" fontWeight="500">
        <FormattedMessage id="intro.greeting" />
      </Typography>
      <Stack
        aria-label={intl.formatMessage({
          id: 'intro.signup.label',
        })}
        gap="1rem"
        alignItems="center"
      >
        <Typography variant="subtitle1" fontWeight="700">
          <FormattedMessage id="intro.signup" />
        </Typography>
        <Link
          aria-label={intl.formatMessage({
            id: 'intro.signup.kakao',
          })}
          to={getKakaoOauthUrl(KAKAO_REDIRECT_URL)}
        >
          <Box
            component="img"
            src={kakaoImg}
            alt={intl.formatMessage({
              id: 'intro.signup.kakao.alt',
            })}
          />
        </Link>
      </Stack>
      <Button
        variant="contained"
        color="warning"
        size="large"
        onClick={() => navigate(BROWSER_PATH.MAIN)}
      >
        <FormattedMessage id="intro.main.button" />
      </Button>
    </Stack>
  );
};

export default Intro;
