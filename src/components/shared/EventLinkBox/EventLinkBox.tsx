import styled from '@emotion/styled';
import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { EventChip } from '../EventChip';

import { BROWSER_PATH } from '@/constants/path';
import { EventType } from '@/types/group';
import { EventSort } from '@/types/sort';

//
//
//

interface EventLinkBoxProps {
  eventId: number;
  name: string;
  eventType: EventType;
  recruitStatus: EventSort;
  date?: string;
  dDay?: number;
}

//
//
//

const StyledLink = styled(Link)`
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 1rem;
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 4px 0px #0000001a;
  background-color: #fff;
  text-decoration: none;
  color: #000;
`;

//
//
//

const EventLinkBox: React.FC<EventLinkBoxProps> = ({
  eventId,
  name,
  eventType,
  date,
  dDay,
  recruitStatus,
}) => {
  /**
   *
   */
  const getColor = () => {
    switch (recruitStatus) {
      case EventSort.Open:
        return '#DE1313';
      case EventSort.End:
        return '#42474E';
      case EventSort.Upcoming:
      default:
        return '#3586FF';
    }
  };

  /**
   *
   */
  const renderText = () => {
    switch (recruitStatus) {
      case EventSort.Open:
        return `D-${dDay}`;
      case EventSort.End:
        return date?.replace(/-/g, '.');
    }
  };

  //
  //
  //
  return (
    <StyledLink to={`${BROWSER_PATH.EVENT.MAIN}/${eventId}`}>
      <EventChip type={eventType} variant="full" />
      <Stack gap="0.25rem">
        <Typography fontWeight={500} fontSize="0.875rem">
          {name}
        </Typography>
        <Typography fontWeight={400} fontSize="0.75rem">
          {renderText()}
        </Typography>
      </Stack>
      <Typography
        display="flex"
        alignItems="center"
        gap="0.625rem"
        fontSize="0.625rem"
      >
        <span
          style={{
            color: getColor(),
            fontWeight: 500,
          }}
        >
          <FormattedMessage id={`common.status.${recruitStatus}`} />
        </span>
        <span aria-hidden>&gt;</span>
      </Typography>
    </StyledLink>
  );
};

export default EventLinkBox;
