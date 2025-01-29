import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import Background from '@/assets/guiderun-final.png';
import { ArrowRightWhite } from '@/assets/svg';
import { BROWSER_PATH } from '@/constants/path';

export const Final = () => {
  return (
    <Container>
      <ImageBackground aria-hidden />
      <MainContainer>
        <Typography
          component="h2"
          fontSize="1.25rem"
          color="#FFF"
          whiteSpace="break-spaces"
          fontWeight={700}
        >
          {`시각장애러너와 가이드러너\n함께 더 멀리 달려요!`}
        </Typography>
        <LinkButton to={BROWSER_PATH.INTRO}>
          <Typography fontWeight={500} fontSize="0.875rem" color="#FFF">
            가이드런 가입하기
          </Typography>
          <ArrowRightWhite aria-hidden />
        </LinkButton>
      </MainContainer>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 220px;
  position: relative;
  background-color: #000;
  padding: 2.5rem 3.75rem;
`;

const ImageBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(${Background});
  background-size: cover;
  background-position: center;
`;

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  z-index: 1;
`;

const LinkButton = styled(Link)`
  text-decoration: none;
  color: #fff;
  height: 50px;
  padding-right: 1rem;
  padding-left: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border: 1.5px solid #fff;
  border-radius: 1000px;
`;
