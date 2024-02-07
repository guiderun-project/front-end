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
  eventId: number;
  organizer: string;
  hasPartner: boolean;
  partner: string;
  title: string;
  recruitStatus: RecruitStatus;
  submit: boolean;
  status: RecruitStatus;
  date: string;
  created_at: string;
  updated_at?: string;
  details: string;
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
  recruitStatus: 'OPEN' | 'CLOSE';
};

export type myEventGetResponse = {
  items: MyEventItemType[];
};

export type upcomingEventGetRequest = {
  sort: 'OPEN' | 'UPCOMING';
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
