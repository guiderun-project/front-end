import { Stack, Typography } from '@mui/material';

const AdminEvent: React.FC = () => {
  return (
    <Stack
      padding="2.5rem"
      paddingTop="4.5rem"
      gap="1.5rem"
      width="100%"
      maxWidth="31.875rem"
    >
      <Typography component="h1" fontSize="1.5rem" fontWeight={700}>
        이벤트 관리
      </Typography>
    </Stack>
  );
};

export default AdminEvent;
