import React from 'react';

import styled from '@emotion/styled';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import authApi from '@/apis/requests/auth';
import { WithdrawDeleteRequest } from '@/apis/types/auth';
import { BROWSER_PATH } from '@/constants/path';
import { RootState } from '@/store/index';
import { resetAccessToken } from '@/store/reducer/auth';
import { resetUserInfo } from '@/store/reducer/user';

//
//
//

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

//
//
//

const REASON_LIST = [
  '이 활동을 이제 그만하고 싶어서',
  '다른 더 좋은 서비스가 있어서',
  '기타:',
];

//
//
//

const Withdraw: React.FC = () => {
  const [reason, setReason] = React.useState<number[]>([]);
  const [otherReason, setOtherReason] = React.useState('');

  const { name } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationKey: ['withdrawDelete'],
    mutationFn: (data: WithdrawDeleteRequest) => authApi.withdrawDelete(data),
    onSuccess: () => {
      alert('회원 탈퇴가 완료되었습니다. 지금까지 함께 해서 감사했습니다.');
      dispatch(resetAccessToken());
      dispatch(resetUserInfo());
      navigate(BROWSER_PATH.INTRO);
    },
    onError: () => {
      alert('에러가 발생했습니다. 다시 시도해주세요');
    },
  });

  /**
   *
   */
  const checkIsChecked = (number: 0 | 1 | 2) => {
    return reason.includes(number);
  };

  /**
   *
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reasonData = reason.map((r) => {
      if (r === 2) {
        return otherReason;
      }
      return REASON_LIST[r];
    });

    if (window.confirm('정말 탈퇴하시겠습니까? ')) {
      mutate({ reasons: reasonData });
    }
  };

  /**
   *
   */
  const handleChange = (number: 0 | 1 | 2) => () => {
    if (reason.includes(number)) {
      setReason((prev) => prev.filter((n) => n !== number));
      return;
    }
    setReason((prev) => [...prev, number]);
  };

  //
  //
  //
  return (
    <>
      <Helmet>
        <title>탈퇴하기 - Guide run Project</title>
      </Helmet>
      <Stack gap="0.75rem">
        <Typography
          component="h1"
          fontSize="1.75rem"
          lineHeight="2.375rem"
          whiteSpace="pre-wrap"
          aria-label={`${name}님, 정말로 탈퇴하시겠습니까?`}
        >{`${name}님, \n정말로 탈퇴하시겠습니까?`}</Typography>
        <Typography component="p">
          탈퇴 시, 가이드런과 함께 쌓아온 기록들이 모두 사라집니다.
        </Typography>
      </Stack>
      <StyledForm id="withdraw-reason" onSubmit={handleSubmit}>
        <Typography component="h2" fontSize="1.0625rem" fontWeight={700}>
          탈퇴하시려는 이유를 알려주세요!
        </Typography>
        <FormGroup
          sx={{
            '& .MuiFormControlLabel-root': {
              height: '4rem',
            },
          }}
        >
          <FormControlLabel
            label={REASON_LIST[0]}
            control={
              <Checkbox
                checked={checkIsChecked(0)}
                onChange={handleChange(0)}
              />
            }
          />
          <FormControlLabel
            label={REASON_LIST[1]}
            control={
              <Checkbox
                checked={checkIsChecked(1)}
                onChange={handleChange(1)}
              />
            }
          />
          <Stack direction="row" gap="0.5rem" alignItems="center">
            <FormControlLabel
              label={REASON_LIST[2]}
              control={
                <Checkbox
                  checked={checkIsChecked(2)}
                  onChange={handleChange(2)}
                />
              }
            />
            <TextField
              autoComplete="off"
              placeholder="기타 사유를 알려주세요!"
              disabled={!checkIsChecked(2)}
              required={checkIsChecked(2)}
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
            />
          </Stack>
        </FormGroup>
      </StyledForm>
      <Stack gap="1rem" alignItems="center">
        <Button size="large" variant="contained" onClick={() => navigate(-1)}>
          탈퇴를 다시 고려해보겠습니다.
        </Button>
        <Button
          disabled={!reason.length}
          type="submit"
          form="withdraw-reason"
          size="large"
          variant="outlined"
        >
          탈퇴하겠습니다.
        </Button>
      </Stack>
    </>
  );
};

export default Withdraw;
