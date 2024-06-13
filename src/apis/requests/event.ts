import { axiosInstanceWithToken } from '../axios';
import {
  EventCalendarDetailGetRequest,
  EventCalendarDetailGetResponse,
  EventCalendarGetResponse,
  EventCalendarGetRequest,
  EventPopupGetRequest,
  EventPopupGetResponse,
  MyEventGetRequest,
  MyEventGetResponse,
  SearchEventCountGetRequest,
  SearchEventCountGetResponse,
  SearchEventGetRequest,
  SearchEventGetResponse,
  UpcomingEventDdayGetResponse,
  AllEventCountGetRequest,
  AllEventCountGetResponse,
  AllEventGetRequest,
  AllEventGetResponse,
  EventTypeCountGetResponse,
  NewEventPostRequest,
  NewEventPostResponse,
  EventTypeCountGetRequest,
  EventGetRequest,
  EventGetResponse,
  EditEventPatchResponse,
  EditEventPatchRequest,
  CloseEventPatchRequest,
  EventLikeCountGetRequest,
  EventLikeCountGetResponse,
  EventLikePostResponse,
  EventLikePoseRequest,
  EventCommentCountGetRequest,
  EventCommentCountGetResponse,
  EventCommentGetRequest,
  EventCommentGetResponse,
  EventCommentLikeCountGetRequest,
  EventCommentLikeCountGetResponse,
  EventCommentLikePostRequest,
  EventCommentLikePostResponse,
  EventCommentPostRequest,
  EventCommentPostResponse,
  EventCommentPatchRequest,
  EventCommentPatchResponse,
  EventCommentDeleteRequest,
  EventCommentDeleteResponse,
} from '../types/event';

class EventApi {
  eventGet = async ({ eventId }: EventGetRequest) => {
    return await axiosInstanceWithToken
      .get<EventGetResponse>(`/event/${eventId}`)
      .then((res) => res.data);
  };

  allEventCountGet = async ({ kind, sort, type }: AllEventCountGetRequest) => {
    return await axiosInstanceWithToken
      .get<AllEventCountGetResponse>(
        `/event/all/count?sort=${sort}&type=${type}&kind=${kind}`,
      )
      .then((res) => res.data.count);
  };

  allEventGet = async ({
    start = 0,
    limit = 6,
    kind,
    sort,
    type,
  }: AllEventGetRequest) => {
    return await axiosInstanceWithToken
      .get<AllEventGetResponse>(
        `/event/all?start=${start}&limit=${limit}&kind=${kind}&sort=${sort}&type=${type}`,
      )
      .then((res) => res.data.items);
  };

  eventPopupGet = async ({ eventId }: EventPopupGetRequest) => {
    return await axiosInstanceWithToken
      .get<EventPopupGetResponse>(`/event/pop/${eventId}`)
      .then((res) => res.data);
  };

  /**
   *
   * @returns 메인페이지 상단에 나타나는 사용자가 신청한 이벤트 D-day를 반환
   */
  upcomingEventDdayGet = async () => {
    return await axiosInstanceWithToken
      .get<UpcomingEventDdayGetResponse>('/event/dday')
      .then((res) => res.data.eventItems);
  };

  myEventGet = async ({ year, sort }: MyEventGetRequest) => {
    return await axiosInstanceWithToken
      .get<MyEventGetResponse>(`/event/my?sort=${sort}&year=${year}`)
      .then((res) => res.data.items);
  };

  searchEventCountGet = async ({ title }: SearchEventCountGetRequest) => {
    return await axiosInstanceWithToken
      .get<SearchEventCountGetResponse>(`/event/search/count?title=${title}`)
      .then((res) => res.data.count);
  };

  searchEventGet = async ({ title, limit, start }: SearchEventGetRequest) => {
    return await axiosInstanceWithToken
      .get<SearchEventGetResponse>(
        `/event/search?title=${title}&limit=${limit}&start=${start}`,
      )
      .then((res) => res.data.items);
  };

  eventCalendarGet = async ({ month, year }: EventCalendarGetRequest) => {
    return await axiosInstanceWithToken
      .get<EventCalendarGetResponse>(
        `/event/calendar?year=${year}&month=${month}`,
      )
      .then((res) => res.data.result);
  };

