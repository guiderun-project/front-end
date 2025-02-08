import {
  AllEventCountGetRequest,
  AllEventGetRequest,
  CloseEventPatchRequest,
  EditEventPatchRequest,
  EventApplyAllGetRequest,
  EventApplyCountGetRequest,
  EventApplyDeleteRequest,
  EventApplyGetRequest,
  EventApplyPatchRequest,
  EventApplyPostRequest,
  EventApplyStatusGetRequest,
  EventAttendPostRequest,
  EventAttendStatusCountGetRequest,
  EventCalendarDetailGetRequest,
  EventCalendarGetRequest,
  EventCommentCountGetRequest,
  EventCommentDeleteRequest,
  EventCommentGetRequest,
  EventCommentLikeCountGetRequest,
  EventCommentLikePostRequest,
  EventCommentPatchRequest,
  EventCommentPostRequest,
  EventDeleteRequest,
  EventGetRequest,
  EventLikeCountGetRequest,
  EventLikePoseRequest,
  EventMatchedGuideCountGetRequest,
  EventMatchedGuideGetRequest,
  EventMatchedViCountGetRequest,
  EventMatchedViGetRequest,
  EventMatchingDeleteRequest,
  EventMatchingPostRequest,
  EventNotMatchingCountGetRequest,
  EventNotMatchingGetRequest,
  EventPopupGetRequest,
  EventTypeCountGetRequest,
  MyEventGetRequest,
  NewEventPostRequest,
  SearchEventCountGetRequest,
  SearchEventGetRequest,
} from '../types/event';

export const event = {
  eventGet: (value: EventGetRequest) => ['eventGet', ...Object.values(value)],
  eventDelete: (value: EventDeleteRequest) => [
    'eventDelete',
    ...Object.values(value),
  ],
  allEventCountGet: (value: AllEventCountGetRequest) => [
    'allEventCountGet',
    ...Object.values(value),
  ],
  allEventGet: (value: AllEventGetRequest) => [
    'allEventGet',
    ...Object.values(value),
  ],
  eventPopupGet: (value: EventPopupGetRequest) => [
    'eventPopupGet',
    ...Object.values(value),
  ],
  upcomingEventDdayGet: () => ['upcomingEventDdayGet'],
  myEventGet: (value: MyEventGetRequest) => [
    'myEventGet',
    ...Object.values(value),
  ],
  searchEventCountGet: (value: SearchEventCountGetRequest) => [
    'searchEventCountGet',
    ...Object.values(value),
  ],
  searchEventGet: (value: SearchEventGetRequest) => [
    'searchEventGet',
    ...Object.values(value),
  ],
  eventCalendarGet: (value: EventCalendarGetRequest) => [
    'eventCalendarGet',
    ...Object.values(value),
  ],
  eventCalendarDetailGet: (value: EventCalendarDetailGetRequest) => [
    'eventCalendarDetailGet',
    ...Object.values(value),
  ],
  eventTypeCountGet: (value: EventTypeCountGetRequest) => [
    'eventTypeCountGet',
    ...Object.values(value),
  ],
  newEventPost: (value: NewEventPostRequest) => [
    'newEventPost',
    ...Object.values(value),
  ],
  editEventPatch: (value: EditEventPatchRequest) => [
    'editEventPatch',
    ...Object.values(value),
  ],
  closeEventPatch: (value: CloseEventPatchRequest) => [
    'closeEventPatch',
    ...Object.values(value),
  ],
  eventLikeCountGet: (value: EventLikeCountGetRequest) => [
    'eventLikeCountGet',
    ...Object.values(value),
  ],
  eventLikePost: (value: EventLikePoseRequest) => [
    'eventLikePost',
    ...Object.values(value),
  ],
  eventCommentCountGet: (value: EventCommentCountGetRequest) => [
    'eventCommentCountGet',
    ...Object.values(value),
  ],
  eventCommentGet: (value: EventCommentGetRequest) => [
    'eventCommentGet',
    ...Object.values(value),
  ],
  eventCommentLikeCountGet: (value: EventCommentLikeCountGetRequest) => [
    'eventCommentLikeCountGet',
    ...Object.values(value),
  ],
  eventCommentLikePost: (value: EventCommentLikePostRequest) => [
    'eventCommentLikePost',
    ...Object.values(value),
  ],
  eventCommentPost: (value: EventCommentPostRequest) => [
    'eventCommentPost',
    ...Object.values(value),
  ],
  eventCommentPatch: (value: EventCommentPatchRequest) => [
    'eventCommentPatch',
    ...Object.values(value),
  ],
  eventCommentDelete: (value: EventCommentDeleteRequest) => [
    'eventCommentDelete',
    ...Object.values(value),
  ],
  eventApplyGet: (value: EventApplyGetRequest) => [
    'eventApplyGet',
    ...Object.values(value),
  ],
  eventApplyPatch: (value: EventApplyPatchRequest) => [
    'eventApplyPatch',
    ...Object.values(value),
  ],
  eventApplyPost: (value: EventApplyPostRequest) => [
    'eventApplyPost',
    ...Object.values(value),
  ],
  eventApplyDelete: (value: EventApplyDeleteRequest) => [
    'eventApplyDelete',
    ...Object.values(value),
  ],
  eventApplyCountGet: (value: EventApplyCountGetRequest) => [
    'eventApplyCountGet',
    ...Object.values(value),
  ],
  eventApplyStatusGet: (value: EventApplyStatusGetRequest) => [
    'eventApplyStatusGet',
    ...Object.values(value),
  ],
  eventAttendPost: (value: EventAttendPostRequest) => [
    'eventAttendPost',
    ...Object.values(value),
  ],
  eventAttendStatusCountGet: (value: EventAttendStatusCountGetRequest) => [
    'eventAttendStatusCountGet',
    ...Object.values(value),
  ],
  eventMatchingPost: (value: EventMatchingPostRequest) => [
    'eventMatchingPost',
    ...Object.values(value),
  ],
  eventMatchingDelete: (value: EventMatchingDeleteRequest) => [
    'eventMatchingDelete',
    ...Object.values(value),
  ],
  eventNotMatchingCountGet: (value: EventNotMatchingCountGetRequest) => [
    'eventNotMatchingCountGet',
    ...Object.values(value),
  ],
  eventNotMatchingGet: (value: EventNotMatchingGetRequest) => [
    'eventNotMatchingGet',
    ...Object.values(value),
  ],
  eventMatchedViCountGet: (value: EventMatchedViCountGetRequest) => [
    'eventMatchedViCountGet',
    ...Object.values(value),
  ],
  eventMatchedViGet: (value: EventMatchedViGetRequest) => [
    'eventMatchedViGet',
    ...Object.values(value),
  ],
  eventMatchedGuideCountGet: (value: EventMatchedGuideCountGetRequest) => [
    'eventMatchedGuideCountGet',
    ...Object.values(value),
  ],
  eventMatchedGuideGet: (value: EventMatchedGuideGetRequest) => [
    'eventMatchedGuideGet',
    ...Object.values(value),
  ],
  eventApplyAllGet: (value: EventApplyAllGetRequest) => [
    'eventApplyAllGet',
    ...Object.values(value),
  ],
  eventAutoMatching: (eventId: number) => ['eventAutoMatching', eventId],
};
