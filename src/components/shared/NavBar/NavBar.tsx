import React from 'react';
import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import allEventIcon from '@/assets/navBar/all_event_icon.png';
import mainIcon from '@/assets/navBar/main_icon.png';
import myEventIcon from '@/assets/navBar/my_event_icon.png';
import myPageIcon from '@/assets/navBar/my_page_icon.png';
import { BROWSER_PATH } from '@/constants/path';
import { Box } from '@mui/material';

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
  },
  {
    link: BROWSER_PATH.MAIN,
    img: mainIcon,
    alt: '메인 페이지',
  },
  {
    link: BROWSER_PATH.EVENT.MY,
    img: myEventIcon,
    alt: '내가 신청한 이벤트',
  },
  {
    //TODO: 마이페이지로 수정
    link: BROWSER_PATH.MAIN,
    img: myPageIcon,
    alt: '마이 페이지',
  },
] as const;

const NavBar: React.FC = () => {
  return (
    <StyledContainer>
      {NAV_LINK_LIST.map((navItem) => (
        <Link key={`${navItem.link}-nav`} to={navItem.link}>
          <Box
            component="img"
            width="1.875rem"
            src={navItem.img}
            alt={navItem.alt}
          />
        </Link>
      ))}
    </StyledContainer>
  );
};

export default NavBar;
