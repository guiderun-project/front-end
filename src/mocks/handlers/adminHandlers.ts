import { http, HttpHandler, HttpResponse } from 'msw';

import { NoneType } from '../handlers';

import { baseURL } from '@/apis/axios';
import {
  AdminApproveUserPostResponse,
  AdminCurrentEventGetResponse,
  AdminEventHistoryCountGetResponse,
  AdminEventHistoryGetResponse,
  AdminEventListCountGetResponse,
  AdminEventListGetResponse,
  AdminEventTotalCountGetResponse,
  AdminGuideApplyGetRequest,
  AdminGuideApplyGetResponse,
  AdminNewUserGetResponse,
  AdminUserListCountGetResponse,
  AdminUserListGetResponse,
  AdminViApplyGetRequest,
  AdminViApplyGetResponse,
  EventHistoryItemType,
  EventListItemType,
  UserListItemType,
} from '@/apis/types/admin';
import {
  DisabilityEnum,
  EventType,
  GenderEnum,
  RecruitStatus,
  RoleEnum,
  RunningGroup,
} from '@/types/group';

//
//
//

const USER_LIST_DATA: UserListItemType[] = [
  {
    userId: '1',
    age: 20,
    competitionCnt: 5,
    trainingCnt: 5,
    gender: GenderEnum.M,
    name: '홍길동',
    phoneNumber: '01234567890',
    role: RoleEnum.User,
    snsId: 'pride_sd',
    team: RunningGroup.B,
    type: DisabilityEnum.GUIDE,
    update_date: '00-00-00',
    update_time: '00.00.00',
    img: '',
  },
  {
    userId: '2',
    age: 20,
    competitionCnt: 5,
    trainingCnt: 5,
    gender: GenderEnum.M,
    name: '홍길동',
    phoneNumber: '01234567890',
    role: RoleEnum.User,
    snsId: 'pride_sd',
    team: RunningGroup.B,
    type: DisabilityEnum.GUIDE,
    update_date: '00-00-00',
    update_time: '00.00.00',
    img: '',
  },
  {
    userId: '3',
    age: 20,
    competitionCnt: 5,
    trainingCnt: 5,
    gender: GenderEnum.M,
    name: '홍길동',
    phoneNumber: '01234567890',
    role: RoleEnum.User,
    snsId: 'pride_sd',
    team: RunningGroup.B,
    type: DisabilityEnum.GUIDE,
    update_date: '00-00-00',
    update_time: '00.00.00',
    img: '',
  },
  {
    userId: '4',
    age: 20,
    competitionCnt: 5,
    trainingCnt: 5,
    gender: GenderEnum.M,
    name: '홍길동',
    phoneNumber: '01234567890',
    role: RoleEnum.User,
    snsId: 'pride_sd',
    team: RunningGroup.B,
    type: DisabilityEnum.GUIDE,
    update_date: '00-00-00',
    update_time: '00.00.00',
    img: '',
  },
  {
    userId: '5',
    age: 20,
    competitionCnt: 5,
    trainingCnt: 5,
    gender: GenderEnum.M,
    name: '홍길동',
    phoneNumber: '01234567890',
    role: RoleEnum.User,
    snsId: 'pride_sd',
    team: RunningGroup.B,
    type: DisabilityEnum.GUIDE,
    update_date: '00-00-00',
    update_time: '00.00.00',
    img: '',
  },
  {
    userId: '6',
    age: 20,
    competitionCnt: 5,
    trainingCnt: 5,
    gender: GenderEnum.M,
    name: '홍길동',
    phoneNumber: '01234567890',
    role: RoleEnum.User,
    snsId: 'pride_sd',
    team: RunningGroup.B,
    type: DisabilityEnum.GUIDE,
    update_date: '00-00-00',
    update_time: '00.00.00',
    img: '',
  },
  {
    userId: '7',
    age: 20,
    competitionCnt: 5,
    trainingCnt: 5,
    gender: GenderEnum.M,
    name: '홍길동',
    phoneNumber: '01234567890',
    role: RoleEnum.User,
    snsId: 'pride_sd',
    team: RunningGroup.B,
    type: DisabilityEnum.GUIDE,
    update_date: '00-00-00',
    update_time: '00.00.00',
    img: '',
  },
  {
    userId: '8',
    age: 20,
    competitionCnt: 5,
    trainingCnt: 5,
    gender: GenderEnum.M,
    name: '홍길동',
    phoneNumber: '01234567890',
    role: RoleEnum.User,
    snsId: 'pride_sd',
    team: RunningGroup.B,
    type: DisabilityEnum.GUIDE,
    update_date: '00-00-00',
    update_time: '00.00.00',
    img: '',
  },
  {
    userId: '9',
    age: 20,
    competitionCnt: 5,
    trainingCnt: 5,
    gender: GenderEnum.M,
    name: '홍길동',
    phoneNumber: '01234567890',
    role: RoleEnum.User,
    snsId: 'pride_sd',
    team: RunningGroup.B,
    type: DisabilityEnum.GUIDE,
    update_date: '00-00-00',
    update_time: '00.00.00',
    img: '',
  },
  {
    userId: '10',
    age: 20,
    competitionCnt: 5,
    trainingCnt: 5,
    gender: GenderEnum.M,
    name: '홍길동',
    phoneNumber: '01234567890',
    role: RoleEnum.User,
    snsId: 'pride_sd',
    team: RunningGroup.B,
    type: DisabilityEnum.GUIDE,
    update_date: '00-00-00',
    update_time: '00.00.00',
    img: '',
  },
];

