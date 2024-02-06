import React from 'react';

import { Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { NavBar, PageLayout } from '@/components/shared';

const MainRoot: React.FC = () => {
  return (
    <PageLayout>
      <Typography>메인 루트</Typography>
      <Outlet />
      <NavBar />
    </PageLayout>
  );
};

export default MainRoot;
