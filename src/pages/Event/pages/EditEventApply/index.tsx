import styled from '@emotion/styled';
import {
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import InputBox from '../../components/InputBox';
import MatchingStandardAccordion from '../../components/MatchingStandardAccordion';
import { GROUP_SELECT } from '../EventApply';

import eventApi from '@/apis/requests/event';
import { EventApplyType } from '@/apis/types/event';
import {
  DisabilityChip,
  EventChip,
  EventStatus,
  GroupChip,
  PageTitle,
  TitleHeader,
} from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import { RootState } from '@/store/index';
import { EventCategory } from '@/types/event';
import {
  RecruitStatus,
  EventStatus as EventStatusType,
  RunningGroup,
} from '@/types/group';

//
//
//

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledSelectBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.9375rem;
`;

const StyledGroupButton = styled.button<{ group: 'mile' | 'basic' }>`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 0.625rem 1.5rem;
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  & p {
    font-weight: 600;
    font-size: 0.9375rem;
    color: default;
  }

  &[aria-selected='true'] {
    border-color: ${(props) =>
      props.group === 'mile' ? '#0066CA' : '#C505D7'};
    background-color: ${(props) =>
      props.group === 'mile' ? '#0066CA' : '#C505D7'};

    & p {
      color: white;
    }
  }
`;

//
//
//

const EditEventApply: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();

  const { userId } = useSelector((state: RootState) => state.user);
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

  const { mutate, isPending } = useMutation({
    mutationFn: (data: EventApplyType) =>
      eventApi.eventApplyPatch({
        eventId: Number(eventId) ?? 0,
        EventApplyPatchRequestBody: data,
      }),
    onSuccess: () => {
      alert('참여 신청서가 수정되었습니다');
      navigate(`${BROWSER_PATH.EVENT.APPLY_DETAIL}/${eventId}`);
    },
    onError: () => {
      alert('에러가 발생했습니다. 다시 시도해주세요.');
    },
  });

  const { control, handleSubmit } = useForm<EventApplyType>({
    defaultValues: {
      detail: applyData.detail,
      group: applyData.group,
      partner: applyData.partner,
    },
  });

  /**
   *
   */
  const handleApplySubmit = (data: EventApplyType) => {
    if (window.confirm('수정하시겠습니까?')) {
      mutate(data);
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
      <StyledForm id="apply-form" onSubmit={handleSubmit(handleApplySubmit)}>
        <InputBox
          required
          title="장애여부"
          inputElement={
            <Stack alignItems="flex-start">
              <DisabilityChip component="chip" type={applyData.type} />
            </Stack>
          }
        />
        <InputBox
          required
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
            required
            multiline
            title="훈련 희망 그룹"
            subTitle={`마일리지 그룹: 풀마라톤 대비 마일리지 누적 중심\n기초/보강 그룹: 기초, 보강 중심 훈련`}
            inputElement={
              <Controller
                rules={{ required: '그룹 선택은 필수입니다. ' }}
                name="group"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <StyledSelectBox>
                    <StyledGroupButton
                      type="button"
                      group="mile"
                      aria-selected={value === RunningGroup.A}
                      onClick={() => onChange(RunningGroup.A)}
                    >
                      <Typography>마일리지 그룹</Typography>
                    </StyledGroupButton>
                    <StyledGroupButton
                      type="button"
                      group="basic"
                      aria-selected={value === RunningGroup.B}
                      onClick={() => onChange(RunningGroup.B)}
                    >
                      <Typography>기초/보강 그룹</Typography>
                    </StyledGroupButton>
                  </StyledSelectBox>
                )}
              />
            }
          />
        ) : (
          <InputBox
            required
            multiline
            labelFor="group"
            title="훈련 희망 팀"
            subTitle="(미선택 시 본인이 속한 팀으로 배정됩니다. )"
            inputElement={
              <Controller
                name="group"
                control={control}
                render={({ field }) => (
                  <Select id="group" {...field} required>
                    {GROUP_SELECT.map((group) => (
                      <MenuItem key={group.value} value={group.value}>
                        {group.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            }
          />
        )}
        <InputBox
          multiline
          title="희망 파트너 성함"
          labelFor="partner"
          inputElement={
            <Controller
              name="partner"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="partner"
                  fullWidth
                  placeholder="약속한 파트너가 있다면 알려주세요!"
                />
              )}
            />
          }
        />
        <InputBox
          multiline
          title="이 외 추가 코멘트"
          labelFor="detail"
          inputElement={
            <Controller
              name="detail"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="detail"
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="클래스를 위한 매칭 시 참고해야 할 부분을 자유롭게 알려주세요 :)"
                />
              )}
            />
          }
        />
      </StyledForm>
    );
  };

  //
  // 모집이 마감된 이벤트인 경우 이전 페이지로
  //
  if (
    eventData.recruitStatus === RecruitStatus.Close ||
    eventData.status === EventStatusType.End
  ) {
    return <Navigate to={`${BROWSER_PATH.EVENT.DETAIL}/${eventId}`} />;
  }

  //
  //
  //
  return (
    <>
      <PageTitle title="참여 신청서 수정" />
      <TitleHeader title="참여 신청서 수정" />
      {renderHeader()}
      {renderForm()}
      <MatchingStandardAccordion />
      <Stack alignItems="center">
        <Button
          fullWidth
          size="large"
          type="submit"
          form="apply-form"
          variant="contained"
          disabled={isPending}
        >
          참여여부 폼 수정완료
        </Button>
      </Stack>
    </>
  );
};

export default EditEventApply;
