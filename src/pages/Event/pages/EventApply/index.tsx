import React from 'react';

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
import { Navigate, useParams } from 'react-router-dom';

import InputBox from '../../components/InputBox';
import MatchingStandardAccordion from '../../components/MatchingStandardAccordion';
import SuccessApply from '../SuccessApply';

import eventApi from '@/apis/requests/event';
import { EventApplyType } from '@/apis/types/event';
import {
  DisabilityChip,
  EventChip,
  EventStatus,
  GroupChip,
  HidenText,
  PageTitle,
  TitleHeader,
} from '@/components/shared';
import { GROUP_COLOR } from '@/constants/color';
import { BROWSER_PATH } from '@/constants/path';
import { RootState } from '@/store/index';
import { EventCategory } from '@/types/event';
import {
  RecruitStatus,
  RunningGroup,
  EventStatus as EventStatusType,
  EventType,
} from '@/types/group';

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

  &[aria-checked='true'] {
    border-color: ${(props) =>
      props.group === 'mile' ? GROUP_COLOR.MILE : GROUP_COLOR.BASIC};
    background-color: ${(props) =>
      props.group === 'mile' ? GROUP_COLOR.MILE : GROUP_COLOR.BASIC};

    & p {
      color: white;
    }
  }
`;

export const GROUP_SELECT = [
  { value: RunningGroup.A, label: '시각장애러너 A (~50분)' },
  { value: RunningGroup.B, label: '시각장애러너 B (51~56분)' },
  { value: RunningGroup.C, label: '시각장애러너 C (57~65분)' },
  { value: RunningGroup.D, label: '시각장애러너 D (66분)' },
  { value: RunningGroup.E, label: '시각장애러너 E (기록 없음)' },
];

export const COMPETITION_SELECT = [
  { value: RunningGroup.A, label: '풀코스' },
  { value: RunningGroup.B, label: '30km 코스' },
  { value: RunningGroup.C, label: '하프 코스' },
  { value: RunningGroup.D, label: '10km 코스' },
  { value: RunningGroup.E, label: '5km 코스' },
];

const EventApply: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();

  const { name, type, recordDegree } = useSelector(
    (state: RootState) => state.user,
  );

  const { control, handleSubmit } = useForm<EventApplyType>({
    defaultValues: {
      detail: '',
      partner: '',
      birthDate: '',
      contact: '',
      tshirtSize: '',
    },
  });

  const { data: eventData } = useSuspenseQuery({
    queryKey: ['eventGet', eventId],
    queryFn: () => eventApi.eventGet({ eventId: Number(eventId) }),
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: EventApplyType) =>
      eventApi.eventApplyPost({
        eventId: Number(eventId) ?? 0,
        EventApplyPostRequestBody: data,
      }),
    onSuccess: () => {
      alert('이벤트 참여 신청이 완료되었습니다.');
    },
    onError: () => {
      alert('에러가 발생했습니다. 다시 시도해주세요.');
    },
  });

  const handleApplySubmit = (data: EventApplyType) => {
    if (window.confirm('참여 신청하시겠습니까?')) {
      // 대회인 경우 detail에 추가 정보 포함
      if (eventData.type === EventType.Competition) {
        const additionalInfo = `이름: ${name}\n생년월일: ${data.birthDate}\n연락처: ${data.contact}\n티셔츠 사이즈: ${data.tshirtSize}`;
        const updatedData = {
          ...data,
          detail: data.detail
            ? `${additionalInfo}\n\n${data.detail}`
            : additionalInfo,
        };
        mutate(updatedData);
      } else {
        mutate(data);
      }
    }
  };

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

  const renderForm = () => {
    return (
      <StyledForm
        id="apply-form"
        onSubmit={handleSubmit(handleApplySubmit, (errors) =>
          alert(errors.group?.message),
        )}
      >
        <InputBox
          required
          title="장애여부"
          inputElement={
            <Stack alignItems="flex-start">
              <DisabilityChip component="chip" type={type} />
            </Stack>
          }
        />
        <InputBox
          required
          title="이름"
          inputElement={
            <Stack direction="row" alignItems="center" gap="0.25rem">
              <Typography>{name}</Typography>
              <GroupChip group={recordDegree} type="text" />
            </Stack>
          }
        />
        {eventData.type === EventType.Training &&
        eventData.eventCategory === EventCategory.GROUP ? (
          <InputBox
            isDiv
            required
            multiline
            title="훈련 희망 그룹"
            subTitle={`대회준비반: 풀마라톤 대비 마일리지 누적 중심\n성실러너반: 기초, 보강 중심 훈련`}
            inputElement={
              <Controller
                rules={{ required: '그룹 선택은 필수입니다. ' }}
                name="group"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <StyledSelectBox>
                    <StyledGroupButton
                      type="button"
                      role="radio"
                      group="mile"
                      aria-checked={value === RunningGroup.A}
                      onClick={() => onChange(RunningGroup.A)}
                    >
                      <Typography>대회준비반</Typography>
                      <HidenText content="풀마라톤 대비 마일리지 누적 중심" />
                    </StyledGroupButton>
                    <StyledGroupButton
                      type="button"
                      role="radio"
                      group="basic"
                      aria-checked={value === RunningGroup.B}
                      onClick={() => onChange(RunningGroup.B)}
                    >
                      <Typography>성실러너반</Typography>
                      <HidenText content="기초 및 보강 중심 훈련" />
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
                defaultValue={recordDegree}
                render={({ field }) => (
                  <Select id="group" {...field} required>
                    {(eventData.type === EventType.Competition
                      ? COMPETITION_SELECT
                      : GROUP_SELECT
                    ).map((group) => (
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
        {/* TODO: 이후 장거리반 개설 시 추가 고려
        {eventData.eventCategory === EventCategory.GROUP && (
          <InputBox
            multiline
            labelFor="pace"
            title="희망 페이스"
            subTitle="달리기를 희망하는 페이스가 있는 경우 입력해주세요."
            inputElement={
              <Controller
                name="pace"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="pace"
                    fullWidth
                    placeholder="예: 6분 30초 페이스"
                  />
                )}
              />
            }
          />
        )} */}
        <InputBox
          multiline
          labelFor="partner"
          title="희망 파트너 성함"
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
        {eventData.type === EventType.Competition && (
          <>
            <InputBox
              required
              multiline
              labelFor="birthDate"
              title="생년월일"
              inputElement={
                <Controller
                  name="birthDate"
                  control={control}
                  rules={{ required: '생년월일을 입력해주세요.' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="birthDate"
                      fullWidth
                      required
                      placeholder="예: 1990-01-01"
                    />
                  )}
                />
              }
            />
            <InputBox
              required
              multiline
              labelFor="contact"
              title="연락처"
              inputElement={
                <Controller
                  name="contact"
                  control={control}
                  rules={{ required: '연락처를 입력해주세요.' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="contact"
                      fullWidth
                      required
                      placeholder="예: 010-1234-5678"
                    />
                  )}
                />
              }
            />
            <InputBox
              required
              multiline
              labelFor="tshirtSize"
              title="티셔츠 사이즈"
              inputElement={
                <Controller
                  name="tshirtSize"
                  control={control}
                  rules={{ required: '티셔츠 사이즈를 선택해주세요.' }}
                  render={({ field }) => (
                    <Select id="tshirtSize" {...field} fullWidth required>
                      <MenuItem value="xs(85)">XS (85)</MenuItem>
                      <MenuItem value="s(90)">S (90)</MenuItem>
                      <MenuItem value="m(95)">M (95)</MenuItem>
                      <MenuItem value="l(100)">L (100)</MenuItem>
                      <MenuItem value="xl(105)">XL (105)</MenuItem>
                      <MenuItem value="2xl(110)">2XL (110)</MenuItem>
                    </Select>
                  )}
                />
              }
            />
          </>
        )}
        <InputBox
          multiline
          labelFor="detail"
          title="이 외 추가 코멘트"
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
    eventData.status === EventStatusType.End ||
    eventData.isApply
  ) {
    return <Navigate to={`${BROWSER_PATH.EVENT.DETAIL}/${eventId}`} replace />;
  }

  if (isSuccess) {
    return <SuccessApply eventId={Number(eventId)} />;
  }

  return (
    <>
      <PageTitle title="참여 신청서 작성" />
      <TitleHeader title="참여 신청서 작성" />
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
          참여여부 폼 제출
        </Button>
      </Stack>
    </>
  );
};

export default EventApply;
