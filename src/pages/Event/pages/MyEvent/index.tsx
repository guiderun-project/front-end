import React from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FolderOffOutlinedIcon from '@mui/icons-material/FolderOffOutlined';
import {
  Box,
  Stack,
  Tab,
  Tabs,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';

import eventApi from '@/apis/requests/event';
import allEventIcon from '@/assets/navBar/all_event_bold_icon.png';
import MyEventIcon from '@/assets/navBar/my_event_icon.png';
import { EventLinkBox, LinkButton, NotFound } from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import { EventSort } from '@/types/sort';

const MyEvent: React.FC = () => {
  const [selelectedYear, setSelectedYear] = React.useState(
    new Date().getFullYear(),
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get('sort') ?? EventSort.Upcoming;

  const { data: eventListData, isLoading } = useQuery({
    queryKey: ['myEventGet', selelectedYear, sortValue],
    queryFn: () =>
      eventApi.myEventGet({
        sort: sortValue as EventSort,
        year: selelectedYear,
      }),
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
  const getMyEventTitle = () => {
    switch (sortValue) {
      case EventSort.Upcoming:
        return '내가 신청한 이벤트';
      case EventSort.End:
        return '내가 신청했던 이벤트';
    }
    return '';
  };

  const renderTitle = () => {
    return (
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography component="h2" fontSize="1.0625rem" fontWeight={700}>
          <Box component="img" width="1rem" src={MyEventIcon} alt="" />
          {getMyEventTitle()}
        </Typography>
        <Link
          to={`${BROWSER_PATH.EVENT.ALL}?sort=my`}
          style={{
            textDecoration: 'none',
            color: '#666',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            component="span"
            fontSize="0.875rem"
            sx={{
              textDecoration: 'underline',
              textUnderlinePosition: 'under',
            }}
          >
            전체보기
          </Typography>
          <ChevronRightIcon aria-hidden />
        </Link>
      </Box>
    );
  };

  /**
   *
   */
  const renderEventList = () => {
    if (isLoading) {
      return (
        <Stack alignItems="center">
          <CircularProgress size={20} />
        </Stack>
      );
    }

    if (eventListData) {
      if (eventListData.length === 0) {
        return (
          <Stack alignItems="center" justifyContent="center" gap="2rem">
            <FolderOffOutlinedIcon fontSize="large" />
            <Typography>이벤트가 존재하지 않습니다</Typography>
          </Stack>
        );
      }
      return (
        <Stack>
          {eventListData.map((event) => (
            <EventLinkBox key={event.eventId} eventData={event} />
          ))}
        </Stack>
      );
    }

    return <NotFound />;
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
        <Select
          value={`${selelectedYear}`}
          aria-label="연도 선택"
          onChange={handleDateChange}
          sx={{
            boxShadow: 'none',
            '.MuiOutlinedInput-notchedOutline': { border: 0 },
          }}
        >
          {new Array(3).fill(0).map((_, idx) => (
            <MenuItem value={idx + 2022}>{idx + 2022}년</MenuItem>
          ))}
        </Select>
      </Box>
      <Tabs
        centered
        variant="fullWidth"
        value={sortValue}
        onChange={(_, newValue) => {
          setSearchParams({
            sort: newValue,
          });
        }}
      >
        <Tab value={EventSort.Upcoming} label="나의 예정 이벤트" />
        <Tab value={EventSort.End} label="나의 지난 이벤트" />
      </Tabs>
      <Stack gap="1.25rem">
        {renderTitle()}
        {renderEventList()}
      </Stack>
      <LinkButton
        icon={allEventIcon}
        title="전체 이벤트"
        to={BROWSER_PATH.EVENT.ALL}
      />
    </Stack>
  );
};

export default MyEvent;
