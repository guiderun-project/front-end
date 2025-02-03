import {
  AdminApplyListCountGetRequest,
  AdminApplyListGetRequest,
  AdminApprovalEventPostRequest,
  AdminApproveUserPostRequest,
  AdminCurrentEventGetRequest,
  AdminEventHistoryCountGetRequest,
  AdminEventHistoryGetRequest,
  AdminEventListGetRequest,
  AdminEventResultGetRequest,
  AdminEventTotalCountGetRequest,
  AdminEventTypeCountGetRequest,
  AdminGuideApplyGetRequest,
  AdminNewUserGetRequest,
  AdminPartnerHistoryCountGetRequest,
  AdminPartnerHistoryGetRequest,
  AdminPartnerTypeCountGetRequest,
  AdminSearchEventCountGetRequest,
  AdminSearchEventGetRequest,
  AdminSearchEventHistoryCountGetRequest,
  AdminSearchEventHistoryGetRequest,
  AdminSearchPartnerHistoryCountGetRequest,
  AdminSearchPartnerHistoryGetRequest,
  AdminSearchWithdrawalListCountGetRequest,
  AdminSearchWithdrawalListGetRequest,
  AdminUserListGetRequest,
  AdminUserSearchCountGetRequest,
  AdminUserSearchGetRequest,
  AdminViApplyGetRequest,
  AdminWithdrawalListGetRequest,
} from '../types/admin';

export const admin = {
  adminUserListGet: (value: AdminUserListGetRequest) => [
    'adminUserListGet',
    ...Object.values(value),
  ],
  adminUserListCountGet: () => ['adminUserListCountGet'],
  adminWithdrawalListCountGet: () => ['adminWithdrawalListCountGet'],
  adminWithdrawlListGet: (value: AdminWithdrawalListGetRequest) => [
    'adminWithdrawlListGet',
    ...Object.values(value),
  ],
  adminSearchWithdrawalListCountGet: (
    value: AdminSearchWithdrawalListCountGetRequest,
  ) => ['adminSearchWithdrawalListCountGet', ...Object.values(value)],
  adminSearchWithdrawalListGet: (
    value: AdminSearchWithdrawalListGetRequest,
  ) => ['adminSearchWithdrawalListGet', ...Object.values(value)],
  adminUserSearchGet: (value: AdminUserSearchGetRequest) => [
    'adminUserSearchGet',
    ...Object.values(value),
  ],
  adminUserSearchCountGet: (value: AdminUserSearchCountGetRequest) => [
    'adminUserSearchCountGet',
    ...Object.values(value),
  ],
  adminViApplyGet: (value: AdminViApplyGetRequest) => [
    'adminViApplyGet',
    ...Object.values(value),
  ],
  adminGuideApplyGet: (value: AdminGuideApplyGetRequest) => [
    'adminGuideApplyGet',
    ...Object.values(value),
  ],
  adminApproveUserPost: (value: AdminApproveUserPostRequest) => [
    'adminApproveUserPost',
    ...Object.values(value),
  ],
  adminEventListGet: (value: AdminEventListGetRequest) => [
    'adminEventListGet',
    ...Object.values(value),
  ],
  adminEventListCountGet: () => ['adminEventListCountGet'],
  adminSearchEventGet: (value: AdminSearchEventGetRequest) => [
    'adminSearchEventGet',
    ...Object.values(value),
  ],
  adminSearchEventCountGet: (value: AdminSearchEventCountGetRequest) => [
    'adminSearchEventCountGet',
    ...Object.values(value),
  ],
  adminEventHistoryGet: (value: AdminEventHistoryGetRequest) => [
    'adminEventHistoryGet',
    ...Object.values(value),
  ],
  adminEventHistoryCountGet: (value: AdminEventHistoryCountGetRequest) => [
    'adminEventHistoryCountGet',
    ...Object.values(value),
  ],
  adminEventTotalCountGet: (value: AdminEventTotalCountGetRequest) => [
    'adminEventTotalCountGet',
    ...Object.values(value),
  ],
  adminNewUserGet: (value: AdminNewUserGetRequest) => [
    'adminNewUserGet',
    ...Object.values(value),
  ],
  adminCurrentEventGet: (value: AdminCurrentEventGetRequest) => [
    'adminCurrentEventGet',
    ...Object.values(value),
  ],
  adminEventTypeCountGet: (value: AdminEventTypeCountGetRequest) => [
    'adminEventTypeCountGet',
    ...Object.values(value),
  ],
  adminSearchEventHistoryCountGet: (
    value: AdminSearchEventHistoryCountGetRequest,
  ) => ['adminSearchEventHistoryCountGet', ...Object.values(value)],
  adminSearchEventHistoryGet: (value: AdminSearchEventHistoryGetRequest) => [
    'adminSearchEventHistoryGet',
    ...Object.values(value),
  ],
  adminPartnerTypeCountGet: (value: AdminPartnerTypeCountGetRequest) => [
    'adminPartnerTypeCountGet',
    ...Object.values(value),
  ],
  adminPartnerHistoryCountGet: (value: AdminPartnerHistoryCountGetRequest) => [
    'adminPartnerHistoryCountGet',
    ...Object.values(value),
  ],
  adminPartnerHistoryGet: (value: AdminPartnerHistoryGetRequest) => [
    'adminPartnerHistoryGet',
    ...Object.values(value),
  ],
  adminSearchPartnerHistoryCountGet: (
    value: AdminSearchPartnerHistoryCountGetRequest,
  ) => ['adminSearchPartnerHistoryCountGet', ...Object.values(value)],
  adminSearchPartnerHistoryGet: (
    value: AdminSearchPartnerHistoryGetRequest,
  ) => ['adminSearchPartnerHistoryGet', ...Object.values(value)],
  adminApprovalEventPostRequest: (value: AdminApprovalEventPostRequest) => [
    'adminApprovalEventPostRequest',
    ...Object.values(value),
  ],
  adminEventResultGet: (value: AdminEventResultGetRequest) => [
    'adminEventResultGet',
    ...Object.values(value),
  ],
  adminApplyListGet: (value: AdminApplyListGetRequest) => [
    'adminApplyListGet',
    ...Object.values(value),
  ],
  adminApplyListCountGet: (value: AdminApplyListCountGetRequest) => [
    'adminApplyListCountGet',
    ...Object.values(value),
  ],
};
