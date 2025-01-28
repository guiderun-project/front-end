import styled from '@emotion/styled';

import { Program, ProgramItem } from './ProgramItem';

import Summer2024 from '@/assets/2024-summer-background.png';
import Winter2024 from '@/assets/2024-winter-background.png';
import Winter2025 from '@/assets/2025-winter-background.png';

const PROGRAMS: Program[] = [
  {
    name: '10주 훈련 프로그램',
    year: 2024,
    season: 'winter',
    period: {
      start: '2024년 1월 7일',
      end: '3월 10일',
    },
    location: '반포종합운동장, 남산 북측 순환로, 상암 하늘공원 등',
    staff: '런콥 컴퍼니(박명현 감독 및 산하 코치진)',
    description: '2024 서울 마라톤을 대비한 포인트 훈련',
    image: Winter2024,
    link: 'https://docs.google.com/document/d/1ARjoYswhYKzjTCUSSk0Z820zdMp3a7stpXxWuxFZ9Jo/edit?usp=sharing',
    result: `총 참석인원 : 총 평균 51명 참가
(VI 18명, G 33명)`,
  },
  {
    name: '16주 훈련 프로그램',
    year: 2024,
    season: 'summer',
    period: {
      start: '2024년 7월 14일',
      end: '10월 27일',
    },
    location: '반포종합운동장, 반포천~한강공원',
    staff: '런콥 컴퍼니(박명현 감독 및 산하 코치진)',
    description: '매주 일요일 아침에 다같이 모여 추계 마라톤 함께 준비',
    image: Summer2024,
    link: 'https://drive.google.com/file/d/14DsvINSPuh_2OQUq3pxFfxkC1jcDdrJp/view?usp=sharing',
    result: `총 참석인원 :
 • Part 1 : 평균 약 45명(VI:17/G:28)
 • Part 2 : 평균 34명(VI:14.5/G:19.5)
 • Part 3 : 평균 약 22명(VI:9/G:13.5)`,
  },
  {
    name: '12주 훈련 프로그램',
    year: 2025,
    season: 'winter',
    period: {
      start: '2024년 12월 22일',
      end: '2025년 3월 9일',
    },
    location: '반포종합운동장, 남산 북측 순환로, 상암 하늘공원 등',
    staff: '런콥 컴퍼니(박명현 감독 및 산하 코치진)',
    description: '매주 일요일 아침에 다같이 모여 25년 춘계 마라톤 함께 준비',
    image: Winter2025,
  },
];

export const ProgramList = () => {
  return (
    <Container>
      {PROGRAMS.map((program) => (
        <ProgramItem
          key={`${program.name}-${program.year}`}
          program={program}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  padding: 0.625rem 1.125rem;
  display: flex;
  gap: 0.625rem;
  align-items: center;

  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
