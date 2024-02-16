import {
  DisabilityEnum,
  EventType,
  GenderEnum,
  RecruitStatus,
  RoleEnum,
  RunningGroup,
} from '@/types/group';
import { EventSort, PartnerSort } from '@/types/sort';

export type myPageGetResponse = {
  role: RoleEnum;
  type: DisabilityEnum;
  gender: GenderEnum;
  recordDegree: RunningGroup;
  name: string;

  totalEvent: number;
  trainingCnt: number;
  contestCnt: number;
};

export type userInfoGetResponse = {
  userId: string;
  name: string;
  type: DisabilityEnum;
  role: RoleEnum;
  gender: GenderEnum;
  phoneNumber: string;
  recordDegree: RunningGroup;
  age: number;
  snsId: string;
};

export type personalInfoGetRequest = {
  userId: string;
};

export type personalInfoGetResponse = {
  name: string;
  type: DisabilityEnum;
  role: RoleEnum;
  gender: GenderEnum;
  phoneNumber: string;
  age: number;
  snsId: string;
  isOpenNumber: boolean;
  isOpenSns: boolean;
};

export type personalInfoPatchRequest = Omit<
  personalInfoGetResponse,
  'type' | 'role'
>;

export type personalInfoPatchResponse = {
  name: string;
  type: DisabilityEnum;
  role: RoleEnum;
  gender: GenderEnum;
  phoneNumber: string;
  age: number;
  snsId: string;
  isOpenNumber: boolean;
  isOpenSns: boolean;
};

export type runningSpecGuideGetRequest = {
  userId: string;
};

export type runningSpecGuideGetResponse = {
  recordDegree: RunningGroup;
  detailRecord: string | null;
  isGuideExp: boolean;
  runningPlace: string;
  viName: string | null;
  viRecord: string | null;
  viCount: string | null;
  howToKnow: string[] | null;
  motive: string | null;
  guidingPace: RunningGroup;
  hopePrefs: string | null;
};

export type runningSpecGuidePatchRequest = runningSpecGuideGetResponse;

export type runningSpecGuidePatchResponse = {
  recordDegree: RunningGroup;
  detailRecord: string | null;
  isGuideExp: boolean;
  runningPlace: string;
  viName: string | null;
  viRecord: string | null;
  viCount: string | null;

  howToKnow: string[] | null;
  motive: string | null;

  guidingPace: RunningGroup;
  hopePrefs: string | null;
};

export type runningSpecViGetRequest = {
  userId: string;
};

export type runningSpecViGetResponse = {
  isRunningExp: boolean;
  recordDegree: RunningGroup;
  detailRecord: string | null;
  runningPlace: string | null;
  guideName: string | null;

  howToKnow: string[] | null;
  motive: string | null;

  hopePrefs: string | null;
};

export type runningSpecViPatchRequest = runningSpecViGetResponse;

export type runningSpecViPatchResponse = {
  isRunningExp: boolean;
  recordDegree: RunningGroup;
  detailRecord: string | null;
  runningPlace: string | null;
  guideName: string | null;

  howToKnow: string[] | null;
  motive: string | null;

  hopePrefs: string | null;
};

export type permissionGetRequest = {
  userId: string;
};

export type permissionGetResponse = {
  privacy: boolean;
  portraitRights: boolean;
};

export type permissionPatchRequest = {
  privacy: boolean;
  portraitRights: boolean;
};

export type permissionPatchResponse = {
  privacy: boolean;
  portraitRights: boolean;
};

export type profileGetRequest = {
  userId: string;
};

export type profileGetResponse = {
  userId: string;
  role: RoleEnum;
  type: DisabilityEnum;
  recordDegree: RunningGroup;
  detailRecord: string | null;
  phoneNumber: string;
  isOpenNumber: boolean;
  age: number;
  snsId: string;
  isOpenSns: boolean;

  totalEvent: number;
  trainingCnt: number;
  contestCnt: number;
};

export type partnerListGetRequest = {
  userId: string;
  sort?: PartnerSort;
  limit?: number;
  start?: number;
};

export type partnerData = {
  userId: string;
  role: RoleEnum;
  type: DisabilityEnum;
  recordDegree: RunningGroup;
  name: string;
  trainingCnt: number;
  contestCnt: number;
};

export type partnerListGetResponse = {
  sort: string;
  limit: number;
  start: number;
  items: partnerData[];
};

export type partnerListCountGetRequest = {
  userId: string;
};

export type partnerListCountGetResponse = {
  count: number;
};

export type eventHistoryGetRequest = {
  userId: string;
  sort?: EventSort;
  limit?: number;
  start?: number;
};

export type eventData = {
  eventId: number;
  eventType: EventType;
  name: string;
  date: string;
  recruitStatus: RecruitStatus;
};

export type eventHistoryGetResponse = {
  sort: string;
  limit: number;
  start: number;
  items: eventData[];
};

export type eventHistoryCountGetRequest = {
  userId: string;
  sort?: EventSort;
};

export type eventHistoryCountGetResponse = {
  count: number;
};
