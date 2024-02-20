export const BROWSER_PATH = {
  MAIN: '',
  ADMIN: {
    MAIN: '/admin',
    USER: '/admin/user',
    EVENT: '/admin/event',
  },
  EVENT: {
    MAIN: '/event',
    ALL: '/event/all',
    MY: '/event/my',
    UPCOMING: '/event/upcoming',
  },
  CALENDAR: '/calender',
  SEARCH: '/search',
  INTRO: '/intro',
  OAUTH: '/oauth',
  SIGNUP: '/signup',
  MYPAGE: '/my',
  INFO: '/info',
};

// const API_PATH = {

// }

export const KAKAO_REDIRECT_URL = `${window.location.origin}${BROWSER_PATH.OAUTH}`;
