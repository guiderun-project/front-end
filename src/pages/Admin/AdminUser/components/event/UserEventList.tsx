import React from 'react';

import {
  Pagination,
  SelectChangeEvent,
  Typography,
  Box,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { DetailEventModal, EventChip } from '@/components/shared';
import { EVENT_DATA, StyledEventButton } from '@/pages/Mypage';
import { RecruitStatus } from '@/types/group';

interface UserEventListProps {
  userId: string;
}

const UserEventList: React.FC<UserEventListProps> = () => {
  const [selelectedDate, setSelectedDate] = React.useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(-1);

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
      <Stack>
        {EVENT_DATA.map((event) => (
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
                {event.date.replace(/-/g, '.')}
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
                <FormattedMessage id={`common.status.${event.recruitStatus}`} />
              </span>
              <span aria-hidden>&gt;</span>
            </Typography>
          </StyledEventButton>
        ))}
      </Stack>
      <Pagination size="small" count={10} />
      <DetailEventModal
        eventId={selectedEvent}
        isOpen={open}
        onModalClose={() => setOpen(false)}
      />
    </Stack>
  );
};

export default UserEventList;
