import React from 'react';

import styled from '@emotion/styled';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Box,
  Stack,
  TableCell,
  TableRow,
  Typography,
  Collapse,
} from '@mui/material';

import ApproveStatus from './ApprroveStatus';
import UserDetailDialog from './UserDetailDialog';
import { StyledCollapsBox } from '..';

import { UserListItemType } from '@/apis/types/admin';
import {
  DisabilityChip,
  GenderChip,
  GroupChip,
  ProfileImage,
} from '@/components/shared';

//
//
//

interface UserTableRowProps {
  userData: UserListItemType;
}

//
//
//

const StyledUserDetailButton = styled.button`
  outline: none;
  color: #000;
  background-color: #fff;
  width: 100%;
  max-width: 20.25rem;
  padding: 0.75rem;
  border-radius: 100000px;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  border: none;
  cursor: pointer;
`;

//
//
//

const UserTableRow: React.FC<UserTableRowProps> = ({ userData }) => {
  const [open, setOpen] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  //
  //
  //

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
          {`${userData.update_date}\n${userData.update_time}`}
        </TableCell>
        <TableCell align="center">
          <DisabilityChip component="chip" type={userData.type} />
        </TableCell>
        <TableCell align="center">
          <GenderChip type={userData.gender} />
        </TableCell>
        <TableCell align="center">
          {userData.name} <GroupChip type="text" group={userData.team} />
        </TableCell>
        <TableCell component="th" align="center">
          <ApproveStatus status={userData.role} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <StyledCollapsBox>
              <Stack
                direction="row"
                gap="1.5rem"
                sx={{
                  '.title': {
                    fontWeight: 700,
                    fontSize: '0.6825rem',
                  },
                  '.content': {
                    fontSize: '0.625rem',
                  },
                  '.normal': {
                    fontSize: '0.6825rem',
                  },
                }}
              >
                <ProfileImage size={40} img={userData.img} />
                <Stack gap="0.5rem">
                  <Box
                    component="div"
                    display="flex"
                    alignItems="center"
                    gap="0.25rem"
                  >
                    <Typography component="h3" className="title">
                      마지막 업데이트
                    </Typography>
                    <Typography className="normal">
                      {`${userData.update_date} ${userData.update_time}`}
                    </Typography>
                  </Box>
                  <Stack direction="row" gap="0.75rem" alignItems="center">
                    <Box
                      component="div"
                      display="flex"
                      alignItems="center"
                      gap="0.25rem"
                    >
                      <Typography component="h3" className="title">
                        SNS
                      </Typography>
                      <Typography className="normal">
                        {`@${userData.snsId}`}
                      </Typography>
                    </Box>
                    <Box
                      component="div"
                      display="flex"
                      alignItems="center"
                      gap="0.25rem"
                    >
                      <Typography component="h3" className="title">
                        연령대
                      </Typography>
                      <Typography className="content">
                        {`${userData.age}대`}
                      </Typography>
                    </Box>
                    <Box
                      component="div"
                      display="flex"
                      alignItems="center"
                      gap="0.25rem"
                    >
                      <Typography component="h3" className="title">
                        전화번호
                      </Typography>
                      <Typography className="normal">
                        {`${userData.phoneNumber}`}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
              <Stack direction="row" justifyContent="flex-end">
                <StyledUserDetailButton
                  title="참여 이벤트 자세히 보기"
                  onClick={() => {
                    setIsDialogOpen(true);
                  }}
                >
                  <Typography fontSize="0.6875rem" fontWeight={700}>
                    참여 이벤트
                  </Typography>
                  <Stack
                    direction="row"
                    gap="0.75rem"
                    alignItems="center"
                    sx={{
                      '.MuiTypography-root': {
                        fontSize: '0.6875rem',
                      },
                      '.total': {
                        color: '#DE1313',
                        fontWeight: 700,
                      },
                      '.event': {},
                    }}
                  >
                    <Typography>
                      {`총 `}
                      <span className="total">
                        {userData.competitionCnt + userData.trainingCnt}
                      </span>
                      {`회`}
                    </Typography>
                    <Typography>
                      {`대회 `}
                      <span className="event">{userData.competitionCnt}</span>
                      {`회`}
                    </Typography>
                    <Typography>{`훈련 ${userData.trainingCnt}회`}</Typography>
                    <KeyboardArrowRightIcon aria-hidden fontSize="small" />
                  </Stack>
                </StyledUserDetailButton>
              </Stack>
            </StyledCollapsBox>
          </Collapse>
        </TableCell>
      </TableRow>
      <UserDetailDialog
        userId={userData.userId}
        group={userData.team}
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
      />
    </>
  );
};

export default UserTableRow;
