import React from 'react';

import { Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import InputBox from '../../components/InputBox';
import {
  CheckCertificationTokenPostRequest,
  GetCertificationTokenIdPostRequest,
} from '@/apis/types/auth';
import authApi from '@/apis/requests/auth';

const CertificateUserId: React.FC = () => {
  const getTokenMethod = useForm<GetCertificationTokenIdPostRequest>();
  const checkTokenMethod = useForm<CheckCertificationTokenPostRequest>();

  const { mutate: getTokenMutate, isSuccess: isSuccessGetToken } = useMutation({
    mutationKey: ['getCertificationTokenIdPost'],
    mutationFn: (data: GetCertificationTokenIdPostRequest) =>
      authApi.getCertificationTokenIdPost(data),
  });

  const { mutate: checkTokenMutate } = useMutation({
    mutationKey: ['findIdToken'],
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
    data: GetCertificationTokenIdPostRequest,
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
        <form onSubmit={getTokenMethod.handleSubmit(handlePhoneNumberSubmit)}>
          <InputBox
            autoFocus
            id="phoneNum"
            label="휴대전화번호"
            placeholder={`휴대 전화번호 입력 ('-'제외)`}
            submitButtonLabel="인증번호 전송"
          />
        </form>
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

export default CertificateUserId;
