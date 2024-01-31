import { EventSort, PartnerSort } from '@/types/sort';
import { axiosInstanceWithToken } from '../axios';
import type {
  eventHistoryCountGetRequest,
  eventHistoryCountGetResponse,
  eventHistoryGetRequest,
  eventHistoryGetResponse,
  myPageGetResponse,
  partnerListCountGetRequest,
  partnerListCountGetResponse,
  partnerListGetRequest,
  partnerListGetResponse,
  permissionGetRequest,
  permissionGetResponse,
  permissionPatchRequest,
  permissionPatchResponse,
  personalInfoGetRequest,
  personalInfoGetResponse,
  personalInfoPatchRequest,
  personalInfoPatchResponse,
  profileGetRequest,
  profileGetResponse,
  runningSpecGuideGetRequest,
  runningSpecGuideGetResponse,
  runningSpecGuidePatchRequest,
  runningSpecGuidePatchResponse,
  runningSpecViGetRequest,
  runningSpecViGetResponse,
  runningSpecViPatchRequest,
  runningSpecViPatchResponse,
  userInfoGetResponse,
} from '../types/info';

class AuthApi {
  /**
   * @returns 마이페이지 상단에 있는 값 반환
   */
  myPageGet = async () => {
    return await axiosInstanceWithToken
      .get<myPageGetResponse>('/user/mypage')
      .then((res) => res.data);
  };

  /**
   * @returns userId를 포함한 값 반환
   */
  userInfoGet = async () => {
    return await axiosInstanceWithToken
      .get<userInfoGetResponse>('/user/personal')
      .then((res) => res.data);
  };

  /**
   * @return 회원가입 시 입력한 기본 인적사항 반환
   */
  personalInfoGet = async ({ userId }: personalInfoGetRequest) => {
    return await axiosInstanceWithToken
      .get<personalInfoGetResponse>(`user/personal/${userId}`)
      .then((res) => res.data);
  };

  personalInfoPatch = async (updateData: personalInfoPatchRequest) => {
    return await axiosInstanceWithToken
      .patch<personalInfoPatchResponse>('/user/personal', updateData)
      .then((res) => res.data);
  };

  /**
   * @returns 회원가입 인적사항 중 러닝 스펙과 관련된 내용 반환
   */
  runningSpecGuideGet = async ({ userId }: runningSpecGuideGetRequest) => {
    return await axiosInstanceWithToken
      .get<runningSpecGuideGetResponse>(`/user/running/guide/${userId}`)
      .then((res) => res.data);
  };

  runningSpecGuidePatch = async (updataData: runningSpecGuidePatchRequest) => {
    return await axiosInstanceWithToken
      .patch<runningSpecGuidePatchResponse>('/user/running/guide', updataData)
      .then((res) => res.data);
  };

  /**
   * @returns 시각 장애 러너 러닝 스펙 반환
   */

  runningSpecViGet = async ({ userId }: runningSpecViGetRequest) => {
    return await axiosInstanceWithToken
      .get<runningSpecViGetResponse>(`/user/running/vi/${userId}`)
      .then((res) => res.data);
  };

  runningSpecViPatch = async (updateData: runningSpecViPatchRequest) => {
    return await axiosInstanceWithToken
      .patch<runningSpecViPatchResponse>('/user/running/vi', updateData)
      .then((res) => res.data);
  };

  /**
   * @returns 권한 동의 여부 반환
   */

  permissionGet = async ({ userId }: permissionGetRequest) => {
    return await axiosInstanceWithToken
      .get<permissionGetResponse>(`/user/permission/${userId}`)
      .then((res) => res.data);
  };

  permissionPatch = async (updateData: permissionPatchRequest) => {
    return await axiosInstanceWithToken
      .patch<permissionPatchResponse>('/user/permission', updateData)
      .then((res) => res.data);
  };

  /**
   * 다른 사용자 정보를 search할 때 사용하는 api
   * @returns 사용자 기초 정보를 반환
   */

  profileGet = async ({ userId }: profileGetRequest) => {
    return await axiosInstanceWithToken
      .get<profileGetResponse>(`/user/profile/${userId}`)
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
  }: partnerListGetRequest) => {
    return await axiosInstanceWithToken.get<partnerListGetResponse>(
      `/user/partner-list/${userId}?sort=${sort}&limit=${limit}&start=${start}`,
    );
  };

  partnerListCountGet = async ({ userId }: partnerListCountGetRequest) => {
    return await axiosInstanceWithToken
      .get<partnerListCountGetResponse>(`/user/partner-list/count/${userId}`)
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
  }: eventHistoryGetRequest) => {
    return await axiosInstanceWithToken
      .get<eventHistoryGetResponse>(
        `/user/event-history/${userId}?sort=${sort}&limit=${limit}&start=${start}`,
      )
      .then((res) => res.data);
  };

  eventHistoryCountGet = async ({
    userId,
    sort = EventSort.Total,
  }: eventHistoryCountGetRequest) => {
    return axiosInstanceWithToken
      .get<eventHistoryCountGetResponse>(
        `api/user/event-history/count/${userId}?sort=${sort}`,
      )
      .then((res) => res.data.count);
  };
}

const authApi = new AuthApi();

export default authApi;
