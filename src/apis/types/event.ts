import { EventType, RecruitStatus } from '@/types/group';
import { EventKind, EventSort } from '@/types/sort';

export type eventPostRequest = {
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

export type eventPostResponse = {
  eventId: number;
  isApprove: boolean;
};

export type eventPatchRequest = {
  eventId: number;
  eventPatchRequestBody: {
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

export type eventPatchResponse = {
  eventId: number;
  isApprove: boolean;
};

export type eventDeleteRequest = {
  eventId: number;
};

export type eventGetRequest = {
  eventId: number;
};

export type eventGetResponse = {
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

export type eventPopupGetRequest = {
  eventId: number;
};

export type eventPopupGetResponse = {
  eventId: number; //이벤트 아이디
  type: EventType; //대회인지 훈련인지
  title: string; //제목
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

export type myEventGetRequest = {
  sort: 'OPEN' | 'END';
  year: number;
  month: number;
};

export type MyEventItemType = {
  eventId: number;
  eventType: EventType;
  name: string;
  dDay: number;
  endDate: string;
  recruitStatus: EventSort.Open | EventSort.End;
};

export type myEventGetResponse = {
  items: MyEventItemType[];
};

export type upcomingEventGetRequest = {
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

export type upcomingEventGetResponse = {
  items: UpcomingEventItemType[];
};

export type allEventGetRequest = {
  limit: number;
  start: number;
  sort: EventSort;
  type: EventType;
  kind: EventKind;
};

export type AllEventItemType = {
  eventId: number;
  eventType: EventType;
  name: string;
  date: string;
  recruitStatus: RecruitStatus;
};

export type allEventGetResponse = {
  items: AllEventItemType[];
};

export type allEventCountGetRequest = {
  sort: EventSort;
  type: EventType;
  kind: EventKind;
};

export type allEventCountGetResponse = {
  count: number;
};

export type searchEventGetRequest = {
  title: string;
};

export type SearchEventItemType = {
  eventId: number;
  eventType: EventType;
  name: string;
  endDate: string;
  recruitStatus: RecruitStatus;
};

export type searchEventGetResponse = {
  items: SearchEventItemType[];
};

export type calendarGetRequest = {
  year: number;
  month: number;
};

export type CalendarResultType = {
  day: number;
  competition: boolean;
  training: boolean;
};

export type calendarGetResponse = {
  result: CalendarResultType[];
};

export type detailCalendarGetRequest = {
  year: number;
  month: number;
  day: number;
};

export type DetailCalendarItemType = SearchEventItemType;

export type detailCalendarGetResponse = {
  items: DetailCalendarItemType[];
};
