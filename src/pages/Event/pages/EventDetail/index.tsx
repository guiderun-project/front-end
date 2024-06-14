import React from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import EventCommentSection from './sections/EventCommentSection';
import MatchingStandardAccordion from '../../components/MatchingStandardAccordion';
import RecruitCountBox from '../../components/RecruitCountBox';

import eventApi from '@/apis/requests/event';
import {
  DisabilityChip,
  EventChip,
  EventModal,
  EventStatus,
  GroupChip,
  TextLink,
  TitleContentRow,
  TitleHeader,
} from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import useEventLike from '@/hooks/useEventLike';
import { RootState } from '@/store/index';
import { RecruitStatus, EventStatus as EventStatusType } from '@/types/group';

const EventDetail: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const { userId } = useSelector((state: RootState) => state.user);
  const { eventId } = useParams<{ eventId: string }>();
  const { handleLike } = useEventLike({ eventId: Number(eventId) });
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    data: eventData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['eventGet', eventId],
    queryFn: () => eventApi.eventGet({ eventId: Number(eventId) }),
    enabled: Boolean(eventId),
  });

  const { data: eventLike } = useQuery({
    queryKey: ['eventLikeCountGet', Number(eventId)],
    queryFn: () => eventApi.eventLikeCountGet({ eventId: Number(eventId) }),
    enabled: Boolean(eventId),
  });

  const { mutate: closeEvent } = useMutation({
    mutationKey: ['closeEventPatch', eventId],
    mutationFn: () =>
      eventApi.closeEventPatch({ eventId: Number(eventId) ?? 0 }),
    onSuccess: () => {
      alert('이벤트 모집 마감 처리 되었습니다');
    },
    onError: () => {
      alert('마감 처리가 실패했습니다. 다시 시도해주세요.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['eventGet', eventId] });
    },
  });

  const isOwner = eventData?.organizerId === userId;

  /**
   *
   */
  const handleShare = () => {
    if (typeof window.navigator.share !== 'undefined') {
      window.navigator.share({
        title: 'Guide run Project',
        text: `${eventData?.name ?? ''} 이벤트에 참여하세요!`,
      });
    }
  };
  /**
   *
   */
  const renderHeader = () => {
    if (isLoading) {
      <Stack alignItems="center">
        <CircularProgress size={20} />
      </Stack>;
    }
    if (eventData) {
      return (
        <Stack direction="row" gap="0.5rem" alignItems="flex-start">
          <EventChip variant="full" type={eventData.type} />
          <Stack gap="0.25rem">
            <Typography
              component="span"
              id="modal-title"
              fontSize="1.25rem"
              fontWeight={700}
            >
              {eventData.name}
              <Stack direction="row" gap="0.5rem" alignItems="center">
                <EventStatus status={eventData.recruitStatus} />
                {eventData.updated_at ? (
                  <Typography component="span" fontSize="0.625rem">
                    {eventData.updated_at} 수정
                  </Typography>
                ) : null}
              </Stack>
            </Typography>
            <Stack direction="row" gap="0.5rem" alignItems="center">
              {isOwner && (
                <TextLink
                  label="이벤트 수정하러 가기"
                  to={`${BROWSER_PATH.EVENT.EDIT}/${eventId}`}
                />
              )}
              <Stack
                direction="row"
                alignItems="center"
                gap="0.125rem"
                color="#666"
              >
                <IconButton
                  aria-label="이벤트 좋아요"
                  aria-selected={eventLike?.isLiked}
                  onClick={handleLike}
                >
                  {eventLike?.isLiked ? (
                    <FavoriteIcon sx={{ fontSize: '1rem', color: 'red' }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: '1rem' }} />
                  )}
                </IconButton>
                <Typography fontSize="0.625rem">
                  좋아요 {eventLike?.likes ?? 0}
                </Typography>
              </Stack>
              <IconButton aria-label="공유하기" onClick={handleShare}>
                <ShareIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      );
    }
  };

  /**
   *
   */
  const renderDetail = () => {
    if (isLoading) {
      <Stack alignItems="center">
        <CircularProgress size={20} />
      </Stack>;
    }
    if (eventData) {
      return (
        <Stack gap="1.5rem">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography component="h2" fontSize="1.5rem" fontWeight={700}>
              훈련 상세 내용
            </Typography>
            <Chip
              component="button"
              clickable
              variant="outlined"
              label={
                <Stack direction="row" alignItems="center" gap="0.25rem">
                  <Typography fontSize="0.9375rem" fontWeight={600}>
                    신청 현황
                  </Typography>
                  <ChevronRightIcon fontSize="small" aria-hidden />
                </Stack>
              }
              sx={{
                height: '2.5rem',
                width: '7.625rem',
                color: '#000',
                borderRadius: '11111111rem',
              }}
            />
          </Stack>
          <Stack gap="1rem">
            <TitleContentRow
              title="주최자"
              content={
                <Stack direction="row" alignItems="center" gap="0.25rem">
                  <DisabilityChip
                    component="chip"
                    type={eventData.oragnizerType}
                  />
                  <Typography fontWeight={600}>
                    {eventData.organizer}
                  </Typography>
                  <GroupChip type="text" group={eventData.organizerPace} />
                </Stack>
              }
            />
            <TitleContentRow
              title="일시"
              content={
                <Typography component="span" display="flex" gap="0.5rem">
                  {eventData.date.replace(/-/g, '.')}
                  <Divider orientation="vertical" variant="middle" flexItem />
                  {eventData.startTime}~{eventData.endTime}
                </Typography>
              }
            />
            <TitleContentRow
              title="장소"
              content={<Typography>{eventData.place}</Typography>}
            />
            {eventData.status === EventStatusType.End ||
            eventData.recruitStatus === RecruitStatus.Close ? (
              <RecruitCountBox
                title="참여 인원"
                viNum={eventData.NumV}
                guideNum={eventData.NumG}
              />
            ) : (
              <RecruitCountBox
                title="모집 인원"
                viNum={eventData.minNumV}
                guideNum={eventData.minNumG}
              />
            )}
            {eventData.submit ? (
              <TitleContentRow
                title="내 파트너"
                alignItems="flex-start"
                content={
                  eventData.partner ? (
                    <Stack gap="0.5rem">
                      <Stack direction="row" gap="0.25rem" alignItems="center">
                        <DisabilityChip
                          component="chip"
                          type={eventData.partnerType}
                        />
                        <Typography component="span" fontSize="0.9375rem">
                          {eventData.partner}
                        </Typography>
                        <GroupChip type="text" group={eventData.partnerPace} />
                      </Stack>
                      {eventData.status !== EventStatusType.End && (
                        <TextLink
                          label="신청내용 조회"
                          to={`${BROWSER_PATH.EVENT.APPLY_DETAIL}/${eventId}`}
                        />
                      )}
                    </Stack>
                  ) : (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      width="14.8125rem"
                    >
                      <Typography
                        component="span"
                        fontSize="0.75rem"
                        fontWeight={700}
                        color="#4BABB8"
                      >
                        대기중
                      </Typography>
                      {eventData.status !== EventStatusType.End && (
                        <TextLink
                          label="신청내용 조회"
                          to={`${BROWSER_PATH.EVENT.APPLY_DETAIL}/${eventId}`}
                        />
                      )}
                    </Stack>
                  )
                }
              />
            ) : null}
            <Stack paddingTop="0.625rem" gap="0.5rem">
              <Typography component="h3" fontWeight={700}>
                훈련 상세
              </Typography>
              <Box
                padding="1rem"
                border="1px solid #D9D9D9"
                borderRadius="0.5rem"
              >
                <Typography fontSize="0.8125rem" lineHeight="1.25rem">
                  {eventData.details}
                </Typography>
              </Box>
            </Stack>
            <MatchingStandardAccordion />
          </Stack>
        </Stack>
      );
    }
  };

  /**
   *
   */
  const renderEventActionButton = () => {
    if (eventData) {
      if (isOwner) {
        if (eventData.recruitStatus === RecruitStatus.Open) {
          return (
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={() => closeEvent()}
            >
              지금 모집 마감
            </Button>
          );
        }
      } else {
        if (eventData.recruitStatus === RecruitStatus.Open) {
          return (
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={() => navigate(`${BROWSER_PATH.EVENT.APPLY}/${eventId}`)}
            >
              이벤트 참여 신청 하러가기
            </Button>
          );
        }
      }
      if (eventData.status === EventStatusType.End) {
        return (
          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={() => setOpenModal(true)}
          >
            이벤트 참여 결과 보러가기
          </Button>
        );
      }
      return (
        <Button disabled fullWidth size="large" variant="contained">
          이벤트 참여 신청이 불가능합니다
        </Button>
      );
    }
  };

  //
  //
  //

  if (!eventId || isError) {
    return (
      <Stack
        height="70vh"
        alignItems="center"
        justifyContent="center"
        gap="2rem"
      >
        <TitleHeader title="이벤트 상세 페이지" />
        <ErrorOutlineIcon fontSize="large" />
        <Typography role="alert" fontSize="1.25rem" fontWeight={700}>
          잘못된 접근입니다.
        </Typography>
        <Button variant="outlined" size="large" onClick={() => navigate(-1)}>
          이전 페이지로 돌아가기
        </Button>
      </Stack>
    );
  }

  //
  //
  //

  return (
    <>
      <Helmet>
        <title>이벤트 상세</title>
      </Helmet>
      <TitleHeader title="이벤트 상세 페이지" />
      {renderHeader()}
      {renderDetail()}
      <Stack gap="1.5rem" alignItems="center">
        <Chip
          clickable
          component="button"
          variant="outlined"
          label={
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
            >
              <Typography
                component="span"
                fontSize="0.9375rem"
                fontWeight={600}
              >
                이벤트 공유하기
              </Typography>
              <ShareIcon />
            </Stack>
          }
          onClick={handleShare}
          sx={{
            padding: '0.625rem 1.5rem',
            height: '3rem',
            borderRadius: '1111rem',
            borderColor: '#333',
          }}
        />
        {renderEventActionButton()}
      </Stack>
      {eventData?.status === EventStatusType.End ? (
        <EventCommentSection eventId={Number(eventId)} />
      ) : null}
      <EventModal
        eventId={Number(eventId)}
        isOpen={openModal}
        onModalClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default EventDetail;
