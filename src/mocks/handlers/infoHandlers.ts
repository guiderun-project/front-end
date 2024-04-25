import { http, HttpHandler, HttpResponse } from 'msw';

import { baseURL } from '@/apis/axios';
import {
  eventHistoryCountGetResponse,
  eventHistoryGetResponse,
  myPageGetResponse,
  permissionGetResponse,
  permissionPatchRequest,
  permissionPatchResponse,
  personalInfoGetResponse,
  personalInfoPatchRequest,
  personalInfoPatchResponse,
  runningSpecGuideGetResponse,
  runningSpecGuidePatchRequest,
  runningSpecGuidePatchResponse,
  runningSpecViGetResponse,
  runningSpecViPatchRequest,
  runningSpecViPatchResponse,
  userInfoGetResponse,
} from '@/apis/types/info';
import {
  DisabilityEnum,
  EventType,
  GenderEnum,
  RecruitStatus,
  RoleEnum,
  RunningGroup,
} from '@/types/group';

//You can add HTTP handler by msw DOCS
//https://mswjs.io/docs/network-behavior/rest

export const infoHandlers: HttpHandler[] = [
  //myPageGet
  http.get<Record<string, never>, Record<string, never>, myPageGetResponse>(
    baseURL + '/user/mypage',
    () => {
      return HttpResponse.json({
        contestCnt: 10,
        gender: GenderEnum.M,
        name: '홍길동',
        recordDegree: RunningGroup.A,
        role: RoleEnum.Admin,
        totalEvent: 10,
        trainingCnt: 10,
        type: DisabilityEnum.GUIDE,
      });
    },
  ),

  //userInfoGet
  http.get<Record<string, never>, Record<string, never>, userInfoGetResponse>(
    baseURL + '/user/personal',
    () => {
      return HttpResponse.json({
        age: 10,
        gender: GenderEnum.M,
        name: '홍길동',
        phoneNumber: '01234567890',
        recordDegree: RunningGroup.A,
        role: RoleEnum.Admin,
        snsId: 'guide_run',
        type: DisabilityEnum.GUIDE,
        userId: '123',
      });
    },
  ),

  // personalInfoGet
  http.get<{ userId: string }, Record<string, never>, personalInfoGetResponse>(
    baseURL + '/user/personal/:userId',
    () => {
      return HttpResponse.json({
        age: 20,
        gender: GenderEnum.M,
        isOpenNumber: true,
        isOpenSns: true,
        name: '홍길동',
        phoneNumber: '01234567890',
        role: RoleEnum.Admin,
        snsId: 'test',
        type: DisabilityEnum.GUIDE,
      });
    },
  ),

  //personalInfoPatch
  http.patch<
    Record<string, never>,
    personalInfoPatchRequest,
    personalInfoPatchResponse
  >(baseURL + '/user/personal', async ({ request }) => {
    const newInfo = await request.json();
    return HttpResponse.json({
      ...newInfo,
      role: RoleEnum.Admin,
      type: DisabilityEnum.GUIDE,
    });
  }),

  //runningSpecGuideGet
  http.get<
    { userId: string },
    Record<string, never>,
    runningSpecGuideGetResponse
  >(baseURL+ '/user/running/guide/:userId', () => {
    return HttpResponse.json({
      detailRecord: '1시간',
      guidingPace: RunningGroup.A,
      hopePrefs: '테스트',
      howToKnow: ['guide.1'],
      isGuideExp: true,
      motive: '테스트',
      recordDegree: RunningGroup.A,
      runningPlace: '테스트 장소',
      viCount: '10회',
      viName: '테스트',
      viRecord: '테스트',
    });
  }),

  // runningSpecGuidePatch
  http.patch<
    Record<string, never>,
    runningSpecGuidePatchRequest,
    runningSpecGuidePatchResponse
  >(baseURL + '/user/running/guide', async ({ request }) => {
    const newSpec = await request.json();
    return HttpResponse.json(newSpec);
  }),

  // runningSpecViGet
  http.get<{ userId: string }, Record<string, never>, runningSpecViGetResponse>(
    baseURL + '/user/running/vi/:userId',
    () => {
      return HttpResponse.json({
        detailRecord: '테스트',
        recordDegree: RunningGroup.A,
        guideName: '테스트',
        hopePrefs: '테스트입니다. ',
        howToKnow: ['vi.1'],
        isRunningExp: true,
        motive: '테스트',
        runningPlace: '테스트 사이트',
      });
    },
  ),

  // runningSpecViPatch
  http.patch<
    Record<string, never>,
    runningSpecViPatchRequest,
    runningSpecViPatchResponse
  >(baseURL + '/user/running/vi', async ({ request }) => {
    const newSpec = await request.json();
    return HttpResponse.json(newSpec);
  }),

  //permissionGet
  http.get<{ userId: string }, Record<string, never>, permissionGetResponse>(
    baseURL + '/user/permission/:userId',
    () => {
      return HttpResponse.json({ portraitRights: true, privacy: true });
    },
  ),

  //permissionPatch
  http.patch<
    Record<string, never>,
    permissionPatchRequest,
    permissionPatchResponse
  >(baseURL + '/user/permission', async ({ request }) => {
    const newPermission = await request.json();
    return HttpResponse.json(newPermission);
  }),

  //TODO: profileGet

  //TODO: partnerListGet

  //TODO: partnerListCountGet

  //eventHistoryGet
  http.get<{ userId: string }, Record<string, never>, eventHistoryGetResponse>(
    baseURL + '/user/event-history/:userId',
    () => {
      return HttpResponse.json({
        start: 0,
        sort: 'total',
        limit: 10,
        items: [
          {
            name: '테스트1',
            recruitStatus: RecruitStatus.End,
            date: '2000-00-00',
            eventId: 1,
            eventType: EventType.Competition,
          },
          {
            name: '테스트2',
            recruitStatus: RecruitStatus.End,
            date: '2000-00-00',
            eventId: 2,
            eventType: EventType.Competition,
          },
          {
            name: '테스트3',
            recruitStatus: RecruitStatus.End,
            date: '2000-00-00',
            eventId: 3,
            eventType: EventType.Training,
          },
          {
            name: '테스트4',
            recruitStatus: RecruitStatus.End,
            date: '2000-00-00',
            eventId: 4,
            eventType: EventType.Competition,
          },
          {
            name: '테스트5',
            recruitStatus: RecruitStatus.End,
            date: '2000-00-00',
            eventId: 5,
            eventType: EventType.Training,
          },
          {
            name: '테스트6',
            recruitStatus: RecruitStatus.Upcoming,
            date: '2000-00-00',
            eventId: 6,
            eventType: EventType.Competition,
          },
          {
            name: '테스트7',
            recruitStatus: RecruitStatus.Close,
            date: '2000-00-00',
            eventId: 7,
            eventType: EventType.Competition,
          },
          {
            name: '테스트8',
            recruitStatus: RecruitStatus.End,
            date: '2000-00-00',
            eventId: 8,
            eventType: EventType.Training,
          },
          {
            name: '테스트9',
            recruitStatus: RecruitStatus.Open,
            date: '2000-00-00',
            eventId: 9,
            eventType: EventType.Competition,
          },
          {
            name: '테스트10',
            recruitStatus: RecruitStatus.End,
            date: '2000-00-00',
            eventId: 10,
            eventType: EventType.Training,
          },
        ],
      });
    },
  ),

  // eventHistoryCountGet
  http.get<
    { userId: string },
    Record<string, never>,
    eventHistoryCountGetResponse
  >(baseURL + '/user/event-history/count/:userId', () => {
    return HttpResponse.json({ count: 37 });
  }),
];
