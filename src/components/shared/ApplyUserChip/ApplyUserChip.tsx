import DoneIcon from '@mui/icons-material/Done';
import { Chip, ChipProps, Typography, useTheme } from '@mui/material';

import { DisabilityChip } from '../DisabilityChip';

import { DisabilityEnum } from '@/types/group';
import { UserType } from '@/types/user';

//
//
//

interface ApplyUserChipProps extends ChipProps {
  type: UserType['type'];
  name: UserType['name'];
  group?: UserType['recordDegree'];
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
    group,
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
      role="text"
      avatar={
        <DisabilityChip
          component="avartar"
          type={type}
          variant={isAttend ? 'default' : 'reserve'}
        />
      }
      variant={isAttend ? 'filled' : 'outlined'}
      color={type === DisabilityEnum.VI ? 'vi' : 'guide'}
      label={
        <Typography
          role="text"
          fontSize="0.8125rem"
          fontWeight={600}
          color={isAttend ? '#fff' : '#42474E'}
          aria-label={isAttend ? `${name} 출석됨` : `${name} 출석 안됨`}
        >
          {name}
          {group ?? ''}
        </Typography>
      }
      deleteIcon={
        isAttendMode ? (
          <DoneIcon aria-label={isAttend ? '출석 취소 버튼' : '출석 버튼'} />
        ) : undefined
      }
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
