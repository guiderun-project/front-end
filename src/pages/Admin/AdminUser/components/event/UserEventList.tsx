import React from 'react';

import {
  Pagination,
  SelectChangeEvent,
  Typography,
  Box,
  MenuItem,
  Select,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormattedMessage } from 'react-intl';

import adminApi from '@/apis/requests/admin';
import { DetailEventModal, EventChip } from '@/components/shared';
import { StyledEventButton } from '@/pages/Mypage';
import { RecruitStatus } from '@/types/group';

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
  const [selelectedDate, setSelectedDate] = React.useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [selectedEvent, setSelectedEvent] = React.useState(-1);
  const { data: eventCount, isLoading } = useQuery({
    queryKey: ['adminEventHistoryCountGet', userId, selelectedDate],
    queryFn: () =>
      adminApi.adminEventHistoryCountGet({
        userId,
        year: selelectedDate.year,
        month: selelectedDate.month,
      }),
    enabled: userId !== '',
  });
  const maxPage = Math.ceil((eventCount ?? 0) / MAX_EVENT_LENGTH);
  const startIndex = (page - 1) * maxPage;
  const { data: EventList, isLoading: eventLoading } = useQuery({
    queryKey: ['adminEventHistoryGet', startIndex, selelectedDate],
    queryFn: () =>
      adminApi.adminEventHistoryGet({
        userId,
        year: selelectedDate.year,
        month: selelectedDate.month,
        limit: MAX_EVENT_LENGTH,
        start: startIndex,
      }),
    enabled: !isLoading && userId !== '',
  });

  const getColor = (recruitStatus: RecruitStatus) => {
    switch (recruitStatus) {
      case RecruitStatus.Open:
        return '#DE1313';
      case RecruitStatus.Close:
        return '#42474E';
      case RecruitStatus.Upcoming:
      default:
        return '#3586FF';
    }
  };

  /**
   *
   */
  const handleEventDetailOpen = (eventId: number) => {
    setSelectedEvent(eventId);
    setOpen(true);
  };

  /**
   *
   */
  const handleDateChange =
    (type: 'year' | 'month') => (e: SelectChangeEvent) => {
      setSelectedDate((prev) => ({ ...prev, [type]: e.target.value }));
    };

  //
  //
  //

  return (
    <Stack gap="1.25rem" alignItems="center" width="100%">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        width="100%"
        gap="0.25rem"
      >
        <Select
          value={`${selelectedDate.year}`}
          aria-label="연도 선택"
          onChange={handleDateChange('year')}
          sx={{
            boxShadow: 'none',
            '.MuiOutlinedInput-notchedOutline': { border: 0 },
          }}
        >
          {new Array(3).fill(0).map((_, idx) => (
            <MenuItem value={idx + 2022}>{idx + 2022}년</MenuItem>
          ))}
        </Select>
        <Select
          value={`${selelectedDate.month}`}
          aria-label="월 선택"
          onChange={handleDateChange('month')}
          sx={{
            boxShadow: 'none',
            '.MuiOutlinedInput-notchedOutline': { border: 0 },
          }}
        >
          {new Array(12).fill(0).map((_, idx) => (
            <MenuItem value={idx + 1}>{idx + 1}월</MenuItem>
          ))}
        </Select>
      </Box>
      {eventLoading ? (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress size="2rem" />
        </Stack>
      ) : (eventCount ?? 0) > 0 ? (
        <Stack>
          {EventList?.map((event) => (
            <StyledEventButton
              key={event.eventId}
              onClick={() => handleEventDetailOpen(event.eventId)}
            >
              <EventChip type={event.eventType} variant="full" />
              <Stack
                gap="0.25rem"
                overflow="hidden"
                textOverflow="ellipsis"
                alignItems="flex-start"
              >
                <Typography fontWeight={500} noWrap>
                  {event.name}
                </Typography>
                <Typography fontWeight={400} fontSize="0.8125rem" noWrap>
                  {event.endDate.replace(/-/g, '.')}
                </Typography>
              </Stack>
              <Typography
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                gap="0.625rem"
                fontSize="0.6875rem"
              >
                <span
                  style={{
                    color: getColor(event.recruitStatus),
                    fontWeight: 500,
                  }}
                >
                  <FormattedMessage
                    id={`common.status.${event.recruitStatus}`}
                  />
                </span>
                <span aria-hidden>&gt;</span>
              </Typography>
            </StyledEventButton>
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
      <DetailEventModal
        eventId={selectedEvent}
        isOpen={open}
        onModalClose={() => setOpen(false)}
      />
    </Stack>
  );
};

export default UserEventList;
