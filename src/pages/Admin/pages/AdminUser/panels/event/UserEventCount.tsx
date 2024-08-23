import { Box, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import adminApi from '@/apis/requests/admin';
import { EventChip } from '@/components/shared';
import { EventType } from '@/types/group';
import { UserType } from '@/types/user';

interface UserEventCountProps {
  userId: UserType['userId'];
}

const UserEventCount: React.FC<UserEventCountProps> = ({ userId }) => {
  const { data: countData } = useQuery({
    queryKey: ['adminEventTypeCountGet', userId],
    queryFn: () => adminApi.adminEventTypeCountGet({ userId }),
    enabled: Boolean(userId),
  });

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
      {countData ? (
        <>
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
              {countData.totalCnt}
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
                {countData.trainingCnt}
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
                {countData.contestCnt}
              </span>
              회
            </Typography>
          </Box>
        </>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default UserEventCount;
