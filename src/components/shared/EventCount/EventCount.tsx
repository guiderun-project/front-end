import styled from '@emotion/styled';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { EventChip } from '../EventChip';

import eventApi from '@/apis/requests/event';
import { EventType } from '@/types/group';

//
//
//

interface EventCountProps {
  userid: string;
}

//
//
//

const StyledCountContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem 0.625rem;
  box-shadow: 0px 2px 4px 0px #0000001a;
  background-color: #fff;
  border-radius: 1rem;
`;

//
//
//

const EventCount: React.FC<EventCountProps> = ({ userid }) => {
  const { data: eventTypeCount, isLoading } = useQuery({
    queryKey: ['eventTypeCountGet'],
    queryFn: () => eventApi.eventTypeCountGet({ userId: userid }),
  });

  if (isLoading) {
    <StyledCountContainer>
      <CircularProgress />
    </StyledCountContainer>;
  }

  if (eventTypeCount) {
    const { contestCnt, totalCnt, trainingCnt } = eventTypeCount;
    return (
      <StyledCountContainer aria-label="이벤트 참여 횟수">
        <Typography>
          <span style={{ fontSize: '1.25rem' }}>총</span>{' '}
          <span style={{ color: '#FF4040' }}>{totalCnt}</span>회
        </Typography>
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
    );
  }
};

export default EventCount;
