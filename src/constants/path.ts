export const BROWSER_PATH = {
  MAIN: '/',
  ADMIN: {
    MAIN: '/admin',
    USER: '/admin',
    EVENT: '/admin/event',
  },
  EVENT: {
    MAIN: '/event',
    DETAIL: '/event',
    ALL: '/event/all',
    MY: '/event/my',
    CALENDAR: '/event/calendar',
    SEARCH: '/event/search',
    HISTORY: '/event/history',
    NEW: '/event/new',
    EDIT: '/event/edit',
    APPLY: '/event/apply',
    APPLY_EDIT: '/event/apply/edit',
    APPLY_DETAIL: '/event/apply/detail',
  },
  CALENDAR: '/calender',
  SEARCH: '/search',
  INTRO: '/intro',
  OAUTH: '/oauth',
  SIGNUP: '/signup',
  MYPAGE: '/my',
  INFO: '/info',
  LOGIN: '/login',
  FIND_ID_PASSWORD: '/find-id-password',
  PROFILE: '/profile',
  WITHDRAW: '/withdraw',
};

// const API_PATH = {

// }

export const PREV_PATH_KEY = 'PREV_PATH';

export const KAKAO_REDIRECT_URL = `${window.location.origin}${BROWSER_PATH.OAUTH}`;
