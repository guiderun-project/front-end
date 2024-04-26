import styled from '@emotion/styled';
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { DisabilityChip } from '../DisabilityChip';
import GropuChip from '../GroupChip/GroupChip';

import { PartnerDataType } from '@/apis/types/info';
import { BROWSER_PATH } from '@/constants/path';

//
//
//

interface UserBoxProps {
  partnerData: PartnerDataType;
}

//
//
//

const StyledContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #000;
  background-color: #fff;
`;

const StyledImgBox = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 100rem;
  background-color: #d9d9d9;
`;

const StyledCountText = styled.span`
  color: #de1313;
`;

//
//
//

const UserBox: React.FC<UserBoxProps> = ({
  partnerData: { type, name, recordDegree, contestCnt, trainingCnt },
}) => {
  //TODO 다른 회원정보 조회 페이지 구현 및 링크 연결
  return (
    <StyledContainer to={BROWSER_PATH.MAIN}>
      <StyledImgBox></StyledImgBox>
      <Stack gap="0.25rem" alignItems="center">
        <DisabilityChip component="chip" type={type} />
        <Typography fontWeight={500}>
          {name} <GropuChip group={recordDegree} type="text" />
        </Typography>
        <Typography fontSize="0.75rem">
          훈련 <StyledCountText>{trainingCnt}</StyledCountText>회/대회{' '}
          <StyledCountText>{contestCnt}</StyledCountText>회
        </Typography>
      </Stack>
    </StyledContainer>
  );
};

export default UserBox;
