import React from 'react';

import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import PlanedEventIcon from '@/assets/navBar/all_event_bold_icon.png';
import MyEventIcon from '@/assets/navBar/my_event_icon.png';
import { LinkButton, UserBox } from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import { DisabilityEnum, RoleEnum, RunningGroup } from '@/types/group';

//
//
//

const PARTNER_DATA = [
  {
    userId: '12345',
    contestCnt: 1,
    trainingCnt: 0,
    name: '조재석',
    recordDegree: RunningGroup.B,
    role: RoleEnum.User,
    type: DisabilityEnum.VI,
  },
  {
    userId: '12345231321',
    contestCnt: 1,
    trainingCnt: 0,
    name: '배두리',
    recordDegree: RunningGroup.A,
    role: RoleEnum.User,
    type: DisabilityEnum.VI,
  },
  {
    userId: '1234554532',
    contestCnt: 1,
    trainingCnt: 0,
    name: '이재건',
    recordDegree: RunningGroup.C,
    role: RoleEnum.User,
    type: DisabilityEnum.GUIDE,
  },
  {
    userId: '12345',
    contestCnt: 1,
    trainingCnt: 0,
    name: '장지은',
    recordDegree: RunningGroup.A,
    role: RoleEnum.User,
    type: DisabilityEnum.GUIDE,
  },
];

//
//
//

const StyledPartnerBox = styled.div`
  z-index: 111111;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Main: React.FC = () => {
  const renderEvent = () => {
    return (
      <Stack gap="1.5rem">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography component="h1" fontSize="1.5rem" fontWeight={700}>
            이벤트
          </Typography>
          <Link
            to={BROWSER_PATH.EVENT.ALL}
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography
              component="span"
              fontSize="0.875rem"
              color="#666"
              sx={{
                textDecoration: 'underline',
              }}
            >
              이벤트 전체보기
            </Typography>
            <span aria-hidden> &gt;</span>
          </Link>
        </Box>
        <Stack gap="0.5rem">
          <LinkButton
            icon={MyEventIcon}
            title="내가 신청한 이벤트"
            to={BROWSER_PATH.EVENT.MY}
          />
          <LinkButton
            icon={PlanedEventIcon}
            title="예정 이벤트"
            to={BROWSER_PATH.EVENT.UPCOMING}
          />
        </Stack>
      </Stack>
    );
  };

  const renderPartner = () => {
    return (
      <Stack gap="1.5rem">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography component="h1" fontSize="1.5rem" fontWeight={700}>
            최근 나의 파트너
          </Typography>
          <Link
            //TODO 마이페이지 구현 후 함께 뛴 파트너 파트로 이동
            to={BROWSER_PATH.EVENT.MAIN}
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography
              component="span"
              fontSize="0.875rem"
              color="#666"
              sx={{
                textDecoration: 'underline',
              }}
            >
              내 파트너 전체 보기
            </Typography>
            <span aria-hidden> &gt;</span>
          </Link>
        </Box>

        <StyledPartnerBox>
          {PARTNER_DATA.map((partner) => (
            <UserBox key={partner.userId} partnerData={partner} />
          ))}
        </StyledPartnerBox>
      </Stack>
    );
  };

  return (
    <Stack gap="2.5rem">
      {renderEvent()}
      {renderPartner()}
    </Stack>
  );
};

export default Main;
