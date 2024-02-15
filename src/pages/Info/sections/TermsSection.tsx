import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { Stack, Typography } from '@mui/material';

import { permissionGetResponse } from '@/apis/types/info';
import TermsDetail from '../components/TermsDetail';

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

//
//
//

const TermsSection = () => {
  /**
   *
   */
  const renderData = () => {
    return <TermsDetail data={TERMS_DATA} />;
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
      <Box display="flex" justifyContent="flex-end">
        <Button
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
    </Stack>
  );
};

export default TermsSection;
