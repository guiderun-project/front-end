import { ClearOutlined } from '@mui/icons-material';
import {
  Box,
  Dialog,
  Typography,
  IconButton,
  DialogContent,
  DialogTitle,
  Divider,
  CircularProgress,
  Stack,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { EventChip } from '../EventChip';
import { EventStatus } from '../EventStatus';

import eventApi from '@/apis/requests/event';

interface EventModalProps {
  eventId: number;
  isOpen: boolean;
  onModalClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({
  eventId,
  isOpen,
  onModalClose,
}) => {
  const { data: eventData, isSuccess } = useQuery({
    queryKey: ['eventPopupGet', eventId],
    queryFn: () => eventApi.eventPopupGet({ eventId }),
    enabled: eventId !== -1,
  });

  return (
    <Dialog
      open={isOpen}
      fullWidth
      keepMounted={false}
      maxWidth="xs"
      onClose={onModalClose}
      sx={{
        '.MuiPaper-root': {
          maxHeight: '70vh',
          padding: '5rem 1.25rem',
          gap: '2.5rem',
        },
      }}
    >
      <IconButton
        onClick={onModalClose}
        size="large"
        aria-label="닫기"
        sx={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
        }}
      >
        <ClearOutlined fontSize="large" />
      </IconButton>
      {eventData && isSuccess ? (
        <>
          <DialogTitle display="flex" gap="0.5rem" alignItems="center">
            <EventChip variant="full" type={eventData.type} />
            <Typography
              component="h1"
              id="modal-title"
              fontSize="1.25rem"
              fontWeight={700}
            >
              {eventData.name}
              <EventStatus status={eventData.recruitStatus} />
            </Typography>
          </DialogTitle>
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
            }}
          >
            <Box display="grid" gridTemplateColumns="1fr 2.5fr">
              <Typography component="h3" fontWeight={700}>
                일시
              </Typography>
              <Typography display="flex" gap="0.5rem">
                {eventData.date.replace(/-/g, '.')}
                <Divider orientation="vertical" variant="middle" flexItem />
                {eventData.startTime}~{eventData.endTime}
              </Typography>
            </Box>
            <Box display="grid" gridTemplateColumns="1fr 2.5fr">
              <Typography component="h3" fontWeight={700}>
                장소
              </Typography>
              <Typography>{eventData.place}</Typography>
            </Box>
            <Box display="grid" gridTemplateColumns="1fr 2.5fr">
              <Typography component="h3" fontWeight={700}>
                모집인원
              </Typography>
              <Typography display="flex" flexDirection="column" gap="0.5rem">
                <span>
                  시각장애러너{' '}
                  <span
                    style={{
                      color: '#DE1313',
                    }}
                  >
                    {eventData.viCnt}
                  </span>
                  명
                </span>
                <span>
                  가이드러너{' '}
                  <span
                    style={{
                      color: '#DE1313',
                    }}
                  >
                    {eventData.guideCnt}
                  </span>
                  명
                </span>
              </Typography>
            </Box>
            <Box
              paddingTop="0.625rem"
              display="flex"
              flexDirection="column"
              gap="0.5rem"
            >
              <Typography component="h3" fontWeight={700}>
                훈련 상세
              </Typography>
              <Box
                padding="1rem"
                border="1px solid #D9D9D9"
                borderRadius="0.5rem"
              >
                <Typography fontSize="0.8125rem" lineHeight="1.25rem">
                  {eventData.content}
                </Typography>
              </Box>
            </Box>
          </DialogContent>
        </>
      ) : (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      )}
    </Dialog>
  );
};

export default EventModal;
