import { Box, Typography } from '@mui/material';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <Box
      component="header"
      position="absolute"
      top={0}
      left={0}
      right={0}
      display="flex"
      justifyContent="center"
      padding="1.875rem"
    >
      <Typography>{children}</Typography>
    </Box>
  );
};

export default Header;