const EVENT_LIST_DATA: EventListItemType[] = [
  {
    approval: true,
    date: '00-00-00',
    eventId: 1,
    guideParticipation: 20,
    organizer: '조재석',
    pace: RunningGroup.A,
    participation: 40,
    recuitStatus: RecruitStatus.Close,
    smallDate: '2/2',
    title: '테스트테스트',
    update_date: 'ㅇㅇㅇ',
    update_time: 'ㅇㅇㅇ',
    viParticipation: 4,
  },
  {
    approval: true,
    date: '00-00-00',
    eventId: 2,
    guideParticipation: 20,
    organizer: '조재석',
    pace: RunningGroup.A,
    participation: 40,
    recuitStatus: RecruitStatus.Close,
    smallDate: '2/2',
    title: '테스트테스트',
    update_date: 'ㅇㅇㅇ',
    update_time: 'ㅇㅇㅇ',
    viParticipation: 4,
  },
  {
    approval: true,
    date: '00-00-00',
    eventId: 3,
    guideParticipation: 20,
    organizer: '조재석',
    pace: RunningGroup.A,
    participation: 40,
    recuitStatus: RecruitStatus.Close,
    smallDate: '2/2',
    title: '테스트테스트',
    update_date: 'ㅇㅇㅇ',
    update_time: 'ㅇㅇㅇ',
    viParticipation: 4,
  },
  {
    approval: true,
    date: '00-00-00',
    eventId: 4,
    guideParticipation: 20,
    organizer: '조재석',
    pace: RunningGroup.A,
    participation: 40,
    recuitStatus: RecruitStatus.Close,
    smallDate: '2/2',
    title: '테스트테스트',
    update_date: 'ㅇㅇㅇ',
    update_time: 'ㅇㅇㅇ',
    viParticipation: 4,
  },
  {
    approval: true,
    date: '00-00-00',
    eventId: 5,
    guideParticipation: 20,
    organizer: '조재석',
    pace: RunningGroup.A,
    participation: 40,
    recuitStatus: RecruitStatus.Close,
    smallDate: '2/2',
    title: '테스트테스트',
    update_date: 'ㅇㅇㅇ',
    update_time: 'ㅇㅇㅇ',
    viParticipation: 4,
  },
];

