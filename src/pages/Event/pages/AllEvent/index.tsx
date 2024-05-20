import { BROWSER_PATH } from '@/constants/path';
import SearchIcon from '@mui/icons-material/Search';
import TodayIcon from '@mui/icons-material/Today';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AllEvent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Stack gap="2.5rem">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography component="h1" fontSize="1.5rem" fontWeight={700}>
          전체 이벤트
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          gap="0.75rem"
        >
          <Tooltip title="캘린더">
            <IconButton
              role="link"
              color="primary"
              size="small"
              aria-label="캘린더 페이지 이동"
              onClick={() => navigate(BROWSER_PATH.EVENT.CALENDAR)}
            >
              <TodayIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="검색">
            <IconButton
              role="link"
              color="primary"
              size="small"
              aria-label="검색 페이지 이동"
              onClick={() => navigate(BROWSER_PATH.EVENT.SEARCH)}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AllEvent;
