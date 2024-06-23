import React from 'react';

import { Pagination, Typography, Stack, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import adminApi from '@/apis/requests/admin';
import { EventLinkBox } from '@/components/shared';

interface UserEventListProps {
  userId: string;
}

//
//
//

const MAX_EVENT_LENGTH = 5;

//
//
//

const UserEventList: React.FC<UserEventListProps> = ({ userId }) => {
  const [page, setPage] = React.useState(1);
  const { data: eventCount, isLoading } = useQuery({
    queryKey: ['adminEventHistoryCountGet', userId],
    queryFn: () =>
      adminApi.adminEventHistoryCountGet({
        userId,
      }),
    enabled: userId !== '',
  });
  const maxPage = Math.ceil((eventCount ?? 0) / MAX_EVENT_LENGTH);
  const startIndex = (page - 1) * MAX_EVENT_LENGTH;
  const { data: EventList, isLoading: eventLoading } = useQuery({
    queryKey: ['adminEventHistoryGet', startIndex, userId],
    queryFn: () =>
      adminApi.adminEventHistoryGet({
        userId,
        limit: MAX_EVENT_LENGTH,
        start: startIndex,
      }),
    enabled: !isLoading && userId !== '',
  });

  //
  //
  //

  return (
    <Stack gap="1.25rem" alignItems="center" width="100%">
      {eventLoading ? (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress size="2rem" />
        </Stack>
      ) : (eventCount ?? 0) > 0 ? (
        <Stack>
          {EventList?.map((event) => (
            <EventLinkBox mode="admin" eventData={event} />
          ))}
        </Stack>
      ) : (
        <Stack justifyContent="center" alignItems="center">
          <Typography fontWeight={700}>값이 존재하지 않습니다.</Typography>
        </Stack>
      )}
      {maxPage > 1 && (
        <Pagination
          size="small"
          page={page}
          count={maxPage}
          onChange={(_, value) => setPage(value)}
        />
      )}
    </Stack>
  );
};

export default UserEventList;
