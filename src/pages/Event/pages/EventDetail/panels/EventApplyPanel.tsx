import React from 'react';

import {
  CircularProgress,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { StyledApplyUserBox, StyledUserListBox } from './EventAttendPanel';

import eventApi from '@/apis/requests/event';
import { ApplyUserType } from '@/apis/types/event';
import { ApplyUserChip, GroupChip } from '@/components/shared';

const EventApplyPanel: React.FC = () => {
  const [userId, setUserId] = React.useState('');
  const eventId = Number(useParams<{ eventId: string }>().eventId);

  const { data: applyAllData, isLoading: isApplyAllLoading } = useQuery({
    queryKey: ['eventApplyAllGet', eventId],
    queryFn: () => eventApi.eventApplyAllGet({ eventId }),
  });

  const { data: applyDetail, isLoading: isApplyDetailLoading } = useQuery({
    queryKey: ['eventApplyGet', eventId, userId],
    queryFn: () => eventApi.eventApplyGet({ eventId, userId }),
    enabled: Boolean(userId),
  });

  /**
   *
   */
  const renderApplyDetail = () => {
    if (!applyDetail) {
      return <CircularProgress />;
    }
    return (
      <Stack gap="0.5rem" alignItems="center" padding="0.75rem 0.5rem">
        <Stack direction="row" gap="0.75rem" alignItems="center">
          <Stack
            direction="row"
            fontSize="0.75rem"
            fontWeight={600}
            color="#D9D9D9"
            alignItems="center"
          >
            <GroupChip group={applyDetail.group} />
            에서
          </Stack>
          <Typography fontSize="0.75rem" fontWeight={600} color="#D9D9D9">
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF' }}>
              {applyDetail.partner}
            </span>
            함께 훈련희망
          </Typography>
        </Stack>
        <Typography
          bgcolor="#111"
          color="#FFF"
          fontSize="0.75rem"
          lineHeight="1rem"
          border="1px solid #636363"
          borderRadius="0.25rem"
          sx={{
            display: 'block',
            padding: '0.25rem 0.5rem',
          }}
        >
          {applyDetail.detail}
        </Typography>
      </Stack>
    );
  };

  //
  //
  //
  const UserListBox: React.FC<{ title: string; userData: ApplyUserType[] }> = ({
    title,
    userData,
  }) => {
    return (
      <Stack alignItems="center" gap="1.5rem">
        <Typography fontSize="0.875rem" fontWeight={700} color="#666">
          {title}
        </Typography>
        {!userData.length ? (
          <Typography fontSize="0.875rem" fontWeight={700} color="#666">
            신청한 {title}가 없습니다.
          </Typography>
        ) : (
          <StyledUserListBox>
            {userData.map((user) => (
              // TODO 한 번 클릭 시 데이터가 나타나지 않습니다
              <Tooltip
                arrow
                key={user.userId}
                title={
                  isApplyDetailLoading ? (
                    <CircularProgress />
                  ) : (
                    renderApplyDetail()
                  )
                }
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                onClose={() => {
                  setUserId('');
                }}
                sx={{
                  width: '15rem',
                }}
              >
                <ApplyUserChip
                  clickable
                  role="button"
                  type={user.type}
                  name={user.name}
                  onClick={() => {
                    setUserId(user.userId);
                  }}
                />
              </Tooltip>
            ))}
          </StyledUserListBox>
        )}
      </Stack>
    );
  };

  //
  //
  //
  if (isApplyAllLoading || !applyAllData) {
    return (
      <StyledApplyUserBox
        id="tabpanel-apply"
        role="tabpanel"
        aria-labelledby="tab-apply"
      >
        <Stack alignItems="center" gap="1.5rem">
          <Typography fontSize="0.875rem" fontWeight={700} color="#666">
            시각장애러너
          </Typography>
          <CircularProgress />
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack alignItems="center" gap="1.5rem">
          <Typography fontSize="0.875rem" fontWeight={700} color="#666">
            가이드러너
          </Typography>
          <CircularProgress />
        </Stack>
      </StyledApplyUserBox>
    );
  }

  //
  //
  //
  return (
    <StyledApplyUserBox
      id="tabpanel-apply"
      role="tabpanel"
      aria-labelledby="tab-apply"
    >
      <UserListBox title="시각장애러너" userData={applyAllData.vi} />
      <Divider sx={{ borderStyle: 'dashed' }} />
      <UserListBox title="가이드러너" userData={applyAllData.guide} />
    </StyledApplyUserBox>
  );
};

export default EventApplyPanel;
