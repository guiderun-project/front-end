import React from 'react';

import styled from '@emotion/styled';
import InfoIcon from '@mui/icons-material/Info';
import {
  CircularProgress,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { PartnerBox } from '../PartnerBox';

import infoApi from '@/apis/requests/info';
import { PartnerSort } from '@/types/sort';

//
//
//

interface PartnerListProps {
  userid: string;
  length: number;
}

//
//
//

const StyledPartnerListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const PARTNER_FILTER_LIST = [
  { name: '최근 순', value: PartnerSort.Recent },
  { name: '많이 달린 순', value: PartnerSort.Count },
];

//
//
//

const PartnerList: React.FC<PartnerListProps> = ({ userid, length }) => {
  const [selectedPartnerFilter, setSelectedPartnerFilter] = React.useState(
    PartnerSort.Recent,
  );
  const [page, setPage] = React.useState(1);

  const {
    data: partnerCount,
    isLoading: isPartnerListCountLoading,
    isSuccess: isPartnerListCountSuccess,
  } = useQuery({
    queryKey: ['partnerListCountGet', userid],
    queryFn: () => infoApi.partnerListCountGet({ userId: userid }),
  });

  const maxPartnerPage = Math.ceil((partnerCount ?? 0) / length);
  const startPartnerIndex = (page - 1) * length;

  const { data: partnerList, isLoading: isPartnerListLoading } = useQuery({
    queryKey: [
      'partnerListGet',
      userid,
      selectedPartnerFilter,
      startPartnerIndex,
    ],
    queryFn: () =>
      infoApi.partnerListGet({
        userId: userid,
        sort: selectedPartnerFilter,
        start: startPartnerIndex,
        limit: length,
      }),
    enabled: isPartnerListCountSuccess,
  });

  /**
   *
   */
  const handlePartnerFilterChange = (e: SelectChangeEvent) => {
    setSelectedPartnerFilter(e.target.value as PartnerSort);
  };

  //
  //
  //
  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding="0.5rem"
      >
        <Typography component="h2" fontWeight={700} fontSize="1.0625rem">
          함께 뛰었던 파트너
        </Typography>
        <Select
          size="small"
          value={selectedPartnerFilter}
          aria-label="함께 뛴 파트너 필터"
          onChange={handlePartnerFilterChange}
          sx={{
            boxShadow: 'none',
            '.MuiOutlinedInput-notchedOutline': { border: 0 },
            fontWeight: 700,
            fontSize: '0.75rem',
          }}
        >
          {PARTNER_FILTER_LIST.map((filter) => (
            <MenuItem
              key={filter.value}
              value={filter.value}
              selected={selectedPartnerFilter === filter.value}
              aria-selected={selectedPartnerFilter === filter.value}
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            >
              {filter.name}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Stack gap="2rem">
        {/* 파트너 리스트 */}
        {isPartnerListCountLoading || isPartnerListLoading ? (
          <Stack justifyContent="center" alignItems="center">
            <CircularProgress
              size="2rem"
              aria-label="파트너 정보를 가지고 오는 중"
            />
          </Stack>
        ) : !partnerList?.length ? (
          <Stack justifyContent="center" alignItems="center" gap="2rem">
            <InfoIcon aria-label="알림" />
            <Typography fontWeight={700} fontSize="1.25rem">
              함께한 파트너가 존재하지 않습니다.
            </Typography>
          </Stack>
        ) : (
          <StyledPartnerListGrid>
            {partnerList.map((partner) => (
              <PartnerBox key={partner.userId} partnerData={partner} />
            ))}
          </StyledPartnerListGrid>
        )}
        {maxPartnerPage > 1 && (
          <Stack direction="row" justifyContent="center">
            <Pagination
              size="small"
              page={page}
              count={maxPartnerPage}
              onChange={(_, value) => setPage(value)}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default PartnerList;
