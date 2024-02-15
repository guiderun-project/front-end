import { Box, Button, Typography, Stack } from '@mui/material';

const SpecSection = () => {
  return (
    <Stack
      component="div"
      role="tabpanel"
      id="Tabpanel-spec"
      gap="2.5rem"
      aria-labelledby="Tab-spec"
    >
      <Typography component="h2" fontSize="1.5rem" fontWeight={700}>
        러닝 스펙
      </Typography>
      <Stack></Stack>
      <Box display="flex" justifyContent="flex-end">
        <Button
          sx={{
            display: 'flex',
            gap: '0.125rem',
          }}
        >
          <Typography
            sx={{
              textDecoration: 'underline',
            }}
          >
            러닝 스펙 수정하기
          </Typography>
          <span aria-hidden>&gt;</span>
        </Button>
      </Box>
    </Stack>
  );
};

export default SpecSection;
