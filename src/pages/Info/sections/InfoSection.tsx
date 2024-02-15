import { Box, Button, Stack, Typography } from '@mui/material';

import InfoDetail from '../components/InfoDetail';

import { personalInfoGetResponse } from '@/apis/types/info';
import { DisabilityEnum, GenderEnum, RoleEnum } from '@/types/group';

//
//
//

const INFO_DATA: personalInfoGetResponse = {
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
  /**
   *
   */
  const renderData = () => {
    return <InfoDetail data={INFO_DATA} />;
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
            인적사항 수정하기
          </Typography>
          <span aria-hidden>&gt;</span>
        </Button>
      </Box>
    </Stack>
  );
};

export default InfoSection;
