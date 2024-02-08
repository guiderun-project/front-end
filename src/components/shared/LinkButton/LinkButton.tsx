import styled from '@emotion/styled';
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
}

//
//
//

const StyledLinkBox = styled(Link)`
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

//
//
//

const LinkButton: React.FC<LinkButtonProps> = ({ icon, title, to }) => {
  return (
    <StyledLinkBox to={to} aria-label={title}>
      <Box display="flex" gap="0.625rem" alignItems="center" aria-hidden>
        <Box component="img" src={icon} alt="" width="1.5rem" />
        <Typography fontWeight={700}>{title}</Typography>
      </Box>
      <span
        aria-hidden
        style={{
          fontWeight: 700,
          fontSize: '1.125rem',
        }}
      >
        &gt;
      </span>
    </StyledLinkBox>
  );
};

export default LinkButton;
