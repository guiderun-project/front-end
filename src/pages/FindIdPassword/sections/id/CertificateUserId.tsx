import React from 'react';

import { Stack } from '@mui/material';

import InputBox from '../../components/InputBox';

const CertificateUserId: React.FC = () => {
  const [isGetCerticationNumber, setIsGetCertificationNumber] =
    React.useState(false);

  return (
    <Stack gap="1.5rem">
      <form onSubmit={(e) => e.preventDefault}>
        <InputBox
          id="phoneNumber"
          label="휴대전화번호"
          placeholder={`휴대 전화번호 입력 ('-'제외)`}
          submitButtonLabel="인증번호 전송"
        />
      </form>
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

export default CertificateUserId;
