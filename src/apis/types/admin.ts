import {
  DisabilityEnum,
  EventType,
  GenderEnum,
  RecruitStatus,
  RoleEnum,
  RunningGroup,
} from '@/types/group';
import { PartnerDataType } from './info';

export type UserListItemType = {
  userId: string;
  img: string;
  role: RoleEnum; //유저 권한
  type: DisabilityEnum; //vi인지 guide인지
  name: string;
  team: RunningGroup; //팀
  gender: GenderEnum; //성별
  age: number; //나이
  snsId: string; //sns 계정
  phoneNumber: string; //전화번호

  trainingCnt: number; //참여한 훈련 수
  competitionCnt: number; //참여한 대회 수
  update_date: string; //수정일
  update_time: string; //수정 시간
};

export type AdminUserListGetRequest = {
  limit: number;
  start: number;
  time?: 0 | 1;
  type?: 0 | 1;
  gender?: 0 | 1;
  team?: 0 | 1;
  approval?: 0 | 1;
};

export type AdminUserListGetResponse = {
  limit: number;
  start: number;
  items: UserListItemType[];
};

export type AdminUserListCountGetResponse = {
  count: number;
};

export type AdminViApplyGetRequest = {
  userId: string;
};

export type AdminUserSearchGetRequest = {
  limit: number;
  start: number;
  text: string;
  time?: 0 | 1;
  type?: 0 | 1;
  gender?: 0 | 1;
  team?: 0 | 1;
  approval?: 0 | 1;
};

export type AdminUserSearchGetResponse = {
  items: UserListItemType[];
};

export type AdminUserSearchCountGetRequest = {
  text: string;
};

export type AdminUserSearchCountGetResponse = {
  count: number;
};

export type AdminViApplyGetResponse = {
  //인적사항
  phoneNumber: string; //전화번호
  age: number; //나이
  snsId: string | null; //sns 계정

  //러닝스펙
  isRunningExp: boolean; //러닝 경험 유무
  runningPlace: string | null; //러닝한 장소
  detailRecord: string | null; //상세기록
  recordDegree: RunningGroup | null; //기록
  guideName: string | null; // 함께 뛴 가이드 이름
  hopePrefs: string | null; //희망사항

  //러닝 경험 있을 시 null
  howToknow: string[] | null; //알게 된 계기
  motive: string | null; //동기

  //약관동의
  privacy: boolean; //개인정보 동의
  portraitRights: boolean; //초상권 동의
};

export type AdminGuideApplyGetRequest = {
  userId: string;
};

export type AdminGuideApplyGetResponse = {
  //인적사항
  phoneNumber: string; //전화번호
  age: number; //나이
  snsId: string | null; //sns 계정

  //러닝 스펙
  isGuideExp: boolean; //가이드 경험 유무
  recordDegree: RunningGroup; //기록
  detailRecord: string; // 상세 기록
  viCount: string | null; //상세한 가이드 경험
  guidingPace: RunningGroup; //가능한 페이스 그룹 *선택
  hopePrefs: string | null; //희망사항 *선택

  //가이드 경험 있을 때 null
  howToKnow: string[] | null; //알게 된 계기 *선택
  motive: string | null; //동기 *선택

  privacy: boolean; //개인정보 동의 *필수
  portraitRights: boolean; //초상권 동의 *필수
};

export type AdminApproveUserPostRequest = {
  userId: string;
  isApprove: boolean;
  recordDegree: RunningGroup;
};

export type AdminApproveUserPostResponse = {
  role: RoleEnum;
};

export type AdminEventListGetRequest = {
  limit: number;
  start: number;
};

export type EventListItemType = {
  eventId: number;
  title: string;
  smallDate: string; // 좋은 이름 추천 받아요 [1/7]
  date: string; //24.02.21 PM 2:15:09
  organizer: string; //생성자
  pace: RunningGroup;
  recuitStatus: RecruitStatus;
  approval: boolean; //이벤트 승인 여부
  participation: number; //50
  viParticipation: number; //20
  guideParticipation: number; //30
  update_date: string; // 24.02.21
  update_time: string; // 2:15:09
};

