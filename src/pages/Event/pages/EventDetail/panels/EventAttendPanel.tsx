import React from 'react';

import styled from '@emotion/styled';
import {
  CircularProgress,
  Divider,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import eventApi from '@/apis/requests/event';
import { ApplyUserChip, DisabilityChip } from '@/components/shared';
import { DisabilityEnum } from '@/types/group';

//
//
//

interface EventAttendPanelProps {
  isOwner: boolean;
}

//
//
//

const StyledCountBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 1.5rem 0.5rem;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #34618d33;
  border-radius: 1rem;
`;

export const StyledApplyUserBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 2.53125rem;
  background-color: #e6e7ee;
  box-shadow: 0px 0px 4px 0px #0000001a inset;
  border-radius: 1rem;
`;

export const StyledUserListBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;

//
//
//

const EventAttendPanel: React.FC<EventAttendPanelProps> = ({ isOwner }) => {
  const [attendMode, setAttendMode] = React.useState(false);
  const eventId = Number(useParams<{ eventId: string }>().eventId);
  const queryClient = useQueryClient();

  const { data: applyCount, isLoading: isApplyCountLoading } = useQuery({
    queryKey: ['eventApplyCountGet', eventId],
    queryFn: () => eventApi.eventApplyCountGet({ eventId }),
  });

  const { data: applyStatus, isLoading: isApplyStatusLoading } = useQuery({
    queryKey: ['eventApplyStatusGet', eventId],
    queryFn: () => eventApi.eventApplyStatusGet({ eventId }),
  });

  const { mutate } = useMutation({
    mutationFn: (userId: string) =>
      eventApi.eventAttendPost({ eventId, userId }),
    onSuccess: () => {
      alert('처리되었습니다. ');
    },
    onError: () => {
      alert('에러가 발생했습니다. 다시 시도해주세요.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['eventApplyStatusGet', eventId],
      });
    },
  });

  /**
   *
   */
  const renderCount = () => {
    if (isApplyCountLoading) {
      return (
        <StyledCountBox>
          <CircularProgress size={16} />
        </StyledCountBox>
      );
    }
    if (applyCount) {
      return (
        <StyledCountBox>
          <Typography aria-label={`총 ${applyCount.count}명`}>
            <span style={{ fontSize: '1.25rem' }}>총 </span>
            <span style={{ color: '#FF4040' }}>{applyCount.count}</span>명
          </Typography>
          <Stack
            direction="row"
            gap="1rem"
            aria-label={`시각장애러너 ${applyCount.vi}명 가이드러너 ${applyCount.vi} 명`}
          >
            <Stack direction="row" gap="0.25rem" alignItems="center">
              <DisabilityChip component="chip" type={DisabilityEnum.VI} />
              <Typography>
                <span style={{ color: '#FF4040' }}>{applyCount.vi}</span>명
              </Typography>
            </Stack>
            <Stack direction="row" gap="0.25rem" alignItems="center">
              <DisabilityChip component="chip" type={DisabilityEnum.GUIDE} />
              <Typography>
                <span style={{ color: '#FF4040' }}>{applyCount.guide}</span>명
              </Typography>
            </Stack>
          </Stack>
        </StyledCountBox>
      );
    }
  };

  /**
   *
   */
  const renderMode = () => {
    if (isOwner) {
      return (
        <Stack
          direction="row"
          gap="2.5rem"
          justifyContent="center"
          alignItems="center"
        >
          <Typography component="h3" fontWeight={700}>
            출석체크 모드
          </Typography>
          <Stack
            component="label"
            direction="row"
            alignItems="center"
            gap="0.5rem"
          >
            <Typography fontSize="0.75rem" fontWeight={500} color="#666">
              끄기
            </Typography>
            <Switch
              value={attendMode}
              color="info"
              inputProps={{ 'aria-label': '출석 체크 모드 활성화' }}
              onChange={() => setAttendMode((prev) => !prev)}
            />
            <Typography fontSize="0.75rem" fontWeight={500} color="#666">
              켜기
            </Typography>
          </Stack>
        </Stack>
      );
    }
  };

  const renderUser = () => {
    if (isApplyStatusLoading) {
      return (
        <StyledApplyUserBox>
          <Stack alignItems="center" gap="1.5rem">
            <Typography fontSize="0.875rem" fontWeight={700} color="#666">
              출첵 미완료
            </Typography>
            <CircularProgress />
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Stack alignItems="center" gap="1.5rem">
            <Typography fontSize="0.875rem" fontWeight={700} color="#666">
              출첵 완료
            </Typography>
            <CircularProgress />
          </Stack>
        </StyledApplyUserBox>
      );
    }
    if (applyStatus) {
      return (
        <StyledApplyUserBox>
          <Stack alignItems="center" gap="1.5rem">
            <Typography fontSize="0.875rem" fontWeight={700} color="#666">
              출첵 미완료
            </Typography>
            {!applyStatus.notAttend.length ? (
              <Typography fontSize="0.875rem" fontWeight={700} color="#666">
                미완료 인원 없음
              </Typography>
            ) : (
              <StyledUserListBox>
                {applyStatus.notAttend.map((user) => (
                  <ApplyUserChip
                    isAttendMode={attendMode}
                    key={user.userId}
                    type={user.type}
                    name={user.name}
                    onAttend={() => {
                      if (
                        window.confirm(
                          `${user.name}님을 출석 처리하시겠습니까? `,
                        )
                      ) {
                        mutate(user.userId);
                      }
                    }}
                  />
                ))}
              </StyledUserListBox>
            )}
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Stack alignItems="center" gap="1.5rem">
            <Typography fontSize="0.875rem" fontWeight={700} color="#666">
              출첵 완료
            </Typography>
            {!applyStatus.notAttend.length ? (
              <Typography fontSize="0.875rem" fontWeight={700} color="#666">
                완료 인원 없음
              </Typography>
            ) : (
              <StyledUserListBox>
                {applyStatus.attend.map((user) => (
                  <ApplyUserChip
                    isAttend
                    isAttendMode={attendMode}
                    key={user.userId}
                    type={user.type}
                    name={user.name}
                    onAttend={() => {
                      if (
                        window.confirm(
                          `${user.name}님을 출석 취소하시겠습니까? `,
                        )
                      ) {
                        mutate(user.userId);
                      }
                    }}
                  />
                ))}
              </StyledUserListBox>
            )}
          </Stack>
        </StyledApplyUserBox>
      );
    }
  };

  //
  //
  //

  return (
    <Stack
      role="tabpanel"
      id="tabpanel-attend"
      gap="1.5rem"
      aria-labelledby="tab-attend"
    >
      {renderCount()}
      {renderMode()}
      {renderUser()}
    </Stack>
  );
};

export default EventAttendPanel;
