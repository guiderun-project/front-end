import { Box, Button, Stack, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import InfoDetail from '../components/InfoDetail';
import InfoEdit from '../components/InfoEdit';

import { personalInfoGetResponse } from '@/apis/types/info';
import { NotFound } from '@/components/shared';
import { DisabilityEnum, GenderEnum, RoleEnum } from '@/types/group';

//
//
//

export const INFO_DATA: personalInfoGetResponse = {
  name: '홍길동',
  type: DisabilityEnum.GUIDE,
  role: RoleEnum.User,
  gender: GenderEnum.M,
  phoneNumber: '01012345678',
  age: 20,
  snsId: 'guide_run_ko',
  isOpenNumber: false,
  isOpenSns: false,
};

//
//
//

const InfoSection = () => {
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
        return <InfoDetail data={INFO_DATA} />;
      case 'edit':
        return <InfoEdit defaultValues={INFO_DATA} />;
      default:
        return <NotFound />;
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
    </Stack>
  );
};

export default InfoSection;
