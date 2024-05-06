import React from 'react';

import styled from '@emotion/styled';
import { Stack, TextField, Typography } from '@mui/material';
import { useMutation, useMutationState } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import authApi from '@/apis/requests/auth';
import { RenewalPasswordPatchRequest } from '@/apis/types/auth';
import { BROWSER_PATH } from '@/constants/path';

//
//
//

const StyledEditPwForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledGridLabel = styled.label`
  display: grid;
  grid-template-columns: 90px 200px;
  gap: 1rem;
  align-items: center;
`;

//
//
//

const EditUserPw: React.FC = () => {
  const [newPassword, setNewPassword] = React.useState('');
  const [checkNewPassword, setCheckNewPassword] = React.useState('');
  const [isDirtyCheckPassword, setIsDirtyCheckPassword] = React.useState(false);
  const [isDirtyNewPassword, setIsDirtyNewPassword] = React.useState(false);

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ['renewalPasswordPatch'],
    mutationFn: (data: RenewalPasswordPatchRequest) =>
      authApi.renewalPasswordPatch(data),
    onSuccess: () => {
      alert('비밀번호 변경에 성공했습니다. \n 로그인 페이지로 이동합니다.');
      navigate(BROWSER_PATH.LOGIN);
    },
    onError: () => {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    },
  });
  const [token] = useMutationState({
    filters: { mutationKey: ['findPwToken'] },
    select: (mutate) => mutate.state.data as string,
  });

  const isDifferent = isDirtyCheckPassword && newPassword !== checkNewPassword;
  const isInvalid =
    isDirtyNewPassword &&
    !newPassword.match(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/);

  /**
   *
   */
  const handleNewPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDifferent) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!token) return;
    if (
      !newPassword.match(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/)
    ) {
      alert(
        '비밀번호는 영문, 특수문자(!@#$%^&*?_), 숫자를 포함하여 8자 이상 32자 미만 입력해야 합니다.',
      );
      return;
    }
    mutate({ newPassword, token });
  };

  //
  //
  //

  return (
    <StyledEditPwForm id="edit-pw" onSubmit={handleNewPasswordSubmit}>
      <Stack gap="0.25rem">
        {isInvalid && (
          <Typography role="alert" fontSize="0.75rem" color="red">
            '비밀번호는 영문, 특수문자(!@#$%^&*?_), 숫자를 포함하여 8자 이상
            32자 미만 입력해야 합니다.'
          </Typography>
        )}
        <StyledGridLabel>
          <Typography fontWeight={700}>새 비밀번호</Typography>
          <TextField
            autoFocus
            required
            value={newPassword}
            color={isInvalid ? 'error' : 'primary'}
            variant="standard"
            type="password"
            placeholder="새로운 비밀번호 입력"
            InputProps={{
              style: {
                padding: '0.25rem 0.75rem',
              },
            }}
            onChange={(e) => {
              if (!isDirtyNewPassword) setIsDirtyNewPassword(true);
              setNewPassword(e.target.value);
            }}
          />
        </StyledGridLabel>
      </Stack>
      <Stack gap="0.25rem">
        {isDifferent && (
          <Typography role="alert" fontSize="0.75rem" color="red">
            비밀번호가 일치하지 않습니다
          </Typography>
        )}
        <StyledGridLabel>
          <Typography fontWeight={700}>비밀번호 확인</Typography>
          <TextField
            required
            value={checkNewPassword}
            variant="standard"
            type="password"
            placeholder="새로운 비밀번호 재입력"
            color={isDifferent ? 'error' : 'primary'}
            FormHelperTextProps={{
              style: {
                color: '',
              },
            }}
            InputProps={{
              style: {
                padding: '0.25rem 0.75rem',
              },
            }}
            onChange={(e) => {
              if (!isDirtyCheckPassword) setIsDirtyCheckPassword(true);
              setCheckNewPassword(e.target.value);
            }}
          />
        </StyledGridLabel>
      </Stack>
    </StyledEditPwForm>
  );
};

export default EditUserPw;
