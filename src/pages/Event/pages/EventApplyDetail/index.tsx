import { Button, Stack, Typography } from '@mui/material';
import {
  useQueryClient,
  useSuspenseQuery,
  useMutation,
} from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import InputBox from '../../components/InputBox';
import MatchingStandardAccordion from '../../components/MatchingStandardAccordion';
import { COMPETITION_SELECT, GROUP_SELECT } from '../EventApply';

import eventApi from '@/apis/requests/event';
import {
  DisabilityChip,
  EventChip,
  EventStatus,
  GroupChip,
  PageTitle,
  TextLink,
  TitleHeader,
} from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import { RootState } from '@/store/index';
import { EventCategory } from '@/types/event';
import { EventType, RunningGroup } from '@/types/group';

const EventApplyDetail: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { userId } = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: eventData } = useSuspenseQuery({
    queryKey: ['eventGet', eventId],
    queryFn: () => eventApi.eventGet({ eventId: Number(eventId) }),
  });

  const { data: applyData } = useSuspenseQuery({
    queryKey: ['eventApplyGet', userId, eventId],
    queryFn: () =>
      eventApi.eventApplyGet({ eventId: Number(eventId) ?? 0, userId }),
  });

  const { mutate: cancelSubmit } = useMutation({
    mutationKey: ['eventApplyDelete', eventId],
    mutationFn: () =>
      eventApi.eventApplyDelete({ eventId: Number(eventId) ?? 0 }),
    onSuccess: () => {
      alert('참가 신청 취소되었습니다. ');
      navigate(`${BROWSER_PATH.EVENT.DETAIL}/${eventId}`, { replace: true });
    },
    onError: () => {
      alert('에러가 발생했습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['eventGet'] });
    },
  });

  const getTeam = () => {
    const team =
      eventData.type === EventType.Competition
        ? COMPETITION_SELECT
        : GROUP_SELECT;

    switch (applyData.group) {
      case RunningGroup.A:
        return team[0].label;
      case RunningGroup.B:
        return team[1].label;
      case RunningGroup.C:
        return team[2].label;
      case RunningGroup.D:
        return team[3].label;
      case RunningGroup.E:
        return team[4].label;
    }
  };

  /**
   *
   */
  const renderHeader = () => {
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
          </Typography>
          T
          <EventStatus status={eventData.recruitStatus} />
        </Stack>
      </Stack>
    );
  };

  /**
   *
   */
  const renderForm = () => {
    return (
      <Stack gap="2rem">
        <InputBox
          title="장애여부"
          inputElement={
            <Stack alignItems="flex-start">
              <DisabilityChip component="chip" type={applyData.type} />
            </Stack>
          }
        />
        <InputBox
          title="이름"
          inputElement={
            <Stack direction="row" alignItems="center" gap="0.25rem">
              <Typography>{applyData.name}</Typography>
              <GroupChip group={applyData.pace} type="text" />
            </Stack>
          }
        />
        {eventData.eventCategory === EventCategory.GROUP ? (
          <InputBox
            title="훈련 희망 그룹"
            inputElement={
              <Typography>
                {applyData.group === RunningGroup.A
                  ? '마일리지 그룹'
                  : '기초, 보강 그룹'}
              </Typography>
            }
          />
        ) : (
          <InputBox
            multiline
            title="훈련 희망 팀"
            inputElement={<Typography>{getTeam()}</Typography>}
          />
        )}
        <InputBox
          multiline
          title="희망 파트너 성함"
          inputElement={<Typography>{applyData.partner}</Typography>}
        />
        <InputBox
          multiline
          title="이 외 추가적인 내용이 있으시다면 적어주세요!"
          inputElement={<Typography>{applyData.detail}</Typography>}
        />
      </Stack>
    );
  };

  /**
   *
   */
  const renderButton = () => {
    return (
      <Stack gap="1rem" alignItems="center">
        <Button
          fullWidth
          size="large"
          variant="contained"
          component={Link}
          to={`${BROWSER_PATH.EVENT.DETAIL}/${eventId}`}
        >
          이벤트 상세페이지 바로 가기
        </Button>
        <Button
          fullWidth
          size="large"
          variant="outlined"
          component={Link}
          to={`${BROWSER_PATH.EVENT.APPLY_EDIT}/${eventId}`}
        >
          제출한 내용 수정하기
        </Button>
        <TextLink
          type="button"
          label="신청 취소하기"
          onClick={() => {
            if (window.confirm('이벤트 참여를 취소하시겠습니까??')) {
              cancelSubmit();
            }
          }}
        />
      </Stack>
    );
  };

  //
  //
  //
  return (
    <>
      <PageTitle title="참가 신청서 조회" />
      <TitleHeader title="제출 정보 확인" />
      {renderHeader()}
      {renderForm()}
      <MatchingStandardAccordion />
      {renderButton()}
    </>
  );
};

export default EventApplyDetail;
