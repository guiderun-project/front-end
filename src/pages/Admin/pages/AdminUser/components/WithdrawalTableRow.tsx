import React from 'react';

import {
  Collapse,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

import ApproveStatus from './ApprroveStatus';

import { WithdrawalUserType } from '@/apis/types/admin';
import { DisabilityChip, GenderChip, GroupChip } from '@/components/shared';
import { RoleEnum } from '@/types/group';

interface WithdrawalTableRowProps {
  withdrawalData: WithdrawalUserType;
}

const WithdrawalTableRow: React.FC<WithdrawalTableRowProps> = ({
  withdrawalData,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow
        onClick={() => setOpen((prev) => !prev)}
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
          {`${withdrawalData.update_date}\n${withdrawalData.update_time}`}
        </TableCell>
        <TableCell align="center">
          <DisabilityChip component="chip" type={withdrawalData.type} />
        </TableCell>
        <TableCell align="center">
          <GenderChip type={withdrawalData.gender} />
        </TableCell>
        <TableCell align="center">
          {withdrawalData.name}{' '}
          <GroupChip type="text" group={withdrawalData.team} />
        </TableCell>
        <TableCell component="th" align="center">
          <ApproveStatus status={RoleEnum.Withdrawal} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Stack
              direction="row"
              padding="0.78125rem 2.09375rem"
              bgcolor="#e5e5e5"
              gap="2.96875rem"
            >
              <Typography component="h3" fontWeight={700} fontSize="0.6875rem">
                탈퇴 사유
              </Typography>
              <Stack gap="0.25rem">
                {withdrawalData.reason.map((res, idx) => (
                  <Typography
                    key={`${withdrawalData.userId}-reason-${idx}`}
                    color="#666"
                    fontSize="0.625rem"
                  >
                    {res}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default WithdrawalTableRow;
