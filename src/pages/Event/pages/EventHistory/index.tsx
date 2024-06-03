import React from 'react';

import styled from '@emotion/styled';
import InfoIcon from '@mui/icons-material/Info';
import {
  CircularProgress,
  Stack,
  Typography,
  SelectChangeEvent,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import eventApi from '@/apis/requests/event';
import { EventChip, EventLinkBox } from '@/components/shared';
import { RootState } from '@/store/index';
import { EventType, RecruitStatus } from '@/types/group';
import infoApi from '@/apis/requests/info';

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

const EVENT_FILTER_LIST = [
  { name: '최근 순', value: RecruitStatus.All },
  { name: '모집 마감', value: RecruitStatus.Close },
  { name: '모집 중', value: RecruitStatus.Open },
  { name: '모집 대기중', value: RecruitStatus.Upcoming },
  { name: '종료', value: RecruitStatus.End },
];

const MAX_EVENT_LIST_LENGTH = 5;

const MAX_PARTNER_LIST_LENGTH = 4;

//
//
//

const EventHistory: React.FC = () => {
  const [selectedYear, setSelectedYear] = React.useState(
    new Date().getFullYear(),
  );
  const [selectedEventFilter, setSelectedEventFilter] = React.useState(
    RecruitStatus.All,
  );
  const [page, setPage] = React.useState(1);

  const { name, userId } = useSelector((state: RootState) => state.user);
  const {
    data: { contestCnt, trainingCnt },
  } = useSuspenseQuery({
    queryKey: ['eventTypeCountGet'],
    queryFn: () => eventApi.eventTypeCountGet(),
  });

  const {
    data: eventCount,
    isLoading: isEventListCountLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['eventHistoryCountGet', userId, selectedEventFilter],
    queryFn: () =>
      infoApi.eventHistoryCountGet({
        userId,
        sort: selectedEventFilter,
        year: selectedYear,
      }),
  });

  const maxPage = Math.ceil((eventCount ?? 0) / MAX_EVENT_LIST_LENGTH);
  const startIndex = (page - 1) * MAX_EVENT_LIST_LENGTH;

  const { data: eventList, isLoading: isEventListLoading } = useQuery({
    queryKey: [
      'eventHistoryGet',
      selectedEventFilter,
      startIndex,
      selectedYear,
      isSuccess,
    ],
    queryFn: () =>
      infoApi.eventHistoryGet({
        userId,
        start: startIndex,
        limit: MAX_EVENT_LIST_LENGTH,
        sort: selectedEventFilter,
        year: selectedYear,
      }),
    enabled: isSuccess,
  });

  /**
   *
   */
  const handleDateChange = (e: SelectChangeEvent) => {
    setSelectedYear(Number(e.target.value));
  };

  /**
   *
   */
  const handleEventFilterChange = (e: SelectChangeEvent) => {
    setSelectedEventFilter(e.target.value as RecruitStatus);
  };

  /**
   *
   */
  const renderEventCount = () => {
    return (
      <StyledCountContainer aria-label="이벤트 참여 횟수">
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
  };

  /**
   *
   */
  const renderEventList = () => {
    return (
      <Stack gap="1.5rem">
        <Stack alignItems="flex-start">
          <Select
            value={`${selectedYear}`}
            aria-label="연도 선택"
            onChange={handleDateChange}
            sx={{
              boxShadow: 'none',
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              fontWeight: 700,
              fontSize: '1.5rem',
            }}
          >
            {new Array(3).fill(0).map((_, idx) => (
              <MenuItem
                value={idx + 2022}
                selected={idx + 2022 === selectedYear}
                aria-selected={idx + 2022 === selectedYear}
                sx={{
                  fontWeight: 700,
                  fontSize: '1.5rem',
                }}
              >
                {idx + 2022}년
              </MenuItem>
            ))}
          </Select>
        </Stack>
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
        </Stack>
      </Stack>
    );
  };

  //
  //
  //
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
              {name}님의
            </Typography>
            <Typography component="span" fontSize="1.5rem">
              이벤트 히스토리
            </Typography>
          </Stack>
          {/* 이벤트 참여 횟수 */}
          {renderEventCount()}
          {/* 이벤트 목록 */}
          {renderEventList()}
        </Stack>
      </Stack>
    </>
  );
};

export default EventHistory;
