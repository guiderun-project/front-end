import styled from '@emotion/styled';
import { Box, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

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
  const [isDirty, setIsDirty] = React.useState(false);

  const isDifferent = isDirty && newPassword !== checkNewPassword;

  return (
    <StyledEditPwForm id="edit-pw" onSubmit={(e) => e.preventDefault()}>
      <StyledGridLabel>
        <Typography fontWeight={700}>새 비밀번호</Typography>
        <TextField
          autoFocus
          value={newPassword}
          variant="standard"
          type="password"
          placeholder="새로운 비밀번호 입력"
          InputProps={{
            style: {
              padding: '0.25rem 0.75rem',
            },
          }}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
      </StyledGridLabel>
      <StyledGridLabel>
        <Typography fontWeight={700}>비밀번호 확인</Typography>
        <TextField
          value={checkNewPassword}
          variant="standard"
          type="password"
          placeholder="새로운 비밀번호 재입력"
          color={isDifferent ? 'error' : 'primary'}
          helperText={isDifferent ? '비밀번호가 일치하지 않습니다' : null}
          InputProps={{
            style: {
              padding: '0.25rem 0.75rem',
            },
          }}
          onChange={(e) => {
            if (!isDirty) setIsDirty(true);
            setCheckNewPassword(e.target.value);
          }}
        />
      </StyledGridLabel>
    </StyledEditPwForm>
  );
};

export default EditUserPw;
