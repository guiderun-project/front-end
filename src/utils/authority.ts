import { RoleEnum } from '@/types/group';

const getAuthority = {
  isUser: (role: RoleEnum) =>
    role !== RoleEnum.Wait && role !== RoleEnum.New && role !== RoleEnum.Reject,
  isEditor: (role: RoleEnum) =>
    role === RoleEnum.Admin || role === RoleEnum.Coach,
};

export default getAuthority;
