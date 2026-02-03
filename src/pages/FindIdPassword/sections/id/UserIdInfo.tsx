import styled from '@emotion/styled';
import { Stack, Typography } from '@mui/material';
import { useMutationState } from '@tanstack/react-query';

import { GetUserIdPostResponse } from '@/apis/types/auth';

//
//
//

const StyledIdInfoBox = styled.section`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1.5rem 2.5rem;
  border: 1px solid #aaa;
  border-radius: 8px;
`;

//
//
//

const UserIdInfo: React.FC = () => {
  const [userInfo] = useMutationState({
    filters: { mutationKey: ['getUserIdPost'] },
    select: (mutate) => mutate.state.data as GetUserIdPostResponse,
  });

  //
  //
  //

  return (
    <Stack gap="1.5rem">
      <Typography autoFocus component="h2" fontWeight={700} textAlign="center">
        휴대전화정보와 일치하는 아이디입니다.
      </Typography>
      <StyledIdInfoBox>
        {userInfo ? (
          <>
            <Typography
              aria-label={`아이디 ${userInfo.accountId.split('').join(' ')}`}
            >
              아이디: {userInfo.accountId}
            </Typography>
            <Typography>가입일: {userInfo.createdAt}</Typography>
          </>
        ) : null}
      </StyledIdInfoBox>
    </Stack>
  );
};

export default UserIdInfo;
