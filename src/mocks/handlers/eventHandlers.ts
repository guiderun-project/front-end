import { http, HttpHandler, HttpResponse } from 'msw';

import { baseURL } from '@/apis/axios';
import { eventPopupGetResponse } from '@/apis/types/event';
import { EventType, RecruitStatus } from '@/types/group';

//You can add HTTP handler by msw DOCS
//https://mswjs.io/docs/network-behavior/rest

export const eventHandlers: HttpHandler[] = [
  //eventPopupGet
  http.get<{ eventId: string }, Record<string, never>, eventPopupGetResponse>(
    baseURL + '/event/pop/:eventId',
    ({ params }) => {
      return HttpResponse.json({
        content: '테스트용 이벤트입니다!',
        date: '0000-00-00',
        startTime: '00:00',
        endTime: '00:00',
        eventId: Number(params.eventId),
        viCnt: 22,
        guideCnt: 10,
        name: '테스트 훈련',
        place: '테스트 장소',
        recruitStatus: RecruitStatus.End,
        type: EventType.Training,
        updatedAt: '0000-00-00',
      });
    },
  ),
];
