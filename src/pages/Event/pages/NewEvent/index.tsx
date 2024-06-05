import TodayIcon from '@mui/icons-material/Today';
import {
  Button,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import InputBox from '../../components/InputBox';

import { NewEventPostRequest } from '@/apis/types/event';
import eventApi from '@/apis/requests/event';
import { DisabilityChip, GroupChip } from '@/components/shared';
import { RootState } from '@/store/index';
import { EventType } from '@/types/group';
import { useMutation } from '@tanstack/react-query';
import { BROWSER_PATH } from '@/constants/path';

const NewEvent: React.FC = () => {
  const userData = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { handleSubmit, control, watch } = useForm<NewEventPostRequest>({});

  const { mutate } = useMutation({
    mutationKey: ['newEventPost'],
    mutationFn: (data: NewEventPostRequest) => eventApi.newEventPost(data),
    onSuccess: () => {
      alert('이벤트가 등록되었습니다. ');
      navigate(BROWSER_PATH.EVENT.DETAIL);
    },
    onError: () => {
      alert('이벤트 등록이 실패했습니다. 다시 시도해주세요.');
    },
  });
  /**
   *
   */
  const handleEventSubmit = (data: NewEventPostRequest) => {
    console.log(data);
    if (window.confirm('이벤트를 등록하시겠습니까?')) {
      mutate(data);
    }
  };

  //
  //
  //
  return (
    <>
      <Helmet>
        <title>이벤트 생성 - Guide run Project</title>
      </Helmet>
      <Typography component="h1" fontSize="2rem">
        이벤트 수정하기
      </Typography>
      <Stack
        id="new-event"
        component="form"
        gap="2rem"
        onSubmit={handleSubmit(handleEventSubmit, () => console.log('안됨'))}
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
          rules={{ required: true }}
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
            required: true,
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
            required: true,
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
            required: true,
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
          render={({ field }) => (
            <InputBox
              title="종료 시간"
              inputElement={<TextField {...field} type="time" />}
            />
          )}
        />
        <Controller
          control={control}
          name="place"
          render={({ field }) => (
            <InputBox
              required
              title="장소"
              inputElement={
                <TextField {...field} placeholder="장소를 입력해주세요" />
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
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="시각장애러너"
                    autoComplete="off"
                    type="number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="가이드러너"
                    autoComplete="off"
                    type="number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
          render={({ field }) => (
            <InputBox
              multiline
              title="모집 마감일"
              subTitle="(추가 설정을 안 한 경우, 이벤트 2시간 전까지)"
              inputElement={<TextField {...field} type="date" />}
            />
          )}
        />
        <Controller
          control={control}
          name="content"
          rules={{ required: true }}
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
