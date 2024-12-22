import React, { PropsWithChildren } from 'react';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

interface StaggerAnimationBoxProps extends PropsWithChildren {}

export const StaggerAnimation = ({ children }: StaggerAnimationBoxProps) => {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <Wrapper index={index}>{child}</Wrapper>
      ))}
    </>
  );
};

const StaggerAnimationKeyframes = keyframes`
  0% {
    transform: translateY(60px);
  }
  100% {
    transform: translateY(0);
  }   
`;

const OpacityAnimationKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }`;

const Wrapper = styled.div<{ index: number }>`
  position: relative;
  animation:
    ${StaggerAnimationKeyframes} 1s ${({ index }) => index * 0.1}s
      cubic-bezier(0.2, 0, 0.2, 1) both,
    ${OpacityAnimationKeyframes} 0.7s ${({ index }) => index * 0.1}s both;
`;
