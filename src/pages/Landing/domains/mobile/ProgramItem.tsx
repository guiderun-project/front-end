import styled from '@emotion/styled';
import { Stack, Typography } from '@mui/material';

export interface Program {
  name: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  year: number;
  period: {
    start: string;
    end: string;
  };
  description: string;
  location: string;
  staff: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  link?: string;
  result?: string;
}

export const ProgramItem = ({ program }: { program: Program }) => {
  const getFormattedSeason = (season: Program['season']) => {
    switch (season) {
      case 'spring':
        return '춘계';
      case 'summer':
        return '하계';
      case 'fall':
        return '추계';
      case 'winter':
        return '동계';
    }
  };

  return (
    <>
      <Container image={program.image}>
        <Stack gap="0.5rem" alignItems="flex-start">
          <Stack direction="row" gap="0.5rem">
            <YearBox>{program.year}</YearBox>
            <SeasonBox season={program.season}>
              {getFormattedSeason(program.season)}
            </SeasonBox>
          </Stack>
          <Typography color="#FFF" fontSize="1.5rem" fontWeight={700}>
            {program.name}
          </Typography>
          <Typography
            color="#FFF"
            fontSize="0.875rem"
            fontWeight={400}
          >{`${program.period.start} ~ ${program.period.end}`}</Typography>
        </Stack>
      </Container>
    </>
  );
};

const Container = styled.button<{ image: string }>`
  display: flex;
  box-sizing: border-box;
  padding: 2.25rem 1.875rem;
  flex-shrink: 0;
  width: 290px;
  height: 370px;
  border-radius: 0.5rem;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;

  cursor: pointer;
`;

const YearBox = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18px;
  padding: 1px 5px;
  border-radius: 2px;
  background-color: #d2d2d2;
  color: #b51f1f;
  font-size: 0.75rem;
  font-weight: 400;
  font-family: fira-code, pretendard, sans-serif;
`;

const SeasonBox = styled.span<{ season: Program['season'] }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18px;
  padding: 1px 5px;
  border-radius: 2px;
  background-color: ${({ season }) =>
    season === 'summer' ? '#B77778' : '#7794B7'};
  color: #fff;
  font-size: 0.75rem;
  font-weight: 400;
  font-family: pretendard;
`;
