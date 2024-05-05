import { GenderEnum, RoleEnum, RunningGroup } from '@/types/group';

export type KakaoAuthPostRequest = {
  code: string;
};

export type KakaoAuthPostResponse = {
  accessToken: string;
  //false: new user
  //true: go to main
  isExist: boolean;
};

export type ViSignupPostRequest = {
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

export type GuideSignupPostRequest = {
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

export type SignupPostResponse = {
  userId: string;
  accessToken: string;
  role: RoleEnum;
};

export type AccessTokenGetResponse = {
  accessToken: string;
};

export type CheckDuplicatedPostRequest = {
  accountId: string;
};

export type CheckDuplicatedPostResponse = {
  isUnique: boolean;
};

export type LoginPostRequest = {
  accountId: string;
  password: string;
};

export type LoginPostResponse = {
  accessToken: string;
};

export type GetCertificationTokenPasswordPostRequest = {
  accountId: string;
  phoneNum: string;
};

export type CheckCertificationTokenPostRequest = {
  number: string;
};

export type CheckCertificationTokenPostResponse = {
  token: string;
};

export type GetCertificationTokenIdPostRequest = {
  phoneNum: string;
};

export type RenewalPasswordPatchRequest = {
  token: string;
  newPassword: string;
};

export type GetUserIdPostRequest = {
  token: string;
};

export type GetUserIdPostResponse = {
  accountId: string;
  createdAt: string;
};
