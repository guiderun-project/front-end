import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, Stack, TextField } from '@mui/material';

import UserEventCount from './UserEventCount';
import UserEventList from './UserEventList';
import UserEventSearchList from './UserEventSearchList';

import useDebounce from '@/hooks/useDebounce';
import { UserType } from '@/types/user';

interface UserEventTabpanelProps {
  userId: UserType['userId'];
}

const UserEventTabPanel: React.FC<UserEventTabpanelProps> = ({ userId }) => {
  const [search, setSearch] = React.useState('');

  const debounce = useDebounce();

  const handleSearchChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearch(e.target.value);
    },
    200,
  );

  return (
    <Stack
      component="div"
      role="tabpanel"
      id="Tabpanel-event"
      gap="1.25rem"
      aria-labelledby="Tab-event"
    >
      <Stack alignItems="center">
        <TextField
          fullWidth
          placeholder="이벤트 검색"
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: '18.4375rem',
          }}
        />
      </Stack>
      {search.length > 0 ? (
        <UserEventSearchList search={search} userId={userId} />
      ) : (
        <>
          <UserEventCount userId={userId} />
          <UserEventList userId={userId} />
        </>
      )}
    </Stack>
  );
};

export default UserEventTabPanel;
