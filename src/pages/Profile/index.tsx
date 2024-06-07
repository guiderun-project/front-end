import styled from '@emotion/styled';
import { CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';

import infoApi from '@/apis/requests/info';
import {
  DisabilityChip,
  EventCount,
  EventHistoryList,
  GenderChip,
  GroupChip,
  LikeButton,
  PartnerList,
  ProfileImage,
} from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';

//
//
//

const StyledTitleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-top: 1.875rem;
  display: flex;
  justify-content: center;
`;

//
//
//

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  if (!userId) {
    return <Navigate to={BROWSER_PATH.MAIN} replace />;
  }

  const { data: userData, isError } = useQuery({
    queryKey: ['userProfileGet', userId],
    queryFn: () => infoApi.userProfileGet({ userId }),
  });

  /**
   *
   */
  const renderProfileInfo = () => {
    if (userData) {
      return (
        <Stack direction="row" gap="2rem" alignItems="center">
          <Stack alignItems="center">
            <ProfileImage img={userData?.img} size={80} />
            <Stack direction="row" alignItems="center">
              <Typography fontSize="0.75rem" color="#666">
                {userData?.like}
              </Typography>
              <LikeButton userid={userId} />
            </Stack>
          </Stack>
          <Stack gap="0.5rem">
            <Stack direction="row" gap="0.5rem">
              <DisabilityChip component="chip" type={userData.type} />
              <GenderChip type={userData.gender} />
            </Stack>
            <Stack direction="row" gap="0.5rem" alignItems="center">
              <Typography fontSize="1.5rem" fontWeight={700}>
                {userData.name}
              </Typography>
              <GroupChip type="avatar" group={userData.recordDegree} />
            </Stack>
          </Stack>
        </Stack>
      );
    }
    return (
      <Stack alignItems="center">
        <CircularProgress />
      </Stack>
    );
  };

  /**
   *
   */
  const renderProfileDetail = () => {
    const UserDataContainer: React.FC<{
      title: string;
      content: React.ReactElement;
    }> = ({ title, content }) => {
      return (
        <Stack
          direction="row"
          alignItems="center"
          gap="0.5rem"
          padding="0.5rem"
        >
          <Typography
            component="h3"
            fontSize="1.0625rem"
            fontWeight={700}
            width="4.375rem"
          >
            {title}
          </Typography>
          {content}
        </Stack>
      );
    };
    if (userData) {
      return (
        <Stack gap="1rem">
          <UserDataContainer
            title="개인 기록"
            content={
              <Typography>
                Team <GroupChip type="text" group={userData.recordDegree} /> |{' '}
                {userData.detailRecord}
              </Typography>
            }
          />
          <UserDataContainer
            title="전화번호"
            content={
              userData.isOpenNumber ? (
                <Typography>{userData.phoneNumber}</Typography>
              ) : (
                <Typography color="#808080">비공개</Typography>
              )
            }
          />
          <UserDataContainer
            title="나이"
            content={<Typography>{userData.age}대</Typography>}
          />
          <UserDataContainer
            title="SNS"
            content={
              userData.isOpenSns ? (
                <Typography
                  component="a"
                  href={`https://www.instagram.com/${userData.snsId}`}
                  target="_blank"
                  sx={{
                    color: '#333',
                    textDecoration: 'none',
                  }}
                >
                  {userData.snsId}
                </Typography>
              ) : (
                <Typography color="#808080">비공개</Typography>
              )
            }
          />
        </Stack>
      );
    }
    return <></>;
  };

  //
  //
  //

  if (isError) {
    alert('페이지 접근에 오류가 발생했습니다. ');
    return <Navigate to={BROWSER_PATH.MAIN} replace />;
  }

  //
  //
  //

  return (
    <>
      <Helmet>
        <title>{`${userData?.name}의 프로필 - Guide run Project`}</title>
      </Helmet>
      <StyledTitleContainer>
        <Typography component="h1" fontSize="0.75rem" fontWeight={500}>
          개인 프로필 상세
        </Typography>
      </StyledTitleContainer>
      {renderProfileInfo()}
      <Stack gap="2rem">
        {renderProfileDetail()}
        <Divider />
        <EventCount userid={userId} />
        <EventHistoryList userid={userId} length={5} />
      </Stack>
      <PartnerList userid={userId} length={4} />
    </>
  );
};

export default Profile;
