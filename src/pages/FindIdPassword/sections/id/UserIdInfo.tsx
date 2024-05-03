import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';

const StyledIdInfoBox = styled.section`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1.5rem 2.5rem;
  border: 1px solid #aaa;
  border-radius: 8px;
`;

const UserIdInfo: React.FC = () => {
  return (
    <Stack gap="1.5rem">
      <Typography autoFocus component="h2" fontWeight={700} textAlign="center">
        휴대전화정보와 일치하는 아이디입니다.
      </Typography>
      <StyledIdInfoBox>
        <Typography>아이디: whwotjr98</Typography>
        <Typography>가입일: 2024.1.1</Typography>
      </StyledIdInfoBox>
    </Stack>
  );
};

export default UserIdInfo;
