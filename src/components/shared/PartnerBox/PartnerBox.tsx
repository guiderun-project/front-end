import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Stack, Typography } from '@mui/material';

import { DisabilityChip } from '../DisabilityChip';
import GroupChip from '../GroupChip/GroupChip';
import { ProfileImage } from '../ProfileImage';
import { ProfileModal } from '../ProfileModal';

import { PartnerDataType } from '@/apis/types/info';
import UserDetailDialog from '@/pages/Admin/pages/AdminUser/components/UserDetailDialog';
//
//
//

interface PartnerBoxProps {
  partnerData: PartnerDataType;
  mode?: 'default' | 'admin';
  size?: 'small' | 'medium';
}

//
//
//

const StyledContainer = styled.button<{ size: 'medium' | 'small' }>`
  box-sizing: border-box;
  min-width: 7.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.75rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #fff;

  ${({ size }) => {
    if (size === 'small') {
      return css`
        min-width: 7rem;
      `;
    }
  }}

  cursor: pointer;
`;

const StyledCountText = styled.span`
  color: #de1313;
`;

//
//
//

const PartnerBox: React.FC<PartnerBoxProps> = ({
  partnerData: {
    userId,
    img,
    contestCnt,
    isLiked,
    like,
    name,
    recordDegree,
    trainingCnt,
    type,
  },
  mode = 'default',
  size = 'medium',
}) => {
  const [open, setOpen] = React.useState(false);

  //
  //
  //

  return (
    <>
      <StyledContainer size={size} onClick={() => setOpen(true)}>
        <ProfileImage img={img} size={60} />
        <Stack
          boxSizing="border-box"
          alignItems="center"
          justifyContent="center"
          gap="0.25rem"
        >
          <Stack
            direction="row"
            justifyContent="center"
            gap="0.15625rem"
            alignItems="center"
          >
            <DisabilityChip component="avartar" type={type} variant="reserve" />
            <Typography fontWeight={500}>{name}</Typography>
            <GroupChip group={recordDegree} type="text" />
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap="0.25rem"
          >
            {typeof trainingCnt === 'number' && (
              <Typography fontSize="0.75rem">
                훈련<StyledCountText>{trainingCnt}</StyledCountText>회
              </Typography>
            )}
            {typeof contestCnt === 'number' && (
              <Typography fontSize="0.75rem">
                대회<StyledCountText>{contestCnt}</StyledCountText>회
              </Typography>
            )}
          </Stack>
        </Stack>
        <Stack gap="0.0125rem" direction="row" alignItems="center" role="text">
          {isLiked ? (
            <FavoriteIcon
              fontSize="small"
              aria-label={`인기도 ${like}, 좋아요 누름`}
              aria-hidden={false}
              sx={{
                color: 'red',
              }}
            />
          ) : (
            <FavoriteBorderIcon
              fontSize="small"
              aria-label={`인기도 ${like}, 좋아요 누르지 않음`}
              aria-hidden={false}
              sx={{
                color: '#666',
              }}
            />
          )}

          <Typography fontSize="0.625rem" color="#666" aria-hidden>
            {like}
          </Typography>
        </Stack>
      </StyledContainer>
      {mode === 'default' ? (
        <ProfileModal
          userid={userId}
          open={open}
          onClose={() => setOpen(false)}
        />
      ) : (
        <UserDetailDialog
          userId={userId}
          group={recordDegree}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
};

export default PartnerBox;
