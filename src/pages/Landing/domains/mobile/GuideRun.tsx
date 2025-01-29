import { useState } from 'react';

import styled from '@emotion/styled';
import { Stack, Typography } from '@mui/material';

import { GuideRunInfoBox } from './GuideRunInfoBox';

import GuideRunImage from '@/assets/guiderun-background.png';

export interface GuideRunInfo {
  title: string;
  content: string;
  link: string;
  linkLabel: string;
}

const CONTENTS: GuideRunInfo[] = [
  {
    title: '가이드런프로젝트',
    link: 'https://guiderun.notion.site/1be51d244ec342b585e9b78f39ec4628',
    linkLabel: '가이드런프로젝트에 대하여',
    content: `가이드런프로젝트는 달리기를 통해
장애인과 비장애인이 함께 성취를 이루고,
그 과정 중에 더불어 살아가는 사회를
더 나은 세상을 만들기 위해 함께 모인
러닝 커뮤니티 입니다.`,
  },
  {
    title: '가이드런서비스',
    link: 'https://guiderun.org/intro',
    linkLabel: '가이드런서비스 바로가기',
    content: `우리는 시각장애러너와 가이드러너가
쉽게 파트너를 찾고 뛸 수 있도록,
어느 곳에도 얽메이지 않고 자유롭게 뛸 수 있도록
서비스를 기획, 개발하고 있습니다.`,
  },
  {
    title: '크라우드펀딩',
    link: 'https://happybean.naver.com/fundings/detail/F1677',
    linkLabel: '최근 크라우드펀딩 구경하기',
    content: `우리는 프로그램 운영비 마련을 위해
크라우드펀딩을 진행합니다.
이렇게 모금과 참여를 분리함으로써,
커뮤니티의 범위를 확장하고
프로그램 참가자들의 심적 접근성을 낮춥니다.`,
  },
];

export const GuideRun = () => {
  const [currentOpen, setCurrentOpen] = useState(-1);

  return (
    <Container>
      <ImageBackground aria-hidden />
      <Stack position="absolute" top="270px" left="80px" gap="1rem">
        <Typography
          component="h2"
          color="#fff"
          fontSize="0.8125"
          fontWeight={700}
        >
          가이드런 프로젝트
        </Typography>
        <Typography
          color="#fff"
          fontSize="1.125rem"
          fontWeight={700}
          whiteSpace="break-spaces"
        >
          {`가이드러닝은 신체적 건강 뿐만 아니라
정신적으로도 성장하는
새로운 달리기 문화입니다.`}
        </Typography>
      </Stack>
      <Stack
        padding="0 1.25rem"
        paddingTop="477.5px"
        paddingBottom="2rem"
        gap="1rem"
      >
        {CONTENTS.map((info, index) => (
          <GuideRunInfoBox
            key={info.title}
            info={info}
            open={index === currentOpen}
            onChangeOpen={() => {
              if (index === currentOpen) {
                setCurrentOpen(-1);
                return;
              }
              setCurrentOpen(index);
            }}
          />
        ))}
      </Stack>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 825px;
  background-color: #111;
`;

const ImageBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(${GuideRunImage});
  background-position: center;
  background-size: cover;
`;
