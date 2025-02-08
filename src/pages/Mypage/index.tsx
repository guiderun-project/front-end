import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InfoIcon from '@mui/icons-material/Info';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import authApi from '@/apis/requests/auth';
import infoApi from '@/apis/requests/info';
import {
  DisabilityChip,
  EventLinkBox,
  GenderChip,
  GroupChip,
  PageTitle,
  TextLink,
} from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import { RootState } from '@/store/index';
import { resetAccessToken } from '@/store/reducer/auth';
import { updateInfo } from '@/store/reducer/user';
import getAuthority from '@/utils/authority';

//
//
//
//TODO: LinkBox로 대체하기
export const StyledEventButton = styled.button`
  border: 0;
  outline: 0;
  box-sizing: border-box;
  padding: 1rem;
  padding-right: 1.5rem;
  gap: 1rem;
  display: grid;
  grid-template-columns: 1fr 4fr 2fr;
  align-items: center;
  box-shadow: 0px 1px 4px 0px #0000001a;
  background-color: #fff;
  text-decoration: none;
  color: #000;
  border-bottom: 1px solid #c2c7cf;
`;

const StyledImageLabel = styled.label<{ img: string }>`
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  ${({ img }) => {
    if (img?.length) {
      return css`
        background: url(${img}) no-repeat center center;
        background-size: 5rem;
      `;
    } else {
      return css`
        background-color: #8d8d8d;
      `;
    }
  }}
  border-radius: 1000000000rem;
  cursor: pointer;

  & .hide-element {
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;

//
//
//

const Mypage: React.FC = () => {
  const userData = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: eventList, isLoading } = useQuery({
    queryKey: ['eventHistoryGet', userData.userId],
    queryFn: () =>
      infoApi.eventHistoryGet({
        userId: userData.userId,
      }),
  });

  const { mutate } = useMutation({
    mutationKey: [],
    mutationFn: (image: FormData) => infoApi.profileImagePost({ image }),
    onSuccess: (data) => {
      dispatch(updateInfo({ img: data }));
      alert('프로필 사진이 업로드되었습니다.');
    },
    onError: (error) => {
      if (error.response?.data) {
        const errorData = error.response.data;
        alert(errorData.message);
      } else {
        alert('에러가 발생했습니다.');
      }
    },
  });

  const { mutate: logout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      dispatch(resetAccessToken());
      navigate(BROWSER_PATH.INTRO);
    },
    onError: () => {
      alert('에러가 발생했습니다. 개발팀한테 뭐라고 좀 해주세요..');
    },
  });

  /**
   *
   */
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (
      e.target.files &&
      window.confirm('프로필 사진을 업로드 하시겠습니까?')
    ) {
      const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append('files', uploadFile);
      mutate(formData);
    }
  };

  /**
   *
   */
  const renderTeamInfo = () => {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        gap="1.5rem"
      >
        <StyledImageLabel img={userData.img} aria-label="프로필 사진 업로드">
          <CameraAltOutlinedIcon
            aria-hidden
            sx={{
              fontSize: '1.75rem',
              color: '#fff',
            }}
          />
          <input
            className="hide-element"
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            aria-label="프로필 사진 업로드"
          />
        </StyledImageLabel>
        <Stack gap="1rem" alignItems="flex-start">
          <Stack component="h1" gap="0.325rem">
            <Typography component="span" fontSize="2rem">
              {userData.name} 님은
            </Typography>
            <Typography
              component="span"
              fontSize="1.5rem"
              display="flex"
              alignItems="center"
              gap="0.5rem"
            >
              <Typography component="span" fontSize="1.5rem" fontWeight={700}>
                Team
              </Typography>
              <GroupChip group={userData.recordDegree} type="avatar" />
              입니다
            </Typography>
          </Stack>
          <TextLink
            to={`${BROWSER_PATH.INFO}?type=spec`}
            label={`러닝스펙 업데이트 `}
          />
        </Stack>
      </Box>
    );
  };

  /**
   *
   */
  const renderInfo = () => {
    return (
      <Box display="flex" gap="1rem" paddingLeft="0.5rem">
        <Typography component="h3" fontWeight={700}>
          기본 정보
        </Typography>
        <Stack gap="0.5rem">
          <Box display="flex" gap="0.5rem">
            <Typography>{userData.name}</Typography>
            <DisabilityChip component="chip" type={userData.type} />
            <GenderChip type={userData.gender} />
          </Box>
          <TextLink
            to={`${BROWSER_PATH.INFO}?type=info`}
            label={`개인 인적사항 더보기 `}
          />
        </Stack>
      </Box>
    );
  };

  /**
   *
   */
  const renderMyEvent = () => {
    if (!getAuthority.isUser(userData.role)) return null;
    return (
      <Stack gap="2.5rem">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="h2" paddingLeft="0.5rem" fontWeight={700}>
            내가 참여한 이벤트
          </Typography>
          <TextLink
            to={BROWSER_PATH.EVENT.HISTORY}
            label="참여 이벤트 더보기"
          />
        </Stack>
        {isLoading ? (
          <Stack justifyContent="center" alignItems="center">
            <CircularProgress
              size="2rem"
              aria-label="데이터를 가지고 오는 중"
            />
          </Stack>
        ) : !eventList?.items?.length ? (
          <Stack justifyContent="center" alignItems="center" gap="2rem">
            <InfoIcon aria-label="알림" />
            <Typography fontWeight={700} fontSize="1.25rem">
              참여한 이벤트가 존재하지 않습니다.
            </Typography>
          </Stack>
        ) : (
          <Stack>
            {eventList?.items.map((event) => (
              <EventLinkBox key={event.eventId} eventData={event} />
            ))}
          </Stack>
        )}
        {getAuthority.isUser(userData.role) && (
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
      </Stack>
    );
  };

  /**
   *
   */
  const Navigation: React.FC<{
    title: string;
    buttonLabel: string;
    to: string;
    newTabs?: boolean;
  }> = ({ newTabs, title, buttonLabel, to }) => {
    return (
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography component="h2" fontSize="1.0625rem" fontWeight={700}>
          {title}
        </Typography>
        <TextLink newTabs={newTabs} to={to} label={buttonLabel} />
      </Stack>
    );
  };

  //
  //
  //

  return (
    <>
      <PageTitle title="마이 페이지" />
      {/* 이름, 팀 */}
      {renderTeamInfo()}
      {/* 기본정보 */}
      {renderInfo()}
      {/* 내가 참여한 이벤트 */}
      {renderMyEvent()}
      <Navigation
        newTabs
        title="1:1 문의하기"
        buttonLabel="문의하러 바로 가기"
        to="https://open.kakao.com/o/sB89yqNf"
      />
      <Navigation
        title="탈퇴하기"
        buttonLabel="탈퇴하러 가기"
        to={BROWSER_PATH.WITHDRAW}
      />
      <Stack alignItems="center" gap="0.5rem">
        <Button
          fullWidth
          size="large"
          variant="outlined"
          onClick={() => {
            navigate(-1);
          }}
        >
          되돌아가기
        </Button>
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={() => logout()}
        >
          로그아웃
        </Button>
      </Stack>
    </>
  );
};

export default Mypage;
