import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, Stack, TextField } from '@mui/material';

import PartnerCount from './PartnerCount';
import PartnerList from './PartnerList';
import PartnerSearch from './PartnerSearch';

import useDebounce from '@/hooks/useDebounce';
import { UserType } from '@/types/user';

interface UserPartnerTabPanelProps {
  userId: UserType['userId'];
}

const UserPartnerTabPanel: React.FC<UserPartnerTabPanelProps> = ({
  userId,
}) => {
  const [search, setSearch] = React.useState('');

  const debounce = useDebounce();

  /**
   *
   */
  const handleSearchChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearch(e.target.value);
    },
    300,
  );
  //
  //
  //

  return (
    <Stack
      role="tabpanel"
      id="Tabpanel-partner"
      gap="1.25rem"
      aria-labelledby="Tab-partner"
      alignItems="center"
    >
      <TextField
        fullWidth
        placeholder="파트너 검색"
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
      {search.length ? (
        <PartnerSearch userId={userId} search={search} />
      ) : (
        <>
          <PartnerCount userId={userId} />
          <PartnerList userId={userId} />
        </>
      )}
    </Stack>
  );
};

export default UserPartnerTabPanel;
