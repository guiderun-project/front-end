import {
  EventHistoryCountGetRequest,
  EventHistoryGetRequest,
  LikePostRequest,
  PartnerListCountGetRequest,
  PartnerListGetRequest,
  PermissionGetRequest,
  PermissionPatchRequest,
  PersonalInfoGetRequest,
  PersonalInfoPatchRequest,
  ProfileImagePostRequest,
  RunningSpecGuideGetRequest,
  RunningSpecGuidePatchRequest,
  RunningSpecViGetRequest,
  RunningSpecViPatchRequest,
  UserProfileGetRequest,
} from '../types/info';

export const info = {
  myPageGet: () => ['myPageGet'],
  userInfoGet: () => ['userInfoGet'],
  personalInfoGet: (value: PersonalInfoGetRequest) => [
    'personalInfoGet',
    ...Object.values(value),
  ],
  personalInfoPatch: (value: PersonalInfoPatchRequest) => [
    'personalInfoPatch',
    ...Object.values(value),
  ],
  runningSpecGuideGet: (value: RunningSpecGuideGetRequest) => [
    'runningSpecGuideGet',
    ...Object.values(value),
  ],
  runningSpecGuidePatch: (value: RunningSpecGuidePatchRequest) => [
    'runningSpecGuidePatch',
    ...Object.values(value),
  ],
  runningSpecViGet: (value: RunningSpecViGetRequest) => [
    'runningSpecViGet',
    ...Object.values(value),
  ],
  runningSpecViPatch: (value: RunningSpecViPatchRequest) => [
    'runningSpecViPatch',
    ...Object.values(value),
  ],
  permissionGet: (value: PermissionGetRequest) => [
    'permissionGet',
    ...Object.values(value),
  ],
  permissionPatch: (value: PermissionPatchRequest) => [
    'permissionPatch',
    ...Object.values(value),
  ],
  userProfileGet: (value: UserProfileGetRequest) => [
    'userProfileGet',
    ...Object.values(value),
  ],
  partnerListGet: (value: PartnerListGetRequest) => [
    'partnerListGet',
    ...Object.values(value),
  ],
  partnerListCountGet: (value: PartnerListCountGetRequest) => [
    'partnerListCountGet',
    ...Object.values(value),
  ],
  eventHistoryGet: (value: EventHistoryGetRequest) => [
    'eventHistoryGet',
    ...Object.values(value),
  ],
  eventHistoryCountGet: (value: EventHistoryCountGetRequest) => [
    'eventHistoryCountGet',
    ...Object.values(value),
  ],
  profileImagePost: (value: ProfileImagePostRequest) => [
    'profileImagePost',
    ...Object.values(value),
  ],
  likePost: (value: LikePostRequest) => ['likePost', ...Object.values(value)],
  userInfoAllGet: () => ['userInfoAllGet'],
};
