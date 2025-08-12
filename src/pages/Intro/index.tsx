import { useEffect } from 'react';

import styled from '@emotion/styled';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import kakaoLogo from '@/assets/kakao-login-logo.png';
import { PageTitle } from '@/components/shared';
import { BROWSER_PATH, KAKAO_REDIRECT_URL } from '@/constants/path';
import { resetAccessToken } from '@/store/reducer/auth';
import { getKakaoOauthUrl } from '@/utils/login';

const StyledLoginButton = styled(Link)`
  display: flex;
  height: 2.75rem;
  width: 100%;
  max-width: 18.4375rem;
  background-color: #fee500;
  border-radius: 0.25rem;
  text-decoration: none;
  color: #000;
`;

const Intro: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    dispatch(resetAccessToken());
    queryClient.resetQueries({ queryKey: ['accessTokenGet'] });
    queryClient.resetQueries({ queryKey: ['userInfoGet'] });
  }, []);

  //
  //
  //

  return (
    <>
      <PageTitle title="시작하기" />
      <Stack
        boxSizing="border-box"
        minHeight="100vh"
        height="100%"
        justifyContent="space-between"
        alignItems="center"
        paddingTop="13.875rem"
        paddingBottom="5.125rem"
      >
        <Stack gap="2.5rem" alignItems="center" width="100%">
          <Typography
            component="h1"
            variant="h1"
            fontSize="2.5rem"
            fontWeight="500"
          >
            <FormattedMessage id="intro.greeting" />
          </Typography>
          <Stack
            aria-label={intl.formatMessage({
              id: 'intro.signup.label',
            })}
            gap="1.5rem"
            alignItems="center"
            width="100%"
          >
            <Typography variant="subtitle1" fontWeight="700">
              <FormattedMessage id="intro.signup" />
            </Typography>
            <StyledLoginButton
              aria-label={intl.formatMessage({
                id: 'intro.signup.kakao',
              })}
              to={getKakaoOauthUrl(KAKAO_REDIRECT_URL)}
            >
              <Stack
                height="2.75rem"
                width="2.75rem"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <img src={kakaoLogo} alt="" width={16} height={15} />
              </Stack>
              <Typography
                component="div"
                height="100%"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="0.875rem"
              >
                카카오 계정으로 로그인
              </Typography>
            </StyledLoginButton>
          </Stack>
          <Typography
            role="link"
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontSize="0.875rem"
            fontWeight={500}
            onClick={() => navigate(BROWSER_PATH.LOGIN)}
            sx={{
              textDecoration: 'underline',
              textUnderlinePosition: 'under',
              cursor: 'pointer',
            }}
          >
            ID/PW로 로그인 <ChevronRightIcon aria-hidden fontSize="small" />
          </Typography>
        </Stack>
        <Button
          component="a"
          target="_blank"
          href="https://about.guidrun.org"
          variant="contained"
          size="large"
          fullWidth
        >
          {`가이드런프로젝트에 대해서  >`}
        </Button>
      </Stack>
    </>
  );
};

export default Intro;
