import { Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import InputBox from '../../components/InputBox';

import {
  CheckCertificationTokenPostRequest,
  GetCertificationTokenPasswordPostRequest,
} from '@/apis/types/auth';
import authApi from '@/apis/requests/auth';

const CertificateUserPw: React.FC = () => {
  const getTokenMethod = useForm<GetCertificationTokenPasswordPostRequest>();
  const checkTokenMethod = useForm<CheckCertificationTokenPostRequest>();

  const { mutate: getTokenMutate, isSuccess: isSuccessGetToken } = useMutation({
    mutationKey: ['getCertificationTokenPasswordPost'],
    mutationFn: (data: GetCertificationTokenPasswordPostRequest) =>
      authApi.getCertificationTokenPasswordPost(data),
  });

  const { mutate: checkTokenMutate } = useMutation({
    mutationKey: ['findPwToken'],
    mutationFn: (data: CheckCertificationTokenPostRequest) =>
      authApi.checkCertificationTokenPost(data),
    onSuccess: () => {
      alert('인증되었습니다. ');
    },
  });

  /**
   *
   */
  const handlePhoneNumberSubmit = (
    data: GetCertificationTokenPasswordPostRequest,
  ) => {
    getTokenMutate(data);
  };

  /**
   *
   */
  const handleTokenSubmit = (data: CheckCertificationTokenPostRequest) => {
    checkTokenMutate(data);
  };

  //
  //
  //

  return (
    <Stack gap="1.5rem">
      <FormProvider {...getTokenMethod}>
        <Stack
          component="form"
          gap="1.5rem"
          onSubmit={getTokenMethod.handleSubmit(handlePhoneNumberSubmit)}
        >
          <InputBox
            autoFocus
            isHidenSubmitButton
            singleline
            id="accountId"
            label="아이디"
            placeholder="아이디 입력"
          />
          <InputBox
            id="phoneNum"
            label="휴대전화번호"
            placeholder={`휴대 전화번호 입력 ('-'제외)`}
            submitButtonLabel="인증번호 전송"
          />
        </Stack>
      </FormProvider>
      {isSuccessGetToken && (
        <FormProvider {...checkTokenMethod}>
          <form onSubmit={checkTokenMethod.handleSubmit(handleTokenSubmit)}>
            <InputBox
              autoFocus
              id="number"
              label="인증번호"
              placeholder="인증번호 입력"
              submitButtonLabel="확인"
            />
          </form>
        </FormProvider>
      )}
    </Stack>
  );
};

export default CertificateUserPw;
