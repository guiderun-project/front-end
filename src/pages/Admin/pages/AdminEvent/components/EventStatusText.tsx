import { Typography } from '@mui/material';

const EventStatusText = ({ status }: { status: boolean }) => {
  switch (status) {
    case false:
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
    case true:
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

export default EventStatusText;
