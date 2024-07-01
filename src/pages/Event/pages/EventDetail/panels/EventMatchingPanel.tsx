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
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import eventApi from '@/apis/requests/event';
import { ApplyUserChip } from '@/components/shared';
import MatchingBox from '@/pages/Event/components/MatchingBox';
import { RootState } from '@/store/index';
import { DisabilityEnum } from '@/types/group';
import getAuthority from '@/utils/authority';

//
//
//

interface EventMatchingPanelProps {
  isOwner: boolean;
}

type SelectedUserType = {
  userId: string;
  name: string;
};

//
//
//

const StyledUserBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 1rem;
  background-color: #fff;
  border: 1px solid #34618d33;
  border-radius: 1rem;
`;

const StyledUserListBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
`;

//
//
//

const INITIAL_SELECTED: SelectedUserType = {
  name: '',
  userId: '',
};

//
//
//

const EventMatchingPanel: React.FC<EventMatchingPanelProps> = ({ isOwner }) => {
  const [matchingMode, setMatchingMode] = React.useState(false);
  const [selectedVi, setSelectedVi] =
    React.useState<SelectedUserType>(INITIAL_SELECTED);
  const [selectedGuide, setSelectedGuide] =
    React.useState<SelectedUserType>(INITIAL_SELECTED);

  const { role } = useSelector((state: RootState) => state.user);
  const eventId = Number(useParams<{ eventId: string }>().eventId);

  const queryClient = useQueryClient();

  const { data: matchedList, isLoading: isMatchedLoading } = useQuery({
    queryKey: ['eventMatchedViGet', eventId],
    queryFn: () => eventApi.eventMatchedViGet({ eventId }),
  });

  const { data: notMatchedList, isLoading: isNotMatchedLoading } = useQuery({
    queryKey: ['eventNotMatchingGet', eventId],
    queryFn: () => eventApi.eventNotMatchingGet({ eventId }),
  });

  const { mutate } = useMutation({
    mutationFn: ({ userId, viId }: { userId: string; viId: string }) =>
      eventApi.eventMatchingPost({ eventId, userId, viId }),
    onSuccess: () => {
      alert('매칭 처리 되었습니다.');
      setSelectedGuide(INITIAL_SELECTED);
      setSelectedVi(INITIAL_SELECTED);
    },
    onError: () => {
      alert('에러가 발생했습니다. ');
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

  const handleUserSelect =
    (type: DisabilityEnum) => (userId: string, name: string) => {
      if (!matchingMode) {
        return;
      }
      switch (type) {
        case DisabilityEnum.GUIDE:
          setSelectedGuide((prev) => {
            if (prev.userId === userId) {
              return INITIAL_SELECTED;
            }
            return { userId, name };
          });
          break;
        case DisabilityEnum.VI:
          setSelectedVi((prev) => {
            if (prev.userId === userId) {
              return INITIAL_SELECTED;
            }
            return { userId, name };
          });
          break;
      }
    };

  //
  //
  //
  React.useEffect(() => {
    if (
      selectedGuide.userId &&
      selectedVi.userId &&
      window.confirm(
        `시각장애러너 ${selectedVi.name}와 가이드러너 ${selectedGuide.name}을 매칭하시겠습니까?`,
      )
    ) {
      mutate({ userId: selectedGuide.userId, viId: selectedVi.userId });
    }
  }, [selectedGuide, selectedVi]);

  /**
   *
   */
  const renderMode = () => {
    if (getAuthority.isEditor(role) || isOwner) {
      return (
        <Stack
          direction="row"
          gap="2.5rem"
          justifyContent="center"
          alignItems="center"
        >
          <Typography component="h3" fontWeight={700}>
            매칭 모드
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
              value={matchingMode}
              color="info"
              inputProps={{ 'aria-label': '매칭 모드 활성화' }}
              onChange={() => {
                setMatchingMode((prev) => !prev);
                setSelectedGuide(INITIAL_SELECTED);
                setSelectedVi(INITIAL_SELECTED);
              }}
            />
            <Typography fontSize="0.75rem" fontWeight={500} color="#666">
              켜기
            </Typography>
          </Stack>
        </Stack>
      );
    }
  };

  const renderMatched = () => {
    return (
      <Stack gap="1rem" alignItems="center">
        <Typography
          component="h3"
          fontSize="0.875rem"
          fontWeight={700}
          color="#666"
        >
          매칭이 완료된 참가자
        </Typography>
        <StyledUserBox>
          {isMatchedLoading || !matchedList ? (
            <CircularProgress />
          ) : matchedList.vi.length ? (
            matchedList.vi.map((user, idx) => (
              <>
                <MatchingBox
                  key={`MatchingBox-${user.userId}`}
                  matchingMode={matchingMode}
                  viData={user}
                  selectedGuide={selectedGuide.userId}
                  selectedVi={selectedVi.userId}
                  onGuideSelect={handleUserSelect(DisabilityEnum.GUIDE)}
                  onViSelect={handleUserSelect(DisabilityEnum.VI)}
                />
                {idx + 1 !== matchedList.vi.length && (
                  <Divider sx={{ borderStyle: 'dashed' }} />
                )}
              </>
            ))
          ) : (
            <Typography fontWeight={700}>
              매칭이 완료된 참가자가 없습니다
            </Typography>
          )}
        </StyledUserBox>
      </Stack>
    );
  };

  const renderNotMatched = () => {
    return (
      <Stack gap="1rem" alignItems="center">
        <Typography
          component="h3"
          fontSize="0.875rem"
          fontWeight={700}
          color="#666"
        >
          매칭이 완료되지 않은 참가자
        </Typography>
        <StyledUserBox>
          {isNotMatchedLoading || !notMatchedList ? (
            <CircularProgress />
          ) : notMatchedList.notMatch.length ? (
            <>
              <StyledUserListBox>
                {notMatchedList.notMatch
                  .filter((user) => user.type === DisabilityEnum.VI)
                  .map((user) => (
                    <ApplyUserChip
                      selected={selectedVi.userId === user.userId}
                      clickable={matchingMode}
                      key={user.userId}
                      isAttend={matchingMode ? false : user.isAttened}
                      name={user.name}
                      type={DisabilityEnum.VI}
                      onClick={() =>
                        handleUserSelect(DisabilityEnum.VI)(
                          user.userId,
                          user.name,
                        )
                      }
                    />
                  ))}
              </StyledUserListBox>
              <Divider sx={{ borderStyle: 'dashed' }} />
              <StyledUserListBox>
                {notMatchedList.notMatch
                  .filter((user) => user.type === DisabilityEnum.GUIDE)
                  .map((user) => (
                    <ApplyUserChip
                      selected={selectedGuide.userId === user.userId}
                      clickable={matchingMode}
                      key={user.userId}
                      isAttend={matchingMode ? false : user.isAttened}
                      name={user.name}
                      type={DisabilityEnum.GUIDE}
                      onClick={() =>
                        handleUserSelect(DisabilityEnum.GUIDE)(
                          user.userId,
                          user.name,
                        )
                      }
                    />
                  ))}
              </StyledUserListBox>
            </>
          ) : (
            <Typography fontWeight={700}>
              매칭되지 않은 참가자가 없습니다
            </Typography>
          )}
        </StyledUserBox>
      </Stack>
    );
  };

  return (
    <Stack
      id="tabpanel-matching"
      gap="2.5rem"
      role="tabpanel"
      aria-labelledby="tab-matching"
    >
      {renderMode()}
      {renderMatched()}
      {renderNotMatched()}
    </Stack>
  );
};

export default EventMatchingPanel;
