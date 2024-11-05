import React from 'react';

import {
  Stack,
  Typography,
  SelectChangeEvent,
  Select,
  MenuItem,
} from '@mui/material';
import { useSelector } from 'react-redux';

import {
  EventCount,
  EventHistoryList,
  PageTitle,
  PartnerList,
} from '@/components/shared';
import { RootState } from '@/store/index';

const EventHistory: React.FC = () => {
  const [selectedYear, setSelectedYear] = React.useState(
    new Date().getFullYear(),
  );

  const { name, userId } = useSelector((state: RootState) => state.user);

  /**
   *
   */
  const handleDateChange = (e: SelectChangeEvent) => {
    setSelectedYear(Number(e.target.value));
  };

  /**
   *
   */
  const renderEventList = () => {
    return (
      <Stack gap="1.5rem">
        <Stack alignItems="flex-start">
          <Select
            value={`${selectedYear}`}
            aria-label="연도 선택"
            onChange={handleDateChange}
            sx={{
              boxShadow: 'none',
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              fontWeight: 700,
              fontSize: '1.5rem',
            }}
          >
            {new Array(3).fill(0).map((_, idx) => (
              <MenuItem
                value={idx + 2022}
                selected={idx + 2022 === selectedYear}
                aria-selected={idx + 2022 === selectedYear}
                sx={{
                  fontWeight: 700,
                  fontSize: '1.5rem',
                }}
              >
                {idx + 2022}년
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <EventHistoryList userid={userId} length={5} year={selectedYear} />
      </Stack>
    );
  };

  /**
   *
   */

  //
  //
  //
  return (
    <>
      <PageTitle title="이벤트 히스토리" />
      <Stack gap="2.5rem">
        <h1>
          <Stack
            component="span"
            role="text"
            direction="row"
            alignItems="center"
            gap="0.5rem"
          >
            <Typography component="span" fontSize="2rem">
              {name}님의
            </Typography>
            <Typography component="span" fontSize="1.5rem">
              이벤트 히스토리
            </Typography>
          </Stack>
        </h1>
        {/* 이벤트 참여 횟수 */}
        <EventCount userid={userId} />
      </Stack>
      <Stack gap="2.5rem">
        {/* 이벤트 목록 */}
        {renderEventList()}
        {/* 함께 뛴 파트너 */}
        <PartnerList userid={userId} length={4} />
      </Stack>
    </>
  );
};

export default EventHistory;
