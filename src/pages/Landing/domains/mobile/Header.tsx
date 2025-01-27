import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { Typography } from '@mui/material';

import { Line, TextLogo } from '@/assets/svg';
import { StaggerAnimation } from '@/components/Animations';

export const Header = () => {
  const [scrollY, setScrollY] = useState(0);

  const scrollProgress = Math.min(scrollY / 400, 1);

  const initialWidth = window.innerWidth * 0.9;
  const initilaTop = 300;
  const initialLeft = 25;
  const initialGap = 1.125;

  const targerWidth = 111;
  const targetTop = 20;
  const targetLeft = 20;
  const targetGap = 0;

  const bigLogoWidth =
    initialWidth - scrollProgress * (initialWidth - targerWidth);
  const bigLogoTop = initilaTop - scrollProgress * (initilaTop - targetTop);
  const bigLogoLeft = initialLeft - scrollProgress * (initialLeft - targetLeft);
  const bigLogoGap = initialGap - scrollProgress * (initialGap - targetGap);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container>
      {scrollProgress !== 1 ? (
        <SmallLogo
          aria-hidden
          top={targetTop}
          left={targetLeft}
          width={targerWidth}
        />
      ) : null}
      <BigLogoWrapper
        style={{
          top: bigLogoTop,
          left: bigLogoLeft,
          gap: `${bigLogoGap}rem`,
        }}
      >
        <StaggerAnimation>
          <TitleWrapper
            style={{
              opacity: 1 - scrollProgress * 2,
              transform: `scale(${1 - scrollProgress})`,
              height: 24 - scrollProgress * 24,
            }}
          >
            <Typography fontWeight={300}>함께 더 멀리 달려요</Typography>
            <Line aria-hidden width={40} />
            <Typography fontWeight={300}>가이드런 프로젝트</Typography>
          </TitleWrapper>
          <BigLogo aria-hidden width={bigLogoWidth} />
        </StaggerAnimation>
      </BigLogoWrapper>
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  height: 450px;
  background-color: #f2f2f2;
  z-index: 100;
`;

const SmallLogo = styled(TextLogo)<{
  top: number;
  left: number;
  width: number;
}>`
  position: fixed;
  top: ${({ top }) => top}px;
  left: ${(left) => left}px;
  width: ${({ width }) => width}px;
  z-index: 100;
`;

const TitleWrapper = styled.h1`
  display: flex;
  align-items: center;
  gap: 1rem;
  transform-origin: left;
  z-index: 100;
`;

const BigLogoWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 100;
`;

const BigLogo = styled(TextLogo)<{ width: number }>`
  width: ${({ width }) => width}px;
  z-index: 100;
`;
