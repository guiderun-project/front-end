import { EventType, RecruitStatus } from '@/types/group';
import { EventKind, EventSort } from '@/types/sort';

export type EventPostRequest = {
  recruitStartDate: string;
  recruitEndDate: string;
  name: string;
  type: EventType;
  startTime: string;
  endTime: string;
  maxNumV: number;
  maxNumG: number;
  place: string;
  content: string;
};

export type EventPostResponse = {
  eventId: number;
  isApprove: boolean;
};

export type EventPatchRequest = {
  eventId: number;
  EventPatchRequestBody: {
    recruitStartDate: string;
    recruitEndDate: string;
    name: string;
    type: EventType;
    startTime: string;
    endTime: string;
    maxNumV: number;
    maxNumG: number;
    place: string;
    content: string;
  };
};

export type EventPatchResponse = {
  eventId: number;
  isApprove: boolean;
};

export type EventDeleteRequest = {
  eventId: number;
};

export type EventGetRequest = {
  eventId: number;
};

export type EventGetResponse = {
  eventId: number; //이벤트 아이디
  type: EventType; //대회인지 훈련인지
  hasPartner: boolean; //파트너가 있는지 (1차 기준 false)
  partner: string; //조회하는 사람이 신청했고 파트너가 있으면 이름 노출. (1차 기준 빈 값)
  title: string; //제목
  recruitStatus: RecruitStatus; //이벤트 모집 상태
  submit: boolean; //신청 완료된 이벤트인지 아닌지
  status: RecruitStatus; //이벤트 진행 상태
  date: string; //이벤트 시작일
  startTime: string; //"HH : MM"
  endTime: string; //"HH : MM"
  created_at: string; //생성일
  updated_at: string; //수정일
  details: string; //상세사항
  maxNumV: number; //시각장애러너 인원 제한
  maxNumG: number; //가이드러너 인원 제한
  place: string; //달리는 장소
};

export type EventPopupGetRequest = {
  eventId: number;
};

export type EventPopupGetResponse = {
  eventId: number; //이벤트 아이디
  type: EventType; //대회인지 훈련인지
  name: string; //제목
  recruitStatus: RecruitStatus; //이벤트 모집 상태
  date: string; //이벤트 시작일
  startTime: string; //"HH : MM"
  endTime: string; //"HH : MM"
  viCnt: number; //모집된 vi 수
  guideCnt: number; //모집된 guide 수
  place: string; //달리는 장소
  content: string; //이벤트 내용
  updatedAt: string; //수정일
};

export type MyEventGetRequest = {
  sort: EventSort;
  year: number;
};

export type MyEventItemType = {
  eventId: number;
  eventType: EventType;
  name: string;
  dDay: number;
  endDate: string;
  recruitStatus: RecruitStatus;
};

export type MyEventGetResponse = {
  items: MyEventItemType[];
};

export type UpcomingEventGetRequest = {
  sort: EventSort.Open | EventSort.Upcoming;
};

export type UpcomingEventItemType = {
  eventId: number;
  eventType: EventType;
  name: string;
  isApply: boolean; //신청 여부
  date: string; // 모집 마감일 or 대회 시작일
  recuitStatus: RecruitStatus; //이벤트 모집 상태
};

export type UpcomingEventGetResponse = {
  items: UpcomingEventItemType[];
};

export type AllEventGetRequest = {
  limit: number;
  start: number;
  sort: EventKind;
  type: EventType;
  kind: RecruitStatus;
};

export type AllEventItemType = {
  eventId: number;
  eventType: EventType;
  name: string;
  startDate: string;
  recruitStatus: RecruitStatus;
};

export type AllEventGetResponse = {
  items: AllEventItemType[];
};

export type AllEventCountGetRequest = {
  sort: EventKind;
  type: EventType;
  kind: RecruitStatus;
};

export type AllEventCountGetResponse = {
  count: number;
};

export type SearchEventCountGetRequest = {
  title: string;
};

export type SearchEventCountGetResponse = {
  count: number;
};

export type SearchEventGetRequest = {
  title: string;
  limit: number;
  start: number;
};

export type EventItemType = {
  eventId: number;
  eventType: EventType;
  name: string;
  endDate: string;
  recruitStatus: RecruitStatus;
};

export type SearchEventGetResponse = {
  items: EventItemType[];
};

type UpcomingEventDdayType = {
  name: string;
  dDay: number;
};

export type UpcomingEventDdayGetResponse = {
  eventItems: UpcomingEventDdayType[];
};

export type EventCalendarGetRequest = {
  year: number;
  month: number;
};

type EventCalendarResultType = {
  day: number;
  competition: boolean;
  training: boolean;
};

export type EventCalendarGetResponse = {
  result: EventCalendarResultType[];
};

export type CalendarEventItemType = {
  eventId: number;
  eventType: EventType;
  name: string;
  startDate: string;
  recruitStatus: RecruitStatus;
};

export type EventCalendarDetailGetRequest = {
  year: number;
  month: number;
  day: number;
};

export type EventCalendarDetailGetResponse = {
  items: CalendarEventItemType[];
};

export type EventTypeCountGetResponse = {
  totalCnt: number;
  trainingCnt: number; //훈련 참여 수
  contestCnt: number; //대회 참여 수
};

export type EventFormType = {
  recruitStartDate: String; //모집 시작일
  recruitEndDate: String; //모집 마감일
  name: String; ///이벤트 제목
  eventType: String; // 대회,훈련 구분
  date: String; //이벤트 시작일
  startTime: String; //시작 시간
  endTime: String; //끝나는 시간
  minNumV: number; //시각장애 러너 모집 희망 인원
  minNumG: number; //가이드 러너 모집 희망 인원
  place: String; //이벤트 장소
  content: String; //이벤트 상세 내용
};

export type NewEventPostRequest = EventFormType;

export type NewEventPostResponse = {
  eventId: number;
  isApprove: boolean;
};
