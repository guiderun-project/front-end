import React from 'react';

import { ErrorOutlineOutlined } from '@mui/icons-material';
import {
  Box,
  Stack,
  Tab,
  Tabs,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { MyEventItemType } from '@/apis/types/event';
import PlanedEventIcon from '@/assets/navBar/all_event_bold_icon.png';
import MyEventIcon from '@/assets/navBar/my_event_icon.png';
import { EventLinkBox, LinkButton } from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import { EventType } from '@/types/group';
import { EventSort } from '@/types/sort';

//
//
//

const MY_EVENT_DATA: MyEventItemType[] = [
  {
    eventId: 1,
    dDay: 4,
    endDate: '2000-01-01',
    eventType: EventType.Training,
    name: '동아마라톤',
    recruitStatus: EventSort.Open,
  },
  {
    eventId: 2,
    dDay: 253,
    endDate: '2000-01-01',
    eventType: EventType.Competition,
    name: '동아마라톤',
    recruitStatus: EventSort.Open,
  },
  {
    eventId: 3,
    dDay: 4234,
    endDate: '2000-01-01',
    eventType: EventType.Training,
    name: '동아마라톤',
    recruitStatus: EventSort.Open,
  },
  {
    eventId: 4,
    dDay: 11,
    endDate: '2000-01-01',
    eventType: EventType.Competition,
    name: '동아마라톤',
    recruitStatus: EventSort.Open,
  },
];

//
//
//

const MyEvent: React.FC = () => {
  const [selelectedDate, setSelectedDate] = React.useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get('sort') ?? EventSort.Open;

  /**
   *
   */
  const handleDateChange =
    (type: 'year' | 'month') => (e: SelectChangeEvent) => {
      setSelectedDate((prev) => ({ ...prev, [type]: e.target.value }));
    };

  /**
   *
   */
  const renderEventList = () => {
    switch (sortValue) {
      case EventSort.Open:
        return (
          <>
            {MY_EVENT_DATA.map((event) => (
              <EventLinkBox
                key={event.eventId}
                eventId={event.eventId}
                name={event.name}
                eventType={event.eventType}
                recruitStatus={EventSort.Open}
                dDay={event.dDay}
                date={event.endDate}
              />
            ))}
          </>
        );
      case EventSort.End:
        return (
          <>
            {MY_EVENT_DATA.map((event) => (
              <EventLinkBox
                eventId={event.eventId}
                name={event.name}
                eventType={event.eventType}
                recruitStatus={EventSort.End}
                dDay={event.dDay}
                date={event.endDate}
              />
            ))}
          </>
        );
      default:
        return (
          <Stack alignItems="center" justifyContent="center" gap="2rem">
            <ErrorOutlineOutlined fontSize="large" />
            <Typography>해당 값이 존재하지 않습니다.</Typography>
          </Stack>
        );
    }
  };

  //
  //
  //

  return (
    <Stack gap="2.5rem">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography component="h1" fontSize="1.5rem" fontWeight={700}>
          나의 이벤트
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap="0.5rem"
          aria-label="날짜 선택"
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
      </Box>
      <Tabs
        centered
        value={sortValue}
        onChange={(_, newValue) => {
          setSearchParams({
            sort: newValue,
          });
        }}
      >
        <Tab
          value={EventSort.Open}
          label="나의 예정 이벤트"
          aria-controls="Tab-나의 예정 이벤트"
        />
        <Tab
          value={EventSort.End}
          label="나의 지난 이벤트"
          aria-controls="Tab-나의 지난 이벤트"
        />
      </Tabs>
      <Stack gap="1.25rem">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography component="h2" fontWeight={700}>
            <Box component="img" width="1rem" src={MyEventIcon} alt="" />{' '}
            {sortValue === EventSort.Open
              ? '내가 신청한 이벤트'
              : '내가 신청했던 이벤트'}
          </Typography>
          <Link
            to={`${BROWSER_PATH.EVENT.ALL}?sort=MY`}
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography
              component="span"
              fontSize="0.875rem"
              color="#666"
              sx={{
                textDecoration: 'underline',
              }}
            >
              전체보기
            </Typography>
            <span aria-hidden> &gt;</span>
          </Link>
        </Box>
        <Stack>{renderEventList()}</Stack>
      </Stack>
      <LinkButton
        icon={PlanedEventIcon}
        title="예정 이벤트"
        to={BROWSER_PATH.EVENT.UPCOMING}
      />
    </Stack>
  );
};

export default MyEvent;
