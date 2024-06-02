import { http, HttpHandler, HttpResponse } from 'msw';

import { NoneType } from '../handlers';

import { baseURL } from '@/apis/axios';
import {
  EventHistoryCountGetResponse,
  EventHistoryGetResponse,
  MyPageGetResponse,
  PartnerListCountGetRequest,
  PartnerListCountGetResponse,
  PartnerListGetResponse,
  PermissionGetResponse,
  PermissionPatchRequest,
  PermissionPatchResponse,
  PersonalInfoGetResponse,
  PersonalInfoPatchRequest,
  PersonalInfoPatchResponse,
  RunningSpecGuideGetResponse,
  RunningSpecGuidePatchRequest,
  RunningSpecGuidePatchResponse,
  RunningSpecViGetResponse,
  RunningSpecViPatchRequest,
  runningSpecViPatchResponse,
  UserInfoGetResponse,
} from '@/apis/types/info';
import {
  DisabilityEnum,
  EventType,
  GenderEnum,
  RecruitStatus,
  RoleEnum,
  RunningGroup,
} from '@/types/group';
import { PartnerSort } from '@/types/sort';

//You can add HTTP handler by msw DOCS
//https://mswjs.io/docs/network-behavior/rest

export const infoHandlers: HttpHandler[] = [
  //myPageGet
  http.get<NoneType, NoneType, MyPageGetResponse>(
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
  http.get<NoneType, NoneType, UserInfoGetResponse>(
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
        img: '', //상황에 따라 https://mui.com/static/images/avatar/2.jpg 를 추가함
      });
    },
  ),

  // personalInfoGet
  http.get<{ userId: string }, NoneType, PersonalInfoGetResponse>(
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
  http.patch<NoneType, PersonalInfoPatchRequest, PersonalInfoPatchResponse>(
    baseURL + '/user/personal',
    async ({ request }) => {
      const newInfo = await request.json();
      return HttpResponse.json({
        ...newInfo,
        role: RoleEnum.Admin,
        type: DisabilityEnum.GUIDE,
      });
    },
  ),

  //runningSpecGuideGet
  http.get<{ userId: string }, NoneType, RunningSpecGuideGetResponse>(
    baseURL + '/user/running/guide/:userId',
    () => {
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
    },
  ),

  // runningSpecGuidePatch
  http.patch<
    NoneType,
    RunningSpecGuidePatchRequest,
    RunningSpecGuidePatchResponse
  >(baseURL + '/user/running/guide', async ({ request }) => {
    const newSpec = await request.json();
    return HttpResponse.json(newSpec);
  }),

  // runningSpecViGet
  http.get<{ userId: string }, NoneType, RunningSpecViGetResponse>(
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
  http.patch<NoneType, RunningSpecViPatchRequest, runningSpecViPatchResponse>(
    baseURL + '/user/running/vi',
    async ({ request }) => {
      const newSpec = await request.json();
      return HttpResponse.json(newSpec);
    },
  ),

  //permissionGet
  http.get<{ userId: string }, NoneType, PermissionGetResponse>(
    baseURL + '/user/permission/:userId',
    () => {
      return HttpResponse.json({ portraitRights: true, privacy: true });
    },
  ),

  //permissionPatch
  http.patch<NoneType, PermissionPatchRequest, PermissionPatchResponse>(
    baseURL + '/user/permission',
    async ({ request }) => {
      const newPermission = await request.json();
      return HttpResponse.json(newPermission);
    },
  ),

  //TODO: profileGet

  // partnerListGet
  http.get<{ userId: string }, NoneType, PartnerListGetResponse>(
    baseURL + '/user/partner-list/:userId',
    ({ request }) => {
      const url = new URL(request.url);

      const limit = Number(url.searchParams.get('limit'));
      if (limit === 2) {
        return HttpResponse.json({
          limit: 2,
          sort: PartnerSort.Recent,
          start: 0,
          items: [
            {
              userId: '1e12kdsn1',
              type: DisabilityEnum.GUIDE,
              recordDegree: RunningGroup.C,
              role: RoleEnum.User,
              img: '',
              contestCnt: 25,
              isLiked: true,
              trainingCnt: 10,
              like: 123,
              name: '배두리',
            },
            {
              userId: '1sfdsfq3345413',
              type: DisabilityEnum.GUIDE,
              recordDegree: RunningGroup.A,
              role: RoleEnum.User,
              img: 'https://mui.com/static/images/avatar/2.jpg',
              contestCnt: 1,
              isLiked: false,
              trainingCnt: 4,
              like: 10,
              name: '이재건',
            },
          ],
        });
      }
      return HttpResponse.json({
        limit: 2,
        sort: PartnerSort.Recent,
        start: 0,
        items: [
          {
            userId: '1e12kdsn1',
            type: DisabilityEnum.GUIDE,
            recordDegree: RunningGroup.C,
            role: RoleEnum.User,
            img: '',
            contestCnt: 25,
            isLiked: true,
            trainingCnt: 10,
            like: 123,
            name: '배두리',
          },
          {
            userId: '1sfdsfq3345413',
            type: DisabilityEnum.GUIDE,
            recordDegree: RunningGroup.A,
            role: RoleEnum.User,
            img: 'https://mui.com/static/images/avatar/2.jpg',
            contestCnt: 1,
            isLiked: false,
            trainingCnt: 4,
            like: 10,
            name: '이재건',
          },
          {
            userId: '1sfdsfq3345413asdsad',
            type: DisabilityEnum.GUIDE,
            recordDegree: RunningGroup.C,
            role: RoleEnum.User,
            img: 'https://mui.com/static/images/avatar/1.jpg',
            contestCnt: 1,
            isLiked: true,
            trainingCnt: 4,
            like: 1,
            name: '조재석',
          },
        ],
      });
    },
  ),

  // partnerListCountGet
  http.get<PartnerListCountGetRequest, NoneType, PartnerListCountGetResponse>(
    baseURL + '/user/partner-list/count/:userId',
    () => {
      return HttpResponse.json({ count: 50 });
    },
  ),

  //eventHistoryGet
  http.get<{ userId: string }, NoneType, EventHistoryGetResponse>(
    baseURL + '/user/event-history/:userId',
    ({ request }) => {
      const url = new URL(request.url);

      const limit = Number(url.searchParams.get('limit'));
      if (limit === 3) {
        return HttpResponse.json({
          items: [
            {
              name: '테스트1',
              recruitStatus: RecruitStatus.End,
              startDate: '2000-00-00',
              eventId: 1,
              eventType: EventType.Competition,
            },
            {
              name: '테스트2',
              recruitStatus: RecruitStatus.End,
              startDate: '2000-00-00',
              eventId: 2,
              eventType: EventType.Competition,
            },
            {
              name: '테스트3',
              recruitStatus: RecruitStatus.End,
              startDate: '2000-00-00',
              eventId: 3,
              eventType: EventType.Training,
            },
          ],
        });
      }
      return HttpResponse.json({
        items: [
          {
            name: '테스트1',
            recruitStatus: RecruitStatus.End,
            startDate: '2000-00-00',
            eventId: 1,
            eventType: EventType.Competition,
          },
          {
            name: '테스트2',
            recruitStatus: RecruitStatus.End,
            startDate: '2000-00-00',
            eventId: 2,
            eventType: EventType.Competition,
          },
          {
            name: '테스트3',
            recruitStatus: RecruitStatus.End,
            startDate: '2000-00-00',
            eventId: 3,
            eventType: EventType.Training,
          },
          {
            name: '테스트4',
            recruitStatus: RecruitStatus.End,
            startDate: '2000-00-00',
            eventId: 4,
            eventType: EventType.Competition,
          },
          {
            name: '테스트5',
            recruitStatus: RecruitStatus.End,
            startDate: '2000-00-00',
            eventId: 5,
            eventType: EventType.Training,
          },
          {
            name: '테스트6',
            recruitStatus: RecruitStatus.Upcoming,
            startDate: '2000-00-00',
            eventId: 6,
            eventType: EventType.Competition,
          },
          {
            name: '테스트7',
            recruitStatus: RecruitStatus.Close,
            startDate: '2000-00-00',
            eventId: 7,
            eventType: EventType.Competition,
          },
          {
            name: '테스트8',
            recruitStatus: RecruitStatus.End,
            startDate: '2000-00-00',
            eventId: 8,
            eventType: EventType.Training,
          },
          {
            name: '테스트9',
            recruitStatus: RecruitStatus.Open,
            startDate: '2000-00-00',
            eventId: 9,
            eventType: EventType.Competition,
          },
          {
            name: '테스트10',
            recruitStatus: RecruitStatus.End,
            startDate: '2000-00-00',
            eventId: 10,
            eventType: EventType.Training,
          },
        ],
      });
    },
  ),

  // eventHistoryCountGet
  http.get<{ userId: string }, NoneType, EventHistoryCountGetResponse>(
    baseURL + '/user/event-history/count/:userId',
    () => {
      return HttpResponse.json({ count: 37 });
    },
  ),

  //profileImagePost
  http.post(baseURL + '/user/img', async () => {
    return HttpResponse.json({
      img: 'https://mui.com/static/images/avatar/2.jpg',
    });
  }),
];
