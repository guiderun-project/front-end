import React from 'react';

import styled from '@emotion/styled';
import LanguageIcon from '@mui/icons-material/Language';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { Locale } from '@/types/locale';

interface PagelayoutProps {
  children?: React.ReactNode;
}

//
//
//

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: lightgray;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const StyledContentContainer = styled.div`
  position: relative;
  max-width: 48rem;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  padding: 0 1.875rem;
  background-color: #fff;
`;

const StyledLocaleBox = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 1.875rem;
  z-index: 1111;
`;

//
//
//

const PageLayout: React.FC<PagelayoutProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const queryClient = useQueryClient();

  const open = Boolean(anchorEl);
  const locale = queryClient.getQueryData(['locale']);

  /**
   *
   */
  const handleLocaleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  /**
   *
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   *
   */
  const handleLocaleChange = (selectedLocale: Locale) => () => {
    if (locale !== selectedLocale) {
      queryClient.setQueryData(['locale'], selectedLocale);
    }
    handleClose();
  };

  //
  //
  //
  return (
    <StyledContainer>
      <StyledContentContainer>
        <StyledLocaleBox>
          <IconButton onClick={handleLocaleOpen}>
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem
              selected={locale === Locale.Ko}
              onClick={handleLocaleChange(Locale.Ko)}
            >
              한국어
            </MenuItem>
            <MenuItem
              selected={locale === Locale.En}
              onClick={handleLocaleChange(Locale.En)}
            >
              English
            </MenuItem>
          </Menu>
        </StyledLocaleBox>
        {children}
      </StyledContentContainer>
    </StyledContainer>
  );
};

export default PageLayout;
