import { axiosInstance, axiosInstanceWithToken } from '../axios';
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
  KakaoAuthPostRequest,
  KakaoAuthPostResponse,
  LoginPostRequest,
  LoginPostResponse,
  RenewalPasswordPatchRequest,
  SignupPostResponse,
  ViSignupPostRequest,
} from '../types/auth';

class AuthApi {
  kakaoAuthPost = async ({ code }: KakaoAuthPostRequest) => {
    return await axiosInstance
      .post<KakaoAuthPostResponse>(`/oauth/login/kakao?code=${code}`)
      .then((res) => res.data);
  };

  viSignupPost = async (signupData: ViSignupPostRequest) => {
    return await axiosInstanceWithToken
      .post<SignupPostResponse>('/signup/vi', signupData)
      .then((res) => res.data);
  };

  guideSignupPost = async (signupData: GuideSignupPostRequest) => {
    return await axiosInstanceWithToken
      .post<SignupPostResponse>('/signup/guide', signupData)
      .then((res) => res.data);
  };

  accessTokenGet = async () => {
    return await axiosInstance
      .get<AccessTokenGetResponse>('/oauth/login/reissue')
      .then((res) => res.data.accessToken);
  };

  checkDuplicatedPost = async (id: CheckDuplicatedPostRequest) => {
    return axiosInstanceWithToken
      .post<CheckDuplicatedPostResponse>('/signup/duplicated', id)
      .then((res) => res.data.isUnique);
  };

  loginPost = async (loginData: LoginPostRequest) => {
    return axiosInstance
      .post<LoginPostResponse>('/login', loginData)
      .then((res) => res.data.accessToken);
  };

  /**
   *
   * @param data 아이디, 휴대전화 번호
   * @returns 성공여부
   */

  getCertificationTokenPasswordPost = async (
    data: GetCertificationTokenPasswordPostRequest,
  ) => {
    return axiosInstance.post('/sms/password', data);
  };

  getCertificationTokenIdPost = async (
    data: GetCertificationTokenIdPostRequest,
  ) => {
    return axiosInstance.post('/sms/accountId', data);
  };

  checkCertificationTokenPost = async (
    token: CheckCertificationTokenPostRequest,
  ) => {
    return axiosInstance
      .post<CheckCertificationTokenPostResponse>('/sms/token', token)
      .then((res) => res.data.token);
  };

  renewalPasswordPatch = async (data: RenewalPasswordPatchRequest) => {
    return axiosInstance.patch('/new-password', data);
  };

  getUserIdPost = async (token: GetUserIdPostRequest) => {
    return axiosInstance
      .post<GetUserIdPostResponse>('/accountId', token)
      .then((res) => res.data);
  };
}

const authApi = new AuthApi();

export default authApi;
