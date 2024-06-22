import React from 'react';

import {
  Button,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import InputBox from '../../components/InputBox';

import eventApi from '@/apis/requests/event';
import { EventFormType } from '@/apis/types/event';
import { DisabilityChip, GroupChip } from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import NotFound from '@/pages/NotFound';
import { RootState } from '@/store/index';
import { EventType, RecruitStatus } from '@/types/group';

const EditEvent: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);

  const { data: eventData } = useSuspenseQuery({
    queryKey: ['eventGet', eventId],
    queryFn: () => eventApi.eventGet({ eventId: Number(eventId) }),
  });

  const { mutate } = useMutation({
    mutationKey: ['editEventPatch', eventData.eventId],
    mutationFn: (data: EventFormType) =>
      eventApi.editEventPatch({
        eventId: eventData.eventId,
        EditEventPatchRequestBody: data,
      }),
    onSuccess: () => {
      alert('이벤트가 수정되었습니다. ');
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
      navigate(BROWSER_PATH.EVENT.DETAIL);
    },
    onError: () => {
      alert('마감 처리가 실패했습니다. 다시 시도해주세요.');
    },
  });

  const { control, watch, handleSubmit } = useForm<EventFormType>({
    defaultValues: {
      content: eventData?.details ?? '',
      date: eventData?.date,
      endTime: eventData?.endTime,
      eventType: eventData?.type,
      minNumG: eventData?.minNumG,
      minNumV: eventData?.minNumV,
      name: eventData?.name,
      place: eventData?.place,
      recruitEndDate: eventData?.recruitEndDate,
      recruitStartDate: eventData?.recruitStartDate,
      startTime: eventData?.startTime,
    },
  });

  /**
   *
   */
  const handleEventSubmit = (data: EventFormType) => {
    if (window.confirm('이벤트를 수정시겠습니까?')) {
      mutate(data);
    }
  };

  /**
   *
   */
  const handleSubmitError = (errors: FieldErrors<EventFormType>) => {
    Object.keys(errors).forEach((key) => {
      alert(errors[key as keyof FieldErrors<EventFormType>]?.message);
    });
  };

  //
  //
  //

  if (!eventId) {
    return <NotFound />;
  }

  //
  //
  //

  React.useEffect(() => {
    if (userData.userId !== eventData.organizerId) {
      alert('작성자만 수정이 가능합니다.');
      navigate(-1);
      return;
    }
  }, [userData.userId, eventData.organizerId]);

  if (userData.userId !== eventData.organizerId) return <></>;

  //
  //
  //

  return (
    <>
      <Helmet>
        <title>이벤트 수정 - Guide run Project</title>
      </Helmet>
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
              title="일시"
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
              inputElement={
                <TextField
                  {...field}
                  required
                  type="time"
                  inputProps={{ step: 1800 }}
                />
              }
            />
          )}
        />
        <Controller
          control={control}
          name="endTime"
          rules={{
            min: {
              value: watch('startTime'),
              message: '시작 시간보다 늦어야 합니다.',
            },
          }}
          render={({ field }) => (
            <InputBox
              title="종료 시간"
              inputElement={
                <TextField
                  {...field}
                  type="time"
                  inputProps={{ step: 1800, min: watch('startTime') }}
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

        <InputBox
          multiline
          title="최소 모집 인원"
          inputElement={
            <Stack
              direction="row"
              gap="0.9375rem"
              justifyContent="space-between"
            >
              <Controller
                control={control}
                name="minNumV"
                defaultValue={0}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="시각장애러너"
                    autoComplete="off"
                    type="number"
                    inputMode="numeric"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    inputProps={{ min: 0 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">명</InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name="minNumG"
                defaultValue={0}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="가이드러너"
                    autoComplete="off"
                    type="number"
                    inputMode="numeric"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    inputProps={{ min: 0 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">명</InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Stack>
          }
        />
        <Controller
          control={control}
          name="recruitStartDate"
          rules={{
            max: {
              value: watch('date'),
              message: '모집 시작일은 대회 시점까지입니다. ',
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
          defaultValue={watch('date')}
          rules={{
            min: {
              value: watch('recruitStartDate'),
              message: '모집 마감일은 모집 시작일 이후부터 가능합니다. ',
            },
            max: {
              value: watch('date'),
              message: '모집 마감일은 대회 시점까지 입니다. ',
            },
          }}
          render={({ field, fieldState }) => (
            <InputBox
              multiline
              title="모집 마감일"
              subTitle="(추가 설정을 안 한 경우, 이벤트 당일까지)"
              inputElement={
                <TextField
                  {...field}
                  value={fieldState.isDirty ? field.value : watch('date')}
                  type="date"
                />
              }
            />
          )}
        />
        {eventData.recruitStatus === RecruitStatus.Open ? (
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
        ) : null}
        <Controller
          control={control}
          name="content"
          rules={{ required: '이벤트 상세 내용은 필수 입력입니다. ' }}
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
      <Stack alignItems="center">
        <Button
          fullWidth
          type="submit"
          form="new-event"
          variant="contained"
          size="large"
        >
          이벤트 수정하기
        </Button>
      </Stack>
    </>
  );
};

export default EditEvent;
