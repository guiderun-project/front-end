import DoneIcon from '@mui/icons-material/Done';
import { Chip, ChipProps, useTheme } from '@mui/material';

import { DisabilityChip } from '../DisabilityChip';

import { DisabilityEnum } from '@/types/group';
import { UserType } from '@/types/user';

//
//
//

interface ApplyUserChipProps extends ChipProps {
  type: UserType['type'];
  name: UserType['name'];
  selected?: boolean;
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
    selected = false,
    isAttendMode = false,
    isAttend = false,
    onAttend = () => null,
  } = props;
  const theme = useTheme();

  /**
   *
   */
  const getChipColor = () => {
    if (selected || isAttend) {
      return 'default';
    }

    return '#000';
  };

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
      aria-selected={selected}
      sx={{
        boxSizing: 'border-box',
        transition: 'all 0.2s ease-in',
        bgcolor: !isAttend ? '#FFF' : 'default',
        borderWidth: selected ? '3px' : 'default',
        borderColor:
          type === DisabilityEnum.VI
            ? theme.palette.vi.main
            : theme.palette.guide.main,
        padding: '0 0.375rem',
        fontWeight: selected ? 700 : 400,
        color: getChipColor(),
      }}
    />
  );
};

export default ApplyUserChip;
