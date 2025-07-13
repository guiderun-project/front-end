import styled from '@emotion/styled';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface TitleHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({
  title,
  showBackButton = false,
}) => {
  const navigate = useNavigate();

  return (
    <StyledTitleContainer>
      {showBackButton && (
        <IconButton
          aria-label="뒤로가기"
          onClick={() => navigate(-1)}
          sx={{
            position: 'absolute',
            left: '1rem',
            top: 'calc(50% + 1rem)',
            transform: 'translateY(-50%)',
          }}
        >
          <ArrowBackIosIcon fontSize="medium" />
        </IconButton>
      )}
      <Typography component="h1" fontSize="0.75rem" fontWeight={500}>
        {title}
      </Typography>
    </StyledTitleContainer>
  );
};

export default TitleHeader;

const StyledTitleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding-top: 1.875rem;
  display: flex;
  justify-content: center;
`;
