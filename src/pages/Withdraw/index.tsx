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
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/index';

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

const Withdraw: React.FC = () => {
  const { name } = useSelector((state: RootState) => state.user);

  /**
   *
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            label="이 활동을 이제 그만하고 싶어서"
            control={<Checkbox />}
          />
          <FormControlLabel
            label="다른 더 좋은 서비스가 있어서"
            control={<Checkbox />}
          />
          <Stack direction="row" gap="0.5rem" alignItems="center">
            <FormControlLabel label="기타:" control={<Checkbox />} />
            <TextField
              autoComplete="off"
              placeholder="기타 사유를 알려주세요!"
            />
          </Stack>
        </FormGroup>
      </StyledForm>
      <Stack gap="1rem">
        <Button
          type="submit"
          form="withdraw-reason"
          size="large"
          variant="contained"
        >
          탈퇴를 다시 고려해보겠습니다.
        </Button>
        <Button size="large" variant="outlined">
          탈퇴하겠습니다.
        </Button>
      </Stack>
    </>
  );
};

export default Withdraw;
