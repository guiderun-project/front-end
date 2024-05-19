import { Stack, Typography } from '@mui/material';

import React from 'react';

const AllEvent: React.FC = () => {
  return (
    <Stack gap="2.5rem">
      <Typography component="h1" fontSize="1.5rem" fontWeight={700}>
        전체 이벤트
      </Typography>
    </Stack>
  );
};

export default AllEvent;
