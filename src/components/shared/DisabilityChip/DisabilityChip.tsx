import { Avatar } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Chip } from '../Chip';

import { DISABILITY_COLOR } from '@/constants/color';
import { DisabilityEnum } from '@/types/group';

interface DisabilityChipProps {
  component: 'chip' | 'avartar';
  type: DisabilityEnum;
  variant?: 'default' | 'reserve';
}

//
//
//

const DisabilityChip: React.FC<DisabilityChipProps> = ({
  component,
  type,
  variant = 'default',
}) => {
  const getAvatarBgColor = () => {
    switch (type) {
      case DisabilityEnum.GUIDE:
        return variant === 'default'
          ? DISABILITY_COLOR.GUIDE.SUB
          : DISABILITY_COLOR.GUIDE.MAIN;

      case DisabilityEnum.VI:
      default:
        return variant === 'default'
          ? DISABILITY_COLOR.VI.SUB
          : DISABILITY_COLOR.VI.MAIN;
    }
  };

  /**
   *
   */
  const getAvatarTextColor = () => {
    if (variant === 'reserve') {
      return '#FFF';
    }

    switch (type) {
      case DisabilityEnum.GUIDE:
        return DISABILITY_COLOR.GUIDE.MAIN;
      case DisabilityEnum.VI:
      default:
        return DISABILITY_COLOR.VI.MAIN;
    }
  };

  //
  //
  //

  if (component === 'avartar') {
    return (
      <Avatar
        role="text"
        aria-label={
          type === DisabilityEnum.GUIDE ? '가이드러너' : '시각장애러너'
        }
        sx={{
          width: 24,
          height: 24,
          bgcolor: getAvatarBgColor(),
          color: getAvatarTextColor(),
          fontSize: '0.8125rem',
          fontWeight: 700,
          alignItems: 'center',
        }}
      >
        {type[0].toUpperCase()}
      </Avatar>
    );
  }

  return (
    <Chip
      bgColor={
        type === DisabilityEnum.GUIDE
          ? DISABILITY_COLOR.GUIDE.SUB
          : DISABILITY_COLOR.VI.SUB
      }
      color={
        type === DisabilityEnum.GUIDE
          ? DISABILITY_COLOR.GUIDE.MAIN
          : DISABILITY_COLOR.VI.MAIN
      }
    >
      <FormattedMessage id={`common.${type}`} />
    </Chip>
  );
};

export default DisabilityChip;
