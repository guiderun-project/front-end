import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import { FormattedMessage } from 'react-intl';

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

const StyledChip = styled.span<{ bgColor?: string; color?: string }>`
  height: 1.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: 'pretendard', sans-serif;
  font-size: 0.625rem; //10px
  font-weight: 700;
  background-color: ${({ bgColor }) => bgColor ?? 'grey'};
  color: ${({ color }) => color ?? '#000'};
`;

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
        sx={{
          width: 24,
          height: 24,
          bgcolor: getAvatarBgColor(),
          color: getAvatarTextColor(),
          fontSize: '0.8125rem',
          fontWeight: 700,
        }}
      >
        {type[0].toUpperCase()}
      </Avatar>
    );
  }

  return (
    <StyledChip
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
    </StyledChip>
  );
};

export default DisabilityChip;