const EVENT_HISTORY_DATA: EventHistoryItemType[] = [
  {
    endDate: '00-00-00',
    eventId: 1,
    eventType: EventType.Competition,
    name: '테스트이벤트',
    recruitStatus: RecruitStatus.Open,
  },
  {
    endDate: '00-00-00',
    eventId: 1,
    eventType: EventType.Competition,
    name: '테스트이벤트',
    recruitStatus: RecruitStatus.Open,
  },
  {
    endDate: '00-00-00',
    eventId: 1,
    eventType: EventType.Competition,
    name: '테스트이벤트',
    recruitStatus: RecruitStatus.Open,
  },
  {
    endDate: '00-00-00',
    eventId: 1,
    eventType: EventType.Competition,
    name: '테스트이벤트',
    recruitStatus: RecruitStatus.Open,
  },
  {
    endDate: '00-00-00',
    eventId: 1,
    eventType: EventType.Competition,
    name: '테스트이벤트',
    recruitStatus: RecruitStatus.Open,
  },
];

const VI_APPLY_DATA: AdminViApplyGetResponse = {
  age: 20,
  detailRecord: '22분',
  guideName: '홍길동',
  hopePrefs: '화이팅',
  howToknow: ['vi.1'],
  isRunningExp: true,
  motive: 'ㅎㅎ',
  phoneNumber: '01234567890',
  portraitRights: true,
  privacy: true,
  recordDegree: RunningGroup.A,
  runningPlace: '서울',
  snsId: 'prind',
};

const GUIDE_APPLY_DATA: AdminGuideApplyGetResponse = {
  age: 20,
  detailRecord: '33분',
  guidingPace: RunningGroup.A,
  hopePrefs: 'ㅇㅇ',
  howToKnow: ['guide.2'],
  isGuideExp: true,
  motive: 'ddd',
  phoneNumber: '01234567890',
  portraitRights: true,
  privacy: true,
  recordDegree: RunningGroup.D,
  snsId: 'dd',
  viCount: '2',
};

//
//
//

