import { Button, Box, Stack, Typography } from '@mui/material';

import TermsDetail from '../components/TermsDetail';

import { permissionGetResponse } from '@/apis/types/info';
import { useSearchParams } from 'react-router-dom';
import TermsEdit from '../components/TermsEdit';
import { NotFound } from '@/components/shared';

//
//
//

const TERMS_DATA: permissionGetResponse = {
  privacy: true,
  portraitRights: false,
};

//
//
//

const TermsSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get('mode') ?? 'detail';

  /**
   *
   */
  const handleEditClick = () => {
    searchParams.set('mode', 'edit');
    setSearchParams(searchParams.toString());
  };

  /**
   *
   */
  const renderData = () => {
    switch (mode) {
      case 'detail':
        return <TermsDetail data={TERMS_DATA} />;
      case 'edit':
        return <TermsEdit defaultValues={TERMS_DATA} />;
      default:
        return <NotFound />;
    }
  };

  return (
    <Stack
      component="div"
      role="tabpanel"
      id="Tabpanel-terms"
      gap="2.5rem"
      aria-labelledby="Tab-terms"
    >
      <Typography component="h2" fontSize="1.5rem" fontWeight={700}>
        약관 동의
      </Typography>
      {renderData()}
      {mode === 'detail' && (
        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={handleEditClick}
            sx={{
              display: 'flex',
              gap: '0.125rem',
            }}
          >
            <Typography
              sx={{
                textDecoration: 'underline',
              }}
            >
              동의 내용 변경하기
            </Typography>
            <span aria-hidden>&gt;</span>
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default TermsSection;
