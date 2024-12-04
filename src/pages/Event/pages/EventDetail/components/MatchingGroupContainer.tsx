import { useContext } from 'react';

import { Stack } from '@mui/material';

import MatchingGroup from './MatchingGroup';
import MatchingTeam from './MatchingTeam';
import { EventContext } from '..';
import { MatchingComponentProps } from '../panels/EventMatchingPanel';

import { GROUP_LIST_WITHOUT_P } from '@/constants/group';
import { EventCategory } from '@/types/event';

interface MatchingGroupContainerProps extends MatchingComponentProps {}

const MatchingGroupContainer: React.FC<MatchingGroupContainerProps> = ({
  matchingMode,
  guideOfNotMatched,
  onGuideSelect,
  onViSelect,
  selectedGuide,
  selectedVi,
  viOfMatched,
  viOfnotMatched,
}) => {
  const eventData = useContext(EventContext);

  if (!eventData) return null;

  if (eventData.eventCategory === EventCategory.GROUP) {
    return (
      <Stack gap="2.5rem" alignItems="center">
        {GROUP_LIST_WITHOUT_P.slice(0, 2).map((group) => (
          <MatchingGroup
            key={`EventMatchingPanel-MatchingGroup-${group}`}
            matchingMode={matchingMode}
            group={group}
            selectedGuide={selectedGuide}
            selectedVi={selectedVi}
            guideOfNotMatched={guideOfNotMatched.filter(
              (user) => user.applyRecord === group,
            )}
            viOfnotMatched={viOfnotMatched.filter(
              (user) => user.applyRecord === group,
            )}
            viOfMatched={
              viOfMatched.filter((user) => user.applyRecord === group) ?? []
            }
            onGuideSelect={onGuideSelect}
            onViSelect={onViSelect}
          />
        ))}
      </Stack>
    );
  }

  return (
    <Stack gap="2.5rem" alignItems="center">
      {GROUP_LIST_WITHOUT_P.map((group) => (
        <MatchingTeam
          key={`EventMatchingPanel-MatchingGroup-${group}`}
          matchingMode={matchingMode}
          group={group}
          selectedGuide={selectedGuide}
          selectedVi={selectedVi}
          guideOfNotMatched={guideOfNotMatched.filter(
            (user) => user.applyRecord === group,
          )}
          viOfnotMatched={viOfnotMatched.filter(
            (user) => user.applyRecord === group,
          )}
          viOfMatched={
            viOfMatched.filter((user) => user.applyRecord === group) ?? []
          }
          onGuideSelect={onGuideSelect}
          onViSelect={onViSelect}
        />
      ))}
    </Stack>
  );
};

export default MatchingGroupContainer;
