import styled from '@emotion/styled';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

//
//
//

interface LinkButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  title: string;
  to: string;
  type?: 'line' | 'block';
}

//
//
//

const StyledLinkLine = styled(Link)`
  text-decoration: none;
  color: #000;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0px 1px 4px 0px #0000001a;
`;

const StyledLinkBlock = styled(Link)`
  width: 8.75rem;
  height: 7.125rem;
  text-decoration: none;
  color: #000;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  box-shadow: 0px 1px 4px 0px #0000001a;
  gap: 1rem;
`;

//
//
//

const LinkButton: React.FC<LinkButtonProps> = ({
  type = 'line',
  icon,
  title,
  to,
}) => {
  if (type === 'line') {
    return (
      <StyledLinkLine to={to} aria-label={title}>
        <Box display="flex" gap="0.625rem" alignItems="center" aria-hidden>
          <Box component="img" src={icon} alt="" width="1.5rem" />
          <Typography fontWeight={700}>{title}</Typography>
        </Box>
        <ChevronRightIcon aria-hidden />
      </StyledLinkLine>
    );
  }

  return (
    <StyledLinkBlock to={to} aria-label={title}>
      <Box component="img" src={icon} alt="" width="1.5rem" />
      <Typography fontWeight={700} fontSize="1.0625rem">
        {title}
      </Typography>
    </StyledLinkBlock>
  );
};

export default LinkButton;
