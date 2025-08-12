import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
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

import AllEventClosePanel from './panels/AllEventClosePanel';
import AllEventMyPanel from './panels/AllEventMyPanel';
import AllEventUpcomingPanel from './panels/AllEventUpcomingPanel';

import { HidenText, PageTitle } from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import { EventCityName } from '@/types/event';

enum EventTypeEnum {
  Upcoming = 'upcoming',
  Close = 'close',
  My = 'my',
}

const EVENT_CITY_NAME_LIST = [
  {
    value: EventCityName.SEOUL,
    label: '서울',
  },
  {
    value: EventCityName.BUSAN,
    label: '부산',
  },
];

const AllEvent: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get('type') ?? EventTypeEnum.Upcoming;
  const cityName = searchParams.get('cityName') as EventCityName | undefined;

  const handleCityChange = (city: EventCityName) => {
    if (cityName === city) {
      setSearchParams({ type }, { replace: true });
      return;
    }
    setSearchParams(
      {
        type,
        cityName: city,
      },
      { replace: true },
    );
  };

  const renderPanel = () => {
    switch (type) {
      case EventTypeEnum.Upcoming:
        return <AllEventUpcomingPanel cityName={cityName} />;
      case EventTypeEnum.Close:
        return <AllEventClosePanel cityName={cityName} />;
      case EventTypeEnum.My:
        return <AllEventMyPanel cityName={cityName} />;
      default:
        return (
          <Stack alignItems="center" gap="1.25rem" padding="2rem 0">
            <ErrorOutlineIcon fontSize="large" />
            <Typography fontWeight={700}>잘못된 접근입니다.</Typography>
          </Stack>
        );
    }
  };

  return (
    <Stack gap="2rem">
      <PageTitle title="전체 이벤트" />
      <Stack gap="1rem">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
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
        <Stack component="ul" direction="row">
          {EVENT_CITY_NAME_LIST.map((city) => (
            <li>
              <button
                aria-selected={cityName === city.value}
                onClick={() => handleCityChange(city.value)}
              >
                <Typography
                  fontWeight={600}
                  color={
                    cityName === city.value
                      ? '#3586FF'
                      : cityName
                        ? '#999'
                        : '#333'
                  }
                  borderBottom={
                    cityName === city.value ? '1.4px solid #3586FF' : 'none'
                  }
                >
                  #{city.label} <HidenText content="지역 이벤트만 보기" />
                </Typography>
              </button>
            </li>
          ))}
        </Stack>
      </Stack>
      <Stack>
        <Tabs
          variant="fullWidth"
          value={type}
          onChange={(_, newValue) =>
            setSearchParams(
              {
                ...(cityName ? ({ cityName } as Record<string, string>) : {}),
                type: newValue,
              },
              { replace: true },
            )
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
        {renderPanel()}
      </Stack>
    </Stack>
  );
};

export default AllEvent;
