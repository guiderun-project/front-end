import React from 'react';

import styled from '@emotion/styled';
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import EmptyEvent from '../components/EmptyEvent';

import eventApi from '@/apis/requests/event';
import { EventLinkBox } from '@/components/shared';
import { EventCityName } from '@/types/event';
import { EventType, RecruitStatus } from '@/types/group';
import { EventKind } from '@/types/sort';

export const MAX_EVENT_LENGTH = 6;

export const StyledMenuItem = styled(MenuItem)`
  font-size: 0.75rem;
  font-weight: 700;
`;

interface AllEventUpcomingPanelProps {
  cityName?: EventCityName;
}

const AllEventUpcomingPanel: React.FC<AllEventUpcomingPanelProps> = ({
  cityName,
}) => {
  const [page, setPage] = React.useState(1);
  const [selectedEventType, setSelectedEventType] =
    React.useState<EventType | null>(null);
  const [selectedEventStatus, setSelectedEventStatus] =
    React.useState<RecruitStatus | null>(null);

  const {
    data: eventCount,
    isLoading: isCountGetLoading,
    isSuccess,
  } = useQuery({
    queryKey: [
      'allEventCountGet',
      EventKind.Upcoming,
      selectedEventStatus,
      selectedEventType,
      cityName,
    ],
    queryFn: () =>
      eventApi.allEventCountGet({
        sort: EventKind.Upcoming,
        kind: selectedEventStatus ?? RecruitStatus.All,
        type: selectedEventType ?? EventType.TOTAL,
        cityName,
      }),
  });

  const { data: eventListData, isLoading } = useQuery({
    queryKey: [
      'allEventGet',
      EventKind.Upcoming,
      selectedEventStatus,
      selectedEventType,
      page,
      cityName,
    ],
    queryFn: () =>
      eventApi.allEventGet({
        sort: EventKind.Upcoming,
        kind: selectedEventStatus ?? RecruitStatus.All,
        type: selectedEventType ?? EventType.TOTAL,
        limit: MAX_EVENT_LENGTH,
        start: (page - 1) * MAX_EVENT_LENGTH,
        cityName,
      }),
    enabled: isSuccess,
  });

  return (
    <Stack
      role="tabpanel"
      id="tabpanel-upcoming-event"
      aria-labelledby="tab-upcoming-event"
    >
      <Stack direction="row" justifyContent="space-between" padding="0.5rem 0">
        <FormControl
          size="small"
          sx={{
            minWidth: '5.375rem',
          }}
        >
          <InputLabel
            id="event-type-label"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            대회/훈련
          </InputLabel>
          <Select
            size="small"
            labelId="event-type-label"
            value={selectedEventType}
            label="대회/훈련"
            onChange={(e) => setSelectedEventType(e.target.value as EventType)}
            sx={{
              boxShadow: 'none',
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              fontSize: '0.75rem',
            }}
          >
            <StyledMenuItem value={EventType.Competition}>
              대회만 보기
            </StyledMenuItem>
            <StyledMenuItem value={EventType.Training}>
              훈련만 보기
            </StyledMenuItem>
            <StyledMenuItem value={EventType.TOTAL}>전체 보기</StyledMenuItem>
          </Select>
        </FormControl>
        <FormControl
          size="small"
          sx={{
            minWidth: '5.375rem',
          }}
        >
          <InputLabel
            id="event-status-label"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            모집 구분
          </InputLabel>
          <Select
            size="small"
            labelId="event-status-label"
            value={selectedEventStatus}
            label="모집 구분"
            onChange={(e) =>
              setSelectedEventStatus(e.target.value as RecruitStatus)
            }
            sx={{
              boxShadow: 'none',
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              fontSize: '0.75rem',
            }}
          >
            <StyledMenuItem value={RecruitStatus.Close}>
              모집 마감
            </StyledMenuItem>
            <StyledMenuItem value={RecruitStatus.Open}>모집중</StyledMenuItem>
            <StyledMenuItem value={RecruitStatus.Upcoming}>
              모집 대기중
            </StyledMenuItem>
            <StyledMenuItem value={RecruitStatus.All}>전체 현황</StyledMenuItem>
          </Select>
        </FormControl>
      </Stack>
      {isCountGetLoading || isLoading ? (
        <Stack alignItems="center" padding="2rem 0">
          <CircularProgress size={20} />
        </Stack>
      ) : (
        <Stack gap="2.5rem">
          {eventListData?.length ? (
            <Stack>
              {eventListData?.map((event) => (
                <EventLinkBox key={event.eventId} eventData={event} />
              ))}
            </Stack>
          ) : (
            <EmptyEvent />
          )}
          {eventCount ? (
            <Stack alignItems="center">
              <Pagination
                size="small"
                page={page}
                count={Math.ceil((eventCount ?? 0) / MAX_EVENT_LENGTH)}
                onChange={(_, value) => setPage(value)}
              />
            </Stack>
          ) : null}
        </Stack>
      )}
    </Stack>
  );
};

export default AllEventUpcomingPanel;
