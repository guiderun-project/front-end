import { Stack, Paper } from '@mui/material';

interface PagelayoutProps {
  children?: React.ReactNode;
}

//
//
//

const PageLayout: React.FC<PagelayoutProps> = ({ children }) => {
  return (
    <Stack
      alignItems="center"
      sx={{
        backgroundColor: 'lightgray',
        width: '100%',
        height: '100%',
        minWidth: '100vw',
        minHeight: '100vh',
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: '23.5rem',
          minHeight: '100vh',
          height: '100%',
        }}
      >
        {children}
      </Paper>
    </Stack>
  );
};

export default PageLayout;
