import { http, HttpHandler, HttpResponse } from 'msw';

import { baseURL } from '@/apis/axios';
import {
  AccessTokenGetResponse,
  CheckDuplicatedPostRequest,
  CheckDuplicatedPostResponse,
  GuideSignupPostRequest,
  KakaoAuthPostResponse,
  LoginPostRequest,
  LoginPostResponse,
  SignupPostResponse,
  ViSignupPostRequest,
} from '@/apis/types/auth';
import { RoleEnum } from '@/types/group';

const SIGN_UP_DATA: SignupPostResponse = {
  accessToken: '123',
  role: RoleEnum.Admin,
  userId: '123',
};

export const authHandlers: HttpHandler[] = [
  //kakaoAuthPost
  http.post<
    Record<string, never>,
    Record<string, never>,
    KakaoAuthPostResponse
  >(baseURL + '/oauth/login/kakao', () => {
    return HttpResponse.json({ accessToken: '123', isExist: true });
  }),

  //viSignupPost
  http.post<Record<string, never>, ViSignupPostRequest, SignupPostResponse>(
    baseURL + '/signup/vi',
    () => {
      return HttpResponse.json(SIGN_UP_DATA);
    },
  ),

  //guideSignupPost
  http.post<Record<string, never>, GuideSignupPostRequest, SignupPostResponse>(
    baseURL + '/signup/guide',
    () => {
      return HttpResponse.json(SIGN_UP_DATA);
    },
  ),

  //accessTokenGet
  http.get<
    Record<string, never>,
    Record<string, never>,
    AccessTokenGetResponse
  >(baseURL + '/oauth/login/reissue', () => {
    return HttpResponse.json({ accessToken: '123' });
  }),

  //checkDuplicatedPost
  http.post<
    Record<string, never>,
    CheckDuplicatedPostRequest,
    CheckDuplicatedPostResponse
  >(baseURL + '/signup/duplicated', () => {
    return HttpResponse.json({ isUnique: true });
  }),

  //loginPost
  http.post<Record<string, never>, LoginPostRequest, LoginPostResponse>(
    baseURL + '/login',
    () => {
      return HttpResponse.json({ accessToken: '123' });
      // return HttpResponse.json({}, { status: 500 });
    },
  ),
];
