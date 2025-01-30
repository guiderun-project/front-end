import styled from '@emotion/styled';
import { Stack, Typography } from '@mui/material';

import { ArrowRight, WorkOut } from '@/assets/svg';

export const Together = () => {
  return (
    <Container>
      <Stack paddingLeft="5px" gap="0.9375rem">
        <Typography component="h2" fontSize="0.8125rem" fontWeight={700}>
          함께 달리기
        </Typography>
        <Typography fontSize="2rem" fontWeight={700} whiteSpace="break-spaces">
          {`프로그램이 없을 때에도\n매주 일요일 아침\n`}
          <Stack direction="row" alignItems="center">
            {`함께 모여 `}
            <WorkOut aria-hidden />
            {' 운동해요!'}
          </Stack>
        </Typography>
      </Stack>
      <ContactButton href="https://pf.kakao.com/_YpkDG" target="_blank">
        <Typography fontSize="0.875rem" fontWeight={400}>
          문의하러 가기
        </Typography>
        <ArrowRight aria-hidden />
      </ContactButton>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-top: 120px;
  padding-bottom: 100px;
  padding-left: 15px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`;

const ContactButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1.5px solid #111;
  border-radius: 1000px;
  padding: 0 1.5rem;
  height: 53px;

  text-decoration: none;
  color: #111;
`;
