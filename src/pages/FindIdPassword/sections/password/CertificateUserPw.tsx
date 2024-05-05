import { Stack } from '@mui/material';
import InputBox from '../../components/InputBox';
import styled from '@emotion/styled';

const CertificateUserPw: React.FC = () => {
  return (
    <Stack gap="1.5rem">
      <Stack component="form" gap="1.5rem">
        <InputBox
          isHidenSubmitButton
          singleline
          id="id"
          label="아이디"
          placeholder="아이디 입력"
        />
        <InputBox
          id="phoneNumber"
          label="휴대전화번호"
          placeholder={`휴대 전화번호 입력 ('-'제외)`}
          submitButtonLabel="인증번호 전송"
        />
      </Stack>
      <form onSubmit={(e) => e.preventDefault}>
        <InputBox
          id="certificationNumber"
          label="인증번호"
          placeholder="인증번호 입력"
          submitButtonLabel="확인"
        />
      </form>
    </Stack>
  );
};

export default CertificateUserPw;
