import { RoleEnum } from '@/types/group';

const getAuthority = {
  isWait: (role: RoleEnum) =>
    role === RoleEnum.Wait || role === RoleEnum.Reject,
  isSignup: (role: RoleEnum) =>
    role !== RoleEnum.New && role !== RoleEnum.Withdrawal,
  isUser: (role: RoleEnum) =>
    role === RoleEnum.Admin ||
    role === RoleEnum.Coach ||
    role === RoleEnum.User,
  isEditor: (role: RoleEnum) =>
    role === RoleEnum.Admin || role === RoleEnum.Coach,
  isAdmin: (role: RoleEnum) => role === RoleEnum.Admin,
};

export default getAuthority;
