import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import {
  InputAdornment,
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
} from '@mui/material';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import useUserFilter from '../../hooks/useUserFilter';
import { TABLE_HEAD } from '../AdminUser';
import WithdrawalTableRow from '../AdminUser/components/WithdrawalTableRow';

import adminApi from '@/apis/requests/admin';
import { PageTitle } from '@/components/shared';
import useDebounce from '@/hooks/useDebounce';

//
//
//

const USER_LIST_LENGTH = 10;

//
//
//

const AdminWithdraw: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [searchPage, setSearchPage] = React.useState(1);
  const [search, setSearch] = React.useState('');

  const { filter, handleFilterChange, resetFilter } = useUserFilter();

  const { data: withdrawalCount, isSuccess } = useSuspenseQuery({
    queryKey: ['adminWithdrawalListCountGet'],
    queryFn: () => adminApi.adminWithdrawalListCountGet(),
  });

  const startIndex = (page - 1) * USER_LIST_LENGTH;
  const maxPage = Math.ceil((withdrawalCount ?? 0) / USER_LIST_LENGTH);
  const searchMode = search.length > 0;

  const { data: userList } = useQuery({
    queryKey: ['adminWithdrawlListGet', isSuccess, startIndex, filter],
    queryFn: () =>
      adminApi.adminWithdrawlListGet({
        limit: USER_LIST_LENGTH,
        start: startIndex,
        ...filter,
      }),
    enabled: isSuccess,
  });

  const { data: searchCount, isSuccess: isSearchCountGetSuccess } = useQuery({
    queryKey: ['adminSearchWithdrawalListCountGet', search],
    queryFn: () => adminApi.adminSearchWithdrawalListCountGet({ text: search }),
    enabled: searchMode,
  });

  const maxSearchPage = Math.ceil((searchCount ?? 0) / USER_LIST_LENGTH);
  const startSearchIndex = (page - 1) * USER_LIST_LENGTH;

  const { data: searchData } = useQuery({
    queryKey: [
      'adminSearchWithdrawalListGet',
      startSearchIndex,
      search,
      filter,
    ],
    queryFn: () =>
      adminApi.adminSearchWithdrawalListGet({
        limit: USER_LIST_LENGTH,
        start: startSearchIndex,
        text: search,
        ...filter,
      }),
    enabled: isSearchCountGetSuccess,
  });

  const debounce = useDebounce();

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
    return (
      <TableContainer component={Paper}>
        <Table
          aria-label="회원 탈퇴 정보 테이블"
          sx={{ boxSizing: 'border-box' }}
        >
          <caption style={{ display: 'none' }}>회원 탈퇴 정보 테이블</caption>
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
                    <WithdrawalTableRow
                      key={user.userId}
                      withdrawalData={user}
                    />
                  ))
                : null
              : userList
                ? userList.map((user) => (
                    <WithdrawalTableRow
                      key={user.userId}
                      withdrawalData={user}
                    />
                  ))
                : null}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

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

  return (
    <Stack
      boxSizing="border-box"
      padding="2.5rem"
      paddingTop="4.5rem"
      gap="1.5rem"
      width="100%"
      maxWidth="31.875rem"
    >
      <PageTitle title="탈퇴 회원 조회" />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography component="h1" fontSize="1.5rem" fontWeight={700}>
          탈퇴한 회원
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

export default AdminWithdraw;
