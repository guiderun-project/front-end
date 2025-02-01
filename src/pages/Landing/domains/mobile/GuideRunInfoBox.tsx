import { useState, useRef, useEffect } from 'react';

import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Divider, Stack, Typography } from '@mui/material';

import { GuideRunInfo } from './GuideRun';

import { ArrowRightSmall, ArrowRightUp } from '@/assets/svg';

interface GuideRunInfoBoxProps {
  info: GuideRunInfo;
  open: boolean;
  onChangeOpen: VoidFunction;
}

export const GuideRunInfoBox = ({
  info,
  open,
  onChangeOpen,
}: GuideRunInfoBoxProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const contentId = `guiderun-content-${info.link}`;

  useEffect(() => {
    if (open && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [open, info]);

  return (
    <Container>
      <TitleWrapper
        onClick={onChangeOpen}
        aria-expanded={open}
        aria-controls={contentId}
      >
        <Title open={open}>{info.title}</Title>
        <ArrowIcon open={open} />
      </TitleWrapper>
      <AnimatedContent
        id={contentId}
        open={open}
        contentHeight={contentHeight}
        aria-hidden={!open}
      >
        <div ref={contentRef}>
          <Stack paddingRight="0.75rem" gap="0.75rem" alignItems="flex-end">
            <Typography
              fontWeight={100}
              color="#CCC"
              textAlign="end"
              whiteSpace="break-spaces"
            >
              {info.content}
            </Typography>
            <Link href={info.link}>
              <Typography fontWeight={600} color="#FFF">
                {info.linkLabel}
              </Typography>
              <ArrowRightSmall />
            </Link>
          </Stack>
        </div>
      </AnimatedContent>
      <StyledDivider aria-hidden="true" open={open} />
    </Container>
  );
};

const FadeIn = keyframes`
    0% {
        opacity: 0;
        width: 0%;
    }
    100% {
        opacity: 1;
        width: 100%;
    }
`;

const FadeOut = keyframes`
    0% {
        opacity: 1;
        width: 100%;
    }
    100% {
        opacity: 0;
        width: 0%;
    }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  z-index: 1;
`;

const TitleWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
  padding-right: 0.125rem;
`;

const Title = styled.h3<{ open: boolean }>`
  font-size: 2rem;
  font-weight: 100;
  color: #fff;
  transform: ${({ open }) => (open ? 'scale(0.875)' : 'scale(1)')};
  transform-origin: right;
  transition: transform 0.2s ease-in-out;
`;

const Link = styled.a`
  text-decoration: none;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
  padding-right: 5px;
  padding-bottom: 3px;
  border-bottom: 0.5px solid #aaa;
  margin-bottom: 0.125rem;

  &:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
`;

const AnimatedContent = styled.div<{ open: boolean; contentHeight: number }>`
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  max-height: ${({ open, contentHeight }) =>
    open ? `${contentHeight}px` : '0'};
`;

const StyledDivider = styled(Divider)<{ open: boolean }>`
  margin-top: -1rem;
  border-color: #aaa;
  ${({ open }) => {
    if (open) {
      return css`
        animation: ${FadeOut} 0.2s ease-in both;
      `;
    }
    return css`
      animation: ${FadeIn} 0.2s ease-in both;
    `;
  }}
`;

const ArrowIcon = styled(ArrowRightUp)<{ open: boolean }>`
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'rotate(90deg)' : 'rotate(0deg)')};
`;
