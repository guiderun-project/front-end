import { Stack } from '@mui/material';

import AttendGroupAccordion from './AttendGroupAccordion';

import { EventApplyStatusGetResponse } from '@/apis/types/event';
import { GROUP_LIST_WITHOUT_P } from '@/constants/group';
import { DisabilityEnum, RunningGroup } from '@/types/group';

interface AttendGroupBoxProps {
  member: EventApplyStatusGetResponse;
}

const AttendGroupBox: React.FC<AttendGroupBoxProps> = ({ member }) => {
  return (
    <Stack gap="1.25rem">
      {GROUP_LIST_WITHOUT_P.map((group) => (
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
};

export default AttendGroupBox;
