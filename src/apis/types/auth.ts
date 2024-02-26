import { GenderEnum, RoleEnum, RunningGroup } from '@/types/group';

export type kakaoAuthPostRequest = {
  code: string;
};

export type kakaoAuthPostResponse = {
  accessToken: string;
  //false: new user
  //true: go to main
  isExist: boolean;
};

export type viSignupPostRequest = {
  //common section
  accountId: string;
  password: string;
  name: string;
  gender: GenderEnum;
  phoneNumber: string;
  isOpenNumber: boolean;
  age: number;
  recordDegree: RunningGroup;
  detailRecord: string | null;
  snsId: string | null;
  isOpenSns: boolean;
  //VI section
  isRunningExp: boolean;
  guideName: string | null;
  runningPlace: string | null;

  howToKnow: string[] | null;
  motive: string | null;
  hopePrefs: string | null;

  privacy: boolean;
  portraitRights: boolean;
};

export type guideSignupPostRequest = {
  //common section
  accountId: string;
  password: string;
  name: string;
  gender: GenderEnum;
  phoneNumber: string;
  isOpenNumber: boolean;
  age: number;
  recordDegree: RunningGroup;
  detailRecord: string | null;
  snsId: string | null;
  isOpenSns: boolean;
  runningPlace: string | null;

  //guide section
  isGuideExp: boolean;
  viName: string | null;
  viRecord: string | null;
  viCount: string | null;
  guidingPace: RunningGroup;

  howToKnow: string[] | null;
  motive: string | null;
  hopePrefs: string | null;

  privacy: boolean;
  portraitRights: boolean;
};

export type signupPostResponse = {
  userId: string;
  accessToken: string;
  role: RoleEnum;
};

export type accessTokenGetResponse = {
  accessToken: string;
};

export type checkDuplicatedPostRequest = {
  accountId: string;
};

export type checkDuplicatedPostResponse = {
  unique: boolean;
};
