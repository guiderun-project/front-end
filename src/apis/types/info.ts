import {
  DisabilityEnum,
  EventType,
  GenderEnum,
  RecruitStatus,
  RoleEnum,
  RunningGroup,
} from '@/types/group';
import { PartnerSort } from '@/types/sort';

export type MyPageGetResponse = {
  role: RoleEnum;
  type: DisabilityEnum;
  gender: GenderEnum;
  recordDegree: RunningGroup;
  name: string;

  totalEvent: number;
  trainingCnt: number;
  contestCnt: number;
};

export type UserInfoGetResponse = {
  userId: string;
  name: string;
  type: DisabilityEnum;
  role: RoleEnum;
  gender: GenderEnum;
  phoneNumber: string;
  recordDegree: RunningGroup;
  age: number;
  snsId: string | null;
  img: string;
};

export type PersonalInfoGetRequest = {
  userId: string;
};

export type PersonalInfoGetResponse = {
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

export type PersonalInfoPatchRequest = Omit<
  PersonalInfoGetResponse,
  'type' | 'role'
>;

export type PersonalInfoPatchResponse = {
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

export type RunningSpecGuideGetRequest = {
  userId: string;
};

export type RunningSpecGuideGetResponse = {
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

export type RunningSpecGuidePatchRequest = RunningSpecGuideGetResponse;

export type RunningSpecGuidePatchResponse = {
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

export type RunningSpecViGetRequest = {
  userId: string;
};

export type RunningSpecViGetResponse = {
  isRunningExp: boolean;
  recordDegree: RunningGroup;
  detailRecord: string | null;
  runningPlace: string | null;
  guideName: string | null;

  howToKnow: string[] | null;
  motive: string | null;

  hopePrefs: string | null;
};

export type RunningSpecViPatchRequest = RunningSpecViGetResponse;

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

export type PermissionGetRequest = {
  userId: string;
};

export type PermissionGetResponse = {
  privacy: boolean;
  portraitRights: boolean;
};

export type PermissionPatchRequest = {
  privacy: boolean;
  portraitRights: boolean;
};

export type PermissionPatchResponse = {
  privacy: boolean;
  portraitRights: boolean;
};

export type ProfileGetRequest = {
  userId: string;
};

export type ProfileGetResponse = {
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

export type PartnerListGetRequest = {
  userId: string;
  sort?: PartnerSort;
  limit?: number;
  start?: number;
};

export type PartnerDataType = {
  userId: string;
  img: string; //프로필 이미지
  role: RoleEnum; //권한
  type: DisabilityEnum; //vi인지 guide 인지
  name: string;
  recordDegree: RunningGroup;
  trainingCnt: number; //훈련에서 함께 한 수
  contestCnt: number; //대회에서 함께 한 수
  like: number; //좋아요 수
  isLiked: boolean; //해당 파트너에게 좋아요를 눌렀는지
};

export type PartnerListGetResponse = {
  sort: PartnerSort;
  limit: number;
  start: number;
  items: PartnerDataType[];
};

export type PartnerListCountGetRequest = {
  userId: string;
};

export type PartnerListCountGetResponse = {
  count: number;
};

export type EventHistoryGetRequest = {
  userId: string;
  sort?: RecruitStatus;
  limit?: number;
  start?: number;
  year?: number;
};

export type EventDataType = {
  eventId: number;
  eventType: EventType;
  name: string;
  startDate: string;
  recruitStatus: RecruitStatus;
};

export type EventHistoryGetResponse = {
  items: EventDataType[];
};

export type EventHistoryCountGetRequest = {
  userId: string;
  year?: number;
  sort?: RecruitStatus;
};

export type EventHistoryCountGetResponse = {
  count: number;
};

export type ProfileImagePostRequest = {
  image: FormData;
};

export type ProfileImagePostResponse = {
  img: string;
};
