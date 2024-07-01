import React from 'react';

import InfoIcon from '@mui/icons-material/Info';
import {
  CircularProgress,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { EventLinkBox } from '../EventLinkBox';

import infoApi from '@/apis/requests/info';
import { RecruitStatus } from '@/types/group';

//
//
//

interface EventHistoryListProps {
  userid: string;
  length: number;
  year?: number;
}

//
//
//

const EVENT_FILTER_LIST = [
  { name: '최근 순', value: RecruitStatus.All },
  { name: '모집 마감', value: RecruitStatus.Close },
  { name: '모집 중', value: RecruitStatus.Open },
  { name: '종료', value: RecruitStatus.End },
];

//
//
//

const EventHistoryList: React.FC<EventHistoryListProps> = ({
  userid,
  length,
  year,
}) => {
  const [page, setPage] = React.useState(1);
  const [selectedEventFilter, setSelectedEventFilter] = React.useState(
    RecruitStatus.All,
  );

  const {
    data: eventCount,
    isLoading: isEventListCountLoading,
    isSuccess: isEventListCountSuccess,
  } = useQuery({
    queryKey: ['eventHistoryCountGet', userid, selectedEventFilter],
    queryFn: () =>
      infoApi.eventHistoryCountGet({
        userId: userid,
        sort: selectedEventFilter,
        year,
      }),
  });

  const maxEventPage = Math.ceil((eventCount ?? 0) / length);
  const startEventIndex = (page - 1) * length;

  const { data: eventList, isLoading: isEventListLoading } = useQuery({
    queryKey: [
      'eventHistoryGet',
      selectedEventFilter,
      startEventIndex,
      userid,
      year,
      isEventListCountSuccess,
    ],
    queryFn: () =>
      infoApi.eventHistoryGet({
        userId: userid,
        start: startEventIndex,
        limit: length,
        sort: selectedEventFilter,
        year: year,
      }),
    enabled: isEventListCountSuccess,
  });

  /**
   *
   */
  const handleEventFilterChange = (e: SelectChangeEvent) => {
    setSelectedEventFilter(e.target.value as RecruitStatus);
  };

  //
  //
  //
  return (
    <Stack>
      {/* 이벤트 필터 */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding="0.5rem"
      >
        <Typography component="h2" fontWeight={700} fontSize="1.0625rem">
          참여 이벤트
        </Typography>
        <Select
          size="small"
          value={selectedEventFilter}
          aria-label="이벤트 필터"
          onChange={handleEventFilterChange}
          sx={{
            boxShadow: 'none',
            '.MuiOutlinedInput-notchedOutline': { border: 0 },
            fontWeight: 700,
            fontSize: '0.75rem',
          }}
        >
          {EVENT_FILTER_LIST.map((filter) => (
            <MenuItem
              key={filter.value}
              value={filter.value}
              selected={selectedEventFilter === filter.value}
              aria-selected={selectedEventFilter === filter.value}
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            >
              {filter.name}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      {/* 이벤트 리스트 */}
      <Stack gap="2rem">
        <Stack>
          {isEventListCountLoading || isEventListLoading ? (
            <Stack justifyContent="center" alignItems="center">
              <CircularProgress
                size="2rem"
                aria-label="데이터를 가지고 오는 중"
              />
            </Stack>
          ) : !eventList?.items.length ? (
            <Stack justifyContent="center" alignItems="center" gap="2rem">
              <InfoIcon aria-label="알림" />
              <Typography fontWeight={700} fontSize="1.25rem">
                참여한 이벤트가 존재하지 않습니다.
              </Typography>
            </Stack>
          ) : (
            eventList.items.map((event) => (
              <EventLinkBox key={event.eventId} eventData={event} />
            ))
          )}
        </Stack>
        {maxEventPage > 1 && (
          <Stack direction="row" justifyContent="center">
            <Pagination
              size="small"
              page={page}
              count={maxEventPage}
              onChange={(_, value) => setPage(value)}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default EventHistoryList;
