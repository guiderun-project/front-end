import { Chip } from '@mui/material';
import { useIntl } from 'react-intl';

import { GENDER_COLOR } from '@/constants/color';
import { GenderEnum } from '@/types/group';

interface GenderChipProps {
  type: GenderEnum;
}

const GenderChip: React.FC<GenderChipProps> = ({ type }) => {
  const intl = useIntl();

  //
  //
  //

  if (type === GenderEnum.M) {
    return (
      <Chip
        size="small"
        label={intl.formatMessage({ id: 'common.gender.man.long' })}
        sx={{
          bgcolor: GENDER_COLOR.MAN,
          color: '#FFF',
        }}
      />
    );
  }
  return (
    <Chip
      size="small"
      label={intl.formatMessage({ id: 'common.gender.woman.long' })}
      sx={{
        bgcolor: GENDER_COLOR.WOMAN,
        color: '#FFF',
      }}
    />
  );
};

export default GenderChip;
