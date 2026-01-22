import { Box, Typography } from '@mui/material';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <>
      <Box
        component="header"
        display="flex"
        justifyContent="center"
        padding="1.875rem"
        position="absolute"
        top="0"
        right="0"
        left="0"
      >
        <Typography component="h1">{children}</Typography>
      </Box>
      <Box width="100%" height={84} />
    </>
  );
};

export default Header;
