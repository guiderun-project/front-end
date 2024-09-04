import styled from '@emotion/styled';
import { Divider, Stack, Typography } from '@mui/material';

import { MatchingComponentProps } from '../panels/EventMatchingPanel';

import { ApplyUserChip } from '@/components/shared';
import MatchingBox from '@/pages/Event/components/MatchingBox';
import { DisabilityEnum } from '@/types/group';

export interface MatchingNonGroupContainerProps
  extends MatchingComponentProps {}

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

const MatchingNonGroupContainer: React.FC<MatchingNonGroupContainerProps> = ({
  guideOfNotMatched,
  onGuideSelect,
  onViSelect,
  selectedGuide,
  selectedVi,
  viOfMatched,
  viOfnotMatched,
  matchingMode,
}) => {
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
          {viOfMatched.length > 0 ? (
            viOfMatched.map((user, idx) => (
              <>
                <MatchingBox
                  key={`MatchingBox-${user.userId}`}
                  matchingMode={matchingMode}
                  viData={user}
                  selectedGuide={selectedGuide.userId}
                  selectedVi={selectedVi.userId}
                  onGuideSelect={onGuideSelect}
                  onViSelect={onViSelect}
                />
                {idx + 1 !== viOfMatched.length && (
                  <Divider aria-hidden sx={{ borderStyle: 'dashed' }} />
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
          {viOfnotMatched.length + guideOfNotMatched.length > 0 ? (
            <>
              <StyledUserListBox>
                {viOfnotMatched.map((user) => (
                  <ApplyUserChip
                    selected={selectedVi.userId === user.userId}
                    clickable={matchingMode}
                    key={user.userId}
                    isAttend={matchingMode ? false : user.isAttended}
                    name={user.name}
                    type={DisabilityEnum.VI}
                    onClick={() => onViSelect(user.userId, user.name)}
                  />
                ))}
              </StyledUserListBox>
              <Divider sx={{ borderStyle: 'dashed' }} />
              <StyledUserListBox>
                {guideOfNotMatched.map((user) => (
                  <ApplyUserChip
                    selected={selectedGuide.userId === user.userId}
                    clickable={matchingMode}
                    key={user.userId}
                    isAttend={matchingMode ? false : user.isAttended}
                    name={user.name}
                    type={DisabilityEnum.GUIDE}
                    onClick={() => onGuideSelect(user.userId, user.name)}
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
    <Stack gap="2.5rem" alignItems="center">
      {renderMatched()}
      {renderNotMatched()}
    </Stack>
  );
};

export default MatchingNonGroupContainer;
