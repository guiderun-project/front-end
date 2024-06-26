import React from 'react';

import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';
import {
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import {
  useSuspenseQuery,
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

import UserTableRow from './components/UserTableRow';
import useUserFilter from '../../hooks/useUserFilter';

import adminApi from '@/apis/requests/admin';
import useDebounce from '@/hooks/useDebounce';

//
//
//

type FilterType = {
  approval?: 0 | 1;
  gender?: 0 | 1;
  team?: 0 | 1;
  time?: 0 | 1;
  type?: 0 | 1;
};

//
//
//

export const TABLE_HEAD: { key: keyof FilterType; name: string }[] = [
  { key: 'time', name: 'Time Stamp' },
  { key: 'type', name: '장애여부' },
  { key: 'gender', name: '성별' },
  { key: 'team', name: '이름/팀' },
  { key: 'approval', name: '승인여부' },
];

const MAX_USER_LENGTH = 10;

//
//
//

export const StyledCollapsBox = styled.div`
  background-color: #e5e5e5;
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

//
//
//

const AdminUser: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [searchPage, setSearchPage] = React.useState(1);
  const [search, setSearch] = React.useState('');

  const { filter, handleFilterChange, resetFilter } = useUserFilter();

  const searchMode = search.length > 0;

  const debounce = useDebounce();

  const { data: userCount } = useSuspenseQuery({
    queryKey: ['adminUserListCountGet', 'adminUserListGet'],
    queryFn: () => adminApi.adminUserListCountGet(),
  });

  const maxPage = Math.ceil(userCount / MAX_USER_LENGTH);
  const startIndex = (page - 1) * MAX_USER_LENGTH;

  const { data: userList, isLoading: isUserGetLoading } = useQuery({
    queryKey: ['adminUserListGet', startIndex, filter],
    queryFn: () =>
      adminApi.adminUserListGet({
        limit: MAX_USER_LENGTH,
        start: startIndex,
        ...filter,
      }),
    placeholderData: keepPreviousData,
    enabled: !searchMode,
  });

  const { data: searchCount, isSuccess: isSearchCountGetSuccess } = useQuery({
    queryKey: ['adminUserSearchCountGet', search],
    queryFn: () => adminApi.adminUserSearchCountGet({ text: search }),
    enabled: Boolean(search.length),
  });

  const maxSearchPage = Math.ceil((searchCount ?? 0) / MAX_USER_LENGTH);
  const startSearchIndex = (page - 1) * MAX_USER_LENGTH;

  const { data: searchData } = useQuery({
    queryKey: ['adminUserSearchGet', search, filter, startSearchIndex],
    queryFn: () =>
      adminApi.adminUserSearchGet({
        ...filter,
        text: search,
        limit: MAX_USER_LENGTH,
        start: startSearchIndex,
      }),
    placeholderData: keepPreviousData,
    enabled: Boolean(search.length) && isSearchCountGetSuccess,
  });

  /**
   *
   */
  const handleSearchChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearch(e.target.value);
      resetFilter();
      setSearchPage(1);
    },
    300,
  );

  /**
   *
   */
  const renderTable = () => {
    if (isUserGetLoading) {
      return (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      );
    }

    if (
      (searchMode && (searchCount ?? 0) > 0) ||
      (!searchMode && (userCount ?? 0) > 0)
    ) {
      return (
        <TableContainer component={Paper}>
          <Table aria-label="회원 정보 테이블" sx={{ boxSizing: 'border-box' }}>
            <caption style={{ display: 'none' }}>
              회원 정보 테이블. 회원 정보 조회 및 승인 가능
            </caption>
            <TableHead>
              <TableRow
                sx={{
                  '.MuiTableCell-root': {
                    padding: '0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  },
                  '.MuiTableSortLabel-icon': {
                    margin: 0,
                    fontSize: '0.75rem',
                  },
                }}
              >
                {TABLE_HEAD.map(({ key, name }) => (
                  <TableCell key={key} align="center">
                    <TableSortLabel
                      active={typeof filter[key] === 'number'}
                      direction={filter[key] === 0 ? 'desc' : 'asc'}
                      onClick={handleFilterChange(key)}
                    >
                      {name}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {searchMode
                ? searchData
                  ? searchData.map((user) => (
                      <UserTableRow key={user.userId} userData={user} />
                    ))
                  : null
                : userList
                  ? userList.map((user) => (
                      <UserTableRow key={user.userId} userData={user} />
                    ))
                  : null}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    // return (
    //   <Stack alignItems="center" justifyContent="center">
    //     <Typography fontSize="1.5rem" fontWeight={700}>
    //       정보가 존재하지 않습니다.
    //     </Typography>
    //   </Stack>
    // );
  };

  /**
   *
   */
  const renderPagination = () => {
    if (searchMode && maxSearchPage > 1) {
      return (
        <Stack direction="row" justifyContent="center">
          <Pagination
            size="small"
            page={searchPage}
            count={maxSearchPage}
            onChange={(_, value) => setSearchPage(value)}
          />
        </Stack>
      );
    }
    if (maxPage > 1) {
      return (
        <Stack direction="row" justifyContent="center">
          <Pagination
            size="small"
            page={page}
            count={maxPage}
            onChange={(_, value) => setPage(value)}
          />
        </Stack>
      );
    }
  };

  //
  //
  //

  return (
    <Stack
      boxSizing="border-box"
      padding="2.5rem"
      paddingTop="4.5rem"
      gap="1.5rem"
      width="100%"
      maxWidth="31.875rem"
    >
      <Helmet>
        <title>회원 관리 - Admin - Guide run project</title>
      </Helmet>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography component="h1" fontSize="1.5rem" fontWeight={700}>
          회원 관리
        </Typography>
        <TextField
          fullWidth
          size="medium"
          variant="standard"
          placeholder="회원 검색"
          onChange={handleSearchChange}
          InputProps={{
            style: { padding: '0.75rem' },
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: '15rem',
          }}
        />
      </Stack>
      {renderTable()}
      {renderPagination()}
    </Stack>
  );
};

export default AdminUser;
