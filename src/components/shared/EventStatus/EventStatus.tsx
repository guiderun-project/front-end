import { Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

interface EventStatusProps {
  status: 'recruiting' | 'closed' | 'end';
}

const EventStatus: React.FC<EventStatusProps> = ({ status }) => {
  const getTextColor = () => {
    switch (status) {
      case 'recruiting':
        return '#DE1313';
      case 'closed':
        return '#534040';
      case 'end':
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
