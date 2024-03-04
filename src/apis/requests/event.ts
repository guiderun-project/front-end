import { axiosInstanceWithToken } from '../axios';
import { eventPopupGetRequest, eventPopupGetResponse } from '../types/event';

class EventApi {
  eventPopupGet = async ({ eventId }: eventPopupGetRequest) => {
    return await axiosInstanceWithToken
      .get<eventPopupGetResponse>(`/event/pop/${eventId}`)
      .then((res) => res.data);
  };
}

const eventApi = new EventApi();

export default eventApi;
