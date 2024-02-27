import {
  Button,
  Box,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import TermsDetail from '../components/TermsDetail';
import TermsEdit from '../components/TermsEdit';

import { permissionGetResponse } from '@/apis/types/info';
import { NotFound } from '@/components/shared';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import infoApi from '@/apis/requests/info';

//
//
//

export const TERMS_DATA: permissionGetResponse = {
  privacy: true,
  portraitRights: false,
};

//
//
//

const TermsSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = useSelector((state: RootState) => state.user.userId);
  const { data: permissionData, isLoading } = useQuery({
    queryKey: ['permissionGet', userId],
    queryFn: () => infoApi.permissionGet({ userId }),
  });

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
    if (permissionData) {
      switch (mode) {
        case 'detail':
          return <TermsDetail data={permissionData} />;
        case 'edit':
          return <TermsEdit defaultValues={permissionData} />;
        default:
          return <NotFound />;
      }
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
      {isLoading ? (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress size="2rem" />
        </Stack>
      ) : (
        <>
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
                  fontSize="0.875rem"
                  sx={{
                    textDecoration: 'underline',
                    textUnderlinePosition: 'under',
                  }}
                >
                  동의 내용 변경하기
                </Typography>
                <span aria-hidden>&gt;</span>
              </Button>
            </Box>
          )}
        </>
      )}
      <Stack></Stack>
    </Stack>
  );
};

export default TermsSection;
