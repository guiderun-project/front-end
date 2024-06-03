import React from 'react';

import styled from '@emotion/styled';
import {
  Stack,
  Typography,
  SelectChangeEvent,
  Select,
  MenuItem,
} from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import eventApi from '@/apis/requests/event';
import { EventChip } from '@/components/shared';
import { RootState } from '@/store/index';
import { EventType, RecruitStatus } from '@/types/group';

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

  const username = useSelector((state: RootState) => state.user.name);
  const {
    data: { contestCnt, trainingCnt },
  } = useSuspenseQuery({
    queryKey: ['eventTypeCountGet'],
    queryFn: () => eventApi.eventTypeCountGet(),
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
              {username}님의
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
