import { FormattedMessage } from 'react-intl';

import { Chip } from '../Chip';

import { GENDER_COLOR } from '@/constants/color';
import { GenderEnum } from '@/types/group';

interface GenderChipProps {
  type: GenderEnum;
}

const GenderChip: React.FC<GenderChipProps> = ({ type }) => {
  if (type === GenderEnum.M) {
    return (
      <Chip bgColor={GENDER_COLOR.MAN} color="#FFF">
        <FormattedMessage id="common.gender.man.long" />
      </Chip>
    );
  }
  return (
    <Chip bgColor={GENDER_COLOR.WOMAN} color="#FFF">
      <FormattedMessage id="common.gender.woman.long" />
    </Chip>
  );
};

export default GenderChip;
