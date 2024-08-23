import { CircularProgress, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import adminApi from '@/apis/requests/admin';
import { DisabilityChip } from '@/components/shared';
import { Event } from '@/types/event';
import { DisabilityEnum } from '@/types/group';

const AdminEventResultPanel: React.FC<{ eventId: Event['eventId'] }> = ({
  eventId,
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['adminEventResultGet', eventId],
    queryFn: () => adminApi.adminEventResultGet({ eventId }),
  });

  if (isError) {
    return (
      <Stack alignItems="center" justifyContent="center">
        <Typography fontWeight={700}>
          데이터를 가지고 올 수 없습니다.
        </Typography>
      </Stack>
    );
  }

  if (!data || isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack gap="0.75rem">
      <Stack padding="0.5rem" gap="1rem">
        <Stack direction="row" gap="1rem" alignItems="center">
          <Typography component="h3" fontSize="1.0625rem" fontWeight={700}>
            총 참여인원
          </Typography>
          <Typography fontSize="0.9375rem">
            <span
              style={{
                color: '#DE1313',
              }}
            >
              {data.total}
            </span>
            명
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap="1.5rem">
          <Stack direction="row" alignItems="center" gap="0.5rem">
            <DisabilityChip component="chip" type={DisabilityEnum.VI} />
            <Typography fontSize="0.9375rem">
              <span
                style={{
                  color: '#DE1313',
                }}
              >
                {data.viCnt}
              </span>
              명
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap="0.5rem">
            <DisabilityChip component="chip" type={DisabilityEnum.GUIDE} />
            <Typography fontSize="0.9375rem">
              <span
                style={{
                  color: '#DE1313',
                }}
              >
                {data.guideCnt}
              </span>
              명
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack padding="0.5rem" gap="1rem">
        <Stack direction="row" gap="1rem" alignItems="center">
          <Typography component="h3" fontSize="1.0625rem" fontWeight={700}>
            노쇼
          </Typography>
          <Typography fontSize="0.9375rem">
            <span
              style={{
                color: '#DE1313',
              }}
            >
              {data.absent}
            </span>
            명
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap="1.5rem">
          <Stack direction="row" alignItems="center" gap="0.5rem">
            <DisabilityChip component="chip" type={DisabilityEnum.VI} />
            <Typography fontSize="0.9375rem">
              <span
                style={{
                  color: '#DE1313',
                }}
              >
                {data.viAbsent}
              </span>
              명
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap="0.5rem">
            <DisabilityChip component="chip" type={DisabilityEnum.GUIDE} />
            <Typography fontSize="0.9375rem">
              <span
                style={{
                  color: '#DE1313',
                }}
              >
                {data.guideAbsent}
              </span>
              명
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AdminEventResultPanel;
