import React from 'react';

import styled from '@emotion/styled';
import { Box, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import adminIcon from '@/assets/navBar/admin_icon.png';
import allEventIcon from '@/assets/navBar/all_event_icon.png';
import mainIcon from '@/assets/navBar/main_icon.png';
import myEventIcon from '@/assets/navBar/my_event_icon.png';
import myPageIcon from '@/assets/navBar/my_page_icon.png';
import { BROWSER_PATH } from '@/constants/path';
import { RootState } from '@/store/index';
import { RoleEnum } from '@/types/group';

//
//
//

const StyledContainer = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ececec;
  padding: 0.625rem 3.125rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

//
//
//

const NAV_LINK_LIST = [
  {
    link: BROWSER_PATH.EVENT.ALL,
    img: allEventIcon,
    alt: '전체 이벤트',
    disabled: true,
  },
  {
    link: BROWSER_PATH.MAIN,
    img: mainIcon,
    alt: '메인 페이지',
    disabled: true,
  },
  {
    link: BROWSER_PATH.EVENT.MY,
    img: myEventIcon,
    alt: '내가 신청한 이벤트',
    disabled: true,
  },
  {
    link: BROWSER_PATH.MYPAGE,
    img: myPageIcon,
    alt: '마이 페이지',
    disabled: false,
  },
  {
    link: BROWSER_PATH.ADMIN.MAIN,
    img: adminIcon,
    alt: '관리자 페이지',
    limit: RoleEnum.Admin,
    disabled: false,
  },
];

const NavBar: React.FC = () => {
  const role = useSelector((state: RootState) => state.user.role);

  return (
    <StyledContainer>
      {NAV_LINK_LIST.map((navItem) =>
        navItem?.limit ? (
          navItem.limit === role ? (
            <Tooltip key={`${navItem.alt}-nav`} title={navItem.alt}>
              <Link to={navItem.link}>
                <Box
                  component="img"
                  width="1.4375rem"
                  src={navItem.img}
                  alt={navItem.alt}
                />
              </Link>
            </Tooltip>
          ) : null
        ) : (
          <Tooltip key={`${navItem.alt}-nav`} title={navItem.alt}>
            <Link to={navItem.link}>
              <Box
                component="img"
                width="1.4375rem"
                src={navItem.img}
                alt={navItem.alt}
              />
            </Link>
          </Tooltip>
        ),
      )}
    </StyledContainer>
  );
};

export default NavBar;
