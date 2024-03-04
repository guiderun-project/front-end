import { axiosInstanceWithToken } from '../axios';
import {
  adminApproveUserPostRequest,
  adminApproveUserPostResponse,
  adminEventHistoryCountGetRequest,
  adminEventHistoryCountGetResponse,
  adminEventHistoryGetRequest,
  adminEventHistoryGetResponse,
  adminEventListCountGetResponse,
  adminEventListGetRequest,
  adminEventListGetResponse,
  adminEventTotalCountGetRequest,
  adminEventTotalCountGetResponse,
  adminGuideApplyGetRequest,
  adminGuideApplyGetResponse,
  adminUserListCountGetResponse,
  adminUserListGetRequest,
  adminUserListGetResponse,
  adminViApplyGetRequest,
  adminViApplyGetResponse,
} from '../types/admin';

class AdminApi {
  adminUserListGet = async ({ limit, start }: adminUserListGetRequest) => {
    return await axiosInstanceWithToken
      .get<adminUserListGetResponse>(
        `/admin/user-list?limit=${limit}&start=${start}`,
      )
      .then((res) => res.data.items);
  };

  adminUserListCountGet = async () => {
    return await axiosInstanceWithToken
      .get<adminUserListCountGetResponse>(`/admin/user-list/count`)
      .then((res) => res.data.count);
  };

  adminViApplyGet = async ({ userId }: adminViApplyGetRequest) => {
    return await axiosInstanceWithToken
      .get<adminViApplyGetResponse>(`/admin/apply/vi/${userId}`)
      .then((res) => res.data);
  };

  adminGuideApplyGet = async ({ userId }: adminGuideApplyGetRequest) => {
    return await axiosInstanceWithToken
      .get<adminGuideApplyGetResponse>(`/admin/apply/guide/${userId}`)
      .then((res) => res.data);
  };

  adminApproveUserPost = async ({
    isApprove,
    userId,
    recordDegree,
  }: adminApproveUserPostRequest) => {
    return await axiosInstanceWithToken
      .post<adminApproveUserPostResponse>(`/admin/approval-user/${userId}`, {
        isApprove,
        recordDegree,
      })
      .then((res) => res.data);
  };

  adminEventListGet = async ({ limit, start }: adminEventListGetRequest) => {
    return await axiosInstanceWithToken
      .get<adminEventListGetResponse>(
        `/admin/event-list?limit=${limit}&start=${start}`,
      )
      .then((res) => res.data.items);
  };

  adminEventListCountGet = async () => {
    return await axiosInstanceWithToken
      .get<adminEventListCountGetResponse>(`/admin/event-list/count`)
      .then((res) => res.data.count);
  };

  adminEventHistoryGet = async ({
    limit,
    month,
    start,
    userId,
    year,
  }: adminEventHistoryGetRequest) => {
    return await axiosInstanceWithToken
      .get<adminEventHistoryGetResponse>(
        `/admin/${userId}/event-list?start=${start}&limit=${limit}&year=${year}&month=${month}`,
      )
      .then((res) => res.data.items);
  };

  adminEventHistoryCountGet = async ({
    month,
    userId,
    year,
  }: adminEventHistoryCountGetRequest) => {
    return await axiosInstanceWithToken
      .get<adminEventHistoryCountGetResponse>(
        `/admin/${userId}/event-list/count?year=${year}&month=${month}`,
      )
      .then((res) => res.data.count);
  };

  adminEventTotalCountGet = async ({
    userId,
  }: adminEventTotalCountGetRequest) => {
    return await axiosInstanceWithToken
      .get<adminEventTotalCountGetResponse>(`/admin/${userId}/event-type/count`)
      .then((res) => res.data);
  };
}

const adminApi = new AdminApi();

export default adminApi;
