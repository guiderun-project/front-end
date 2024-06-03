import styled from '@emotion/styled';
import { Stack, Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import eventApi from '@/apis/requests/event';
import { EventChip } from '@/components/shared';
import { RootState } from '@/store/index';
import { EventType } from '@/types/group';
//
//
//

const StyledCountContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  padding: 1rem 0.625rem;
  box-shadow: 0px 2px 4px 0px #0000001a;
  background-color: #fff;
  border-radius: 1rem;
`;

//
//
//

const EventHistory: React.FC = () => {
  const username = useSelector((state: RootState) => state.user.name);
  const {
    data: { contestCnt, trainingCnt },
  } = useSuspenseQuery({
    queryKey: ['eventTypeCountGet'],
    queryFn: () => eventApi.eventTypeCountGet(),
  });
  return (
    <>
      <Helmet>
        <title>이벤트 히스토리 - Guide run project</title>
      </Helmet>
      <Stack padding="5rem 0" gap="3.75rem">
        <Stack gap="2.5rem">
          <Stack
            component="h1"
            direction="row"
            alignItems="center"
            gap="0.5rem"
          >
            <Typography component="span" fontSize="2rem">
              {username}님의
            </Typography>
            <Typography component="span" fontSize="1.5rem">
              이벤트 히스토리
            </Typography>
          </Stack>
          <StyledCountContainer>
            <Stack direction="row" alignItems="center" gap="0.5rem">
              <EventChip variant="full" type={EventType.Training} />
              <Typography fontSize="0.9375rem">
                <span style={{ color: '#FF4040' }}>{trainingCnt}</span>회
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap="0.5rem">
              <EventChip variant="full" type={EventType.Competition} />
              <Typography fontSize="0.9375rem">
                <span style={{ color: '#FF4040' }}>{contestCnt}</span>회
              </Typography>
            </Stack>
          </StyledCountContainer>
        </Stack>
      </Stack>
    </>
  );
};

export default EventHistory;
