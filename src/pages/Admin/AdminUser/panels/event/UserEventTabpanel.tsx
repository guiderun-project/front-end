import { Stack } from '@mui/material';

import UserEventCount from './UserEventCount';
import UserEventList from './UserEventList';

interface UserEventTabpanelProps {
  userId: string;
}

const UserEventTabPanel: React.FC<UserEventTabpanelProps> = ({ userId }) => {
  return (
    <Stack
      component="div"
      role="tabpanel"
      id="Tabpanel-event"
      gap="1.25rem"
      aria-labelledby="Tab-event"
    >
      <UserEventCount userId={userId} />
      <UserEventList userId={userId} />
    </Stack>
  );
};

export default UserEventTabPanel;
