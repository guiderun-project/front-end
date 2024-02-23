import { Stack } from '@mui/material';

import UserEventCount from './UserEventCount';
import UserEventList from './UserEventList';

interface UserEventTabpanelProps {
  userId: string;
  count: { eventCount: number; trainingCount: number };
}

const UserEventTabPanel: React.FC<UserEventTabpanelProps> = ({
  userId,
  count,
}) => {
  return (
    <Stack
      component="div"
      role="tabpanel"
      id="Tabpanel-event"
      gap="1.25rem"
      aria-labelledby="Tab-event"
    >
      <UserEventCount count={count} />
      <UserEventList userId={userId} />
    </Stack>
  );
};

export default UserEventTabPanel;
