import { Stack, Container } from '@mui/material';

interface PagelayoutProps {
  children?: React.ReactNode;
}

//
//
//

const PageLayout: React.FC<PagelayoutProps> = ({ children }) => {
  return (
    <Container
      component="div"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        width: '100%',
        height: '100%',
        minWidth: '100vw',
        minHeight: '100vh',
      }}
    >
      <Stack
        position="relative"
        width="100%"
        maxWidth="48rem"
        minHeight="100vh"
        height="100%"
        padding="0 1.875rem"
        sx={{
          backgroundColor: '#FFF',
        }}
      >
        {children}
      </Stack>
    </Container>
  );
};

export default PageLayout;
