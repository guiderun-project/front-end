import { axiosInstanceWithToken } from '../axios';
import { EventPopupGetRequest, EventPopupGetResponse } from '../types/event';

class EventApi {
  eventPopupGet = async ({ eventId }: EventPopupGetRequest) => {
    return await axiosInstanceWithToken
      .get<EventPopupGetResponse>(`/event/pop/${eventId}`)
      .then((res) => res.data);
  };
}

const eventApi = new EventApi();

export default eventApi;
