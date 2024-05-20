import useDebounce from '@/hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, Stack, TextField } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

const EventSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const debounce = useDebounce();

  const handleSearchValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchParams({ search: e.target.value });
  };

  const handleDebounceSearchValueChange = debounce(
    handleSearchValueChange,
    500,
  );
  //
  //
  //

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
          onChange={handleDebounceSearchValueChange}
        />
      </Stack>
    </>
  );
};

export default EventSearch;
