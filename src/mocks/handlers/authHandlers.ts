import { http, HttpHandler, HttpResponse } from 'msw';

import { baseURL } from '@/apis/axios';
import {
  AccessTokenGetResponse,
  CheckCertificationTokenPostRequest,
  CheckCertificationTokenPostResponse,
  CheckDuplicatedPostRequest,
  CheckDuplicatedPostResponse,
  GetCertificationTokenIdPostRequest,
  GetCertificationTokenPasswordPostRequest,
  GetUserIdPostRequest,
  GetUserIdPostResponse,
  GuideSignupPostRequest,
  KakaoAuthPostResponse,
  LoginPostRequest,
  LoginPostResponse,
  RenewalPasswordPatchRequest,
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

  // getCertificationTokenPasswordPost
  http.post<Record<string, never>, GetCertificationTokenPasswordPostRequest>(
    baseURL + '/sms/password',
    () => {
      return HttpResponse.json();
    },
  ),

  // getCertificationTokenIdPost
  http.post<Record<string, never>, GetCertificationTokenIdPostRequest>(
    baseURL + '/sms/accountId',
    () => {
      return HttpResponse.json();
    },
  ),

  //checkCertificationTokenPost
  http.post<
    Record<string, never>,
    CheckCertificationTokenPostRequest,
    CheckCertificationTokenPostResponse
  >(baseURL + '/sms/token', () => {
    return HttpResponse.json({ token: 'token' });
  }),

  // renewalPasswordPatch
  http.patch<Record<string, never>, RenewalPasswordPatchRequest>(
    baseURL + '/new-password',
    () => {
      return HttpResponse.json();
    },
  ),

  //getUserIdPost
  http.post<Record<string, never>, GetUserIdPostRequest, GetUserIdPostResponse>(
    baseURL + '/accountId',
    () => {
      return HttpResponse.json({
        accountId: 'guide_run_project',
        createdAt: '0000-00-00',
      });
    },
  ),
];