export const adminHandlers: HttpHandler[] = [
  //adminNewUserGet
  http.get<NoneType, NoneType, AdminNewUserGetResponse>(
    baseURL + '/admin/new-user',
    () => {
      return HttpResponse.json({
        items: [
          {
            contestCnt: 5,
            img: '',
            like: 21,
            name: '사용자1',
            role: RoleEnum.User,
            trainingCnt: 3,
            type: DisabilityEnum.GUIDE,
            userId: '12sdfdsfs232',
            recordDegree: RunningGroup.A,
          },
          {
            contestCnt: 5,
            img: '',
            like: 21,
            name: '사용자2',
            role: RoleEnum.User,
            trainingCnt: 3,
            type: DisabilityEnum.GUIDE,
            userId: '122sdfdsf32',
            recordDegree: RunningGroup.A,
          },
          {
            contestCnt: 5,
            img: '',
            like: 21,
            name: '사용자3',
            role: RoleEnum.User,
            trainingCnt: 3,
            type: DisabilityEnum.GUIDE,
            userId: '1sdfsdf2232',
            recordDegree: RunningGroup.A,
          },
          {
            contestCnt: 5,
            img: '',
            like: 21,
            name: '사용자4',
            role: RoleEnum.User,
            trainingCnt: 3,
            type: DisabilityEnum.GUIDE,
            userId: '122fdssdf32',
            recordDegree: RunningGroup.A,
          },
          {
            contestCnt: 5,
            img: '',
            like: 21,
            name: '사용자5',
            role: RoleEnum.User,
            trainingCnt: 3,
            type: DisabilityEnum.GUIDE,
            userId: '12sdfsd232',
            recordDegree: RunningGroup.A,
          },
          {
            contestCnt: 5,
            img: '',
            like: 21,
            name: '사용자6',
            role: RoleEnum.User,
            trainingCnt: 3,
            type: DisabilityEnum.GUIDE,
            userId: '122dfsdf32',
            recordDegree: RunningGroup.A,
          },
        ],
      });
    },
  ),
  //adminCurrentEventGet
  http.get<NoneType, NoneType, AdminCurrentEventGetResponse>(
    baseURL + '/admin/current-event',
    () => {
      return HttpResponse.json({
        items: [
          {
            eventId: 1,
            eventType: EventType.Competition,
            name: '이벤트1',
            recruitStatus: RecruitStatus.Open,
            date: '2000-00-00',
          },
          {
            eventId: 2,
            eventType: EventType.Competition,
            name: '이벤트2',
            recruitStatus: RecruitStatus.Open,
            date: '2000-00-00',
          },
          {
            eventId: 3,
            eventType: EventType.Competition,
            name: '이벤트3',
            recruitStatus: RecruitStatus.Open,
            date: '2000-00-00',
          },
          {
            eventId: 4,
            eventType: EventType.Competition,
            name: '이벤트4',
            recruitStatus: RecruitStatus.Open,
            date: '2000-00-00',
          },
        ],
      });
    },
  ),

  //adminUserListGet
  http.get<NoneType, NoneType, AdminUserListGetResponse>(
    baseURL + '/admin/user-list',
    () => {
      return HttpResponse.json({
        limit: 5,
        start: 0,
        items: USER_LIST_DATA,
      });
    },
  ),

  //adminUserListCountGet
  http.get<NoneType, NoneType, AdminUserListCountGetResponse>(
    baseURL + '/admin/user-list/count',
    () => {
      return HttpResponse.json({ count: 30 });
    },
  ),

  //adminViApplyGet
  http.get<AdminViApplyGetRequest, NoneType, AdminViApplyGetResponse>(
    baseURL + '/admin/apply/vi/:userId',
    () => {
      return HttpResponse.json(VI_APPLY_DATA);
    },
  ),

  //adminGuideApplyGet
  http.get<AdminGuideApplyGetRequest, NoneType, AdminGuideApplyGetResponse>(
    baseURL + '/admin/apply/guide/:userId',
    () => {
      return HttpResponse.json(GUIDE_APPLY_DATA);
    },
  ),

  //adminApproveUserPost
  http.post<
    { userId: string },
    { isApptove: boolean; recordDegree: RunningGroup },
    AdminApproveUserPostResponse
  >(baseURL + '/admin/approval-user/:userId', () => {
    return HttpResponse.json({ role: RoleEnum.User });
  }),

  //adminEventListGet
  http.get<NoneType, NoneType, AdminEventListGetResponse>(
    baseURL + '/admin/event-list',
    () => {
      return HttpResponse.json({ items: EVENT_LIST_DATA });
    },
  ),

  //adminEventListCountGet
  http.get<NoneType, NoneType, AdminEventListCountGetResponse>(
    baseURL + '/admin/event-list/count',
    () => {
      return HttpResponse.json({ count: 30 });
    },
  ),

  //adminEventHistoryGet
  http.get<{ userId: string }, NoneType, AdminEventHistoryGetResponse>(
    baseURL + '/admin/:userId/event-list',
    () => {
      return HttpResponse.json({ items: EVENT_HISTORY_DATA });
    },
  ),

  //adminEventHistoryCountGet
  http.get<{ userId: string }, NoneType, AdminEventHistoryCountGetResponse>(
    baseURL + '/admin/:userId/event-list/count',
    () => {
      return HttpResponse.json({ count: 40 });
    },
  ),

  //adminEventTotalCountGet
  http.get<{ userId: string }, NoneType, AdminEventTotalCountGetResponse>(
    baseURL + '/admin/:userId/event-type/count',
    () => {
      return HttpResponse.json({ competition: 10, training: 10 });
    },
  ),
];
