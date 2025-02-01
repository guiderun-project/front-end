import React from 'react';

import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import eventApi from '@/apis/requests/event';
import { NavBar } from '@/components/shared';
import { RootState } from '@/store/index';

const MainRoot: React.FC = () => {
  const userName = useSelector((state: RootState) => state.user.name);

  const { data, isLoading } = useQuery({
    queryKey: ['upcomingEventDdayGet'],
    queryFn: () => eventApi.upcomingEventDdayGet(),
    throwOnError: false,
  });
  return (
    <>
      {/* 인삿말 */}
      <Stack padding="5rem 0" gap="3.75rem">
        <Box
          component="header"
          display="flex"
          flexDirection="column"
          gap="0.75rem"
        >
          <h1>
            <Typography component="span" fontSize="2rem" fontWeight={600}>
              {userName}
            </Typography>
            <Typography component="span" fontSize="1.5rem" fontWeight={400}>
              님 안녕하세요!
            </Typography>
          </h1>

          <Box
            display="flex"
            flexDirection="column"
            gap="0.25rem"
            borderLeft="2px solid #AAA"
            paddingLeft="0.75rem"
          >
            {isLoading ? (
              <CircularProgress size={12} />
            ) : (
              data?.map((item) => (
                <Typography
                  key={`${item.name}-dDay`}
                  role="text"
                  component="p"
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
              ))
            )}
          </Box>
        </Box>
        <Outlet />
      </Stack>
      {/* NavBar/ */}
      <NavBar />
    </>
  );
};

export default MainRoot;
