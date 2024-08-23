import React from 'react';

import { CircularProgress, Pagination, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { StyledPartnerListBox } from './PartnerList';

import adminApi from '@/apis/requests/admin';
import { PartnerBox } from '@/components/shared';
import { UserType } from '@/types/user';

interface PartnerSearchProps {
  userId: UserType['userId'];
  search: string;
}

const MAX_PARTNER_LENGTH = 6;

const PartnerSearch: React.FC<PartnerSearchProps> = ({ search, userId }) => {
  const [page, setPage] = React.useState(1);

  const {
    data: count,
    isLoading: isCountLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['adminSearchPartnerHistoryCountGet', userId],
    queryFn: () =>
      adminApi.adminSearchPartnerHistoryCountGet({ userId, text: search }),
  });

  const maxPage = Math.ceil((count ?? 0) / MAX_PARTNER_LENGTH);
  const startIndex = (page - 1) * MAX_PARTNER_LENGTH;

  const { data: partnerList, isLoading: isPartnerListLoading } = useQuery({
    queryKey: [],
    queryFn: () =>
      adminApi.adminSearchPartnerHistoryGet({
        userId,
        text: search,
        start: startIndex,
      }),
    enabled: isSuccess,
  });

  //
  //
  //

  return (
    <Stack gap="2.5rem" alignItems="center">
      <Stack gap="1rem" alignItems="center">
        <Typography component="h3" fontWeight={700}>
          {`파트너 ${search} 검색 결과`}
        </Typography>
        {isPartnerListLoading || isCountLoading ? (
          <CircularProgress />
        ) : (
          <StyledPartnerListBox>
            {partnerList?.length ? (
              partnerList.map((partner) => (
                <PartnerBox
                  size="small"
                  key={partner.userId}
                  partnerData={{ ...partner, isLiked: false }}
                />
              ))
            ) : (
              <Typography>검색 결과가 존재하지 않습니다.</Typography>
            )}
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

export default PartnerSearch;
