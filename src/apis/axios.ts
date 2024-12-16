import axios, { isAxiosError } from 'axios';

import { store } from '../store';
import authApi from './requests/auth';
import { setAccessToken } from '@/store/reducer/auth';

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
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    try {
      const reIssuedAccessToken = await authApi.accessTokenGet();
      store.dispatch(setAccessToken(reIssuedAccessToken));

      config.headers.Authorization = `Bearer ${accessToken}`;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return config;
});

axiosInstanceWithToken.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (isAxiosError(error)) {
      if (error.response?.status === 401 || error.status === 401) {
        try {
          const accessToken = await authApi.accessTokenGet();
          store.dispatch(setAccessToken(accessToken));

          const originalConfig = {
            ...error.config,
            headers: {
              ...error.config?.headers,
              Authorization: `Bearer ${accessToken}`,
            },
          };

          return axiosInstanceWithToken(originalConfig);
        } catch (_) {
          window.location.reload();
        }
      }
    }
    return Promise.reject(error);
  },
);
