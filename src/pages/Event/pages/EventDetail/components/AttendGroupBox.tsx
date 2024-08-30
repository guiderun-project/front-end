import { Stack } from '@mui/material';

import AttendGroupAccordion from './AttendGroupAccordion';

import { EventApplyStatusGetResponse } from '@/apis/types/event';
import { DisabilityEnum, RunningGroup } from '@/types/group';

interface AttendGroupBoxProps {
  member: EventApplyStatusGetResponse;
}

const AttendGroupBox: React.FC<AttendGroupBoxProps> = ({ member }) => {
  return (
    <Stack gap="1.25rem">
      {(Object.keys(RunningGroup) as Array<keyof typeof RunningGroup>).map(
        (group) => {
          if (group === 'P') return;
          return (
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
          );
        },
      )}
    </Stack>
  );
};

export default AttendGroupBox;
