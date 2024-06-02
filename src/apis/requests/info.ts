import { axiosInstanceWithToken } from '../axios';
import type {
  EventHistoryCountGetRequest,
  EventHistoryCountGetResponse,
  EventHistoryGetRequest,
  EventHistoryGetResponse,
  MyPageGetResponse,
  PartnerListCountGetRequest,
  PartnerListCountGetResponse,
  PartnerListGetRequest,
  PartnerListGetResponse,
  PermissionGetRequest,
  PermissionGetResponse,
  PermissionPatchRequest,
  PermissionPatchResponse,
  PersonalInfoGetRequest,
  PersonalInfoGetResponse,
  PersonalInfoPatchRequest,
  PersonalInfoPatchResponse,
  ProfileGetRequest,
  ProfileGetResponse,
  ProfileImagePostRequest,
  ProfileImagePostResponse,
  RunningSpecGuideGetRequest,
  RunningSpecGuideGetResponse,
  RunningSpecGuidePatchRequest,
  RunningSpecGuidePatchResponse,
  RunningSpecViGetRequest,
  RunningSpecViGetResponse,
  RunningSpecViPatchRequest,
  runningSpecViPatchResponse,
  UserInfoGetResponse,
} from '../types/info';

import { EventSort, PartnerSort } from '@/types/sort';

class InfoApi {
  /**
   * @returns 마이페이지 상단에 있는 값 반환
   */
  myPageGet = async () => {
    return await axiosInstanceWithToken
      .get<MyPageGetResponse>('/user/mypage')
      .then((res) => res.data);
  };

  /**
   * @returns userId를 포함한 값 반환
   */
  userInfoGet = async () => {
    return await axiosInstanceWithToken
      .get<UserInfoGetResponse>('/user/personal')
      .then((res) => res.data);
  };

  /**
   * @return 회원가입 시 입력한 기본 인적사항 반환
   */
  personalInfoGet = async ({ userId }: PersonalInfoGetRequest) => {
    return await axiosInstanceWithToken
      .get<PersonalInfoGetResponse>(`/user/personal/${userId}`)
      .then((res) => res.data);
  };

  personalInfoPatch = async (updateData: PersonalInfoPatchRequest) => {
    return await axiosInstanceWithToken
      .patch<PersonalInfoPatchResponse>('/user/personal', updateData)
      .then((res) => res.data);
  };

  /**
   * @returns 회원가입 인적사항 중 러닝 스펙과 관련된 내용 반환
   */
  runningSpecGuideGet = async ({ userId }: RunningSpecGuideGetRequest) => {
    return await axiosInstanceWithToken
      .get<RunningSpecGuideGetResponse>(`/user/running/guide/${userId}`)
      .then((res) => res.data);
  };

  runningSpecGuidePatch = async (updataData: RunningSpecGuidePatchRequest) => {
    return await axiosInstanceWithToken
      .patch<RunningSpecGuidePatchResponse>('/user/running/guide', updataData)
      .then((res) => res.data);
  };

  /**
   * @returns 시각 장애 러너 러닝 스펙 반환
   */

  runningSpecViGet = async ({ userId }: RunningSpecViGetRequest) => {
    return await axiosInstanceWithToken
      .get<RunningSpecViGetResponse>(`/user/running/vi/${userId}`)
      .then((res) => res.data);
  };

  runningSpecViPatch = async (updateData: RunningSpecViPatchRequest) => {
    return await axiosInstanceWithToken
      .patch<runningSpecViPatchResponse>('/user/running/vi', updateData)
      .then((res) => res.data);
  };

  /**
   * @returns 권한 동의 여부 반환
   */

  permissionGet = async ({ userId }: PermissionGetRequest) => {
    return await axiosInstanceWithToken
      .get<PermissionGetResponse>(`/user/permission/${userId}`)
      .then((res) => res.data);
  };

  permissionPatch = async (updateData: PermissionPatchRequest) => {
    return await axiosInstanceWithToken
      .patch<PermissionPatchResponse>('/user/permission', updateData)
      .then((res) => res.data);
  };

  /**
   * 다른 사용자 정보를 search할 때 사용하는 api
   * @returns 사용자 기초 정보를 반환
   */

  profileGet = async ({ userId }: ProfileGetRequest) => {
    return await axiosInstanceWithToken
      .get<ProfileGetResponse>(`/user/profile/${userId}`)
      .then((res) => res.data);
  };

  /**
   * 함께 뛰었던 파트너 조회
   * @returns
   */

  partnerListGet = async ({
    userId,
    sort = PartnerSort.Count,
    limit = 4,
    start = 0,
  }: PartnerListGetRequest) => {
    return await axiosInstanceWithToken
      .get<PartnerListGetResponse>(
        `/user/partner-list/${userId}?sort=${sort}&limit=${limit}&start=${start}`,
      )
      .then((res) => res.data.items);
  };

  partnerListCountGet = async ({ userId }: PartnerListCountGetRequest) => {
    return await axiosInstanceWithToken
      .get<PartnerListCountGetResponse>(`/user/partner-list/count/${userId}`)
      .then((res) => res.data.count);
  };

  /**
   * 내가 참여한(신청한) 이벤트 목록 조회
   * @returns 내가 참여한 이벤트 목록 반환
   */

  eventHistoryGet = async ({
    userId,
    sort = EventSort.Total,
    limit = 3,
    start = 0,
  }: EventHistoryGetRequest) => {
    return await axiosInstanceWithToken
      .get<EventHistoryGetResponse>(
        `/user/event-history/${userId}?sort=${sort}&limit=${limit}&start=${start}`,
      )
      .then((res) => res.data);
  };

  eventHistoryCountGet = async ({
    userId,
    sort = EventSort.Total,
  }: EventHistoryCountGetRequest) => {
    return await axiosInstanceWithToken
      .get<EventHistoryCountGetResponse>(
        `/user/event-history/count/${userId}?sort=${sort}`,
      )
      .then((res) => res.data.count);
  };

  profileImagePost = async ({ image }: ProfileImagePostRequest) => {
    return await axiosInstanceWithToken
      .post<ProfileImagePostResponse>('/user/img', image)
      .then((res) => res.data.img);
  };
}

const infoApi = new InfoApi();

export default infoApi;
