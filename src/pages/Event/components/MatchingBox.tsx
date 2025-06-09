import styled from '@emotion/styled';
import { CircularProgress, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import CancelMatchingButton from '../pages/EventDetail/components/CancelMatchingButton';

import eventApi from '@/apis/requests/event';
import { ApplyUserAttendType } from '@/apis/types/event';
import { ApplyUserChip } from '@/components/shared';
import { DisabilityEnum } from '@/types/group';
import { UserType } from '@/types/user';

//
//
//

interface MatchingBoxProps {
  selectedVi: string;
  selectedGuide: string;
  viData: ApplyUserAttendType;
  onGuideSelect: (userId: UserType['userId'], name: UserType['name']) => void;
  onViSelect: (userId: UserType['userId'], name: UserType['name']) => void;
  matchingMode?: boolean;
}

//
//
//

const StyledGuideList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

//
//
//

const MatchingBox: React.FC<MatchingBoxProps> = ({
  viData,
  selectedGuide,
  selectedVi,
  matchingMode = false,
  onGuideSelect,
  onViSelect,
}) => {
  const eventId = Number(useParams<{ eventId: string }>().eventId);

  const { data: guideList } = useQuery({
    queryKey: ['eventMatchedGuideGet', eventId, viData.userId],
    queryFn: () =>
      eventApi.eventMatchedGuideGet({ eventId, viId: viData.userId }),
  });

  return (
    <Stack
      role={matchingMode ? 'grid' : 'text'}
      direction="row"
      gap="1.25rem"
      aria-label={`${viData.name}의 가이드러너 ${guideList?.guide
        .map(({ name }) => name)
        .join(', ')}`}
    >
      <CancelMatchingButton
        visible={selectedVi === viData.userId}
        userId={viData.userId}
        userName={viData.name}
        type={DisabilityEnum.VI}
        onResetSelect={() => () => onViSelect(viData.userId, viData.name)}
      >
        <ApplyUserChip
          selected={selectedVi === viData.userId}
          clickable={matchingMode}
          isAttend={matchingMode ? false : viData.isAttended}
          type={DisabilityEnum.VI}
          name={viData.name}
          group={viData.recordDegree}
          onClick={() => onViSelect(viData.userId, viData.name)}
        />
      </CancelMatchingButton>
      {guideList ? (
        <StyledGuideList>
          {guideList.guide.map((user) => (
            <CancelMatchingButton
              key={user.userId}
              visible={selectedGuide === user.userId}
              userId={user.userId}
              userName={user.name}
              type={DisabilityEnum.GUIDE}
              onResetSelect={() => onGuideSelect(user.userId, user.name)}
            >
              <ApplyUserChip
                selected={selectedGuide === user.userId}
                clickable={matchingMode}
                key={`guide-${user.userId}`}
                isAttend={matchingMode ? false : user.isAttended}
                type={DisabilityEnum.GUIDE}
                name={user.name}
                group={user.recordDegree}
                onClick={() => onGuideSelect(user.userId, user.name)}
              />
            </CancelMatchingButton>
          ))}
        </StyledGuideList>
      ) : (
        <CircularProgress />
      )}
    </Stack>
  );
};

export default MatchingBox;
