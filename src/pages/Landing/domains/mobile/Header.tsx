import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { Typography } from '@mui/material';

import { Line, TextLogo } from '@/assets/svg';

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
      {scrollProgress !== 1 ? <SmallLogo aria-hidden /> : null}
      <BigLogoWrapper
        style={{
          top: bigLogoTop,
          left: bigLogoLeft,
          gap: `${bigLogoGap}rem`,
        }}
      >
        <TitleWrapper
          style={{
            opacity: 1 - scrollProgress * 2,
            transform: `scale(${1 - scrollProgress})`,
            height: 24 - scrollProgress * 24,
          }}
        >
          <Typography fontWeight={300}>함께 더 멀리 달려요</Typography>
          <Line width={40} />
          <Typography fontWeight={300}>가이드런 프로젝트</Typography>
        </TitleWrapper>
        <BigLogo aria-hidden width={bigLogoWidth} />
      </BigLogoWrapper>
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  height: 450px;
  background-color: #f2f2f2;
`;

const SmallLogo = styled(TextLogo)`
  position: fixed;
  top: 20px;
  left: 20px;
  width: 111px;
`;

const TitleWrapper = styled.h1`
  display: flex;
  align-items: center;
  gap: 1rem;
  transform-origin: left;
`;

const BigLogoWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
`;

const BigLogo = styled(TextLogo)<{ width: number }>`
  width: ${({ width }) => width}px;
`;
