import { Typography } from '@mui/material';

import { RoleEnum } from '@/types/group';

interface ApproveStatusProps {
  status: RoleEnum;
}

const ApproveStatus: React.FC<ApproveStatusProps> = ({ status }) => {
  switch (status) {
    case RoleEnum.Reject:
      return (
        <Typography
          component="span"
          fontSize="0.75rem"
          fontWeight={700}
          color="#DE1313"
        >
          거절
        </Typography>
      );
    case RoleEnum.Wait:
      return (
        <Typography
          component="span"
          fontSize="0.75rem"
          fontWeight={700}
          color="#4BABB8"
        >
          대기중
        </Typography>
      );
    case RoleEnum.Withdrawal:
      return (
        <Typography component="span" fontSize="0.75rem" fontWeight={700}>
          탈퇴
        </Typography>
      );
    default:
      return (
        <Typography
          component="span"
          fontSize="0.75rem"
          fontWeight={700}
          color="#0156D6"
        >
          승인
        </Typography>
      );
  }
};

export default ApproveStatus;
