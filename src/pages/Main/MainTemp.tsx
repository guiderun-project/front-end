import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';

import guideRunImg from '@/assets/guide_running_image.png';
import instagramImg from '@/assets/instagram_image.png';
import backgroundImg from '@/assets/intro_background_image.jpg';

const StyledContainer = styled.div`
  box-sizing: border-box;
  max-width: 100vw;
  height: 100%;
  min-height: 100vh;

  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.8);
  background-blend-mode: multiply;

  padding: 6.25rem 9.375rem 9.375rem 9.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rem;

  * {
    font-family: 'Happiness-Sans-Bold', 'pretendard', sans-serif;
    color: #fff;
  }

  a {
    text-decoration: none;
  }

  @media screen and (max-width: 426px) {
    padding: 1.875rem;
    gap: 8rem;
  }
`;

const StyledTitle = styled.h1`
  font-weight: 900;
  font-size: 3rem;
  text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.14);
  color: #31a9ff;
  text-align: center;

  @media screen and (max-width: 426px) {
    font-size: 2rem;
  }
`;

const StyledSubTitle = styled.h3`
  font-family: 'Happiness-Sans-regular', 'pretendard', sans-serif;
  font-size: 2rem;
  font-weight: 400;
  opacity: 0.6;
  text-align: center;
  @media screen and (max-width: 426px) {
    font-size: 1.125rem;
  }
`;

const StyledLoading = styled.h1`
  font-weight: 900;
  font-size: 4rem;
  text-align: center;
  @media screen and (max-width: 426px) {
    font-size: 2rem;
  }
`;

