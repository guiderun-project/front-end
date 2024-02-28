import styled from '@emotion/styled';
import { CircularProgress, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.725rem;
`;

const Loading: React.FC = () => {
  return (
    <StyledContainer>
      <Helmet>
        <title>Loading - Guide run Project</title>
      </Helmet>
      <CircularProgress size="3rem" />
      <Typography
        role="alert"
        fontSize="1.25rem"
        fontWeight={700}
        whiteSpace="wrap"
        textAlign="center"
      >
        로딩중입니다.
        <br />
        잠시만 기다려주세요
      </Typography>
    </StyledContainer>
  );
};

export default Loading;
