import { axiosInstance, axiosInstanceWithToken } from '../axios';
import {
  AccessTokenGetResponse,
  CheckDuplicatedPostRequest,
  CheckDuplicatedPostResponse,
  GuideSignupPostRequest,
  KakaoAuthPostRequest,
  KakaoAuthPostResponse,
  LoginPostRequest,
  LoginPostResponse,
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
}

const authApi = new AuthApi();

export default authApi;
