import styled from '@emotion/styled';
import { Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';

import infoApi from '@/apis/requests/info';
import { EventCount } from '@/components/shared';
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

  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError,
  } = useQuery({
    queryKey: ['userProfileGet', userId],
    queryFn: () => infoApi.userProfileGet({ userId }),
  });

  const { data: partnerListCount, isSuccess } = useQuery({
    queryKey: [],
    queryFn: () => infoApi.partnerListCountGet({ userId }),
  });

  const {} = useQuery({
    queryKey: [],
    queryFn: () => infoApi.partnerListGet({ userId }),
  });

  const {} = useQuery({
    queryKey: [],
    queryFn: () => infoApi.eventHistoryCountGet({ userId }),
  });

  const {} = useQuery({
    queryKey: [],
    queryFn: () => infoApi.eventHistoryGet({ userId }),
  });

  const {} = useMutation({
    mutationKey: [],
    mutationFn: () => infoApi.likePost({ userId }),
  });

  /**
   *
   */
  const renderProfileInfo = () => {
    return <></>;
  };

  /**
   *
   */
  const renderProfileDetail = () => {
    return <></>;
  };

  /**
   *
   */
  const renderEventCount = () => {
    return <></>;
  };

  const renderPartner = () => {
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
        <EventCount userid={userId} />
      </Stack>
      {renderPartner()}
    </>
  );
};

export default Profile;
