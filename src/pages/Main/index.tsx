import React from 'react';

import styled from '@emotion/styled';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import infoApi from '@/apis/requests/info';
import PlanedEventIcon from '@/assets/navBar/all_event_bold_icon.png';
import MyEventIcon from '@/assets/navBar/my_event_icon.png';
import { LinkButton, PartnerBox } from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import { RootState } from '@/store/index';
import { PartnerSort } from '@/types/sort';
import getAuthority from '@/utils/authority';

//
//
//

const StyledPartnerBox = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledPartnerListButton = styled(Link)`
  min-width: 5.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  padding: 1.5rem 1.25rem;
  text-decoration: none;
  color: #000;
  background-color: #fff;
`;

//
//
//

const Main: React.FC = () => {
  const { userId, role } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const {
    data: partnerCount,
    isSuccess: isParnerListCountGetSuccess,
    isLoading: isParnerListCountGetLoading,
  } = useQuery({
    queryKey: ['partnerListCountGet'],
    queryFn: () => infoApi.partnerListCountGet({ userId }),
    enabled: Boolean(userId),
  });
  const { data: partnerListData, isLoading: isPartnerListGetLoading } =
    useQuery({
      queryKey: ['partnerListGet'],
      queryFn: () =>
        infoApi.partnerListGet({ userId, sort: PartnerSort.Recent, limit: 2 }),
      enabled: isParnerListCountGetSuccess,
    });

  /**
   *
   */
  const renderEvent = () => {
    return (
      <Stack gap="1.5rem">
        <Typography component="h2" fontSize="1.5rem" fontWeight={700}>
          이벤트
        </Typography>
        {getAuthority.isAdmin(role) && (
          <Stack direction="row" justifyContent="center">
            <Button
              fullWidth
              variant="chip"
              size="large"
              onClick={() => navigate(BROWSER_PATH.EVENT.NEW)}
            >
              이벤트 만들기
              <ChevronRightIcon />
            </Button>
          </Stack>
        )}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap="0.5rem"
        >
          <LinkButton
            type="block"
            icon={PlanedEventIcon}
            title="전체 이벤트"
            to={BROWSER_PATH.EVENT.ALL}
          />
          <LinkButton
            type="block"
            icon={MyEventIcon}
            title="나의 이벤트"
            to={BROWSER_PATH.EVENT.MY}
          />
        </Stack>
      </Stack>
    );
  };

  const renderPartner = () => {
    return (
      <Stack gap="1.5rem">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography component="h2" fontSize="1.5rem" fontWeight={700}>
            최근 나의 파트너
          </Typography>
          <Link
            to={BROWSER_PATH.EVENT.HISTORY}
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

        {isPartnerListGetLoading || isParnerListCountGetLoading ? (
          <Stack
            boxSizing="border-box"
            alignItems="center"
            justifyContent="center"
            padding="1rem"
          >
            <CircularProgress size={24} aria-label="내 파트너 불러오는 중" />
          </Stack>
        ) : partnerListData && partnerListData.length ? (
          <StyledPartnerBox>
            {partnerListData.map((partner) => (
              <PartnerBox key={partner.userId} partnerData={partner} />
            ))}
            {partnerCount && partnerCount > 2 ? (
              <StyledPartnerListButton
                to={BROWSER_PATH.EVENT.HISTORY}
                aria-label="파트너 목록 더보기"
              >
                <ArrowForwardIcon />
                <Typography fontSize="1.0625rem" fontWeight="700">
                  더보기
                </Typography>
              </StyledPartnerListButton>
            ) : null}
          </StyledPartnerBox>
        ) : (
          <Stack alignItems="center" padding="1rem">
            <Typography>파트너가 존재하지 않습니다</Typography>
          </Stack>
        )}
      </Stack>
    );
  };

  return (
    <Stack gap="2.5rem">
      <Helmet>
        <title>Guide run Project</title>
      </Helmet>
      {renderEvent()}
      {renderPartner()}
    </Stack>
  );
};

export default Main;
