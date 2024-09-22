import React from 'react';

import { CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { StyledApplyUserBox, StyledUserListBox } from './EventAttendPanel';
import ApplyDetailTooltip from '../components/ApplyDetailTooltip';

import eventApi from '@/apis/requests/event';
import { ApplyUserType } from '@/apis/types/event';
import { ApplyUserChip } from '@/components/shared';

const EventApplyPanel: React.FC = () => {
  const [userId, setUserId] = React.useState('');
  const eventId = Number(useParams<{ eventId: string }>().eventId);

  const { data: applyAllData, isLoading: isApplyAllLoading } = useQuery({
    queryKey: ['eventApplyAllGet', eventId],
    queryFn: () => eventApi.eventApplyAllGet({ eventId }),
  });

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
              <ApplyDetailTooltip
                key={`UserListBox-${user.userId}`}
                open={userId === user.userId}
                userId={user.userId}
                onClose={() => setUserId('')}
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
              </ApplyDetailTooltip>
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
