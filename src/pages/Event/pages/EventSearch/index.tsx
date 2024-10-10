import React from 'react';

import FolderOffOutlinedIcon from '@mui/icons-material/FolderOffOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
  CircularProgress,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import eventApi from '@/apis/requests/event';
import { EventLinkBox, PageTitle } from '@/components/shared';
import useDebounce from '@/hooks/useDebounce';

//
//
//

const MAX_EVENT_LENGTH = 6;

//
//
//

const EventSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = React.useState(1);

  const searchValue = searchParams.get('search') ?? '';

  const {
    data: eventCount,
    isLoading: isCountGetLoading,
    isSuccess: isCountGetSuccess,
    isError: isCountGetError,
  } = useQuery({
    queryKey: ['searchEventCountGet', searchValue],
    queryFn: () => eventApi.searchEventCountGet({ title: searchValue }),
    enabled: Boolean(searchValue),
  });

  const { data: eventData, isError: isEventGetError } = useQuery({
    queryKey: ['searchEventGet', searchValue, page],
    queryFn: () =>
      eventApi.searchEventGet({
        title: searchValue,
        limit: MAX_EVENT_LENGTH,
        start: (page - 1) * MAX_EVENT_LENGTH,
      }),
    enabled: isCountGetSuccess,
  });

  const debounce = useDebounce();

  const maxPage = Math.ceil((eventCount ?? 0) / MAX_EVENT_LENGTH);
  /**
   *
   */
  const handleSearchValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchParams({ search: e.target.value });
  };

  /**
   *
   */
  const handleDebounceSearchValueChange = debounce(
    handleSearchValueChange,
    500,
  );

  const renderCountResult = () => {
    return (
      <Typography component="h2" textAlign="center">
        <span role="text">
          <span style={{ fontWeight: 700 }}>"{searchValue}"</span> 관련 내용이{' '}
          <span style={{ fontWeight: 700 }}>{eventCount}건</span> 검색되었습니다
        </span>
      </Typography>
    );
  };

  const renderEventList = () => {
    return (
      <Stack>
        {eventData?.map((event) => <EventLinkBox eventData={event} />)}
      </Stack>
    );
  };
  //
  //
  //

  return (
    <>
      <PageTitle title="이벤트 검색" />
      <Stack gap="2.5rem">
        <TextField
          autoFocus
          defaultValue={searchValue}
          autoComplete="off"
          placeholder="찾고 있는 이벤트를 입력해주세요"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleDebounceSearchValueChange}
        />
        {searchValue ? (
          isCountGetLoading ? (
            <Stack alignItems="center">
              <CircularProgress size={20} />
            </Stack>
          ) : isCountGetError || isEventGetError ? (
            <Stack alignItems="center" justifyContent="center" gap="2rem">
              <FolderOffOutlinedIcon fontSize="large" />
              <Typography>이벤트를 가지고 오는데에 실패했습니다. </Typography>
            </Stack>
          ) : (
            <Stack gap="1.5rem">
              {renderCountResult()}
              {renderEventList()}
              {maxPage > 1 && (
                <Stack direction="row" justifyContent="center">
                  <Pagination
                    size="small"
                    page={page}
                    count={maxPage}
                    onChange={(_, value) => setPage(value)}
                  />
                </Stack>
              )}
            </Stack>
          )
        ) : null}
      </Stack>
    </>
  );
};

export default EventSearch;
