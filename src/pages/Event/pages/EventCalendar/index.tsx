import { EventLinkBox, LinkButton } from '@/components/shared';
import { CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AllEventIcon from '@/assets/navBar/all_event_bold_icon.png';
import MyEventIcon from '@/assets/navBar/my_event_icon.png';
import { BROWSER_PATH } from '@/constants/path';
import { useQuery } from '@tanstack/react-query';
import eventApi from '@/apis/requests/event';
import styled from '@emotion/styled';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CircleIcon from '@mui/icons-material/Circle';

//
//
//
const StyledCalendarContainer = styled.div`
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  border-radius: 1rem;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledDateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
`;

const StyledCalendarTable = styled.table`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1.28125rem;
`;

const StyledCalendarThead = styled.thead`
  & tr {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1.25rem;
  }
`;

const StyledCalendarTbody = styled.tbody`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1.25rem;
`;

const StyledCalendarTd = styled.td<{ date: number; startdate: number }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  grid-column-start: ${({ date, startdate }) =>
    date === 0 ? startdate : 'auto'};

  & .date {
    width: 1.375rem;
    height: 1.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 10000000rem;

    transition: all 0.2s ease-in-out;
    border: none;

    cursor: pointer;

    [aria-selected='true'] {
      background-color: #d9d9d9;
    }

    [aria-disabled='true'] {
      color: #000;
      cursor: default;
    }

    &:hover {
      background-color: #d9d9d9;
      &:disabled {
        background-color: #fff;
      }
    }
    color: ${({ date, startdate }) => {
      switch ((date + startdate) % 7) {
        case 1:
          return '#DE1313';
        case 0:
          return '#005AD4';
        default:
          return '#333';
      }
    }};
  }
`;

//
//
//

const EventCalendar: React.FC = () => {
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  const [day, setDay] = React.useState<number | null>(null);
  const [convertedEventData, setConvertedEventData] = useState<{
    [key: number]: {
      competition: boolean;
      training: boolean;
    };
  }>({});

  const { data: eventCalendarData, isLoading } = useQuery({
    queryKey: ['eventCalendarGet', year, month],
    queryFn: () => eventApi.eventCalendarGet({ month, year }),
  });
  const { data: eventList } = useQuery({
    queryKey: ['eventCalendarDetailGet', year, month, day],
    queryFn: () =>
      eventApi.eventCalendarDetailGet({ year, month, day: day as number }),
    enabled: typeof day === 'number',
  });

  const totalDate = new Date(year, month, 0).getDate();
  const startDate = new Date(year, month - 1, 1).getDay() + 1;

  useEffect(() => {
    if (eventCalendarData) {
      eventCalendarData.forEach((data) => {
        setConvertedEventData((prev) => ({
          ...prev,
          [data.day]: {
            competition: data.competition,
            training: data.training,
          },
        }));
      });
    }
  }, [eventCalendarData]);

  /**
   *
   */
  const handleMoveMonthBtnClick = (type: 'next' | 'prev') => () => {
    setDay(null);
    switch (type) {
      case 'next':
        if (month + 1 > 12) {
          setMonth(1);
          setYear((prev) => prev + 1);
          return;
        }
        setMonth((prev) => prev + 1);
        return;
      case 'prev':
        if (month - 1 < 1) {
          setMonth(12);
          setYear((prev) => prev - 1);
          return;
        }
        setMonth((prev) => prev - 1);
        return;
    }
  };

  /**
   *
   */
  const renderCalendar = () => {
    return (
      <StyledCalendarContainer>
        <StyledDateContainer>
          <IconButton
            size="small"
            aria-label="이전 달"
            onClick={handleMoveMonthBtnClick('prev')}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Stack
            title={`${year}년 ${month}월`}
            component="h2"
            alignItems="center"
            gap="0.125rem"
          >
            <Typography component="span" fontSize="1.1875rem" fontWeight={700}>
              {month}월
            </Typography>
            <Typography
              component="span"
              fontSize="0.75rem"
              fontWeight={500}
              color="#8F9BB3"
            >
              {year}
            </Typography>
          </Stack>
          <IconButton
            size="small"
            aria-label="다음 달"
            onClick={handleMoveMonthBtnClick('next')}
          >
            <ChevronRightIcon />
          </IconButton>
        </StyledDateContainer>
        <StyledCalendarTable>
          <StyledCalendarThead>
            <tr>
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <th key={day}>
                  <Typography fontSize="0.6875rem" color="#8F9BB3">
                    {day}
                  </Typography>
                </th>
              ))}
            </tr>
          </StyledCalendarThead>
          <StyledCalendarTbody>
            {new Array(totalDate).fill(0).map((_, idx) => (
              <StyledCalendarTd
                role="button"
                key={`${year}-${month}-${idx + 1}`}
                date={idx}
                startdate={startDate}
                data-date={`${year}-${month}-${idx + 1}`}
                aria-selected={day === idx + 1}
                onClick={() => setDay(idx + 1)}
              >
                <span className="date">{idx + 1}</span>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  gap="0.125rem"
                >
                  {convertedEventData[idx + 1]
                    ? convertedEventData[idx + 1].competition && (
                        <CircleIcon
                          sx={{ fontSize: '0.375rem', color: '#005AD4' }}
                        />
                      )
                    : null}
                  {convertedEventData[idx + 1]
                    ? convertedEventData[idx + 1].training && (
                        <CircleIcon
                          sx={{ fontSize: '0.375rem', color: '#9CA0A6' }}
                        />
                      )
                    : null}
                </Stack>
              </StyledCalendarTd>
            ))}
          </StyledCalendarTbody>
        </StyledCalendarTable>
      </StyledCalendarContainer>
    );
  };

  /**
   *
   */
  const renderEventList = () => {
    if (!eventList || !eventList.length) {
      return null;
    }
    return (
      <Stack border="1px solid #D9D9D9" borderRadius="1rem">
        {eventList.map((event) => (
          <EventLinkBox key={event.eventId} eventData={event} />
        ))}
      </Stack>
    );
  };

  //
  //
  //

  return (
    <>
      <Helmet>
        <title>캘린더 보기 - Guide run Project</title>
      </Helmet>
      <Stack gap="2.5rem">
        <Typography component="h1" fontSize="1.5rem" fontWeight={700}>
          캘린더 보기
        </Typography>
        <Stack gap="0.5rem">
          {renderCalendar()}
          {renderEventList()}
        </Stack>
        <Stack
          direction="row"
          boxSizing="border-box"
          padding="0 0.625rem"
          gap="0.9375rem"
          justifyContent="center"
        >
          <LinkButton
            type="block"
            title="전체 이벤트"
            icon={AllEventIcon}
            to={BROWSER_PATH.EVENT.ALL}
          />
          <LinkButton
            type="block"
            title="나의 이벤트"
            icon={MyEventIcon}
            to={BROWSER_PATH.EVENT.MY}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default EventCalendar;
