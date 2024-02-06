export const BROWSER_PATH = {
  MAIN: '',
  ADMIN: '/admin',
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
};

// const API_PATH = {

// }

export const KAKAO_REDIRECT_URL = `${window.location.origin}${BROWSER_PATH.OAUTH}`;
