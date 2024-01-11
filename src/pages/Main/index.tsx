import { Stack } from '@mui/material';

import {
  DisabilityChip,
  EventChip,
  EventStatus,
  GenderChip,
  GroupChip,
} from '@/components/shared';
import GropuChip from '@/components/shared/GroupChip/GroupChip';
import { DisabilityEnum, GenderEnum, RunningGroup } from '@/types/group';

const Main: React.FC = () => {
  return (
    <Stack gap="2rem" paddingTop="10rem">
      <Stack direction="row" gap="1rem">
        <EventChip variant="full" type="event" />
        <EventChip variant="full" type="training" />
        <EventChip variant="initial" type="event" />
        <EventChip variant="initial" type="training" />
      </Stack>
      <Stack direction="row" gap="1rem">
        <DisabilityChip component="chip" type={DisabilityEnum.VI} />
        <DisabilityChip component="chip" type={DisabilityEnum.GUIDE} />
        <DisabilityChip component="avartar" type={DisabilityEnum.VI} />
        <DisabilityChip component="avartar" type={DisabilityEnum.GUIDE} />
        <DisabilityChip
          component="avartar"
          variant="reserve"
          type={DisabilityEnum.VI}
        />
        <DisabilityChip
          component="avartar"
          variant="reserve"
          type={DisabilityEnum.GUIDE}
        />
      </Stack>
      <Stack direction="row" gap="1rem">
        <GenderChip type={GenderEnum.W} />
        <GenderChip type={GenderEnum.M} />
      </Stack>
      <Stack direction="row" gap="1rem">
        <GropuChip group={RunningGroup.A} />
        <GroupChip group={RunningGroup.B} />
        <GroupChip group={RunningGroup.C} />
        <GroupChip group={RunningGroup.D} />
        <GroupChip group={RunningGroup.E} />
        <GroupChip group={RunningGroup.P} />
      </Stack>
      <Stack direction="row" gap="1rem">
        <GropuChip type="text" group={RunningGroup.A} />
        <GroupChip type="text" group={RunningGroup.B} />
        <GroupChip type="text" group={RunningGroup.C} />
        <GroupChip type="text" group={RunningGroup.D} />
        <GroupChip type="text" group={RunningGroup.E} />
        <GroupChip type="text" group={RunningGroup.P} />
      </Stack>
      <Stack direction="row" gap="1rem">
        <EventStatus status="recruiting" />
        <EventStatus status="closed" />
        <EventStatus status="end" />
      </Stack>
    </Stack>
  );
};

export default Main;
