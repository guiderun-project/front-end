import React, { useContext } from 'react';

import {
  Button,
  CircularProgress,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { EventContext } from '..';
import MatchingGroupContainer from '../components/MatchingGroupContainer';
import MatchingNonGroupContainer from '../components/MatchingNonGroupContainer';

import eventApi from '@/apis/requests/event';
import { ApplyUserAttendType } from '@/apis/types/event';
import { RootState } from '@/store/index';
import { EventCategory } from '@/types/event';
import { DisabilityEnum } from '@/types/group';
import { UserType, ViType } from '@/types/user';
import getAuthority from '@/utils/authority';

export interface MatchingComponentProps {
  matchingMode?: boolean;
  selectedVi: SelectedUserType;
  selectedGuide: SelectedUserType;
  viOfMatched: ApplyUserAttendType[];
  viOfnotMatched: ApplyUserAttendType[];
  guideOfNotMatched: ApplyUserAttendType[];
  onGuideSelect: (userId: UserType['userId'], name: UserType['name']) => void;
  onViSelect: (userId: UserType['userId'], name: UserType['name']) => void;
}
interface EventMatchingPanelProps {
  isOwner: boolean;
}

export type SelectedUserType = {
  userId: UserType['userId'];
  name: UserType['name'];
};

const INITIAL_SELECTED: SelectedUserType = {
  name: '',
  userId: '',
};

const EventMatchingPanel: React.FC<EventMatchingPanelProps> = ({ isOwner }) => {
  const [matchingMode, setMatchingMode] = React.useState(false);
  const [selectedVi, setSelectedVi] =
    React.useState<SelectedUserType>(INITIAL_SELECTED);
  const [selectedGuide, setSelectedGuide] =
    React.useState<SelectedUserType>(INITIAL_SELECTED);

  const eventData = useContext(EventContext);

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

  const { data: applyCount, isLoading: isApplyCountLoading } = useQuery({
    queryKey: ['eventApplyCountGet', eventId],
    queryFn: () => eventApi.eventApplyCountGet({ eventId }),
  });

  const { mutate } = useMutation({
    mutationFn: ({
      userId,
      viId,
    }: {
      userId: UserType['userId'];
      viId: ViType['userId'];
    }) => eventApi.eventMatchingPost({ eventId, userId, viId }),
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

  const { mutate: automatching } = useMutation({
    mutationFn: () => eventApi.eventAutoMatching(eventId),
    onSuccess: () => {
      alert('❤️자동 매칭 매직❤️');
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
    (type: DisabilityEnum) =>
    (userId: UserType['userId'], name: UserType['name']) => {
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
        <Stack>
          {getAuthority.isAdmin(role) && (
            <Button
              size="small"
              color="error"
              onClick={() => {
                if (window.confirm('자동매칭 하시겠어요?')) {
                  automatching();
                }
              }}
            >
              🔥자동매칭🔥
            </Button>
          )}
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
        </Stack>
      );
    }
  };

  const renderList = () => {
    if (isMatchedLoading || isNotMatchedLoading || isApplyCountLoading) {
      return (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      );
    }

    if (!notMatchedList || !matchedList) return <>에러 발생</>;

    if (
      (applyCount?.count ?? 0) > 20 ||
      (eventData && eventData.eventCategory === EventCategory.GROUP)
    ) {
      return (
        <MatchingGroupContainer
          matchingMode={matchingMode}
          guideOfNotMatched={notMatchedList.notMatch.filter(
            (user) => user.type === DisabilityEnum.GUIDE,
          )}
          selectedGuide={selectedGuide}
          selectedVi={selectedVi}
          viOfMatched={matchedList.vi}
          viOfnotMatched={notMatchedList.notMatch.filter(
            (user) => user.type === DisabilityEnum.VI,
          )}
          onGuideSelect={handleUserSelect(DisabilityEnum.GUIDE)}
          onViSelect={handleUserSelect(DisabilityEnum.VI)}
        />
      );
    }
    return (
      <MatchingNonGroupContainer
        matchingMode={matchingMode}
        guideOfNotMatched={notMatchedList.notMatch.filter(
          (user) => user.type === DisabilityEnum.GUIDE,
        )}
        selectedGuide={selectedGuide}
        selectedVi={selectedVi}
        viOfMatched={matchedList.vi}
        viOfnotMatched={notMatchedList.notMatch.filter(
          (user) => user.type === DisabilityEnum.VI,
        )}
        onGuideSelect={handleUserSelect(DisabilityEnum.GUIDE)}
        onViSelect={handleUserSelect(DisabilityEnum.VI)}
      />
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
      {renderList()}
    </Stack>
  );
};

export default EventMatchingPanel;
