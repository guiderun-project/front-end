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
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import InputBox from '../../components/InputBox';

import { RootState } from '@/store/index';
import { DisabilityChip, GroupChip } from '@/components/shared';
import { EventType } from '@/types/group';

const NewEvent: React.FC = () => {
  const userData = useSelector((state: RootState) => state.user);
  const {} = useForm();
  return (
    <>
      <Helmet>
        <title>이벤트 생성 - Guide run Project</title>
      </Helmet>
      <Typography component="h1" fontSize="2rem">
        이벤트 수정하기
      </Typography>
      <Stack component="form" gap="2rem">
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
        <InputBox
          required
          multiline
          title="이벤트 제목"
          inputElement={<TextField placeholder="이벤트 제목을 적어주세요!" />}
        />
        <InputBox
          required
          multiline
          title="이벤트 유형"
          inputElement={
            <Select value={EventType.Competition}>
              <MenuItem value={EventType.Competition}>대회</MenuItem>
              <MenuItem value={EventType.Training}>훈련</MenuItem>
            </Select>
          }
        />
        <InputBox
          required
          title="일시"
          inputElement={<TextField type="date" />}
        />
        <InputBox
          required
          title="시작 시간"
          inputElement={<TextField type="time" />}
        />
        <InputBox title="종료 시간" inputElement={<TextField type="time" />} />
        <InputBox
          required
          title="장소"
          inputElement={<TextField placeholder="장소를 입력해주세요" />}
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
              <TextField
                fullWidth
                label="시각장애러너"
                autoComplete="off"
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">명</InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="가이드러너"
                autoComplete="off"
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">명</InputAdornment>
                  ),
                }}
              />
            </Stack>
          }
        />
        <InputBox
          multiline
          title="모집 시작일"
          subTitle="(추가 설정을 안 한 경우, 이벤트 생성 시점부터)"
          inputElement={<TextField type="date" />}
        />
        <InputBox
          multiline
          title="모집 마감일"
          subTitle="(추가 설정을 안 한 경우, 이벤트 2시간 전까지)"
          inputElement={<TextField type="date" />}
        />
        <InputBox
          required
          multiline
          title="이벤트 상세 내용"
          inputElement={
            <TextField
              multiline
              placeholder="이벤트 상세 내용을 적어주세요"
              rows={3}
            />
          }
        />
      </Stack>
      <Stack alignItems="center">
        <Button fullWidth type="submit" variant="contained" size="large">
          이벤트 만들기
        </Button>
      </Stack>
    </>
  );
};

export default NewEvent;
