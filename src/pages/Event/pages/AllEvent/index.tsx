import { BROWSER_PATH } from '@/constants/path';
import SearchIcon from '@mui/icons-material/Search';
import TodayIcon from '@mui/icons-material/Today';
import {
  IconButton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

//
//
//

enum EventTypeEnum {
  Upcoming = 'upcoming',
  Close = 'close',
  My = 'my',
}

//
//
//

const AllEvent: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get('type') ?? EventTypeEnum.Upcoming;

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
      <Tabs
        variant="fullWidth"
        value={type}
        onChange={(_, newValue) =>
          setSearchParams({
            type: newValue,
          })
        }
      >
        <Tab
          role="tab"
          id="tab-upcoming-event"
          value={EventTypeEnum.Upcoming}
          label="예정 이벤트"
          aria-selected={type === EventTypeEnum.Upcoming}
          aria-controls="tabpanel-upcoming-event"
        />
        <Tab
          role="tab"
          id="tab-close-event"
          value={EventTypeEnum.Close}
          label="지난 이벤트"
          aria-selected={type === EventTypeEnum.Close}
          aria-controls="tabpanel-close-event"
        />
        <Tab
          role="tab"
          id="tab-my-event"
          value={EventTypeEnum.My}
          label="나의 이벤트"
          aria-selected={type === EventTypeEnum.My}
          aria-controls="tabpanel-my-event"
        />
      </Tabs>
    </Stack>
  );
};

export default AllEvent;
