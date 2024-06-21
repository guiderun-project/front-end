import adminApi from '@/apis/requests/admin';
import { PartnerBox } from '@/components/shared';
import styled from '@emotion/styled';
import { CircularProgress, Pagination, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface PartnerListProps {
  userId: string;
}

//
//
//

const MAX_PARTNER_LENGTH = 6;

const StyledPartnerListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 7rem);
  gap: 0.5rem;
  align-items: center;
`;

//
//
//

const PartnerList: React.FC<PartnerListProps> = ({ userId }) => {
  const [page, setPage] = React.useState(1);

  const {
    data: count,
    isLoading: isCountLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['adminPartnerHistoryCountGet', userId],
    queryFn: () => adminApi.adminPartnerHistoryCountGet({ userId }),
  });

  const maxPage = Math.ceil((count ?? 0) / MAX_PARTNER_LENGTH);
  const startIndex = (page - 1) * MAX_PARTNER_LENGTH;

  const { data: partnerList, isLoading: isPartnerListLoading } = useQuery({
    queryKey: [],
    queryFn: () =>
      adminApi.adminPartnerHistoryGet({ userId, start: startIndex }),
    enabled: isSuccess,
  });

  return (
    <Stack gap="2.5rem" alignItems="center">
      <Stack gap="1rem" alignItems="center">
        <Typography component="h3" fontWeight={700}>
          훈련 함께 했던 파트너
        </Typography>
        {isPartnerListLoading || isCountLoading ? (
          <CircularProgress />
        ) : (
          <StyledPartnerListBox>
            {partnerList
              ? partnerList.map((partner) => (
                  <PartnerBox
                    size="small"
                    key={partner.userId}
                    partnerData={{ ...partner, isLiked: false }}
                  />
                ))
              : null}
          </StyledPartnerListBox>
        )}
      </Stack>
      {isPartnerListLoading || isCountLoading ? (
        <CircularProgress />
      ) : (
        maxPage > 1 && (
          <Pagination
            size="small"
            page={page}
            count={maxPage}
            onChange={(_, value) => setPage(value)}
          />
        )
      )}
    </Stack>
  );
};

export default PartnerList;
