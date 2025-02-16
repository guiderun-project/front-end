import { Button, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import infoApi from '@/apis/requests/info';
import { UserPersonal1365IdPostRequest } from '@/apis/types/info';
import { PageTitle, TextLink, TitleHeader } from '@/components/shared';
import { BROWSER_PATH } from '@/constants/path';

const Volunteer = () => {
  const { control, handleSubmit } = useForm<UserPersonal1365IdPostRequest>();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (data: UserPersonal1365IdPostRequest) =>
      infoApi.userPersonal1365IdPost(data),
    onSuccess: () => {
      alert('아이디가 저장되었습니다. ');
      navigate(BROWSER_PATH.INFO, { replace: true });
    },
  });

  const handle1365Submit = (data: UserPersonal1365IdPostRequest) => {
    mutate(data);
  };

  return (
    <>
      <PageTitle title="1365 아이디 제출" />
      <TitleHeader title="1365 아이디 제출" />
      <Stack
        component="form"
        onSubmit={handleSubmit(handle1365Submit)}
        alignItems="center"
        marginTop="5rem"
        gap="10rem"
      >
        <Stack gap="5rem">
          <Stack gap="1rem" alignItems="center">
            <Stack gap="0.5rem" alignItems="center">
              <Typography
                textAlign="center"
                fontSize="0.9375rem"
                lineHeight="22px"
                whiteSpace="break-spaces"
              >{`봉사시간 적립을 희망하시는\n가이드런프로젝트 가이드러너 여러분!`}</Typography>
              <Typography fontWeight={700} fontSize="1.75rem">
                1365 아이디를 알려주세요!
              </Typography>
            </Stack>
            <Stack alignItems="center" gap="0.25rem">
              <Typography fontSize="0.75rem" color="#666">
                *봉사인정 시간 : 2~8시간
              </Typography>
              <Typography fontSize="0.75rem" color="#666">
                **인정 기간 : 2025.2.10 - 2025.5.9
              </Typography>
            </Stack>
          </Stack>
          <Controller
            name="id1365"
            control={control}
            render={({ field }) => (
              <Stack gap="0.5rem">
                <TextField
                  {...field}
                  required
                  autoComplete="off"
                  placeholder="1365 아이디를 입력해주세요"
                  fullWidth
                />
                <Stack
                  component="div"
                  width="100%"
                  alignItems="flex-end"
                  paddingRight="1.125rem"
                  gap="0.25rem"
                >
                  <Typography fontSize="0.875rem" fontWeight={500} color="#666">
                    아이디가 기억이 나지 않다면?
                  </Typography>
                  <TextLink
                    newTabs
                    label="1365 아이디 찾으러 가기"
                    to="https://www.1365.go.kr/vols/main.do"
                  />
                </Stack>
              </Stack>
            )}
          />
        </Stack>
        <Button fullWidth type="submit" size="large" variant="contained">
          로그아웃
        </Button>
      </Stack>
    </>
  );
};

export default Volunteer;