const MainTemp: React.FC = () => {
  return (
    <StyledContainer>
      <Stack gap="1rem" alignItems="center">
        <StyledTitle>Guide-run project</StyledTitle>
        <StyledSubTitle>가이드런 프로젝트</StyledSubTitle>
      </Stack>
      <Stack gap="1.5rem" alignItems="center">
        <StyledLoading>
          현재 사이트 오픈을 열심히 준비중 입니다 :)
        </StyledLoading>
        <StyledSubTitle>
          시각장애러너가 운동에 더 편리하게 접근할 수 있도록 서비스를 개발중
          입니다.
        </StyledSubTitle>
      </Stack>
      <Stack alignItems="center" gap="2.5rem">
        <Typography
          component="h1"
          fontWeight={700}
          sx={{
            fontSize: {
              xs: '1.5rem',
              md: '2.5rem',
            },
          }}
        >
          가이드런 프로젝트는,
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap="1.25rem">
          <Stack padding="0.625rem" gap="1rem" alignItems="center">
            <Typography
              component="h2"
              fontWeight={400}
              sx={{
                fontSize: {
                  xs: '1.125rem',
                  md: '1.5rem',
                },
              }}
            >
              🌏 Vision
            </Typography>
            <Typography
              component="p"
              fontSize="1.5rem"
              textAlign="center"
              lineHeight="2.3125rem"
              sx={{
                fontSize: {
                  xs: '1.125rem',
                  md: '1.5rem',
                },
              }}
            >
              우리는 “장애”가 장벽이 아닌
              <br />
              사람들의 지평을 넓히는 창으로
              <br />
              인식되는 세상을 만듭니다.
            </Typography>
            <Typography
              component="p"
              textAlign="center"
              lineHeight="1.75rem"
              fontSize="1.25rem"
              sx={{
                opacity: 0.6,
                fontSize: {
                  xs: '1rem',
                  md: '1.25rem',
                },
              }}
            >
              We make a world where a "disability" is
              <br /> accepted not as a barrier, but as a window
              <br /> that expands each one’s horizons.
            </Typography>
          </Stack>
          <Stack padding="0.625rem" gap="1rem" alignItems="center">
            <Typography
              component="h2"
              fontSize="1.5rem"
              fontWeight={400}
              sx={{
                fontSize: {
                  xs: '1.125rem',
                  md: '1.5rem',
                },
              }}
            >
              📝 Mission
            </Typography>
            <Typography
              component="p"
              textAlign="center"
              lineHeight="2.3125rem"
              sx={{
                fontSize: {
                  xs: '1.125rem',
                  md: '1.5rem',
                },
              }}
            >
              “시각장애러너의 러닝 기회 확대”를
              <br />
              목표로 시각장애러너를 위한
              <br />
              러닝 커뮤니티를 구축합니다.
              <br />
            </Typography>
            <Typography
              component="p"
              textAlign="center"
              lineHeight="1.75rem"
              fontSize="1.25rem"
              sx={{
                opacity: 0.6,
                fontSize: {
                  xs: '1rem',
                  md: '1.25rem',
                },
              }}
            >
              We build a running community based on <br /> voluntary
              participation aiming for more
              <br /> opportunities to run for Blind runners.
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack alignItems="center" gap="5rem" maxWidth="50rem">
        <Typography
          component="h1"
          fontSize="2rem"
          fontWeight={700}
          sx={{
            fontSize: {
              xs: '1.5rem',
              md: '2.5rem',
            },
          }}
        >
          우리는 현재,
        </Typography>
        <Stack gap="3.75rem">
          <Stack
            direction="row"
            gap="2.5rem"
            alignItems="center"
            justifyContent="center"
            sx={{
              flexWrap: {
                xs: 'wrap',
                md: 'nowrap',
              },
            }}
          >
            <Box
              component="img"
              src={guideRunImg}
              alt="러닝 프로그램 현장 사진"
              width="10rem"
            />
            <Stack gap="1rem">
              <Typography
                component="p"
                fontWeight={700}
                whiteSpace="break-spaces"
                sx={{
                  fontSize: {
                    xs: '1.125rem',
                    md: '1.5rem',
                  },
                }}
              >
                런콥 컴퍼니와 함께 2024년 서울마라톤 대비 시각장애러너를 위한
                10주 훈련 프로그램을 진행하고 있습니다.
              </Typography>
              <Typography
                component="p"
                fontWeight={400}
                whiteSpace="break-spaces"
                sx={{
                  opacity: 0.6,
                  fontSize: {
                    xs: '1rem',
                    md: '1.25rem',
                  },
                }}
              >
                A 10-week training project for the 2024 Seoul Marathon is
                ongoing for blind runners with Run-cop Company.
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            flexWrap="wrap"
            gap="2.5rem"
            alignItems="center"
            justifyContent="center"
            sx={{
              flexWrap: {
                xs: 'wrap',
                md: 'nowrap',
              },
            }}
          >
            <Box
              component="img"
              src={instagramImg}
              alt="운영 중인 인스타그램 캡쳐본"
              width="10rem"
            />
            <Stack gap="1rem">
              <Typography
                component="p"
                fontWeight={700}
                whiteSpace="break-spaces"
                sx={{
                  fontSize: {
                    xs: '1.125rem',
                    md: '1.5rem',
                  },
                }}
              >
                인스타그램{' '}
                <a
                  href="https://www.instagram.com/guide_run_ko"
                  target="_blank"
                  aria-label="인스타그램으로 이동"
                >
                  @guide_run_ko
                </a>{' '}
                계정을 통해 소통하고 있습니다.
              </Typography>
              <Typography
                component="p"
                fontSize="1.25rem"
                fontWeight={400}
                whiteSpace="break-spaces"
                sx={{
                  opacity: 0.6,
                  fontSize: {
                    xs: '1rem',
                    md: '1.25rem',
                  },
                }}
              >
                Instagram account{' '}
                <a
                  href="https://www.instagram.com/guide_run_ko"
                  target="_blank"
                  aria-label="인스타그램으로 이동"
                >
                  @guide_run_ko
                </a>{' '}
                is our main communication tool for our community.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </StyledContainer>
  );
};

export default MainTemp;
