import {
  CheckCertificationTokenPostRequest,
  CheckDuplicatedPostRequest,
  GetCertificationTokenIdPostRequest,
  GetCertificationTokenPasswordPostRequest,
  GetUserIdPostRequest,
  GuideSignupPostRequest,
  KakaoAuthPostRequest,
  LoginPostRequest,
  RenewalPasswordPatchRequest,
  ViSignupPostRequest,
  WithdrawDeleteRequest,
} from '../types/auth';

export const auth = {
  kakaoAuthPost: (value: KakaoAuthPostRequest) => [
    'kakaoAuthPost',
    ...Object.values(value),
  ],
  viSignupPost: (value: ViSignupPostRequest) => [
    'viSignupPost',
    ...Object.values(value),
  ],
  guideSignupPost: (value: GuideSignupPostRequest) => [
    'guideSignupPost',
    ...Object.values(value),
  ],
  accessTokenGet: () => ['accessTokenGet'],
  checkDuplicatedPost: (value: CheckDuplicatedPostRequest) => [
    'checkDuplicatedPost',
    ...Object.values(value),
  ],
  loginPost: (value: LoginPostRequest) => [
    'loginPost',
    ...Object.values(value),
  ],
  getCertificationTokenPasswordPost: (
    value: GetCertificationTokenPasswordPostRequest,
  ) => ['getCertificationTokenPasswordPost', ...Object.values(value)],
  getCertificationTokenIdPost: (value: GetCertificationTokenIdPostRequest) => [
    'getCertificationTokenIdPost',
    ...Object.values(value),
  ],
  checkCertificationTokenPost: (value: CheckCertificationTokenPostRequest) => [
    'checkCertificationTokenPost',
    ...Object.values(value),
  ],
  renewalPasswordPatch: (value: RenewalPasswordPatchRequest) => [
    'renewalPasswordPatch',
    ...Object.values(value),
  ],
  getUserIdPost: (value: GetUserIdPostRequest) => [
    'getUserIdPost',
    ...Object.values(value),
  ],
  withdrawDelete: (value: WithdrawDeleteRequest) => [
    'withdrawDelete',
    ...Object.values(value),
  ],
};
