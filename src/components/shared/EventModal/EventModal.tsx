import { ClearOutlined } from '@mui/icons-material';
import {
  Box,
  Dialog,
  Typography,
  IconButton,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Stack,
  Button,
  DialogActions,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { DisabilityChip } from '../DisabilityChip';
import { EventChip } from '../EventChip';
import { EventStatus } from '../EventStatus';
import { GroupChip } from '../GroupChip';
import { TextLink } from '../TextLink';
import { TitleContentRow } from '../TitleContentRow';

import eventApi from '@/apis/requests/event';
import { EVENT_CITY_NAME_LIST } from '@/constants/event';
import { BROWSER_PATH } from '@/constants/path';
import { Event } from '@/types/event';
import { RecruitStatus, EventStatus as EventStatusType } from '@/types/group';
import { getFullKoreanDate, getPeriod } from '@/utils/time';

interface EventModalProps {
  eventId: Event['eventId'];
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
    enabled: isOpen,
  });

  const isEndEvent =
    eventData &&
    (eventData.status === EventStatusType.End ||
      eventData.recruitStatus === RecruitStatus.End);

  const formatCityName = (cityName: string) => {
    const city = EVENT_CITY_NAME_LIST.find((city) => city.value === cityName);
    return city ? city.label : cityName;
  };

  const renderTitle = () => {
    if (eventData) {
      return (
        <DialogTitle
          component="h2"
          display="flex"
          gap="0.5rem"
          alignItems="center"
        >
          <EventChip variant="full" type={eventData.type} />
          <Typography
            component="span"
            id="modal-title"
            fontSize="1.25rem"
            fontWeight={700}
          >
            {eventData.name}
            <Stack direction="row" gap="0.5rem" alignItems="center">
              <EventStatus status={eventData.recruitStatus} />
              {eventData.updatedAt ? (
                <Typography component="span" fontSize="0.625rem">
                  {eventData.updatedAt} 수정
                </Typography>
              ) : null}
            </Stack>
          </Typography>
        </DialogTitle>
      );
    }
  };

  const renderContent = () => {
    if (eventData) {
      return (
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <TitleContentRow
            title="주최자"
            content={
              <Stack direction="row" alignItems="center" gap="0.25rem">
                <DisabilityChip
                  component="chip"
                  type={eventData.organizerType}
                />
                <Typography fontWeight={600}>{eventData.organizer}</Typography>
                <GroupChip type="text" group={eventData.organizerRecord} />
              </Stack>
            }
          />
          <TitleContentRow
            title="날짜"
            content={
              <Typography>
                {getFullKoreanDate(new Date(eventData.date))}
              </Typography>
            }
          />
          <TitleContentRow
            title="시간"
            content={
              <Typography>
                {getPeriod(eventData.startTime, eventData.endTime)}
              </Typography>
            }
          />
          <TitleContentRow
            title="장소"
            content={
              <Stack
                role="text"
                direction="row"
                gap="0.625rem"
                alignItems="center"
              >
                <Typography>{eventData.place}</Typography>
                <Typography
                  fontSize="0.8125rem"
                  color="#3586FF"
                  fontWeight={600}
                  whiteSpace="nowrap"
                >
                  #{formatCityName(eventData.cityName)}
                </Typography>
              </Stack>
            }
          />
          {isEndEvent && (
            <TitleContentRow
              title="참여인원"
              alignItems="flex-start"
              content={
                <Typography
                  role="text"
                  display="flex"
                  flexDirection="column"
                  gap="0.5rem"
                >
                  <span>
                    시각장애러너
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
                    가이드러너
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
              }
            />
          )}
          {eventData.isApply ? (
            <TitleContentRow
              title="내 파트너"
              alignItems={
                eventData.partner.length > 0 ? 'flex-start' : 'center'
              }
              content={
                eventData.partner.length > 0 ? (
                  <Stack paddingLeft="0.5rem" gap="0.5rem">
                    {eventData.partner.map((partner) => (
                      <Stack
                        role="text"
                        key={`matching-popup-${partner.partnerName}-${partner.partnerName}`}
                        direction="row"
                        gap="0.5rem"
                        alignItems="center"
                      >
                        <DisabilityChip
                          component="chip"
                          type={partner.partnerType}
                        />
                        <Typography>{partner.partnerName}</Typography>
                        <GroupChip type="text" group={partner.partnerRecord} />
                      </Stack>
                    ))}
                    <TextLink
                      label="참가자 현황"
                      to={`${BROWSER_PATH.EVENT.MAIN}/${eventId}?section=status`}
                    />
                  </Stack>
                ) : (
                  <Typography
                    fontSize="0.75rem"
                    fontWeight={700}
                    color="#4BABB8"
                  >
                    대기중
                  </Typography>
                )
              }
            />
          ) : null}
          <Box
            paddingTop="0.625rem"
            display="flex"
            flexDirection="column"
            gap="0.5rem"
          >
            <Typography
              component="h3"
              fontWeight={700}
              fontSize="1.0625rem"
              paddingLeft="0.5rem"
            >
              훈련 상세
            </Typography>
            <Box
              padding="1rem"
              border="1px solid #D9D9D9"
              borderRadius="0.5rem"
              tabIndex={0}
            >
              <Typography
                fontSize="0.8125rem"
                lineHeight="1.25rem"
                whiteSpace="break-spaces"
              >
                {eventData.content}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      );
    }
  };

  /**
   *
   */
  const renderButton = () => {
    if (eventData) {
      switch (eventData.recruitStatus) {
        case RecruitStatus.Open:
        case RecruitStatus.Upcoming:
          return (
            <Button
              fullWidth
              component={Link}
              to={`${BROWSER_PATH.EVENT.MAIN}/${eventId}`}
              variant="chip"
              size="large"
            >
              이벤트 상세페이지 이동
            </Button>
          );
        default:
          return (
            <Button
              fullWidth
              component={Link}
              to={`${BROWSER_PATH.EVENT.MAIN}/${eventId}`}
              variant="chip"
              size="large"
              onClick={() => onModalClose()}
            >
              이벤트 참여결과 보러가기
            </Button>
          );
      }
    }
  };

  //
  //
  //

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
          {renderTitle()}
          {renderContent()}
        </>
      ) : (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      )}
      <DialogActions
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {renderButton()}
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;
