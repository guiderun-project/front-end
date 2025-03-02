import { useContext } from 'react';

import { Stack } from '@mui/material';

import AttendGroupAccordion from './AttendGroupAccordion';
import AttendTeamAccordion from './AttendTeamAccordion';
import { EventContext } from '..';

import { EventApplyStatusGetResponse } from '@/apis/types/event';
import { GROUP_LIST_WITHOUT_P } from '@/constants/group';
import { EventCategory } from '@/types/event';
import { DisabilityEnum, RunningGroup } from '@/types/group';

interface AttendGroupBoxProps {
  member: EventApplyStatusGetResponse;
}

const AttendGroupBox: React.FC<AttendGroupBoxProps> = ({ member }) => {
  const eventData = useContext(EventContext);

  if (!eventData) return null;

  if (eventData.eventCategory === EventCategory.GROUP) {
    return (
      <Stack gap="1.25rem">
        {GROUP_LIST_WITHOUT_P.slice(0, 2).map((group) => (
          <AttendGroupAccordion
            key={`AttendGroupBox-${group}`}
            group={RunningGroup[group]}
            attendedMemberOfGuide={member.attend.filter(
              (user) =>
                user.applyRecord === RunningGroup[group] &&
                user.type === DisabilityEnum.GUIDE,
            )}
            attendedMemberOfVi={member.attend.filter(
              (user) =>
                user.applyRecord === RunningGroup[group] &&
                user.type === DisabilityEnum.VI,
            )}
            notAttendedMemberOfGuide={member.notAttend.filter(
              (user) =>
                user.applyRecord === RunningGroup[group] &&
                user.type === DisabilityEnum.GUIDE,
            )}
            notAttendedMemberOfVi={member.notAttend.filter(
              (user) =>
                user.applyRecord === RunningGroup[group] &&
                user.type === DisabilityEnum.VI,
            )}
          />
        ))}
      </Stack>
    );
  }
  return (
    <Stack gap="1.25rem">
      {GROUP_LIST_WITHOUT_P.map((group) => (
        <AttendTeamAccordion
          type={eventData.type}
          key={`AttendGroupBox-${group}`}
          group={RunningGroup[group]}
          attendedMemberOfGuide={member.attend.filter(
            (user) =>
              user.applyRecord === RunningGroup[group] &&
              user.type === DisabilityEnum.GUIDE,
          )}
          attendedMemberOfVi={member.attend.filter(
            (user) =>
              user.applyRecord === RunningGroup[group] &&
              user.type === DisabilityEnum.VI,
          )}
          notAttendedMemberOfGuide={member.notAttend.filter(
            (user) =>
              user.applyRecord === RunningGroup[group] &&
              user.type === DisabilityEnum.GUIDE,
          )}
          notAttendedMemberOfVi={member.notAttend.filter(
            (user) =>
              user.applyRecord === RunningGroup[group] &&
              user.type === DisabilityEnum.VI,
          )}
        />
      ))}
    </Stack>
  );
};

export default AttendGroupBox;
