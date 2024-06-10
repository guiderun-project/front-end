import FolderOffOutlinedIcon from '@mui/icons-material/FolderOffOutlined';
import { Stack, Typography } from '@mui/material';

const EmptyEvent: React.FC = () => {
  return (
    <Stack alignItems="center" justifyContent="center" gap="2rem">
      <FolderOffOutlinedIcon fontSize="large" />
      <Typography>이벤트가 존재하지 않습니다</Typography>
    </Stack>
  );
};

export default EmptyEvent;
