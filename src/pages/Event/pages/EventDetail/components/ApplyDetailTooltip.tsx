import { PropsWithChildren, useContext, useEffect } from 'react';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { EventContext } from '..';

import eventApi from '@/apis/requests/event';
import { GroupChip, HidenText } from '@/components/shared';
import { COMPETITION_GROUP } from '@/constants/group';
import { RootState } from '@/store/index';
import { EventCategory } from '@/types/event';
import { EventType, RunningGroup } from '@/types/group';
import { UserType } from '@/types/user';
import getAuthority from '@/utils/authority';

interface ApplyDetailTooltipProps {
  open: boolean;
  userId: UserType['userId'];
  userName: UserType['name'];
  phone?: UserType['phoneNumber'];
  onClose: VoidFunction;
}

const ApplyDetailTooltip: React.FC<
  PropsWithChildren<ApplyDetailTooltipProps>
> = ({ open, userId, children, userName, phone, onClose }) => {
  const { role } = useSelector((state: RootState) => state.user);
  const eventId = Number(useParams<{ eventId: string }>().eventId);
  const eventData = useContext(EventContext);

  const { data: applyDetail } = useQuery({
    queryKey: ['eventApplyGet', eventId, userId],
    queryFn: () => eventApi.eventApplyGet({ eventId, userId }),
  });

  const isCompetition = eventData?.type === EventType.Competition;

  const getApplyGroup = () => {
    if (!applyDetail || !eventData) {
      return '';
    }

    if (eventData.eventCategory === EventCategory.GROUP) {
      switch (applyDetail?.group) {
        case RunningGroup.A:
          return '대회준비반';
        case RunningGroup.B:
          return '성실러너반';
        default:
          return '';
      }
    }

    if (isCompetition) {
      return COMPETITION_GROUP[applyDetail.group];
    }

    return <GroupChip group={applyDetail.group} />;
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (open) {
      timeoutId = setTimeout(() => {
        onClose();
      }, 2000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [open]);

  return (
    <Stack width="100%" position="relative" role="text">
      {children}
      {applyDetail && (
        <HidenText
          content={`${getApplyGroup()}에서 ${
            applyDetail.partner ? `${applyDetail.partner}와` : ''
          } 훈련 희망,
      추가 희망사항: ${applyDetail.detail ? applyDetail.detail : '없음.'}
      `}
        />
      )}
      {open && (
        <TooltipContainer>
          {applyDetail ? (
            <>
              <Stack direction="row" gap="0.5rem" alignItems="center">
                <Typography
                  display="flex"
                  alignItems="center"
                  gap="0.25rem"
                  fontSize="0.75rem"
                  fontWeight={600}
                  color="#D9D9D9"
                >
                  {getApplyGroup()}
                  에서
                </Typography>

                <Typography fontSize="0.75rem" fontWeight={600} color="#D9D9D9">
                  {applyDetail.partner && (
                    <>
                      <span
                        style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: '#FFF',
                        }}
                      >
                        {applyDetail.partner}
                      </span>
                      <span>과 함께</span>
                    </>
                  )}
                  <span>훈련희망</span>
                </Typography>
              </Stack>
              {applyDetail.detail && (
                <Typography
                  bgcolor="#111"
                  color="#FFF"
                  fontSize="0.75rem"
                  lineHeight="1rem"
                  border="1px solid #636363"
                  borderRadius="0.25rem"
                  sx={{
                    display: 'block',
                    padding: '0.25rem 0.5rem',
                  }}
                >
                  {applyDetail.detail}
                </Typography>
              )}
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText(applyDetail.detail)
                    .then(() => alert('요청사항이 복사되었습니다'))
                    .catch((error) =>
                      alert('요청사항 복사에 실패했습니다-' + error.message),
                    );
                }}
              >
                <Typography
                  fontSize="0.75rem"
                  fontWeight={600}
                  color="white"
                  sx={{
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  요청사항 복사
                </Typography>
              </button>
              {phone && getAuthority.isAdmin(role) && (
                <Typography
                  component="a"
                  href={`tel:${phone}`}
                  fontSize="0.825"
                  fontWeight={600}
                  color="white"
                  sx={{
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {userName}에게 전화 걸기
                </Typography>
              )}
            </>
          ) : (
            <CircularProgress color="info" />
          )}
        </TooltipContainer>
      )}
    </Stack>
  );
};

export default ApplyDetailTooltip;

const tooltipOpenKeyframes = keyframes`
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
`;

const TooltipContainer = styled.div`
  position: absolute;
  width: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background-color: #222222d4;
  padding: 0.625rem 0.5rem 0.75rem 0.5rem;
  z-index: 111;
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: ${tooltipOpenKeyframes} 0.2s ease-in forwards;

  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }
`;
