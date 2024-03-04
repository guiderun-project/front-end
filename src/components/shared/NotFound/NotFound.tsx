import { ErrorOutlineOutlined } from '@mui/icons-material';
import { Typography, Stack } from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Stack alignItems="center" justifyContent="center" gap="2rem">
      <ErrorOutlineOutlined fontSize="large" />
      <Typography component="div" role="alert">
        해당 값이 존재하지 않습니다.
      </Typography>
    </Stack>
  );
};

export default NotFound;
