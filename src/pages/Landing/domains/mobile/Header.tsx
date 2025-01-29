import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { Typography } from '@mui/material';

import { Line, TextLogo } from '@/assets/svg';
import { StaggerAnimation } from '@/components/Animations';

export const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const requestRef = useRef<number | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScroll = () => {
      setScrollY(window.scrollY);
      ticking.current = false; // 다시 다음 프레임에 업데이트하도록 풀어줍니다.
    };

    const handleScroll = () => {
      // 매 프레임마다 한 번씩만 실행하도록 제한
      if (!ticking.current) {
        requestRef.current = requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const scrollProgress = Math.min(scrollY / 400, 1);

  const initialWidth = window.innerWidth * 0.9;
  const initilaTop = 300;
  const initialLeft = (window.innerWidth * 0.1) / 2;
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

  return (
    <Container>
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
