import { axiosInstanceWithToken } from '../axios';
import {
  AdminApproveUserPostRequest,
  AdminApproveUserPostResponse,
  AdminCurrentEventGetRequest,
  AdminCurrentEventGetResponse,
  AdminEventHistoryCountGetRequest,
  AdminEventHistoryCountGetResponse,
  AdminEventHistoryGetRequest,
  AdminEventHistoryGetResponse,
  AdminEventListCountGetResponse,
  AdminEventListGetRequest,
  AdminEventListGetResponse,
  AdminEventTotalCountGetRequest,
  AdminEventTotalCountGetResponse,
  AdminGuideApplyGetRequest,
  AdminGuideApplyGetResponse,
  AdminNewUserGetRequest,
  AdminNewUserGetResponse,
  AdminUserListCountGetResponse,
  AdminUserListGetRequest,
  AdminUserListGetResponse,
  AdminViApplyGetRequest,
  AdminViApplyGetResponse,
} from '../types/admin';

class AdminApi {
  adminUserListGet = async ({ limit, start }: AdminUserListGetRequest) => {
    return await axiosInstanceWithToken
      .get<AdminUserListGetResponse>(
        `/admin/user-list?limit=${limit}&start=${start}`,
      )
      .then((res) => res.data.items);
  };

  adminUserListCountGet = async () => {
    return await axiosInstanceWithToken
      .get<AdminUserListCountGetResponse>(`/admin/user-list/count`)
      .then((res) => res.data.count);
  };

  adminViApplyGet = async ({ userId }: AdminViApplyGetRequest) => {
    return await axiosInstanceWithToken
      .get<AdminViApplyGetResponse>(`/admin/apply/vi/${userId}`)
      .then((res) => res.data);
  };

  adminGuideApplyGet = async ({ userId }: AdminGuideApplyGetRequest) => {
    return await axiosInstanceWithToken
      .get<AdminGuideApplyGetResponse>(`/admin/apply/guide/${userId}`)
      .then((res) => res.data);
  };

  adminApproveUserPost = async ({
    isApprove,
    userId,
    recordDegree,
  }: AdminApproveUserPostRequest) => {
    return await axiosInstanceWithToken
      .post<AdminApproveUserPostResponse>(`/admin/approval-user/${userId}`, {
        isApprove,
        recordDegree,
      })
      .then((res) => res.data);
  };

  adminEventListGet = async ({ limit, start }: AdminEventListGetRequest) => {
    return await axiosInstanceWithToken
      .get<AdminEventListGetResponse>(
        `/admin/event-list?limit=${limit}&start=${start}`,
      )
      .then((res) => res.data.items);
  };

  adminEventListCountGet = async () => {
    return await axiosInstanceWithToken
      .get<AdminEventListCountGetResponse>(`/admin/event-list/count`)
      .then((res) => res.data.count);
  };

  adminEventHistoryGet = async ({
    limit,
    month,
    start,
    userId,
    year,
  }: AdminEventHistoryGetRequest) => {
    return await axiosInstanceWithToken
      .get<AdminEventHistoryGetResponse>(
        `/admin/${userId}/event-list?start=${start}&limit=${limit}&year=${year}&month=${month}`,
      )
      .then((res) => res.data.items);
  };

  adminEventHistoryCountGet = async ({
    month,
    userId,
    year,
  }: AdminEventHistoryCountGetRequest) => {
    return await axiosInstanceWithToken
      .get<AdminEventHistoryCountGetResponse>(
        `/admin/${userId}/event-list/count?year=${year}&month=${month}`,
      )
      .then((res) => res.data.count);
  };

  adminEventTotalCountGet = async ({
    userId,
  }: AdminEventTotalCountGetRequest) => {
    return await axiosInstanceWithToken
      .get<AdminEventTotalCountGetResponse>(`/admin/${userId}/event-type/count`)
      .then((res) => res.data);
  };

  adminNewUserGet = async ({
    limit = 6,
    start = 0,
  }: AdminNewUserGetRequest) => {
    return await axiosInstanceWithToken
      .get<AdminNewUserGetResponse>(
        `/admin/new-user?limit=${limit}&start=${start}`,
      )
      .then((res) => res.data.items);
  };

  adminCurrentEventGet = async ({
    limit = 4,
    start = 0,
  }: AdminCurrentEventGetRequest) => {
    return await axiosInstanceWithToken
      .get<AdminCurrentEventGetResponse>(
        `/admin/current-event?limit=${limit}&start=${start}`,
      )
      .then((res) => res.data.items);
  };
}

const adminApi = new AdminApi();

export default adminApi;
