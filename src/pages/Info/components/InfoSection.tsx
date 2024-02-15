import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Box, Button, Stack, Typography } from '@mui/material';

import { personalInfoGetResponse } from '@/apis/types/info';
import { DisabilityChip, GenderChip } from '@/components/shared';
import { DisabilityEnum, GenderEnum, RoleEnum } from '@/types/group';

//
//
//

const StyledSection = styled.section<{ multiLine?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 0.5rem;
  align-items: center;
  justify-items: flex-start;

  ${({ multiLine }) =>
    multiLine &&
    css`
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      align-items: flex-start;
      justify-items: center;
    `}
`;

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
  const getAge = () => {
    const age = INFO_DATA.age;

    if (age <= 19) {
      return '10대 이하';
    }
    if (age <= 59) {
      return `${age}대`;
    }
    return '60대 이상';
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
      <Stack component="div" gap="2rem">
        {/* 장애여부 */}
        <StyledSection>
          <Typography component="h3" fontWeight={700}>
            장애여부
          </Typography>
          <DisabilityChip component="chip" type={INFO_DATA.type} />
        </StyledSection>
        {/* 성별 */}
        <StyledSection>
          <Typography component="h3" fontWeight={700}>
            성별
          </Typography>
          <GenderChip type={INFO_DATA.gender} />
        </StyledSection>
        {/* 이름 */}
        <StyledSection>
          <Typography component="h3" fontWeight={700}>
            이름
          </Typography>
          <Typography>{INFO_DATA.name}</Typography>
        </StyledSection>
        {/* 전화번호 */}
        <StyledSection>
          <Typography component="h3" fontWeight={700}>
            전화번호
          </Typography>
          <Box display="flex" gap="0.5rem" alignItems="center">
            <Typography>{INFO_DATA.phoneNumber}</Typography>
            <Typography fontWeight={700} color="#8F8F8F" fontSize="0.75rem">
              {!INFO_DATA.isOpenNumber && '비공개'}
            </Typography>
          </Box>
        </StyledSection>
        {/* 나이 */}
        <StyledSection>
          <Typography component="h3" fontWeight={700}>
            나이
          </Typography>
          <Typography>{getAge()}</Typography>
        </StyledSection>
        {/* 인스타 계정 */}
        <StyledSection multiLine>
          <Box display="flex" alignItems="center" gap="0.5rem">
            <Typography component="h3" fontWeight={700}>
              SNS(인스타그램) 아이디
            </Typography>
            <Typography fontWeight={700} color="#8F8F8F" fontSize="0.75rem">
              {!INFO_DATA.isOpenSns && '비공개'}
            </Typography>
          </Box>
          <a
            href={`https://instagram.com/${INFO_DATA.snsId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: '#333',
            }}
          >
            <Typography fontWeight={500}>{INFO_DATA.snsId}</Typography>
          </a>
        </StyledSection>
      </Stack>
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
