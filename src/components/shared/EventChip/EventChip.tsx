import { Avatar } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { EVENT_COLOR } from '@/constants/color';

interface EventChipProps {
  variant: 'full' | 'initial';
  type: 'event' | 'training';
}

//
//
//

const EventChip: React.FC<EventChipProps> = ({ variant, type }) => {
  const length = variant === 'full' ? '2.25rem' : '1.25rem';

  /**
   *
   */
  const getBgColor = () => {
    switch (type) {
      case 'event':
        return EVENT_COLOR.EVENT;

      case 'training':
      default:
        return EVENT_COLOR.TRAINING;
    }
  };

  /**
   *
   */
  const getEventText = () => {
    if (variant === 'full') {
      return <FormattedMessage id={`common.chip.${type}`} />;
    }

    return type[0].toUpperCase();
  };

  //
  //
  //

  return (
    <Avatar
      sx={{
        width: length,
        height: length,
        bgcolor: getBgColor(),
        fontSize: '0.625rem',
        fontWeight: 700,
        textAlign: 'center',
      }}
    >
      {getEventText()}
    </Avatar>
  );
};

export default EventChip;
