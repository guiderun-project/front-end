import React from 'react';

import { ErrorOutlineOutlined } from '@mui/icons-material';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { UpcomingEventItemType } from '@/apis/types/event';
import PlanedEventIcon from '@/assets/navBar/all_event_bold_icon.png';
import { EventLinkBox, LinkButton } from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import { EventType, RecruitStatus } from '@/types/group';
import { EventSort } from '@/types/sort';

//
//
//

const UPCOMING_EVENT_DATA: UpcomingEventItemType[] = [
  {
    eventId: 1,
    eventType: EventType.Competition,
    date: '2000-00-00',
    isApply: false,
    name: '동아마라톤',
    recuitStatus: RecruitStatus.Open,
  },
  {
    eventId: 2,
    eventType: EventType.Competition,
    date: '2000-00-00',
    isApply: true,
    name: 'JTBC마라톤',
    recuitStatus: RecruitStatus.Open,
  },
  {
    eventId: 3,
    eventType: EventType.Training,
    date: '2000-00-00',
    isApply: false,
    name: '춘천마라톤',
    recuitStatus: RecruitStatus.Open,
  },
  {
    eventId: 4,
    eventType: EventType.Training,
    date: '2000-00-00',
    isApply: true,
    name: '어울림마라톤',
    recuitStatus: RecruitStatus.Open,
  },
];

//
//
//

const UpcomingEvent: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get('sort') ?? RecruitStatus.Open;

  /**
   *
   */
  const renderEventList = () => {
    switch (sortValue) {
      case EventSort.Open:
        return (
          <>
            {UPCOMING_EVENT_DATA.map((event) => (
              <EventLinkBox
                type="UPCOMING"
                key={event.eventId}
                eventId={event.eventId}
                name={event.name}
                eventType={event.eventType}
                recruitStatus={EventSort.Open}
                date={event.date}
                isApply={event.isApply}
              />
            ))}
          </>
        );
      case EventSort.Upcoming:
        return (
          <>
            {UPCOMING_EVENT_DATA.map((event) => (
              <EventLinkBox
                type="UPCOMING"
                eventId={event.eventId}
                name={event.name}
                eventType={event.eventType}
                recruitStatus={EventSort.Upcoming}
                date={event.date}
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
        <Tab value={EventSort.Open} label="모집중" aria-controls="Tab-모집중" />
        <Tab
          value={EventSort.Upcoming}
          label="모집 대기중"
          aria-controls="Tab-모집 대기중"
        />
      </Tabs>
      <Stack gap="1.25rem">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography component="h2" fontWeight={700}>
            <Box component="img" width="1rem" src={PlanedEventIcon} alt="" />{' '}
            {sortValue === RecruitStatus.Open
              ? '모집 중인 이벤트'
              : '모집 대기중인 이벤트'}
          </Typography>
          <Link
            to={`${BROWSER_PATH.EVENT.ALL}?sort=UPCOMING`}
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
        title="전체 이벤트 보기"
        to={BROWSER_PATH.EVENT.UPCOMING}
      />
    </Stack>
  );
};

export default UpcomingEvent;
