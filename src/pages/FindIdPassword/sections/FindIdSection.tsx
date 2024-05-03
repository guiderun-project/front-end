import React from 'react';

import { Stack } from '@mui/material';

const FindIdSection = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <Stack id="tabpanel-find-id" role="tabpanel" aria-labelledby="tab-find-id">
      아이디 찾기
    </Stack>
  );
};

export default FindIdSection;
