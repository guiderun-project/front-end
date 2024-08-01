import styled from '@emotion/styled';
import { CircularProgress, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import eventApi from '@/apis/requests/event';
import { ApplyUserAttendType } from '@/apis/types/event';
import { ApplyUserChip } from '@/components/shared';
import { DisabilityEnum } from '@/types/group';

//
//
//

interface MatchingBoxProps {
  selectedVi: string;
  selectedGuide: string;
  viData: ApplyUserAttendType;
  onGuideSelect: (userId: string, name: string) => void;
  onViSelect: (userId: string, name: string) => void;
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
      <ApplyUserChip
        selected={selectedVi === viData.userId}
        clickable={matchingMode}
        isAttend={matchingMode ? false : viData.isAttended}
        type={DisabilityEnum.VI}
        name={viData.name}
        onClick={() => onViSelect(viData.userId, viData.name)}
      />
      {guideList ? (
        <StyledGuideList>
          {guideList.guide.map((user) => (
            <ApplyUserChip
              selected={selectedGuide === user.userId}
              clickable={matchingMode}
              key={`guide-${user.userId}`}
              isAttend={matchingMode ? false : user.isAttended}
              type={DisabilityEnum.GUIDE}
              name={user.name}
              onClick={() => onGuideSelect(user.userId, user.name)}
            />
          ))}
        </StyledGuideList>
      ) : (
        <CircularProgress />
      )}
    </Stack>
  );
};

export default MatchingBox;
