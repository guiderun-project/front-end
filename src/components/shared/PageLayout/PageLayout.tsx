import React from 'react';

import styled from '@emotion/styled';
// import LanguageIcon from '@mui/icons-material/Language';
// import { IconButton, Menu, MenuItem } from '@mui/material';
// import { useSelector, useDispatch } from 'react-redux';

// import { RootState } from '@/store/index';
// import { change } from '@/store/reducer/locale';
// import { Locale } from '@/types/locale';

interface PagelayoutProps {
  children?: React.ReactNode;
}

//
//
//

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f8f9ff;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const StyledContentContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  max-width: 48rem;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  padding: 0 1.875rem;
`;

// const StyledLocaleBox = styled.div`
//   position: absolute;
//   top: 2.5rem;
//   right: 1.875rem;
//   z-index: 1111;
// `;

//
//
//

const PageLayout: React.FC<PagelayoutProps> = ({ children }) => {
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // const locale = useSelector((state: RootState) => state.locale.locale);
  // const dispatch = useDispatch();

  // const open = Boolean(anchorEl);

  // /**
  //  *
  //  */
  // const handleLocaleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(e.currentTarget);
  // };

  // /**
  //  *
  //  */
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  /**
   *
   */
  // const handleLocaleChange = (selectedLocale: Locale) => () => {
  //   if (locale !== selectedLocale) {
  //     dispatch(change(selectedLocale));
  //   }
  //   handleClose();
  // };

  //
  //
  //
  return (
    <StyledContainer>
      <StyledContentContainer>
        {/* <StyledLocaleBox>
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
        </StyledLocaleBox> */}
        {children}
      </StyledContentContainer>
    </StyledContainer>
  );
};

export default PageLayout;
