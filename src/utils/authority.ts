import { RoleEnum } from '@/types/group';

const getAuthority = {
  isUser: (role: RoleEnum) =>
    role !== RoleEnum.Wait && role !== RoleEnum.New && role !== RoleEnum.Reject,
  isEditor: (role: RoleEnum) =>
    role === RoleEnum.Admin || role === RoleEnum.Coach,
  isAdmin: (role: RoleEnum) => role === RoleEnum.Admin,
};

export default getAuthority;
