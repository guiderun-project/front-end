import { Stack, Typography, Divider } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import {
  StyledApplyUserBox,
  StyledUserListBox,
} from '../panels/EventAttendPanel';

import eventApi from '@/apis/requests/event';
import { EventApplyStatusGetResponse } from '@/apis/types/event';
import { ApplyUserChip } from '@/components/shared';
import { UserType } from '@/types/user';

interface AttendModeBoxProps {
  member: EventApplyStatusGetResponse;
}

const AttendModeBox: React.FC<AttendModeBoxProps> = ({ member }) => {
  const queryClient = useQueryClient();
  const eventId = Number(useParams<{ eventId: string }>().eventId);

  const { mutate } = useMutation({
    mutationFn: (userId: UserType['userId']) =>
      eventApi.eventAttendPost({ eventId, userId }),
    onSuccess: (_, userId) => {
      if (!member) return;
      const userIndex = member.attend.findIndex(
        (user) => user.userId === userId,
      );
      if (userIndex !== -1) {
        alert(`${member.attend[userIndex].name}님이 출석 취소 되었습니다. `);
        return;
      }
      alert(
        `${
          member.notAttend[
            member.notAttend.findIndex((user) => user.userId === userId)
          ].name
        }님이 출석 되었습니다.`,
      );
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

  return (
    <StyledApplyUserBox>
      <Stack alignItems="center" gap="1.5rem">
        <Typography fontSize="0.875rem" fontWeight={700} color="#666">
          출첵 미완료
        </Typography>
        {!member.notAttend.length ? (
          <Typography fontSize="0.875rem" fontWeight={700} color="#666">
            미완료 인원 없음
          </Typography>
        ) : (
          <StyledUserListBox>
            {member.notAttend.map((user) => (
              <ApplyUserChip
                isAttendMode
                key={user.userId}
                type={user.type}
                name={user.name}
                group={user.recordDegree}
                onAttend={() => {
                  mutate(user.userId);
                }}
                onClick={() => mutate(user.userId)}
              />
            ))}
          </StyledUserListBox>
        )}
      </Stack>
      <Divider aria-hidden sx={{ borderStyle: 'dashed' }} />
      <Stack alignItems="center" gap="1.5rem">
        <Typography fontSize="0.875rem" fontWeight={700} color="#666">
          출첵 완료
        </Typography>
        {!member.attend.length ? (
          <Typography fontSize="0.875rem" fontWeight={700} color="#666">
            완료 인원 없음
          </Typography>
        ) : (
          <StyledUserListBox>
            {member.attend.map((user) => (
              <ApplyUserChip
                isAttend
                isAttendMode
                key={user.userId}
                type={user.type}
                name={user.name}
                group={user.recordDegree}
                onAttend={() => mutate(user.userId)}
                onClick={() => mutate(user.userId)}
              />
            ))}
          </StyledUserListBox>
        )}
      </Stack>
    </StyledApplyUserBox>
  );
};

export default AttendModeBox;
