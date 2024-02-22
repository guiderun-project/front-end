import { EventChip } from '@/components/shared';
import { EventType } from '@/types/group';
import { Box, Typography } from '@mui/material';

interface UserEventCountProps {
  count: { eventCount: number; trainingCount: number };
}

const UserEventCount: React.FC<UserEventCountProps> = ({ count }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="1rem 0.625rem"
      borderRadius="1rem"
      gap="2rem"
      sx={{
        background: '#FFF',
        boxShadow: '0px 2px 4px 0px #0000001A',
      }}
    >
      <Typography>
        <span
          style={{
            fontWeight: 500,
            fontSize: '1.25rem',
          }}
        >{`총 `}</span>
        <span
          style={{
            color: '#FF4040',
          }}
        >
          {count.eventCount + count.trainingCount}
        </span>
        회
      </Typography>
      <Box display="flex" alignItems="center" gap="0.5rem">
        <EventChip variant="full" type={EventType.Training} />
        <Typography>
          <span
            style={{
              color: '#FF4040',
            }}
          >
            {count.trainingCount}
          </span>
          회
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap="0.5rem">
        <EventChip variant="full" type={EventType.Competition} />
        <Typography>
          <span
            style={{
              color: '#FF4040',
            }}
          >
            {count.eventCount}
          </span>
          회
        </Typography>
      </Box>
    </Box>
  );
};

export default UserEventCount;
