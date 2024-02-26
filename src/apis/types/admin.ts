import {
  DisabilityEnum,
  EventType,
  GenderEnum,
  RecruitStatus,
  RoleEnum,
  RunningGroup,
} from '@/types/group';

export type UserListItemType = {
  userId: string;
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

export type adminUserListGetRequest = {
  limit: number;
  start: number;
};

export type adminUserListGetResponse = {
  limit: number;
  start: number;
  items: UserListItemType[];
};

export type adminUserListCountGetResponse = {
  count: number;
};

export type adminViApplyGetRequest = {
  userId: string;
};

export type adminViApplyGetResponse = {
  //인적사항
  phoneNumber: String; //전화번호
  age: number; //나이
  snsId: String | null; //sns 계정

  //러닝스펙
  isRunningExp: boolean; //러닝 경험 유무
  runningPlace: String | null; //러닝한 장소
  detailRecord: String | null; //상세기록
  recordDegree: RunningGroup | null; //기록
  guideName: String | null; // 함께 뛴 가이드 이름
  hopePrefs: string | null; //희망사항

  //러닝 경험 있을 시 null
  howToknow: String[] | null; //알게 된 계기
  motive: String | null; //동기

  //약관동의
  privacy: boolean; //개인정보 동의
  portraitRights: boolean; //초상권 동의
};

export type adminGuideApplyGetRequest = {
  userId: string;
};

export type adminGuideApplyGetResponse = {
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

export type adminApproveUserPostRequest = {
  userId: string;
  isApprove: boolean;
};

export type adminApproveUserPostResponse = {
  role: RoleEnum;
};

export type adminEventListGetRequest = {
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

export type adminEventListGetResponse = {
  items: EventListItemType[];
};

export type adminEventListCountGetResponse = {
  count: number;
};

export type adminEventHistoryCountGetRequest = {
  userId: string;
  year: number;
  month: number;
};

export type adminEventHistoryCountGetResponse = {
  count: number;
};

export type adminEventHistoryGetRequest = {
  userId: string;
  start: number;
  limit: number;
  year: number;
  month: number;
};

export type adminEventHistoryGetResponse = {
  items: {
    eventId: number;
    eventType: EventType;
    name: string;
    endDate: string;
    recruitStatus: RecruitStatus;
  }[];
};

export type adminEventTotalCountGetRequest = {
  userId: string;
};

export type adminEventTotalCountGetResponse = {
  training: number;
  competition: number;
};
