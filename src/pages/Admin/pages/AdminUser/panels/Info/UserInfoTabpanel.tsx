import { Stack } from '@mui/material';

import UserInfoCard from './UserInfoCard';
import UserSpecCard from './UserSpecCard';
import UserTermsCard from './UserTermsCard';

import { DisabilityEnum } from '@/types/group';
import { UserType } from '@/types/user';

interface UserInfoTabpanelProps {
  userId: UserType['userId']
  type: DisabilityEnum;
}

const UserInfoTabpanel: React.FC<UserInfoTabpanelProps> = ({
  userId,
  type,
}) => {
  //TODO: 신청서 API로 변경
  return (
    <Stack
      component="div"
      role="tabpanel"
      id="Tabpanel-info"
      gap="2.5rem"
      aria-labelledby="Tab-info"
      alignItems="center"
      sx={{
        '.MuiCard-root': {
          width: '100%',
          maxWidth: '22rem',
        },
        '.MuiCardContent-root': {
          padding: '0 1rem',
          paddingTop: '1.5rem',
        },
        '.MuiPaper-root': {
          maxHeight: '4000vh',
          padding: '2.5rem 1.5rem',
          boxShadow: '0px 1px 4px 0px #0000001A',
        },
        '.MuiCardHeader-root': {
          padding: 0,
        },
      }}
    >
      <UserInfoCard userId={userId} />
      <UserSpecCard type={type} userId={userId} />
      <UserTermsCard userId={userId} />
    </Stack>
  );
};

export default UserInfoTabpanel;
