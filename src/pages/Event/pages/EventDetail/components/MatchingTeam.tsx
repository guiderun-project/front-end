import styled from '@emotion/styled';
import { Divider, Stack, Typography } from '@mui/material';

import { MatchingComponentProps } from '../panels/EventMatchingPanel';

import { ApplyUserChip, GroupChip } from '@/components/shared';
import { TEAM_COLOR } from '@/constants/color';
import { GROUP_LIST_WITHOUT_P } from '@/constants/group';
import { MATCHING_BOX_ID } from '@/constants/id';
import MatchingBox from '@/pages/Event/components/MatchingBox';
import { DisabilityEnum, RunningGroup } from '@/types/group';

interface MatchingTeamProps extends MatchingComponentProps {
  group: RunningGroup;
}

const StyledUserBox = styled.div<{ group: RunningGroup }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 1rem;
  background-color: #fff;
  border: 2px solid ${({ group }) => TEAM_COLOR[group]};
  border-radius: 1rem;
`;

const StyledUserListBox = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
`;

const StyledGroupAnchor = styled.a`
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  text-decoration-line: none;
`;

const MatchingTeam: React.FC<MatchingTeamProps> = ({
  matchingMode = false,
  group,
  viOfMatched,
  viOfnotMatched,
  guideOfNotMatched,
  selectedGuide,
  selectedVi,
  onGuideSelect,
  onViSelect,
}) => {
  return (
    <Stack id={MATCHING_BOX_ID(group)}>
      <Stack direction="row" justifyContent="space-around">
        {GROUP_LIST_WITHOUT_P.map((groupItem) => (
          <StyledGroupAnchor
            id={`StyledGroupAnchor-${group}-${groupItem}`}
            href={`#${MATCHING_BOX_ID(groupItem)}`}
            aria-label={`그룹 ${groupItem}${
              group === groupItem ? '' : '으로 이동'
            }`}
            aria-current={group === groupItem}
          >
            <Stack
              aria-hidden
              boxSizing="border-box"
              padding="0.75rem 0"
              borderBottom={
                group === groupItem
                  ? `4px solid ${TEAM_COLOR[groupItem]}`
                  : 'none'
              }
            >
              <GroupChip type="avatar" group={groupItem} />
            </Stack>
          </StyledGroupAnchor>
        ))}
      </Stack>
      <StyledUserBox group={group}>
        <Stack gap="1.5rem" alignItems="center">
          <Typography
            component="h3"
            fontSize="0.875rem"
            fontWeight={700}
            color="#666"
          >
            매칭이 완료된 참가자
          </Typography>
          {viOfMatched.length > 0 &&
            viOfMatched.map((user, idx) => (
              <Stack key={`MatchingBox-${user.userId}`} gap="1rem">
                <MatchingBox
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
              </Stack>
            ))}
        </Stack>
        <Divider aria-hidden sx={{ borderStyle: 'dashed' }} />
        <Stack gap="1.5rem" alignItems="center" paddingTop="2rem">
          <Typography
            component="h3"
            fontSize="0.875rem"
            fontWeight={700}
            color="#666"
          >
            매칭이 완료되지 않은 참가자
          </Typography>
          {viOfnotMatched.length + guideOfNotMatched.length > 0 && (
            <Stack gap="1rem" width="100%" alignItems="center">
              <StyledUserListBox>
                {viOfnotMatched.map((user) => (
                  <ApplyUserChip
                    selected={selectedVi.userId === user.userId}
                    clickable={matchingMode}
                    key={user.userId}
                    isAttend={matchingMode ? false : user.isAttended}
                    name={user.name}
                    group={user.recordDegree}
                    type={DisabilityEnum.VI}
                    onClick={() => onViSelect(user.userId, user.name)}
                  />
                ))}
              </StyledUserListBox>
              <Divider aria-hidden sx={{ borderStyle: 'dashed' }} />
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
            </Stack>
          )}
        </Stack>
      </StyledUserBox>
    </Stack>
  );
};

export default MatchingTeam;
