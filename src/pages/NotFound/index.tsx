import styled from '@emotion/styled';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Typography } from '@mui/material';

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;
`;

const NotFound: React.FC = () => {
  return (
    <StyledContainer>
      <SentimentVeryDissatisfiedIcon
        aria-label="우는 이모티콘"
        sx={{
          fontSize: '3rem',
        }}
      />
      <Typography
        fontSize="1.5rem"
        fontWeight={700}
        whiteSpace="wrap"
        textAlign="center"
      >
        존재하지 않는 주소입니다. <br />
        다른 주소를 입력해주세요
      </Typography>
    </StyledContainer>
  );
};

export default NotFound;
