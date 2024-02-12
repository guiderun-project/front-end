import React from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { NavBar, PageLayout } from '@/components/shared';

//
//
//

const TITLE_DATA = {
  name: '조재석',
  eventItems: [
    {
      name: '동아 마라톤',
      dDay: 20,
    },
    {
      name: 'KOREA 50K',
      dDay: 40,
    },
  ],
} as const;

//
//
//

const MainRoot: React.FC = () => {
  return (
    <PageLayout>
      {/* 인삿말 */}
      <Stack padding="5rem 0" gap="3.75rem">
        <Box
          component="header"
          display="flex"
          flexDirection="column"
          gap="0.75rem"
        >
          <Typography component="h1" fontSize="1.5rem" fontWeight={400}>
            <Typography component="span" fontSize="2rem" fontWeight={600}>
              {TITLE_DATA.name}
            </Typography>
            님 안녕하세요!
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            gap="0.25rem"
            borderLeft="2px solid #AAA"
            paddingLeft="0.75rem"
          >
            {TITLE_DATA.eventItems.map((item) => (
              <Typography
                key={`${item.name}-dDay`}
                component="data"
                color="#666"
                fontSize="0.875rem"
                fontWeight={600}
              >
                {item.name}까지 D
                <Typography
                  component="span"
                  fontSize="0.875rem"
                  fontWeight={700}
                  color="#3586FF"
                >
                  -{item.dDay}
                </Typography>
              </Typography>
            ))}
          </Box>
        </Box>
        <Outlet />
      </Stack>
      {/* NavBar/ */}
      <NavBar />
    </PageLayout>
  );
};

export default MainRoot;
