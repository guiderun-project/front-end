import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Badge, Box, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { personalInfoGetResponse } from '@/apis/types/info';
import { DisabilityChip, GenderChip } from '@/components/shared';
//
//
//

interface InfoDetailProps {
  data: personalInfoGetResponse;
}

//
//
//

export const StyledSection = styled.section<{ multiLine?: boolean }>`
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

const InfoDetail: React.FC<InfoDetailProps> = ({ data }) => {
  /**
   *
   */
  const getAge = () => {
    const age = data.age;

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
    <Stack component="div" gap="2rem">
      <Helmet>
        <title>개인 인적사항 조회 - Guide run Project</title>
      </Helmet>
      {/* 장애여부 */}
      <StyledSection>
        <Typography component="h3" fontWeight={700}>
          <Badge color="error" variant="dot">
            장애여부
          </Badge>
        </Typography>
        <DisabilityChip component="chip" type={data.type} />
      </StyledSection>
      {/* 성별 */}
      <StyledSection>
        <Typography component="h3" fontWeight={700}>
          <Badge color="error" variant="dot">
            성별
          </Badge>
        </Typography>
        <GenderChip type={data.gender} />
      </StyledSection>
      {/* 이름 */}
      <StyledSection>
        <Typography component="h3" fontWeight={700}>
          <Badge color="error" variant="dot">
            이름
          </Badge>
        </Typography>
        <Typography>{data.name}</Typography>
      </StyledSection>
      {/* 전화번호 */}
      <StyledSection>
        <Typography component="h3" fontWeight={700}>
          <Badge color="error" variant="dot">
            전화번호
          </Badge>
        </Typography>
        <Box display="flex" gap="0.5rem" alignItems="center">
          <Typography>{data.phoneNumber}</Typography>
          <Typography fontWeight={700} color="#8F8F8F" fontSize="0.75rem">
            {data.isOpenNumber && '비공개'}
          </Typography>
        </Box>
      </StyledSection>
      {/* 나이 */}
      <StyledSection>
        <Typography component="h3" fontWeight={700}>
          <Badge color="error" variant="dot">
            나이
          </Badge>
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
            {data.isOpenSns && '비공개'}
          </Typography>
        </Box>
        <a
          href={`https://instagram.com/${data.snsId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            color: '#333',
          }}
        >
          <Typography fontWeight={500}>{data.snsId}</Typography>
        </a>
      </StyledSection>
    </Stack>
  );
};

export default InfoDetail;
