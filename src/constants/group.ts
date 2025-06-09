import { RunningGroup } from '@/types/group';

export const GROUP_LIST_WITHOUT_P: RunningGroup[] = [
  RunningGroup.A,
  RunningGroup.B,
  RunningGroup.C,
  RunningGroup.D,
  RunningGroup.E,
];

export const COMPETITION_GROUP: Record<RunningGroup, string> = {
  [RunningGroup.A]: '풀코스',
  [RunningGroup.B]: '30km',
  [RunningGroup.C]: '하프',
  [RunningGroup.D]: '10km',
  [RunningGroup.E]: '5km',
  [RunningGroup.P]: '',
};
