import axios from 'axios';

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
