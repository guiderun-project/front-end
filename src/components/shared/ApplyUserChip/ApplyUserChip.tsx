import DoneIcon from '@mui/icons-material/Done';
import { Chip, ChipProps } from '@mui/material';

import { DisabilityChip } from '../DisabilityChip';

import { DisabilityEnum } from '@/types/group';

//
//
//

interface ApplyUserChipProps extends ChipProps {
  type: DisabilityEnum;
  name: string;
  isAttendMode?: boolean;
  isAttend?: boolean;
  onAttend?: () => void;
}

//
//
//

const ApplyUserChip: React.FC<ApplyUserChipProps> = (props) => {
  const {
    type,
    name,
    isAttendMode = false,
    isAttend = false,
    onAttend = () => null,
  } = props;

  //
  //
  //

  return (
    <Chip
      {...props}
      avatar={
        <DisabilityChip
          component="avartar"
          type={type}
          variant={isAttend ? 'default' : 'reserve'}
        />
      }
      variant={isAttend ? 'filled' : 'outlined'}
      color={type === DisabilityEnum.VI ? 'vi' : 'guide'}
      label={name}
      deleteIcon={isAttendMode ? <DoneIcon aria-label="출석" /> : undefined}
      onDelete={isAttendMode ? onAttend : undefined}
      sx={{
        boxSizing: 'border-box',
        bgcolor: !isAttend ? '#FFF' : 'default',
        padding: '0 0.375rem',
        color: !isAttend ? '#000' : 'default',
      }}
    />
  );
};

export default ApplyUserChip;
