import React from 'react';

import InfoIcon from '@mui/icons-material/Info';
import { CircularProgress, Pagination, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import adminApi from '@/apis/requests/admin';
import { EventLinkBox } from '@/components/shared';
import { UserType } from '@/types/user';

interface UserEventSearchListProps {
  search: string;
  userId: UserType['userId'];
}

const MAX_EVENT_LENGTH = 5;

const UserEventSearchList: React.FC<UserEventSearchListProps> = ({
  search,
  userId,
}) => {
  const [page, setPage] = React.useState(1);

  const { data: eventCount, isLoading: isEventListCountLoading } = useQuery({
    queryKey: ['adminSearchEventHistoryCountGet', search, userId],
    queryFn: () =>
      adminApi.adminSearchEventHistoryCountGet({ text: search, userId }),
  });

  const maxPage = Math.ceil((eventCount ?? 0) / MAX_EVENT_LENGTH);
  const startIndex = (page - 1) * MAX_EVENT_LENGTH;

  const { data: eventList, isLoading: isEventListLoading } = useQuery({
    queryKey: ['adminSearchEventHistoryGet', search, userId],
    queryFn: () =>
      adminApi.adminSearchEventHistoryGet({
        text: search,
        userId,
        start: startIndex,
      }),
  });

  return (
    <Stack gap="2rem" alignItems="center">
      {isEventListCountLoading || isEventListLoading ? (
        <Stack justifyContent="center" alignItems="center">
          <CircularProgress size="2rem" aria-label="데이터를 가지고 오는 중" />
        </Stack>
      ) : !eventList?.length ? (
        <Stack justifyContent="center" alignItems="center" gap="2rem">
          <InfoIcon aria-label="알림" />
          <Typography fontWeight={700} fontSize="1.25rem">
            참여한 이벤트가 존재하지 않습니다.
          </Typography>
        </Stack>
      ) : (
        <Stack alignItems="center" width="20rem">
          {eventList.map((event) => (
            <EventLinkBox mode="admin" key={event.eventId} eventData={event} />
          ))}
        </Stack>
      )}
      {maxPage > 1 && (
        <Stack direction="row" justifyContent="center">
          <Pagination
            size="small"
            page={page}
            count={maxPage}
            onChange={(_, value) => setPage(value)}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default UserEventSearchList;