export type AdminEventListGetResponse = {
  items: EventListItemType[];
};

export type AdminEventListCountGetResponse = {
  count: number;
};

export type AdminEventHistoryCountGetRequest = {
  userId: string;
  year: number;
  month: number;
};

export type AdminEventHistoryCountGetResponse = {
  count: number;
};

export type AdminEventHistoryGetRequest = {
  userId: string;
  start: number;
  limit: number;
  year: number;
  month: number;
};

export type EventHistoryItemType = {
  eventId: number;
  eventType: EventType;
  name: string;
  endDate: string;
  recruitStatus: RecruitStatus;
};

export type AdminEventHistoryGetResponse = {
  items: EventHistoryItemType[];
};

export type AdminEventTotalCountGetRequest = {
  userId: string;
};

export type AdminEventTotalCountGetResponse = {
  training: number;
  competition: number;
};

//어드민 메인 페이지
export type AdminNewUserGetRequest = {
  limit?: number;
  start?: number;
};

export type AdminNewUserGetResponse = {
  items: {
    userId: string;
    img: string;
    role: RoleEnum; //권한
    type: DisabilityEnum; //vi인지 guide인지
    name: string;
    trainingCnt: number; //훈련 참여 수
    contestCnt: number; //대회 참여
    like: number; //좋아요 수
    recordDegree: RunningGroup;
  }[];
};

export type AdminCurrentEventGetRequest = {
  limit?: number;
  start?: number;
};

export type CurrentEventType = {
  eventId: number; //이벤트 id
  eventType: EventType; //훈련인지 대회인지
  name: string;
  recruitStatus: RecruitStatus; //모집 상태
  date: string;
};

export type AdminCurrentEventGetResponse = {
  items: CurrentEventType[];
};

export type AdminEventTypeCountGetRequest = {
  userId: string;
};

export type AdminEventTypeCountGetResponse = {
  trainingCnt: number;
  contestCnt: number;
  totalCnt: number;
};

export type AdminSearchEventHistoryGetRequest = {
  userId: string;
  text: string;
  limit?: number;
  start?: number;
};

export type SearchEventHistoryType = {
  eventId: number;
  eventType: EventType;
  name: string;
  startDate: string;
  recruitStatus: RecruitStatus;
};

export type AdminSearchEventHistoryGetResponse = {
  items: SearchEventHistoryType[];
};

export type AdminSearchEventHistoryCountGetRequest = {
  userId: string;
  text: string;
};

export type AdminSearchEventHistoryCountGetResponse = {
  count: number;
};

export type AdminPartnerTypeCountGetRequest = {
  userId: string;
};

export type AdminPartnerTypeCountGetResponse = {
  trainingCnt: number;
  contestCnt: number;
};

export type AdminPartnerHistoryCountGetRequest = {
  userId: string;
  kind?: EventType;
};

export type AdminPartnerHistoryCountGetResponse = {
  count: number;
};

export type AdminPartnerHistoryGetRequest = {
  userId: string;
  kind?: EventType;
  start?: number;
  limit?: number;
};

export type AdminPartnerHistoryGetResponse = {
  items: {
    userId: string;
    img: string; //프로필 이미지
    role: RoleEnum; //권한
    type: DisabilityEnum; //vi인지 guide 인지
    name: string;
    recordDegree: RunningGroup;
    like: number; //좋아요 수
  }[];
};

export type AdminSearchPartnerHistoryCountGetRequest = {
  userId: string;
  text: string;
};

export type AdminSearchPartnerHistoryCountGetResponse = {
  count: number;
};

export type AdminSearchPartnerHistoryGetRequest = {
  userId: string;
  text: string;
  start?: number;
  limit?: number;
};

export type AdminSearchPartnerHistoryGetResponse = {
  items: Omit<PartnerDataType, 'isLiked'>[];
};
