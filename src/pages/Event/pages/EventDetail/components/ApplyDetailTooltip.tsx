import { PropsWithChildren, useEffect } from 'react';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import eventApi from '@/apis/requests/event';
import { GroupChip } from '@/components/shared';

interface ApplyDetailTooltipProps {
  open: boolean;
  userId: string;
  onClose: VoidFunction;
}

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

const ApplyDetailTooltip: React.FC<
  PropsWithChildren<ApplyDetailTooltipProps>
> = ({ open, userId, children, onClose }) => {
  const eventId = Number(useParams<{ eventId: string }>().eventId);

  const { data: applyDetail } = useQuery({
    queryKey: ['eventApplyGet', eventId, userId],
    queryFn: () => eventApi.eventApplyGet({ eventId, userId }),
  });

  //
  //
  //
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

  //
  //
  //

  return (
    <Stack width="100%" position="relative">
      {children}
      {open && (
        <TooltipContainer>
          {applyDetail ? (
            <>
              <Stack direction="row" gap="0.75rem" alignItems="center">
                <Typography
                  display="flex"
                  alignItems="center"
                  gap="0.25rem"
                  fontSize="0.75rem"
                  fontWeight={600}
                  color="#D9D9D9"
                >
                  <GroupChip group={applyDetail.group} />
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
