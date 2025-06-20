import React from 'react';

import {
  Button,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Controller, FieldErrors, useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import InputBox from '../../components/InputBox';
import useDeleteEvent from '../../hooks/useDeleteEvent';

import eventApi from '@/apis/requests/event';
import { EventFormType } from '@/apis/types/event';
import { DisabilityChip, GroupChip, PageTitle } from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import NotFound from '@/pages/NotFound';
import { RootState } from '@/store/index';
import { EventCategory } from '@/types/event';
import { EventType, RecruitStatus } from '@/types/group';
import getAuthority from '@/utils/authority';
import { addOneHour } from '@/utils/time';

const EditEvent: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);
  const { deleteEvent } = useDeleteEvent();

  if (!eventId) {
    return <NotFound />;
  }

  const { data: eventData } = useSuspenseQuery({
    queryKey: ['eventGet', eventId],
    queryFn: () => eventApi.eventGet({ eventId: Number(eventId) }),
  });

  const { control, handleSubmit, setValue } = useForm<EventFormType>({
    defaultValues: {
      content: eventData?.details ?? '',
      date: eventData?.date,
      endTime: eventData?.endTime,
      eventType: eventData?.type,
      eventCategory: eventData?.eventCategory,
      minNumG: eventData?.minNumG,
      minNumV: eventData?.minNumV,
      name: eventData?.name,
      place: eventData?.place,
      recruitEndDate: eventData?.recruitEndDate,
      recruitStartDate: eventData?.recruitStartDate,
      startTime: eventData?.startTime,
    },
  });

  const startTime = useWatch({ control, name: 'startTime' });
  const date = useWatch({ control, name: 'date' });
  const recruitStartDate = useWatch({ control, name: 'recruitStartDate' });

  React.useEffect(() => {
    if (startTime) {
      setValue('endTime', addOneHour(startTime));
    }
  }, [startTime, setValue]);

  React.useEffect(() => {
    if (date) {
      setValue('recruitEndDate', date);
    }
  }, [date, setValue]);

  React.useEffect(() => {
    if (userData.userId !== eventData.organizerId) {
      alert('작성자만 수정이 가능합니다.');
      navigate(-1);
    }
  }, [userData.userId, eventData.organizerId, navigate]);

  const { mutate } = useMutation({
    mutationKey: ['editEventPatch', eventData.eventId],
    mutationFn: (data: EventFormType) =>
      eventApi.editEventPatch({
        eventId: eventData.eventId,
        EditEventPatchRequestBody: data,
      }),
    onSuccess: () => {
      alert('이벤트가 수정되었습니다.');
      navigate(`${BROWSER_PATH.EVENT.DETAIL}/${eventId}`);
    },
    onError: () => {
      alert('이벤트 수정이 실패했습니다. 다시 시도해주세요.');
    },
  });

  const { mutate: closeEvent, isPending } = useMutation({
    mutationKey: ['closeEventPatch', eventId],
    mutationFn: () => eventApi.closeEventPatch({ eventId: eventData.eventId }),
    onSuccess: () => {
      alert(
        '이벤트 모집 마감 처리 되었습니다. 이벤트 상세페이지로 이동합니다.',
      );
      navigate(`${BROWSER_PATH.EVENT.DETAIL}/${eventId}`);
    },
    onError: () => {
      alert('마감 처리가 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleEventSubmit = (data: EventFormType) => {
    if (window.confirm('이벤트를 수정하시겠습니까?')) {
      mutate(data);
    }
  };

  const handleSubmitError = (errors: FieldErrors<EventFormType>) => {
    const errorMessages = Object.values(errors)
      .map((error) => error?.message)
      .filter(Boolean)
      .join('\n');

    if (errorMessages) {
      alert(errorMessages);
    }
  };

  const handleDeleteEventClick = () => {
    if (window.confirm('이벤트를 삭제하시겠습니까?')) {
      deleteEvent(Number(eventId));
    }
  };

  const getEventCategoryLabel = () => {
    if (eventData.eventCategory === EventCategory.GROUP) {
      return `[GRP 프로그램] 그룹별\n(마일리지그룹/집중코칭그룹)`;
    } else {
      return `기본 이벤트\n(20명 이상 시 팀별로 나뉨)`;
    }
  };

  return (
    <>
      <PageTitle title="이벤트 수정" />
      <Typography component="h1" fontSize="2rem">
        이벤트 수정하기
      </Typography>
      <Stack
        id="new-event"
        component="form"
        gap="2rem"
        onSubmit={handleSubmit(handleEventSubmit, handleSubmitError)}
      >
        <InputBox
          required
          title="주최자"
          inputElement={
            <Stack
              direction="row"
              padding="0 0.75rem"
              alignItems="center"
              gap="0.5rem"
            >
              <DisabilityChip component="chip" type={userData.type} />
              <Typography fontWeight={600}>{userData.name}</Typography>
              <GroupChip type="text" group={userData.recordDegree} />
            </Stack>
          }
        />
        {getAuthority.isAdmin(userData.role) && (
          <Controller
            name="eventCategory"
            control={control}
            render={({ field }) => (
              <InputBox
                required
                multiline
                title="타입 지정"
                subTitle="(최초 생성시 선택 가능, 추후 선택 불가)"
                inputElement={
                  <RadioGroup
                    {...field}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    <FormControlLabel
                      disabled
                      value={eventData.eventCategory}
                      label={getEventCategoryLabel()}
                      control={<Radio />}
                      sx={{
                        whiteSpace: 'break-spaces',
                      }}
                    />
                  </RadioGroup>
                }
              />
            )}
          />
        )}
        <Controller
          rules={{ required: '이벤트 제목은 필수 입력입니다.' }}
          name="name"
          control={control}
          render={({ field }) => (
            <InputBox
              required
              multiline
              title="이벤트 제목"
              inputElement={
                <TextField
                  {...field}
                  required
                  placeholder="이벤트 제목을 적어주세요!"
                />
              }
            />
          )}
        />
        <Controller
          control={control}
          name="eventType"
          rules={{
            required: '이벤트 유형은 필수 입력입니다.',
          }}
          render={({ field }) => (
            <InputBox
              required
              multiline
              title="이벤트 유형"
              inputElement={
                <Select {...field} required>
                  <MenuItem value={EventType.Competition}>대회</MenuItem>
                  <MenuItem value={EventType.Training}>훈련</MenuItem>
                </Select>
              }
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          rules={{
            required: '이벤트 일자는 필수 입력입니다.',
          }}
          render={({ field }) => (
            <InputBox
              required
              title="날짜"
              inputElement={<TextField {...field} required type="date" />}
            />
          )}
        />
        <Controller
          name="startTime"
          rules={{
            required: '시작 시간은 필수 입력입니다',
          }}
          control={control}
          render={({ field }) => (
            <InputBox
              required
              title="시작 시간"
              subTitle="10분 단위로 설정해주세요."
              inputElement={<TextField {...field} required type="time" />}
            />
          )}
        />
        <Controller
          control={control}
          name="endTime"
          rules={{
            min: {
              value: startTime,
              message: '시작 시간보다 늦어야 합니다.',
            },
          }}
          render={({ field }) => (
            <InputBox
              multiline
              title="종료 시간"
              inputElement={
                <TextField
                  {...field}
                  type="time"
                  inputProps={{ min: startTime }}
                />
              }
            />
          )}
        />
        <Controller
          control={control}
          name="place"
          rules={{
            required: '이벤트 장소는 필수 입력입니다.',
          }}
          render={({ field }) => (
            <InputBox
              required
              title="장소"
              inputElement={
                <TextField
                  {...field}
                  required
                  placeholder="장소를 입력해주세요"
                />
              }
            />
          )}
        />
        <Controller
          control={control}
          name="recruitStartDate"
          rules={{
            max: {
              value: date,
              message: '모집 시작일은 대회 시점까지입니다.',
            },
          }}
          render={({ field }) => (
            <InputBox
              multiline
              title="모집 시작일"
              subTitle="(추가 설정을 안 한 경우, 이벤트 생성 시점부터)"
              inputElement={<TextField {...field} type="date" />}
            />
          )}
        />
        <Controller
          control={control}
          name="recruitEndDate"
          defaultValue={date}
          rules={{
            min: {
              value: recruitStartDate,
              message: '모집 마감일은 모집 시작일 이후부터 가능합니다.',
            },
            max: {
              value: date,
              message: '모집 마감일은 대회 시점까지 입니다.',
            },
          }}
          render={({ field }) => (
            <InputBox
              multiline
              title="모집 마감일"
              subTitle="(추가 설정을 안 한 경우, 이벤트 당일까지)"
              inputElement={<TextField {...field} type="date" />}
            />
          )}
        />
        {eventData.recruitStatus === RecruitStatus.Open && (
          <Stack alignItems="center">
            <Button
              fullWidth
              variant="chip"
              size="large"
              disabled={isPending}
              onClick={() => closeEvent()}
            >
              {!isPending ? (
                '지금 모집 마감'
              ) : (
                <CircularProgress size={20} sx={{ color: '#fff' }} />
              )}
            </Button>
          </Stack>
        )}
        <Controller
          control={control}
          name="content"
          rules={{ required: '이벤트 상세 내용은 필수 입력입니다.' }}
          render={({ field }) => (
            <InputBox
              required
              multiline
              title="이벤트 상세 내용"
              inputElement={
                <TextField
                  {...field}
                  multiline
                  placeholder="이벤트 상세 내용을 적어주세요"
                  rows={3}
                />
              }
            />
          )}
        />
      </Stack>
      <Stack alignItems="center" gap="1rem">
        <Button
          fullWidth
          type="submit"
          form="new-event"
          variant="contained"
          size="large"
        >
          이벤트 수정하기
        </Button>
        <Button
          fullWidth
          variant="outlined"
          size="large"
          onClick={handleDeleteEventClick}
        >
          이벤트 삭제하기
        </Button>
      </Stack>
    </>
  );
};

export default EditEvent;
