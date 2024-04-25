import { Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { EventStatus as EventStatusType, RecruitStatus } from '@/types/group';

interface EventStatusProps {
  status: RecruitStatus | EventStatusType;
}

const EventStatus: React.FC<EventStatusProps> = ({ status }) => {
  const getTextColor = () => {
    switch (status) {
      case RecruitStatus.Open:
      case EventStatusType.Open:
        return '#DE1313';
      case RecruitStatus.Upcoming:
      case EventStatusType.Upcoming:
        return '#534040';
      case RecruitStatus.Close:
      case EventStatusType.End:
      default:
        return '#8F8F8F';
    }
  };

  //
  //
  //

  return (
    <Typography fontSize="0.75rem" fontWeight={700} color={getTextColor()}>
      <FormattedMessage id={`common.status.${status}`} />
    </Typography>
  );
};

export default EventStatus;
