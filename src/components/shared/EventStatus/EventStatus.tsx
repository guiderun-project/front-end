import { Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { RecruitStatus } from '@/types/group';

interface EventStatusProps {
  status: RecruitStatus;
}

const EventStatus: React.FC<EventStatusProps> = ({ status }) => {
  const getTextColor = () => {
    switch (status) {
      case RecruitStatus.Open:
        return '#DE1313';
      case RecruitStatus.Upcoming:
        return '#534040';
      case RecruitStatus.Close:
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
