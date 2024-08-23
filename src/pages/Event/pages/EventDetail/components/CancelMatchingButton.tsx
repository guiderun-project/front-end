import type { PropsWithChildren } from 'react';

import styled from '@emotion/styled';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton, useTheme } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import eventApi from '@/apis/requests/event';
import { DisabilityEnum } from '@/types/group';
import { UserType } from '@/types/user';

interface CancelMatchingButtonProps extends PropsWithChildren {
  userId: UserType['userId'];
  userName: UserType['name'];
  visible: boolean;
  type: UserType['type'];
  onResetSelect: VoidFunction;
}

const StyledContainer = styled.div`
  position: relative;
`;

const StyledCancelButton = styled(IconButton)`
  position: absolute;
  right: -0.5rem;
  top: -0.5rem;
  background-color: white;
  padding: 2px;
  z-index: 111;

  &:hover {
    background-color: white;
  }
`;

const CancelMatchingButton: React.FC<CancelMatchingButtonProps> = ({
  visible,
  children,
  type,
  userName,
  userId,
  onResetSelect,
}) => {
  const theme = useTheme();
  const eventId = Number(useParams<{ eventId: string }>().eventId) ?? -1;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => eventApi.eventMatchingDelete({ eventId, userId }),
    onSuccess: () => {
      alert('매칭 취소되었습니다.');
      onResetSelect();
    },
    onError: () => {
      alert(`에러 발생! 개발팀을 혼내주세요!`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['eventMatchedViGet', eventId],
      });
      queryClient.invalidateQueries({
        queryKey: ['eventNotMatchingGet', eventId],
      });
      queryClient.invalidateQueries({
        queryKey: ['eventMatchedGuideGet'],
      });
    },
  });

  //
  //
  //

  return (
    <StyledContainer>
      {visible && (
        <StyledCancelButton
          size="small"
          aria-label={`${userName} 매칭 취소`}
          onClick={() => {
            if (
              window.confirm(
                `${userName} 매칭을 취소하시겠습니까? \nVI러너의 경우 매칭된 가이드러너가 모두 취소됩니다.`,
              )
            ) {
              mutate();
            }
          }}
          sx={
            type === DisabilityEnum.GUIDE
              ? { color: theme.palette.guide.main }
              : { color: theme.palette.vi.main }
          }
        >
          <HighlightOffIcon fontSize="small" />
        </StyledCancelButton>
      )}
      {children}
    </StyledContainer>
  );
};

export default CancelMatchingButton;
