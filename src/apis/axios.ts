import axios, { isAxiosError } from 'axios';

import { store } from '../store';

export const baseURL = process.env.SERVER_URL;

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export const axiosInstanceWithToken = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstanceWithToken.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    return Promise.reject(new Error('Access Token is missing'));
  }
  return config;
});

axiosInstanceWithToken.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (isAxiosError(error)) {
      if (error.response?.status === 401 || error.status === 401) {
        console.log('에러 발생');
        //TODO: 자동로그인 개발 시 이곳에서 액세스 토큰을 요청합니다.
        window.location.reload();
      }
    }
    return Promise.reject(error);
  },
);
