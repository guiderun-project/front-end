import React from 'react';

import {
  CircularProgress,
  Stack,
  TableCell,
  Typography,
  Pagination,
  TableBody,
  TableSortLabel,
  TableHead,
  Table,
  TableRow,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import adminApi from '@/apis/requests/admin';
import { ApplyListFilterType } from '@/apis/types/admin';
import { ApplyUserChip, GroupChip } from '@/components/shared';

const MAX_USER_LENGTH = 10;

const TABLE_HEAD: { key: keyof ApplyListFilterType; name: string }[] = [
  { key: 'time', name: 'Time stamp' },
  { key: 'typeName', name: '장애여부/이름' },
  { key: 'team', name: '팀' },
];

const AdminEventApplyPanel: React.FC<{ eventId: number }> = ({ eventId }) => {
  const [page, setPage] = React.useState(1);
  const [filter, setFilter] = React.useState<ApplyListFilterType>({
    team: undefined,
    time: undefined,
    typeName: undefined,
  });

  const { data: count } = useQuery({
    queryKey: ['adminApplyListCountGet', eventId],
    queryFn: () => adminApi.adminApplyListCountGet({ eventId }),
  });

  const maxPage = Math.ceil((count ?? 0) / MAX_USER_LENGTH);
  const startIndex = (page - 1) * MAX_USER_LENGTH;

  const { data: userList, isLoading } = useQuery({
    queryKey: ['adminApplyListGet', eventId, startIndex, filter],
    queryFn: () =>
      adminApi.adminApplyListGet({
        eventId,
        start: startIndex,
        limit: MAX_USER_LENGTH,
        ...filter,
      }),
  });

  /**
   *
   */
  const handleFilterChange =
    (selectedFilter: keyof ApplyListFilterType) => () => {
      if (filter[selectedFilter] === 1) {
        setFilter((prev) => ({ ...prev, [selectedFilter]: 0 }));
        return;
      }
      if (filter[selectedFilter] === 0) {
        setFilter((prev) => ({ ...prev, [selectedFilter]: undefined }));
        return;
      }
      setFilter((prev) => ({ ...prev, [selectedFilter]: 1 }));
    };

  //
  //
  //
  if (isLoading || typeof userList === 'undefined') {
    return (
      <Stack alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    );
  }

  if (!count) {
    <Stack alignItems="center" justifyContent="center">
      <Typography>명단이 존재하지 않습니다.</Typography>
    </Stack>;
  }

  return (
    <Stack gap="2rem">
      <Table
        aria-label="회원 정보 테이블"
        sx={{ width: '100%', border: 'none', boxShadow: 'none' }}
      >
        <caption style={{ display: 'none' }}>
          이벤트 정보 테이블. 이벤트 정보 조회 및 승인 가능
        </caption>
        <TableHead>
          <TableRow
            sx={{
              '.MuiTableCell-root': {
                padding: '0.75rem',
                fontSize: '0.75rem',
                fontWeight: 700,
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
          {userList.map((user) => (
            <TableRow
              sx={{
                '.MuiTableCell-root': {
                  padding: '0.75rem',
                },
                cursor: 'pointer',
              }}
            >
              <TableCell
                align="center"
                sx={{
                  fontSize: '0.625rem',
                  whiteSpace: 'break-spaces',
                }}
              >
                {`${user.apply_time}`}
              </TableCell>
              <TableCell>
                <ApplyUserChip name={user.name} type={user.type} />
              </TableCell>
              <TableCell align="center">
                <GroupChip type="avatar" group={user.team} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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

export default AdminEventApplyPanel;
