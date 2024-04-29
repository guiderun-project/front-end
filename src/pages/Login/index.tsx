import styled from '@emotion/styled';
import { Stack, TextField, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

//
//
//

const StyledSubmitButton = styled.button`
  max-width: 18.4375rem;
  width: 100%;
  height: 3.25rem;
  border: 1px solid #111;
  padding: 0.625rem 1.5rem;
  border-radius: 10000px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9375rem;
  font-weight: 600;
  background-color: inherit;
  cursor: pointer;

  transition: 0.1s all ease-in;

  &:hover {
    background-color: #e8e8e8;
  }
`;

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  max-width: 19.6875rem;
`;

//
//
//

const Login: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>로그인 - Guide run Project</title>
      </Helmet>
      <Stack
        boxSizing="border-box"
        paddingTop="10.375rem"
        paddingBottom="5.125rem"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack alignItems="center" gap="3.75rem">
          <Typography component="h1" fontSize="2.5rem" fontWeight={400}>
            아이디로 로그인
          </Typography>
          <Stack gap="2.5rem">
            <StyledLoginForm
              onSubmit={(e) => {
                e.preventDefault();
                alert('제출');
              }}
            >
              <TextField
                required
                fullWidth
                autoComplete="off"
                placeholder="아이디"
                sx={{
                  height: '3.5rem',
                }}
              />
              <TextField
                required
                fullWidth
                type="password"
                placeholder="비밀번호"
                sx={{
                  height: '3.5rem',
                }}
              />
              <StyledSubmitButton type="submit">로그인</StyledSubmitButton>
            </StyledLoginForm>
            <Stack
              component={Link}
              to="/"
              direction="row"
              gap="0.25rem"
              alignItems="center"
              justifyContent="center"
              color="#111"
            >
              {/* TODO: 아이디 비밀번호 찾기 페이지 구현 */}
              <Typography
                fontSize="0.875rem"
                fontWeight={500}
                sx={{
                  textDecoration: 'underline',
                  textUnderlinePosition: 'under',
                }}
              >
                아이디/비밀번호를 잊으셨나요?
              </Typography>
              <ChevronRightIcon aria-hidden fontSize="small" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Login;
