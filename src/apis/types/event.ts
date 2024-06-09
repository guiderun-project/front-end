import {
  DisabilityEnum,
  EventStatus,
  EventType,
  RecruitStatus,
  RunningGroup,
} from '@/types/group';
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
  name: string; //제목
  recruitStatus: RecruitStatus; //이벤트 모집 상태
  recruitStartDate: string; //모집 시작일
  recruitEndDate: string; //모집 마감일
  organizerId: string; //주최자 userId
  organizer: string; //주최자 이름
  oragnizerType: DisabilityEnum; //주최자가 vi인지 guide 인지
  organizerPace: RunningGroup; //주최자 러닝 등급
  date: string; //이벤트 시작일
  startTime: string; //"HH : MM"
  endTime: string; //"HH : MM"
  created_at: string; //생성일
  updated_at: string; //수정일
  place: string; //달리는 장소
  minNumV: number; //희망 vi 인원
  minNumG: number; //희망 guide 인원
  NumV: number; //참여 vi 인원
  NumG: number; //참여 guide 인원

  partner: string | null; // 파트너 이름 (없으면 null)
  partnerType: DisabilityEnum; // 파트너가 vi인지 guide인지
  partnerPace: RunningGroup; // 파트너 러닝 등급
  details: string; //상세사항
  //여기까지 이벤트 기본 정보

  checkOrganizer: boolean; // 이벤트 개설자인지 아닌
  submit: boolean; //내가 신청 완료된 이벤트인지 아닌지
  status: EventStatus /*
- EVENT_UPCOMING 이벤트 시작 전
- EVENT_OPEN 이벤트 진행중
- EVENT_END  이벤트 종료
*/;
};

export type EventPopupGetRequest = {
  eventId: number;
};

export type EventPopupGetResponse = {
  eventId: number; //이벤트 아이디
  type: EventType; //대회인지 훈련인지
  name: string; //제목
  organizer: string; //주최자 이름
  organizerType: DisabilityEnum; //주최자 장애유무
  organizerRecord: RunningGroup; //주최자 러닝등급
  recruitStatus: RecruitStatus; //이벤트 모집 상태
  status: EventStatus; //이벤트 상태
  date: string; //이벤트 시작일
  startTime: string; //"HH : MM"
  endTime: string; //"HH : MM"
  recruitVi: number; //모집 예정인 vi 수
  recruitGuide: number; //모집 예정인 guide 수
  viCnt: number; //모집된=참여한 vi 수
  guideCnt: number; //모집된=참여한 guide 수
  place: string; //달리는 장소
  content: string; //이벤트 내용
  updatedAt: string;

  isApply: boolean; //신청 여부
  hasPartner: boolean; //파트너 존재 여부
  partnerName: string; //파트너 이름
  partnerRecord: RunningGroup; //파트너 러닝등급
  partnerType: DisabilityEnum; //파트너 타입(가이드인지 vi인지)
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

export type EventTypeCountGetRequest = {
  userId: string;
};

export type EventTypeCountGetResponse = {
  totalCnt: number;
  trainingCnt: number; //훈련 참여 수
  contestCnt: number; //대회 참여 수
};

export type EventFormType = {
  recruitStartDate: string; //모집 시작일
  recruitEndDate: string; //모집 마감일
  name: string; ///이벤트 제목
  eventType: string; // 대회,훈련 구분
  date: string; //이벤트 시작일
  startTime: string; //시작 시간
  endTime: string; //끝나는 시간
  minNumV: number; //시각장애 러너 모집 희망 인원
  minNumG: number; //가이드 러너 모집 희망 인원
  place: string; //이벤트 장소
  content: string; //이벤트 상세 내용
};

export type NewEventPostRequest = EventFormType;

export type NewEventPostResponse = {
  eventId: number;
  isApprove: boolean;
};

export type EditEventPatchRequest = {
  eventId: number;
  EditEventPatchRequestBody: EventFormType;
};

export type EditEventPatchResponse = EventFormType;
