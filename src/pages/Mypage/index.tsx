import React from 'react';

import styled from '@emotion/styled';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import infoApi from '@/apis/requests/info';
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
import { RootState } from '@/store/index';
import { RecruitStatus } from '@/types/group';

//
//
//

export const StyledEventButton = styled.button`
  border: 0;
  outline: 0;
  box-sizing: border-box;
  padding: 1rem;
  padding-right: 1.5rem;
  gap: 1rem;
  display: grid;
  grid-template-columns: 1fr 4fr 2fr;
  align-items: center;
  box-shadow: 0px 1px 4px 0px #0000001a;
  background-color: #fff;
  text-decoration: none;
  color: #000;
  border-bottom: 1px solid #c2c7cf;
`;

//
//
//

const MAX_EVENT_LENGTH = 5;

//
//
//

const Mypage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(-1);
  const [page, setPage] = React.useState(1);
  const userData = useSelector((state: RootState) => state.user);
  const { data: eventCount, isLoading: countLoading } = useQuery({
    queryKey: ['eventHistoryCountGet', userData.userId],
    queryFn: () => infoApi.eventHistoryCountGet({ userId: userData.userId }),
    enabled: !!userData.userId,
  });
  const { data: eventList, isLoading } = useQuery({
    queryKey: ['eventHistoryGet', eventCount, userData.userId, page],
    queryFn: () =>
      infoApi.eventHistoryGet({
        userId: userData.userId,
        start: startIndex,
        limit: MAX_EVENT_LENGTH,
      }),
    enabled: (eventCount ?? 0) > 0,
  });

  const maxPage = Math.ceil((eventCount ?? 0) / MAX_EVENT_LENGTH);
  const startIndex = (page - 1) * maxPage;

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
            {userData.name} 님은
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
            <GroupChip group={userData.recordDegree} type="avatar" />
            입니다
          </Typography>
        </Stack>
        <Link
          to={`${BROWSER_PATH.INFO}?type=spec`}
          style={{
            textDecoration: 'none',
            color: '#333',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            component="span"
            fontSize="0.875rem"
            fontWeight={500}
            sx={{
              textDecoration: 'underline',
              textUnderlinePosition: 'under',
            }}
          >
            {`러닝스펙 업데이트 `}
          </Typography>
          <KeyboardArrowRightIcon fontSize="small" aria-hidden />
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
            <Typography>{userData.name}</Typography>
            <DisabilityChip component="chip" type={userData.type} />
            <GenderChip type={userData.gender} />
          </Box>
          <Link
            to={`${BROWSER_PATH.INFO}?type=info`}
            style={{
              textDecoration: 'none',
              color: '#333',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              component="span"
              fontSize="0.875rem"
              fontWeight={500}
              sx={{
                textDecoration: 'underline',
                textUnderlinePosition: 'under',
              }}
            >
              {`개인 인적사항 더보기 `}
            </Typography>
            <KeyboardArrowRightIcon fontSize="small" aria-hidden />
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
        {isLoading || countLoading ? (
          <Stack justifyContent="center" alignItems="center">
            <CircularProgress
              size="2rem"
              aria-label="데이터를 가지고 오는 중"
            />
          </Stack>
        ) : maxPage === 0 ? (
          <Stack justifyContent="center" alignItems="center" gap="2rem">
            <InfoIcon aria-label="알림" />
            <Typography fontWeight={700} fontSize="1.25rem">
              참여한 이벤트가 존재하지 않습니다.
            </Typography>
          </Stack>
        ) : (
          <Stack>
            {eventList?.items.map((event) => (
              <StyledEventButton
                key={event.eventId}
                onClick={() => handleEventDetailOpen(event.eventId)}
              >
                <EventChip type={event.eventType} variant="full" />
                <Stack gap="0.25rem" alignItems="flex-start">
                  <Typography
                    fontWeight={500}
                    whiteSpace="normal"
                    textAlign="left"
                  >
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
                  <ArrowRightIcon fontSize="small" />
                </Typography>
              </StyledEventButton>
            ))}
          </Stack>
        )}
        {maxPage > 1 && (
          <Pagination
            page={page}
            onChange={(_, selectedPage) => setPage(selectedPage)}
            count={maxPage}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          />
        )}
      </Stack>
    );
  };

  //
  //
  //

  return (
    <>
      <Helmet>
        <title>마이 페이지 - Guide run Project</title>
      </Helmet>
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
