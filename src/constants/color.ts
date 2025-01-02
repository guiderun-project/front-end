import { RunningGroup } from '@/types/group';

export const TEAM_COLOR: Record<RunningGroup, string> = {
  A: '#CB5A37',
  B: '#DB8403',
  C: '#99940B',
  D: '#31A515',
  E: '#2D97A6',
  P: '#8E8E8E',
} as const;

export const GROUP_COLOR = {
  MILE: '#0066CA',
  BASIC: '#C505D7',
} as const;

export const DISABILITY_COLOR = {
  VI: { MAIN: '#900782', SUB: '#F2DAEF' },
  GUIDE: { MAIN: '#0C3B82', SUB: '#DDE8F1' },
} as const;

export const GENDER_COLOR = {
  WOMAN: '#D96A94',
  MAN: '#6885D1',
} as const;

export const EVENT_COLOR = {
  EVENT: '#3D6CAB',
  TRAINING: '#4C5056',
} as const;
