import { Box, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import adminApi from '@/apis/requests/admin';
import { EventChip } from '@/components/shared';
import { EventType } from '@/types/group';
import { UserType } from '@/types/user';

interface PartnerCountProps {
  userId: UserType['userId'];
}

const PartnerCount: React.FC<PartnerCountProps> = ({ userId }) => {
  const { data: countData } = useQuery({
    queryKey: ['adminPartnerTypeCountGet', userId],
    queryFn: () => adminApi.adminPartnerTypeCountGet({ userId }),
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="1rem 0.625rem"
      borderRadius="1rem"
      gap="3.75rem"
      width="21.875rem"
      sx={{
        background: '#FFF',
        boxShadow: '0px 2px 4px 0px #0000001A',
      }}
    >
      {countData ? (
        <>
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

export default PartnerCount;
