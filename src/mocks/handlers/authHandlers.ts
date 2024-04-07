import { http, HttpHandler, HttpResponse } from 'msw';

import { baseURL } from '@/apis/axios';
import {
  accessTokenGetResponse,
  checkDuplicatedPostRequest,
  checkDuplicatedPostResponse,
  guideSignupPostRequest,
  kakaoAuthPostResponse,
  signupPostResponse,
  viSignupPostRequest,
} from '@/apis/types/auth';
import { RoleEnum } from '@/types/group';

const SIGN_UP_DATA: signupPostResponse = {
  accessToken: '123',
  role: RoleEnum.Admin,
  userId: '123',
};

export const authHandlers: HttpHandler[] = [
  //kakaoAuthPost
  http.post<
    Record<string, never>,
    Record<string, never>,
    kakaoAuthPostResponse
  >(baseURL + '/oauth/login/kakao', () => {
    return HttpResponse.json({ accessToken: '123', isExist: true });
  }),

  //viSignupPost
  http.post<Record<string, never>, viSignupPostRequest, signupPostResponse>(
    baseURL + 'signup/vi',
    () => {
      return HttpResponse.json(SIGN_UP_DATA);
    },
  ),

  //guideSignupPost
  http.post<Record<string, never>, guideSignupPostRequest, signupPostResponse>(
    baseURL + 'signup/guide',
    () => {
      return HttpResponse.json(SIGN_UP_DATA);
    },
  ),

  //accessTokenGet
  http.get<
    Record<string, never>,
    Record<string, never>,
    accessTokenGetResponse
  >(baseURL + '/oauth/login/reissue', () => {
    return HttpResponse.json({ accessToken: '123' });
  }),

  //checkDuplicatedPost
  http.post<
    Record<string, never>,
    checkDuplicatedPostRequest,
    checkDuplicatedPostResponse
  >(baseURL + '/signup/duplicated', () => {
    return HttpResponse.json({ isUnique: true });
  }),
];
