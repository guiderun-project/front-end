import React from 'react';

import { ClearOutlined } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Dialog,
  IconButton,
  type DialogProps,
  DialogContent,
  Stack,
  Box,
  Typography,
  Select,
  MenuItem,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import { UserDataType } from '..';
import { DisabilityChip, GenderChip } from '@/components/shared';
import GropuChip from '@/components/shared/GroupChip/GroupChip';
import { RoleEnum, RunningGroup } from '@/types/group';

import UserInfoTabpanel from './Info/UserInfoTabpanel';
import UserEventTabPanel from './event/UserEventTabpanel';

interface UserDetailDialogProps extends DialogProps {
  userData: UserDataType;
  onClose: () => void;
}

//
//
//

const UserDetailDialog: React.FC<UserDetailDialogProps> = (props) => {
  const { userData, onClose } = props;
  const [team, setTeam] = React.useState<RunningGroup>(userData.team);
  const [tabValue, setTabValue] = React.useState<'info' | 'event'>('info');
  const [isActiveConfirm, setIsActiveConfirm] = React.useState(false);

  const handleConfirm = (result: 'confirm' | 'deny') => () => {
    if (!isActiveConfirm) {
      return;
    }
    switch (result) {
      case 'confirm':
        if (window.confirm(`${userData.name}님을 승인하시겠습니까?`)) {
          alert(`${userData.name}님이 ${team}팀으로 승인되었습니다.`);
        }
        break;
      case 'deny':
        if (window.confirm(`${userData.name}님을 거절하시겠습니까?`)) {
          alert(`${userData.name}님이 거절되었습니다.`);
        }
        break;
    }
    onClose();
  };

  /**
   *
   */
  const renderApproveStatus = (status: RoleEnum) => {
    switch (status) {
      case RoleEnum.Reject:
        return (
          <Typography
            component="span"
            fontSize="0.75rem"
            lineHeight="2.5rem"
            fontWeight={700}
            color="#DE1313"
          >
            거절
          </Typography>
        );
      case RoleEnum.Wait:
        return (
          <Typography
            component="span"
            fontSize="0.75rem"
            lineHeight="2.5rem"
            fontWeight={700}
            color="#4BABB8"
          >
            대기중
          </Typography>
        );
      default:
        return (
          <Typography
            component="span"
            fontSize="0.75rem"
            lineHeight="2.5rem"
            fontWeight={700}
            color="#0156D6"
          >
            승인
          </Typography>
        );
    }
  };

  /**
   *
   */
  const renderInfo = () => {
    return (
      <Stack
        padding="0 0.5rem"
        direction="row"
        gap="1rem"
        justifyContent="center"
      >
        <Box
          width="5rem"
          height="5rem"
          borderRadius="100rem"
          aria-hidden
          sx={{
            backgroundColor: '#D9D9D9',
          }}
        ></Box>
        <Stack gap="1rem" alignItems="flex-start">
          <Box display="flex" alignItems="center" gap="0.5rem">
            <DisabilityChip component="chip" type={userData.type} />
            <GenderChip type={userData.gender} />
            <Typography component="h2" fontSize="1.25rem" fontWeight={700}>
              {userData.name}
            </Typography>
            <Select
              disableUnderline
              variant="standard"
              value={team}
              defaultValue={userData.team}
              onChange={(e) => {
                setTeam(e.target.value as RunningGroup);
              }}
            >
              <MenuItem value={RunningGroup.A}>
                <GropuChip type="avatar" group={RunningGroup.A} />
              </MenuItem>
              <MenuItem value={RunningGroup.B}>
                <GropuChip type="avatar" group={RunningGroup.B} />
              </MenuItem>
              <MenuItem value={RunningGroup.C}>
                <GropuChip type="avatar" group={RunningGroup.C} />
              </MenuItem>
              <MenuItem value={RunningGroup.D}>
                <GropuChip type="avatar" group={RunningGroup.D} />
              </MenuItem>
              <MenuItem value={RunningGroup.E}>
                <GropuChip type="avatar" group={RunningGroup.E} />
              </MenuItem>
              <MenuItem value={RunningGroup.P}>
                <GropuChip type="avatar" group={RunningGroup.P} />
              </MenuItem>
            </Select>
          </Box>
          <Box display="flex" gap="1rem">
            <Stack gap="0.5rem">
              <Chip
                component="button"
                clickable
                color="primary"
                variant="filled"
                label="그룹편성 승인"
                deleteIcon={<CheckIcon aria-hidden />}
                onDelete={handleConfirm('confirm')}
                onClick={handleConfirm('confirm')}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setIsActiveConfirm((prev) => !prev);
                }}
                sx={{
                  height: '2.5rem',
                  width: '8.75rem',
                  borderRadius: '100rem',
                  '.MuiChip-deleteIcon': {
                    fontSize: '0.75rem',
                  },
                }}
              />
              {isActiveConfirm && (
                <Chip
                  component="button"
                  clickable
                  color="primary"
                  variant="outlined"
                  label="승인 거부"
                  deleteIcon={<HighlightOffIcon aria-hidden />}
                  onDelete={handleConfirm('confirm')}
                  onClick={handleConfirm('deny')}
                  sx={{
                    height: '2.5rem',
                    width: '8.75rem',
                    borderRadius: '100rem',
                    '.MuiChip-deleteIcon': {
                      fontSize: '0.75rem',
                    },
                  }}
                />
              )}
            </Stack>
            {renderApproveStatus(userData.role)}
          </Box>
        </Stack>
      </Stack>
    );
  };

  /**
   *
   */
  const renderSelectedData = () => {
    switch (tabValue) {
      case 'event':
        return (
          <UserEventTabPanel
            userId={userData.userId}
            count={{
              eventCount: userData.contestCnt,
              trainingCount: userData.trainingCnt,
            }}
          />
        );
      case 'info':
      default:
        return (
          <UserInfoTabpanel type={userData.type} userId={userData.userId} />
        );
    }
  };

  /**
   *
   */
  const renderTabData = () => {
    return (
      <Stack gap="1.25rem">
        <Tabs
          centered
          value={tabValue}
          aria-label="정보 선택"
          onChange={(_, newValue: 'info' | 'event') => {
            setTabValue(newValue);
          }}
        >
          <Tab
            id="Tab-info"
            value="info"
            label="신청서 내용"
            aria-controls="Tabpanel-info"
          />
          <Tab
            id="Tab-event"
            value="event"
            label="이벤트 히스토리"
            aria-controls="Tabpanel-event"
          />
        </Tabs>
        {renderSelectedData()}
      </Stack>
    );
  };

  //
  //
  //
  return (
    <Dialog
      {...props}
      keepMounted={false}
      fullWidth
      maxWidth="xs"
      sx={{
        '.MuiDialog-paper': {
          background: '#F8F9FF',
        },
        '.MuiPaper-root': {
          maxHeight: '70vh',
          padding: '5rem 1.25rem',
          gap: '2.5rem',
        },
      }}
    >
      <IconButton
        onClick={onClose}
        size="large"
        sx={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
        }}
      >
        <ClearOutlined fontSize="large" />
      </IconButton>
      <DialogContent
        sx={{
          padding: 0,
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Stack gap="2.5rem">
          {renderInfo()}
          {renderTabData()}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailDialog;
