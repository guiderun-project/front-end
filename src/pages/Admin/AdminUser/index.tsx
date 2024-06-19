import React from 'react';

import styled from '@emotion/styled';
import {
  Box,
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
  Typography,
} from '@mui/material';
import { useSuspenseQuery, useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

import UserTableRow from './components/UserTableRow';

import adminApi from '@/apis/requests/admin';

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

const TABLE_HEAD: { key: keyof FilterType; name: string }[] = [
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
  const [filter, setFilter] = React.useState<FilterType>({
    approval: undefined,
    gender: undefined,
    team: undefined,
    time: undefined,
    type: undefined,
  });

  const { data: userCount } = useSuspenseQuery({
    queryKey: ['adminUserListCountGet', 'adminUserListGet'],
    queryFn: () => adminApi.adminUserListCountGet(),
  });

  const maxPage = Math.ceil(userCount / MAX_USER_LENGTH);
  const startIndex = (page - 1) * MAX_USER_LENGTH;

  const { data: userList } = useQuery({
    queryKey: ['adminUserListGet', startIndex, filter],
    queryFn: () =>
      adminApi.adminUserListGet({
        limit: MAX_USER_LENGTH,
        start: startIndex,
        ...filter,
      }),
  });

  /**
   *
   */
  const handleFilterClick = (selectedFilter: keyof FilterType) => () => {
    if (filter[selectedFilter]) {
      setFilter((prev) => ({ ...prev, [selectedFilter]: 0 }));
      return;
    }
    setFilter((prev) => ({ ...prev, [selectedFilter]: 1 }));
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
      <Box>
        <Typography component="h1" fontSize="1.5rem" fontWeight={700}>
          회원 관리
        </Typography>
      </Box>
      {userCount > 0 ? (
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
                      onClick={handleFilterClick(key)}
                    >
                      {name}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userList ? (
                userList.map((user) => (
                  <UserTableRow key={user.userId} userData={user} />
                ))
              ) : (
                <CircularProgress />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack alignItems="center" justifyContent="center">
          <Typography fontSize="1.5rem" fontWeight={700}>
            정보가 존재하지 않습니다.
          </Typography>
        </Stack>
      )}
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
  );
};

export default AdminUser;
