import styled from '@emotion/styled';
import { Typography } from '@mui/material';

//
//
//

const StyledTitleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-top: 1.875rem;
  display: flex;
  justify-content: center;
`;

//
//
//

interface TitleHeaderProps {
  title: string;
}

//
//
//

const TitleHeader: React.FC<TitleHeaderProps> = ({ title }) => {
  return (
    <StyledTitleContainer>
      <Typography component="h1" fontSize="0.75rem" fontWeight={500}>
        {title}
      </Typography>
    </StyledTitleContainer>
  );
};

export default TitleHeader;
