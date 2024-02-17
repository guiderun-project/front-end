import React from 'react';

import styled from '@emotion/styled';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { eventData } from '@/apis/types/info';
import {
  DetailEventModal,
  DisabilityChip,
  EventChip,
  GenderChip,
  GroupChip,
  NavBar,
  PageLayout,
} from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import {
  DisabilityEnum,
  EventType,
  GenderEnum,
  RecruitStatus,
  RunningGroup,
} from '@/types/group';

//
//
//

const StyledEventButton = styled.button`
  border: 0;
  outline: 0;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  gap: 1rem;
  display: grid;
  grid-template-columns: 1fr 4fr 2fr;
  align-items: center;
  box-shadow: 0px 1px 4px 0px #0000001a;
  background-color: #fff;
  text-decoration: none;
  color: #000;
`;

//
//
//

const INFO_DATA = {
  name: '조재석',
  type: DisabilityEnum.GUIDE,
  gender: GenderEnum.M,
};

const TEAM_DATA = {
  name: '조재석',
  recordDegree: RunningGroup.B,
};

const EVENT_DATA: eventData[] = [
  {
    eventId: 1,
    eventType: EventType.Competition,
    date: '2000-01-01',
    name: '가이드런 1회차',
    recruitStatus: RecruitStatus.Close,
  },
  {
    eventId: 2,
    eventType: EventType.Training,
    date: '2000-01-01',
    name: '가이드런 2회차',
    recruitStatus: RecruitStatus.Close,
  },
  {
    eventId: 3,
    eventType: EventType.Competition,
    date: '2000-01-01',
    name: '가이드런 3회차',
    recruitStatus: RecruitStatus.Close,
  },
  {
    eventId: 4,
    eventType: EventType.Training,
    date: '2000-01-01',
    name: '가이드런 4회차',
    recruitStatus: RecruitStatus.Close,
  },
  {
    eventId: 5,
    eventType: EventType.Competition,
    date: '2000-01-01',
    name: '가이드런 5회차',
    recruitStatus: RecruitStatus.Close,
  },
];

//
//
//

const Mypage: React.FC = () => {
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
  const renderTeamInfo = () => {
    return (
      <Box
        component="h1"
        display="flex"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Stack gap="0.325rem">
          <Typography component="span" fontSize="2rem">
            {TEAM_DATA.name} 님은
          </Typography>
          <Typography
            component="span"
            fontSize="1.5rem"
            display="flex"
            alignItems="center"
            gap="0.5rem"
          >
            <Typography component="span" fontSize="1.5rem" fontWeight={700}>
              Team
            </Typography>
            <GroupChip group={TEAM_DATA.recordDegree} type="avatar" />
            입니다
          </Typography>
        </Stack>
        <Link
          to={`${BROWSER_PATH.INFO}?type=spec`}
          style={{
            textDecoration: 'none',
            color: '#333',
            fontSize: '0.875rem',
          }}
        >
          <Typography
            component="span"
            fontWeight={500}
            sx={{
              textDecoration: 'underline',
            }}
          >
            러닝스펙 업데이트
          </Typography>{' '}
          <span aria-hidden>&gt;</span>
        </Link>
      </Box>
    );
  };

  /**
   *
   */
  const renderInfo = () => {
    return (
      <Box display="flex" gap="1rem" paddingLeft="0.5rem">
        <Typography component="h3" fontWeight={700}>
          기본 정보
        </Typography>
        <Stack gap="0.5rem">
          <Box display="flex" gap="0.5rem">
            <Typography>{INFO_DATA.name}</Typography>
            <DisabilityChip component="chip" type={INFO_DATA.type} />
            <GenderChip type={INFO_DATA.gender} />
          </Box>
          <Link
            to={`${BROWSER_PATH.INFO}?type=info`}
            style={{
              textDecoration: 'none',
              color: '#333',
              fontSize: '0.875rem',
            }}
          >
            <Typography
              component="span"
              fontWeight={500}
              sx={{
                textDecoration: 'underline',
              }}
            >
              개인 인적사항 더보기
            </Typography>{' '}
            <span aria-hidden>&gt;</span>
          </Link>
        </Stack>
      </Box>
    );
  };

  /**
   *
   */
  const renderMyEvent = () => {
    return (
      <Stack gap="2rem">
        <Typography component="h2" paddingLeft="0.5rem" fontWeight={700}>
          내가 참여한 이벤트
        </Typography>
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
                  <FormattedMessage
                    id={`common.status.${event.recruitStatus}`}
                  />
                </span>
                <span aria-hidden>&gt;</span>
              </Typography>
            </StyledEventButton>
          ))}
        </Stack>
        <Pagination
          count={5}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        />
      </Stack>
    );
  };

  //
  //
  //

  return (
    <>
      <PageLayout>
        <Stack padding="5rem 0" marginBottom="2.9375rem" gap="3.75rem">
          {/* 이름, 팀 */}
          {renderTeamInfo()}
          {/* 기본정보 */}
          {renderInfo()}
          {/* 내가 참여한 이벤트 */}
          {renderMyEvent()}
        </Stack>
        <NavBar />
      </PageLayout>
      <DetailEventModal
        eventId={selectedEvent}
        isOpen={open}
        onModalClose={() => setOpen(false)}
      />
    </>
  );
};

export default Mypage;
