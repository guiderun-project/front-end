import { axiosInstance, axiosInstanceWithToken } from '../axios';
import {
  accessTokenGetResponse,
  checkDuplicatedPostRequest,
  checkDuplicatedPostResponse,
  guideSignupPostRequest,
  kakaoAuthPostRequest,
  kakaoAuthPostResponse,
  signupPostResponse,
  viSignupPostRequest,
} from '../types/auth';

class AuthApi {
  kakaoAuthPost = async ({ code }: kakaoAuthPostRequest) => {
    return await axiosInstance
      .post<kakaoAuthPostResponse>(`/oauth/login/kakao?code=${code}`)
      .then((res) => res.data);
  };

  viSignupPost = async (signupData: viSignupPostRequest) => {
    return await axiosInstanceWithToken
      .post<signupPostResponse>('/signup/vi', signupData)
      .then((res) => res.data);
  };

  guideSignupPost = async (signupData: guideSignupPostRequest) => {
    return await axiosInstanceWithToken
      .post<signupPostResponse>('/signup/guide', signupData)
      .then((res) => res.data);
  };

  accessTokenGet = async () => {
    return await axiosInstance
      .get<accessTokenGetResponse>('/user/reissue')
      .then((res) => res.data.accessToken);
  };

  checkDuplicatedPost = async (id: checkDuplicatedPostRequest) =>
    axiosInstanceWithToken
      .post<checkDuplicatedPostResponse>('/signup/duplicated', id)
      .then((res) => res.data.isUnique);
}

const authApi = new AuthApi();

export default authApi;
