import styled from '@emotion/styled';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import adminApi from '@/apis/requests/admin';
import {
  EventLinkBox,
  PageTitle,
  PartnerBox,
  TextLink,
} from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';

const StyledContainer = styled.div`
  box-sizing: border-box;
  padding: 2.5rem;
  width: 31.875rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const StyledSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  gap: 1.5rem;
  background-color: #f8f9ff;
  border: 1px solid #d9d9d9;
  border-radius: 0.5rem;
`;

const StyledUserListBox = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

const AdminMain: React.FC = () => {
  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataGetError,
  } = useQuery({
    queryKey: ['adminNewUserGet'],
    queryFn: () => adminApi.adminNewUserGet({}),
  });
  const {
    data: eventData,
    isLoading: isCurrentEventLoading,
    isError: isCurrentEventGetError,
  } = useQuery({
    queryKey: ['adminCurrentEventGet'],
    queryFn: () => adminApi.adminCurrentEventGet({}),
  });

  /**
   *
   */
  const renderUser = () => {
    return (
      <StyledSectionContainer>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="h2" fontSize="1.5rem" fontWeight={700}>
            새롭게 가입한 회원
          </Typography>
          <TextLink label="더 보기" to={BROWSER_PATH.ADMIN.USER} />
        </Stack>
        {isUserDataLoading && (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        )}
        {isUserDataGetError && (
          <Stack alignItems="center">
            <Typography fontSize="1.25rem">
              사용자 정보를 가지고 오는데 실패했습니다.
            </Typography>
          </Stack>
        )}
        {userData ? (
          userData.length ? (
            <StyledUserListBox>
              {userData.map((user) => (
                <PartnerBox
                  mode="admin"
                  key={user.userId}
                  partnerData={{ ...user, isLiked: false }}
                />
              ))}
            </StyledUserListBox>
          ) : (
            <Stack alignItems="center">
              <Typography fontSize="1.25rem">
                새롭게 가입한 회원이 없습니다.
              </Typography>
            </Stack>
          )
        ) : null}
      </StyledSectionContainer>
    );
  };

  /**
   *
   */
  const renderEvent = () => {
    return (
      <StyledSectionContainer>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="h2" fontSize="1.5rem" fontWeight={700}>
            현재 진행중인 이벤트
          </Typography>
          <TextLink label="더 보기" to={BROWSER_PATH.ADMIN.EVENT} />
        </Stack>
        {isCurrentEventLoading && (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        )}
        {isCurrentEventGetError && (
          <Stack alignItems="center">
            <Typography fontSize="1.25rem">
              사용자 정보를 가지고 오는데 실패했습니다.
            </Typography>
          </Stack>
        )}
        {eventData ? (
          eventData.length ? (
            <Stack>
              {eventData.map((event) => (
                <EventLinkBox mode="admin" eventData={event} />
              ))}
            </Stack>
          ) : (
            <Stack alignItems="center">
              <Typography fontSize="1.25rem">
                현재 진행중인 이벤트가 없습니다.
              </Typography>
            </Stack>
          )
        ) : null}
      </StyledSectionContainer>
    );
  };

  //
  //
  //

  return (
    <StyledContainer>
      <PageTitle title="Admin" />
      {renderUser()}
      {renderEvent()}
    </StyledContainer>
  );
};

export default AdminMain;
