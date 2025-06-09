import React from 'react';

import {
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Controller, FieldErrors, useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import InputBox from '../../components/InputBox';

import eventApi from '@/apis/requests/event';
import { NewEventPostRequest } from '@/apis/types/event';
import { DisabilityChip, GroupChip, PageTitle } from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';
import { RootState } from '@/store/index';
import { EventCategory } from '@/types/event';
import { EventType } from '@/types/group';
import getAuthority from '@/utils/authority';
import { addOneHour } from '@/utils/time';

const NewEvent: React.FC = () => {
  const userData = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];

  const { control, handleSubmit, watch, setValue } =
    useForm<NewEventPostRequest>({
      defaultValues: {
        date: today,
        recruitStartDate: today,
        content: '',
        minNumG: 0,
        minNumV: 0,
        startTime: '09:00',
        eventType: EventType.Competition,
        eventCategory: EventCategory.GENERAL,
        name: '',
        place: '',
      },
    });

  const { mutate } = useMutation({
    mutationKey: ['newEventPost'],
    mutationFn: (data: NewEventPostRequest) => eventApi.newEventPost(data),
    onSuccess: (data) => {
      alert('이벤트가 등록되었습니다.');
      navigate(`${BROWSER_PATH.EVENT.DETAIL}/${data.eventId}`);
    },
    onError: () => {
      alert('이벤트 등록이 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleEventSubmit = (data: NewEventPostRequest) => {
    if (window.confirm('이벤트를 등록하시겠습니까?')) {
      mutate(data);
    }
  };

  const handleSubmitError = (errors: FieldErrors<NewEventPostRequest>) => {
    const errorMessages = Object.values(errors)
      .map((error) => error?.message)
      .filter(Boolean)
      .join('\n');

    if (errorMessages) {
      alert(errorMessages);
    }
  };

  const startTime = useWatch({ control, name: 'startTime' });
  const date = useWatch({ control, name: 'date' });

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

  return (
    <>
      <PageTitle title="이벤트 생성" />
      <Typography component="h1" fontSize="2rem">
        이벤트 만들기
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
                    aria-required
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    <FormControlLabel
                      value={EventCategory.GENERAL}
                      label={`기본 이벤트\n(20명 이상 시 팀별로 나뉨)`}
                      control={<Radio />}
                      sx={{
                        whiteSpace: 'break-spaces',
                      }}
                    />
                    <FormControlLabel
                      value={EventCategory.GROUP}
                      label={`[GRP 프로그램] 그룹별\n(마일리지그룹/집중코칭그룹)`}
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
              value: watch('recruitStartDate'),
              message: '모집 마감일은 모집 시작일 이후부터 가능합니다.',
            },
            max: {
              value: date,
              message: '모집 마감일은 대회 시점까지 입니다.',
            },
          }}
          render={({ field, fieldState }) => (
            <InputBox
              multiline
              title="모집 마감일"
              subTitle="(추가 설정을 안 한 경우, 시작 당일까지)"
              inputElement={
                <TextField
                  {...field}
                  value={fieldState.isDirty ? field.value : date}
                  type="date"
                />
              }
            />
          )}
        />
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
      <Stack alignItems="center">
        <Button
          fullWidth
          type="submit"
          form="new-event"
          variant="contained"
          size="large"
        >
          이벤트 만들기
        </Button>
      </Stack>
    </>
  );
};

export default NewEvent;
