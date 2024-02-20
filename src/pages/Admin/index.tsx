import React from 'react';

import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { Outlet } from 'react-router-dom';

import { BROWSER_PATH } from '@/constants/path';

//
//
//

const StyledAdminContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
`;

const StyledSideMenuContainer = styled.div`
  box-sizing: border-box;
  width: 15rem;
  min-height: 100vh;
  padding: 2.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #f8f9ff;
`;

//
//
//

const NAME_DATA = {
  name: '홍길동',
};

//
//
//

const Admin: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);

  //
  //
  //
  return (
    <StyledAdminContainer>
      <IconButton
        onClick={() => setIsDrawerOpen(true)}
        aria-label="사이드 메뉴 버튼"
        sx={{
          position: 'absolute',
          top: '2.5rem',
          left: '1.875rem',
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={isDrawerOpen}
        anchor="left"
        onClose={() => setIsDrawerOpen(false)}
      >
        <StyledSideMenuContainer>
          <Typography
            color="#42474E"
            fontSize="1.125rem"
            fontWeight={700}
            lineHeight="1.6125rem"
          >
            {NAME_DATA.name} 관리자님 <br /> 안녕하세요!
          </Typography>
          <Stack gap="1.5rem">
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href={BROWSER_PATH.ADMIN.USER}
                  sx={{
                    padding: '1.125rem 1rem',
                    borderRadius: '100rem',
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{ fontWeight: 700 }}
                    primary="회원 관리"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href={BROWSER_PATH.ADMIN.EVENT}
                  sx={{
                    padding: '1.125rem 1rem',
                    borderRadius: '100rem',
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{ fontWeight: 700 }}
                    primary="이벤트 관리"
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Stack>
        </StyledSideMenuContainer>
      </Drawer>
      <Stack padding="2.5rem">
        <Outlet />
      </Stack>
    </StyledAdminContainer>
  );
};

export default Admin;
