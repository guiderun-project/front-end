import styled from '@emotion/styled';
import { Typography } from '@mui/material';

import Background from '@/assets/landing-bacground.png';
import { StaggerAnimation } from '@/components/Animations';

export const Description = () => {
  return (
    <Contatiner>
      <Gradient position="top" />
      <StaggerAnimation>
        <p>
          <Typography
            component="span"
            fontWeight={400}
            fontSize="1.125rem"
            lineHeight="28px"
            whiteSpace="break-spaces"
            role="text"
          >
            {`가이드런프로젝트는
시각장애러너와 가이드러너가 함께
같은 목표를 향해 팀으로서 더 체계적으로
훈련할 수 있도록 서포트 합니다.`}
          </Typography>
        </p>
      </StaggerAnimation>
      <Gradient position="bottom" />
    </Contatiner>
  );
};

const Contatiner = styled.div`
  position: relative;
  width: 100%;
  height: 526px;
  background-image: url(${Background});
  background-position: center;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Gradient = styled.div<{ position: 'bottom' | 'top' }>`
  z-index: 0;
  position: absolute;
  height: 60px;
  left: 0;
  right: 0;
  ${({ position }) => position}: 0;
  background: linear-gradient(
    360deg,
    ${({ position }) =>
      position === 'top'
        ? 'rgba(241, 241, 241, 0) 0%, #f1f1f1 100%'
        : '#F1F1F1 0%, rgba(241, 241, 241, 0) 100%'}
  );
`;