  eventCalendarDetailGet = async ({
    day,
    month,
    year,
  }: EventCalendarDetailGetRequest) => {
    return await axiosInstanceWithToken
      .get<EventCalendarDetailGetResponse>(
        `/event/calendar/detail?year=${year}&month=${month}&day=${day}`,
      )
      .then((res) => res.data.items);
  };

  eventTypeCountGet = async ({ userId }: EventTypeCountGetRequest) => {
    return await axiosInstanceWithToken
      .get<EventTypeCountGetResponse>(`/user/event-type/count/${userId}`)
      .then((res) => res.data);
  };

  newEventPost = async (body: NewEventPostRequest) => {
    return await axiosInstanceWithToken
      .post<NewEventPostResponse>('/event', body)
      .then((res) => res.data);
  };

  editEventPatch = async ({
    eventId,
    EditEventPatchRequestBody,
  }: EditEventPatchRequest) => {
    return await axiosInstanceWithToken
      .patch<EditEventPatchResponse>(
        `/event/${eventId}`,
        EditEventPatchRequestBody,
      )
      .then((res) => res.data);
  };

  closeEventPatch = async ({ eventId }: CloseEventPatchRequest) => {
    return await axiosInstanceWithToken
      .patch(`/event/close/${eventId}`)
      .then((res) => res.data);
  };

  eventLikeCountGet = async ({ eventId }: EventLikeCountGetRequest) => {
    return await axiosInstanceWithToken
      .get<EventLikeCountGetResponse>(`/event/${eventId}/likes/count`)
      .then((res) => res.data);
  };

  eventLikePost = async ({ eventId }: EventLikePoseRequest) => {
    return await axiosInstanceWithToken
      .post<EventLikePostResponse>(`/event/${eventId}/likes`)
      .then((res) => res.data.likes);
  };

  eventCommentCountGet = async ({ eventId }: EventCommentCountGetRequest) => {
    return await axiosInstanceWithToken
      .get<EventCommentCountGetResponse>(`/event/${eventId}/comments/count`)
      .then((res) => res.data.count);
  };

  eventCommentGet = async ({
    eventId,
    limit = 4,
    start = 0,
  }: EventCommentGetRequest) => {
    return await axiosInstanceWithToken
      .get<EventCommentGetResponse>(
        `/event/${eventId}/comments?limit=${limit}&start=${start}`,
      )
      .then((res) => res.data.comments);
  };

  eventCommentLikeCountGet = async ({
    commentId,
  }: EventCommentLikeCountGetRequest) => {
    return await axiosInstanceWithToken
      .get<EventCommentLikeCountGetResponse>(
        `/event/comment/${commentId}/likes/count`,
      )
      .then((res) => res.data);
  };

  eventCommentLikePost = async ({ commentId }: EventCommentLikePostRequest) => {
    return await axiosInstanceWithToken
      .post<EventCommentLikePostResponse>(`/event/comment/${commentId}/likes`)
      .then((res) => res.data.likes);
  };

  eventCommentPost = async ({
    eventId,
    EventCommentPostBody,
  }: EventCommentPostRequest) => {
    return await axiosInstanceWithToken
      .post<EventCommentPostResponse>(
        `/event/${eventId}/comments`,
        EventCommentPostBody,
      )
      .then((res) => res.data.commentId);
  };

  eventCommentPatch = async ({
    eventId,
    commentId,
    EventCommentPatchBody,
  }: EventCommentPatchRequest) => {
    return await axiosInstanceWithToken
      .patch<EventCommentPatchResponse>(
        `/event/${eventId}/${commentId}`,
        EventCommentPatchBody,
      )
      .then((res) => res.data.commentId);
  };

  eventCommentDelete = async ({
    commentId,
    eventId,
  }: EventCommentDeleteRequest) => {
    return await axiosInstanceWithToken
      .delete<EventCommentDeleteResponse>(`/event/${eventId}/${commentId}`)
      .then((res) => res.data.commentId);
  };
}

const eventApi = new EventApi();

export default eventApi;
