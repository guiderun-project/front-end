import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import InfoDetail from '../components/InfoDetail';
import InfoEdit from '../components/InfoEdit';

import infoApi from '@/apis/requests/info';
import { NotFound } from '@/components/shared';
import { RootState } from '@/store/index';

const InfoSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = useSelector((state: RootState) => state.user.userId);
  const { data: infoData, isLoading } = useQuery({
    queryKey: ['personalInfoGet', userId],
    queryFn: () => infoApi.personalInfoGet({ userId }),
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
    if (infoData) {
      switch (mode) {
        case 'detail':
          return <InfoDetail data={infoData} />;
        case 'edit':
          return <InfoEdit defaultValues={infoData} />;
        default:
          return <NotFound />;
      }
    }
  };

  //
  //
  //
  return (
    <Stack
      component="div"
      role="tabpanel"
      id="Tabpanel-info"
      gap="2.5rem"
      aria-labelledby="Tab-info"
    >
      <Typography component="h2" fontSize="1.5rem" fontWeight={700}>
        개인 인적사항
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
                sx={{
                  display: 'flex',
                  gap: '0.125rem',
                }}
                onClick={handleEditClick}
              >
                <Typography
                  fontSize="0.875rem"
                  sx={{
                    textDecoration: 'underline',
                    textUnderlinePosition: 'under',
                  }}
                >
                  인적사항 수정하기
                </Typography>
                <span aria-hidden>&gt;</span>
              </Button>
            </Box>
          )}
        </>
      )}
    </Stack>
  );
};

export default InfoSection;
