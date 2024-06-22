import React from 'react';

import styled from '@emotion/styled';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { EventChip } from '../EventChip';
import { EventModal } from '../EventModal';

import { EventType, RecruitStatus } from '@/types/group';

//
//
//

export type EventDataType = {
  eventId: number;
  eventType: EventType;
  name: string;
  recruitStatus: RecruitStatus;
  date?: string;
  endDate?: string;
  startDate?: string;
  dDay?: number;
  isApply?: boolean;
};

interface EventLinkBoxProps {
  eventData: EventDataType;
  mode?: 'default' | 'admin';
}

//
//
//

// const StyledLink = styled(Link)`
//   box-sizing: border-box;
//   width: 100%;
//   padding: 0.5rem 1rem;
//   gap: 1rem;
//   display: grid;
//   grid-template-columns: 1fr 4fr 2fr;
//   align-items: center;
//   box-shadow: 0px 1px 4px 0px #0000001a;
//   background-color: #fff;
//   text-decoration: none;
//   color: #000;
// `;

const StyledContainer = styled.button`
  border: none;
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 1rem;
  gap: 1rem;
  display: grid;
  grid-template-columns: 1fr 4fr 2fr;
  align-items: center;
  box-shadow: 0px 1px 4px 0px #0000001a;
  background-color: #fff;
  text-decoration: none;
  color: #000;

  cursor: pointer;
`;

//
//
//

const EventLinkBox: React.FC<EventLinkBoxProps> = ({
  eventData: {
    eventId,
    name,
    eventType,
    date,
    endDate,
    startDate,
    dDay,
    recruitStatus,
  },
  mode = 'default',
}) => {
  const [open, setOpen] = React.useState(false);

  const getColor = () => {
    switch (recruitStatus) {
      case RecruitStatus.Open:
        return '#DE1313';
      case RecruitStatus.End:
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
  const renderText = () => {
    if (!dDay) {
      if (date) {
        return date.replace(/-/g, '.');
      }
      if (endDate) {
        return endDate.replace(/-/g, '.');
      }
      if (startDate) {
        return startDate?.replace(/-/g, '.');
      }
    }
    switch (recruitStatus) {
      case RecruitStatus.Open:
      case RecruitStatus.Upcoming:
        return `D-${dDay}`;
      case RecruitStatus.End:
      case RecruitStatus.Close:
        return endDate
          ? endDate.replace(/-/g, '.')
          : startDate?.replace(/-/g, '.');
    }
  };

  //
  //
  //
  return (
    <>
      <StyledContainer onClick={() => setOpen(true)}>
        <EventChip type={eventType} variant="full" />
        <Stack
          gap="0.25rem"
          overflow="hidden"
          textOverflow="ellipsis"
          alignItems="flex-start"
        >
          <Typography fontWeight={500} noWrap>
            {name}
          </Typography>
          <Typography fontWeight={400} fontSize="0.8125rem" noWrap>
            {renderText()}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          gap="0.625rem"
        >
          <Typography
            component="span"
            fontSize="0.625rem"
            color={getColor()}
            fontWeight={500}
          >
            <FormattedMessage id={`common.status.${recruitStatus}`} />
          </Typography>
          <ArrowRightIcon aria-hidden fontSize="small" />
        </Stack>
      </StyledContainer>
      {mode === 'default' ? (
        <EventModal
          eventId={eventId}
          isOpen={open}
          onModalClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
};

export default EventLinkBox;
