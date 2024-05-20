import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, Stack, TextField } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const EventSearch: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>이벤트 검색 - Guide run Project</title>
      </Helmet>
      <Stack gap="2.5rem">
        <TextField
          autoFocus
          autoComplete="off"
          placeholder="찾고 있는 이벤트를 입력해주세요"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </>
  );
};

export default EventSearch;
