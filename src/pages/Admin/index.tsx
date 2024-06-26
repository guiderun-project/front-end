import React from 'react';

import styled from '@emotion/styled';
import { ClearOutlined } from '@mui/icons-material';
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
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import { BROWSER_PATH } from '@/constants/path';
import { RootState } from '@/store/index';
import { RoleEnum } from '@/types/group';

//
//
//

const StyledAdminContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
`;

const StyledSideMenuContainer = styled.div`
  position: relative;
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

const Admin: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);

  /**
   *
   */
  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  /**
   *
   */
  const handleOpen = () => {
    setIsDrawerOpen(true);
  };

  //
  //
  //
  return userData.role === RoleEnum.Admin ? (
    <StyledAdminContainer>
      <IconButton
        onClick={handleOpen}
        aria-label="사이드 메뉴 버튼"
        sx={{
          position: 'absolute',
          top: '1rem',
          left: '1.875rem',
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={isDrawerOpen}
        anchor="left"
        onClose={handleClose}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <StyledSideMenuContainer>
          <IconButton
            onClick={handleClose}
            size="large"
            aria-label="닫기"
            sx={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
            }}
          >
            <ClearOutlined fontSize="large" />
          </IconButton>
          <Typography
            color="#42474E"
            fontSize="1.125rem"
            fontWeight={700}
            lineHeight="1.6125rem"
            padding="0.5rem"
            paddingLeft="1rem"
          >
            {userData.name} 관리자님 <br /> 안녕하세요!
          </Typography>
          <Stack gap="1.5rem">
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleClose();
                    navigate(BROWSER_PATH.ADMIN.USER);
                  }}
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
                  onClick={() => {
                    handleClose();
                    navigate(BROWSER_PATH.ADMIN.WITHDRAW);
                  }}
                  sx={{
                    padding: '1.125rem 1rem',
                    borderRadius: '100rem',
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{ fontWeight: 700 }}
                    primary="탈퇴한 회원"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleClose();
                    navigate(BROWSER_PATH.ADMIN.EVENT);
                  }}
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
      <Stack width="100%" alignItems="center">
        <Outlet />
      </Stack>
    </StyledAdminContainer>
  ) : (
    <Navigate to={BROWSER_PATH.MYPAGE} replace />
  );
};

export default Admin;
