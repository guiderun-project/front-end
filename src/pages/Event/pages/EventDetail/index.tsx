import React from 'react';

import styled from '@emotion/styled';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import {
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import EventCommentSection from './sections/EventCommentSection';
import EventDetailContentSection from './sections/EventDetailContentSection';
import EventDetailStatusSection from './sections/EventDetailStatusSection';
import useKakaoShare from '../../hooks/useKakaoShare';

import eventApi from '@/apis/requests/event';
import {
  EventChip,
  EventModal,
  EventStatus,
  HidenText,
  PageTitle,
  TextLink,
  TitleHeader,
} from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import useEventLike from '@/hooks/useEventLike';
import { RootState } from '@/store/index';
import { RecruitStatus, EventStatus as EventStatusType } from '@/types/group';

//
//
//

enum EventPageSectionEnum {
  Detail = 'detail',
  Status = 'status',
}

//
//
//

const StyledHidenButton = styled.button`
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  margin: -1px;
`;

//
//
//

const EventDetail: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const { userId } = useSelector((state: RootState) => state.user);
  const { eventId } = useParams<{ eventId: string }>();
  const { handleLike } = useEventLike({ eventId: Number(eventId) });
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { shareLink } = useKakaoShare();

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

  const { mutate: cancelSubmit } = useMutation({
    mutationKey: ['eventApplyDelete', eventId],
    mutationFn: () =>
      eventApi.eventApplyDelete({ eventId: Number(eventId) ?? 0 }),
    onSuccess: () => {
      alert('참가 신청 취소되었습니다. ');
    },
    onError: () => {
      alert('에러가 발생했습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['eventGet'] });
    },
  });

  const isOwner = eventData?.organizerId === userId;
  const section = searchParams.get('section') ?? EventPageSectionEnum.Detail;

  /**
   *
   */
  const handleShare = () => {
    if (eventData) {
      shareLink(eventData.name, eventData.organizer);
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
                  aria-pressed={eventLike?.isLiked}
                  onClick={handleLike}
                >
                  {eventLike?.isLiked ? (
                    <FavoriteIcon sx={{ fontSize: '1rem', color: 'red' }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: '1rem' }} />
                  )}
                </IconButton>
                <Typography fontSize="0.625rem" role="text">
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
   * 스크린 리더 사용자를 위한 상단 참가 신청 버튼
   */
  const renderHiddenApplyButton = () => {
    if (!eventData) return null;

    if (eventData.recruitStatus === RecruitStatus.Open) {
      if (eventData.isApply) {
        return (
          <StyledHidenButton
            className="for-screenReader"
            tabIndex={-1}
            onClick={() => {
              if (window.confirm('이벤트 참여를 취소하시겠습니까??')) {
                cancelSubmit();
              }
            }}
          >
            이벤트 참가 취소하기
          </StyledHidenButton>
        );
      }
      return (
        <StyledHidenButton
          className="for-screenReader"
          tabIndex={-1}
          onClick={() => navigate(`${BROWSER_PATH.EVENT.APPLY}/${eventId}`)}
        >
          이벤트 참가 신청하기
        </StyledHidenButton>
      );
    }

    return null;
  };

  /**
   *
   */
  const renderTitle = () => {
    if (section === EventPageSectionEnum.Status) {
      return (
        <Stack
          direction="row-reverse"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography component="h2" fontSize="1.5rem" fontWeight={700}>
            모집 현황
          </Typography>
          <Chip
            component="button"
            clickable
            variant="outlined"
            onClick={() => {
              setSearchParams({
                section: EventPageSectionEnum.Detail,
              });
            }}
            label={
              <Stack direction="row" alignItems="center" gap="0.25rem">
                <ChevronLeftIcon fontSize="small" aria-hidden />
                <Typography fontSize="0.9375rem" fontWeight={600}>
                  훈련 상세 내용
                </Typography>
              </Stack>
            }
            sx={{
              height: '2.5rem',
              width: '9.4375rem',
              color: '#000',
              borderRadius: '11111111rem',
            }}
          />
        </Stack>
      );
    }
    return (
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography component="h2" fontSize="1.5rem" fontWeight={700}>
          훈련 상세 내용
        </Typography>
        <Chip
          component="button"
          clickable
          variant="outlined"
          onClick={() => {
            setSearchParams({
              section: EventPageSectionEnum.Status,
            });
          }}
          label={
            <Stack direction="row" alignItems="center" gap="0.25rem">
              <Typography fontSize="0.9375rem" fontWeight={600}>
                모집 현황
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
    );
  };

  /**
   *
   */
  const renderContent = () => {
    if (isLoading) {
      <Stack alignItems="center">
        <CircularProgress size={20} />
      </Stack>;
    }
    if (eventData && eventId) {
      switch (section) {
        case EventPageSectionEnum.Status:
          return (
            <EventDetailStatusSection
              isOwner={isOwner}
              eventId={Number(eventId)}
              eventData={eventData}
            />
          );
        case EventPageSectionEnum.Detail:
        default:
          return (
            <EventDetailContentSection
              eventId={Number(eventId)}
              eventData={eventData}
              isOwner={isOwner}
            />
          );
      }
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
              onClick={() => {
                if (window.confirm('모집 마감 하시겠습니까?')) {
                  closeEvent();
                }
              }}
            >
              지금 모집 마감
            </Button>
          );
        }
      } else {
        if (eventData.recruitStatus === RecruitStatus.Open) {
          if (eventData.isApply) {
            return (
              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={() => {
                  if (window.confirm('이벤트 참여를 취소하시겠습니까??')) {
                    cancelSubmit();
                  }
                }}
              >
                이벤트 참여 취소
              </Button>
            );
          }
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

  /**
   *
   */
  const renderComment = () => {
    if (
      eventData?.status === EventStatusType.End &&
      section !== EventPageSectionEnum.Status
    ) {
      return <EventCommentSection eventId={Number(eventId)} />;
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
      <PageTitle title="이벤트 상세" />
      <TitleHeader title="이벤트 상세 페이지" />
      <HidenText
        as="p"
        content={`안녕하세요! 조재석입니다. 
      이 글은 스크린리더에만 읽히도록 설정해놔서 지은님은 모르세요. 히히.
      마지막 주차인 만큼 감사의 편지를 남겨봤습니다.
      벌써 마지막 주차네요! 1주차부터 지금까지 참여해주신 모든 분들, 너무 감사하고 고생 많으셨습니다!
      아마 이 사이트에서 제일 불편함을 많이 느낀 분들이 스크린리더를 사용하는 여러분들일텐데, 항상 피드백 주시고 응원해주셔서 너무 감사합니다!
      이제 접근성 초보 딱지는 떼도 될 것 같네요.. 모두 다 여러분들 덕분입니다! 사랑합니다❤️❤️❤️
      여러분들이 최종적으로 목표로 한 체전이나 마라톤이 얼마 남지 않았네요. 
      무더운 한여름, 열심히 훈련한 만큼, 좋은 기록을 이루실 거라고 저는 믿습니다!!
      그런데 무엇보다도 부상 조심인거 아시죠? 절대 다치지 마세요! 저 슬퍼할겁니다.. 
      저는 이번주는 참여하지 못하지만, 앞으로 만날 기회는 많으니 2주뒤 함께 달리기에서 보아요.
      여러분들 덕분에 가이드런 홈페이지가 더욱 성장할 수 있었습니다. 
      항상 감사하고 사랑합니다 ❤️. -조재석 드림-
      아 맞다! 이 글은 금요일까지만 읽힐 거라 토요일부터는 바로 본 내용으로 넘어갈 수 있습니다. 감사합니다!
      `}
      />
      {renderHiddenApplyButton()}
      {renderHeader()}
      <Stack gap="2rem">
        {renderTitle()}
        {renderContent()}
      </Stack>
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
                role="text"
                component="span"
                fontSize="0.9375rem"
                fontWeight={600}
              >
                이벤트 공유하기
                <HidenText content="(새 창 열림)" />
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
      {renderComment()}
      <EventModal
        eventId={Number(eventId)}
        isOpen={openModal}
        onModalClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default EventDetail;
