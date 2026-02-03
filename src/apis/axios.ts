import axios, { AxiosRequestConfig, isAxiosError } from 'axios';

import authApi from './requests/auth';
import { store } from '../store';

import { setAccessToken } from '@/store/reducer/auth';

const getToken = (accessToken: string) => `Bearer ${accessToken}`;

export const baseURL = process.env.SERVER_URL;

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export const axiosInstanceWithToken = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstanceWithToken.interceptors.request.use(async (config) => {
  const accessToken = store.getState().auth.accessToken;
  if (accessToken) {
    config.headers.Authorization = getToken(accessToken);
  } else {
    return Promise.reject('AccessToken is NotFound');
  }
  return config;
});

axiosInstanceWithToken.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (isAxiosError(error)) {
      if (error.response?.status === 401 || error.status === 401) {
        // 이미 재시도한 요청이면 무한 루프 방지
        if (originalRequest._retry) {
          // 페이지 리로드
          window.location.reload();
          return Promise.reject(error);
        }

        // 재시도 플래그 설정
        originalRequest._retry = true;

        try {
          const accessToken = await authApi.accessTokenGet();
          store.dispatch(setAccessToken(accessToken));

          const originalConfig = {
            ...originalRequest,
            headers: {
              ...originalRequest?.headers,
              Authorization: getToken(accessToken),
            },
          };

          return axiosInstanceWithToken(originalConfig);
        } catch (refreshError) {
          // 토큰 갱신 실패 시 페이지 리로드
          console.error('Token refresh failed:', refreshError);
          window.location.reload();
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);
